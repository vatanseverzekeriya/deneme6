const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Guild = require('../models/Guild');
const PvPMatch = require('../models/PvPMatch');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

class GameServer {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.clients = new Map(); // userId -> { ws, user }
    this.pvpMatches = new Map(); // matchId -> match state

    this.wss.on('connection', (ws, req) => {
      this.handleConnection(ws, req);
    });

    console.log('WebSocket Game Server initialized');
  }

  async handleConnection(ws, req) {
    try {
      // Extract token from query string
      const url = new URL(req.url, 'ws://localhost');
      const token = url.searchParams.get('token');

      if (!token) {
        ws.close(1008, 'Token required');
        return;
      }

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) {
        ws.close(1008, 'User not found');
        return;
      }

      // Store client connection
      this.clients.set(user._id.toString(), { ws, user });

      // Update user online status
      user.online = true;
      await user.save();

      console.log(`User connected: ${user.username} (${user._id})`);

      // Send welcome message
      this.sendToClient(user._id.toString(), {
        type: 'connected',
        message: 'Connected to game server',
        user: user.toPublicProfile()
      });

      // Handle messages
      ws.on('message', async (data) => {
        await this.handleMessage(user._id.toString(), data);
      });

      // Handle disconnect
      ws.on('close', async () => {
        await this.handleDisconnect(user._id.toString());
      });

      // Handle errors
      ws.on('error', (error) => {
        console.error(`WebSocket error for user ${user.username}:`, error);
      });

    } catch (error) {
      console.error('Connection error:', error);
      ws.close(1008, 'Authentication failed');
    }
  }

  async handleMessage(userId, data) {
    try {
      const message = JSON.parse(data);
      const client = this.clients.get(userId);

      if (!client) return;

      switch (message.type) {
        case 'guild_chat':
          await this.handleGuildChat(userId, message);
          break;

        case 'pvp_action':
          await this.handlePvPAction(userId, message);
          break;

        case 'player_position':
          await this.handlePlayerPosition(userId, message);
          break;

        case 'ping':
          this.sendToClient(userId, { type: 'pong', timestamp: Date.now() });
          break;

        default:
          console.log(`Unknown message type: ${message.type}`);
      }

    } catch (error) {
      console.error('Message handling error:', error);
    }
  }

  async handleGuildChat(userId, message) {
    try {
      const client = this.clients.get(userId);
      if (!client) return;

      const user = client.user;
      if (!user.guild) return;

      const guild = await Guild.findById(user.guild);
      if (!guild) return;

      // Add message to guild chat
      guild.addChatMessage(user._id, user.username, message.message);
      await guild.save();

      // Broadcast to all guild members
      const chatMessage = {
        type: 'guild_chat_message',
        sender: user.username,
        message: message.message,
        timestamp: Date.now()
      };

      // Send to all online guild members
      const allMembers = [guild.leader, ...guild.officers, ...guild.members];
      allMembers.forEach(memberId => {
        this.sendToClient(memberId.toString(), chatMessage);
      });

    } catch (error) {
      console.error('Guild chat error:', error);
    }
  }

  async handlePvPAction(userId, message) {
    try {
      const { matchId, action, data } = message;

      const match = await PvPMatch.findById(matchId);
      if (!match || match.status !== 'in-progress') return;

      // Validate player is in this match
      const isInMatch = match.team1.players.some(p => p.user.equals(userId)) ||
                       match.team2.players.some(p => p.user.equals(userId));

      if (!isInMatch) return;

      // Add event to match
      match.events.push({
        type: action,
        timestamp: new Date(),
        data: { ...data, userId }
      });

      await match.save();

      // Broadcast action to all players in match
      const allPlayers = [
        ...match.team1.players.map(p => p.user.toString()),
        ...match.team2.players.map(p => p.user.toString())
      ];

      const actionMessage = {
        type: 'pvp_action',
        matchId,
        action,
        data,
        userId
      };

      allPlayers.forEach(playerId => {
        this.sendToClient(playerId, actionMessage);
      });

    } catch (error) {
      console.error('PvP action error:', error);
    }
  }

  async handlePlayerPosition(userId, message) {
    try {
      const { x, y } = message.position;

      // Update user position in database (throttled to avoid too many writes)
      // In production, you might want to batch these updates
      await User.findByIdAndUpdate(userId, {
        'character.position': { x, y }
      });

      // Broadcast to nearby players (simplified - broadcasts to all for now)
      const positionUpdate = {
        type: 'player_position',
        userId,
        position: { x, y }
      };

      // In a real implementation, you'd only send to nearby players
      this.broadcast(positionUpdate, userId);

    } catch (error) {
      console.error('Position update error:', error);
    }
  }

  async handleDisconnect(userId) {
    try {
      const client = this.clients.get(userId);
      if (!client) return;

      // Update user online status
      await User.findByIdAndUpdate(userId, { online: false });

      this.clients.delete(userId);
      console.log(`User disconnected: ${client.user.username}`);

    } catch (error) {
      console.error('Disconnect error:', error);
    }
  }

  sendToClient(userId, message) {
    const client = this.clients.get(userId);
    if (client && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(JSON.stringify(message));
    }
  }

  broadcast(message, excludeUserId = null) {
    this.clients.forEach((client, userId) => {
      if (userId !== excludeUserId && client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(JSON.stringify(message));
      }
    });
  }

  broadcastToGuild(guildId, message, excludeUserId = null) {
    this.clients.forEach((client, userId) => {
      if (client.user.guild &&
          client.user.guild.equals(guildId) &&
          userId !== excludeUserId &&
          client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(JSON.stringify(message));
      }
    });
  }

  getOnlineCount() {
    return this.clients.size;
  }

  getOnlineUsers() {
    const users = [];
    this.clients.forEach((client) => {
      users.push(client.user.toPublicProfile());
    });
    return users;
  }
}

module.exports = GameServer;
