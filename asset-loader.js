/**
 * AssetLoader - Sprite Sheet and Animation Management System
 * Handles loading and managing all game assets including character sprites,
 * enemy sprites, environment tiles, and UI elements
 */

class AssetLoader {
    constructor() {
        this.sprites = {};
        this.animations = {};
        this.loaded = false;
        this.loadingProgress = 0;
        this.totalAssets = 0;
        this.loadedAssets = 0;
    }

    /**
     * Load all game assets
     */
    async loadAll() {
        console.log('🎨 Starting asset loading...');

        try {
            await Promise.all([
                this.loadCharacterSprites(),
                this.loadEnemySprites(),
                this.loadEnvironmentAssets(),
                this.loadUIElements()
            ]);

            this.loaded = true;
            console.log('✅ All assets loaded successfully!');
            return true;
        } catch (error) {
            console.error('❌ Error loading assets:', error);
            // Fall back to emoji mode if assets fail to load
            return false;
        }
    }

    /**
     * Load character sprite sheets for all classes
     */
    async loadCharacterSprites() {
        const classes = ['warrior', 'ninja', 'shaman', 'sura'];

        for (const cls of classes) {
            this.sprites[cls] = {
                idle: await this.loadSpriteSheet(`assets/characters/${cls}_idle.png`, 4, 64, 64),
                walk: await this.loadSpriteSheet(`assets/characters/${cls}_walk.png`, 8, 64, 64),
                attack: await this.loadSpriteSheet(`assets/characters/${cls}_attack.png`, 6, 64, 64),
                skill_q: await this.loadSpriteSheet(`assets/characters/${cls}_skill1.png`, 8, 64, 64),
                skill_w: await this.loadSpriteSheet(`assets/characters/${cls}_skill2.png`, 8, 64, 64),
                skill_e: await this.loadSpriteSheet(`assets/characters/${cls}_skill3.png`, 8, 64, 64),
                death: await this.loadSpriteSheet(`assets/characters/${cls}_death.png`, 6, 64, 64)
            };

            console.log(`✓ Loaded ${cls} character sprites`);
        }
    }

    /**
     * Load enemy sprite sheets
     */
    async loadEnemySprites() {
        const enemies = [
            { name: 'wolf', frames: { idle: 4, walk: 4, attack: 4, death: 4 } },
            { name: 'goblin', frames: { idle: 4, walk: 4, attack: 4, death: 4 } },
            { name: 'orc', frames: { idle: 4, walk: 4, attack: 4, death: 4 } },
            { name: 'troll', frames: { idle: 4, walk: 4, attack: 4, death: 4 } },
            { name: 'dragon', frames: { idle: 4, walk: 4, attack: 6, death: 6 } },
            // Bosses
            { name: 'boss_demon', frames: { idle: 4, walk: 4, attack: 8, death: 8, special: 10 } },
            { name: 'boss_dragon', frames: { idle: 4, walk: 4, attack: 8, death: 8, special: 10 } }
        ];

        for (const enemy of enemies) {
            this.sprites[enemy.name] = {};

            for (const [animation, frameCount] of Object.entries(enemy.frames)) {
                this.sprites[enemy.name][animation] = await this.loadSpriteSheet(
                    `assets/enemies/${enemy.name}_${animation}.png`,
                    frameCount,
                    64,
                    64
                );
            }

            console.log(`✓ Loaded ${enemy.name} enemy sprites`);
        }
    }

    /**
     * Load environment assets (tiles, decorations, etc.)
     */
    async loadEnvironmentAssets() {
        // Tilesets
        this.sprites.environment = {
            ground: await this.loadImage('assets/environment/ground_tileset.png'),
            walls: await this.loadImage('assets/environment/wall_tileset.png'),
            grass: await this.loadSpriteSheet('assets/environment/grass.png', 4, 32, 32),
            trees: await this.loadSpriteSheet('assets/environment/trees.png', 5, 64, 96),
            rocks: await this.loadSpriteSheet('assets/environment/rocks.png', 3, 32, 32),
            portal: await this.loadSpriteSheet('assets/environment/portal.png', 8, 64, 64),
            npc: await this.loadSpriteSheet('assets/environment/npc.png', 4, 64, 64)
        };

        console.log('✓ Loaded environment assets');
    }

    /**
     * Load UI elements
     */
    async loadUIElements() {
        this.sprites.ui = {
            // Buttons
            buttonNormal: await this.loadImage('assets/ui/button_normal.png'),
            buttonHover: await this.loadImage('assets/ui/button_hover.png'),
            buttonPressed: await this.loadImage('assets/ui/button_pressed.png'),

            // Icons
            icons: await this.loadIconSet('assets/ui/icons.png', 50, 32, 32),

            // Frames
            framePanel: await this.loadImage('assets/ui/frame_panel.png'),
            frameWindow: await this.loadImage('assets/ui/frame_window.png'),

            // Bars
            hpBar: await this.loadImage('assets/ui/hp_bar.png'),
            mpBar: await this.loadImage('assets/ui/mp_bar.png'),
            xpBar: await this.loadImage('assets/ui/xp_bar.png')
        };

        console.log('✓ Loaded UI elements');
    }

    /**
     * Load a single sprite sheet and divide it into frames
     * @param {string} path - Path to the sprite sheet image
     * @param {number} frameCount - Number of frames in the sprite sheet
     * @param {number} frameWidth - Width of each frame
     * @param {number} frameHeight - Height of each frame
     * @returns {Promise<Object>} Sprite sheet data with frames
     */
    async loadSpriteSheet(path, frameCount, frameWidth, frameHeight) {
        try {
            const img = await this.loadImage(path);
            const frames = [];

            // Calculate frames based on horizontal sprite sheet
            for (let i = 0; i < frameCount; i++) {
                frames.push({
                    x: i * frameWidth,
                    y: 0,
                    width: frameWidth,
                    height: frameHeight
                });
            }

            return {
                image: img,
                frames: frames,
                frameCount: frameCount,
                frameWidth: frameWidth,
                frameHeight: frameHeight,
                currentFrame: 0,
                animationSpeed: 100 // ms per frame
            };
        } catch (error) {
            console.warn(`⚠️ Could not load sprite sheet: ${path}, using fallback`);
            return this.createFallbackSprite(frameWidth, frameHeight, frameCount);
        }
    }

    /**
     * Load an icon set (multiple icons in a grid)
     */
    async loadIconSet(path, iconCount, iconWidth, iconHeight) {
        try {
            const img = await this.loadImage(path);
            const icons = [];
            const cols = Math.floor(img.width / iconWidth);

            for (let i = 0; i < iconCount; i++) {
                const row = Math.floor(i / cols);
                const col = i % cols;

                icons.push({
                    x: col * iconWidth,
                    y: row * iconHeight,
                    width: iconWidth,
                    height: iconHeight
                });
            }

            return { image: img, icons: icons };
        } catch (error) {
            console.warn(`⚠️ Could not load icon set: ${path}`);
            return null;
        }
    }

    /**
     * Load a single image
     * @param {string} path - Path to the image
     * @returns {Promise<Image>} Loaded image
     */
    loadImage(path) {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                this.loadedAssets++;
                this.updateProgress();
                resolve(img);
            };

            img.onerror = () => {
                console.warn(`Could not load image: ${path}`);
                // Create a fallback colored rectangle
                const canvas = document.createElement('canvas');
                canvas.width = 64;
                canvas.height = 64;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#ff00ff'; // Magenta to indicate missing asset
                ctx.fillRect(0, 0, 64, 64);
                const fallbackImg = new Image();
                fallbackImg.src = canvas.toDataURL();
                fallbackImg.onload = () => resolve(fallbackImg);
            };

            img.src = path;
            this.totalAssets++;
        });
    }

    /**
     * Create a fallback sprite when asset loading fails
     */
    createFallbackSprite(width, height, frameCount) {
        const canvas = document.createElement('canvas');
        canvas.width = width * frameCount;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Create simple colored rectangles as fallback frames
        for (let i = 0; i < frameCount; i++) {
            const hue = (i / frameCount) * 360;
            ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
            ctx.fillRect(i * width, 0, width, height);
            ctx.strokeStyle = '#000';
            ctx.strokeRect(i * width, 0, width, height);
        }

        const img = new Image();
        img.src = canvas.toDataURL();

        const frames = [];
        for (let i = 0; i < frameCount; i++) {
            frames.push({
                x: i * width,
                y: 0,
                width: width,
                height: height
            });
        }

        return {
            image: img,
            frames: frames,
            frameCount: frameCount,
            frameWidth: width,
            frameHeight: height,
            currentFrame: 0,
            animationSpeed: 100
        };
    }

    /**
     * Update loading progress
     */
    updateProgress() {
        if (this.totalAssets > 0) {
            this.loadingProgress = (this.loadedAssets / this.totalAssets) * 100;
        }
    }

    /**
     * Get a specific sprite
     */
    getSprite(category, name) {
        return this.sprites[category]?.[name] || null;
    }

    /**
     * Check if assets are loaded
     */
    isLoaded() {
        return this.loaded;
    }

    /**
     * Get loading progress (0-100)
     */
    getProgress() {
        return this.loadingProgress;
    }
}

/**
 * AnimationController - Manages sprite animations
 */
class AnimationController {
    constructor(spriteSheet) {
        this.spriteSheet = spriteSheet;
        this.currentFrame = 0;
        this.lastFrameTime = 0;
        this.playing = true;
        this.loop = true;
        this.speed = spriteSheet?.animationSpeed || 100;
    }

    /**
     * Update animation frame based on elapsed time
     */
    update(timestamp) {
        if (!this.playing || !this.spriteSheet) return;

        if (timestamp - this.lastFrameTime >= this.speed) {
            this.currentFrame++;

            if (this.currentFrame >= this.spriteSheet.frameCount) {
                if (this.loop) {
                    this.currentFrame = 0;
                } else {
                    this.currentFrame = this.spriteSheet.frameCount - 1;
                    this.playing = false;
                }
            }

            this.lastFrameTime = timestamp;
        }
    }

    /**
     * Draw current frame
     */
    draw(ctx, x, y, width, height) {
        if (!this.spriteSheet || !this.spriteSheet.image) return;

        const frame = this.spriteSheet.frames[this.currentFrame];

        ctx.drawImage(
            this.spriteSheet.image,
            frame.x, frame.y, frame.width, frame.height,
            x - width / 2, y - height / 2, width, height
        );
    }

    /**
     * Reset animation to first frame
     */
    reset() {
        this.currentFrame = 0;
        this.playing = true;
    }

    /**
     * Set animation speed
     */
    setSpeed(speed) {
        this.speed = speed;
    }

    /**
     * Play animation
     */
    play() {
        this.playing = true;
    }

    /**
     * Pause animation
     */
    pause() {
        this.playing = false;
    }

    /**
     * Set loop mode
     */
    setLoop(loop) {
        this.loop = loop;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AssetLoader, AnimationController };
}
