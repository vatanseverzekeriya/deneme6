# DETAILED FILE STRUCTURE & CODE ORGANIZATION

## Project Directory Structure
```
/home/user/deneme6/
├── server.js                 # Express + WebSocket server (509 lines)
├── rpg-game.js              # Main game logic (653 lines)
├── metin2-style.html        # RPG game UI (444 lines)
├── game.html                # Dodge game UI (356 lines)
├── package.json             # Project dependencies
├── package-lock.json        # Locked dependencies
├── README.md                # Turkish documentation
├── .git/                    # Git repository
└── .gitignore               # Git ignore rules
```

## File-by-File Breakdown

### 1. server.js (509 lines)
**Purpose**: Express server + WebSocket live reload

**Key Components**:
- Lines 1-10: Imports and server setup
- Lines 18-28: `getLocalIP()` function
- Lines 33-48: WebSocket connection handlers
- Lines 51-66: File watcher (chokidar) for live reload
- Lines 69-479: Dashboard route with HTML template
- Lines 482-484: `/api/connections` endpoint
- Lines 487-498: Server startup and logging
- Lines 501-508: Graceful shutdown handler

**Key Functions**:
```javascript
getLocalIP()              // Get machine's local IP
app.get('/')              // Redirect to dashboard
app.get('/dashboard')     // Main dashboard with game selector
app.get('/api/connections') // Return connected client count
watcher.on('change')      // Broadcast reload to all clients
```

---

### 2. rpg-game.js (653 lines)
**Purpose**: Main game logic class

**Data Structures**:
- Lines 1-55: `CLASSES` object (4 character classes)
- Lines 57-64: `MOB_TYPES` array (5 enemy types)
- Lines 66-73: `ITEMS` array (5 item types)

**Game Class**:
- Lines 75-95: Constructor + initialization
- Lines 97-100: `resizeCanvas()`
- Lines 102-140: `selectCharacter()`
- Lines 142-157: `createSkillButtons()`
- Lines 159-224: `setupControls()` (keyboard + joystick)
- Lines 226-256: Mob spawning system
- Lines 258-316: Skill system (`useSkill()`, `updateSkillUI()`)
- Lines 318-335: Helper functions (distance, nearest mob)
- Lines 337-401: Combat system (damage, kills, level up)
- Lines 413-459: Inventory system (pickup, use, update)
- Lines 461-537: Game update loop (movement, collision, cooldowns)
- Lines 539-612: Canvas rendering (draw function)
- Lines 614-634: HUD updates
- Lines 636-645: Game over and game loop

**Key Classes**:
```javascript
class Game {
    constructor()        // Set up canvas, controls, state
    selectCharacter()    // Initialize player with class stats
    setupControls()      // Keyboard + joystick input
    spawnMobs()          // Create enemies
    useSkill()           // Execute skill with cost/cooldown
    damageEnemy()        // Combat damage application
    pickupDrop()         // Inventory management
    update()             // Game logic update
    draw()               // Canvas rendering
    gameLoop()           // RequestAnimationFrame loop
}
```

---

### 3. metin2-style.html (444 lines)
**Purpose**: RPG game main UI

**Structure**:
- Lines 1-350: CSS styling (inline)
  - Character selection cards
  - Stat bars (HP, MP, XP)
  - Skill buttons
  - Joystick UI
  - Inventory slots
  - Damage numbers and notifications
  
- Lines 351-379: Character selection screen HTML
  - 4 character class cards
  - Click handlers calling `selectCharacter()`

- Lines 382-428: Game screen HTML
  - Canvas element
  - HUD stat bars
  - Skills panel
  - Joystick base and stick
  - Inventory slots (5)
  - Loot notification area

- Lines 430-442: Script section
  - Loads `rpg-game.js`
  - WebSocket connection for live reload

**Key Elements**:
```html
#charSelect              // Character selection overlay
#gameScreen             // Main game area
#gameCanvas             // HTML5 canvas
#hud                    // Stats display
#skills                 // Skill buttons container
#joystick               // Movement joystick
#inventory              // Item slots
#lootNotif              // Notification display
```

---

### 4. game.html (356 lines)
**Purpose**: Simple dodge game (for testing/demo)

**Features**:
- Canvas-based obstacle avoidance
- Score system
- Mobile controls (arrow buttons)
- Responsive sizing
- Pause functionality

---

### 5. package.json (20 lines)
**Dependencies**:
```json
{
  "express": "^4.18.2",      // Web framework
  "ws": "^8.14.2",           // WebSocket library
  "qrcode": "^1.5.3",        // QR code generation
  "chokidar": "^3.5.3"       // File watching
}
```

---

## DATA FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                   metin2-style.html                         │
│  (UI Layer - HTML/CSS + Initial JS)                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│              Document.addEventListener()                    │
│  (Character Selection clicks, keyboard, touch, mouse)       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│               rpg-game.js: Game Class                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  STATE (In Memory Only):                                   │
│  - this.player (Character stats, position, skills)        │
│  - this.mobs[] (Enemies on map)                           │
│  - this.drops[] (Items on ground)                         │
│  - this.inventory[] (5-slot player inventory)             │
│  - this.keys{} (Currently pressed keys)                   │
│  - this.canvas (Canvas element reference)                │
│  - this.ctx (2D rendering context)                        │
│                                                             │
│  METHODS:                                                   │
│  ├─ selectCharacter() → Initialize player from CLASSES   │
│  ├─ setupControls() → Listen for input events             │
│  ├─ spawnMobs() → Create enemies from MOB_TYPES           │
│  ├─ useSkill() → Execute skill, apply damage              │
│  ├─ pickupDrop() → Add item to inventory                  │
│  ├─ update() → Calculate game logic each frame            │
│  ├─ draw() → Render to canvas                             │
│  └─ gameLoop() → RequestAnimationFrame loop               │
│                                                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│              HTML5 Canvas Context (2D)                      │
│  - Render game scene (grid, mobs, player, drops)          │
│  - Render HUD (stat bars, skill cooldowns)                │
│  - Render damage numbers and notifications                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓ (60 FPS via RequestAnimationFrame)
                    DISPLAY
```

---

## KEY GAME CONSTANTS

### Character Classes (rpg-game.js, lines 1-55):
```javascript
CLASSES = {
  warrior:  { baseHP: 150, baseMP: 50,  baseDamage: 15, baseDefense: 10 }
  ninja:    { baseHP: 100, baseMP: 80,  baseDamage: 25, baseDefense: 5  }
  shaman:   { baseHP: 120, baseMP: 120, baseDamage: 18, baseDefense: 7  }
  sura:     { baseHP: 130, baseMP: 100, baseDamage: 20, baseDefense: 8  }
}
```

### Mob Types (rpg-game.js, lines 57-64):
```javascript
MOB_TYPES = [
  { name: 'Kurt',     hp: 50,  damage: 8,  xp: 25,  gold: 10, speed: 1.5 }
  { name: 'Goblin',   hp: 60,  damage: 10, xp: 30,  gold: 15, speed: 1.2 }
  { name: 'Ork',      hp: 80,  damage: 12, xp: 40,  gold: 20, speed: 1.0 }
  { name: 'Troll',    hp: 120, damage: 15, xp: 60,  gold: 30, speed: 0.8 }
  { name: 'Ejderha',  hp: 200, damage: 25, xp: 100, gold: 50, speed: 0.6 }
]
```

### Items (rpg-game.js, lines 66-73):
```javascript
ITEMS = [
  { name: 'Can İksiri',   type: 'potion',  heal: 50 }
  { name: 'Mana İksiri',  type: 'potion',  mana: 50 }
  { name: 'Altın',        type: 'gold',    value: 10 }
  { name: 'Kılıç',        type: 'weapon',  damage: 5 }
  { name: 'Zırh',         type: 'armor',   defense: 5 }
]
```

---

## CONTROL FLOW: GAME STARTUP

```
1. User opens metin2-style.html
   └─ Express serves HTML from /metin2-style.html route

2. Browser parses HTML
   └─ Loads CSS styling
   └─ Shows #charSelect overlay

3. User clicks character card
   └─ Calls selectCharacter('warrior')
   └─ Game.selectCharacter() executes

4. selectCharacter() does:
   └─ Creates player object with class stats
   └─ Calls createSkillButtons()
   └─ Hides #charSelect
   └─ Shows #gameScreen
   └─ Calls spawnMobs()
   └─ Starts gameLoop()

5. gameLoop() runs every frame:
   ├─ Calls update() → game logic
   ├─ Calls draw()   → canvas rendering
   └─ RequestAnimationFrame schedules next frame

6. Input events trigger during gameLoop():
   ├─ Keyboard → keys{} state updated
   ├─ Joystick → joystickAngle, joystickPower updated
   └─ Skill buttons → useSkill() called

7. Each update() frame:
   ├─ Update player position based on keys/joystick
   ├─ Update mob positions (AI chase)
   ├─ Check for mob attacks on player
   ├─ Check for item pickups
   ├─ Update cooldowns
   ├─ Regenerate MP
   └─ Update HUD
```

---

## GAME LOOP TIMING

```
RequestAnimationFrame Loop (~60 FPS)
│
├─ 16ms interval (60 FPS)
│
├─ update()
│  ├─ Player movement (16ms delta)
│  ├─ Mob AI movement
│  ├─ Collision detection
│  ├─ Skill cooldown countdown
│  └─ MP regen (0.1 per frame)
│
├─ draw()
│  ├─ Clear canvas
│  ├─ Draw grid
│  ├─ Draw drops
│  ├─ Draw mobs + HP bars
│  └─ Draw player + glow
│
└─ Next frame in 16ms
```

---

## STATE MANAGEMENT

**Current (Client-Only)**:
```javascript
const game = new Game();  // Global instance
game.player               // Current player data
game.mobs[]               // Current mobs
game.drops[]              // Current items on ground
game.inventory[]          // Current inventory (5 slots)
game.keys{}               // Current pressed keys
// All in-memory, lost on page refresh
```

**What's Missing for Multiplayer**:
- Server-side player data storage
- Database persistence
- Session management
- Player account system
- Guild data storage
- PvP matchmaking data
- Chat history
- Player relationships (friends, guild members)

