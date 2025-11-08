# Sprint 11-12: Guild & PvP System - Implementation Complete

## Overview

This sprint implements a complete Guild and PvP system for the Metin2-style MMORPG game, including:

- ✅ Guild creation and management
- ✅ Guild chat (real-time via WebSocket)
- ✅ Guild warehouse (shared storage)
- ✅ Guild quests system
- ✅ PvP arena (1v1 and 3v3)
- ✅ PvP matchmaking algorithm
- ✅ Ranking system (ELO-based)
- ✅ User authentication (JWT)
- ✅ Real-time multiplayer infrastructure (WebSocket)
- ✅ MongoDB database integration

**Estimated Hours:** 90 hours
**Status:** Backend Complete ✅ | Frontend UI Pending

## Architecture

### Technology Stack

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose (database)
- JWT (authentication)
- WebSocket (real-time communication)
- bcryptjs (password hashing)

**Frontend (existing):**
- Vanilla JavaScript
- HTML5 Canvas 2D
- No framework (pure JS)

### Project Structure

```
deneme6/
├── server.js                    # Main server entry point
├── config/
│   └── database.js             # MongoDB connection setup
├── models/
│   ├── User.js                 # User model (character, pvp stats, guild)
│   ├── Guild.js                # Guild model (members, chat, warehouse, quests)
│   └── PvPMatch.js             # PvP match model (teams, results, ratings)
├── routes/
│   ├── auth.js                 # Authentication routes (register, login)
│   ├── guild.js                # Guild routes (CRUD, chat, warehouse, quests)
│   └── pvp.js                  # PvP routes (matchmaking, matches, rankings)
├── websocket/
│   └── gameServer.js           # WebSocket server (real-time features)
├── utils/
│   └── guildQuests.js          # Guild quest generation and management
├── .env.example                # Environment variables template
├── API_DOCUMENTATION.md        # Complete API documentation
└── GUILD_PVP_README.md         # This file
```

## Quick Start

### 1. Install Dependencies

```bash
npm install mongoose bcryptjs jsonwebtoken
```

Already installed packages:
- express
- ws (WebSocket)
- qrcode
- chokidar

### 2. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# Ubuntu/Debian:
sudo apt-get install mongodb

# macOS:
brew install mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string

### 3. Configure Environment

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/metin2-rpg
JWT_SECRET=change-this-to-a-secure-random-string
```

### 4. Start Server

```bash
node server.js
```

The server will start with:
- Game URL: http://localhost:3000/metin2-style.html
- Dashboard: http://localhost:3000/dashboard
- API Base: http://localhost:3000/api

## Features Implemented

### 1. User Authentication

**Features:**
- User registration with email/username
- Password hashing (bcryptjs)
- JWT-based authentication
- Character creation (4 classes: Warrior, Ninja, Shaman, Sura)
- User profile management

**API Endpoints:**
- `POST /api/auth/register` - Register new account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/character` - Update character data

### 2. Guild System

**Features:**
- Guild creation (name, tag, description)
- Member management (invite, kick, promote, demote)
- Ranks: Leader, Officer, Member
- Guild leveling system (XP and levels)
- Maximum members increases with guild level
- Leave/join guilds

**API Endpoints:**
- `POST /api/guild/create` - Create guild
- `GET /api/guild/my/guild` - Get your guild
- `GET /api/guild/:guildId` - Get guild by ID
- `GET /api/guild/list/all` - Browse all guilds
- `POST /api/guild/invite` - Invite player
- `POST /api/guild/leave` - Leave guild
- `POST /api/guild/kick` - Kick member (leader only)
- `POST /api/guild/promote` - Promote to officer (leader only)
- `POST /api/guild/demote` - Demote to member (leader only)

### 3. Guild Chat

**Features:**
- Real-time chat via WebSocket
- Message history (last 100 messages)
- Automatic message cleanup
- Guild-wide broadcasts

**API Endpoints:**
- `GET /api/guild/:guildId/chat` - Get chat history
- `POST /api/guild/:guildId/chat` - Send message

**WebSocket:**
```javascript
// Send message
ws.send(JSON.stringify({
  type: 'guild_chat',
  message: 'Hello guild!'
}));

// Receive message
{
  type: 'guild_chat_message',
  sender: 'username',
  message: 'Hello!',
  timestamp: 1234567890
}
```

### 4. Guild Warehouse

**Features:**
- Shared item storage
- All members can deposit items
- Only leader and officers can withdraw items
- Track who deposited each item
- Timestamp for deposits

**API Endpoints:**
- `GET /api/guild/:guildId/warehouse` - View warehouse
- `POST /api/guild/:guildId/warehouse/deposit` - Deposit item
- `POST /api/guild/:guildId/warehouse/withdraw` - Withdraw item (officers+)

### 5. Guild Quests

**Features:**
- Random quest generation
- Quest types: Kill, Gather, Dungeon
- Progress tracking
- Automatic rewards (gold, XP)
- Guild leveling from quest XP
- Maximum 5 active quests
- Quest history (last 10 completed)

**API Endpoints:**
- `GET /api/guild/:guildId/quests` - Get active and completed quests
- `POST /api/guild/:guildId/quests/add` - Add random quest (leader only)
- `POST /api/guild/:guildId/quests/:questId/progress` - Update progress

**Quest Examples:**
- Monster Hunter: Defeat 100 enemies (1000 gold, 500 XP)
- Elite Slayer: Defeat 50 elite enemies (2000 gold, 1000 XP)
- Dungeon Crawler: Complete 10 dungeons (5000 gold, 2500 XP)

### 6. PvP Arena (1v1 and 3v3)

**Features:**
- Two match types: 1v1 and 3v3
- Match states: waiting, in-progress, completed, cancelled
- Ready check system
- Team assignment
- Match events tracking
- Duration tracking
- Winner determination

**API Endpoints:**
- `GET /api/pvp/match/:matchId` - Get match details
- `POST /api/pvp/match/:matchId/ready` - Mark as ready
- `POST /api/pvp/match/:matchId/complete` - Complete match
- `GET /api/pvp/matches/history` - Get match history

**Match Flow:**
1. Players join matchmaking queue
2. System creates match when enough players found
3. Players mark ready
4. Match starts when all ready
5. Match completes with winner
6. Ratings updated automatically

### 7. PvP Matchmaking

**Features:**
- Separate queues for 1v1 and 3v3
- Rating-based matchmaking
- Queue position tracking
- Estimated wait time
- Automatic match creation
- Team balancing by rating

**API Endpoints:**
- `POST /api/pvp/queue/join` - Join queue
- `POST /api/pvp/queue/leave` - Leave queue
- `GET /api/pvp/queue/status/:matchType` - Get queue status

**Algorithm:**
1. Players join queue with their rating
2. Queue sorted by rating
3. When enough players available, create match
4. Balance teams by rating
5. Notify all players

### 8. Ranking System (ELO-based)

**Features:**
- ELO rating system (starting: 1000)
- K-factor: 32 (standard)
- Win/loss tracking
- Total matches counter
- Leaderboard (top 100)
- Minimum 5 matches to appear on leaderboard
- Rank updates after each match

**API Endpoints:**
- `GET /api/pvp/leaderboard` - Get top 100 players
- `GET /api/pvp/rank` - Get your rank and stats

**Rating Calculation:**
- Expected score based on rating difference
- Actual score (1 for win, 0 for loss)
- Rating change = K × (actual - expected)
- No rating floor (can go below 1000)

### 9. Real-time Multiplayer (WebSocket)

**Features:**
- JWT-based WebSocket authentication
- Connection management
- Online status tracking
- Real-time guild chat
- PvP action broadcasting
- Player position updates
- Ping/pong heartbeat

**Connection:**
```javascript
const ws = new WebSocket('ws://localhost:3000?token=YOUR_JWT_TOKEN');
```

**Supported Events:**

**Client → Server:**
- `guild_chat` - Send guild message
- `pvp_action` - PvP action (skill, move, etc.)
- `player_position` - Update position
- `ping` - Heartbeat

**Server → Client:**
- `connected` - Connection successful
- `guild_chat_message` - Guild message broadcast
- `pvp_action` - PvP action broadcast
- `player_position` - Player moved
- `pong` - Heartbeat response

## Database Models

### User Model
```javascript
{
  username: String (unique, 3-20 chars),
  email: String (unique),
  password: String (hashed),
  character: {
    class: String (warrior|ninja|shaman|sura),
    level: Number,
    experience: Number,
    gold: Number,
    stats: { maxHp, maxMp, damage, defense, speed },
    position: { x, y },
    inventory: Array,
    equipment: Object
  },
  guild: ObjectId (ref: Guild),
  guildRank: String (leader|officer|member),
  pvp: {
    rating: Number (default: 1000),
    wins: Number,
    losses: Number,
    totalMatches: Number,
    rank: Number
  },
  online: Boolean,
  lastLogin: Date
}
```

### Guild Model
```javascript
{
  name: String (unique, 3-20 chars),
  tag: String (unique, 2-5 chars, uppercase),
  description: String (max 200 chars),
  leader: ObjectId (ref: User),
  officers: [ObjectId],
  members: [ObjectId],
  level: Number (1-10),
  experience: Number,
  maxMembers: Number (default: 20),
  warehouse: [{ item, depositedBy, depositedAt }],
  gold: Number,
  quests: [{
    id, name, description, type, target,
    current, required, reward, status
  }],
  ranking: {
    pvpWins, totalMembers, averageLevel, points, rank
  },
  chat: [{ sender, senderName, message, timestamp }],
  settings: {
    joinType: String (open|approval|invite-only),
    minLevel: Number
  }
}
```

### PvPMatch Model
```javascript
{
  type: String (1v1|3v3),
  status: String (waiting|in-progress|completed|cancelled),
  team1: {
    players: [{ user, username, character, ready }],
    score: Number
  },
  team2: {
    players: [{ user, username, character, ready }],
    score: Number
  },
  winner: String (team1|team2|null),
  map: String,
  duration: Number (seconds),
  ratingChanges: [{
    user, oldRating, newRating, change
  }],
  events: [{ type, timestamp, data }],
  startedAt: Date,
  completedAt: Date
}
```

## Testing

### Test User Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "characterClass": "warrior"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### Test Guild Creation
```bash
curl -X POST http://localhost:3000/api/guild/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Test Guild",
    "tag": "TEST",
    "description": "A test guild"
  }'
```

### Test Matchmaking
```bash
curl -X POST http://localhost:3000/api/pvp/queue/join \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "matchType": "1v1"
  }'
```

## Next Steps (Frontend UI)

The backend is complete, but the frontend UI still needs to be implemented:

### 1. Authentication UI
- [ ] Login screen
- [ ] Registration screen
- [ ] Character selection screen
- [ ] Session management

### 2. Guild Management UI
- [ ] Guild browser
- [ ] Guild creation dialog
- [ ] Guild info panel
- [ ] Member list with ranks
- [ ] Invite/kick/promote/demote buttons

### 3. Guild Chat UI
- [ ] Chat panel/window
- [ ] Message input
- [ ] Message history display
- [ ] Real-time message updates

### 4. Guild Warehouse UI
- [ ] Warehouse panel
- [ ] Item grid display
- [ ] Deposit button
- [ ] Withdraw button (permission-based)
- [ ] Item tooltips

### 5. Guild Quests UI
- [ ] Quest list panel
- [ ] Active quests display
- [ ] Progress bars
- [ ] Quest rewards display
- [ ] Add quest button (leader only)

### 6. PvP Arena UI
- [ ] Arena entry button
- [ ] Match type selection (1v1/3v3)
- [ ] Queue status display
- [ ] Ready check dialog
- [ ] Match results screen
- [ ] Rating change display

### 7. Leaderboard UI
- [ ] PvP leaderboard panel
- [ ] Player rankings list
- [ ] Your rank display
- [ ] Win/loss stats

## API Documentation

Complete API documentation is available in `API_DOCUMENTATION.md`.

## Security Considerations

### Implemented:
- ✅ Password hashing (bcryptjs)
- ✅ JWT authentication
- ✅ WebSocket authentication
- ✅ Input validation
- ✅ Authorization checks (guild permissions)

### Recommended for Production:
- [ ] Rate limiting (express-rate-limit)
- [ ] CORS configuration
- [ ] Helmet.js (security headers)
- [ ] Input sanitization (express-validator)
- [ ] HTTPS/WSS
- [ ] Environment variable validation
- [ ] Error handling middleware
- [ ] Logging (Winston)
- [ ] Database connection pooling

## Performance Considerations

### Current Implementation:
- Basic query optimization
- Indexed fields (username, email, guild name)
- Population of references where needed
- Limited result sets (pagination)

### Recommendations:
- [ ] Redis caching (leaderboards, online users)
- [ ] Database query optimization
- [ ] WebSocket connection pooling
- [ ] Load balancing
- [ ] CDN for static assets
- [ ] Database sharding (if needed)

## Known Limitations

1. **Match Completion:** Currently any player can report match results. In production, this should be server-authoritative.

2. **Position Updates:** Player position updates broadcast to all users. Should implement spatial partitioning for large player counts.

3. **Guild Invites:** Currently auto-accepts invitations. Should implement invitation system with accept/decline.

4. **Chat History:** Limited to last 100 messages. Consider implementing pagination or external storage.

5. **Quest Generation:** Limited quest templates. Could be expanded with procedural generation.

6. **No Anti-Cheat:** Client-side validation only. Needs server-side validation for production.

## Troubleshooting

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED
```
**Solution:** Make sure MongoDB is running:
```bash
sudo systemctl start mongodb  # Linux
brew services start mongodb-community  # macOS
```

### JWT Token Invalid
```
Error: Invalid or expired token
```
**Solution:** Token may have expired. Login again to get a new token.

### WebSocket Connection Failed
```
Error: WebSocket connection failed
```
**Solution:** Ensure you're passing the JWT token in the URL:
```javascript
ws://localhost:3000?token=YOUR_TOKEN
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:** Change port in .env or kill process using port 3000:
```bash
lsof -ti:3000 | xargs kill -9
```

## Contributing

This is a sprint implementation for an MMORPG game. All backend features for Guild and PvP systems are complete and ready for frontend integration.

## License

Part of Metin2-Style MMORPG Game Project

---

**Sprint Status:** Backend Complete ✅
**Next Sprint:** UI Implementation
**Estimated Frontend Hours:** 40-50 hours
