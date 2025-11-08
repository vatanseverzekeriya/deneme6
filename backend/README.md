# Metin2-Style RPG Backend Server

A complete multiplayer backend server for the Metin2-style RPG game, built with Node.js, Express, Socket.io, and MongoDB.

## Features

- ✅ **Authentication System** - JWT-based user registration and login
- ✅ **Real-time Multiplayer** - WebSocket connections using Socket.io
- ✅ **Player Synchronization** - Real-time position and stats sync
- ✅ **Chat System** - Global, whisper, and channel-based chat
- ✅ **Character Classes** - Warrior, Assassin, Mage, Archer
- ✅ **Leveling System** - Experience points and level progression
- ✅ **Leaderboard** - Rankings by level, gold, etc.
- ✅ **Guild System** - Guild creation and management (schema ready)
- ✅ **Inventory System** - Item management and equipment
- ✅ **Database Integration** - MongoDB with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **WebSocket**: Socket.io v4
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet, bcryptjs, CORS
- **Performance**: Compression

## Project Structure

```
backend/
├── server.js                 # Main server file
├── package.json              # Dependencies
├── .env                      # Environment variables
├── client-example.js         # Frontend integration example
├── README.md                 # This file
└── src/
    ├── config/
    │   └── database.js       # MongoDB connection
    ├── models/
    │   ├── Player.js         # Player schema
    │   ├── ChatMessage.js    # Chat message schema
    │   ├── Guild.js          # Guild schema
    │   └── Item.js           # Item schema
    ├── controllers/
    │   ├── authController.js    # Authentication logic
    │   ├── playerController.js  # Player management
    │   └── chatController.js    # Chat management
    ├── routes/
    │   ├── auth.js           # Auth routes
    │   ├── players.js        # Player routes
    │   └── chat.js           # Chat routes
    └── middleware/
        └── auth.js           # JWT middleware
```

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)

### Setup Steps

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

   Edit `.env`:
   ```env
   PORT=3001
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/metin2-rpg
   JWT_SECRET=your-secret-key-change-in-production
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:3000
   ```

4. **Start MongoDB**

   If using local MongoDB:
   ```bash
   mongod
   ```

   Or use MongoDB Atlas (cloud):
   - Create account at https://www.mongodb.com/cloud/atlas
   - Create cluster and get connection string
   - Update `MONGODB_URI` in `.env`

5. **Run the server**
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new player | No |
| POST | `/api/auth/login` | Login player | No |
| GET | `/api/auth/me` | Get current player | Yes |
| POST | `/api/auth/logout` | Logout player | Yes |

### Players (`/api/players`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/players/leaderboard` | Get leaderboard | No |
| GET | `/api/players/online` | Get online players | No |
| GET | `/api/players/:id` | Get player profile | No |
| PUT | `/api/players/position` | Update position | Yes |
| PUT | `/api/players/stats` | Update stats | Yes |
| POST | `/api/players/levelup` | Level up player | Yes |
| POST | `/api/players/experience` | Add experience | Yes |

### Chat (`/api/chat`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/chat/send` | Send message | Yes |
| GET | `/api/chat/messages` | Get messages | Yes |
| GET | `/api/chat/unread` | Get unread count | Yes |
| PUT | `/api/chat/read` | Mark as read | Yes |
| DELETE | `/api/chat/:id` | Delete message | Yes |

## WebSocket Events

### Client → Server

| Event | Data | Description |
|-------|------|-------------|
| `player-move` | `{x, y, direction}` | Player movement |
| `change-map` | `{map, x, y}` | Change current map |
| `chat-message` | `{message, type, channel, recipientUsername}` | Send chat message |
| `attack` | `{targetId, skillId, damage}` | Attack action |
| `stats-update` | `{hp, maxHp}` | Update player stats |

### Server → Client

| Event | Data | Description |
|-------|------|-------------|
| `player-init` | `{player}` | Initial player data |
| `players-list` | `{players[]}` | Players in current map |
| `player-joined` | `{id, username, position, ...}` | Player joined map |
| `player-update` | `{id, x, y, direction}` | Player moved |
| `player-left` | `{id}` | Player left map |
| `chat-message` | `{sender, message, type, ...}` | Chat message received |
| `player-attack` | `{attackerId, targetId, skillId, damage}` | Attack event |
| `player-stats-update` | `{id, stats}` | Player stats changed |

## Usage Example

### Registration

```javascript
POST /api/auth/register
Content-Type: application/json

{
  "username": "warrior123",
  "email": "warrior@game.com",
  "password": "password123",
  "characterClass": "Warrior"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "player": {
    "id": "507f1f77bcf86cd799439011",
    "username": "warrior123",
    "email": "warrior@game.com",
    "characterData": {
      "class": "Warrior",
      "level": 1,
      "stats": {...},
      "position": {...}
    }
  }
}
```

### WebSocket Connection

```javascript
// Include Socket.io client
<script src="https://cdn.socket.io/4.6.1/socket.io.min.js"></script>

// Connect to server
const socket = io('http://localhost:3001', {
  auth: {
    token: 'your-jwt-token-here'
  }
});

// Listen for events
socket.on('connect', () => {
  console.log('Connected!');
});

socket.on('player-init', (data) => {
  console.log('Player data:', data.player);
});

socket.on('players-list', (data) => {
  console.log('Players:', data.players);
});

// Send movement
socket.emit('player-move', {
  x: 400,
  y: 300,
  direction: 'down'
});

// Send chat message
socket.emit('chat-message', {
  message: 'Hello world!',
  type: 'global',
  channel: 'general'
});
```

### Frontend Integration

See `client-example.js` for a complete GameClient class that handles:
- Authentication (register, login, auto-login)
- WebSocket connection management
- All game events and actions
- Easy integration with your game

Example usage:
```javascript
const gameClient = new GameClient('http://localhost:3001');

// Login
await gameClient.login('warrior123', 'password123');

// Connect to server
gameClient.connectToServer();

// Override event handlers
gameClient.onPlayerJoined = (playerData) => {
  // Spawn player in your game
  spawnPlayer(playerData);
};

gameClient.onChatMessage = (data) => {
  // Display in chat UI
  addChatMessage(data.sender.username, data.message);
};

// Send actions
gameClient.movePlayer(x, y, direction);
gameClient.sendChatMessage('Hello!', 'global');
gameClient.attack(targetId, skillId, damage);
```

## Character Classes

Each class has unique starting stats:

### Warrior
- High HP and Defense
- Strong melee attacks
- Stats: STR 15, DEX 8, INT 5, VIT 15

### Assassin
- High Speed and Critical
- Fast attacks and mobility
- Stats: STR 10, DEX 15, INT 8, VIT 10

### Mage
- High MP and Magic Power
- Powerful spells
- Stats: STR 5, DEX 8, INT 18, VIT 8

### Archer
- Balanced ranged fighter
- Good range and accuracy
- Stats: STR 10, DEX 14, INT 10, VIT 10

## Database Schema

### Player
```javascript
{
  username: String (unique),
  email: String (unique),
  passwordHash: String,
  characterData: {
    class: String,
    level: Number,
    experience: Number,
    stats: { hp, maxHp, mp, maxMp, attack, defense, ... },
    position: { x, y, map, direction },
    equipment: { weapon, armor, helmet, ... },
    inventory: Array,
    gold: Number,
    skillPoints: Number,
    skills: Array,
    quests: Array
  },
  isOnline: Boolean,
  lastOnline: Date,
  createdAt: Date
}
```

## Security

- Password hashing with bcryptjs (10 salt rounds)
- JWT token authentication
- CORS protection
- Helmet security headers
- Request validation
- Ban system support
- Private message settings

## Performance

- Compression middleware for response optimization
- Position updates throttled (5 second intervals for DB saves)
- Efficient map-based room system (only nearby players receive updates)
- MongoDB indexes for fast queries
- TTL index for chat messages (auto-delete after 7 days)

## Testing

### Health Check
```bash
curl http://localhost:3001/health
```

### Test Registration
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123","characterClass":"Warrior"}'
```

### Test Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```

## Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/metin2-rpg
JWT_SECRET=use-a-long-random-secret-key-here
JWT_EXPIRE=7d
CLIENT_URL=https://yourgame.com
```

### Production Considerations

- Use MongoDB Atlas or managed MongoDB
- Set strong JWT_SECRET (use random generator)
- Enable SSL/TLS for secure connections
- Use environment variables for all secrets
- Set up monitoring and logging
- Configure rate limiting
- Use PM2 or similar for process management

## Future Enhancements

- [ ] Party system
- [ ] Guild wars
- [ ] Trading system
- [ ] Auction house
- [ ] Quest system API
- [ ] Achievement system API
- [ ] PvP combat system
- [ ] NPC interaction system
- [ ] Item shop API
- [ ] Admin panel
- [ ] Anti-cheat measures
- [ ] Rate limiting
- [ ] Comprehensive logging

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- For Atlas, check IP whitelist and credentials

### Socket.io Connection Failed
- Verify server is running
- Check CORS settings
- Ensure token is valid and included in auth
- Check firewall settings

### Authentication Errors
- Verify JWT_SECRET matches
- Check token expiration
- Ensure password meets requirements

## Support

For issues and questions:
- Check the `client-example.js` for integration examples
- Review API endpoint documentation above
- Check server logs for error details

## License

MIT

---

**Happy Gaming! 🎮⚔️**
