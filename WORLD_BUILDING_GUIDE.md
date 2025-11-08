# World Building System - RPG Mobile Game

## Overview

This RPG game features a comprehensive world-building system with 5 unique maps, each with their own ecosystems, mobs, bosses, NPCs, and secret areas.

## Available Maps

### 1. Yeşil Orman (Green Forest) - Level 1-15
**Theme:** Lush forest with wildlife
**Mobs:**
- Orman Kurdu (Forest Wolf) 🐺 - Level 1
- Yaban Domuzu (Wild Boar) 🐗 - Level 3
- Dev Örümcek (Giant Spider) 🕷️ - Level 5
- Orman Goblin (Forest Goblin) 👺 - Level 8
- Kara Ayı (Black Bear) 🐻 - Level 10

**Bosses:**
- Mini-Boss: Alfa Kurt (Alpha Wolf) 🐺 - Level 12
- Major Boss: Orman Koruyucusu (Forest Guardian) 🌳 - Level 15

**NPCs:**
- Avcı Marcus 🏹 - Hunter who gives advice
- Şifacı Elena 💊 - Healer who restores HP/MP

**Secret Area:** Gizli Şelale (Hidden Waterfall) - Rewards 500 gold

### 2. Kızgın Çöl (Scorching Desert) - Level 16-30
**Theme:** Hot desert with ancient ruins
**Mobs:**
- Çöl Akrebi (Desert Scorpion) 🦂 - Level 16
- Kum Yılanı (Sand Snake) 🐍 - Level 18
- Mısırlı Mumya (Egyptian Mummy) 🧟 - Level 20
- Çöl Haydut (Desert Bandit) 🏴‍☠️ - Level 23
- Dev Kum Kurdu (Giant Sand Worm) 🪱 - Level 26

**Bosses:**
- Mini-Boss: Kum Fırtınası Elemental (Sandstorm Elemental) 🌪️ - Level 28
- Major Boss: Firavun Laneti (Pharaoh's Curse) 👑 - Level 30

**NPCs:**
- Kervan Tüccarı 🐫 - Caravan merchant
- Bilge Rahip 🧙 - Wise priest

**Secret Area:** Gizli Piramit (Hidden Pyramid) - Rewards 1000 gold

### 3. Buz Dağları (Ice Mountains) - Level 31-45
**Theme:** Frozen peaks with icy enemies
**Mobs:**
- Buz Kurdu (Ice Wolf) 🐺 - Level 31
- Yeti 👹 - Level 34
- Buz Cadısı (Ice Witch) 🧙‍♀️ - Level 37
- Buzul Devleri (Glacier Giants) 🧊 - Level 40
- Kar Fırtınası Şeytanı (Blizzard Demon) 😈 - Level 43

**Bosses:**
- Mini-Boss: Buz Ejderhası (Ice Dragon) 🐉 - Level 43
- Major Boss: Donmuş Kral (Frozen King) 👑 - Level 45

**NPCs:**
- Dağ Rehberi 🧗 - Mountain guide
- Mistik Keşiş 🧘 - Mystic monk (provides buffs)

**Secret Area:** Kristal Mağarası (Crystal Cave) - Rewards 1500 gold

### 4. Lav Mağarası (Lava Cave) - Level 46-60
**Theme:** Volcanic underground with fire creatures
**Mobs:**
- Ateş Elementi (Fire Elemental) 🔥 - Level 46
- Lav Örümceği (Lava Spider) 🕷️ - Level 49
- Cehennem Köpeği (Hellhound) 🐕 - Level 52
- Volkan Devleri (Volcano Giants) 👹 - Level 55
- Ateş Şeytanı (Fire Demon) 😈 - Level 58

**Bosses:**
- Mini-Boss: Magma Titani (Magma Titan) 🔥 - Level 58
- Major Boss: Yanardağ Tanrısı (Volcano God) 🌋 - Level 60

**NPCs:**
- Demirci Ustası ⚒️ - Master blacksmith
- Ateş Sihirbazı 🧙‍♂️ - Fire wizard (teaches skills)

**Secret Area:** Lav Göl Adası (Lava Lake Island) - Rewards 2500 gold

### 5. Karanlık Kale (Dark Castle) - Level 61-100
**Theme:** Gothic castle with undead and demons
**Mobs:**
- Karanlık Şövalye (Dark Knight) ⚔️ - Level 61
- Vampir (Vampire) 🧛 - Level 65
- Lich 💀 - Level 70
- Gölge Assassin (Shadow Assassin) 🥷 - Level 75
- Demon Lord 😈 - Level 80

**Bosses:**
- Mini-Boss: Karanlık Büyücü (Dark Wizard) 🧙‍♂️ - Level 85
- Major Boss: Karanlık Kral (Dark King) 👑 - Level 100

**NPCs:**
- Gizli İsyancı 🗡️ - Secret rebel
- Esrarengiz Kütüphaneci 📚 - Mysterious librarian (sells items)

**Secret Area:** Taht Odası (Throne Room) - Rewards 10000 gold

## Game Features

### Map System
- **Dynamic map loading**: Each map has unique visual themes and backgrounds
- **Decorations**: Randomly placed thematic decorations for immersion
- **Teleport portals**: Animated portals to travel between maps
- **Progressive difficulty**: Mobs and bosses scale with map level ranges

### Combat System
- **Regular mobs**: Standard enemies that patrol the map
- **Mini-bosses**: Stronger enemies with special auras (10% spawn chance)
- **Major bosses**: Elite enemies with unique effects (5% spawn chance)
- **Boss indicators**: Visual crown and glowing aura effects

### NPC System
- **Dialogue interactions**: Press F or Space to interact
- **Healers**: Restore full HP and MP
- **Buff providers**: Increase player stats
- **Quest givers**: Provide information and guidance

### Secret Areas
- **Hidden locations**: Appear when player is nearby
- **One-time rewards**: Discover secrets for gold and items
- **Visual indicators**: Gold question mark when in range

### Map Progression
The game follows a linear progression path:
1. Forest → Desert
2. Desert → Ice Mountains (or back to Forest)
3. Ice Mountains → Lava Cave (or back to Desert)
4. Lava Cave → Dark Castle (or back to Ice Mountains)
5. Dark Castle → Any previous map

## Tiled Map Editor Integration

You can create custom maps using [Tiled Map Editor](https://www.mapeditor.org/) and import them into the game.

### Setup Instructions

1. **Install Tiled Map Editor**
   - Download from https://www.mapeditor.org/
   - Create a new map (any size)

2. **Configure Map Properties**
   Add these custom properties to your map:
   - `id` (string): Unique map identifier
   - `name` (string): Display name
   - `levelRange` (array): [min, max] level range
   - `background` (string): CSS gradient background
   - `tileColor` (string): Tile color hex code
   - `decorations` (array): Array of emoji decorations

3. **Create Object Layers**

   **Mobs Layer** (name: "mobs"):
   - Add point objects with type: "mob"
   - Properties for each mob:
     - `name`: Mob name
     - `icon`: Emoji icon
     - `hp`: Hit points
     - `damage`: Damage dealt
     - `xp`: Experience reward
     - `gold`: Gold reward
     - `speed`: Movement speed
     - `level`: Required level

   **Mini-Boss Layer** (name: "miniboss"):
   - Single point object
   - Same properties as mobs plus:
     - `spawnChance`: Float (0.0-1.0)

   **Boss Layer** (name: "boss"):
   - Single point object
   - Same properties as mini-boss

   **NPCs Layer** (name: "npcs"):
   - Point objects for each NPC
   - Properties:
     - `name`: NPC name
     - `icon`: Emoji icon
     - `dialogue`: Text to display
     - `heals`: Boolean (healer NPC)
     - `buffs`: Boolean (buff provider)

   **Secret Area Layer** (name: "secret"):
   - Single point object
   - Properties:
     - `name`: Area name
     - `rewardName`: Reward item name
     - `rewardIcon`: Reward emoji
     - `rewardValue`: Gold value

   **Teleports Layer** (name: "teleports"):
   - Point objects for each portal
   - Properties:
     - `targetMap`: Target map ID
     - `label`: Portal label text

4. **Export and Import**
   ```javascript
   // Export as JSON from Tiled
   // Then load in game:
   const mapId = await game.loadTiledMap('path/to/your-map.json');
   if (mapId) {
       game.loadMap(mapId);
   }
   ```

### Example Tiled Map Structure
```json
{
  "properties": {
    "id": "custom_forest",
    "name": "Custom Forest",
    "levelRange": [1, 20],
    "background": "linear-gradient(135deg, #228B22 0%, #006400 100%)"
  },
  "layers": [
    {
      "name": "mobs",
      "type": "objectgroup",
      "objects": [
        {
          "type": "mob",
          "properties": {
            "name": "Forest Slime",
            "icon": "🟢",
            "hp": 40,
            "damage": 5,
            "xp": 15,
            "gold": 5,
            "speed": 1.0,
            "level": 1
          }
        }
      ]
    }
  ]
}
```

## Controls

- **WASD / Arrow Keys**: Move character
- **Q, W, E**: Use skills
- **F / Space**: Interact with NPCs
- **1-5**: Use inventory items
- **Joystick (Mobile)**: Touch controls for movement

## Tips

1. **Level Progression**: Stay in maps appropriate for your level
2. **Boss Farming**: Bosses have low spawn rates but high rewards
3. **Secret Areas**: Explore map corners for hidden treasures
4. **NPC Buffs**: Visit buff NPCs before fighting bosses
5. **Map Transitions**: Use teleport portals to move between areas quickly

## Technical Implementation

### Map Data Structure
```javascript
{
  id: 'map_id',
  name: 'Map Name',
  levelRange: [min, max],
  theme: {
    background: 'gradient',
    tileColor: '#hex',
    decorations: ['emoji', ...]
  },
  mobs: [...],
  miniBoss: {...},
  majorBoss: {...},
  npcs: [...],
  secretArea: {...},
  teleports: [...]
}
```

### Key Functions
- `loadMap(mapId)`: Load a specific map
- `changeMap(targetMapId)`: Transition to another map
- `loadTiledMap(jsonPath)`: Import Tiled JSON
- `spawnMobs()`: Spawn map-specific enemies
- `interactWithNPC(npc)`: Handle NPC interactions
- `discoverSecretArea()`: Reveal hidden areas

## Credits

Created for Phase 2: Content Expansion - Sprint 5-6 (World Building)
Estimated development time: 80 hours
