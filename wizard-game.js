// ========================================
// PROFESSIONAL WIZARD RPG - GAME ENGINE
// Asset-Based System with Professional Sprites
// ========================================

class SpriteRenderer {
    /**
     * Professional sprite rendering system
     * Draws pixel-perfect characters with animations
     */
    static drawWizard(ctx, x, y, scale, frame, state = 'idle') {
        const s = scale;
        ctx.save();
        ctx.translate(x, y);

        // Wizard body structure
        const colors = {
            skin: '#f5deb3',
            robe: '#8b3dff',
            robeLight: '#b57eff',
            robeDark: '#6b1fff',
            hat: '#4a148c',
            hatBand: '#ffd700',
            staff: '#8b4513',
            staffOrb: '#00ffff',
            beard: '#f0f0f0',
            shadow: 'rgba(0, 0, 0, 0.3)'
        };

        // Animation offset
        const bobOffset = state === 'walk' ? Math.sin(frame * 0.3) * 2 : 0;

        // Shadow
        ctx.fillStyle = colors.shadow;
        ctx.beginPath();
        ctx.ellipse(0, s * 12, s * 8, s * 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Robe (body)
        ctx.fillStyle = colors.robe;
        ctx.beginPath();
        ctx.moveTo(-s * 5, bobOffset - s * 2);
        ctx.lineTo(-s * 7, bobOffset + s * 10);
        ctx.lineTo(s * 7, bobOffset + s * 10);
        ctx.lineTo(s * 5, bobOffset - s * 2);
        ctx.closePath();
        ctx.fill();

        // Robe highlights
        ctx.fillStyle = colors.robeLight;
        ctx.fillRect(-s * 4, bobOffset - s * 2, s * 3, s * 8);

        // Robe shadows
        ctx.fillStyle = colors.robeDark;
        ctx.fillRect(s * 2, bobOffset, s * 2, s * 8);

        // Belt
        ctx.fillStyle = colors.hatBand;
        ctx.fillRect(-s * 5, bobOffset + s * 2, s * 10, s * 1.5);

        // Arms (staff holding)
        if (state === 'cast') {
            // Casting pose - arms raised
            ctx.fillStyle = colors.robe;
            // Left arm
            ctx.fillRect(-s * 8, bobOffset - s * 6, s * 3, s * 8);
            // Right arm
            ctx.fillRect(s * 5, bobOffset - s * 6, s * 3, s * 8);
        } else {
            // Normal pose
            ctx.fillStyle = colors.robe;
            // Left arm
            ctx.fillRect(-s * 7, bobOffset, s * 2, s * 6);
            // Right arm with staff
            ctx.fillRect(s * 5, bobOffset - s * 2, s * 2, s * 8);
        }

        // Staff
        ctx.strokeStyle = colors.staff;
        ctx.lineWidth = s * 1.5;
        ctx.beginPath();
        ctx.moveTo(s * 6, bobOffset - s * 2);
        ctx.lineTo(s * 6, bobOffset - s * 14);
        ctx.stroke();

        // Staff orb (glowing)
        const orbGlow = Math.sin(frame * 0.15) * 2 + 6;
        ctx.shadowBlur = orbGlow;
        ctx.shadowColor = colors.staffOrb;
        ctx.fillStyle = colors.staffOrb;
        ctx.beginPath();
        ctx.arc(s * 6, bobOffset - s * 14, s * 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Head
        ctx.fillStyle = colors.skin;
        ctx.beginPath();
        ctx.arc(0, bobOffset - s * 6, s * 4, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#000';
        ctx.fillRect(-s * 2, bobOffset - s * 7, s * 1.5, s * 1.5);
        ctx.fillRect(s * 0.5, bobOffset - s * 7, s * 1.5, s * 1.5);

        // Eye glow when casting
        if (state === 'cast') {
            ctx.fillStyle = '#00ffff';
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#00ffff';
            ctx.fillRect(-s * 2, bobOffset - s * 7, s * 1.5, s * 1.5);
            ctx.fillRect(s * 0.5, bobOffset - s * 7, s * 1.5, s * 1.5);
            ctx.shadowBlur = 0;
        }

        // Beard
        ctx.fillStyle = colors.beard;
        ctx.beginPath();
        ctx.moveTo(-s * 3, bobOffset - s * 4);
        ctx.lineTo(-s * 4, bobOffset);
        ctx.lineTo(s * 4, bobOffset);
        ctx.lineTo(s * 3, bobOffset - s * 4);
        ctx.closePath();
        ctx.fill();

        // Wizard hat
        ctx.fillStyle = colors.hat;
        ctx.beginPath();
        ctx.moveTo(-s * 4.5, bobOffset - s * 8);
        ctx.lineTo(0, bobOffset - s * 18);
        ctx.lineTo(s * 4.5, bobOffset - s * 8);
        ctx.closePath();
        ctx.fill();

        // Hat band
        ctx.fillStyle = colors.hatBand;
        ctx.fillRect(-s * 5, bobOffset - s * 9, s * 10, s * 2);

        // Hat star decoration
        this.drawStar(ctx, s * 0, bobOffset - s * 13, s * 1.5, colors.hatBand);

        ctx.restore();
    }

    static drawGoblin(ctx, x, y, scale, frame) {
        const s = scale;
        ctx.save();
        ctx.translate(x, y);

        const colors = {
            skin: '#8bc34a',
            skinDark: '#689f38',
            eyes: '#ff0000',
            teeth: '#ffffff',
            cloth: '#5d4037',
            weapon: '#9e9e9e'
        };

        const bobOffset = Math.sin(frame * 0.2) * 1.5;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, s * 8, s * 6, s * 1.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body
        ctx.fillStyle = colors.skin;
        ctx.fillRect(-s * 4, bobOffset, s * 8, s * 7);

        // Darker skin shading
        ctx.fillStyle = colors.skinDark;
        ctx.fillRect(s * 1, bobOffset, s * 3, s * 7);

        // Cloth/armor
        ctx.fillStyle = colors.cloth;
        ctx.fillRect(-s * 3.5, bobOffset + s * 1, s * 7, s * 4);

        // Arms
        ctx.fillStyle = colors.skin;
        ctx.fillRect(-s * 6, bobOffset + s * 1, s * 2, s * 5);
        ctx.fillRect(s * 4, bobOffset + s * 1, s * 2, s * 5);

        // Weapon (dagger)
        ctx.fillStyle = colors.weapon;
        ctx.fillRect(s * 5, bobOffset + s * 4, s * 1, s * 6);
        ctx.fillStyle = colors.cloth;
        ctx.fillRect(s * 4.5, bobOffset + s * 9, s * 2, s * 1.5);

        // Head
        ctx.fillStyle = colors.skin;
        ctx.beginPath();
        ctx.arc(0, bobOffset - s * 3, s * 4, 0, Math.PI * 2);
        ctx.fill();

        // Large ears
        ctx.fillStyle = colors.skinDark;
        ctx.beginPath();
        ctx.arc(-s * 4, bobOffset - s * 3, s * 2, 0, Math.PI * 2);
        ctx.arc(s * 4, bobOffset - s * 3, s * 2, 0, Math.PI * 2);
        ctx.fill();

        // Evil eyes
        ctx.fillStyle = colors.eyes;
        ctx.shadowBlur = 3;
        ctx.shadowColor = colors.eyes;
        ctx.fillRect(-s * 2, bobOffset - s * 4, s * 1.5, s * 2);
        ctx.fillRect(s * 0.5, bobOffset - s * 4, s * 1.5, s * 2);
        ctx.shadowBlur = 0;

        // Teeth
        ctx.fillStyle = colors.teeth;
        for (let i = 0; i < 3; i++) {
            ctx.fillRect(-s * 2 + i * s * 1.5, bobOffset - s * 1, s * 1, s * 1.5);
        }

        ctx.restore();
    }

    static drawSkeleton(ctx, x, y, scale, frame) {
        const s = scale;
        ctx.save();
        ctx.translate(x, y);

        const colors = {
            bone: '#e0e0e0',
            boneDark: '#9e9e9e',
            eyes: '#00ff00',
            weapon: '#616161'
        };

        const bobOffset = Math.sin(frame * 0.25) * 2;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, s * 10, s * 5, s * 1.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Ribcage
        ctx.strokeStyle = colors.bone;
        ctx.lineWidth = s * 1.5;
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.arc(0, bobOffset + i * s * 2, s * 3, 0, Math.PI);
            ctx.stroke();
        }

        // Spine
        ctx.fillStyle = colors.bone;
        ctx.fillRect(-s * 0.5, bobOffset, s * 1, s * 8);

        // Arms (bones)
        ctx.fillStyle = colors.bone;
        ctx.fillRect(-s * 6, bobOffset + s * 1, s * 1.5, s * 6);
        ctx.fillRect(s * 4.5, bobOffset + s * 1, s * 1.5, s * 6);

        // Sword
        ctx.fillStyle = colors.weapon;
        ctx.fillRect(s * 5, bobOffset + s * 5, s * 1, s * 8);
        ctx.fillRect(s * 3.5, bobOffset + s * 5, s * 4, s * 1);

        // Skull
        ctx.fillStyle = colors.bone;
        ctx.fillRect(-s * 3.5, bobOffset - s * 7, s * 7, s * 6);
        ctx.fillStyle = colors.boneDark;
        ctx.fillRect(-s * 3, bobOffset - s * 7.5, s * 6, s * 1);

        // Eye sockets (glowing)
        ctx.fillStyle = '#000';
        ctx.fillRect(-s * 2.5, bobOffset - s * 6, s * 2, s * 2.5);
        ctx.fillRect(s * 0.5, bobOffset - s * 6, s * 2, s * 2.5);

        ctx.fillStyle = colors.eyes;
        ctx.shadowBlur = 5;
        ctx.shadowColor = colors.eyes;
        ctx.fillRect(-s * 2, bobOffset - s * 5.5, s * 1, s * 1.5);
        ctx.fillRect(s * 1, bobOffset - s * 5.5, s * 1, s * 1.5);
        ctx.shadowBlur = 0;

        // Nose hole
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.moveTo(-s * 0.5, bobOffset - s * 4);
        ctx.lineTo(s * 0.5, bobOffset - s * 4);
        ctx.lineTo(0, bobOffset - s * 2.5);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    static drawDragon(ctx, x, y, scale, frame) {
        const s = scale;
        ctx.save();
        ctx.translate(x, y);

        const colors = {
            scale: '#8b0000',
            scaleDark: '#5c0000',
            belly: '#ff6b6b',
            eyes: '#ffd700',
            horn: '#2c2c2c',
            fire: '#ff4500'
        };

        const breathOffset = Math.sin(frame * 0.1) * 3;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.ellipse(0, s * 15, s * 12, s * 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Tail
        ctx.strokeStyle = colors.scale;
        ctx.lineWidth = s * 3;
        ctx.beginPath();
        ctx.moveTo(s * 8, s * 5);
        ctx.quadraticCurveTo(s * 15, s * 3, s * 18, s * 8);
        ctx.stroke();

        // Tail spikes
        ctx.fillStyle = colors.scaleDark;
        for (let i = 0; i < 3; i++) {
            const tx = s * (10 + i * 3);
            const ty = s * (4 + i * 1.5);
            this.drawTriangle(ctx, tx, ty, s * 2, colors.scaleDark);
        }

        // Body
        ctx.fillStyle = colors.scale;
        ctx.beginPath();
        ctx.ellipse(0, breathOffset, s * 10, s * 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Belly
        ctx.fillStyle = colors.belly;
        ctx.beginPath();
        ctx.ellipse(0, breathOffset + s * 2, s * 7, s * 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Scales texture
        ctx.fillStyle = colors.scaleDark;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {
                ctx.beginPath();
                ctx.arc(-s * 6 + i * s * 3, breathOffset - s * 4 + j * s * 3, s * 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Legs
        ctx.fillStyle = colors.scale;
        // Front legs
        ctx.fillRect(-s * 7, breathOffset + s * 6, s * 3, s * 6);
        ctx.fillRect(s * 4, breathOffset + s * 6, s * 3, s * 6);
        // Back legs
        ctx.fillRect(-s * 4, breathOffset + s * 6, s * 3, s * 7);
        ctx.fillRect(s * 1, breathOffset + s * 6, s * 3, s * 7);

        // Wings
        ctx.fillStyle = 'rgba(139, 0, 0, 0.7)';
        ctx.beginPath();
        // Left wing
        ctx.moveTo(-s * 5, breathOffset - s * 2);
        ctx.lineTo(-s * 18, breathOffset - s * 8);
        ctx.lineTo(-s * 15, breathOffset + s * 4);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        // Right wing
        ctx.moveTo(s * 5, breathOffset - s * 2);
        ctx.lineTo(s * 18, breathOffset - s * 8);
        ctx.lineTo(s * 15, breathOffset + s * 4);
        ctx.closePath();
        ctx.fill();

        // Wing bones
        ctx.strokeStyle = colors.scaleDark;
        ctx.lineWidth = s * 1;
        ctx.beginPath();
        ctx.moveTo(-s * 5, breathOffset - s * 2);
        ctx.lineTo(-s * 18, breathOffset - s * 8);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(s * 5, breathOffset - s * 2);
        ctx.lineTo(s * 18, breathOffset - s * 8);
        ctx.stroke();

        // Head
        ctx.fillStyle = colors.scale;
        ctx.beginPath();
        ctx.ellipse(-s * 8, breathOffset - s * 6, s * 5, s * 4, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Snout
        ctx.fillStyle = colors.scaleDark;
        ctx.fillRect(-s * 15, breathOffset - s * 7, s * 5, s * 3);

        // Horns
        ctx.fillStyle = colors.horn;
        this.drawTriangle(ctx, -s * 10, breathOffset - s * 10, s * 3, colors.horn);
        this.drawTriangle(ctx, -s * 6, breathOffset - s * 10, s * 3, colors.horn);

        // Eye
        ctx.fillStyle = colors.eyes;
        ctx.shadowBlur = 8;
        ctx.shadowColor = colors.eyes;
        ctx.beginPath();
        ctx.arc(-s * 9, breathOffset - s * 7, s * 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Pupil
        ctx.fillStyle = '#000';
        ctx.fillRect(-s * 9.5, breathOffset - s * 7.5, s * 1, s * 2);

        // Fire breath effect
        if (frame % 100 < 30) {
            const fireParticles = 8;
            for (let i = 0; i < fireParticles; i++) {
                const angle = -0.3 + (Math.random() - 0.5) * 0.5;
                const dist = s * (10 + Math.random() * 15);
                const px = -s * 15 + Math.cos(angle) * dist;
                const py = breathOffset - s * 6 + Math.sin(angle) * dist;
                const size = s * (1 + Math.random() * 2);

                ctx.fillStyle = i % 2 === 0 ? '#ff4500' : '#ffd700';
                ctx.shadowBlur = 10;
                ctx.shadowColor = ctx.fillStyle;
                ctx.beginPath();
                ctx.arc(px, py, size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.shadowBlur = 0;
        }

        ctx.restore();
    }

    static drawStar(ctx, x, y, size, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = color;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const x = Math.cos(angle) * size;
            const y = Math.sin(angle) * size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    static drawTriangle(ctx, x, y, size, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x - size / 2, y + size / 2);
        ctx.lineTo(x + size / 2, y + size / 2);
        ctx.closePath();
        ctx.fill();
    }
}

// Particle System for spell effects
class Particle {
    constructor(x, y, type, target = null) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.life = 1.0;
        this.target = target;

        switch(type) {
            case 'fireball':
                this.vx = target ? (target.x - x) / 30 : 0;
                this.vy = target ? (target.y - y) / 30 : 0;
                this.size = 8;
                this.color = '#ff4500';
                this.trail = [];
                break;
            case 'lightning':
                this.vx = 0;
                this.vy = 0;
                this.segments = this.createLightningPath(x, y, target.x, target.y);
                this.life = 0.3;
                break;
            case 'frost':
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = Math.random() * -3;
                this.size = 4 + Math.random() * 4;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.2;
                break;
            case 'heal':
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = -2 - Math.random() * 2;
                this.size = 3 + Math.random() * 3;
                break;
            case 'explosion':
                const angle = Math.random() * Math.PI * 2;
                const speed = 2 + Math.random() * 3;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                this.size = 3 + Math.random() * 5;
                this.color = ['#ff4500', '#ffd700', '#ff6b00'][Math.floor(Math.random() * 3)];
                break;
        }
    }

    createLightningPath(x1, y1, x2, y2) {
        const segments = [];
        const steps = 12;
        const spread = 15;

        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = x1 + (x2 - x1) * t + (Math.random() - 0.5) * spread;
            const y = y1 + (y2 - y1) * t + (Math.random() - 0.5) * spread;
            segments.push({x, y});
        }

        return segments;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.02;

        if (this.type === 'fireball') {
            this.trail.push({x: this.x, y: this.y, life: 1.0});
            this.trail = this.trail.filter(t => {
                t.life -= 0.05;
                return t.life > 0;
            });
        }

        if (this.type === 'frost') {
            this.rotation += this.rotationSpeed;
            this.vy += 0.1; // gravity
        }

        if (this.type === 'heal') {
            this.vy -= 0.05; // float up faster
        }

        if (this.type === 'explosion') {
            this.vx *= 0.95;
            this.vy *= 0.95;
            this.size *= 0.97;
        }

        return this.life > 0;
    }

    draw(ctx) {
        ctx.save();

        switch(this.type) {
            case 'fireball':
                // Draw trail
                this.trail.forEach(t => {
                    ctx.fillStyle = `rgba(255, 69, 0, ${t.life * 0.5})`;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = '#ff4500';
                    ctx.beginPath();
                    ctx.arc(t.x, t.y, this.size * 0.6, 0, Math.PI * 2);
                    ctx.fill();
                });

                // Draw fireball
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 20;
                ctx.shadowColor = '#ff4500';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                // Inner core
                ctx.fillStyle = '#ffd700';
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#ffd700';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
                ctx.fill();
                break;

            case 'lightning':
                ctx.strokeStyle = '#00ffff';
                ctx.lineWidth = 3;
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#00ffff';
                ctx.globalAlpha = this.life;

                ctx.beginPath();
                this.segments.forEach((seg, i) => {
                    if (i === 0) ctx.moveTo(seg.x, seg.y);
                    else ctx.lineTo(seg.x, seg.y);
                });
                ctx.stroke();

                // Secondary bolts
                ctx.lineWidth = 1.5;
                ctx.strokeStyle = '#ffffff';
                ctx.beginPath();
                this.segments.forEach((seg, i) => {
                    if (i === 0) ctx.moveTo(seg.x, seg.y);
                    else ctx.lineTo(seg.x, seg.y);
                });
                ctx.stroke();
                break;

            case 'frost':
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.globalAlpha = this.life;

                // Snowflake
                ctx.strokeStyle = '#4dd0e1';
                ctx.lineWidth = 2;
                ctx.shadowBlur = 5;
                ctx.shadowColor = '#4dd0e1';

                for (let i = 0; i < 6; i++) {
                    ctx.rotate(Math.PI / 3);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(0, -this.size);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(0, -this.size * 0.6);
                    ctx.lineTo(-this.size * 0.3, -this.size * 0.8);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(0, -this.size * 0.6);
                    ctx.lineTo(this.size * 0.3, -this.size * 0.8);
                    ctx.stroke();
                }
                break;

            case 'heal':
                ctx.globalAlpha = this.life;
                ctx.fillStyle = '#4ade80';
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#4ade80';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                // Plus sign
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(this.x - this.size * 0.6, this.y - this.size * 0.2, this.size * 1.2, this.size * 0.4);
                ctx.fillRect(this.x - this.size * 0.2, this.y - this.size * 0.6, this.size * 0.4, this.size * 1.2);
                break;

            case 'explosion':
                ctx.globalAlpha = this.life;
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 15;
                ctx.shadowColor = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                break;
        }

        ctx.restore();
    }
}

// Main Game Class
class WizardGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Game state
        this.frame = 0;
        this.player = this.createPlayer();
        this.enemies = [];
        this.particles = [];
        this.damageNumbers = [];

        // Skills
        this.skills = [
            { name: 'Fireball', icon: '🔥', damage: 35, mpCost: 15, cooldown: 2000, cooldownRemaining: 0, type: 'fireball' },
            { name: 'Lightning', icon: '⚡', damage: 50, mpCost: 25, cooldown: 4000, cooldownRemaining: 0, type: 'lightning' },
            { name: 'Frost Nova', icon: '❄️', damage: 30, mpCost: 20, cooldown: 3000, cooldownRemaining: 0, type: 'frost', aoe: true },
            { name: 'Heal', icon: '💚', heal: 50, mpCost: 30, cooldown: 5000, cooldownRemaining: 0, type: 'heal' }
        ];

        // Controls
        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        this.setupControls();
        this.spawnEnemies();

        // Hide loading screen
        setTimeout(() => {
            document.getElementById('loading').classList.add('hidden');
            this.gameLoop();
        }, 1000);
    }

    createPlayer() {
        return {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            hp: 100,
            maxHP: 100,
            mp: 150,
            maxMP: 150,
            level: 1,
            xp: 0,
            xpToLevel: 100,
            speed: 4,
            state: 'idle', // idle, walk, cast
            direction: 1 // 1 = right, -1 = left
        };
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupControls() {
        // Keyboard
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;

            if (e.key.toLowerCase() === 'q') this.useSkill(0);
            if (e.key.toLowerCase() === 'w') this.useSkill(1);
            if (e.key.toLowerCase() === 'e') this.useSkill(2);
            if (e.key.toLowerCase() === 'r') this.useSkill(3);
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        // Joystick
        const joystick = document.getElementById('joystick');
        const stick = document.getElementById('joystickStick');

        const handleStart = (e) => {
            e.preventDefault();
            this.joystickActive = true;
        };

        const handleMove = (e) => {
            if (!this.joystickActive) return;
            e.preventDefault();

            const touch = e.touches ? e.touches[0] : e;
            const rect = joystick.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = touch.clientX - centerX;
            const deltaY = touch.clientY - centerY;

            const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 40);
            this.joystickAngle = Math.atan2(deltaY, deltaX);
            this.joystickPower = distance / 40;

            const stickX = Math.cos(this.joystickAngle) * distance;
            const stickY = Math.sin(this.joystickAngle) * distance;

            stick.style.transform = `translate(calc(-50% + ${stickX}px), calc(-50% + ${stickY}px))`;
        };

        const handleEnd = (e) => {
            e.preventDefault();
            this.joystickActive = false;
            this.joystickPower = 0;
            stick.style.transform = 'translate(-50%, -50%)';
        };

        joystick.addEventListener('touchstart', handleStart);
        joystick.addEventListener('touchmove', handleMove);
        joystick.addEventListener('touchend', handleEnd);

        joystick.addEventListener('mousedown', handleStart);
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
    }

    spawnEnemies() {
        const enemyTypes = ['goblin', 'skeleton', 'dragon'];
        const count = 3 + Math.floor(this.player.level / 3);

        for (let i = 0; i < count; i++) {
            const type = enemyTypes[Math.min(Math.floor(this.player.level / 2), enemyTypes.length - 1)];
            const randomType = enemyTypes[Math.floor(Math.random() * Math.min(enemyTypes.length, 1 + Math.floor(this.player.level / 2)))];

            const margin = 150;
            const x = Math.random() < 0.5
                ? Math.random() * margin
                : this.canvas.width - Math.random() * margin;
            const y = Math.random() < 0.5
                ? Math.random() * margin
                : this.canvas.height - Math.random() * margin;

            const enemyData = {
                goblin: { hp: 60, maxHP: 60, damage: 10, xp: 30, speed: 1.5, size: 1.2 },
                skeleton: { hp: 80, maxHP: 80, damage: 15, xp: 50, speed: 1.2, size: 1.3 },
                dragon: { hp: 200, maxHP: 200, damage: 30, xp: 150, speed: 0.8, size: 1.8 }
            };

            const data = enemyData[randomType];

            this.enemies.push({
                type: randomType,
                x, y,
                ...data,
                attackCooldown: 0
            });
        }
    }

    useSkill(index) {
        const skill = this.skills[index];

        if (skill.cooldownRemaining > 0) return;
        if (this.player.mp < skill.mpCost) {
            this.showNotification('⚠️ Not enough MP!');
            return;
        }

        this.player.mp -= skill.mpCost;
        skill.cooldownRemaining = skill.cooldown;
        this.player.state = 'cast';

        setTimeout(() => {
            this.player.state = 'idle';
        }, 500);

        // Execute skill
        if (skill.type === 'heal') {
            this.player.hp = Math.min(this.player.maxHP, this.player.hp + skill.heal);
            for (let i = 0; i < 20; i++) {
                this.particles.push(new Particle(
                    this.player.x + (Math.random() - 0.5) * 40,
                    this.player.y + (Math.random() - 0.5) * 40,
                    'heal'
                ));
            }
            this.showNotification('💚 +' + skill.heal + ' HP');
        } else if (skill.type === 'frost' && skill.aoe) {
            // AOE attack
            this.enemies.forEach(enemy => {
                const dist = this.getDistance(this.player, enemy);
                if (dist < 200) {
                    this.damageEnemy(enemy, skill.damage);
                }
            });

            // Frost particles
            for (let i = 0; i < 40; i++) {
                this.particles.push(new Particle(
                    this.player.x,
                    this.player.y,
                    'frost'
                ));
            }
        } else {
            // Targeted attack
            const target = this.findNearestEnemy();
            if (target) {
                if (skill.type === 'lightning') {
                    this.particles.push(new Particle(this.player.x, this.player.y - 30, 'lightning', target));
                    this.damageEnemy(target, skill.damage);
                } else if (skill.type === 'fireball') {
                    this.particles.push(new Particle(this.player.x, this.player.y - 30, 'fireball', target));
                    setTimeout(() => {
                        if (this.enemies.includes(target)) {
                            this.damageEnemy(target, skill.damage);
                            for (let i = 0; i < 15; i++) {
                                this.particles.push(new Particle(target.x, target.y, 'explosion'));
                            }
                        }
                    }, 500);
                }
            }
        }

        this.updateHUD();
        this.updateSkillUI(index);
    }

    updateSkillUI(index) {
        const skillSlots = document.querySelectorAll('.skill-slot');
        const slot = skillSlots[index];
        const skill = this.skills[index];

        slot.classList.add('cooldown');

        const cooldownDiv = document.createElement('div');
        cooldownDiv.className = 'skill-cooldown';
        cooldownDiv.textContent = Math.ceil(skill.cooldownRemaining / 1000);
        slot.appendChild(cooldownDiv);

        const interval = setInterval(() => {
            const remaining = Math.ceil(skill.cooldownRemaining / 1000);
            cooldownDiv.textContent = remaining;

            if (remaining <= 0) {
                slot.classList.remove('cooldown');
                cooldownDiv.remove();
                clearInterval(interval);
            }
        }, 100);
    }

    findNearestEnemy() {
        let nearest = null;
        let minDist = Infinity;

        this.enemies.forEach(enemy => {
            const dist = this.getDistance(this.player, enemy);
            if (dist < minDist) {
                minDist = dist;
                nearest = enemy;
            }
        });

        return nearest;
    }

    getDistance(a, b) {
        return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }

    damageEnemy(enemy, damage) {
        enemy.hp -= damage;
        this.showDamage(enemy.x, enemy.y - 40, damage, '#ff4444');

        if (enemy.hp <= 0) {
            const index = this.enemies.indexOf(enemy);
            if (index > -1) {
                this.enemies.splice(index, 1);
            }

            // XP
            this.player.xp += enemy.xp;
            if (this.player.xp >= this.player.xpToLevel) {
                this.levelUp();
            }

            // Respawn
            setTimeout(() => {
                if (this.enemies.length < 8) {
                    this.spawnEnemies();
                }
            }, 3000);
        }

        this.updateHUD();
    }

    levelUp() {
        this.player.level++;
        this.player.xp = 0;
        this.player.xpToLevel = Math.floor(this.player.xpToLevel * 1.5);

        this.player.maxHP += 20;
        this.player.hp = this.player.maxHP;
        this.player.maxMP += 15;
        this.player.mp = this.player.maxMP;

        this.showNotification('⭐ LEVEL UP! Level ' + this.player.level);

        // Level up particles
        for (let i = 0; i < 50; i++) {
            const angle = (Math.PI * 2 * i) / 50;
            this.particles.push(new Particle(
                this.player.x + Math.cos(angle) * 30,
                this.player.y + Math.sin(angle) * 30,
                'heal'
            ));
        }

        this.updateHUD();
    }

    showDamage(x, y, amount, color) {
        const elem = document.createElement('div');
        elem.className = 'damage-number';
        elem.textContent = '-' + amount;
        elem.style.left = x + 'px';
        elem.style.top = y + 'px';
        elem.style.color = color;
        document.body.appendChild(elem);

        setTimeout(() => elem.remove(), 1200);
    }

    showNotification(text) {
        const notif = document.getElementById('notification');
        notif.textContent = text;
        notif.style.display = 'block';

        setTimeout(() => {
            notif.style.display = 'none';
        }, 2000);
    }

    updateHUD() {
        const hpPercent = (this.player.hp / this.player.maxHP) * 100;
        const mpPercent = (this.player.mp / this.player.maxMP) * 100;
        const xpPercent = (this.player.xp / this.player.xpToLevel) * 100;

        document.getElementById('hpBar').style.width = hpPercent + '%';
        document.getElementById('mpBar').style.width = mpPercent + '%';
        document.getElementById('xpBar').style.width = xpPercent + '%';

        document.getElementById('hpText').textContent = `HP: ${Math.floor(this.player.hp)}/${this.player.maxHP}`;
        document.getElementById('mpText').textContent = `MP: ${Math.floor(this.player.mp)}/${this.player.maxMP}`;
        document.getElementById('xpText').textContent = `XP: ${this.player.xp}/${this.player.xpToLevel}`;
        document.getElementById('levelBadge').textContent = `LVL ${this.player.level}`;
    }

    update() {
        this.frame++;

        // Player movement
        let dx = 0, dy = 0;

        if (this.keys['arrowleft'] || this.keys['a']) dx -= 1;
        if (this.keys['arrowright'] || this.keys['d']) dx += 1;
        if (this.keys['arrowup'] || this.keys['w']) dy -= 1;
        if (this.keys['arrowdown'] || this.keys['s']) dy += 1;

        if (this.joystickActive) {
            dx = Math.cos(this.joystickAngle) * this.joystickPower;
            dy = Math.sin(this.joystickAngle) * this.joystickPower;
        }

        if (dx !== 0 || dy !== 0) {
            const magnitude = Math.sqrt(dx * dx + dy * dy);
            dx = (dx / magnitude) * this.player.speed;
            dy = (dy / magnitude) * this.player.speed;

            this.player.x = Math.max(50, Math.min(this.canvas.width - 50, this.player.x + dx));
            this.player.y = Math.max(50, Math.min(this.canvas.height - 50, this.player.y + dy));

            if (this.player.state !== 'cast') {
                this.player.state = 'walk';
            }

            if (dx !== 0) {
                this.player.direction = dx > 0 ? 1 : -1;
            }
        } else if (this.player.state === 'walk') {
            this.player.state = 'idle';
        }

        // Update enemies
        this.enemies.forEach(enemy => {
            const dist = this.getDistance(this.player, enemy);

            if (dist < 500) {
                const angle = Math.atan2(this.player.y - enemy.y, this.player.x - enemy.x);
                enemy.x += Math.cos(angle) * enemy.speed;
                enemy.y += Math.sin(angle) * enemy.speed;

                // Attack player
                if (dist < 60) {
                    if (enemy.attackCooldown <= 0) {
                        this.player.hp -= enemy.damage;
                        this.showDamage(this.player.x, this.player.y - 40, enemy.damage, '#ff6b6b');
                        enemy.attackCooldown = 1500;

                        if (this.player.hp <= 0) {
                            this.gameOver();
                        }

                        this.updateHUD();
                    }
                }
            }

            if (enemy.attackCooldown > 0) {
                enemy.attackCooldown -= 16;
            }
        });

        // Update particles
        this.particles = this.particles.filter(p => p.update());

        // Update skill cooldowns
        this.skills.forEach(skill => {
            if (skill.cooldownRemaining > 0) {
                skill.cooldownRemaining -= 16;
            }
        });

        // MP regeneration
        if (this.player.mp < this.player.maxMP) {
            this.player.mp = Math.min(this.player.maxMP, this.player.mp + 0.15);
            if (this.frame % 60 === 0) this.updateHUD();
        }
    }

    draw() {
        // Background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#0a0612');
        gradient.addColorStop(1, '#1a0f2e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Grid
        this.ctx.strokeStyle = 'rgba(147, 51, 234, 0.1)';
        this.ctx.lineWidth = 1;
        for (let x = 0; x < this.canvas.width; x += 60) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.canvas.height; y += 60) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        // Stars
        for (let i = 0; i < 100; i++) {
            const x = (i * 137.5) % this.canvas.width;
            const y = (i * 215.3) % this.canvas.height;
            const brightness = (Math.sin(this.frame * 0.02 + i) + 1) / 2;
            this.ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.5})`;
            this.ctx.fillRect(x, y, 2, 2);
        }

        // Sort entities by Y position for proper layering
        const entities = [
            ...this.enemies.map(e => ({...e, isPlayer: false})),
            {...this.player, isPlayer: true}
        ].sort((a, b) => a.y - b.y);

        // Draw entities
        entities.forEach(entity => {
            if (entity.isPlayer) {
                SpriteRenderer.drawWizard(
                    this.ctx,
                    entity.x,
                    entity.y,
                    2.5,
                    this.frame,
                    entity.state
                );
            } else {
                const scale = entity.size || 1.5;
                if (entity.type === 'goblin') {
                    SpriteRenderer.drawGoblin(this.ctx, entity.x, entity.y, scale, this.frame);
                } else if (entity.type === 'skeleton') {
                    SpriteRenderer.drawSkeleton(this.ctx, entity.x, entity.y, scale, this.frame);
                } else if (entity.type === 'dragon') {
                    SpriteRenderer.drawDragon(this.ctx, entity.x, entity.y, scale, this.frame);
                }

                // HP bar
                const barWidth = 50;
                const barHeight = 6;
                const hpPercent = entity.hp / entity.maxHP;

                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
                this.ctx.fillRect(entity.x - barWidth/2, entity.y - 60, barWidth, barHeight);

                this.ctx.fillStyle = hpPercent > 0.5 ? '#4ade80' : hpPercent > 0.25 ? '#fbbf24' : '#ef4444';
                this.ctx.fillRect(entity.x - barWidth/2, entity.y - 60, barWidth * hpPercent, barHeight);
            }
        });

        // Draw particles
        this.particles.forEach(p => p.draw(this.ctx));
    }

    gameOver() {
        setTimeout(() => {
            alert('💀 Game Over!\n\nLevel: ' + this.player.level + '\nXP: ' + this.player.xp);
            window.location.reload();
        }, 100);
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game
const game = new WizardGame();
