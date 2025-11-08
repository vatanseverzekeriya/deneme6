/**
 * Frontend Integration Example for Metin2-style RPG Backend
 *
 * This file demonstrates how to connect your game frontend to the backend.
 * Include Socket.io client library in your HTML:
 * <script src="https://cdn.socket.io/4.6.1/socket.io.min.js"></script>
 */

class GameClient {
    constructor(serverUrl = 'http://localhost:3001') {
        this.serverUrl = serverUrl;
        this.socket = null;
        this.token = null;
        this.player = null;
        this.nearbyPlayers = new Map();
    }

    // ========================================================================
    // AUTHENTICATION
    // ========================================================================

    /**
     * Register a new player
     */
    async register(username, email, password, characterClass) {
        try {
            const response = await fetch(`${this.serverUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    characterClass // Warrior, Assassin, Mage, Archer
                })
            });

            const data = await response.json();

            if (data.success) {
                this.token = data.token;
                this.player = data.player;
                localStorage.setItem('gameToken', data.token);
                console.log('✅ Registration successful!', this.player);
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('❌ Registration error:', error);
            throw error;
        }
    }

    /**
     * Login existing player
     */
    async login(username, password) {
        try {
            const response = await fetch(`${this.serverUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                this.token = data.token;
                this.player = data.player;
                localStorage.setItem('gameToken', data.token);
                console.log('✅ Login successful!', this.player);
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('❌ Login error:', error);
            throw error;
        }
    }

    /**
     * Auto-login with saved token
     */
    async autoLogin() {
        const savedToken = localStorage.getItem('gameToken');
        if (!savedToken) return false;

        try {
            const response = await fetch(`${this.serverUrl}/api/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${savedToken}`
                }
            });

            const data = await response.json();

            if (data.success) {
                this.token = savedToken;
                this.player = data.data;
                console.log('✅ Auto-login successful!');
                return true;
            } else {
                localStorage.removeItem('gameToken');
                return false;
            }
        } catch (error) {
            console.error('❌ Auto-login error:', error);
            localStorage.removeItem('gameToken');
            return false;
        }
    }

    // ========================================================================
    // WEBSOCKET CONNECTION
    // ========================================================================

    /**
     * Connect to the game server via WebSocket
     */
    connectToServer() {
        if (!this.token) {
            console.error('❌ No token found. Please login first.');
            return;
        }

        // Initialize Socket.io connection
        this.socket = io(this.serverUrl, {
            auth: {
                token: this.token
            }
        });

        // Connection events
        this.socket.on('connect', () => {
            console.log('✅ Connected to game server!', this.socket.id);
        });

        this.socket.on('disconnect', () => {
            console.log('❌ Disconnected from game server');
        });

        this.socket.on('connect_error', (error) => {
            console.error('❌ Connection error:', error.message);
        });

        // Player initialization
        this.socket.on('player-init', (data) => {
            console.log('📥 Player initialized:', data.player);
            this.player = data.player;
        });

        // Players list (when joining a map)
        this.socket.on('players-list', (data) => {
            console.log(`📥 Players in map: ${data.players.length}`);
            this.nearbyPlayers.clear();
            data.players.forEach(player => {
                this.nearbyPlayers.set(player.socketId, player);
            });
            this.onPlayersListUpdate(data.players);
        });

        // Player joined the map
        this.socket.on('player-joined', (data) => {
            console.log('👋 Player joined:', data.username);
            this.nearbyPlayers.set(data.id, data);
            this.onPlayerJoined(data);
        });

        // Player movement update
        this.socket.on('player-update', (data) => {
            if (this.nearbyPlayers.has(data.id)) {
                const player = this.nearbyPlayers.get(data.id);
                player.position.x = data.x;
                player.position.y = data.y;
                player.position.direction = data.direction;
                this.onPlayerMove(data);
            }
        });

        // Player left the map
        this.socket.on('player-left', (data) => {
            console.log('👋 Player left:', data.id);
            this.nearbyPlayers.delete(data.id);
            this.onPlayerLeft(data);
        });

        // Chat messages
        this.socket.on('chat-message', (data) => {
            console.log(`💬 [${data.type}] ${data.sender.username}: ${data.message}`);
            this.onChatMessage(data);
        });

        // Combat events
        this.socket.on('player-attack', (data) => {
            console.log('⚔️ Attack:', data);
            this.onPlayerAttack(data);
        });

        // Stats update
        this.socket.on('player-stats-update', (data) => {
            if (this.nearbyPlayers.has(data.id)) {
                const player = this.nearbyPlayers.get(data.id);
                player.stats = data.stats;
                this.onPlayerStatsUpdate(data);
            }
        });
    }

    /**
     * Disconnect from server
     */
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    // ========================================================================
    // GAME ACTIONS
    // ========================================================================

    /**
     * Send player movement to server
     */
    movePlayer(x, y, direction) {
        if (this.socket && this.socket.connected) {
            this.socket.emit('player-move', { x, y, direction });
        }
    }

    /**
     * Change map
     */
    changeMap(map, x, y) {
        if (this.socket && this.socket.connected) {
            this.socket.emit('change-map', { map, x, y });
        }
    }

    /**
     * Send chat message
     */
    sendChatMessage(message, type = 'global', channel = 'general', recipientUsername = null) {
        if (this.socket && this.socket.connected) {
            this.socket.emit('chat-message', {
                message,
                type, // 'global', 'party', 'whisper', 'guild'
                channel,
                recipientUsername
            });
        }
    }

    /**
     * Send attack action
     */
    attack(targetId, skillId, damage) {
        if (this.socket && this.socket.connected) {
            this.socket.emit('attack', { targetId, skillId, damage });
        }
    }

    /**
     * Update player stats (HP, MP, etc.)
     */
    updateStats(stats) {
        if (this.socket && this.socket.connected) {
            this.socket.emit('stats-update', stats);
        }
    }

    // ========================================================================
    // API CALLS (REST)
    // ========================================================================

    /**
     * Get leaderboard
     */
    async getLeaderboard(limit = 100, sortBy = 'level') {
        try {
            const response = await fetch(
                `${this.serverUrl}/api/players/leaderboard?limit=${limit}&sortBy=${sortBy}`
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('❌ Leaderboard error:', error);
            throw error;
        }
    }

    /**
     * Get online players
     */
    async getOnlinePlayers() {
        try {
            const response = await fetch(`${this.serverUrl}/api/players/online`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('❌ Get online players error:', error);
            throw error;
        }
    }

    /**
     * Level up
     */
    async levelUp() {
        try {
            const response = await fetch(`${this.serverUrl}/api/players/levelup`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('❌ Level up error:', error);
            throw error;
        }
    }

    // ========================================================================
    // EVENT CALLBACKS (Override these in your game)
    // ========================================================================

    onPlayersListUpdate(players) {
        // Called when receiving the list of players in the current map
        // Override this to render players in your game
        console.log('Players list updated:', players);
    }

    onPlayerJoined(playerData) {
        // Called when a new player joins the map
        // Override this to spawn player in your game
        console.log('Player joined:', playerData);
    }

    onPlayerMove(data) {
        // Called when a player moves
        // Override this to update player position in your game
        console.log('Player moved:', data);
    }

    onPlayerLeft(data) {
        // Called when a player leaves the map
        // Override this to remove player from your game
        console.log('Player left:', data);
    }

    onChatMessage(data) {
        // Called when receiving a chat message
        // Override this to display message in your game
        console.log('Chat message:', data);
    }

    onPlayerAttack(data) {
        // Called when a player attacks
        // Override this to show attack animation
        console.log('Player attack:', data);
    }

    onPlayerStatsUpdate(data) {
        // Called when a player's stats update
        // Override this to update health bars, etc.
        console.log('Player stats updated:', data);
    }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/*
// Create game client instance
const gameClient = new GameClient('http://localhost:3001');

// Example 1: Register new player
await gameClient.register('warrior123', 'warrior@game.com', 'password123', 'Warrior');

// Example 2: Login
await gameClient.login('warrior123', 'password123');

// Example 3: Auto-login with saved token
const loggedIn = await gameClient.autoLogin();
if (loggedIn) {
    // Connect to game server
    gameClient.connectToServer();
}

// Example 4: Send player movement (call this in your game loop)
function onPlayerMove(x, y, direction) {
    gameClient.movePlayer(x, y, direction);
}

// Example 5: Send chat message
gameClient.sendChatMessage('Hello everyone!', 'global');

// Example 6: Send whisper
gameClient.sendChatMessage('Hi!', 'whisper', null, 'targetUsername');

// Example 7: Override callbacks
gameClient.onPlayerJoined = (playerData) => {
    // Spawn player sprite at playerData.position.x, playerData.position.y
    console.log('Spawning player:', playerData.username);
};

gameClient.onChatMessage = (data) => {
    // Display in chat UI
    addChatMessage(data.sender.username, data.message, data.type);
};

// Example 8: Get leaderboard
const leaderboard = await gameClient.getLeaderboard(10, 'level');
console.log('Top 10 players:', leaderboard.data);
*/

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameClient;
}
