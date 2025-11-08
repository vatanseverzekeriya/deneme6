# Metin2-Style MMORPG API Documentation

## Sprint 11-12: Guild & PvP System

This document describes all API endpoints for the Guild and PvP features.

## Base URL
```
http://localhost:3000/api
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Register
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "username": "string (3-20 chars)",
  "email": "string",
  "password": "string (min 6 chars)",
  "characterClass": "warrior|ninja|shaman|sura"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "username": "username",
    "character": { ... },
    "pvp": { ... }
  }
}
```

### Login
**POST** `/auth/login`

Login to existing account.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token",
  "user": { ... }
}
```

### Get Profile
**GET** `/auth/profile`

Get current user profile (requires authentication).

**Response:**
```json
{
  "id": "user_id",
  "username": "username",
  "character": {
    "class": "warrior",
    "level": 1,
    "experience": 0,
    "gold": 100,
    "stats": { ... }
  },
  "guild": "guild_id or null",
  "guildRank": "leader|officer|member|null",
  "pvp": {
    "rating": 1000,
    "wins": 0,
    "losses": 0,
    "rank": 0
  }
}
```

## Guild System

### Create Guild
**POST** `/guild/create`

Create a new guild (requires authentication).

**Request Body:**
```json
{
  "name": "string (3-20 chars)",
  "tag": "string (2-5 chars)",
  "description": "string (optional, max 200 chars)"
}
```

**Response:**
```json
{
  "message": "Guild created successfully",
  "guild": {
    "id": "guild_id",
    "name": "Guild Name",
    "tag": "TAG",
    "description": "Description",
    "leader": "user_id",
    "level": 1,
    "members": [],
    "officers": []
  }
}
```

### Get My Guild
**GET** `/guild/my/guild`

Get details of your current guild.

**Response:**
```json
{
  "id": "guild_id",
  "name": "Guild Name",
  "tag": "TAG",
  "description": "Description",
  "leader": { ... },
  "officers": [ ... ],
  "members": [ ... ],
  "level": 1,
  "experience": 0,
  "maxMembers": 20,
  "warehouse": [ ... ],
  "quests": [ ... ],
  "ranking": { ... }
}
```

### Get Guild by ID
**GET** `/guild/:guildId`

Get details of any guild by ID.

### Invite Player
**POST** `/guild/invite`

Invite a player to your guild (requires leader or officer rank).

**Request Body:**
```json
{
  "username": "string"
}
```

### Leave Guild
**POST** `/guild/leave`

Leave your current guild (leaders cannot leave).

### Kick Member
**POST** `/guild/kick`

Kick a member from your guild (requires leader).

**Request Body:**
```json
{
  "username": "string"
}
```

### Promote Member
**POST** `/guild/promote`

Promote a member to officer (requires leader).

**Request Body:**
```json
{
  "username": "string"
}
```

### Demote Officer
**POST** `/guild/demote`

Demote an officer to member (requires leader).

**Request Body:**
```json
{
  "username": "string"
}
```

### Guild Chat
**GET** `/guild/:guildId/chat`

Get guild chat history (last 50 messages).

**POST** `/guild/:guildId/chat`

Send a message to guild chat.

**Request Body:**
```json
{
  "message": "string"
}
```

### Guild Warehouse
**GET** `/guild/:guildId/warehouse`

Get guild warehouse items.

**POST** `/guild/:guildId/warehouse/deposit`

Deposit an item to guild warehouse (all members can deposit).

**Request Body:**
```json
{
  "item": {
    "id": "item_id",
    "name": "Item Name",
    "type": "weapon|armor|potion|etc",
    "rarity": "common|rare|epic|legendary",
    "stats": { ... }
  }
}
```

**POST** `/guild/:guildId/warehouse/withdraw`

Withdraw an item from guild warehouse (only leader and officers).

**Request Body:**
```json
{
  "itemId": "item_id"
}
```

### List All Guilds
**GET** `/guild/list/all`

Get list of all guilds (sorted by ranking points).

## PvP System

### Join Matchmaking Queue
**POST** `/pvp/queue/join`

Join PvP matchmaking queue.

**Request Body:**
```json
{
  "matchType": "1v1|3v3"
}
```

**Response:**
```json
{
  "message": "Match found!" or "Joined matchmaking queue",
  "matchId": "match_id (if found)",
  "queuePosition": 1,
  "estimatedWaitTime": "< 1 minute"
}
```

### Leave Matchmaking Queue
**POST** `/pvp/queue/leave`

Leave PvP matchmaking queue.

**Request Body:**
```json
{
  "matchType": "1v1|3v3"
}
```

### Get Queue Status
**GET** `/pvp/queue/status/:matchType`

Get current queue status for a match type.

**Response:**
```json
{
  "queueSize": 5,
  "estimatedWaitTime": "2 minutes"
}
```

### Get Match Details
**GET** `/pvp/match/:matchId`

Get details of a specific match.

**Response:**
```json
{
  "id": "match_id",
  "type": "1v1|3v3",
  "status": "waiting|in-progress|completed|cancelled",
  "team1": {
    "players": [ ... ],
    "score": 0
  },
  "team2": {
    "players": [ ... ],
    "score": 0
  },
  "winner": "team1|team2|null",
  "duration": 0,
  "ratingChanges": [ ... ]
}
```

### Mark Ready
**POST** `/pvp/match/:matchId/ready`

Mark yourself as ready in a match. Match starts when all players are ready.

### Complete Match
**POST** `/pvp/match/:matchId/complete`

Report match completion (for now, any player can report - in production this should be server-side).

**Request Body:**
```json
{
  "winner": "team1|team2"
}
```

**Response:**
```json
{
  "message": "Match completed",
  "match": { ... },
  "ratingChanges": [
    {
      "user": "user_id",
      "oldRating": 1000,
      "newRating": 1032,
      "change": 32
    }
  ]
}
```

### Get Match History
**GET** `/pvp/matches/history?limit=10`

Get your match history.

### Get Leaderboard
**GET** `/pvp/leaderboard?limit=100`

Get PvP leaderboard (top 100 players by rating).

**Response:**
```json
[
  {
    "username": "Player1",
    "character": {
      "class": "warrior",
      "level": 50
    },
    "pvp": {
      "rating": 1500,
      "wins": 25,
      "losses": 10,
      "rank": 1
    }
  }
]
```

### Get Your Rank
**GET** `/pvp/rank`

Get your current PvP rank and stats.

**Response:**
```json
{
  "rank": 42,
  "rating": 1234,
  "wins": 15,
  "losses": 8,
  "totalMatches": 23
}
```

## WebSocket Events

Connect to WebSocket: `ws://localhost:3000?token=<jwt_token>`

### Client → Server Events

**Guild Chat:**
```json
{
  "type": "guild_chat",
  "message": "Hello guild!"
}
```

**PvP Action:**
```json
{
  "type": "pvp_action",
  "matchId": "match_id",
  "action": "skill-used",
  "data": {
    "skill": "skill_name",
    "target": "user_id"
  }
}
```

**Player Position:**
```json
{
  "type": "player_position",
  "position": {
    "x": 100,
    "y": 200
  }
}
```

**Ping:**
```json
{
  "type": "ping"
}
```

### Server → Client Events

**Connected:**
```json
{
  "type": "connected",
  "message": "Connected to game server",
  "user": { ... }
}
```

**Guild Chat Message:**
```json
{
  "type": "guild_chat_message",
  "sender": "username",
  "message": "Hello!",
  "timestamp": 1234567890
}
```

**PvP Action:**
```json
{
  "type": "pvp_action",
  "matchId": "match_id",
  "action": "skill-used",
  "data": { ... },
  "userId": "user_id"
}
```

**Player Position Update:**
```json
{
  "type": "player_position",
  "userId": "user_id",
  "position": {
    "x": 100,
    "y": 200
  }
}
```

**Pong:**
```json
{
  "type": "pong",
  "timestamp": 1234567890
}
```

## Rating System (ELO)

The PvP system uses an ELO-based rating system:

- Starting rating: 1000
- K-factor: 32
- Minimum rating: 0 (no maximum)

Rating changes are calculated based on:
1. Average team ratings
2. Expected win probability
3. Actual match result

Players need at least 5 matches to appear on the leaderboard.

## Guild Ranking

Guild ranking is based on:
- Total PvP wins by guild members
- Average member level
- Number of active members
- Guild level and experience

Rankings are updated periodically and displayed in the guild list.
