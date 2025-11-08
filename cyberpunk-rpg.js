// Cyberpunk RPG - Professional Sprite-Based Game
// 8-directional movement with frame-by-frame animations

// Direction constants (8 directions)
const DIRECTIONS = {
    SOUTH: 0,
    SOUTH_EAST: 1,
    EAST: 2,
    NORTH_EAST: 3,
    NORTH: 4,
    NORTH_WEST: 5,
    WEST: 6,
    SOUTH_WEST: 7
};

// Animation states
const ANIM_STATES = {
    IDLE: 'idle',
    WALK: 'walk',
    ATTACK: 'attack',
    DEATH: 'death'
};

// Sprite Renderer - Professional pixel-art style character drawing
class SpriteRenderer {
    // Draw Cyberpunk Hacker (main character)
    static drawCyberpunkHacker(ctx, x, y, direction, frame, state) {
        ctx.save();
        ctx.translate(x, y);

        // Rotate based on direction
        const angle = direction * (Math.PI / 4);
        ctx.rotate(angle);

        const scale = 2;
        const bodyColor = '#00ff88';
        const darkColor = '#004422';
        const glowColor = '#00ffff';
        const skinColor = '#ffcc99';

        // Animation offset
        const walkBob = state === ANIM_STATES.WALK ? Math.sin(frame * 0.5) * 2 : 0;
        const attackOffset = state === ANIM_STATES.ATTACK ? frame * 3 : 0;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 15, 8 * scale, 3 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs (animated)
        ctx.fillStyle = darkColor;
        const legOffset = state === ANIM_STATES.WALK ? Math.sin(frame * 0.8) * 3 : 0;

        // Left leg
        ctx.fillRect(-3 * scale, 5 * scale + walkBob - legOffset, 2.5 * scale, 8 * scale);
        // Right leg
        ctx.fillRect(0.5 * scale, 5 * scale + walkBob + legOffset, 2.5 * scale, 8 * scale);

        // Cyber boots (glowing)
        ctx.fillStyle = glowColor;
        ctx.shadowBlur = 5;
        ctx.shadowColor = glowColor;
        ctx.fillRect(-3 * scale, 11 * scale + walkBob, 2.5 * scale, 2 * scale);
        ctx.fillRect(0.5 * scale, 11 * scale + walkBob, 2.5 * scale, 2 * scale);
        ctx.shadowBlur = 0;

        // Body (armored jacket)
        ctx.fillStyle = bodyColor;
        ctx.fillRect(-4 * scale, -2 * scale + walkBob, 8 * scale, 8 * scale);

        // Armor details
        ctx.fillStyle = darkColor;
        ctx.fillRect(-4 * scale, -2 * scale + walkBob, 8 * scale, 1 * scale);
        ctx.fillRect(-4 * scale, 2 * scale + walkBob, 8 * scale, 1 * scale);

        // Neon lines on armor
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 0.5 * scale;
        ctx.shadowBlur = 3;
        ctx.shadowColor = glowColor;
        ctx.beginPath();
        ctx.moveTo(-3 * scale, 0 + walkBob);
        ctx.lineTo(3 * scale, 0 + walkBob);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Arms (animated)
        const armOffset = state === ANIM_STATES.WALK ? Math.sin(frame * 0.8) * 2 : 0;

        // Left arm
        ctx.fillStyle = bodyColor;
        ctx.fillRect(-6 * scale, -1 * scale + walkBob + armOffset, 2 * scale, 6 * scale);
        // Right arm
        ctx.fillRect(4 * scale, -1 * scale + walkBob - armOffset, 2 * scale, 6 * scale);

        // Weapon (cyber blade/gun)
        if (state === ANIM_STATES.ATTACK) {
            ctx.fillStyle = glowColor;
            ctx.shadowBlur = 10;
            ctx.shadowColor = glowColor;
            ctx.fillRect(4 * scale + attackOffset, -1 * scale + walkBob, 6 * scale, 1.5 * scale);
            ctx.shadowBlur = 0;
        } else {
            ctx.fillStyle = '#888';
            ctx.fillRect(5 * scale, 3 * scale + walkBob, 2 * scale, 3 * scale);
        }

        // Head
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.arc(0, -5 * scale + walkBob, 3 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Cyber visor (glowing)
        ctx.fillStyle = glowColor;
        ctx.shadowBlur = 8;
        ctx.shadowColor = glowColor;
        ctx.fillRect(-3 * scale, -6 * scale + walkBob, 6 * scale, 2 * scale);
        ctx.shadowBlur = 0;

        // Hair (mohawk)
        ctx.fillStyle = '#ff0088';
        ctx.fillRect(-1 * scale, -9 * scale + walkBob, 2 * scale, 4 * scale);

        // Glow aura (idle animation)
        if (state === ANIM_STATES.IDLE) {
            ctx.strokeStyle = glowColor;
            ctx.lineWidth = 1;
            ctx.shadowBlur = 15 + Math.sin(frame * 0.1) * 5;
            ctx.shadowColor = glowColor;
            ctx.globalAlpha = 0.3;
            ctx.beginPath();
            ctx.arc(0, 0, 15 * scale, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        }

        ctx.restore();
    }

    // Draw Security Drone
    static drawSecurityDrone(ctx, x, y, direction, frame, state) {
        ctx.save();
        ctx.translate(x, y);

        const scale = 1.5;
        const bodyColor = '#ff3333';
        const metalColor = '#666666';
        const glowColor = '#ff0000';

        const hover = Math.sin(frame * 0.15) * 3;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 12, 6 * scale, 2 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Propellers (spinning)
        ctx.strokeStyle = metalColor;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.5;
        for (let i = 0; i < 4; i++) {
            ctx.save();
            ctx.rotate((frame * 0.3 + i * Math.PI / 2));
            ctx.beginPath();
            ctx.moveTo(-8 * scale, 0);
            ctx.lineTo(8 * scale, 0);
            ctx.stroke();
            ctx.restore();
        }
        ctx.globalAlpha = 1;

        // Main body
        ctx.fillStyle = metalColor;
        ctx.beginPath();
        ctx.ellipse(0, hover, 6 * scale, 4 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Red eye/sensor (glowing)
        ctx.fillStyle = glowColor;
        ctx.shadowBlur = 10;
        ctx.shadowColor = glowColor;
        ctx.beginPath();
        ctx.arc(0, hover, 2.5 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Scanner beam (when active)
        if (state === ANIM_STATES.ATTACK) {
            ctx.strokeStyle = glowColor;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 15;
            ctx.shadowColor = glowColor;
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.moveTo(0, hover);
            ctx.lineTo(frame * 5, hover);
            ctx.stroke();
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        }

        // Antenna
        ctx.strokeStyle = metalColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, hover - 4 * scale);
        ctx.lineTo(0, hover - 7 * scale);
        ctx.stroke();

        // Antenna light
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.arc(0, hover - 7 * scale, 1 * scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    // Draw Corrupted AI Entity
    static drawCorruptedAI(ctx, x, y, direction, frame, state) {
        ctx.save();
        ctx.translate(x, y);

        const scale = 2;
        const primaryColor = '#9933ff';
        const darkColor = '#330066';
        const glowColor = '#ff00ff';

        const pulse = Math.sin(frame * 0.2) * 0.2 + 1;
        const distortion = Math.sin(frame * 0.5) * 2;

        // Glitch effect particles
        ctx.globalAlpha = 0.6;
        for (let i = 0; i < 5; i++) {
            const offset = Math.sin(frame * 0.3 + i) * 5;
            ctx.fillStyle = i % 2 === 0 ? primaryColor : glowColor;
            ctx.fillRect(
                (Math.random() - 0.5) * 20 + offset,
                (Math.random() - 0.5) * 20,
                2, 2
            );
        }
        ctx.globalAlpha = 1;

        // Main body (digital/holographic appearance)
        ctx.fillStyle = primaryColor;
        ctx.shadowBlur = 20 * pulse;
        ctx.shadowColor = glowColor;

        // Distorted geometric shape
        ctx.beginPath();
        ctx.moveTo(0, -8 * scale + distortion);
        ctx.lineTo(6 * scale, -3 * scale);
        ctx.lineTo(5 * scale, 5 * scale - distortion);
        ctx.lineTo(-5 * scale, 5 * scale + distortion);
        ctx.lineTo(-6 * scale, -3 * scale);
        ctx.closePath();
        ctx.fill();

        // Inner core (pulsing)
        ctx.fillStyle = glowColor;
        ctx.shadowBlur = 30 * pulse;
        ctx.beginPath();
        ctx.arc(0, 0, 3 * scale * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Digital tendrils
        ctx.strokeStyle = darkColor;
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            const angle = (i / 3) * Math.PI * 2 + frame * 0.1;
            const length = 8 + Math.sin(frame * 0.2 + i) * 3;
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
            ctx.stroke();
        }

        // Data stream effect
        if (state === ANIM_STATES.ATTACK) {
            ctx.strokeStyle = glowColor;
            ctx.lineWidth = 1;
            ctx.shadowBlur = 10;
            ctx.shadowColor = glowColor;
            for (let i = 0; i < 10; i++) {
                const progress = (frame * 0.5 + i * 0.1) % 1;
                ctx.globalAlpha = 1 - progress;
                ctx.beginPath();
                ctx.arc(progress * 50, 0, 2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        }

        ctx.restore();
    }

    // Draw Corporate Guard
    static drawCorporateGuard(ctx, x, y, direction, frame, state) {
        ctx.save();
        ctx.translate(x, y);

        const angle = direction * (Math.PI / 4);
        ctx.rotate(angle);

        const scale = 2;
        const armorColor = '#333333';
        const accentColor = '#ff9900';
        const weaponColor = '#555555';

        const walkBob = state === ANIM_STATES.WALK ? Math.sin(frame * 0.5) * 2 : 0;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 15, 7 * scale, 3 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs
        ctx.fillStyle = armorColor;
        const legMove = state === ANIM_STATES.WALK ? Math.sin(frame * 0.8) * 3 : 0;
        ctx.fillRect(-3 * scale, 6 * scale + walkBob - legMove, 2 * scale, 7 * scale);
        ctx.fillRect(1 * scale, 6 * scale + walkBob + legMove, 2 * scale, 7 * scale);

        // Boots (tactical)
        ctx.fillStyle = '#000';
        ctx.fillRect(-3 * scale, 11 * scale + walkBob, 2 * scale, 2 * scale);
        ctx.fillRect(1 * scale, 11 * scale + walkBob, 2 * scale, 2 * scale);

        // Body armor
        ctx.fillStyle = armorColor;
        ctx.fillRect(-4 * scale, -1 * scale + walkBob, 8 * scale, 8 * scale);

        // Armor plates
        ctx.fillStyle = '#222';
        ctx.fillRect(-4 * scale, -1 * scale + walkBob, 8 * scale, 2 * scale);
        ctx.fillRect(-4 * scale, 3 * scale + walkBob, 8 * scale, 2 * scale);

        // Corporate logo
        ctx.fillStyle = accentColor;
        ctx.fillRect(-1.5 * scale, 1 * scale + walkBob, 3 * scale, 3 * scale);
        ctx.fillStyle = '#000';
        ctx.fillRect(-0.5 * scale, 2 * scale + walkBob, 1 * scale, 1 * scale);

        // Arms
        ctx.fillStyle = armorColor;
        const armMove = state === ANIM_STATES.WALK ? Math.sin(frame * 0.8) * 2 : 0;
        ctx.fillRect(-6 * scale, 0 + walkBob + armMove, 2 * scale, 6 * scale);
        ctx.fillRect(4 * scale, 0 + walkBob - armMove, 2 * scale, 6 * scale);

        // Weapon (assault rifle)
        ctx.fillStyle = weaponColor;
        if (state === ANIM_STATES.ATTACK) {
            ctx.fillRect(4 * scale, 2 * scale + walkBob, 8 * scale, 2 * scale);
            // Muzzle flash
            ctx.fillStyle = '#ffff00';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ffff00';
            ctx.fillRect(12 * scale, 2 * scale + walkBob, 3 * scale, 2 * scale);
            ctx.shadowBlur = 0;
        } else {
            ctx.fillRect(4 * scale, 3 * scale + walkBob, 6 * scale, 1.5 * scale);
        }

        // Helmet
        ctx.fillStyle = armorColor;
        ctx.beginPath();
        ctx.arc(0, -4 * scale + walkBob, 3.5 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Visor
        ctx.fillStyle = accentColor;
        ctx.shadowBlur = 5;
        ctx.shadowColor = accentColor;
        ctx.fillRect(-3 * scale, -5 * scale + walkBob, 6 * scale, 1.5 * scale);
        ctx.shadowBlur = 0;

        ctx.restore();
    }

    // Draw Heavy Mech
    static drawHeavyMech(ctx, x, y, direction, frame, state) {
        ctx.save();
        ctx.translate(x, y);

        const angle = direction * (Math.PI / 4);
        ctx.rotate(angle);

        const scale = 2.5;
        const mechColor = '#444444';
        const accentColor = '#ff0000';
        const glowColor = '#00ffff';

        const walkBob = state === ANIM_STATES.WALK ? Math.sin(frame * 0.4) * 3 : 0;

        // Shadow (bigger)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.ellipse(0, 20, 12 * scale, 4 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs (mechanical)
        ctx.fillStyle = mechColor;
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 2;

        const legMove = state === ANIM_STATES.WALK ? Math.sin(frame * 0.6) * 4 : 0;

        // Left leg
        ctx.fillRect(-5 * scale, 5 * scale + walkBob - legMove, 4 * scale, 10 * scale);
        ctx.strokeRect(-5 * scale, 5 * scale + walkBob - legMove, 4 * scale, 10 * scale);

        // Right leg
        ctx.fillRect(1 * scale, 5 * scale + walkBob + legMove, 4 * scale, 10 * scale);
        ctx.strokeRect(1 * scale, 5 * scale + walkBob + legMove, 4 * scale, 10 * scale);

        // Hydraulic joints
        ctx.fillStyle = glowColor;
        ctx.shadowBlur = 5;
        ctx.shadowColor = glowColor;
        ctx.beginPath();
        ctx.arc(-3 * scale, 10 * scale + walkBob, 1.5 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(3 * scale, 10 * scale + walkBob, 1.5 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Main body (large armored chassis)
        ctx.fillStyle = mechColor;
        ctx.fillRect(-6 * scale, -5 * scale + walkBob, 12 * scale, 11 * scale);
        ctx.strokeRect(-6 * scale, -5 * scale + walkBob, 12 * scale, 11 * scale);

        // Armor plating details
        ctx.fillStyle = '#333';
        ctx.fillRect(-6 * scale, -5 * scale + walkBob, 12 * scale, 3 * scale);
        ctx.fillRect(-6 * scale, 2 * scale + walkBob, 12 * scale, 2 * scale);

        // Cockpit/Core
        ctx.fillStyle = accentColor;
        ctx.shadowBlur = 10;
        ctx.shadowColor = accentColor;
        ctx.fillRect(-3 * scale, -2 * scale + walkBob, 6 * scale, 4 * scale);
        ctx.shadowBlur = 0;

        // Arms/Weapon mounts
        ctx.fillStyle = mechColor;
        // Left arm
        ctx.fillRect(-9 * scale, -2 * scale + walkBob, 3 * scale, 8 * scale);
        // Right arm
        ctx.fillRect(6 * scale, -2 * scale + walkBob, 3 * scale, 8 * scale);

        // Weapons
        if (state === ANIM_STATES.ATTACK) {
            // Plasma cannon fire
            ctx.fillStyle = glowColor;
            ctx.shadowBlur = 20;
            ctx.shadowColor = glowColor;
            ctx.fillRect(9 * scale, 0 + walkBob, 10 * scale, 3 * scale);

            // Energy discharge
            for (let i = 0; i < 3; i++) {
                ctx.globalAlpha = 0.7 - i * 0.2;
                ctx.fillRect(9 * scale + i * 5, -2 + walkBob, 4, 7);
            }
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        } else {
            ctx.fillStyle = '#666';
            ctx.fillRect(6 * scale, 2 * scale + walkBob, 5 * scale, 2 * scale);
        }

        // Head/Sensor array
        ctx.fillStyle = mechColor;
        ctx.fillRect(-3 * scale, -9 * scale + walkBob, 6 * scale, 4 * scale);

        // Eyes/Sensors (glowing)
        ctx.fillStyle = accentColor;
        ctx.shadowBlur = 8;
        ctx.shadowColor = accentColor;
        ctx.fillRect(-2.5 * scale, -7 * scale + walkBob, 1.5 * scale, 1 * scale);
        ctx.fillRect(1 * scale, -7 * scale + walkBob, 1.5 * scale, 1 * scale);
        ctx.shadowBlur = 0;

        // Exhaust/Steam vents
        if (state === ANIM_STATES.WALK) {
            ctx.fillStyle = 'rgba(200, 200, 200, 0.4)';
            ctx.fillRect(-7 * scale, 3 * scale + walkBob, 2, 8);
            ctx.fillRect(5 * scale, 3 * scale + walkBob, 2, 8);
        }

        ctx.restore();
    }

    // Draw Boss AI (massive entity)
    static drawBossAI(ctx, x, y, direction, frame, state) {
        ctx.save();
        ctx.translate(x, y);

        const scale = 3;
        const primaryColor = '#ff0066';
        const secondaryColor = '#6600ff';
        const glowColor = '#00ffff';

        const pulse = Math.sin(frame * 0.15) * 0.3 + 1;
        const rotate = frame * 0.05;

        // Massive shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.ellipse(0, 25, 20 * scale, 6 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Energy field (rotating)
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = glowColor;
        ctx.globalAlpha = 0.5;

        for (let i = 0; i < 6; i++) {
            ctx.save();
            ctx.rotate(rotate + i * Math.PI / 3);
            ctx.beginPath();
            ctx.moveTo(15 * scale, 0);
            ctx.lineTo(20 * scale, 0);
            ctx.stroke();
            ctx.restore();
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        // Main core (large pulsing sphere)
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 8 * scale * pulse);
        gradient.addColorStop(0, primaryColor);
        gradient.addColorStop(0.5, secondaryColor);
        gradient.addColorStop(1, 'rgba(102, 0, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.shadowBlur = 40 * pulse;
        ctx.shadowColor = primaryColor;
        ctx.beginPath();
        ctx.arc(0, 0, 8 * scale * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner cores (multiple layers)
        ctx.fillStyle = glowColor;
        ctx.shadowBlur = 30;
        ctx.shadowColor = glowColor;
        ctx.beginPath();
        ctx.arc(0, 0, 5 * scale * pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = primaryColor;
        ctx.beginPath();
        ctx.arc(0, 0, 3 * scale * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Orbital rings
        ctx.strokeStyle = secondaryColor;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 10;
        ctx.shadowColor = secondaryColor;

        for (let ring = 0; ring < 3; ring++) {
            ctx.save();
            ctx.rotate(rotate * (ring + 1) * 0.5);
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.ellipse(0, 0, (10 + ring * 3) * scale, (8 + ring * 2) * scale, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        // Data nodes (floating around)
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + rotate;
            const distance = 12 * scale + Math.sin(frame * 0.2 + i) * 2 * scale;
            const nodeX = Math.cos(angle) * distance;
            const nodeY = Math.sin(angle) * distance;

            ctx.fillStyle = i % 2 === 0 ? primaryColor : glowColor;
            ctx.shadowBlur = 10;
            ctx.shadowColor = ctx.fillStyle;
            ctx.beginPath();
            ctx.arc(nodeX, nodeY, 1.5 * scale, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.shadowBlur = 0;

        // Attack mode: energy beams
        if (state === ANIM_STATES.ATTACK) {
            ctx.strokeStyle = primaryColor;
            ctx.lineWidth = 3;
            ctx.shadowBlur = 20;
            ctx.shadowColor = primaryColor;

            for (let i = 0; i < 4; i++) {
                const angle = (i / 4) * Math.PI * 2 + rotate;
                const length = (frame % 30) * 2;

                ctx.globalAlpha = 1 - (length / 60);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
                ctx.stroke();
            }
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        }

        // Corruption particles
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = 0.6;
        for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 15 * scale + Math.random() * 10;
            const size = Math.random() * 2 + 1;

            ctx.beginPath();
            ctx.arc(
                Math.cos(angle + rotate) * distance,
                Math.sin(angle + rotate) * distance,
                size, 0, Math.PI * 2
            );
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        ctx.restore();
    }
}

// Particle System for effects
class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    emit(x, y, type, count = 10) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;

            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: Math.random() * 0.02 + 0.01,
                size: Math.random() * 3 + 1,
                color: type === 'damage' ? '#ff0000' :
                       type === 'heal' ? '#00ff00' :
                       type === 'level' ? '#ffd700' :
                       type === 'cyber' ? '#00ffff' : '#ffffff'
            });
        }
    }

    update() {
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // Gravity
            p.life -= p.decay;
            return p.life > 0;
        });
    }

    draw(ctx) {
        this.particles.forEach(p => {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
    }
}

// Character Classes (Cyberpunk themed)
const CLASSES = {
    netrunner: {
        name: 'Netrunner',
        description: 'Hacker Uzmanı',
        baseHP: 120,
        baseMP: 150,
        baseDamage: 18,
        baseDefense: 6,
        skills: [
            { name: 'Virus İnjection', damage: 30, mpCost: 15, cooldown: 2500, key: 'Q', effect: 'cyber' },
            { name: 'System Override', defense: 25, mpCost: 20, cooldown: 4000, key: 'W', effect: 'shield' },
            { name: 'Data Spike', damage: 55, mpCost: 30, cooldown: 7000, key: 'E', effect: 'cyber' }
        ]
    },
    street_samurai: {
        name: 'Street Samurai',
        description: 'Yakın Dövüş Ustası',
        baseHP: 160,
        baseMP: 80,
        baseDamage: 22,
        baseDefense: 12,
        skills: [
            { name: 'Cyber Slash', damage: 35, mpCost: 12, cooldown: 2000, key: 'Q', effect: 'slash' },
            { name: 'Reflex Boost', dodge: true, mpCost: 18, cooldown: 4500, key: 'W', effect: 'speed' },
            { name: 'Killing Edge', damage: 65, mpCost: 28, cooldown: 6500, key: 'E', effect: 'crit' }
        ]
    },
    tech_priest: {
        name: 'Tech Priest',
        description: 'Destek ve İyileştirme',
        baseHP: 130,
        baseMP: 140,
        baseDamage: 16,
        baseDefense: 8,
        skills: [
            { name: 'Nano Repair', heal: 45, mpCost: 20, cooldown: 3000, key: 'Q', effect: 'heal' },
            { name: 'EMP Blast', damage: 28, mpCost: 15, cooldown: 2500, key: 'W', effect: 'shock' },
            { name: 'Energy Barrier', defense: 30, mpCost: 25, cooldown: 5000, key: 'E', effect: 'shield' }
        ]
    },
    corpo_soldier: {
        name: 'Corpo Soldier',
        description: 'Dengeli Savaşçı',
        baseHP: 145,
        baseMP: 110,
        baseDamage: 20,
        baseDefense: 10,
        skills: [
            { name: 'Tactical Strike', damage: 32, mpCost: 14, cooldown: 2200, key: 'Q', effect: 'bullet' },
            { name: 'Combat Stim', heal: 30, mpCost: 16, cooldown: 4000, key: 'W', effect: 'heal' },
            { name: 'Explosive Round', damage: 60, mpCost: 32, cooldown: 7500, key: 'E', effect: 'explosion' }
        ]
    }
};

// Enemy types (Cyberpunk themed)
const ENEMY_TYPES = [
    {
        name: 'Security Drone',
        type: 'drone',
        hp: 60,
        damage: 10,
        xp: 30,
        gold: 15,
        speed: 1.8
    },
    {
        name: 'Corrupted AI',
        type: 'ai',
        hp: 80,
        damage: 14,
        xp: 40,
        gold: 20,
        speed: 1.3
    },
    {
        name: 'Corporate Guard',
        type: 'guard',
        hp: 100,
        damage: 16,
        xp: 50,
        gold: 25,
        speed: 1.1
    },
    {
        name: 'Heavy Mech',
        type: 'mech',
        hp: 150,
        damage: 20,
        xp: 75,
        gold: 40,
        speed: 0.9
    },
    {
        name: 'Boss AI',
        type: 'boss',
        hp: 250,
        damage: 28,
        xp: 120,
        gold: 60,
        speed: 0.7
    }
];

// Items
const ITEMS = [
    { name: 'Health Stim', icon: '💉', type: 'potion', heal: 60 },
    { name: 'Energy Cell', icon: '🔋', type: 'potion', mana: 60 },
    { name: 'Credits', icon: '💳', type: 'gold', value: 15 },
    { name: 'Cyber Blade', icon: '⚔️', type: 'weapon', damage: 8 },
    { name: 'Nano Armor', icon: '🛡️', type: 'armor', defense: 6 }
];

// Main Game Class
class CyberpunkRPG {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.player = null;
        this.enemies = [];
        this.projectiles = [];
        this.drops = [];
        this.inventory = Array(5).fill(null);

        this.particleSystem = new ParticleSystem();
        this.animationFrame = 0;

        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        this.setupControls();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    selectCharacter(className) {
        const classData = CLASSES[className];

        this.player = {
            class: className,
            name: classData.name,
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,

            direction: DIRECTIONS.SOUTH,
            animState: ANIM_STATES.IDLE,
            animFrame: 0,
            animSpeed: 0.15,

            level: 1,
            xp: 0,
            xpToLevel: 100,

            hp: classData.baseHP,
            maxHP: classData.baseHP,
            mp: classData.baseMP,
            maxMP: classData.baseMP,

            damage: classData.baseDamage,
            defense: classData.baseDefense,
            speed: 2.5,

            skills: classData.skills.map(s => ({...s, cooldownRemaining: 0})),
            gold: 0,
            attackCooldown: 0
        };

        this.updateHUD();
        this.createSkillButtons();

        document.getElementById('charSelect').classList.add('hidden');
        document.getElementById('gameScreen').classList.add('active');

        this.spawnEnemies();
        this.gameLoop();
    }

    createSkillButtons() {
        const skillsDiv = document.getElementById('skills');
        skillsDiv.innerHTML = '';

        this.player.skills.forEach((skill, index) => {
            const btn = document.createElement('div');
            btn.className = 'skill-btn';
            btn.id = `skill${index}`;
            btn.innerHTML = `
                <div class="skill-icon">${skill.name.substring(0, 2)}</div>
                <div class="skill-key">${skill.key}</div>
            `;
            btn.onclick = () => this.useSkill(index);
            skillsDiv.appendChild(btn);
        });
    }

    setupControls() {
        // Keyboard
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;

            if (e.key.toLowerCase() === 'q') this.useSkill(0);
            if (e.key.toLowerCase() === 'w') this.useSkill(1);
            if (e.key.toLowerCase() === 'e') this.useSkill(2);

            if (e.key >= '1' && e.key <= '5') {
                this.useItem(parseInt(e.key) - 1);
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        // Joystick (mobile)
        const joystick = document.getElementById('joystick');
        const stick = document.getElementById('joystickStick');

        const handleJoystickStart = (e) => {
            e.preventDefault();
            this.joystickActive = true;
        };

        const handleJoystickMove = (e) => {
            if (!this.joystickActive) return;
            e.preventDefault();

            const touch = e.touches ? e.touches[0] : e;
            const rect = joystick.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = touch.clientX - centerX;
            const deltaY = touch.clientY - centerY;

            const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 35);
            this.joystickAngle = Math.atan2(deltaY, deltaX);
            this.joystickPower = distance / 35;

            const stickX = Math.cos(this.joystickAngle) * distance;
            const stickY = Math.sin(this.joystickAngle) * distance;

            stick.style.transform = `translate(calc(-50% + ${stickX}px), calc(-50% + ${stickY}px))`;
        };

        const handleJoystickEnd = (e) => {
            e.preventDefault();
            this.joystickActive = false;
            this.joystickPower = 0;
            stick.style.transform = 'translate(-50%, -50%)';
        };

        joystick.addEventListener('touchstart', handleJoystickStart);
        joystick.addEventListener('touchmove', handleJoystickMove);
        joystick.addEventListener('touchend', handleJoystickEnd);

        joystick.addEventListener('mousedown', handleJoystickStart);
        document.addEventListener('mousemove', handleJoystickMove);
        document.addEventListener('mouseup', handleJoystickEnd);
    }

    spawnEnemies() {
        const enemyCount = 4 + Math.floor(this.player.level / 2);

        for (let i = 0; i < enemyCount; i++) {
            this.spawnEnemy();
        }
    }

    spawnEnemy() {
        const typeIndex = Math.min(
            Math.floor(this.player.level / 3),
            ENEMY_TYPES.length - 1
        );
        const type = ENEMY_TYPES[Math.floor(Math.random() * (typeIndex + 1))];

        const margin = 150;
        const x = Math.random() < 0.5
            ? Math.random() * margin
            : this.canvas.width - Math.random() * margin;
        const y = Math.random() < 0.5
            ? Math.random() * margin
            : this.canvas.height - Math.random() * margin;

        this.enemies.push({
            ...type,
            x, y,
            maxHP: type.hp,
            direction: DIRECTIONS.SOUTH,
            animState: ANIM_STATES.IDLE,
            animFrame: 0,
            targetCooldown: 0
        });
    }

    useSkill(index) {
        if (!this.player) return;

        const skill = this.player.skills[index];

        if (skill.cooldownRemaining > 0) return;
        if (this.player.mp < skill.mpCost) return;

        this.player.mp -= skill.mpCost;
        skill.cooldownRemaining = skill.cooldown;

        // Set attack animation
        this.player.animState = ANIM_STATES.ATTACK;
        this.player.animFrame = 0;
        setTimeout(() => {
            if (this.player.animState === ANIM_STATES.ATTACK) {
                this.player.animState = ANIM_STATES.IDLE;
            }
        }, 500);

        // Skill effects
        if (skill.damage) {
            const nearestEnemy = this.findNearestEnemy();
            if (nearestEnemy) {
                const distance = this.getDistance(this.player, nearestEnemy);
                if (distance < 350) {
                    this.damageEnemy(nearestEnemy, skill.damage + this.player.damage);
                    this.particleSystem.emit(nearestEnemy.x, nearestEnemy.y, skill.effect || 'damage', 15);
                }
            }
        }

        if (skill.heal) {
            this.player.hp = Math.min(this.player.maxHP, this.player.hp + skill.heal);
            this.particleSystem.emit(this.player.x, this.player.y, 'heal', 20);
        }

        this.updateHUD();
        this.updateSkillUI(index);
    }

    updateSkillUI(index) {
        const btn = document.getElementById(`skill${index}`);
        const skill = this.player.skills[index];

        btn.classList.add('cooldown');

        const overlay = document.createElement('div');
        overlay.className = 'cooldown-overlay';
        overlay.textContent = Math.ceil(skill.cooldownRemaining / 1000);
        btn.appendChild(overlay);

        const interval = setInterval(() => {
            const remaining = Math.ceil(skill.cooldownRemaining / 1000);
            overlay.textContent = remaining;

            if (remaining <= 0) {
                btn.classList.remove('cooldown');
                overlay.remove();
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
        this.showDamage(enemy.x, enemy.y - 30, damage, '#ff4444');

        if (enemy.hp <= 0) {
            this.killEnemy(enemy);
        }
    }

    killEnemy(enemy) {
        const index = this.enemies.indexOf(enemy);
        if (index > -1) {
            this.enemies.splice(index, 1);
        }

        // Particle explosion
        this.particleSystem.emit(enemy.x, enemy.y, 'damage', 30);

        // XP
        this.player.xp += enemy.xp;
        this.player.gold += enemy.gold;

        if (this.player.xp >= this.player.xpToLevel) {
            this.levelUp();
        }

        // Drop
        if (Math.random() < 0.5) {
            const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
            this.drops.push({
                ...item,
                x: enemy.x,
                y: enemy.y
            });
        }

        // Spawn new enemy
        setTimeout(() => this.spawnEnemy(), 3000);

        this.updateHUD();
    }

    levelUp() {
        this.player.level++;
        this.player.xp = 0;
        this.player.xpToLevel = Math.floor(this.player.xpToLevel * 1.5);

        this.player.maxHP += 25;
        this.player.hp = this.player.maxHP;
        this.player.maxMP += 15;
        this.player.mp = this.player.maxMP;
        this.player.damage += 4;
        this.player.defense += 2;

        this.particleSystem.emit(this.player.x, this.player.y, 'level', 50);
        this.showNotification('⚡ LEVEL UP! ' + this.player.level);
        this.updateHUD();
    }

    showDamage(x, y, damage, color = '#ff4444') {
        const dmg = document.createElement('div');
        dmg.className = 'damage-number';
        dmg.textContent = '-' + damage;
        dmg.style.left = x + 'px';
        dmg.style.top = y + 'px';
        dmg.style.color = color;
        document.body.appendChild(dmg);

        setTimeout(() => dmg.remove(), 1000);
    }

    showNotification(text) {
        const notif = document.getElementById('lootNotif');
        notif.textContent = text;
        notif.style.display = 'flex';

        setTimeout(() => {
            notif.style.display = 'none';
        }, 2000);
    }

    pickupDrop(drop) {
        const index = this.drops.indexOf(drop);
        if (index > -1) {
            this.drops.splice(index, 1);
        }

        for (let i = 0; i < this.inventory.length; i++) {
            if (!this.inventory[i]) {
                this.inventory[i] = drop;
                this.updateInventory();
                this.showNotification(`+1 ${drop.name}`);
                this.particleSystem.emit(this.player.x, this.player.y, 'cyber', 10);
                break;
            }
        }
    }

    useItem(slot) {
        const item = this.inventory[slot];
        if (!item) return;

        if (item.type === 'potion') {
            if (item.heal) {
                this.player.hp = Math.min(this.player.maxHP, this.player.hp + item.heal);
                this.particleSystem.emit(this.player.x, this.player.y, 'heal', 15);
            }
            if (item.mana) {
                this.player.mp = Math.min(this.player.maxMP, this.player.mp + item.mana);
                this.particleSystem.emit(this.player.x, this.player.y, 'cyber', 15);
            }

            this.inventory[slot] = null;
            this.updateInventory();
            this.updateHUD();
        }
    }

    updateInventory() {
        this.inventory.forEach((item, i) => {
            const slot = document.getElementById(`slot${i}`);
            if (item) {
                slot.innerHTML = `${item.icon}`;
                slot.classList.add('has-item');
            } else {
                slot.innerHTML = '';
                slot.classList.remove('has-item');
            }
        });
    }

    getDirection(dx, dy) {
        if (dx === 0 && dy === 0) return this.player.direction;

        const angle = Math.atan2(dy, dx);
        const deg = angle * (180 / Math.PI);
        const normalized = (deg + 360 + 22.5) % 360;

        return Math.floor(normalized / 45) % 8;
    }

    update() {
        if (!this.player) return;

        this.animationFrame++;

        // Player movement
        let dx = 0, dy = 0;

        if (this.keys['arrowleft'] || this.keys['a']) dx -= 1;
        if (this.keys['arrowright'] || this.keys['d']) dx += 1;
        if (this.keys['arrowup'] || this.keys['w']) dy -= 1;
        if (this.keys['arrowdown'] || this.keys['s']) dy += 1;

        // Joystick
        if (this.joystickActive) {
            dx = Math.cos(this.joystickAngle) * this.joystickPower;
            dy = Math.sin(this.joystickAngle) * this.joystickPower;
        }

        if (dx || dy) {
            const magnitude = Math.sqrt(dx * dx + dy * dy);
            dx = (dx / magnitude) * this.player.speed;
            dy = (dy / magnitude) * this.player.speed;

            this.player.x = Math.max(30, Math.min(this.canvas.width - 30, this.player.x + dx));
            this.player.y = Math.max(30, Math.min(this.canvas.height - 30, this.player.y + dy));

            this.player.direction = this.getDirection(dx, dy);
            if (this.player.animState !== ANIM_STATES.ATTACK) {
                this.player.animState = ANIM_STATES.WALK;
            }
        } else {
            if (this.player.animState === ANIM_STATES.WALK) {
                this.player.animState = ANIM_STATES.IDLE;
            }
        }

        // Update player animation frame
        this.player.animFrame += this.player.animSpeed;

        // Update enemies
        this.enemies.forEach(enemy => {
            const dist = this.getDistance(this.player, enemy);

            if (dist < 450) {
                const angle = Math.atan2(this.player.y - enemy.y, this.player.x - enemy.x);
                const edx = Math.cos(angle) * enemy.speed;
                const edy = Math.sin(angle) * enemy.speed;

                enemy.x += edx;
                enemy.y += edy;

                enemy.direction = this.getDirection(edx, edy);
                enemy.animState = ANIM_STATES.WALK;
                enemy.animFrame += 0.1;

                // Attack player
                if (dist < 60) {
                    if (enemy.targetCooldown <= 0) {
                        const damage = Math.max(1, enemy.damage - this.player.defense);
                        this.player.hp -= damage;
                        this.showDamage(this.player.x, this.player.y - 40, damage, '#ff6666');
                        this.particleSystem.emit(this.player.x, this.player.y, 'damage', 10);
                        enemy.targetCooldown = 1200;

                        enemy.animState = ANIM_STATES.ATTACK;

                        if (this.player.hp <= 0) {
                            this.gameOver();
                        }

                        this.updateHUD();
                    }
                }
            } else {
                enemy.animState = ANIM_STATES.IDLE;
            }

            if (enemy.targetCooldown > 0) {
                enemy.targetCooldown -= 16;
            }
        });

        // Update drops
        this.drops.forEach(drop => {
            if (this.getDistance(this.player, drop) < 50) {
                this.pickupDrop(drop);
            }
        });

        // Update cooldowns
        this.player.skills.forEach(skill => {
            if (skill.cooldownRemaining > 0) {
                skill.cooldownRemaining -= 16;
            }
        });

        // MP regen
        if (this.player.mp < this.player.maxMP) {
            this.player.mp = Math.min(this.player.maxMP, this.player.mp + 0.15);
            if (Math.random() < 0.1) this.updateHUD();
        }

        // Update particles
        this.particleSystem.update();
    }

    draw() {
        // Dark cyberpunk background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#0a0a1a');
        gradient.addColorStop(1, '#1a0a2e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Neon grid
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.08)';
        this.ctx.lineWidth = 1;
        const gridSize = 60;

        for (let x = 0; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        // Ambient particles
        this.ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
        for (let i = 0; i < 20; i++) {
            const x = (this.animationFrame * 0.5 + i * 100) % this.canvas.width;
            const y = (i * 73) % this.canvas.height;
            const flicker = Math.sin(this.animationFrame * 0.1 + i) * 0.5 + 0.5;
            this.ctx.globalAlpha = flicker * 0.4;
            this.ctx.fillRect(x, y, 2, 2);
        }
        this.ctx.globalAlpha = 1;

        // Drops
        this.drops.forEach(drop => {
            this.ctx.font = '32px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';

            // Glow effect
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#00ffff';

            const bob = Math.sin(this.animationFrame * 0.1) * 5;
            this.ctx.fillText(drop.icon, drop.x, drop.y + bob);

            this.ctx.shadowBlur = 0;
        });

        // Enemies (sorted by Y for depth)
        const allEntities = [...this.enemies];
        if (this.player) allEntities.push(this.player);

        allEntities.sort((a, b) => a.y - b.y);

        allEntities.forEach(entity => {
            if (entity === this.player) {
                // Draw player
                SpriteRenderer.drawCyberpunkHacker(
                    this.ctx,
                    entity.x,
                    entity.y,
                    entity.direction,
                    entity.animFrame,
                    entity.animState
                );

                // Player name
                this.ctx.fillStyle = '#00ff88';
                this.ctx.font = 'bold 12px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.shadowBlur = 5;
                this.ctx.shadowColor = '#00ff88';
                this.ctx.fillText(this.player.name, this.player.x, this.player.y - 45);
                this.ctx.shadowBlur = 0;
            } else {
                // Draw enemy based on type
                switch(entity.type) {
                    case 'drone':
                        SpriteRenderer.drawSecurityDrone(
                            this.ctx, entity.x, entity.y,
                            entity.direction, entity.animFrame, entity.animState
                        );
                        break;
                    case 'ai':
                        SpriteRenderer.drawCorruptedAI(
                            this.ctx, entity.x, entity.y,
                            entity.direction, entity.animFrame, entity.animState
                        );
                        break;
                    case 'guard':
                        SpriteRenderer.drawCorporateGuard(
                            this.ctx, entity.x, entity.y,
                            entity.direction, entity.animFrame, entity.animState
                        );
                        break;
                    case 'mech':
                        SpriteRenderer.drawHeavyMech(
                            this.ctx, entity.x, entity.y,
                            entity.direction, entity.animFrame, entity.animState
                        );
                        break;
                    case 'boss':
                        SpriteRenderer.drawBossAI(
                            this.ctx, entity.x, entity.y,
                            entity.direction, entity.animFrame, entity.animState
                        );
                        break;
                }

                // HP bar
                const barWidth = 50;
                const barHeight = 5;
                const hpPercent = entity.hp / entity.maxHP;

                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                this.ctx.fillRect(entity.x - barWidth/2, entity.y - 50, barWidth, barHeight);

                const hpGradient = this.ctx.createLinearGradient(
                    entity.x - barWidth/2, 0,
                    entity.x + barWidth/2, 0
                );
                hpGradient.addColorStop(0, '#ff0066');
                hpGradient.addColorStop(1, '#00ffff');

                this.ctx.fillStyle = hpGradient;
                this.ctx.fillRect(entity.x - barWidth/2, entity.y - 50, barWidth * hpPercent, barHeight);

                // Enemy name
                this.ctx.fillStyle = '#ff3366';
                this.ctx.font = '10px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(entity.name, entity.x, entity.y - 58);
            }
        });

        // Draw particles
        this.particleSystem.draw(this.ctx);
    }

    updateHUD() {
        if (!this.player) return;

        document.getElementById('playerName').textContent = this.player.name;
        document.getElementById('playerLevel').textContent = `Level: ${this.player.level}`;

        const hpPercent = (this.player.hp / this.player.maxHP) * 100;
        const mpPercent = (this.player.mp / this.player.maxMP) * 100;
        const xpPercent = (this.player.xp / this.player.xpToLevel) * 100;

        document.getElementById('hpBar').style.width = hpPercent + '%';
        document.getElementById('mpBar').style.width = mpPercent + '%';
        document.getElementById('xpBar').style.width = xpPercent + '%';

        document.getElementById('hpText').textContent =
            `HP: ${Math.floor(this.player.hp)}/${this.player.maxHP}`;
        document.getElementById('mpText').textContent =
            `MP: ${Math.floor(this.player.mp)}/${this.player.maxMP}`;
        document.getElementById('xpText').textContent =
            `XP: ${this.player.xp}/${this.player.xpToLevel}`;
    }

    gameOver() {
        alert(`💀 GAME OVER\n\nLevel: ${this.player.level}\nXP: ${this.player.xp}\nGold: ${this.player.gold}`);
        window.location.reload();
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game
const game = new CyberpunkRPG();

function selectCharacter(className) {
    game.selectCharacter(className);
}
