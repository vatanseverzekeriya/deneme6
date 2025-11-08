# QUICK REFERENCE GUIDE

## Where to Find What

### Game Classes & Configuration
**File**: `/home/user/deneme6/rpg-game.js`

**Character Classes** (Lines 1-55):
```javascript
const CLASSES = {
    warrior: {...},    // Tank class
    ninja: {...},      // DPS class
    shaman: {...},     // Healer class
    sura: {...}        // Hybrid class
};
```

**Enemy Types** (Lines 57-64):
```javascript
const MOB_TYPES = [
    { name: 'Kurt', ... },
    { name: 'Goblin', ... },
    // ... 5 total enemy types
];
```

**Items** (Lines 66-73):
```javascript
const ITEMS = [
    { name: 'Can İksiri', type: 'potion', ... },
    // ... 5 total items
];
```

---

### Main Game Class
**File**: `/home/user/deneme6/rpg-game.js`

**Constructor** (Lines 75-95):
- Initializes canvas
- Sets up controls
- Creates empty game state

**Key Methods**:
| Method | Purpose | Lines |
|--------|---------|-------|
| `selectCharacter()` | Create player from class | 102-140 |
| `setupControls()` | Keyboard + joystick setup | 159-224 |
| `spawnMobs()` | Create enemies | 226-256 |
| `useSkill()` | Execute character skill | 258-316 |
| `damageEnemy()` | Apply damage to enemy | 337-344 |
| `pickupDrop()` | Add item to inventory | 413-428 |
| `update()` | Game logic per frame | 461-537 |
| `draw()` | Canvas rendering | 539-612 |
| `gameLoop()` | Main loop (RequestAnimationFrame) | 641-645 |

---

### UI Components
**File**: `/home/user/deneme6/metin2-style.html`

**Character Selection** (Lines 351-379):
```html
<div id="charSelect">
    <!-- 4 character cards with onclick handlers -->
</div>
```
- Shown before game starts
- Hidden when character selected

**HUD Elements** (Lines 382-428):
```html
#gameScreen           // Main game area
#gameCanvas           // 2D canvas
#hud                  // Stat bars container
#skills               // Skill buttons (3)
#joystick             // Movement control
#inventory            // 5-slot inventory
#lootNotif            // Item pickup messages
```

**Styling** (Lines 8-349):
- Character cards: `.char-card`
- Stat bars: `.stat-bar`
- Skill buttons: `.skill-btn`
- Joystick: `.joystick-base`, `.joystick-stick`
- Inventory slots: `.inv-slot`

---

### Server & Networking
**File**: `/home/user/deneme6/server.js`

**Key Functions**:
| Function | Purpose | Lines |
|----------|---------|-------|
| `getLocalIP()` | Get machine IP for mobile access | 18-28 |
| `app.get('/')` | Redirect to dashboard | 69-71 |
| `app.get('/dashboard')` | Main dashboard with game selector | 73-479 |
| `app.get('/api/connections')` | Return connected client count | 482-484 |
| `watcher.on('change')` | Broadcast reload to clients | 57-66 |

**WebSocket Usage**:
- Only for live reload (file changes)
- Sends 'reload' message to all connected clients
- Clients receive and call `window.location.reload()`

---

## Key Game Constants

### Player Stats (When Created)
```javascript
Player {
    level: 1,
    xp: 0,
    xpToLevel: 100,
    hp: [based on class],      // Examples: 100-150
    maxHP: [based on class],
    mp: [based on class],       // Examples: 50-120
    maxMP: [based on class],
    damage: [based on class],   // Examples: 15-25
    defense: [based on class],  // Examples: 5-10
    speed: 3,                   // Movement speed
    gold: 0,
    skills: [3 class-specific skills]
}
```

### Mob Stats (Examples)
```javascript
Kurt (weakest):
  hp: 50, damage: 8, xp: 25, gold: 10, speed: 1.5

Ejderha (strongest):
  hp: 200, damage: 25, xp: 100, gold: 50, speed: 0.6
```

### Skill System
```javascript
Skill {
    name: string,
    icon: emoji,
    damage?: number,
    heal?: number,
    lifesteal?: number,
    mpCost: number,
    cooldown: milliseconds,  // Examples: 2000-8000ms
    key: 'Q'|'W'|'E',       // Keyboard shortcut
    cooldownRemaining: number
}
```

---

## Game Loop Flow

```
┌─ RequestAnimationFrame (60 FPS)
│
├─ Input Processing
│  ├─ Keyboard state changes
│  ├─ Joystick input
│  └─ Skill activations
│
├─ Logic Update (update() method)
│  ├─ Player movement
│  ├─ Mob AI and movement
│  ├─ Collision detection
│  ├─ Combat calculations
│  ├─ Skill cooldown updates
│  └─ Item pickup checks
│
├─ Rendering (draw() method)
│  ├─ Clear canvas
│  ├─ Draw background grid
│  ├─ Draw items on ground
│  ├─ Draw mobs with HP bars
│  └─ Draw player with glow
│
├─ HUD Updates (updateHUD() method)
│  ├─ Update stat bars
│  ├─ Update skill cooldowns
│  └─ Update inventory display
│
└─ Next frame in 16ms (~60 FPS)
```

---

## Important Code Locations

### To Add New Character Class:
1. Edit `CLASSES` object in `rpg-game.js` (lines 1-55)
2. Add new class with unique stats and skills
3. UI will automatically add character card (if you update HTML)

### To Add New Enemy Type:
1. Edit `MOB_TYPES` array in `rpg-game.js` (lines 57-64)
2. Add new enemy with name, icon, stats, XP, gold rewards
3. Enemies will spawn during gameplay

### To Add New Item:
1. Edit `ITEMS` array in `rpg-game.js` (lines 66-73)
2. Specify item type (potion, gold, weapon, armor)
3. Add effects (heal, mana, damage, defense, value)
4. Items will randomly drop from killed mobs

### To Change UI Appearance:
1. Edit CSS in `metin2-style.html` (lines 8-349)
2. Update HTML elements as needed
3. Server auto-reloads browser on file save

### To Add Game Logic:
1. Add method to Game class in `rpg-game.js`
2. Call from `update()` method or event listeners
3. All state changes automatically update HUD

---

## Current Limitations (For Guild/PvP Development)

Missing Features:
- [ ] No database persistence
- [ ] No player accounts/login
- [ ] No multiplayer synchronization
- [ ] No player-to-player combat
- [ ] No guild system
- [ ] No chat/communication
- [ ] No party system
- [ ] No trading
- [ ] No drop/loot sharing
- [ ] No PvP areas/zones
- [ ] No matchmaking system
- [ ] No anti-cheat measures

---

## Development Workflow

1. **Edit Files**:
   - `rpg-game.js` - Game logic
   - `metin2-style.html` - UI/Styling
   - `server.js` - Server endpoints

2. **Server Automatically Reloads**:
   - Chokidar watches for file changes
   - Sends WebSocket signal to clients
   - Browser auto-reloads page

3. **Test Changes**:
   - Start server: `npm start`
   - Open: `http://localhost:3000/dashboard`
   - Select game to test
   - Edit files and watch auto-reload

4. **Mobile Testing**:
   - Dashboard shows QR code
   - Scan with phone to test on actual device
   - Same auto-reload applies to mobile clients

---

## File Sizes
```
server.js              14 KB   (509 lines)
rpg-game.js            21 KB   (653 lines)
metin2-style.html      12 KB   (444 lines)
game.html              12 KB   (356 lines)
package.json           0.5 KB  (20 lines)
TOTAL CODE             ~60 KB  (without node_modules)
```

---

## Dependencies Used
```
express@4.18.2    - Web server framework
ws@8.14.2         - WebSocket library
qrcode@1.5.3      - QR code generation
chokidar@3.5.3    - File watcher for live reload
```

No database dependencies = No database setup needed
No UI framework = Pure vanilla JavaScript

