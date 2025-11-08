# Game Assets Directory Structure

This directory contains all visual assets for the RPG game.

## Directory Structure

```
assets/
├── characters/          # Character sprite sheets
├── enemies/            # Enemy/mob sprite sheets
├── environment/        # Environment tiles and decorations
└── ui/                # UI elements (buttons, icons, frames)
```

## Character Sprites

Each character class requires the following sprite sheets:

### Required Files (per class: warrior, ninja, shaman, sura)

- `{class}_idle.png` - Idle animation (4 frames, 256x64px total)
- `{class}_walk.png` - Walk animation (8 frames, 512x64px total)
- `{class}_attack.png` - Attack animation (6 frames, 384x64px total)
- `{class}_skill1.png` - Q Skill animation (8 frames, 512x64px total)
- `{class}_skill2.png` - W Skill animation (8 frames, 512x64px total)
- `{class}_skill3.png` - E Skill animation (8 frames, 512x64px total)
- `{class}_death.png` - Death animation (6 frames, 384x64px total)

### Sprite Sheet Format

- **Frame Size**: 64x64 pixels per frame
- **Layout**: Horizontal strip (all frames in a single row)
- **Background**: Transparent PNG
- **Style**: Pixel art or 2D sprites

Example for warrior_idle.png:
```
[Frame 0][Frame 1][Frame 2][Frame 3]
  64x64    64x64    64x64    64x64
Total: 256x64 pixels
```

## Enemy Sprites

### Mobs (5 types)

1. **wolf** - Wolf enemy
2. **goblin** - Goblin enemy
3. **orc** - Orc enemy
4. **troll** - Troll enemy
5. **dragon** - Dragon enemy

Each mob requires:
- `{mob}_idle.png` - 4 frames (256x64px)
- `{mob}_walk.png` - 4 frames (256x64px)
- `{mob}_attack.png` - 4 frames (256x64px)
- `{mob}_death.png` - 4 frames (256x64px)

### Bosses (2 types)

1. **boss_demon** - Demon boss
2. **boss_dragon** - Dragon boss

Each boss requires:
- `{boss}_idle.png` - 4 frames (256x64px)
- `{boss}_walk.png` - 4 frames (256x64px)
- `{boss}_attack.png` - 8 frames (512x64px)
- `{boss}_death.png` - 8 frames (512x64px)
- `{boss}_special.png` - Special attack (10 frames, 640x64px)

## Environment Assets

### Tilesets

- `ground_tileset.png` - Ground tiles (tileable)
- `wall_tileset.png` - Wall tiles (tileable)

### Decorations

- `grass.png` - 4 variations (4 frames, 128x32px)
- `trees.png` - 5 variations (5 frames, 320x96px, 64x96 per frame)
- `rocks.png` - 3 variations (3 frames, 96x32px)

### Interactive Objects

- `portal.png` - Portal animation (8 frames, 512x64px)
- `npc.png` - NPC idle animation (4 frames, 256x64px)

## UI Elements

### Buttons

- `button_normal.png` - Normal state
- `button_hover.png` - Hover state
- `button_pressed.png` - Pressed state

### Icons

- `icons.png` - 50+ icons in a grid (32x32 per icon)
  - Skills, items, status effects
  - Grid layout for easy extraction

### Frames/Panels

- `frame_panel.png` - Panel background
- `frame_window.png` - Window frame

### Status Bars

- `hp_bar.png` - Health bar
- `mp_bar.png` - Mana bar
- `xp_bar.png` - Experience bar

## Asset Creation Guidelines

### For Pixel Artists

1. **Resolution**: 64x64 pixels per frame for characters/enemies
2. **Style**: Consistent pixel art style across all assets
3. **Color Palette**:
   - Warrior: Red/brown tones
   - Ninja: Dark blue/black tones
   - Shaman: Purple/mystical tones
   - Sura: Dark purple/black tones

4. **Animation Guidelines**:
   - Idle: Subtle breathing/standing animation
   - Walk: 8-frame walk cycle (smooth movement)
   - Attack: Clear wind-up, strike, and recovery
   - Skills: Flashy effects matching character class
   - Death: Dramatic fall/fade animation

5. **File Format**: PNG with transparency
6. **Optimization**: Keep file sizes reasonable (< 50KB per sprite sheet)

## Estimated Costs

- Character sprites (4 classes x 7 animations): $200-300
- Enemy sprites (5 mobs + 2 bosses): $150-200
- Environment assets: $50-100
- UI elements: $50-100

**Total**: $450-700 (Fiverr/Upwork pixel artist)

## Placeholder Mode

Currently, the game runs in "emoji mode" using emoji icons for all sprites. Once assets are added to these directories, the game will automatically switch to using sprite sheets.

The AssetLoader class includes fallback handling - if assets fail to load, the game will continue running with emoji placeholders.

## Testing Your Assets

1. Place your sprite sheets in the appropriate directories
2. Ensure file names match exactly (case-sensitive)
3. Refresh the game - assets will load automatically
4. Check browser console for any loading errors

## Next Steps

1. Commission or create sprite sheets following the specifications above
2. Place files in appropriate directories
3. Test in-game to verify animations work correctly
4. Adjust animation speeds if needed in asset-loader.js
