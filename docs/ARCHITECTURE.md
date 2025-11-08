# System Architecture

## Overview

This project is a mobile game preview tool with live reload capabilities, built using a modern TypeScript stack with Express.js backend and Phaser 3 game framework.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Dashboard  │  │  Game Client │  │ Mobile Client│     │
│  │   (Browser)  │  │  (Browser)   │  │   (Mobile)   │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                 │                  │             │
│         │ HTTP/WS         │ HTTP/WS          │ HTTP/WS     │
└─────────┼─────────────────┼──────────────────┼─────────────┘
          │                 │                  │
┌─────────┼─────────────────┼──────────────────┼─────────────┐
│         │                 │                  │             │
│  ┌──────▼─────────────────▼──────────────────▼─────────┐   │
│  │              Express HTTP Server                    │   │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────┐  │   │
│  │  │Controllers │  │Middleware  │  │Static Files  │  │   │
│  │  └────────────┘  └────────────┘  └──────────────┘  │   │
│  └────────────────────────┬─────────────────────────────┘   │
│                           │                                 │
│  ┌────────────────────────▼─────────────────────────────┐   │
│  │           WebSocket Server (ws)                      │   │
│  │  ┌─────────────────┐  ┌──────────────────────────┐  │   │
│  │  │ Connection Pool │  │  WebSocketManager        │  │   │
│  │  └─────────────────┘  └──────────────────────────┘  │   │
│  └────────────────────────┬─────────────────────────────┘   │
│                           │                                 │
│  ┌────────────────────────▼─────────────────────────────┐   │
│  │            File Watcher (chokidar)                   │   │
│  │  Monitors: src/**, public/**                         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│                      Server Layer                           │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### 1. Server Layer (`src/server/`)

#### GameServer (Main Entry Point)
```typescript
class GameServer {
  - app: Express
  - server: http.Server
  - wss: WebSocketServer
  - wsManager: WebSocketManager
  - fileWatcher: FileWatcher

  + start(): void
  + setupMiddleware(): void
  + setupRoutes(): void
  + setupFileWatcher(): void
}
```

**Responsibilities:**
- Initialize Express server
- Configure middleware
- Set up routes
- Start WebSocket server
- Initialize file watcher
- Handle graceful shutdown

#### Controllers (`src/server/controllers/`)

**DashboardController**
```typescript
class DashboardController {
  - localIP: string
  - port: number
  - wsManager: WebSocketManager

  + getDashboard(req, res): void
  + getConnections(req, res): void
}
```

**Responsibilities:**
- Render dashboard HTML
- Provide API endpoints
- Manage client connections

#### Services (`src/server/services/`)

**WebSocketManager**
```typescript
class WebSocketManager {
  - clients: Set<WebSocket>
  - wss: WebSocketServer

  + broadcast(message: string): void
  + getClientCount(): number
  - setupWebSocket(): void
}
```

**Responsibilities:**
- Manage WebSocket connections
- Broadcast messages to clients
- Track active connections
- Handle connection lifecycle

**FileWatcher**
```typescript
class FileWatcher {
  - watcher: FSWatcher
  - wsManager: WebSocketManager

  + watch(paths: string[]): void
  + close(): void
}
```

**Responsibilities:**
- Monitor file system changes
- Trigger WebSocket broadcasts on changes
- Handle file events (add, change, unlink)
- Clean up resources

### 2. Game Layer (`src/game/`)

#### Game Entry Point
```typescript
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scenes: [MenuScene, MainScene],
  physics: { default: 'arcade' }
};

new Phaser.Game(config);
```

#### Scenes

**MenuScene**
```typescript
class MenuScene extends Phaser.Scene {
  + create(): void
  - handleStartGame(): void
}
```

**MainScene**
```typescript
class MainScene extends Phaser.Scene {
  - player: GameObject
  - obstacles: Group
  - score: number

  + create(): void
  + update(): void
  - spawnObstacle(): void
  - gameOver(): void
}
```

### 3. Shared Layer (`src/shared/`)

Type definitions shared between server and client:
- `Player`
- `Mob`
- `Skill`
- `Item`
- `GameConfig`

## Data Flow

### Live Reload Flow

```
1. Developer edits file
   ↓
2. FileWatcher detects change
   ↓
3. FileWatcher triggers WebSocketManager
   ↓
4. WebSocketManager broadcasts 'reload' to all clients
   ↓
5. Clients receive message and reload page
```

### Dashboard Connection Flow

```
1. User opens /dashboard
   ↓
2. DashboardController renders HTML with:
   - QR code for mobile access
   - Game selector
   - Preview iframe
   ↓
3. Client establishes WebSocket connection
   ↓
4. WebSocketManager adds client to connection pool
   ↓
5. Connection count updates in real-time
```

### Game Loading Flow

```
1. User selects game (Simple or RPG)
   ↓
2. Client requests game HTML
   ↓
3. Express serves static file from public/
   ↓
4. Game initializes Phaser
   ↓
5. WebSocket connects for live reload
```

## Network Communication

### HTTP Routes

| Method | Path | Purpose |
|--------|------|---------|
| GET | / | Redirect to dashboard |
| GET | /dashboard | Main dashboard |
| GET | /api/connections | Get connection count |
| GET | /game.html | Simple game |
| GET | /metin2-style.html | RPG game |

### WebSocket Messages

| Direction | Message | Purpose |
|-----------|---------|---------|
| Server → Client | "reload" | Trigger page reload |

## File Structure & Compilation

### TypeScript Compilation

```
src/                          dist/
├── server/                   ├── server/
│   ├── index.ts       →     │   ├── index.js
│   ├── controllers/   →     │   ├── controllers/
│   └── services/      →     │   └── services/
├── game/                     ├── game/
│   ├── index.ts       →     │   ├── index.js
│   └── scenes/        →     │   └── scenes/
└── shared/                   └── shared/
    └── types.ts       →         └── types.js
```

### Webpack Bundling (For Game)

```
src/game/index.ts
  ├── scenes/MenuScene.ts
  ├── scenes/MainScene.ts
  └── [dependencies]
         ↓
    [webpack]
         ↓
public/js/game.bundle.js
```

## Asset Pipeline

### Sprite Sheet Generation

```
assets/sprites/              webpack           public/images/
├── player.png      ───┐                  ┌→  spritesheet.png
├── enemy1.png         ├──→ [spritesmith] ┤
└── enemy2.png      ───┘                  └→  src/game/styles/sprites.css
```

## Deployment Architecture

### Development

```
Developer Machine
├── src/ (TypeScript source)
├── nodemon (auto-restart server)
├── ts-node (run TypeScript directly)
└── File watcher (live reload)
```

### Production

```
Server
├── dist/ (Compiled JavaScript)
├── public/ (Static files)
├── node server (Node.js process)
└── Optional: Process manager (PM2)
```

## Scalability Considerations

### Current Limitations
- Single server instance
- In-memory WebSocket connections
- No persistent storage
- No load balancing

### Scaling Strategy (Future)

**Horizontal Scaling:**
```
                    ┌──────────────┐
                    │ Load Balancer│
                    └───────┬──────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
     ┌────▼────┐       ┌────▼────┐       ┌────▼────┐
     │ Server 1│       │ Server 2│       │ Server 3│
     └────┬────┘       └────┬────┘       └────┬────┘
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
                    ┌───────▼────────┐
                    │ Redis (Pub/Sub)│
                    └────────────────┘
```

**Components for scaling:**
- Redis for WebSocket message distribution
- Sticky sessions for WebSocket connections
- Shared session store (Redis/Memcached)
- CDN for static assets

## Security Considerations

### Current State
- No authentication
- No authorization
- No input validation
- No rate limiting
- CORS open to all origins

### Production Recommendations

1. **Authentication:** JWT or session-based
2. **HTTPS:** TLS/SSL certificates
3. **Input Validation:** Sanitize all inputs
4. **Rate Limiting:** Prevent abuse
5. **CORS:** Restrict to known origins
6. **Content Security Policy:** Prevent XSS
7. **WebSocket Authentication:** Validate connections

## Performance Optimization

### Server
- Enable compression (gzip)
- Cache static files
- Minimize WebSocket broadcasts
- Use connection pooling (if DB added)

### Client
- Bundle minification
- Code splitting
- Lazy loading
- Sprite sheet optimization
- Asset compression

## Monitoring & Logging

### Current
- Console logs only

### Recommended (Production)
- Structured logging (Winston)
- Error tracking (Sentry)
- Performance monitoring (New Relic, DataDog)
- Uptime monitoring
- WebSocket connection metrics

## Technology Stack Summary

| Layer | Technology |
|-------|-----------|
| Language | TypeScript |
| Server | Node.js + Express |
| WebSocket | ws library |
| Game Engine | Phaser 3 |
| File Watching | chokidar |
| Build | TypeScript Compiler + Webpack |
| Linting | ESLint + Prettier |
| Asset Pipeline | webpack-spritesmith |
