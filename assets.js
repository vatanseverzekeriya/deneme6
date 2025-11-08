/**
 * CRYSTAL MAGE RPG - Professional Asset System
 * High-quality sprite rendering with 8-directional movement
 * Converted from emoji to professional RPG assets
 */

class SpriteRenderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.animationCache = new Map();
    }

    /**
     * Draw a sprite with the current animation frame
     */
    drawSprite(sprite, x, y, scale = 1) {
        const frame = sprite.getCurrentFrame();
        if (frame) {
            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.scale(scale, scale);
            frame(this.ctx, 0, 0);
            this.ctx.restore();
        }
    }

    /**
     * Draw shadow under character
     */
    drawShadow(x, y, width, height, alpha = 0.3) {
        this.ctx.save();
        this.ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        this.ctx.beginPath();
        this.ctx.ellipse(x, y + height / 2, width / 2, height / 4, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }
}

class AnimatedSprite {
    constructor(animations, defaultAnimation = 'idle') {
        this.animations = animations;
        this.currentAnimation = defaultAnimation;
        this.currentFrame = 0;
        this.frameTime = 0;
        this.frameDuration = 100; // ms per frame
        this.direction = 'south'; // N, NE, E, SE, S, SW, W, NW
    }

    setAnimation(name) {
        if (name !== this.currentAnimation && this.animations[name]) {
            this.currentAnimation = name;
            this.currentFrame = 0;
            this.frameTime = 0;
        }
    }

    setDirection(direction) {
        this.direction = direction;
    }

    update(deltaTime) {
        this.frameTime += deltaTime;
        const anim = this.animations[this.currentAnimation];
        if (!anim) return;

        if (this.frameTime >= this.frameDuration) {
            this.frameTime = 0;
            this.currentFrame = (this.currentFrame + 1) % anim.frames;
        }
    }

    getCurrentFrame() {
        const anim = this.animations[this.currentAnimation];
        if (!anim) return null;
        return anim.render;
    }

    isAnimationFinished() {
        return this.currentFrame === this.animations[this.currentAnimation]?.frames - 1;
    }
}

/**
 * CRYSTAL MAGE CHARACTER
 * Professional sprite with glowing crystal effects
 */
const CrystalMageAsset = {
    idle: {
        frames: 4,
        render: (ctx, x, y, frame = 0, direction = 'south') => {
            const breathe = Math.sin(Date.now() / 300) * 2;

            // Body glow
            ctx.save();
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#a78bfa';

            // Robe (flowing purple)
            ctx.fillStyle = '#6d28d9';
            ctx.beginPath();
            ctx.ellipse(x, y + 15 + breathe, 16, 22, 0, 0, Math.PI * 2);
            ctx.fill();

            // Robe detail
            ctx.fillStyle = '#8b5cf6';
            ctx.beginPath();
            ctx.ellipse(x, y + 10 + breathe, 14, 18, 0, 0, Math.PI * 2);
            ctx.fill();

            // Belt with crystal
            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(x - 12, y + 8, 24, 3);

            // Arms
            const armSwing = Math.sin(Date.now() / 400) * 3;

            // Left arm
            ctx.fillStyle = '#8b5cf6';
            ctx.beginPath();
            ctx.arc(x - 12, y + 12 + armSwing, 6, 0, Math.PI * 2);
            ctx.fill();

            // Right arm holding staff
            ctx.beginPath();
            ctx.arc(x + 12, y + 12 - armSwing, 6, 0, Math.PI * 2);
            ctx.fill();

            // Head
            ctx.fillStyle = '#fde68a';
            ctx.beginPath();
            ctx.arc(x, y - 8, 10, 0, Math.PI * 2);
            ctx.fill();

            // Hood
            ctx.fillStyle = '#5b21b6';
            ctx.beginPath();
            ctx.ellipse(x, y - 12, 12, 8, 0, Math.PI, Math.PI * 2);
            ctx.fill();

            // Face details
            ctx.fillStyle = '#1f2937';
            // Eyes
            ctx.fillRect(x - 4, y - 9, 2, 2);
            ctx.fillRect(x + 2, y - 9, 2, 2);

            // Eye glow
            ctx.fillStyle = '#a78bfa';
            ctx.fillRect(x - 4, y - 9, 1, 1);
            ctx.fillRect(x + 2, y - 9, 1, 1);

            // Crystal Staff
            ctx.strokeStyle = '#78716c';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x + 12, y + 12 - armSwing);
            ctx.lineTo(x + 16, y - 15);
            ctx.stroke();

            // Crystal orb on staff (animated glow)
            const glowPulse = 0.5 + Math.sin(Date.now() / 200) * 0.5;
            ctx.shadowBlur = 30 * glowPulse;
            ctx.shadowColor = '#a78bfa';

            // Outer glow
            ctx.fillStyle = `rgba(167, 139, 250, ${0.3 * glowPulse})`;
            ctx.beginPath();
            ctx.arc(x + 16, y - 15, 8, 0, Math.PI * 2);
            ctx.fill();

            // Middle layer
            ctx.fillStyle = `rgba(139, 92, 246, ${0.8})`;
            ctx.beginPath();
            ctx.arc(x + 16, y - 15, 5, 0, Math.PI * 2);
            ctx.fill();

            // Inner crystal
            ctx.fillStyle = '#c4b5fd';
            ctx.beginPath();
            ctx.arc(x + 16, y - 15, 3, 0, Math.PI * 2);
            ctx.fill();

            // Crystal shine
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(x + 17, y - 16, 1, 0, Math.PI * 2);
            ctx.fill();

            // Floating particles around mage
            for (let i = 0; i < 3; i++) {
                const angle = (Date.now() / 1000 + i * (Math.PI * 2 / 3)) % (Math.PI * 2);
                const radius = 25 + Math.sin(Date.now() / 500 + i) * 5;
                const px = x + Math.cos(angle) * radius;
                const py = y + Math.sin(angle) * radius;

                ctx.shadowBlur = 10;
                ctx.fillStyle = `rgba(167, 139, 250, ${0.6 + Math.sin(Date.now() / 300 + i) * 0.4})`;
                ctx.beginPath();
                ctx.arc(px, py, 2, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    },

    walk: {
        frames: 8,
        render: (ctx, x, y, frame = 0, direction = 'south') => {
            const step = Math.sin((Date.now() / 100) % (Math.PI * 2)) * 3;
            const armSwing = Math.sin(Date.now() / 150) * 5;

            ctx.save();
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#a78bfa';

            // Walking robe animation
            const robeFlow = Math.sin(Date.now() / 100) * 2;

            // Robe base
            ctx.fillStyle = '#6d28d9';
            ctx.beginPath();
            ctx.ellipse(x, y + 15, 16, 22 + robeFlow, 0, 0, Math.PI * 2);
            ctx.fill();

            // Robe front
            ctx.fillStyle = '#8b5cf6';
            ctx.beginPath();
            ctx.ellipse(x - 2, y + 10, 14, 18, 0, 0, Math.PI * 2);
            ctx.fill();

            // Legs (subtle showing during walk)
            ctx.fillStyle = '#5b21b6';
            ctx.fillRect(x - 6, y + 20 + step, 5, 10);
            ctx.fillRect(x + 1, y + 20 - step, 5, 10);

            // Belt
            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(x - 12, y + 8, 24, 3);

            // Arms (swinging)
            ctx.fillStyle = '#8b5cf6';

            // Left arm
            ctx.beginPath();
            ctx.arc(x - 12, y + 12 + armSwing, 6, 0, Math.PI * 2);
            ctx.fill();

            // Right arm with staff
            ctx.beginPath();
            ctx.arc(x + 12, y + 12 - armSwing, 6, 0, Math.PI * 2);
            ctx.fill();

            // Head
            ctx.fillStyle = '#fde68a';
            ctx.beginPath();
            ctx.arc(x, y - 8 + Math.sin(Date.now() / 150), 10, 0, Math.PI * 2);
            ctx.fill();

            // Hood
            ctx.fillStyle = '#5b21b6';
            ctx.beginPath();
            ctx.ellipse(x, y - 12, 12, 8, 0, Math.PI, Math.PI * 2);
            ctx.fill();

            // Eyes
            ctx.fillStyle = '#a78bfa';
            ctx.fillRect(x - 4, y - 9, 2, 2);
            ctx.fillRect(x + 2, y - 9, 2, 2);

            // Staff
            ctx.strokeStyle = '#78716c';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x + 12, y + 12 - armSwing);
            ctx.lineTo(x + 16, y - 15 + Math.sin(Date.now() / 150) * 2);
            ctx.stroke();

            // Staff crystal
            const glowPulse = 0.7 + Math.sin(Date.now() / 200) * 0.3;
            ctx.shadowBlur = 25 * glowPulse;
            ctx.shadowColor = '#a78bfa';

            ctx.fillStyle = `rgba(167, 139, 250, ${0.4 * glowPulse})`;
            ctx.beginPath();
            ctx.arc(x + 16, y - 15, 7, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#c4b5fd';
            ctx.beginPath();
            ctx.arc(x + 16, y - 15, 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(x + 17, y - 16, 1, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    },

    attack: {
        frames: 6,
        render: (ctx, x, y, frame = 0, direction = 'south') => {
            const attackProgress = frame / 6;
            const staffAngle = -Math.PI / 4 + attackProgress * Math.PI / 2;

            ctx.save();
            ctx.shadowBlur = 25;
            ctx.shadowColor = '#a78bfa';

            // Robe
            ctx.fillStyle = '#6d28d9';
            ctx.beginPath();
            ctx.ellipse(x, y + 15, 16, 22, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#8b5cf6';
            ctx.beginPath();
            ctx.ellipse(x, y + 10, 14, 18, 0, 0, Math.PI * 2);
            ctx.fill();

            // Belt
            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(x - 12, y + 8, 24, 3);

            // Attacking arm position
            const armReach = 15 * attackProgress;

            // Left arm
            ctx.fillStyle = '#8b5cf6';
            ctx.beginPath();
            ctx.arc(x - 10, y + 8, 6, 0, Math.PI * 2);
            ctx.fill();

            // Right arm (attacking)
            ctx.beginPath();
            ctx.arc(x + 10 + armReach, y + 5 - armReach, 6, 0, Math.PI * 2);
            ctx.fill();

            // Head
            ctx.fillStyle = '#fde68a';
            ctx.beginPath();
            ctx.arc(x, y - 8, 10, 0, Math.PI * 2);
            ctx.fill();

            // Hood
            ctx.fillStyle = '#5b21b6';
            ctx.beginPath();
            ctx.ellipse(x, y - 12, 12, 8, 0, Math.PI, Math.PI * 2);
            ctx.fill();

            // Eyes (focused)
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x - 4, y - 9, 2, 3);
            ctx.fillRect(x + 2, y - 9, 2, 3);

            // Staff (swinging)
            const staffLength = 35;
            const staffX = x + 10 + armReach;
            const staffY = y + 5 - armReach;
            const staffEndX = staffX + Math.cos(staffAngle) * staffLength;
            const staffEndY = staffY + Math.sin(staffAngle) * staffLength;

            ctx.strokeStyle = '#78716c';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(staffX, staffY);
            ctx.lineTo(staffEndX, staffEndY);
            ctx.stroke();

            // Attack crystal blast
            ctx.shadowBlur = 40;
            ctx.shadowColor = '#a78bfa';

            ctx.fillStyle = `rgba(167, 139, 250, ${0.8 * attackProgress})`;
            ctx.beginPath();
            ctx.arc(staffEndX, staffEndY, 12 * attackProgress, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = `rgba(196, 181, 253, ${attackProgress})`;
            ctx.beginPath();
            ctx.arc(staffEndX, staffEndY, 8 * attackProgress, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(staffEndX, staffEndY, 3 * attackProgress, 0, Math.PI * 2);
            ctx.fill();

            // Energy trail
            if (attackProgress > 0.3) {
                for (let i = 0; i < 5; i++) {
                    const t = i / 5;
                    const trailX = staffX + (staffEndX - staffX) * t;
                    const trailY = staffY + (staffEndY - staffY) * t;

                    ctx.fillStyle = `rgba(167, 139, 250, ${0.4 * (1 - t)})`;
                    ctx.beginPath();
                    ctx.arc(trailX, trailY, 4 * (1 - t), 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            ctx.restore();
        }
    },

    hurt: {
        frames: 3,
        render: (ctx, x, y, frame = 0) => {
            const shake = frame % 2 === 0 ? 2 : -2;

            ctx.save();

            // Red damage overlay
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#ef4444';

            // Robe (damaged state)
            ctx.fillStyle = '#7c2d12';
            ctx.beginPath();
            ctx.ellipse(x + shake, y + 15, 16, 22, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#991b1b';
            ctx.beginPath();
            ctx.ellipse(x + shake, y + 10, 14, 18, 0, 0, Math.PI * 2);
            ctx.fill();

            // Belt
            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(x + shake - 12, y + 8, 24, 3);

            // Arms
            ctx.fillStyle = '#991b1b';
            ctx.beginPath();
            ctx.arc(x + shake - 12, y + 15, 6, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x + shake + 12, y + 15, 6, 0, Math.PI * 2);
            ctx.fill();

            // Head (pained expression)
            ctx.fillStyle = '#fde68a';
            ctx.beginPath();
            ctx.arc(x + shake, y - 8, 10, 0, Math.PI * 2);
            ctx.fill();

            // Hood
            ctx.fillStyle = '#5b21b6';
            ctx.beginPath();
            ctx.ellipse(x + shake, y - 12, 12, 8, 0, Math.PI, Math.PI * 2);
            ctx.fill();

            // Eyes (pained)
            ctx.fillStyle = '#1f2937';
            ctx.beginPath();
            ctx.arc(x + shake - 3, y - 7, 2, 0, Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + shake + 3, y - 7, 2, 0, Math.PI);
            ctx.fill();

            // Damage particles
            for (let i = 0; i < 5; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = 15 + Math.random() * 10;
                const px = x + Math.cos(angle) * dist;
                const py = y + Math.sin(angle) * dist;

                ctx.fillStyle = `rgba(239, 68, 68, ${0.5 + Math.random() * 0.5})`;
                ctx.beginPath();
                ctx.arc(px, py, 2, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    },

    death: {
        frames: 10,
        render: (ctx, x, y, frame = 0) => {
            const fallProgress = frame / 10;
            const fadeAlpha = 1 - fallProgress;

            ctx.save();
            ctx.globalAlpha = fadeAlpha;

            // Falling/fading effect
            const fallOffset = fallProgress * 30;
            const rotateAngle = fallProgress * Math.PI / 2;

            ctx.translate(x, y + fallOffset);
            ctx.rotate(rotateAngle);

            ctx.shadowBlur = 10;
            ctx.shadowColor = '#a78bfa';

            // Robe
            ctx.fillStyle = '#6d28d9';
            ctx.beginPath();
            ctx.ellipse(0, 15, 16, 22, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#8b5cf6';
            ctx.beginPath();
            ctx.ellipse(0, 10, 14, 18, 0, 0, Math.PI * 2);
            ctx.fill();

            // Belt
            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(-12, 8, 24, 3);

            // Arms (limp)
            ctx.fillStyle = '#8b5cf6';
            ctx.beginPath();
            ctx.arc(-15, 20, 6, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(15, 20, 6, 0, Math.PI * 2);
            ctx.fill();

            // Head
            ctx.fillStyle = '#fde68a';
            ctx.beginPath();
            ctx.arc(0, -8, 10, 0, Math.PI * 2);
            ctx.fill();

            // Hood
            ctx.fillStyle = '#5b21b6';
            ctx.beginPath();
            ctx.ellipse(0, -12, 12, 8, 0, Math.PI, Math.PI * 2);
            ctx.fill();

            // Eyes (closed)
            ctx.strokeStyle = '#1f2937';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-5, -9);
            ctx.lineTo(-3, -9);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(3, -9);
            ctx.lineTo(5, -9);
            ctx.stroke();

            // Soul particles rising
            for (let i = 0; i < 8; i++) {
                const particleY = -20 - (fallProgress * 50) - i * 10;
                const particleX = Math.sin(fallProgress * Math.PI + i) * 10;
                const particleAlpha = fadeAlpha * (1 - i / 8);

                ctx.fillStyle = `rgba(196, 181, 253, ${particleAlpha})`;
                ctx.beginPath();
                ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    },

    cast: {
        frames: 8,
        render: (ctx, x, y, frame = 0) => {
            const castProgress = frame / 8;
            const energyRadius = castProgress * 40;

            ctx.save();
            ctx.shadowBlur = 30;
            ctx.shadowColor = '#a78bfa';

            // Energy circle growing
            ctx.strokeStyle = `rgba(167, 139, 250, ${1 - castProgress * 0.5})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(x, y, energyRadius, 0, Math.PI * 2);
            ctx.stroke();

            // Robe (charged)
            ctx.fillStyle = '#6d28d9';
            ctx.beginPath();
            ctx.ellipse(x, y + 15, 16, 22, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#a78bfa'; // Brighter when casting
            ctx.beginPath();
            ctx.ellipse(x, y + 10, 14, 18, 0, 0, Math.PI * 2);
            ctx.fill();

            // Belt
            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(x - 12, y + 8, 24, 3);

            // Arms raised
            ctx.fillStyle = '#8b5cf6';

            // Left arm up
            ctx.beginPath();
            ctx.arc(x - 15, y - 5, 6, 0, Math.PI * 2);
            ctx.fill();

            // Right arm up
            ctx.beginPath();
            ctx.arc(x + 15, y - 5, 6, 0, Math.PI * 2);
            ctx.fill();

            // Head
            ctx.fillStyle = '#fde68a';
            ctx.beginPath();
            ctx.arc(x, y - 8, 10, 0, Math.PI * 2);
            ctx.fill();

            // Hood
            ctx.fillStyle = '#5b21b6';
            ctx.beginPath();
            ctx.ellipse(x, y - 12, 12, 8, 0, Math.PI, Math.PI * 2);
            ctx.fill();

            // Eyes (glowing bright)
            ctx.shadowBlur = 15;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x - 4, y - 9, 3, 3);
            ctx.fillRect(x + 1, y - 9, 3, 3);

            // Energy orbs between hands
            for (let i = 0; i < 3; i++) {
                const angle = (Date.now() / 500 + i * (Math.PI * 2 / 3)) % (Math.PI * 2);
                const radius = 20 * castProgress;
                const orbX = x + Math.cos(angle) * radius;
                const orbY = y - 5 + Math.sin(angle) * radius;

                ctx.shadowBlur = 20;
                ctx.fillStyle = '#c4b5fd';
                ctx.beginPath();
                ctx.arc(orbX, orbY, 4, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(orbX, orbY, 2, 0, Math.PI * 2);
                ctx.fill();
            }

            // Central power sphere
            ctx.shadowBlur = 40;
            ctx.fillStyle = `rgba(196, 181, 253, ${castProgress})`;
            ctx.beginPath();
            ctx.arc(x, y - 5, 15 * castProgress, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = `rgba(255, 255, 255, ${castProgress * 0.8})`;
            ctx.beginPath();
            ctx.arc(x, y - 5, 8 * castProgress, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    }
};

/**
 * SHADOW WRAITH ENEMY
 * Dark creature that hunts the crystal mage
 */
const ShadowWraithAsset = {
    idle: {
        frames: 4,
        render: (ctx, x, y) => {
            const float = Math.sin(Date.now() / 400) * 3;

            ctx.save();
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#7c3aed';

            // Ethereal body (transparent, flowing)
            const bodyAlpha = 0.7 + Math.sin(Date.now() / 300) * 0.2;
            ctx.fillStyle = `rgba(88, 28, 135, ${bodyAlpha})`;
            ctx.beginPath();
            ctx.ellipse(x, y + float, 15, 25, 0, 0, Math.PI * 2);
            ctx.fill();

            // Dark core
            ctx.fillStyle = '#3b0764';
            ctx.beginPath();
            ctx.ellipse(x, y - 5 + float, 12, 18, 0, 0, Math.PI * 2);
            ctx.fill();

            // Wispy tendrils
            for (let i = 0; i < 3; i++) {
                const angle = (Date.now() / 800 + i * (Math.PI * 2 / 3)) % (Math.PI * 2);
                const tendrilLength = 15 + Math.sin(Date.now() / 400 + i) * 5;

                ctx.strokeStyle = `rgba(124, 58, 237, ${0.4 + Math.sin(Date.now() / 300 + i) * 0.2})`;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(x, y + float);
                ctx.lineTo(
                    x + Math.cos(angle) * tendrilLength,
                    y + float + Math.sin(angle) * tendrilLength
                );
                ctx.stroke();
            }

            // Glowing eyes
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ef4444';
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(x - 5, y - 8 + float, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 5, y - 8 + float, 3, 0, Math.PI * 2);
            ctx.fill();

            // Eye glow center
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(x - 5, y - 8 + float, 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 5, y - 8 + float, 1, 0, Math.PI * 2);
            ctx.fill();

            // Wispy particles
            for (let i = 0; i < 5; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = 20 + Math.random() * 10;
                const px = x + Math.cos(angle + Date.now() / 1000) * dist;
                const py = y + float + Math.sin(angle + Date.now() / 1000) * dist;

                ctx.fillStyle = `rgba(124, 58, 237, ${0.3 + Math.random() * 0.3})`;
                ctx.beginPath();
                ctx.arc(px, py, 1 + Math.random(), 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    },

    walk: {
        frames: 6,
        render: (ctx, x, y) => {
            const float = Math.sin(Date.now() / 300) * 4;
            const drift = Math.sin(Date.now() / 200) * 2;

            ctx.save();
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#7c3aed';

            // Moving body (stretched forward)
            ctx.fillStyle = `rgba(88, 28, 135, 0.8)`;
            ctx.beginPath();
            ctx.ellipse(x + drift, y + float, 14, 26, Math.PI / 16, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#3b0764';
            ctx.beginPath();
            ctx.ellipse(x + drift, y - 5 + float, 11, 19, Math.PI / 16, 0, Math.PI * 2);
            ctx.fill();

            // Motion tendrils
            for (let i = 0; i < 4; i++) {
                const angle = Math.PI + (i * Math.PI / 6 - Math.PI / 4);
                const length = 12 + i * 3;

                ctx.strokeStyle = `rgba(124, 58, 237, ${0.5 - i * 0.1})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x, y + float);
                ctx.lineTo(
                    x + Math.cos(angle) * length,
                    y + float + Math.sin(angle) * length
                );
                ctx.stroke();
            }

            // Eyes (focused forward)
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ef4444';
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.ellipse(x - 4 + drift, y - 8 + float, 3, 4, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(x + 6 + drift, y - 8 + float, 3, 4, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(x - 4 + drift, y - 8 + float, 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 6 + drift, y - 8 + float, 1, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    },

    attack: {
        frames: 5,
        render: (ctx, x, y, frame = 0) => {
            const attackProgress = frame / 5;
            const lunge = attackProgress * 20;

            ctx.save();
            ctx.shadowBlur = 25;
            ctx.shadowColor = '#7c3aed';

            // Attacking lunge
            ctx.fillStyle = `rgba(88, 28, 135, ${0.9})`;
            ctx.beginPath();
            ctx.ellipse(x + lunge, y, 16, 24, Math.PI / 8, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#3b0764';
            ctx.beginPath();
            ctx.ellipse(x + lunge, y - 5, 13, 20, Math.PI / 8, 0, Math.PI * 2);
            ctx.fill();

            // Attack claws
            const clawReach = attackProgress * 15;

            for (let i = 0; i < 3; i++) {
                const clawAngle = -Math.PI / 4 + i * Math.PI / 6;
                ctx.strokeStyle = '#581c87';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(x + lunge, y);
                ctx.lineTo(
                    x + lunge + Math.cos(clawAngle) * (20 + clawReach),
                    y + Math.sin(clawAngle) * (20 + clawReach)
                );
                ctx.stroke();
            }

            // Angry eyes
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#ef4444';
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(x - 3 + lunge, y - 8, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 7 + lunge, y - 8, 4, 0, Math.PI * 2);
            ctx.fill();

            // Dark energy burst
            if (attackProgress > 0.5) {
                ctx.fillStyle = `rgba(124, 58, 237, ${(attackProgress - 0.5) * 2})`;
                ctx.beginPath();
                ctx.arc(x + lunge + 15, y, 10, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    },

    death: {
        frames: 8,
        render: (ctx, x, y, frame = 0) => {
            const deathProgress = frame / 8;
            const fadeAlpha = 1 - deathProgress;
            const dissolve = deathProgress * 30;

            ctx.save();
            ctx.globalAlpha = fadeAlpha;
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#7c3aed';

            // Dissolving body
            ctx.fillStyle = `rgba(88, 28, 135, ${0.7 * fadeAlpha})`;
            ctx.beginPath();
            ctx.ellipse(x, y + dissolve, 15 * (1 - deathProgress), 25, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#3b0764';
            ctx.beginPath();
            ctx.ellipse(x, y - 5 + dissolve, 12 * (1 - deathProgress), 18, 0, 0, Math.PI * 2);
            ctx.fill();

            // Eyes fading
            ctx.fillStyle = `rgba(239, 68, 68, ${fadeAlpha})`;
            ctx.beginPath();
            ctx.arc(x - 5, y - 8 + dissolve, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 5, y - 8 + dissolve, 2, 0, Math.PI * 2);
            ctx.fill();

            // Dispersing particles
            for (let i = 0; i < 15; i++) {
                const angle = (i / 15) * Math.PI * 2;
                const dist = deathProgress * 40 + i * 2;
                const px = x + Math.cos(angle) * dist;
                const py = y + Math.sin(angle) * dist;

                ctx.fillStyle = `rgba(124, 58, 237, ${fadeAlpha * (1 - i / 15)})`;
                ctx.beginPath();
                ctx.arc(px, py, 2 * (1 - deathProgress), 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    }
};

/**
 * CRYSTAL GOLEM ENEMY
 * Slow but powerful crystal creature
 */
const CrystalGolemAsset = {
    idle: {
        frames: 4,
        render: (ctx, x, y) => {
            const pulse = 0.9 + Math.sin(Date.now() / 500) * 0.1;

            ctx.save();
            ctx.shadowBlur = 25;
            ctx.shadowColor = '#06b6d4';

            // Large crystalline body
            ctx.fillStyle = '#0e7490';
            ctx.beginPath();
            // Draw angular crystal body
            ctx.moveTo(x, y - 25 * pulse);
            ctx.lineTo(x + 20, y - 10);
            ctx.lineTo(x + 18, y + 15);
            ctx.lineTo(x - 18, y + 15);
            ctx.lineTo(x - 20, y - 10);
            ctx.closePath();
            ctx.fill();

            // Inner crystal
            ctx.fillStyle = '#06b6d4';
            ctx.beginPath();
            ctx.moveTo(x, y - 20 * pulse);
            ctx.lineTo(x + 15, y - 8);
            ctx.lineTo(x + 13, y + 10);
            ctx.lineTo(x - 13, y + 10);
            ctx.lineTo(x - 15, y - 8);
            ctx.closePath();
            ctx.fill();

            // Bright core
            ctx.shadowBlur = 30;
            ctx.fillStyle = '#67e8f9';
            ctx.beginPath();
            ctx.moveTo(x, y - 15 * pulse);
            ctx.lineTo(x + 10, y - 5);
            ctx.lineTo(x + 8, y + 5);
            ctx.lineTo(x - 8, y + 5);
            ctx.lineTo(x - 10, y - 5);
            ctx.closePath();
            ctx.fill();

            // Crystal highlights
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(x - 5, y - 12);
            ctx.lineTo(x - 2, y - 15);
            ctx.lineTo(x, y - 10);
            ctx.closePath();
            ctx.fill();

            // Crystal arms
            ctx.fillStyle = '#0e7490';
            // Left arm
            ctx.beginPath();
            ctx.moveTo(x - 20, y - 5);
            ctx.lineTo(x - 30, y);
            ctx.lineTo(x - 28, y + 8);
            ctx.lineTo(x - 18, y + 3);
            ctx.closePath();
            ctx.fill();

            // Right arm
            ctx.beginPath();
            ctx.moveTo(x + 20, y - 5);
            ctx.lineTo(x + 30, y);
            ctx.lineTo(x + 28, y + 8);
            ctx.lineTo(x + 18, y + 3);
            ctx.closePath();
            ctx.fill();

            // Glowing runes on body
            const runeGlow = 0.5 + Math.sin(Date.now() / 300) * 0.5;
            ctx.fillStyle = `rgba(103, 232, 249, ${runeGlow})`;
            ctx.fillRect(x - 3, y - 5, 6, 2);
            ctx.fillRect(x - 3, y, 6, 2);
            ctx.fillRect(x - 3, y + 5, 6, 2);

            // Energy particles around golem
            for (let i = 0; i < 4; i++) {
                const angle = (Date.now() / 1000 + i * (Math.PI / 2)) % (Math.PI * 2);
                const radius = 35;
                const px = x + Math.cos(angle) * radius;
                const py = y + Math.sin(angle) * radius;

                ctx.shadowBlur = 10;
                ctx.fillStyle = `rgba(6, 182, 212, ${0.6})`;
                ctx.beginPath();
                ctx.arc(px, py, 2, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    },

    walk: {
        frames: 6,
        render: (ctx, x, y) => {
            const step = Math.sin(Date.now() / 200) * 2;
            const tilt = Math.sin(Date.now() / 200) * 0.05;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(tilt);
            ctx.shadowBlur = 25;
            ctx.shadowColor = '#06b6d4';

            // Body (slight bounce when walking)
            ctx.fillStyle = '#0e7490';
            ctx.beginPath();
            ctx.moveTo(0, -25 + step);
            ctx.lineTo(20, -10 + step);
            ctx.lineTo(18, 15);
            ctx.lineTo(-18, 15);
            ctx.lineTo(-20, -10 + step);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#06b6d4';
            ctx.beginPath();
            ctx.moveTo(0, -20 + step);
            ctx.lineTo(15, -8 + step);
            ctx.lineTo(13, 10);
            ctx.lineTo(-13, 10);
            ctx.lineTo(-15, -8 + step);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#67e8f9';
            ctx.beginPath();
            ctx.moveTo(0, -15 + step);
            ctx.lineTo(10, -5 + step);
            ctx.lineTo(8, 5);
            ctx.lineTo(-8, 5);
            ctx.lineTo(-10, -5 + step);
            ctx.closePath();
            ctx.fill();

            // Arms (swinging)
            const armSwing = Math.sin(Date.now() / 150) * 5;

            ctx.fillStyle = '#0e7490';
            // Left arm
            ctx.beginPath();
            ctx.moveTo(-20, -5 + armSwing);
            ctx.lineTo(-30, armSwing);
            ctx.lineTo(-28, 8 + armSwing);
            ctx.lineTo(-18, 3);
            ctx.closePath();
            ctx.fill();

            // Right arm
            ctx.beginPath();
            ctx.moveTo(20, -5 - armSwing);
            ctx.lineTo(30, -armSwing);
            ctx.lineTo(28, 8 - armSwing);
            ctx.lineTo(18, 3);
            ctx.closePath();
            ctx.fill();

            // Runes
            ctx.fillStyle = '#67e8f9';
            ctx.fillRect(-3, -5, 6, 2);
            ctx.fillRect(-3, 0, 6, 2);
            ctx.fillRect(-3, 5, 6, 2);

            ctx.restore();
        }
    },

    attack: {
        frames: 6,
        render: (ctx, x, y, frame = 0) => {
            const attackProgress = frame / 6;
            const smashDown = attackProgress < 0.5 ? attackProgress * 20 : (1 - attackProgress) * 20;

            ctx.save();
            ctx.shadowBlur = 30;
            ctx.shadowColor = '#06b6d4';

            // Body (leaning into attack)
            ctx.fillStyle = '#0e7490';
            ctx.beginPath();
            ctx.moveTo(x, y - 25 + smashDown);
            ctx.lineTo(x + 20, y - 10 + smashDown);
            ctx.lineTo(x + 18, y + 15);
            ctx.lineTo(x - 18, y + 15);
            ctx.lineTo(x - 20, y - 10 + smashDown);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#06b6d4';
            ctx.beginPath();
            ctx.moveTo(x, y - 20 + smashDown);
            ctx.lineTo(x + 15, y - 8 + smashDown);
            ctx.lineTo(x + 13, y + 10);
            ctx.lineTo(x - 13, y + 10);
            ctx.lineTo(x - 15, y - 8 + smashDown);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#67e8f9';
            ctx.beginPath();
            ctx.moveTo(x, y - 15 + smashDown);
            ctx.lineTo(x + 10, y - 5 + smashDown);
            ctx.lineTo(x + 8, y + 5);
            ctx.lineTo(x - 8, y + 5);
            ctx.lineTo(x - 10, y - 5 + smashDown);
            ctx.closePath();
            ctx.fill();

            // Raised fists
            const fistRaise = attackProgress < 0.5 ? -30 * attackProgress : -30 + (30 * (attackProgress - 0.5) * 2);

            ctx.fillStyle = '#0e7490';
            // Left fist
            ctx.beginPath();
            ctx.moveTo(x - 20, y - 5 + fistRaise);
            ctx.lineTo(x - 25, y + fistRaise);
            ctx.lineTo(x - 23, y + 10 + fistRaise);
            ctx.lineTo(x - 18, y + 5 + fistRaise);
            ctx.closePath();
            ctx.fill();

            // Right fist
            ctx.beginPath();
            ctx.moveTo(x + 20, y - 5 + fistRaise);
            ctx.lineTo(x + 25, y + fistRaise);
            ctx.lineTo(x + 23, y + 10 + fistRaise);
            ctx.lineTo(x + 18, y + 5 + fistRaise);
            ctx.closePath();
            ctx.fill();

            // Impact effect
            if (attackProgress > 0.5) {
                const impactAlpha = (attackProgress - 0.5) * 2;
                ctx.shadowBlur = 40;
                ctx.fillStyle = `rgba(103, 232, 249, ${0.5 * (1 - impactAlpha)})`;
                ctx.beginPath();
                ctx.arc(x, y + 20, 30 * impactAlpha, 0, Math.PI * 2);
                ctx.fill();

                // Shockwave lines
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    const lineLength = 20 * impactAlpha;
                    ctx.strokeStyle = `rgba(6, 182, 212, ${0.6 * (1 - impactAlpha)})`;
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(x, y + 20);
                    ctx.lineTo(
                        x + Math.cos(angle) * lineLength,
                        y + 20 + Math.sin(angle) * lineLength
                    );
                    ctx.stroke();
                }
            }

            ctx.restore();
        }
    },

    death: {
        frames: 10,
        render: (ctx, x, y, frame = 0) => {
            const deathProgress = frame / 10;
            const shatter = deathProgress * 50;
            const fadeAlpha = 1 - deathProgress;

            ctx.save();
            ctx.globalAlpha = fadeAlpha;
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#06b6d4';

            // Shattering crystal pieces
            const pieces = [
                { x: 0, y: -20, vx: 0, vy: -1 },
                { x: 15, y: -8, vx: 1, vy: -0.5 },
                { x: 13, y: 10, vx: 1, vy: 1 },
                { x: -13, y: 10, vx: -1, vy: 1 },
                { x: -15, y: -8, vx: -1, vy: -0.5 }
            ];

            pieces.forEach((piece, i) => {
                const px = x + piece.x + piece.vx * shatter;
                const py = y + piece.y + piece.vy * shatter;
                const rotation = deathProgress * Math.PI * 2 * (i % 2 === 0 ? 1 : -1);

                ctx.save();
                ctx.translate(px, py);
                ctx.rotate(rotation);

                ctx.fillStyle = i % 2 === 0 ? '#0e7490' : '#06b6d4';
                ctx.beginPath();
                ctx.moveTo(0, -8);
                ctx.lineTo(6, 0);
                ctx.lineTo(3, 8);
                ctx.lineTo(-3, 8);
                ctx.lineTo(-6, 0);
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            });

            // Crystal dust particles
            for (let i = 0; i < 20; i++) {
                const angle = (i / 20) * Math.PI * 2;
                const dist = deathProgress * 60;
                const px = x + Math.cos(angle) * dist;
                const py = y + Math.sin(angle) * dist;

                ctx.fillStyle = `rgba(103, 232, 249, ${fadeAlpha})`;
                ctx.beginPath();
                ctx.arc(px, py, 2, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    }
};

/**
 * VOID BEAST ENEMY
 * Fast, aggressive dark creature
 */
const VoidBeastAsset = {
    idle: {
        frames: 4,
        render: (ctx, x, y) => {
            const breathe = Math.sin(Date.now() / 250) * 2;

            ctx.save();
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#dc2626';

            // Beast body (quadruped)
            ctx.fillStyle = '#1f2937';
            ctx.beginPath();
            ctx.ellipse(x, y + breathe, 20, 15, 0, 0, Math.PI * 2);
            ctx.fill();

            // Back
            ctx.beginPath();
            ctx.ellipse(x - 8, y + 5 + breathe, 15, 12, 0, 0, Math.PI * 2);
            ctx.fill();

            // Head
            ctx.fillStyle = '#111827';
            ctx.beginPath();
            ctx.ellipse(x + 15, y - 5 + breathe, 12, 10, Math.PI / 6, 0, Math.PI * 2);
            ctx.fill();

            // Ears
            ctx.fillStyle = '#1f2937';
            ctx.beginPath();
            ctx.moveTo(x + 15, y - 12 + breathe);
            ctx.lineTo(x + 12, y - 18 + breathe);
            ctx.lineTo(x + 18, y - 10 + breathe);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(x + 20, y - 12 + breathe);
            ctx.lineTo(x + 17, y - 18 + breathe);
            ctx.lineTo(x + 23, y - 10 + breathe);
            ctx.closePath();
            ctx.fill();

            // Legs
            ctx.strokeStyle = '#1f2937';
            ctx.lineWidth = 4;

            // Front legs
            ctx.beginPath();
            ctx.moveTo(x + 10, y + 10 + breathe);
            ctx.lineTo(x + 10, y + 20);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x + 5, y + 10 + breathe);
            ctx.lineTo(x + 5, y + 20);
            ctx.stroke();

            // Back legs
            ctx.beginPath();
            ctx.moveTo(x - 10, y + 12 + breathe);
            ctx.lineTo(x - 10, y + 20);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x - 15, y + 12 + breathe);
            ctx.lineTo(x - 15, y + 20);
            ctx.stroke();

            // Glowing red eyes
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#dc2626';
            ctx.fillStyle = '#dc2626';
            ctx.beginPath();
            ctx.arc(x + 18, y - 7 + breathe, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 23, y - 6 + breathe, 2, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(x + 18, y - 7 + breathe, 0.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 23, y - 6 + breathe, 0.5, 0, Math.PI * 2);
            ctx.fill();

            // Tail
            const tailWag = Math.sin(Date.now() / 200) * 10;
            ctx.strokeStyle = '#1f2937';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(x - 18, y + breathe);
            ctx.quadraticCurveTo(x - 25, y - 5 + breathe, x - 30 + tailWag, y - 10 + breathe);
            ctx.stroke();

            // Smoke particles
            for (let i = 0; i < 3; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = 25 + Math.random() * 5;
                const px = x + Math.cos(angle + Date.now() / 1000) * dist;
                const py = y + breathe + Math.sin(angle + Date.now() / 1000) * dist;

                ctx.fillStyle = `rgba(31, 41, 55, ${0.3 + Math.random() * 0.2})`;
                ctx.beginPath();
                ctx.arc(px, py, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    },

    walk: {
        frames: 8,
        render: (ctx, x, y) => {
            const legCycle = Math.sin(Date.now() / 100) * 5;
            const bounce = Math.abs(Math.sin(Date.now() / 100)) * 3;

            ctx.save();
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#dc2626';

            // Running body (lower to ground)
            ctx.fillStyle = '#1f2937';
            ctx.beginPath();
            ctx.ellipse(x, y - bounce, 22, 14, Math.PI / 16, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#111827';
            ctx.beginPath();
            ctx.ellipse(x + 15, y - 8 - bounce, 12, 10, Math.PI / 8, 0, Math.PI * 2);
            ctx.fill();

            // Ears back (running)
            ctx.fillStyle = '#1f2937';
            ctx.beginPath();
            ctx.moveTo(x + 12, y - 14 - bounce);
            ctx.lineTo(x + 8, y - 16 - bounce);
            ctx.lineTo(x + 14, y - 10 - bounce);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(x + 18, y - 14 - bounce);
            ctx.lineTo(x + 14, y - 16 - bounce);
            ctx.lineTo(x + 20, y - 10 - bounce);
            ctx.closePath();
            ctx.fill();

            // Legs (galloping motion)
            ctx.strokeStyle = '#1f2937';
            ctx.lineWidth = 4;

            // Front legs (alternating)
            ctx.beginPath();
            ctx.moveTo(x + 10, y + 5 - bounce);
            ctx.lineTo(x + 10, y + 15 + legCycle);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x + 5, y + 5 - bounce);
            ctx.lineTo(x + 5, y + 15 - legCycle);
            ctx.stroke();

            // Back legs (alternating opposite)
            ctx.beginPath();
            ctx.moveTo(x - 10, y + 7 - bounce);
            ctx.lineTo(x - 10, y + 15 - legCycle);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x - 15, y + 7 - bounce);
            ctx.lineTo(x - 15, y + 15 + legCycle);
            ctx.stroke();

            // Eyes (focused)
            ctx.shadowBlur = 15;
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.ellipse(x + 18, y - 10 - bounce, 2.5, 3, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(x + 23, y - 9 - bounce, 2.5, 3, 0, 0, Math.PI * 2);
            ctx.fill();

            // Motion blur tail
            const tailBlur = Math.sin(Date.now() / 80) * 15;
            ctx.strokeStyle = `rgba(31, 41, 55, 0.6)`;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(x - 18, y - bounce);
            ctx.quadraticCurveTo(x - 25, y - 5 - bounce, x - 28 + tailBlur, y - 8 - bounce);
            ctx.stroke();

            ctx.restore();
        }
    },

    attack: {
        frames: 5,
        render: (ctx, x, y, frame = 0) => {
            const attackProgress = frame / 5;
            const lunge = attackProgress * 15;

            ctx.save();
            ctx.shadowBlur = 25;
            ctx.shadowColor = '#dc2626';

            // Body (lunging forward)
            ctx.fillStyle = '#1f2937';
            ctx.beginPath();
            ctx.ellipse(x + lunge, y, 22, 14, Math.PI / 8, 0, Math.PI * 2);
            ctx.fill();

            // Head (mouth open)
            ctx.fillStyle = '#111827';
            ctx.beginPath();
            ctx.ellipse(x + 17 + lunge, y - 6, 13, 11, Math.PI / 6, 0, Math.PI * 2);
            ctx.fill();

            // Open mouth
            if (attackProgress > 0.3) {
                const mouthOpen = (attackProgress - 0.3) * 15;

                ctx.fillStyle = '#7f1d1d';
                ctx.beginPath();
                ctx.arc(x + 22 + lunge, y - 3, mouthOpen / 2, 0, Math.PI);
                ctx.fill();

                // Teeth
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                for (let i = 0; i < 4; i++) {
                    ctx.beginPath();
                    ctx.moveTo(x + 18 + i * 2 + lunge, y - 3 - mouthOpen / 2);
                    ctx.lineTo(x + 18 + i * 2 + lunge, y - 3);
                    ctx.stroke();
                }
            }

            // Ears forward (aggressive)
            ctx.fillStyle = '#1f2937';
            ctx.beginPath();
            ctx.moveTo(x + 15 + lunge, y - 14);
            ctx.lineTo(x + 13 + lunge, y - 20);
            ctx.lineTo(x + 19 + lunge, y - 12);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(x + 22 + lunge, y - 14);
            ctx.lineTo(x + 20 + lunge, y - 20);
            ctx.lineTo(x + 26 + lunge, y - 12);
            ctx.closePath();
            ctx.fill();

            // Legs (pouncing)
            ctx.strokeStyle = '#1f2937';
            ctx.lineWidth = 4;

            const pounceHeight = attackProgress < 0.5 ? -attackProgress * 10 : -(1 - attackProgress) * 10;

            ctx.beginPath();
            ctx.moveTo(x + 10 + lunge, y + 5);
            ctx.lineTo(x + 12 + lunge, y + 20 + pounceHeight);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x + 5 + lunge, y + 5);
            ctx.lineTo(x + 7 + lunge, y + 20 + pounceHeight);
            ctx.stroke();

            // Eyes (fierce)
            ctx.shadowBlur = 20;
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(x + 19 + lunge, y - 8, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 24 + lunge, y - 7, 3, 0, Math.PI * 2);
            ctx.fill();

            // Energy burst from mouth
            if (attackProgress > 0.6) {
                const burstSize = (attackProgress - 0.6) * 30;
                ctx.fillStyle = `rgba(220, 38, 38, ${0.5})`;
                ctx.beginPath();
                ctx.arc(x + 25 + lunge, y - 3, burstSize, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    },

    death: {
        frames: 8,
        render: (ctx, x, y, frame = 0) => {
            const deathProgress = frame / 8;
            const fadeAlpha = 1 - deathProgress;
            const collapse = deathProgress * 15;

            ctx.save();
            ctx.globalAlpha = fadeAlpha;
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#dc2626';

            // Collapsing body
            ctx.fillStyle = '#1f2937';
            ctx.beginPath();
            ctx.ellipse(x, y + collapse, 20, 15 * (1 - deathProgress * 0.5), deathProgress * Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();

            // Head on ground
            ctx.fillStyle = '#111827';
            ctx.beginPath();
            ctx.ellipse(x + 15, y - 5 + collapse, 12 * (1 - deathProgress * 0.3), 10, 0, 0, Math.PI * 2);
            ctx.fill();

            // Eyes fading
            ctx.fillStyle = `rgba(220, 38, 38, ${fadeAlpha * 0.5})`;
            ctx.beginPath();
            ctx.arc(x + 18, y - 7 + collapse, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 23, y - 6 + collapse, 2, 0, Math.PI * 2);
            ctx.fill();

            // Dissipating smoke
            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2;
                const dist = deathProgress * 40;
                const px = x + Math.cos(angle) * dist;
                const py = y + Math.sin(angle) * dist - deathProgress * 20;

                ctx.fillStyle = `rgba(31, 41, 55, ${fadeAlpha * (1 - i / 12)})`;
                ctx.beginPath();
                ctx.arc(px, py, 3 * (1 - deathProgress), 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    }
};

/**
 * ENVIRONMENT ASSETS
 */
const EnvironmentAssets = {
    // Crystal formation
    crystal: (ctx, x, y, size = 1, hue = 270) => {
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsl(${hue}, 70%, 50%)`;

        ctx.fillStyle = `hsl(${hue}, 50%, 40%)`;
        ctx.beginPath();
        ctx.moveTo(x, y - 20 * size);
        ctx.lineTo(x + 8 * size, y - 5 * size);
        ctx.lineTo(x + 6 * size, y + 10 * size);
        ctx.lineTo(x - 6 * size, y + 10 * size);
        ctx.lineTo(x - 8 * size, y - 5 * size);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = `hsl(${hue}, 60%, 60%)`;
        ctx.beginPath();
        ctx.moveTo(x, y - 15 * size);
        ctx.lineTo(x + 5 * size, y - 3 * size);
        ctx.lineTo(x + 4 * size, y + 8 * size);
        ctx.lineTo(x - 4 * size, y + 8 * size);
        ctx.lineTo(x - 5 * size, y - 3 * size);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x - 1, y - 12 * size, 2 * size, 4 * size);

        ctx.restore();
    },

    // Glowing rune on ground
    rune: (ctx, x, y, time = Date.now()) => {
        const glow = 0.5 + Math.sin(time / 500) * 0.5;

        ctx.save();
        ctx.shadowBlur = 20 * glow;
        ctx.shadowColor = '#a78bfa';

        ctx.strokeStyle = `rgba(167, 139, 250, ${0.6 + glow * 0.4})`;
        ctx.lineWidth = 2;

        // Circle
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.stroke();

        // Inner pattern
        ctx.beginPath();
        ctx.moveTo(x, y - 10);
        ctx.lineTo(x, y + 10);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x - 10, y);
        ctx.lineTo(x + 10, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    },

    // Health/Mana potion drops
    healthPotion: (ctx, x, y) => {
        const bob = Math.sin(Date.now() / 300) * 2;

        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ef4444';

        // Bottle
        ctx.fillStyle = '#7f1d1d';
        ctx.fillRect(x - 6, y + bob - 8, 12, 16);

        // Liquid
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(x - 5, y + bob - 6, 10, 12);

        // Highlight
        ctx.fillStyle = '#fca5a5';
        ctx.fillRect(x - 3, y + bob - 5, 3, 6);

        // Cork
        ctx.fillStyle = '#78716c';
        ctx.fillRect(x - 4, y + bob - 10, 8, 3);

        ctx.restore();
    },

    manaPotion: (ctx, x, y) => {
        const bob = Math.sin(Date.now() / 300) * 2;

        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#3b82f6';

        // Bottle
        ctx.fillStyle = '#1e3a8a';
        ctx.fillRect(x - 6, y + bob - 8, 12, 16);

        // Liquid
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(x - 5, y + bob - 6, 10, 12);

        // Highlight
        ctx.fillStyle = '#93c5fd';
        ctx.fillRect(x - 3, y + bob - 5, 3, 6);

        // Cork
        ctx.fillStyle = '#78716c';
        ctx.fillRect(x - 4, y + bob - 10, 8, 3);

        ctx.restore();
    },

    // Gold/coins
    gold: (ctx, x, y) => {
        const spin = Math.sin(Date.now() / 200);

        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#fbbf24';

        // Coin (with perspective)
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.ellipse(x, y, 8, 8 * Math.abs(spin), 0, 0, Math.PI * 2);
        ctx.fill();

        // Inner detail
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.ellipse(x, y, 6, 6 * Math.abs(spin), 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    },

    // Particle effects
    sparkle: (ctx, x, y, color = '#ffffff', size = 1) => {
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;

        ctx.fillStyle = color;
        ctx.fillRect(x - size, y, size * 2, 1);
        ctx.fillRect(x, y - size, 1, size * 2);

        ctx.restore();
    },

    // Magic circle (casting)
    magicCircle: (ctx, x, y, radius, rotation = 0, alpha = 1) => {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#a78bfa';

        // Outer circle
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner circles
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.7, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.4, 0, Math.PI * 2);
        ctx.stroke();

        // Runes around circle
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const rx = Math.cos(angle) * radius * 0.85;
            const ry = Math.sin(angle) * radius * 0.85;

            ctx.fillStyle = '#c4b5fd';
            ctx.fillRect(rx - 2, ry - 2, 4, 4);
        }

        ctx.restore();
    }
};

// Export assets
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SpriteRenderer,
        AnimatedSprite,
        CrystalMageAsset,
        ShadowWraithAsset,
        CrystalGolemAsset,
        VoidBeastAsset,
        EnvironmentAssets
    };
}
