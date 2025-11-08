# Metin2-Style RPG Game - Codebase Architecture Analysis

## 1. MAIN GAME CODE LOCATION

### Core Files:
- **`/home/user/deneme6/rpg-game.js`** (653 lines)
  - Main Game class with all RPG logic
  - Character class definitions
  - Mob spawn and combat systems
  - Skill system implementation
  - Inventory and item systems
  - Player movement and controls

- **`/home/user/deneme6/metin2-style.html`** (444 lines)
  - Main RPG game interface
  - Canvas-based rendering
  - Character selection screen
  - HUD with stat bars
  - Joystick and inventory UI
  - Embedded live reload WebSocket script

- **`/home/user/deneme6/game.html`** (Simple dodge game)
  - Basic obstacle-dodging game
  - Used as example/demo

- **`/home/user/deneme6/server.js`** (509 lines)
  - Express.js server for file serving
  - WebSocket server for live reload
  - Dashboard route with game selector
  - Static file serving

---

## 2. CURRENT ARCHITECTURE

### Type: **Client-Side Only (Single-Player)**

```
┌─────────────────────────────────────────────────────┐
│            BROWSER (Client-Side)                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  metin2-style.html (UI + Canvas Rendering)         │
│         ↓                                           │
│  rpg-game.js (Game Logic, Player, Mobs, Skills)    │
│         ↓                                           │
│  Local State Only (No Server Communication)        │
│                                                     │
└─────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────┐
│        Express Server (server.js)                   │
├─────────────────────────────────────────────────────┤
│ • Static file serving                              │
│ • WebSocket for LIVE RELOAD only (chokidar)        │
│ • Dashboard route (/dashboard)                     │
│ • Connection counter endpoint (/api/connections)   │
└─────────────────────────────────────────────────────┘
```

### Key Architecture Details:
- **Frontend**: HTML5 Canvas + Vanilla JavaScript
- **Rendering**: 2D Canvas with emoji-based graphics
- **Game Loop**: RequestAnimationFrame-based
- **Controls**: Keyboard, touch/mobile joystick
- **State**: All stored in Game class instance (in-memory)
- **Persistence**: NONE - game resets on page reload

---

## 3. EXISTING DATA MODELS

### Character Classes (CLASSES object):
```javascript
4 Classes with different stat distributions:
  - Warrior (🛡️): Tank - High HP/Defense, Medium Damage
  - Ninja (🗡️): Rogue - Low HP, High Damage
  - Shaman (🔮): Healer - Medium HP, High MP, Heal Skills
  - Sura (⚡): Dark Knight - Balanced, Lifesteal Skills
```

### Player Model:
```javascript
{
  class: string,
  name: string,
  icon: emoji,
  x, y: coordinates,
  size: number,
  
  // Stats
  level: number,
  xp: number,
  xpToLevel: number,
  hp, maxHP: number,
  mp, maxMP: number,
  damage: number,
  defense: number,
  speed: number,
  
  // Systems
  skills: Array<Skill>,
  gold: number,
  attackCooldown: number
}
```

### Skill Model:
```javascript
{
  name: string,
  icon: emoji,
  damage?: number,
  heal?: number,
  dodge?: boolean,
  lifesteal?: number,
  mpCost: number,
  cooldown: milliseconds,
  key: 'Q'|'W'|'E',
  cooldownRemaining: number
}
```

### Mob Model:
```javascript
5 Enemy Types (MOB_TYPES):
{
  name: string,
  icon: emoji,
  hp, maxHP: number,
  damage: number,
  xp: number (rewards),
  gold: number (rewards),
  speed: number,
  x, y: coordinates,
  size: number,
  targetCooldown: number
}
```

### Inventory/Item Model:
```javascript
5 Item Types:
{
  name: string,
  icon: emoji,
  type: 'potion'|'gold'|'weapon'|'armor',
  heal?: number,
  mana?: number,
  value?: number,
  damage?: number,
  defense?: number
}

Inventory: Array(5) of Item
```

### Drop Model:
```javascript
{
  name: string,
  icon: emoji,
  type: string,
  x, y: coordinates,
  size: number,
  // + all item properties
}
```

---

## 4. DATABASE SETUP

### Current Status: **NONE**

**No database exists**
- No MongoDB, PostgreSQL, or any database
- No ORM (Sequelize, Mongoose, etc.)
- No data persistence
- All game state is in-memory only
- Game resets on page refresh

**package.json Dependencies**:
```json
{
  "express": "^4.18.2",      // Web server
  "ws": "^8.14.2",           // WebSocket
  "qrcode": "^1.5.3",        // QR code generation
  "chokidar": "^3.5.3"       // File watcher for live reload
}
```

**No database packages installed**

---

## 5. UI FRAMEWORK

### Frontend Stack:
- **Rendering**: HTML5 Canvas API (2D context)
- **HTML**: Vanilla HTML5 (no framework)
- **CSS**: Inline CSS in HTML files
- **JavaScript**: Vanilla JS, no frameworks (no React, Vue, etc.)
- **Graphics**: Emoji-based (🛡️ 🗡️ 🔮 ⚡ 🐺 👹 🧟 etc.)

### UI Components:

1. **Character Selection Screen**
   - Grid layout (2x2)
   - Clickable character cards
   - Class selection triggers game start

2. **HUD (Heads-Up Display)**
   - Player name and level
   - HP bar (red gradient)
   - MP bar (blue gradient)
   - XP bar (green gradient)
   - Text overlays with current values

3. **Skills Panel** (Fixed right side)
   - 3 skill buttons (circular)
   - Icon + keyboard shortcut key
   - Cooldown overlay
   - Click-to-activate

4. **Joystick Control** (Fixed bottom-left)
   - Circular base with stick
   - Touch-draggable movement
   - Smooth analog control

5. **Inventory** (Fixed bottom-center)
   - 5 inventory slots
   - Drag-and-drop ready (not implemented)
   - Item icons display

6. **Notifications**
   - Floating damage numbers
   - Loot pickup notifications
   - Level up alerts

7. **Canvas Game Area**
   - Full-screen rendering
   - Grid background
   - Characters/Mobs/Drops as emoji

### Responsive Design:
- Mobile joystick support
- Touch controls for movement
- Responsive canvas resizing
- Mobile-optimized touch buttons

---

## 6. EXISTING MULTIPLAYER/NETWORKING FEATURES

### Current Status: **NONE - SINGLE PLAYER ONLY**

### What EXISTS:
1. **WebSocket Server** (for live reload only)
   ```javascript
   // In server.js
   const wss = new WebSocket.Server({ server });
   
   // Used ONLY for:
   - Monitoring file changes (chokidar)
   - Broadcasting 'reload' signal to all connected clients
   - NOT for game logic or player sync
   ```

2. **Connection Tracking**
   ```javascript
   // Tracks number of connected clients
   const clients = new Set();
   
   // API endpoint
   app.get('/api/connections') → returns { count: number }
   ```

3. **Dashboard**
   - Shows QR code for mobile access
   - Game selector (Basic vs RPG)
   - Connection counter
   - Live reload indicator

### What DOES NOT EXIST:
- No player-to-player communication
- No server-side game logic
- No multiplayer session management
- No player accounts/authentication
- No guild system
- No PvP combat system
- No shared world/map
- No chat system
- No party/group system
- No persistence of player data
- No anti-cheat systems

### WebSocket Usage (Current):
```javascript
// Game loads and connects to WebSocket server
ws = new WebSocket('ws://' + window.location.host);

// Only listens for:
ws.onmessage = (event) => {
    if (event.data === 'reload') {
        window.location.reload();  // Live reload trigger
    }
};
```

---

## SUMMARY TABLE

| Aspect | Status | Details |
|--------|--------|---------|
| **Architecture** | Client-Only | No server-side game logic |
| **Multiplayer** | None | Single-player only |
| **Database** | None | No persistence layer |
| **Networking** | WebSocket | Live reload only |
| **Framework** | Vanilla | No React/Vue/Angular |
| **Rendering** | Canvas 2D | Emoji graphics |
| **Character System** | ✓ Complete | 4 classes with skills |
| **Combat System** | ✓ Complete | Skills, damage, defense |
| **Inventory** | ✓ Complete | 5-slot inventory |
| **Leveling** | ✓ Complete | XP and level progression |
| **Mob Spawning** | ✓ Complete | 5 enemy types |
| **Controls** | ✓ Complete | Keyboard + Mobile |
| **Guild System** | ✗ NOT IMPLEMENTED | Ready to build |
| **PvP System** | ✗ NOT IMPLEMENTED | Ready to build |

---

## READY-TO-BUILD FEATURES

For implementing Guild and PvP features, you have:

✓ **Foundation Ready**:
- Character/Class system
- Combat/Skill system  
- Inventory system
- Level progression
- Stat/equipment system

✓ **Networking Ready**:
- Express server structure
- WebSocket infrastructure
- Connection management

✗ **Still Needed**:
- Database (MongoDB recommended)
- Server-side session management
- Multiplayer game logic
- Guild data models
- PvP matchmaking
- Player persistence
- Real-time synchronization

