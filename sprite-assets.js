// ============================================================================
// OBSIDIAN CRYSTAL KNIGHT - PROFESSIONAL SPRITE ASSET SYSTEM
// ============================================================================
// High-quality pixel art sprites with multi-directional animations
// Theme: Dark crystal magic, obsidian armor, elemental creatures

class SpriteAssets {
    constructor() {
        this.sprites = {};
        this.loaded = false;
        this.generateAllSprites();
    }

    generateAllSprites() {
        // Generate character sprites
        this.sprites.knight = this.generateKnightSprites();

        // Generate enemy sprites
        this.sprites.amethystSprite = this.generateAmethystSprite();
        this.sprites.emeraldGolem = this.generateEmeraldGolem();
        this.sprites.rubyBeast = this.generateRubyBeast();
        this.sprites.sapphireWraith = this.generateSapphireWraith();
        this.sprites.diamondTitan = this.generateDiamondTitan();

        // Generate particle effects
        this.sprites.particles = this.generateParticles();

        this.loaded = true;
    }

    // ========================================================================
    // OBSIDIAN CRYSTAL KNIGHT - Main Character
    // ========================================================================
    generateKnightSprites() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Sprite sheet: 8 directions x 4 frames + 8 attack frames
        canvas.width = 512;  // 16 frames x 32px
        canvas.height = 256; // 8 directions x 32px

        const colors = {
            obsidian: '#1a0f2e',
            obsidianDark: '#0d0717',
            crystal: '#4a1fb8',
            crystalLight: '#7c3aed',
            glow: '#a78bfa',
            glowBright: '#c4b5fd',
            edge: '#2d1b69'
        };

        // 8 directions: S, SE, E, NE, N, NW, W, SW
        const directions = ['s', 'se', 'e', 'ne', 'n', 'nw', 'w', 'sw'];

        directions.forEach((dir, dirIndex) => {
            // Walk cycle - 4 frames
            for (let frame = 0; frame < 4; frame++) {
                const x = frame * 32;
                const y = dirIndex * 32;
                this.drawKnightFrame(ctx, x, y, dir, frame, colors);
            }

            // Attack animation - 4 frames
            for (let frame = 0; frame < 4; frame++) {
                const x = (frame + 4) * 32;
                const y = dirIndex * 32;
                this.drawKnightAttack(ctx, x, y, dir, frame, colors);
            }
        });

        return {
            canvas: canvas,
            frameWidth: 32,
            frameHeight: 32,
            walkFrames: 4,
            attackFrames: 4,
            directions: 8
        };
    }

    drawKnightFrame(ctx, x, y, direction, frame, colors) {
        ctx.save();
        ctx.translate(x + 16, y + 16);

        // Animation offset
        const bobOffset = Math.sin(frame * Math.PI / 2) * 1;
        const legSwing = Math.sin(frame * Math.PI / 2) * 2;

        ctx.translate(0, bobOffset);

        // Determine if facing left/right for sprite flipping
        const facingAngle = {
            's': 90, 'se': 135, 'e': 180, 'ne': 225,
            'n': 270, 'nw': 315, 'w': 0, 'sw': 45
        }[direction];

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 12, 8, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs (crystal structure)
        this.drawCrystalLeg(ctx, -3 + legSwing, 4, colors);
        this.drawCrystalLeg(ctx, 3 - legSwing, 4, colors);

        // Body - Obsidian crystal armor
        this.drawKnightBody(ctx, direction, colors);

        // Weapon - Crystal blade
        this.drawCrystalSword(ctx, direction, frame, colors);

        // Glow effect
        ctx.globalAlpha = 0.3 + Math.sin(frame * Math.PI / 2) * 0.1;
        ctx.fillStyle = colors.glow;
        ctx.shadowBlur = 8;
        ctx.shadowColor = colors.glowBright;
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    drawKnightBody(ctx, direction, colors) {
        // Main body - obsidian crystal
        ctx.fillStyle = colors.obsidian;
        ctx.strokeStyle = colors.edge;
        ctx.lineWidth = 1;

        // Torso
        ctx.beginPath();
        ctx.moveTo(-6, -4);
        ctx.lineTo(-4, -10);
        ctx.lineTo(4, -10);
        ctx.lineTo(6, -4);
        ctx.lineTo(4, 4);
        ctx.lineTo(-4, 4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Crystal accents
        ctx.fillStyle = colors.crystal;
        ctx.fillRect(-3, -8, 2, 3);
        ctx.fillRect(1, -8, 2, 3);
        ctx.fillRect(-2, -2, 4, 2);

        // Helmet
        ctx.fillStyle = colors.obsidianDark;
        ctx.beginPath();
        ctx.arc(0, -10, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Visor glow
        ctx.fillStyle = colors.crystalLight;
        ctx.fillRect(-4, -11, 2, 1);
        ctx.fillRect(2, -11, 2, 1);

        // Shoulder crystals
        this.drawSmallCrystal(ctx, -7, -6, colors);
        this.drawSmallCrystal(ctx, 7, -6, colors);
    }

    drawCrystalLeg(ctx, xOffset, yOffset, colors) {
        ctx.fillStyle = colors.obsidian;
        ctx.strokeStyle = colors.edge;
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(xOffset - 2, yOffset);
        ctx.lineTo(xOffset - 1, yOffset + 8);
        ctx.lineTo(xOffset + 1, yOffset + 8);
        ctx.lineTo(xOffset + 2, yOffset);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Crystal knee
        ctx.fillStyle = colors.crystal;
        ctx.fillRect(xOffset - 1, yOffset + 3, 2, 2);
    }

    drawCrystalSword(ctx, direction, frame, colors) {
        const swingOffset = Math.sin(frame * Math.PI / 2) * 3;

        ctx.save();

        // Position sword based on direction
        const rightSide = ['e', 'se', 's', 'sw'].includes(direction);
        ctx.translate(rightSide ? 8 : -8, -4);
        ctx.rotate((rightSide ? 45 : -45) * Math.PI / 180);

        // Blade
        ctx.fillStyle = colors.crystal;
        ctx.strokeStyle = colors.crystalLight;
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(0, -8);
        ctx.lineTo(1, 4);
        ctx.lineTo(-1, 4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Blade glow
        ctx.strokeStyle = colors.glowBright;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5;
        ctx.stroke();

        // Hilt
        ctx.globalAlpha = 1;
        ctx.fillStyle = colors.obsidianDark;
        ctx.fillRect(-2, 4, 4, 3);

        ctx.restore();
    }

    drawKnightAttack(ctx, x, y, direction, frame, colors) {
        ctx.save();
        ctx.translate(x + 16, y + 16);

        // Attack animation - sword slash
        const attackProgress = frame / 4;
        const slashAngle = attackProgress * 90 - 45;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 12, 8, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body (static during attack)
        this.drawKnightBody(ctx, direction, colors);

        // Sword slash trail
        ctx.strokeStyle = colors.glowBright;
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.6 - attackProgress * 0.4;
        ctx.beginPath();
        ctx.arc(0, -4, 12,
            (slashAngle - 30) * Math.PI / 180,
            (slashAngle + 30) * Math.PI / 180);
        ctx.stroke();

        ctx.globalAlpha = 1;
        ctx.restore();
    }

    drawSmallCrystal(ctx, x, y, colors) {
        ctx.fillStyle = colors.crystal;
        ctx.strokeStyle = colors.crystalLight;
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(x, y - 3);
        ctx.lineTo(x + 2, y);
        ctx.lineTo(x, y + 3);
        ctx.lineTo(x - 2, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    // ========================================================================
    // CRYSTAL ENEMIES
    // ========================================================================

    generateAmethystSprite() {
        // Small, fast purple crystal spirit
        return this.generateEnemySprite({
            size: 24,
            primary: '#9333ea',
            secondary: '#c084fc',
            glow: '#e9d5ff',
            type: 'floating',
            crystalCount: 5,
            name: 'amethyst'
        });
    }

    generateEmeraldGolem() {
        // Medium green crystal golem
        return this.generateEnemySprite({
            size: 32,
            primary: '#059669',
            secondary: '#10b981',
            glow: '#6ee7b7',
            type: 'walking',
            crystalCount: 8,
            name: 'emerald'
        });
    }

    generateRubyBeast() {
        // Aggressive red crystal beast
        return this.generateEnemySprite({
            size: 28,
            primary: '#dc2626',
            secondary: '#ef4444',
            glow: '#fca5a5',
            type: 'beast',
            crystalCount: 6,
            name: 'ruby'
        });
    }

    generateSapphireWraith() {
        // Magical blue crystal wraith
        return this.generateEnemySprite({
            size: 26,
            primary: '#2563eb',
            secondary: '#3b82f6',
            glow: '#93c5fd',
            type: 'floating',
            crystalCount: 7,
            name: 'sapphire'
        });
    }

    generateDiamondTitan() {
        // Massive white/clear crystal titan - boss
        return this.generateEnemySprite({
            size: 48,
            primary: '#e5e7eb',
            secondary: '#ffffff',
            glow: '#f3f4f6',
            type: 'titan',
            crystalCount: 12,
            name: 'diamond'
        });
    }

    generateEnemySprite(config) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 8 directions x 4 frames
        canvas.width = 128; // 4 frames x 32px
        canvas.height = 256; // 8 directions x 32px

        const directions = ['s', 'se', 'e', 'ne', 'n', 'nw', 'w', 'sw'];

        directions.forEach((dir, dirIndex) => {
            for (let frame = 0; frame < 4; frame++) {
                const x = frame * 32;
                const y = dirIndex * 32;
                this.drawEnemyFrame(ctx, x, y, dir, frame, config);
            }
        });

        return {
            canvas: canvas,
            frameWidth: 32,
            frameHeight: 32,
            frames: 4,
            directions: 8,
            config: config
        };
    }

    drawEnemyFrame(ctx, x, y, direction, frame, config) {
        ctx.save();
        ctx.translate(x + 16, y + 16);

        const animPhase = frame / 4;
        const floatOffset = Math.sin(animPhase * Math.PI * 2) * 2;
        const pulseScale = 1 + Math.sin(animPhase * Math.PI * 2) * 0.1;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(0, config.size / 3, config.size / 3, config.size / 6, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.translate(0, config.type === 'floating' ? floatOffset : 0);
        ctx.scale(pulseScale, pulseScale);

        if (config.type === 'titan') {
            this.drawTitanBody(ctx, config);
        } else if (config.type === 'beast') {
            this.drawBeastBody(ctx, direction, frame, config);
        } else if (config.type === 'walking') {
            this.drawGolemBody(ctx, frame, config);
        } else {
            this.drawSpriteBody(ctx, config);
        }

        // Glow effect
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = config.glow;
        ctx.shadowBlur = 10;
        ctx.shadowColor = config.glow;
        ctx.beginPath();
        ctx.arc(0, 0, config.size / 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    drawSpriteBody(ctx, config) {
        // Floating crystal sprite - ethereal
        const size = config.size / 2;

        // Core crystal cluster
        for (let i = 0; i < config.crystalCount; i++) {
            const angle = (i / config.crystalCount) * Math.PI * 2;
            const radius = size * 0.6;
            const cx = Math.cos(angle) * radius;
            const cy = Math.sin(angle) * radius;

            this.drawCrystalShard(ctx, cx, cy, size * 0.4, angle, config.primary, config.secondary);
        }

        // Center core
        ctx.fillStyle = config.secondary;
        ctx.strokeStyle = config.glow;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    drawGolemBody(ctx, frame, config) {
        const size = config.size / 2;
        const legSwing = Math.sin(frame * Math.PI / 2) * 2;

        // Legs
        ctx.fillStyle = config.primary;
        ctx.strokeStyle = config.secondary;
        ctx.lineWidth = 1;

        ctx.fillRect(-4 + legSwing, size - 4, 3, 8);
        ctx.strokeRect(-4 + legSwing, size - 4, 3, 8);
        ctx.fillRect(1 - legSwing, size - 4, 3, 8);
        ctx.strokeRect(1 - legSwing, size - 4, 3, 8);

        // Body - crystalline
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size, -size * 0.3);
        ctx.lineTo(size * 0.7, size);
        ctx.lineTo(-size * 0.7, size);
        ctx.lineTo(-size, -size * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Crystal formations
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const cx = Math.cos(angle) * size * 0.6;
            const cy = Math.sin(angle) * size * 0.4;
            this.drawSmallCrystal(ctx, cx, cy, {
                crystal: config.secondary,
                crystalLight: config.glow
            });
        }
    }

    drawBeastBody(ctx, direction, frame, config) {
        const size = config.size / 2;
        const legSwing = Math.sin(frame * Math.PI / 2) * 3;

        // Four legs
        ctx.fillStyle = config.primary;
        ctx.strokeStyle = config.secondary;
        ctx.lineWidth = 1;

        [-4, 4].forEach(xOff => {
            ctx.fillRect(xOff - 1 + legSwing, size - 2, 2, 6);
            ctx.fillRect(xOff - 1 - legSwing, size + 2, 2, 6);
        });

        // Body
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 1.2, size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Spikes
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
            const cx = Math.cos(angle) * size;
            const cy = Math.sin(angle) * size * 0.6;
            this.drawCrystalShard(ctx, cx, cy, size * 0.5, angle, config.secondary, config.glow);
        }

        // Eyes
        ctx.fillStyle = config.glow;
        const rightSide = ['e', 'se', 's', 'sw'].includes(direction);
        ctx.fillRect(rightSide ? 2 : -4, -size * 0.3, 2, 2);
        ctx.fillRect(rightSide ? 6 : -8, -size * 0.3, 2, 2);
    }

    drawTitanBody(ctx, config) {
        const size = config.size / 2;

        // Massive crystalline structure
        ctx.fillStyle = config.primary;
        ctx.strokeStyle = config.secondary;
        ctx.lineWidth = 2;

        // Main body
        ctx.beginPath();
        ctx.moveTo(0, -size * 1.2);
        ctx.lineTo(size, -size * 0.5);
        ctx.lineTo(size * 0.8, size * 0.8);
        ctx.lineTo(-size * 0.8, size * 0.8);
        ctx.lineTo(-size, -size * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Arms
        ctx.fillRect(-size * 1.2, -size * 0.3, size * 0.4, size);
        ctx.fillRect(size * 0.8, -size * 0.3, size * 0.4, size);

        // Crystal formations
        for (let i = 0; i < config.crystalCount; i++) {
            const angle = (i / config.crystalCount) * Math.PI * 2;
            const radius = size * 0.9;
            const cx = Math.cos(angle) * radius;
            const cy = Math.sin(angle) * radius * 0.7;
            const shardSize = size * (0.3 + Math.random() * 0.3);
            this.drawCrystalShard(ctx, cx, cy, shardSize, angle, config.secondary, config.glow);
        }

        // Core
        ctx.fillStyle = config.glow;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
        ctx.fill();
    }

    drawCrystalShard(ctx, x, y, size, angle, color1, color2) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        ctx.fillStyle = color1;
        ctx.strokeStyle = color2;
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.3, 0);
        ctx.lineTo(0, size * 0.7);
        ctx.lineTo(-size * 0.3, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    }

    // ========================================================================
    // PARTICLE EFFECTS
    // ========================================================================

    generateParticles() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 128;
        canvas.height = 32;

        const particles = [
            { color: '#a78bfa', size: 4 },
            { color: '#c4b5fd', size: 3 },
            { color: '#7c3aed', size: 5 },
            { color: '#ffffff', size: 2 }
        ];

        particles.forEach((p, i) => {
            const x = i * 32 + 16;
            const y = 16;

            ctx.fillStyle = p.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
            ctx.beginPath();
            ctx.arc(x, y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        return {
            canvas: canvas,
            types: particles.length
        };
    }
}

// ============================================================================
// SPRITE ANIMATOR
// ============================================================================

class SpriteAnimator {
    constructor(spriteData) {
        this.spriteData = spriteData;
        this.currentFrame = 0;
        this.currentDirection = 0;
        this.animationSpeed = 150; // ms per frame
        this.lastFrameTime = 0;
        this.isAttacking = false;
    }

    setDirection(angle) {
        // Convert movement angle to direction index (0-7)
        // 0=S, 1=SE, 2=E, 3=NE, 4=N, 5=NW, 6=W, 7=SW
        const normalized = ((angle % 360) + 360) % 360;
        this.currentDirection = Math.round(normalized / 45) % 8;
    }

    update(timestamp) {
        if (timestamp - this.lastFrameTime > this.animationSpeed) {
            const maxFrames = this.isAttacking ?
                this.spriteData.attackFrames : this.spriteData.walkFrames;
            this.currentFrame = (this.currentFrame + 1) % maxFrames;
            this.lastFrameTime = timestamp;

            if (this.isAttacking && this.currentFrame === 0) {
                this.isAttacking = false;
            }
        }
    }

    attack() {
        this.isAttacking = true;
        this.currentFrame = 0;
    }

    draw(ctx, x, y, scale = 1) {
        const frameOffset = this.isAttacking ? 4 : 0;
        const sx = (this.currentFrame + frameOffset) * this.spriteData.frameWidth;
        const sy = this.currentDirection * this.spriteData.frameHeight;

        ctx.drawImage(
            this.spriteData.canvas,
            sx, sy,
            this.spriteData.frameWidth, this.spriteData.frameHeight,
            x - (this.spriteData.frameWidth * scale) / 2,
            y - (this.spriteData.frameHeight * scale) / 2,
            this.spriteData.frameWidth * scale,
            this.spriteData.frameHeight * scale
        );
    }
}

// ============================================================================
// PARTICLE SYSTEM
// ============================================================================

class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    emit(x, y, config = {}) {
        const count = config.count || 10;
        const color = config.color || '#a78bfa';
        const speed = config.speed || 2;
        const life = config.life || 1000;

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = speed * (0.5 + Math.random() * 0.5);

            this.particles.push({
                x, y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                color,
                size: 2 + Math.random() * 3,
                life,
                maxLife: life,
                alpha: 1
            });
        }
    }

    update(deltaTime) {
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.life -= deltaTime;
            p.alpha = p.life / p.maxLife;
            return p.life > 0;
        });
    }

    draw(ctx) {
        this.particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 5;
            ctx.shadowColor = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }
}

// Export for use in main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SpriteAssets, SpriteAnimator, ParticleSystem };
}
