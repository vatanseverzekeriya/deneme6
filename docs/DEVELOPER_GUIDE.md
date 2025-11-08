# Developer Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Development Workflow](#development-workflow)
4. [Architecture](#architecture)
5. [Coding Standards](#coding-standards)
6. [Testing](#testing)
7. [Deployment](#deployment)

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Git
- Text editor (VS Code recommended)

### Initial Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd deneme6
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
npm start
```

## Project Structure

```
deneme6/
├── src/                      # Source code
│   ├── server/              # Server-side code
│   │   ├── index.ts         # Server entry point
│   │   ├── controllers/     # Route controllers
│   │   └── services/        # Business logic services
│   ├── game/                # Game client code
│   │   ├── index.ts         # Game entry point
│   │   ├── scenes/          # Phaser scenes
│   │   └── entities/        # Game entities
│   └── shared/              # Shared types & utilities
│       └── types.ts         # TypeScript type definitions
├── public/                  # Static files served to client
│   ├── js/                  # Compiled JavaScript
│   ├── css/                 # Stylesheets
│   ├── images/              # Images & sprites
│   └── *.html               # HTML game files
├── assets/                  # Source assets
│   ├── sprites/             # Sprite images for sheet generation
│   ├── sounds/              # Audio files
│   └── fonts/               # Custom fonts
├── docs/                    # Documentation
│   ├── DEVELOPER_GUIDE.md   # This file
│   ├── GIT_STRATEGY.md      # Git workflow guide
│   └── API.md               # API documentation
├── dist/                    # Compiled TypeScript output
├── tsconfig.json           # TypeScript configuration
├── webpack.config.js       # Webpack configuration
├── .eslintrc.json         # ESLint configuration
├── .prettierrc            # Prettier configuration
└── package.json           # Project dependencies & scripts

```

## Development Workflow

### Daily Development

1. **Pull latest changes**
```bash
git checkout develop
git pull origin develop
```

2. **Create feature branch**
```bash
git checkout -b feature/my-feature
```

3. **Start dev server with hot reload**
```bash
npm run dev
```

4. **Run linter & formatter**
```bash
npm run lint:fix
npm run format
```

5. **Build TypeScript**
```bash
npm run build
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run build:watch` | Compile TypeScript in watch mode |
| `npm start` | Start production server |
| `npm run lint` | Check code for lint errors |
| `npm run lint:fix` | Fix lint errors automatically |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run webpack` | Build game bundle for production |
| `npm run webpack:dev` | Build game bundle in dev mode with watch |
| `npm run sprites` | Generate sprite sheet from assets |
| `npm run clean` | Remove compiled files |

## Architecture

### Server Architecture

The server follows a modular MVC-like pattern:

```typescript
// src/server/index.ts - Main server entry point
class GameServer {
  private app: Express;
  private server: http.Server;
  private wss: WebSocketServer;
  private wsManager: WebSocketManager;
  private fileWatcher: FileWatcher;

  constructor() { /* ... */ }

  private setupMiddleware(): void { /* ... */ }
  private setupRoutes(): void { /* ... */ }
  private setupFileWatcher(): void { /* ... */ }

  public start(): void { /* ... */ }
}
```

**Key Components:**

1. **Controllers** (`src/server/controllers/`)
   - Handle HTTP requests
   - Return responses
   - Delegate business logic to services

2. **Services** (`src/server/services/`)
   - `WebSocketManager`: Manages WebSocket connections
   - `FileWatcher`: Watches file changes for live reload

3. **Middleware** (in `index.ts`)
   - Static file serving
   - JSON parsing

### Game Architecture

The game uses Phaser 3 framework with a scene-based architecture:

```typescript
// src/game/index.ts - Game initialization
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scenes: [MenuScene, MainScene],
  physics: { default: 'arcade' }
};

new Phaser.Game(config);
```

**Scenes:**
- `MenuScene`: Main menu & character selection
- `MainScene`: Core gameplay

### Type System

Shared types in `src/shared/types.ts`:

```typescript
export interface Player {
  x: number;
  y: number;
  hp: number;
  maxHP: number;
  // ...
}

export interface Mob {
  name: string;
  damage: number;
  // ...
}
```

## Coding Standards

### TypeScript Guidelines

1. **Use strict mode** (enabled in tsconfig.json)
2. **Explicit types** for function parameters and return values
3. **Interfaces** for object shapes
4. **Avoid `any`** - use `unknown` if type is truly unknown

```typescript
// Good
function calculateDamage(baseDamage: number, defense: number): number {
  return Math.max(1, baseDamage - defense);
}

// Bad
function calculateDamage(baseDamage, defense) {
  return Math.max(1, baseDamage - defense);
}
```

### ESLint Rules

Key rules enforced:
- `no-console`: Warn (allow `console.error`, `console.warn`, `console.info`)
- `prefer-const`: Error
- `no-var`: Error
- `@typescript-eslint/no-unused-vars`: Error

### Prettier Configuration

- Single quotes
- Semicolons required
- 2-space indentation
- 100 character line width
- Trailing commas (ES5)

### Naming Conventions

- **Classes**: PascalCase (`GameServer`, `WebSocketManager`)
- **Functions**: camelCase (`setupRoutes`, `getLocalIP`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_PLAYERS`, `DEFAULT_PORT`)
- **Interfaces**: PascalCase with `I` prefix optional (`Player`, `IGameConfig`)
- **Files**: PascalCase for classes, camelCase for utilities

## File Organization

### Creating New Features

1. **Server-side feature:**
```
src/server/
├── controllers/
│   └── MyFeatureController.ts
└── services/
    └── MyFeatureService.ts
```

2. **Game feature:**
```
src/game/
├── scenes/
│   └── MyScene.ts
└── entities/
    └── MyEntity.ts
```

3. **Shared types:**
```
src/shared/
└── types.ts  # Add new interfaces here
```

## Asset Pipeline

### Sprite Sheet Generation

1. **Add sprites to `assets/sprites/`**
```
assets/sprites/
├── player.png
├── enemy1.png
└── enemy2.png
```

2. **Generate sprite sheet**
```bash
npm run sprites
```

3. **Output:**
```
public/images/spritesheet.png
src/game/styles/sprites.css
```

4. **Use in CSS:**
```css
.sprite-player { background: url('/images/spritesheet.png') -0px -0px; }
```

### Adding New Assets

**Images:**
- Place in `assets/sprites/` for sprite sheet
- Place in `public/images/` for standalone images

**Sounds:**
- Place in `assets/sounds/`
- Supported formats: MP3, OGG, WAV

**Fonts:**
- Place in `assets/fonts/`
- Update CSS with `@font-face`

## WebSocket Integration

### Server-side

```typescript
// Broadcast to all clients
this.wsManager.broadcast('reload');

// Get client count
const count = this.wsManager.getClientCount();
```

### Client-side

```javascript
const ws = new WebSocket('ws://' + window.location.host);

ws.onmessage = (event) => {
  if (event.data === 'reload') {
    location.reload();
  }
};
```

## Live Reload

The file watcher monitors these patterns:
- `public/**/*.{html,js,css}`
- `src/**/*.{ts,tsx}`

When a file changes:
1. FileWatcher detects change
2. WebSocketManager broadcasts 'reload'
3. All connected clients reload

## Testing

### Manual Testing

1. **Start dev server**
```bash
npm run dev
```

2. **Open dashboard**
```
http://localhost:3000/dashboard
```

3. **Test on mobile**
- Scan QR code with phone
- Ensure same WiFi network

### Automated Testing (To be implemented)

```bash
npm test
```

## Debugging

### Server Debugging

Add debug statements:
```typescript
console.info('Server started on port:', this.port);
console.error('Error:', error);
```

### Game Debugging

Use Phaser debug mode:
```typescript
physics: {
  arcade: {
    debug: true  // Shows collision boxes
  }
}
```

### Browser DevTools

- Press F12 in browser
- Check Console for errors
- Use Network tab for WebSocket traffic

## Performance Optimization

### Server
- Use compression middleware
- Enable caching for static files
- Minimize WebSocket broadcasts

### Game
- Use object pooling for frequently created objects
- Optimize sprite sizes
- Limit physics calculations
- Use sprite sheets instead of individual images

## Common Issues

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=8080 npm run dev
```

### TypeScript Compilation Errors
```bash
# Clean and rebuild
npm run clean
npm run build
```

### WebSocket Connection Failed
- Check firewall settings
- Ensure same WiFi network
- Verify server is running

## Contributing

1. Follow the [Git Strategy](./GIT_STRATEGY.md)
2. Write clean, documented code
3. Run linter before committing
4. Update documentation for new features
5. Test on multiple devices

## Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
