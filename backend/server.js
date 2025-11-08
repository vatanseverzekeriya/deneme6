require('dotenv').config();
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const connectDB = require('./src/config/database');
const jwt = require('jsonwebtoken');
const Player = require('./src/models/Player');

// Create Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = socketio(server, {
    cors: {
        origin: process.env.CLIENT_URL || '*',
        methods: ['GET', 'POST']
    }
});

// Connect to Database
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
}

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/players', require('./src/routes/players'));
app.use('/api/chat', require('./src/routes/chat'));

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Root route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Metin2-style RPG Backend API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            players: '/api/players',
            chat: '/api/chat',
            health: '/health'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// ============================================================================
// SOCKET.IO - Real-time multiplayer functionality
// ============================================================================

// Store active players and their socket connections
const activePlayers = new Map(); // playerId -> { socketId, username, position, map }
const socketToPlayer = new Map(); // socketId -> playerId

// Socket.io authentication middleware
io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error('Authentication error: No token provided'));
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const player = await Player.findById(decoded.id).select('-passwordHash');

        if (!player) {
            return next(new Error('Authentication error: Player not found'));
        }

        // Attach player to socket
        socket.player = player;
        next();
    } catch (error) {
        next(new Error('Authentication error: Invalid token'));
    }
});

io.on('connection', (socket) => {
    const player = socket.player;
    console.log(`✅ Player connected: ${player.username} (${socket.id})`);

    // Add player to active players
    activePlayers.set(player._id.toString(), {
        socketId: socket.id,
        username: player.username,
        class: player.characterData.class,
        level: player.characterData.level,
        position: player.characterData.position,
        stats: {
            hp: player.characterData.stats.hp,
            maxHp: player.characterData.stats.maxHp
        }
    });

    socketToPlayer.set(socket.id, player._id.toString());

    // Update player online status
    Player.findByIdAndUpdate(player._id, { isOnline: true }).exec();

    // Join the map room
    socket.join(player.characterData.position.map);

    // Send current player data
    socket.emit('player-init', {
        player: {
            id: player._id,
            username: player.username,
            characterData: player.characterData
        }
    });

    // Send list of players in the same map
    const playersInMap = Array.from(activePlayers.values())
        .filter(p => p.position.map === player.characterData.position.map);

    socket.emit('players-list', {
        players: playersInMap
    });

    // Broadcast to other players in the same map that new player joined
    socket.to(player.characterData.position.map).emit('player-joined', {
        id: player._id,
        username: player.username,
        class: player.characterData.class,
        level: player.characterData.level,
        position: player.characterData.position,
        stats: {
            hp: player.characterData.stats.hp,
            maxHp: player.characterData.stats.maxHp
        }
    });

    // Handle player movement
    socket.on('player-move', async (data) => {
        const { x, y, direction } = data;
        const playerId = player._id.toString();

        // Update active player position
        if (activePlayers.has(playerId)) {
            const activePlayer = activePlayers.get(playerId);
            activePlayer.position.x = x;
            activePlayer.position.y = y;
            activePlayer.position.direction = direction;

            // Broadcast to other players in the same map
            socket.to(activePlayer.position.map).emit('player-update', {
                id: playerId,
                x,
                y,
                direction
            });

            // Periodically save to database (throttled)
            if (!socket.lastPositionSave || Date.now() - socket.lastPositionSave > 5000) {
                socket.lastPositionSave = Date.now();
                await Player.findByIdAndUpdate(player._id, {
                    'characterData.position.x': x,
                    'characterData.position.y': y,
                    'characterData.position.direction': direction
                }).exec();
            }
        }
    });

    // Handle map change
    socket.on('change-map', async (data) => {
        const { map, x, y } = data;
        const playerId = player._id.toString();
        const oldMap = activePlayers.get(playerId)?.position.map;

        // Leave old map room
        if (oldMap) {
            socket.leave(oldMap);
            socket.to(oldMap).emit('player-left', { id: playerId });
        }

        // Join new map room
        socket.join(map);

        // Update active player data
        if (activePlayers.has(playerId)) {
            const activePlayer = activePlayers.get(playerId);
            activePlayer.position.map = map;
            activePlayer.position.x = x;
            activePlayer.position.y = y;
        }

        // Update database
        await Player.findByIdAndUpdate(player._id, {
            'characterData.position.map': map,
            'characterData.position.x': x,
            'characterData.position.y': y
        }).exec();

        // Get players in new map
        const playersInMap = Array.from(activePlayers.values())
            .filter(p => p.position.map === map && p.socketId !== socket.id);

        // Send list of players in new map
        socket.emit('players-list', { players: playersInMap });

        // Notify others in new map
        socket.to(map).emit('player-joined', {
            id: playerId,
            username: player.username,
            class: player.characterData.class,
            level: player.characterData.level,
            position: { x, y, map },
            stats: {
                hp: player.characterData.stats.hp,
                maxHp: player.characterData.stats.maxHp
            }
        });
    });

    // Handle chat messages
    socket.on('chat-message', async (data) => {
        const { message, type, channel, recipientUsername } = data;

        const chatData = {
            sender: {
                id: player._id,
                username: player.username,
                class: player.characterData.class,
                level: player.characterData.level
            },
            message: message.trim(),
            type: type || 'global',
            channel: channel || 'general',
            timestamp: new Date()
        };

        if (type === 'whisper' && recipientUsername) {
            // Find recipient
            const recipientPlayer = Array.from(activePlayers.values())
                .find(p => p.username === recipientUsername);

            if (recipientPlayer) {
                // Send to recipient
                io.to(recipientPlayer.socketId).emit('chat-message', chatData);
                // Send confirmation to sender
                socket.emit('chat-message', chatData);
            } else {
                socket.emit('chat-error', {
                    message: 'Player not found or offline'
                });
            }
        } else if (type === 'party') {
            // TODO: Implement party chat (requires party system)
            socket.emit('chat-error', {
                message: 'Party system not implemented yet'
            });
        } else {
            // Global or channel chat - broadcast to all in the same map
            const currentMap = activePlayers.get(player._id.toString())?.position.map;
            if (currentMap) {
                io.to(currentMap).emit('chat-message', chatData);
            }
        }
    });

    // Handle combat actions
    socket.on('attack', async (data) => {
        const { targetId, skillId, damage } = data;

        // Broadcast attack animation to nearby players
        socket.to(player.characterData.position.map).emit('player-attack', {
            attackerId: player._id,
            targetId,
            skillId,
            damage
        });
    });

    // Handle player stats update
    socket.on('stats-update', (data) => {
        const playerId = player._id.toString();

        if (activePlayers.has(playerId)) {
            const activePlayer = activePlayers.get(playerId);
            activePlayer.stats = {
                hp: data.hp,
                maxHp: data.maxHp
            };

            // Broadcast to nearby players
            socket.to(activePlayer.position.map).emit('player-stats-update', {
                id: playerId,
                stats: activePlayer.stats
            });
        }
    });

    // Handle disconnect
    socket.on('disconnect', async () => {
        const playerId = socketToPlayer.get(socket.id);

        if (playerId) {
            const activePlayer = activePlayers.get(playerId);

            console.log(`❌ Player disconnected: ${player.username} (${socket.id})`);

            // Update player online status
            await Player.findByIdAndUpdate(player._id, {
                isOnline: false,
                lastOnline: Date.now()
            }).exec();

            // Notify other players in the same map
            if (activePlayer) {
                socket.to(activePlayer.position.map).emit('player-left', {
                    id: playerId
                });
            }

            // Remove from active players
            activePlayers.delete(playerId);
            socketToPlayer.delete(socket.id);
        }
    });

    // Handle errors
    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
});

// ============================================================================
// START SERVER
// ============================================================================

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log('\n' + '='.repeat(70));
    console.log('🎮 METIN2-STYLE RPG BACKEND SERVER');
    console.log('='.repeat(70));
    console.log(`\n🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`📡 HTTP Server: http://localhost:${PORT}`);
    console.log(`⚡ WebSocket Server: ws://localhost:${PORT}`);
    console.log(`\n📚 API Endpoints:`);
    console.log(`   • Auth:    http://localhost:${PORT}/api/auth`);
    console.log(`   • Players: http://localhost:${PORT}/api/players`);
    console.log(`   • Chat:    http://localhost:${PORT}/api/chat`);
    console.log(`   • Health:  http://localhost:${PORT}/health`);
    console.log('\n' + '='.repeat(70) + '\n');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err);
    // Close server & exit process in production
    if (process.env.NODE_ENV === 'production') {
        server.close(() => process.exit(1));
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('⏹️  SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n⏹️  SIGINT received. Shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

module.exports = { app, server, io };
