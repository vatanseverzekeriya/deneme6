# API Documentation

## REST API Endpoints

### Dashboard

#### GET /
Redirects to dashboard.

**Response:** 302 Redirect to `/dashboard`

#### GET /dashboard
Returns the main dashboard HTML page.

**Response:** 200 OK
```html
<!DOCTYPE html>
<html>
<!-- Dashboard HTML -->
</html>
```

**Features:**
- Game selector (Simple Game / RPG Game)
- QR code for mobile access
- URL copy functionality
- Live preview iframe
- Connection counter

### API Routes

#### GET /api/connections
Returns the number of connected WebSocket clients.

**Response:** 200 OK
```json
{
  "count": 3
}
```

**Example:**
```javascript
fetch('/api/connections')
  .then(r => r.json())
  .then(data => console.log('Connected clients:', data.count));
```

### Game Routes

#### GET /game.html
Serves the simple obstacle-dodging game.

**Response:** 200 OK
- HTML file with embedded game

#### GET /metin2-style.html
Serves the RPG-style game.

**Response:** 200 OK
- HTML file with RPG game

## WebSocket API

### Connection

Connect to WebSocket server:

```javascript
const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  console.log('Connected to server');
};

ws.onclose = () => {
  console.log('Disconnected from server');
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};
```

### Messages

#### Server → Client

##### reload
Triggers client to reload the page.

**Message:** `"reload"`

**Client handling:**
```javascript
ws.onmessage = (event) => {
  if (event.data === 'reload') {
    location.reload();
  }
};
```

**Triggered by:**
- File changes in watched directories
- Manual server broadcast

## Server-Side API

### WebSocketManager

Manages WebSocket connections and broadcasting.

```typescript
class WebSocketManager {
  // Broadcast message to all connected clients
  broadcast(message: string): void

  // Get number of connected clients
  getClientCount(): number
}
```

**Example:**
```typescript
// Broadcast reload to all clients
wsManager.broadcast('reload');

// Get client count
const count = wsManager.getClientCount();
console.log(`${count} clients connected`);
```

### FileWatcher

Watches files for changes and triggers broadcasts.

```typescript
class FileWatcher {
  // Start watching file patterns
  watch(paths: string[]): void

  // Stop watching
  close(): void
}
```

**Example:**
```typescript
const fileWatcher = new FileWatcher(wsManager);

// Watch multiple patterns
fileWatcher.watch([
  'public/**/*.html',
  'src/**/*.ts'
]);

// Clean up
fileWatcher.close();
```

### DashboardController

Handles dashboard and API routes.

```typescript
class DashboardController {
  // Render dashboard page
  getDashboard(req: Request, res: Response): void

  // Get connection count
  getConnections(req: Request, res: Response): void
}
```

## TypeScript Types

### Shared Types

Located in `src/shared/types.ts`:

```typescript
interface Player {
  class: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  level: number;
  hp: number;
  maxHP: number;
  mp: number;
  maxMP: number;
  damage: number;
  defense: number;
  speed: number;
  gold: number;
}

interface Mob {
  name: string;
  icon: string;
  hp: number;
  maxHP: number;
  damage: number;
  xp: number;
  gold: number;
  speed: number;
  x: number;
  y: number;
}

interface Skill {
  name: string;
  icon: string;
  damage?: number;
  heal?: number;
  mpCost: number;
  cooldown: number;
  key: string;
}

interface Item {
  name: string;
  icon: string;
  type: 'potion' | 'gold' | 'weapon' | 'armor';
  heal?: number;
  mana?: number;
  value?: number;
}
```

## Error Handling

### HTTP Errors

No explicit error routes - uses Express default error handler.

**Common errors:**
- 404 Not Found - Route doesn't exist
- 500 Internal Server Error - Server error

### WebSocket Errors

```typescript
ws.on('error', (error: Error) => {
  console.error('WebSocket error:', error);
  // Connection is automatically removed from client set
});
```

## Rate Limiting

Currently not implemented. Consider adding for production:

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## CORS

Currently allows all origins. For production, configure CORS:

```typescript
import cors from 'cors';

app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

## Authentication

Not currently implemented. For future implementation:

```typescript
// JWT-based authentication
import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Protected route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ data: 'Protected data' });
});
```

## Logging

Current logging uses `console.info` and `console.error`.

For production, consider structured logging:

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

logger.info('Server started', { port: 3000 });
logger.error('Error occurred', { error: error.message });
```

## Examples

### Complete Client Implementation

```html
<!DOCTYPE html>
<html>
<head>
  <title>Game Client</title>
</head>
<body>
  <div id="game"></div>
  <div id="status"></div>

  <script>
    // WebSocket connection
    const ws = new WebSocket('ws://' + window.location.host);

    ws.onopen = () => {
      updateStatus('Connected');
    };

    ws.onmessage = (event) => {
      if (event.data === 'reload') {
        console.log('Reloading...');
        location.reload();
      }
    };

    ws.onclose = () => {
      updateStatus('Disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      updateStatus('Error');
    };

    function updateStatus(status) {
      document.getElementById('status').textContent = `Status: ${status}`;
    }

    // Get connection count
    async function getConnections() {
      const response = await fetch('/api/connections');
      const data = await response.json();
      console.log(`${data.count} clients connected`);
    }

    // Update every 2 seconds
    setInterval(getConnections, 2000);
  </script>
</body>
</html>
```

### Complete Server Implementation

```typescript
import express from 'express';
import { GameServer } from './server';

// Create and start server
const server = new GameServer(3000);
server.start();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
```
