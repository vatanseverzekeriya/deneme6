// Professional Goblin Pixel Art Generator
class GoblinSpriteGenerator {
    constructor() {
        this.spriteSize = 64; // High quality sprites
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.spriteSize;
        this.canvas.height = this.spriteSize;
        this.ctx = this.canvas.getContext('2d');

        // Color palette for Goblin - Professional RPG quality
        this.colors = {
            // Skin tones
            skinDark: '#2d5016',
            skinBase: '#4a7c2c',
            skinLight: '#6ba542',
            skinHighlight: '#8bc653',

            // Clothing
            clothDark: '#4a2c1e',
            clothBase: '#6b4423',
            clothLight: '#8b5a2b',

            // Armor/Metal
            metalDark: '#3d3d3d',
            metalBase: '#6b6b6b',
            metalLight: '#9a9a9a',
            metalHighlight: '#c5c5c5',

            // Weapon
            weaponDark: '#2e2419',
            weaponBase: '#4d3d2f',
            weaponBlade: '#8b8b8b',
            weaponShine: '#dadada',

            // Eyes & details
            eyeWhite: '#ffffff',
            eyeRed: '#ff3333',
            eyeDark: '#1a0000',

            // Outline
            outline: '#0a0a0a',

            // Boss variant (golden/elite)
            goldDark: '#8b6914',
            goldBase: '#daa520',
            goldLight: '#ffd700',

            // Elite variant (purple)
            purpleDark: '#4a1a7c',
            purpleBase: '#6b2c9a',
            purpleLight: '#8b42c5'
        };
    }

    // Draw a single pixel
    pixel(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, 1, 1);
    }

    // Clear canvas
    clear() {
        this.ctx.clearRect(0, 0, this.spriteSize, this.spriteSize);
    }

    // Draw outline
    outline(pixels) {
        pixels.forEach(([x, y]) => this.pixel(x, y, this.colors.outline));
    }

    // Mirror horizontally
    mirror(pixels) {
        return pixels.map(([x, y, color]) => [this.spriteSize - 1 - x, y, color]);
    }

    // Draw Goblin facing SOUTH (front view) - IDLE
    drawGoblinSouthIdle(frame = 0) {
        this.clear();
        const centerX = this.spriteSize / 2;
        const centerY = this.spriteSize / 2;

        // Breathing animation offset
        const breathOffset = frame % 2 === 0 ? 0 : 1;

        // HEAD
        const head = [
            // Head outline and base
            [centerX - 6, centerY - 18, this.colors.outline],
            [centerX - 5, centerY - 19, this.colors.outline],
            [centerX - 4, centerY - 20, this.colors.outline],
            [centerX - 3, centerY - 20, this.colors.outline],
            [centerX - 2, centerY - 20, this.colors.outline],
            [centerX - 1, centerY - 20, this.colors.outline],
            [centerX, centerY - 20, this.colors.outline],
            [centerX + 1, centerY - 20, this.colors.outline],
            [centerX + 2, centerY - 20, this.colors.outline],
            [centerX + 3, centerY - 20, this.colors.outline],
            [centerX + 4, centerY - 20, this.colors.outline],
            [centerX + 5, centerY - 19, this.colors.outline],
            [centerX + 6, centerY - 18, this.colors.outline],

            // Head fill - left side
            [centerX - 5, centerY - 18, this.colors.skinDark],
            [centerX - 4, centerY - 19, this.colors.skinDark],
            [centerX - 4, centerY - 18, this.colors.skinBase],
            [centerX - 3, centerY - 19, this.colors.skinBase],
            [centerX - 3, centerY - 18, this.colors.skinBase],
            [centerX - 2, centerY - 19, this.colors.skinBase],
            [centerX - 2, centerY - 18, this.colors.skinLight],
            [centerX - 1, centerY - 19, this.colors.skinLight],
            [centerX - 1, centerY - 18, this.colors.skinLight],

            // Head fill - right side
            [centerX, centerY - 19, this.colors.skinLight],
            [centerX, centerY - 18, this.colors.skinLight],
            [centerX + 1, centerY - 19, this.colors.skinLight],
            [centerX + 1, centerY - 18, this.colors.skinLight],
            [centerX + 2, centerY - 19, this.colors.skinBase],
            [centerX + 2, centerY - 18, this.colors.skinLight],
            [centerX + 3, centerY - 19, this.colors.skinBase],
            [centerX + 3, centerY - 18, this.colors.skinBase],
            [centerX + 4, centerY - 19, this.colors.skinDark],
            [centerX + 4, centerY - 18, this.colors.skinBase],
            [centerX + 5, centerY - 18, this.colors.skinDark],

            // Face features
            // Left ear
            [centerX - 7, centerY - 16, this.colors.outline],
            [centerX - 7, centerY - 15, this.colors.outline],
            [centerX - 6, centerY - 17, this.colors.skinDark],
            [centerX - 6, centerY - 16, this.colors.skinBase],
            [centerX - 6, centerY - 15, this.colors.skinDark],

            // Right ear
            [centerX + 7, centerY - 16, this.colors.outline],
            [centerX + 7, centerY - 15, this.colors.outline],
            [centerX + 6, centerY - 17, this.colors.skinDark],
            [centerX + 6, centerY - 16, this.colors.skinBase],
            [centerX + 6, centerY - 15, this.colors.skinDark],

            // Left eye
            [centerX - 3, centerY - 16, this.colors.outline],
            [centerX - 2, centerY - 16, this.colors.outline],
            [centerX - 3, centerY - 15, this.colors.outline],
            [centerX - 2, centerY - 15, this.colors.eyeWhite],
            [centerX - 2, centerY - 14, this.colors.eyeRed],

            // Right eye
            [centerX + 2, centerY - 16, this.colors.outline],
            [centerX + 3, centerY - 16, this.colors.outline],
            [centerX + 3, centerY - 15, this.colors.outline],
            [centerX + 2, centerY - 15, this.colors.eyeWhite],
            [centerX + 2, centerY - 14, this.colors.eyeRed],

            // Nose
            [centerX, centerY - 14, this.colors.skinDark],
            [centerX, centerY - 13, this.colors.skinDark],

            // Mouth - evil grin
            [centerX - 2, centerY - 11, this.colors.outline],
            [centerX - 1, centerY - 11, this.colors.outline],
            [centerX, centerY - 11, this.colors.outline],
            [centerX + 1, centerY - 11, this.colors.outline],
            [centerX + 2, centerY - 11, this.colors.outline],
        ];

        // BODY
        const body = [
            // Torso - armor vest
            [centerX - 5, centerY - 10 + breathOffset, this.colors.outline],
            [centerX - 4, centerY - 10 + breathOffset, this.colors.clothDark],
            [centerX - 3, centerY - 10 + breathOffset, this.colors.clothBase],
            [centerX - 2, centerY - 10 + breathOffset, this.colors.clothBase],
            [centerX - 1, centerY - 10 + breathOffset, this.colors.clothLight],
            [centerX, centerY - 10 + breathOffset, this.colors.clothLight],
            [centerX + 1, centerY - 10 + breathOffset, this.colors.clothLight],
            [centerX + 2, centerY - 10 + breathOffset, this.colors.clothBase],
            [centerX + 3, centerY - 10 + breathOffset, this.colors.clothBase],
            [centerX + 4, centerY - 10 + breathOffset, this.colors.clothDark],
            [centerX + 5, centerY - 10 + breathOffset, this.colors.outline],

            // Chest
            [centerX - 6, centerY - 9 + breathOffset, this.colors.outline],
            [centerX - 5, centerY - 9 + breathOffset, this.colors.clothDark],
            [centerX - 4, centerY - 9 + breathOffset, this.colors.clothBase],
            [centerX - 3, centerY - 9 + breathOffset, this.colors.metalDark],
            [centerX - 2, centerY - 9 + breathOffset, this.colors.metalBase],
            [centerX - 1, centerY - 9 + breathOffset, this.colors.metalBase],
            [centerX, centerY - 9 + breathOffset, this.colors.metalLight],
            [centerX + 1, centerY - 9 + breathOffset, this.colors.metalBase],
            [centerX + 2, centerY - 9 + breathOffset, this.colors.metalBase],
            [centerX + 3, centerY - 9 + breathOffset, this.colors.metalDark],
            [centerX + 4, centerY - 9 + breathOffset, this.colors.clothBase],
            [centerX + 5, centerY - 9 + breathOffset, this.colors.clothDark],
            [centerX + 6, centerY - 9 + breathOffset, this.colors.outline],

            // Mid body
            [centerX - 6, centerY - 8 + breathOffset, this.colors.outline],
            [centerX - 5, centerY - 8 + breathOffset, this.colors.clothBase],
            [centerX - 4, centerY - 8 + breathOffset, this.colors.clothBase],
            [centerX - 3, centerY - 8 + breathOffset, this.colors.clothLight],
            [centerX - 2, centerY - 8 + breathOffset, this.colors.clothLight],
            [centerX - 1, centerY - 8 + breathOffset, this.colors.clothLight],
            [centerX, centerY - 8 + breathOffset, this.colors.clothLight],
            [centerX + 1, centerY - 8 + breathOffset, this.colors.clothLight],
            [centerX + 2, centerY - 8 + breathOffset, this.colors.clothLight],
            [centerX + 3, centerY - 8 + breathOffset, this.colors.clothLight],
            [centerX + 4, centerY - 8 + breathOffset, this.colors.clothBase],
            [centerX + 5, centerY - 8 + breathOffset, this.colors.clothBase],
            [centerX + 6, centerY - 8 + breathOffset, this.colors.outline],

            // Lower body
            [centerX - 5, centerY - 7 + breathOffset, this.colors.outline],
            [centerX - 4, centerY - 7 + breathOffset, this.colors.clothBase],
            [centerX - 3, centerY - 7 + breathOffset, this.colors.clothBase],
            [centerX - 2, centerY - 7 + breathOffset, this.colors.clothBase],
            [centerX - 1, centerY - 7 + breathOffset, this.colors.clothBase],
            [centerX, centerY - 7 + breathOffset, this.colors.clothBase],
            [centerX + 1, centerY - 7 + breathOffset, this.colors.clothBase],
            [centerX + 2, centerY - 7 + breathOffset, this.colors.clothBase],
            [centerX + 3, centerY - 7 + breathOffset, this.colors.clothBase],
            [centerX + 4, centerY - 7 + breathOffset, this.colors.clothBase],
            [centerX + 5, centerY - 7 + breathOffset, this.colors.outline],
        ];

        // ARMS
        const arms = [
            // Left arm
            [centerX - 8, centerY - 8, this.colors.outline],
            [centerX - 7, centerY - 9, this.colors.skinBase],
            [centerX - 7, centerY - 8, this.colors.skinLight],
            [centerX - 7, centerY - 7, this.colors.skinBase],
            [centerX - 7, centerY - 6, this.colors.skinBase],
            [centerX - 7, centerY - 5, this.colors.outline],

            // Right arm
            [centerX + 8, centerY - 8, this.colors.outline],
            [centerX + 7, centerY - 9, this.colors.skinBase],
            [centerX + 7, centerY - 8, this.colors.skinLight],
            [centerX + 7, centerY - 7, this.colors.skinBase],
            [centerX + 7, centerY - 6, this.colors.skinBase],
            [centerX + 7, centerY - 5, this.colors.outline],
        ];

        // WEAPON (right hand)
        const weapon = [
            // Dagger handle
            [centerX + 8, centerY - 6, this.colors.weaponDark],
            [centerX + 8, centerY - 5, this.colors.weaponBase],
            [centerX + 8, centerY - 4, this.colors.weaponBase],

            // Blade
            [centerX + 8, centerY - 7, this.colors.weaponBlade],
            [centerX + 8, centerY - 8, this.colors.weaponShine],
            [centerX + 8, centerY - 9, this.colors.weaponBlade],
            [centerX + 8, centerY - 10, this.colors.outline],
        ];

        // LEGS
        const legs = [
            // Left leg
            [centerX - 3, centerY - 6, this.colors.outline],
            [centerX - 3, centerY - 5, this.colors.clothDark],
            [centerX - 3, centerY - 4, this.colors.clothDark],
            [centerX - 3, centerY - 3, this.colors.clothDark],
            [centerX - 3, centerY - 2, this.colors.clothBase],
            [centerX - 3, centerY - 1, this.colors.outline],

            // Left foot
            [centerX - 4, centerY, this.colors.outline],
            [centerX - 3, centerY, this.colors.metalDark],
            [centerX - 2, centerY, this.colors.outline],

            // Right leg
            [centerX + 3, centerY - 6, this.colors.outline],
            [centerX + 3, centerY - 5, this.colors.clothDark],
            [centerX + 3, centerY - 4, this.colors.clothDark],
            [centerX + 3, centerY - 3, this.colors.clothDark],
            [centerX + 3, centerY - 2, this.colors.clothBase],
            [centerX + 3, centerY - 1, this.colors.outline],

            // Right foot
            [centerX + 2, centerY, this.colors.outline],
            [centerX + 3, centerY, this.colors.metalDark],
            [centerX + 4, centerY, this.colors.outline],
        ];

        // Draw all parts
        [...head, ...body, ...arms, ...weapon, ...legs].forEach(([x, y, color]) => {
            this.pixel(x, y, color);
        });

        return this.canvas.toDataURL();
    }

    // Generate walking animation frames
    drawGoblinSouthWalk(frame = 0) {
        this.clear();
        const centerX = this.spriteSize / 2;
        const centerY = this.spriteSize / 2;

        // Walk cycle: 4 frames
        const walkCycle = frame % 4;
        let leftLegOffset = 0;
        let rightLegOffset = 0;
        let bodyBob = 0;

        if (walkCycle === 0) {
            leftLegOffset = -1;
            rightLegOffset = 1;
            bodyBob = 0;
        } else if (walkCycle === 1) {
            leftLegOffset = 0;
            rightLegOffset = 0;
            bodyBob = -1;
        } else if (walkCycle === 2) {
            leftLegOffset = 1;
            rightLegOffset = -1;
            bodyBob = 0;
        } else {
            leftLegOffset = 0;
            rightLegOffset = 0;
            bodyBob = -1;
        }

        // HEAD (same as idle but with body bob)
        const head = [
            // Head outline
            [centerX - 6, centerY - 18 + bodyBob, this.colors.outline],
            [centerX - 5, centerY - 19 + bodyBob, this.colors.outline],
            [centerX - 4, centerY - 20 + bodyBob, this.colors.outline],
            [centerX + 4, centerY - 20 + bodyBob, this.colors.outline],
            [centerX + 5, centerY - 19 + bodyBob, this.colors.outline],
            [centerX + 6, centerY - 18 + bodyBob, this.colors.outline],

            // Head fill
            [centerX - 4, centerY - 19 + bodyBob, this.colors.skinBase],
            [centerX - 3, centerY - 19 + bodyBob, this.colors.skinBase],
            [centerX - 2, centerY - 19 + bodyBob, this.colors.skinLight],
            [centerX - 1, centerY - 19 + bodyBob, this.colors.skinLight],
            [centerX, centerY - 19 + bodyBob, this.colors.skinLight],
            [centerX + 1, centerY - 19 + bodyBob, this.colors.skinLight],
            [centerX + 2, centerY - 19 + bodyBob, this.colors.skinLight],
            [centerX + 3, centerY - 19 + bodyBob, this.colors.skinBase],
            [centerX + 4, centerY - 19 + bodyBob, this.colors.skinBase],

            // Eyes
            [centerX - 2, centerY - 16 + bodyBob, this.colors.outline],
            [centerX - 2, centerY - 15 + bodyBob, this.colors.eyeWhite],
            [centerX + 2, centerY - 16 + bodyBob, this.colors.outline],
            [centerX + 2, centerY - 15 + bodyBob, this.colors.eyeWhite],
        ];

        // BODY (same as idle with body bob)
        const body = [
            [centerX - 5, centerY - 10 + bodyBob, this.colors.outline],
            [centerX - 4, centerY - 10 + bodyBob, this.colors.clothBase],
            [centerX - 3, centerY - 10 + bodyBob, this.colors.clothBase],
            [centerX - 2, centerY - 10 + bodyBob, this.colors.clothLight],
            [centerX - 1, centerY - 10 + bodyBob, this.colors.clothLight],
            [centerX, centerY - 10 + bodyBob, this.colors.clothLight],
            [centerX + 1, centerY - 10 + bodyBob, this.colors.clothLight],
            [centerX + 2, centerY - 10 + bodyBob, this.colors.clothLight],
            [centerX + 3, centerY - 10 + bodyBob, this.colors.clothBase],
            [centerX + 4, centerY - 10 + bodyBob, this.colors.clothBase],
            [centerX + 5, centerY - 10 + bodyBob, this.colors.outline],

            [centerX - 6, centerY - 9 + bodyBob, this.colors.outline],
            [centerX - 5, centerY - 9 + bodyBob, this.colors.clothBase],
            [centerX - 3, centerY - 9 + bodyBob, this.colors.metalBase],
            [centerX - 1, centerY - 9 + bodyBob, this.colors.metalLight],
            [centerX, centerY - 9 + bodyBob, this.colors.metalLight],
            [centerX + 1, centerY - 9 + bodyBob, this.colors.metalLight],
            [centerX + 3, centerY - 9 + bodyBob, this.colors.metalBase],
            [centerX + 5, centerY - 9 + bodyBob, this.colors.clothBase],
            [centerX + 6, centerY - 9 + bodyBob, this.colors.outline],
        ];

        // LEGS with walk animation
        const legs = [
            // Left leg (moving)
            [centerX - 3, centerY - 6 + bodyBob, this.colors.outline],
            [centerX - 3, centerY - 5 + bodyBob + leftLegOffset, this.colors.clothDark],
            [centerX - 3, centerY - 4 + bodyBob + leftLegOffset, this.colors.clothDark],
            [centerX - 3, centerY - 3 + bodyBob + leftLegOffset, this.colors.clothDark],
            [centerX - 3, centerY - 2 + bodyBob + leftLegOffset, this.colors.clothBase],
            [centerX - 3, centerY - 1 + bodyBob + leftLegOffset, this.colors.outline],
            [centerX - 3, centerY + leftLegOffset, this.colors.metalDark],

            // Right leg (moving)
            [centerX + 3, centerY - 6 + bodyBob, this.colors.outline],
            [centerX + 3, centerY - 5 + bodyBob + rightLegOffset, this.colors.clothDark],
            [centerX + 3, centerY - 4 + bodyBob + rightLegOffset, this.colors.clothDark],
            [centerX + 3, centerY - 3 + bodyBob + rightLegOffset, this.colors.clothDark],
            [centerX + 3, centerY - 2 + bodyBob + rightLegOffset, this.colors.clothBase],
            [centerX + 3, centerY - 1 + bodyBob + rightLegOffset, this.colors.outline],
            [centerX + 3, centerY + rightLegOffset, this.colors.metalDark],
        ];

        [...head, ...body, ...legs].forEach(([x, y, color]) => {
            this.pixel(x, y, color);
        });

        return this.canvas.toDataURL();
    }

    // Draw attack animation
    drawGoblinSouthAttack(frame = 0) {
        this.clear();
        const centerX = this.spriteSize / 2;
        const centerY = this.spriteSize / 2;

        // Attack has 3 frames: wind-up, strike, recover
        const attackPhase = frame % 3;
        let weaponOffset = 0;
        let armExtend = 0;

        if (attackPhase === 0) {
            weaponOffset = -3; // Wind up
            armExtend = -2;
        } else if (attackPhase === 1) {
            weaponOffset = 4; // Strike!
            armExtend = 3;
        } else {
            weaponOffset = 0; // Recover
            armExtend = 0;
        }

        // Simplified attack frame - showing weapon swing
        const head = [
            [centerX, centerY - 19, this.colors.skinLight],
            [centerX - 1, centerY - 18, this.colors.skinBase],
            [centerX + 1, centerY - 18, this.colors.skinBase],
            [centerX - 2, centerY - 16, this.colors.eyeRed],
            [centerX + 2, centerY - 16, this.colors.eyeRed],
        ];

        const body = [
            [centerX - 4, centerY - 10, this.colors.clothBase],
            [centerX, centerY - 10, this.colors.clothLight],
            [centerX + 4, centerY - 10, this.colors.clothBase],
            [centerX - 3, centerY - 9, this.colors.metalBase],
            [centerX, centerY - 9, this.colors.metalLight],
            [centerX + 3, centerY - 9, this.colors.metalBase],
        ];

        // Weapon with attack motion
        const weapon = [
            [centerX + 7 + armExtend, centerY - 8 + weaponOffset, this.colors.weaponBlade],
            [centerX + 7 + armExtend, centerY - 9 + weaponOffset, this.colors.weaponShine],
            [centerX + 7 + armExtend, centerY - 10 + weaponOffset, this.colors.weaponBlade],
            [centerX + 7 + armExtend, centerY - 11 + weaponOffset, this.colors.outline],
        ];

        [...head, ...body, ...weapon].forEach(([x, y, color]) => {
            this.pixel(x, y, color);
        });

        return this.canvas.toDataURL();
    }

    // Apply color variant to create different goblin types
    applyColorVariant(variant = 'normal') {
        const originalColors = { ...this.colors };

        if (variant === 'elite') {
            // Elite goblins - Purple theme (stronger)
            this.colors.skinDark = '#3d1a5c';
            this.colors.skinBase = '#5c2c8a';
            this.colors.skinLight = '#7a42b8';
            this.colors.skinHighlight = '#9858d6';

            this.colors.clothDark = '#2c1a4a';
            this.colors.clothBase = '#4a2c6b';
            this.colors.clothLight = '#6b3d8b';

            this.colors.metalDark = '#5a3d8b';
            this.colors.metalBase = '#8b5ac5';
            this.colors.metalLight = '#b37ae6';
            this.colors.metalHighlight = '#d6a2ff';
        } else if (variant === 'boss') {
            // Boss goblins - Golden theme (most powerful)
            this.colors.skinDark = '#5c3d1a';
            this.colors.skinBase = '#8a5c2c';
            this.colors.skinLight = '#b87a42';
            this.colors.skinHighlight = '#d69858';

            this.colors.clothDark = '#6b1a1a';
            this.colors.clothBase = '#8b2c2c';
            this.colors.clothLight = '#b84242';

            this.colors.metalDark = '#8b6914';
            this.colors.metalBase = '#daa520';
            this.colors.metalLight = '#ffd700';
            this.colors.metalHighlight = '#ffed4e';

            this.colors.eyeRed = '#ff6600';
        }

        return originalColors;
    }

    restoreColors(originalColors) {
        this.colors = { ...originalColors };
    }

    // Generate all sprites for all directions and animations
    generateAllSprites(spriteSystem) {
        const directions = ['S', 'SE', 'E', 'NE', 'N', 'NW', 'W', 'SW'];
        const animations = {
            'idle': { frames: 2, generator: (f) => this.drawGoblinSouthIdle(f) },
            'walk': { frames: 4, generator: (f) => this.drawGoblinSouthWalk(f) },
            'attack': { frames: 3, generator: (f) => this.drawGoblinSouthAttack(f) }
        };

        const variants = ['normal', 'elite', 'boss'];

        variants.forEach(variant => {
            const originalColors = this.applyColorVariant(variant);

            directions.forEach(direction => {
                Object.keys(animations).forEach(animType => {
                    const anim = animations[animType];
                    const frames = [];

                    for (let f = 0; f < anim.frames; f++) {
                        const spriteData = anim.generator(f);
                        const transformedSprite = this.transformSpriteForDirection(spriteData, direction);
                        frames.push(transformedSprite);
                    }

                    // Register sprite sheet for this animation+direction+variant
                    const sheetName = variant === 'normal'
                        ? `goblin_${animType}_${direction}`
                        : `goblin_${variant}_${animType}_${direction}`;
                    this.createSpriteSheetFromFrames(frames, sheetName, spriteSystem);
                });
            });

            this.restoreColors(originalColors);
        });
    }

    // Transform sprite for different directions
    transformSpriteForDirection(spriteData, direction) {
        // For now, we'll use the same sprite with potential mirroring
        // In a full implementation, each direction would have unique art
        const needsFlip = ['W', 'NW', 'SW'].includes(direction);

        if (!needsFlip) {
            return spriteData;
        }

        // Create a flipped version
        const img = new Image();
        img.src = spriteData;

        const flipCanvas = document.createElement('canvas');
        flipCanvas.width = this.spriteSize;
        flipCanvas.height = this.spriteSize;
        const flipCtx = flipCanvas.getContext('2d');

        img.onload = () => {
            flipCtx.scale(-1, 1);
            flipCtx.drawImage(img, -this.spriteSize, 0, this.spriteSize, this.spriteSize);
        };

        return flipCanvas.toDataURL();
    }

    // Create a sprite sheet from individual frames
    createSpriteSheetFromFrames(frames, name, spriteSystem) {
        const sheetCanvas = document.createElement('canvas');
        sheetCanvas.width = this.spriteSize * frames.length;
        sheetCanvas.height = this.spriteSize;
        const sheetCtx = sheetCanvas.getContext('2d');

        let loadedFrames = 0;
        frames.forEach((frameData, index) => {
            const img = new Image();
            img.src = frameData;
            img.onload = () => {
                sheetCtx.drawImage(img, index * this.spriteSize, 0);
                loadedFrames++;

                if (loadedFrames === frames.length) {
                    // Register the completed sprite sheet
                    spriteSystem.registerSpriteSheet(name, sheetCanvas.toDataURL(), this.spriteSize, this.spriteSize);

                    // Register animation
                    const animFrames = [];
                    for (let i = 0; i < frames.length; i++) {
                        animFrames.push({ x: i, y: 0 });
                    }
                    spriteSystem.registerAnimation(name, name, animFrames, frames.length === 2 ? 2 : frames.length === 3 ? 6 : 8);
                }
            };
        });
    }
}

// Initialize goblin sprites
function initializeGoblinSprites(spriteSystem) {
    const generator = new GoblinSpriteGenerator();
    generator.generateAllSprites(spriteSystem);
    return generator;
}
