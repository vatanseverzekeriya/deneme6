# SPRINT 1: Visual Refresh Implementation Guide

## ✅ Completed Features

### 1. AssetLoader System (`asset-loader.js`)
A comprehensive asset management system that handles:
- Character sprite sheets (4 classes × 7 animations each)
- Enemy sprite sheets (5 mobs + 2 bosses with multiple animations)
- Environment assets (tiles, decorations, portals, NPCs)
- UI elements (buttons, icons, frames, bars)

**Key Features:**
- Automatic fallback to emoji mode if assets fail to load
- Loading progress tracking
- Sprite sheet parsing with frame extraction
- Support for different frame counts and sizes
- Graceful error handling

### 2. Animation Controller (`asset-loader.js`)
Manages sprite animations with:
- Frame-by-frame animation updates
- Configurable animation speed
- Loop/non-loop modes (e.g., death animations don't loop)
- Play/pause/reset controls
- Timestamp-based updates for smooth animation

### 3. Game Integration (`rpg-game.js`)
The main game now includes:
- **Asset Loading Screen**: Shows progress bar while loading sprites
- **Dual Rendering Mode**: Automatically switches between sprites and emoji fallback
- **Character Animations**: Each character class has idle, walk, attack, skill, and death animations
- **Enemy Animations**: Mobs have idle, walk, attack, and death animations
- **Animation State Management**: Automatically switches animations based on entity state
- **Sprite Flipping**: Entities face left/right based on movement direction

### 4. Directory Structure (`assets/`)
Organized asset directories:
```
assets/
├── characters/     # Character sprites for warrior, ninja, shaman, sura
├── enemies/        # Enemy sprites for mobs and bosses
├── environment/    # Tiles, decorations, portals, NPCs
└── ui/            # Buttons, icons, frames, status bars
```

## 📋 Implementation Details

### Character Sprite Specifications

Each character class requires:
- **Idle**: 4 frames (256×64px)
- **Walk**: 8 frames (512×64px)
- **Attack**: 6 frames (384×64px)
- **Skill Q**: 8 frames (512×64px)
- **Skill W**: 8 frames (512×64px)
- **Skill E**: 8 frames (512×64px)
- **Death**: 6 frames (384×64px)

**Total per class**: 7 sprite sheets
**Total for all classes**: 28 sprite sheets

### Enemy Sprite Specifications

**Regular Mobs** (wolf, goblin, orc, troll, dragon):
- Idle: 4 frames
- Walk: 4 frames
- Attack: 4 frames
- Death: 4 frames

**Bosses** (demon, dragon):
- Idle: 4 frames
- Walk: 4 frames
- Attack: 8 frames
- Death: 8 frames
- Special: 10 frames

**Total for enemies**: 33 sprite sheets

## 🎨 How It Works

### 1. Asset Loading Flow
```javascript
Game starts
    ↓
AssetLoader.loadAll() called
    ↓
Shows loading screen with progress bar
    ↓
Attempts to load all sprite sheets
    ↓
Success → useSprites = true
Failure → useSprites = false (emoji mode)
    ↓
Hides loading screen
    ↓
Game begins
```

### 2. Animation System
```javascript
Every frame:
    ↓
Update entity state (moving, attacking, etc.)
    ↓
Set currentAnimation based on state
    ↓
AnimationController updates frame based on time
    ↓
Draw current frame at entity position
    ↓
Flip sprite if entity facing left
```

### 3. Fallback Mechanism
- If sprite sheets are not found, AssetLoader creates colored placeholder frames
- If loading fails completely, game uses emoji icons (original behavior)
- No crashes or errors - seamless fallback

## 🚀 Next Steps

### Phase 1: Asset Creation
1. **Commission Pixel Artist** ($450-700 on Fiverr/Upwork)
   - Provide them with the specifications in `assets/README.md`
   - Request preview of 1 character class first
   - Once approved, complete all assets

2. **Asset Specifications to Share**:
   - Frame size: 64×64 pixels
   - Format: PNG with transparency
   - Layout: Horizontal strip
   - Style: Pixel art, consistent palette
   - See detailed specs in `assets/README.md`

### Phase 2: Asset Integration
1. Receive sprite sheets from artist
2. Place files in appropriate directories:
   ```
   assets/characters/warrior_idle.png
   assets/characters/warrior_walk.png
   ... etc
   ```
3. Ensure filenames match exactly (case-sensitive)
4. Test in game - should automatically load

### Phase 3: Fine-tuning
1. Adjust animation speeds in `asset-loader.js`:
   ```javascript
   animationSpeed: 100 // Increase for slower, decrease for faster
   ```
2. Tweak sprite sizes if needed
3. Add glow effects or particle systems for skills
4. Optimize file sizes if needed

## 🧪 Testing

### Current State
- Game loads with emoji fallback ✅
- AssetLoader system ready ✅
- Animation controllers ready ✅
- Loading screen functional ✅

### With Real Sprites
1. Place at least one character sprite set in `assets/characters/`
2. Reload game
3. Should see loading screen
4. Character should animate with sprites
5. Check browser console for loading errors

### Debug Mode
Open browser console to see:
- Asset loading progress
- Missing file warnings
- Animation state changes
- Fallback triggers

## 📊 Asset Checklist

### Characters (4 classes)
- [ ] Warrior sprites (7 animations)
- [ ] Ninja sprites (7 animations)
- [ ] Shaman sprites (7 animations)
- [ ] Sura sprites (7 animations)

### Enemies (5 mobs + 2 bosses)
- [ ] Wolf sprites (4 animations)
- [ ] Goblin sprites (4 animations)
- [ ] Orc sprites (4 animations)
- [ ] Troll sprites (4 animations)
- [ ] Dragon sprites (4 animations)
- [ ] Boss Demon sprites (5 animations)
- [ ] Boss Dragon sprites (5 animations)

### Environment
- [ ] Ground tileset
- [ ] Wall tileset
- [ ] Grass variations (4 frames)
- [ ] Trees (5 variations)
- [ ] Rocks (3 variations)
- [ ] Portal animation (8 frames)
- [ ] NPC sprites (4 frames)

### UI
- [ ] Button states (normal, hover, pressed)
- [ ] Icon set (50+ icons)
- [ ] Frame/panel backgrounds
- [ ] Status bar graphics (HP, MP, XP)

## 💡 Tips for Working with Artist

### Communication Template
```
Project: Metin2-style RPG Character Sprites
Budget: $200-300 for 4 character classes

Requirements:
- 4 character classes (Warrior, Ninja, Shaman, Sura)
- 7 animations per class
- 64x64 pixel sprites
- Horizontal strip layout
- PNG with transparency
- Pixel art style

See detailed specifications in attached README.md

Please provide:
1. Sample of 1 character with all animations
2. Upon approval, complete remaining characters
3. Source files (.psd or .aseprite if possible)
```

### Red Flags to Avoid
- Artists who can't show pixel art portfolio
- No samples before full payment
- Unrealistic timelines (< 1 week for all assets)
- No revision policy
- Generic/AI-generated samples

### Recommended Platforms
- **Fiverr**: Search "pixel art game sprites"
- **Upwork**: Post job, review portfolios
- **itch.io**: Many pixel artists sell pre-made packs
- **OpenGameArt**: Free assets (may need modification)

## 📈 Performance Considerations

### Current Implementation
- Sprites loaded once at game start
- Animations update based on timestamp (not frame-based)
- Minimal memory usage with fallback system
- Canvas 2D rendering (hardware accelerated)

### Optimization Tips
1. Keep sprite sheet file sizes < 50KB each
2. Use PNG optimization tools (TinyPNG, etc.)
3. Consider sprite atlasing for many small sprites
4. Monitor browser memory in DevTools

## 🔧 Troubleshooting

### "Loading stuck at 0%"
- Check browser console for errors
- Verify file paths are correct
- Check network tab for 404 errors

### "Sprites not appearing"
- Verify filenames match exactly
- Check file format is PNG
- Ensure transparency is preserved
- Verify frame dimensions are correct

### "Animations too fast/slow"
- Adjust `animationSpeed` in AssetLoader
- Default is 100ms per frame
- Increase for slower, decrease for faster

### "Game crashes with sprites"
- Check browser console for errors
- Verify all sprite sheets have correct frame count
- Ensure sprite images loaded successfully

## 📝 Code Files Modified

1. **asset-loader.js** (NEW)
   - AssetLoader class
   - AnimationController class
   - Sprite sheet loading logic

2. **rpg-game.js** (UPDATED)
   - Added asset loading integration
   - Animation state management
   - Dual rendering mode (sprites/emoji)
   - Entity drawing with sprite support

3. **metin2-style.html** (UPDATED)
   - Added script tag for asset-loader.js

4. **assets/README.md** (NEW)
   - Complete asset specifications
   - Directory structure guide
   - Artist guidelines

## 🎯 Success Criteria

- [x] Asset loading system implemented
- [x] Animation controllers functional
- [x] Fallback to emoji mode working
- [x] Loading screen with progress bar
- [x] Character animations integrated
- [x] Enemy animations integrated
- [ ] Real sprite sheets loaded
- [ ] All animations playing smoothly
- [ ] Performance remains good
- [ ] No visual glitches

## 📅 Estimated Timeline

- **Week 1**: Asset creation (outsourced) - $450-700
- **Week 2**: Asset integration and testing - 4-6 hours
- **Week 3**: Fine-tuning and polish - 2-4 hours

**Total**: 60 hours (as estimated in original plan)
**Cost**: $300-500 for pixel artist

## 🎉 What's Ready Now

The entire sprite animation system is **code-complete** and ready to accept real sprite sheets. Simply drop the sprite images into the `assets/` directories with the correct naming convention, and the game will automatically load and animate them!

The system gracefully falls back to emoji mode when sprites aren't present, so development and testing can continue while assets are being created.
