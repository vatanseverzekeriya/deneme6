// Professional Dragon Sprite System
// High-quality RPG asset generation with 8-directional movement and full animations

class DragonSpriteRenderer {
    constructor() {
        // Sprite cache
        this.spriteCache = new Map();

        // Animation states
        this.animations = {
            idle: { frames: 4, speed: 8 },
            walk: { frames: 6, speed: 6 },
            attack: { frames: 6, speed: 4 },
            hurt: { frames: 3, speed: 3 },
            death: { frames: 8, speed: 5 }
        };

        // 8 directions
        this.directions = {
            N: 0,      // North
            NE: 45,    // North-East
            E: 90,     // East
            SE: 135,   // South-East
            S: 180,    // South
            SW: 225,   // South-West
            W: 270,    // West
            NW: 315    // North-West
        };
    }

    // Get direction from angle
    getDirection(angle) {
        // Normalize angle to 0-360
        angle = ((angle % 360) + 360) % 360;

        if (angle >= 337.5 || angle < 22.5) return 'E';
        if (angle >= 22.5 && angle < 67.5) return 'NE';
        if (angle >= 67.5 && angle < 112.5) return 'N';
        if (angle >= 112.5 && angle < 157.5) return 'NW';
        if (angle >= 157.5 && angle < 202.5) return 'W';
        if (angle >= 202.5 && angle < 247.5) return 'SW';
        if (angle >= 247.5 && angle < 292.5) return 'S';
        return 'SE';
    }

    // Draw professional dragon sprite
    drawDragon(ctx, x, y, size, direction, animation, frame, type = 'dragon') {
        const cacheKey = `${type}_${direction}_${animation}_${frame}_${size}`;

        if (this.spriteCache.has(cacheKey)) {
            const cached = this.spriteCache.get(cacheKey);
            ctx.drawImage(cached, x - size/2, y - size/2);
            return;
        }

        // Create off-screen canvas for sprite
        const spriteCanvas = document.createElement('canvas');
        spriteCanvas.width = size;
        spriteCanvas.height = size;
        const spriteCtx = spriteCanvas.getContext('2d');

        // Draw based on type and direction
        if (type === 'dragon') {
            this.drawDragonBody(spriteCtx, size, direction, animation, frame);
        } else if (type === 'player') {
            this.drawWarriorBody(spriteCtx, size, direction, animation, frame);
        } else {
            this.drawMonsterBody(spriteCtx, size, direction, animation, frame, type);
        }

        // Cache the sprite
        this.spriteCache.set(cacheKey, spriteCanvas);

        // Draw to main canvas
        ctx.drawImage(spriteCanvas, x - size/2, y - size/2);
    }

    // Professional dragon body rendering
    drawDragonBody(ctx, size, direction, animation, frame) {
        const centerX = size / 2;
        const centerY = size / 2;

        // Animation offset for walking
        const walkOffset = animation === 'walk' ? Math.sin(frame * Math.PI / 3) * 3 : 0;

        // Rotation based on direction
        ctx.save();
        ctx.translate(centerX, centerY);

        const rotations = {
            'E': 0, 'NE': -45, 'N': -90, 'NW': -135,
            'W': 180, 'SW': 135, 'S': 90, 'SE': 45
        };
        ctx.rotate((rotations[direction] || 0) * Math.PI / 180);

        // Scale for perspective
        const scaleX = ['W', 'NW', 'SW'].includes(direction) ? -1 : 1;
        ctx.scale(scaleX, 1);

        // Attack animation - stretch forward
        if (animation === 'attack') {
            const attackProgress = frame / 6;
            ctx.translate(attackProgress * 15, 0);
        }

        // Hurt animation - recoil
        if (animation === 'hurt') {
            ctx.translate(-5 * (frame % 2), 0);
        }

        // Death animation - fall
        if (animation === 'death') {
            const deathProgress = frame / 8;
            ctx.rotate(deathProgress * Math.PI / 2);
            ctx.globalAlpha = 1 - deathProgress * 0.5;
        }

        // Draw dragon parts
        this.drawDragonParts(ctx, size, animation, frame, walkOffset);

        ctx.restore();
    }

    // Detailed dragon parts
    drawDragonParts(ctx, size, animation, frame, walkOffset) {
        const scale = size / 80;

        // Tail (behind body)
        this.drawTail(ctx, scale, animation, frame);

        // Back wing
        this.drawWing(ctx, scale, -1, animation, frame);

        // Body
        this.drawBody(ctx, scale, walkOffset);

        // Legs
        this.drawLegs(ctx, scale, animation, frame);

        // Front wing
        this.drawWing(ctx, scale, 1, animation, frame);

        // Head and neck
        this.drawHead(ctx, scale, animation, frame);

        // Details and highlights
        this.addDetails(ctx, scale);
    }

    // Tail rendering
    drawTail(ctx, scale, animation, frame) {
        const segments = 5;
        const tailSwing = animation === 'walk' ? Math.sin(frame * 0.5) * 10 : 0;

        ctx.save();
        ctx.translate(-25 * scale, 5 * scale);

        for (let i = 0; i < segments; i++) {
            const segmentSize = (segments - i) * 3 * scale;
            const swing = tailSwing * (i / segments);

            ctx.save();
            ctx.rotate(swing * Math.PI / 180);
            ctx.translate(-8 * scale, 0);

            // Tail segment gradient
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, segmentSize);
            gradient.addColorStop(0, '#8B0000');
            gradient.addColorStop(0.5, '#DC143C');
            gradient.addColorStop(1, '#B22222');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.ellipse(0, 0, segmentSize, segmentSize * 0.6, 0, 0, Math.PI * 2);
            ctx.fill();

            // Scales
            ctx.strokeStyle = '#5A0000';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.restore();
        }

        // Tail tip - spikes
        ctx.fillStyle = '#FFD700';
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(-40 * scale + i * 3 * scale, -3 * scale);
            ctx.lineTo(-45 * scale + i * 3 * scale, 0);
            ctx.lineTo(-40 * scale + i * 3 * scale, 3 * scale);
            ctx.fill();
        }

        ctx.restore();
    }

    // Wing rendering
    drawWing(ctx, scale, side, animation, frame) {
        ctx.save();
        ctx.translate(0, -8 * scale);

        // Wing flap animation
        const flapAngle = animation === 'walk' || animation === 'idle'
            ? Math.sin(frame * 0.3) * 15
            : 0;

        ctx.rotate((flapAngle * side) * Math.PI / 180);

        // Wing membrane
        const gradient = ctx.createLinearGradient(-20 * scale, -15 * scale, 0, 15 * scale);
        gradient.addColorStop(0, 'rgba(139, 0, 0, 0.9)');
        gradient.addColorStop(0.5, 'rgba(220, 20, 60, 0.8)');
        gradient.addColorStop(1, 'rgba(178, 34, 34, 0.9)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-15 * scale * side, -20 * scale, -25 * scale * side, -15 * scale);
        ctx.quadraticCurveTo(-30 * scale * side, 0, -25 * scale * side, 15 * scale);
        ctx.quadraticCurveTo(-15 * scale * side, 20 * scale, 0, 10 * scale);
        ctx.closePath();
        ctx.fill();

        // Wing bones
        ctx.strokeStyle = '#4A0000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-25 * scale * side, -15 * scale);
        ctx.moveTo(0, 5 * scale);
        ctx.lineTo(-30 * scale * side, 0);
        ctx.moveTo(0, 10 * scale);
        ctx.lineTo(-25 * scale * side, 15 * scale);
        ctx.stroke();

        ctx.restore();
    }

    // Body rendering
    drawBody(ctx, scale, walkOffset) {
        // Main body
        const bodyGradient = ctx.createRadialGradient(0, walkOffset, 0, 0, walkOffset, 20 * scale);
        bodyGradient.addColorStop(0, '#DC143C');
        bodyGradient.addColorStop(0.6, '#B22222');
        bodyGradient.addColorStop(1, '#8B0000');

        ctx.fillStyle = bodyGradient;
        ctx.beginPath();
        ctx.ellipse(0, walkOffset, 20 * scale, 15 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Scales on body
        ctx.strokeStyle = '#6A0000';
        ctx.lineWidth = 1.5;
        for (let i = -15; i < 15; i += 4) {
            ctx.beginPath();
            ctx.arc(i * scale, walkOffset - 8 * scale, 3 * scale, 0, Math.PI, true);
            ctx.stroke();
        }

        // Belly (lighter)
        ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, walkOffset + 5 * scale, 15 * scale, 10 * scale, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // Legs rendering
    drawLegs(ctx, scale, animation, frame) {
        const legPositions = [
            { x: -10, y: 10, phase: 0 },      // Back left
            { x: -8, y: 10, phase: Math.PI }, // Back right
            { x: 8, y: 10, phase: Math.PI },  // Front left
            { x: 10, y: 10, phase: 0 }        // Front right
        ];

        legPositions.forEach(leg => {
            const walkCycle = animation === 'walk'
                ? Math.sin(frame * 0.5 + leg.phase) * 5
                : 0;

            ctx.save();
            ctx.translate(leg.x * scale, leg.y * scale + walkCycle);

            // Upper leg
            ctx.fillStyle = '#8B0000';
            ctx.beginPath();
            ctx.ellipse(0, 0, 3 * scale, 8 * scale, 0, 0, Math.PI * 2);
            ctx.fill();

            // Lower leg
            ctx.fillStyle = '#6A0000';
            ctx.beginPath();
            ctx.ellipse(0, 10 * scale, 2.5 * scale, 6 * scale, 0, 0, Math.PI * 2);
            ctx.fill();

            // Claws
            ctx.fillStyle = '#FFD700';
            for (let i = -1; i <= 1; i++) {
                ctx.beginPath();
                ctx.moveTo(i * 2 * scale, 15 * scale);
                ctx.lineTo(i * 3 * scale, 18 * scale);
                ctx.lineTo(i * 2 * scale, 17 * scale);
                ctx.fill();
            }

            ctx.restore();
        });
    }

    // Head and neck rendering
    drawHead(ctx, scale, animation, frame) {
        ctx.save();
        ctx.translate(15 * scale, -5 * scale);

        // Attack animation - head thrust
        if (animation === 'attack') {
            ctx.translate((frame / 6) * 8 * scale, 0);
        }

        // Neck
        const neckGradient = ctx.createLinearGradient(-10 * scale, 0, 5 * scale, 0);
        neckGradient.addColorStop(0, '#B22222');
        neckGradient.addColorStop(1, '#DC143C');

        ctx.fillStyle = neckGradient;
        ctx.beginPath();
        ctx.moveTo(-10 * scale, 5 * scale);
        ctx.quadraticCurveTo(-5 * scale, -5 * scale, 5 * scale, -3 * scale);
        ctx.lineTo(5 * scale, 3 * scale);
        ctx.quadraticCurveTo(-5 * scale, 5 * scale, -10 * scale, 5 * scale);
        ctx.fill();

        // Head
        const headGradient = ctx.createRadialGradient(10 * scale, 0, 0, 10 * scale, 0, 12 * scale);
        headGradient.addColorStop(0, '#DC143C');
        headGradient.addColorStop(1, '#8B0000');

        ctx.fillStyle = headGradient;
        ctx.beginPath();
        ctx.ellipse(10 * scale, 0, 12 * scale, 8 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Snout
        ctx.fillStyle = '#B22222';
        ctx.beginPath();
        ctx.moveTo(20 * scale, 0);
        ctx.quadraticCurveTo(25 * scale, -2 * scale, 26 * scale, 0);
        ctx.quadraticCurveTo(25 * scale, 2 * scale, 20 * scale, 0);
        ctx.fill();

        // Horns
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.moveTo(5 * scale, -8 * scale);
        ctx.lineTo(3 * scale, -15 * scale);
        ctx.lineTo(7 * scale, -10 * scale);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(10 * scale, -8 * scale);
        ctx.lineTo(8 * scale, -16 * scale);
        ctx.lineTo(12 * scale, -10 * scale);
        ctx.fill();

        // Eye
        const eyeGlow = animation === 'attack' ? 15 : 5;
        ctx.shadowBlur = eyeGlow;
        ctx.shadowColor = '#FFD700';
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(15 * scale, -2 * scale, 2 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Pupil
        ctx.fillStyle = '#FF4500';
        ctx.beginPath();
        ctx.arc(15 * scale, -2 * scale, 1 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Teeth (when attacking)
        if (animation === 'attack' && frame > 2) {
            ctx.fillStyle = '#FFFFFF';
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.moveTo(22 * scale + i * 1.5 * scale, -1 * scale);
                ctx.lineTo(23 * scale + i * 1.5 * scale, 1 * scale);
                ctx.lineTo(22 * scale + i * 1.5 * scale, 1 * scale);
                ctx.fill();
            }
        }

        // Fire breath (attack animation)
        if (animation === 'attack' && frame >= 3) {
            const fireIntensity = (frame - 3) / 3;
            ctx.save();
            ctx.translate(26 * scale, 0);

            // Fire particles
            for (let i = 0; i < 10; i++) {
                const fireGradient = ctx.createRadialGradient(
                    i * 4 * scale,
                    (Math.random() - 0.5) * 6 * scale,
                    0,
                    i * 4 * scale,
                    (Math.random() - 0.5) * 6 * scale,
                    3 * scale
                );
                fireGradient.addColorStop(0, 'rgba(255, 255, 100, ' + fireIntensity + ')');
                fireGradient.addColorStop(0.5, 'rgba(255, 100, 0, ' + (fireIntensity * 0.8) + ')');
                fireGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

                ctx.fillStyle = fireGradient;
                ctx.beginPath();
                ctx.arc(
                    i * 4 * scale,
                    (Math.random() - 0.5) * 8 * scale,
                    3 * scale,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            }

            ctx.restore();
        }

        ctx.restore();
    }

    // Add details and highlights
    addDetails(ctx, scale) {
        // Spine ridges
        ctx.fillStyle = '#FFD700';
        for (let i = -15; i < 20; i += 5) {
            ctx.beginPath();
            ctx.moveTo(i * scale, -12 * scale);
            ctx.lineTo(i * scale - 2 * scale, -8 * scale);
            ctx.lineTo(i * scale + 2 * scale, -8 * scale);
            ctx.fill();
        }

        // Highlights for shine
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(-5 * scale, -5 * scale, 8 * scale, Math.PI * 0.7, Math.PI * 1.3);
        ctx.stroke();
    }

    // Draw warrior/player character
    drawWarriorBody(ctx, size, direction, animation, frame) {
        const centerX = size / 2;
        const centerY = size / 2;
        const scale = size / 80;

        ctx.save();
        ctx.translate(centerX, centerY);

        const rotations = {
            'E': 0, 'NE': -45, 'N': -90, 'NW': -135,
            'W': 180, 'SW': 135, 'S': 90, 'SE': 45
        };
        ctx.rotate((rotations[direction] || 0) * Math.PI / 180);

        const scaleX = ['W', 'NW', 'SW'].includes(direction) ? -1 : 1;
        ctx.scale(scaleX, 1);

        // Walking animation
        const walkCycle = animation === 'walk' ? Math.sin(frame * 0.5) * 5 : 0;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 25 * scale, 12 * scale, 5 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs
        this.drawWarriorLegs(ctx, scale, walkCycle);

        // Body/Armor
        ctx.fillStyle = '#4A5568';
        ctx.beginPath();
        ctx.ellipse(0, 0, 12 * scale, 18 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Armor plates
        ctx.strokeStyle = '#718096';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, -5 * scale, 10 * scale, 0, Math.PI, true);
        ctx.stroke();

        // Shield (left arm)
        ctx.save();
        ctx.translate(-10 * scale, 0);
        ctx.fillStyle = '#3182CE';
        ctx.beginPath();
        ctx.arc(0, 0, 8 * scale, -Math.PI / 4, Math.PI / 4);
        ctx.lineTo(0, 0);
        ctx.fill();

        // Shield emblem
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(0, 0, 3 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Sword (right arm)
        if (animation === 'attack') {
            ctx.save();
            ctx.translate(12 * scale, -10 * scale);
            ctx.rotate((frame / 6 * 90) * Math.PI / 180);

            // Blade
            ctx.fillStyle = '#E2E8F0';
            ctx.fillRect(-2 * scale, -15 * scale, 4 * scale, 20 * scale);

            // Edge highlight
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(-2 * scale, -15 * scale, 1 * scale, 20 * scale);

            // Hilt
            ctx.fillStyle = '#B8860B';
            ctx.fillRect(-3 * scale, 5 * scale, 6 * scale, 4 * scale);

            // Pommel
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(0, 8 * scale, 2 * scale, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        } else {
            ctx.fillStyle = '#A0AEC0';
            ctx.fillRect(10 * scale, -5 * scale, 3 * scale, 12 * scale);
        }

        // Head/Helmet
        ctx.fillStyle = '#2D3748';
        ctx.beginPath();
        ctx.arc(0, -20 * scale, 8 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Helmet visor
        ctx.fillStyle = '#1A202C';
        ctx.fillRect(-6 * scale, -22 * scale, 12 * scale, 4 * scale);

        // Eye glow
        ctx.fillStyle = '#60A5FA';
        ctx.beginPath();
        ctx.arc(2 * scale, -20 * scale, 2 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Plume
        ctx.fillStyle = '#DC2626';
        ctx.beginPath();
        ctx.moveTo(0, -28 * scale);
        ctx.quadraticCurveTo(-3 * scale, -35 * scale, 0, -32 * scale);
        ctx.quadraticCurveTo(3 * scale, -35 * scale, 0, -28 * scale);
        ctx.fill();

        ctx.restore();
    }

    // Warrior legs
    drawWarriorLegs(ctx, scale, walkCycle) {
        // Left leg
        ctx.fillStyle = '#4A5568';
        ctx.save();
        ctx.translate(-5 * scale, 15 * scale);
        ctx.rotate((walkCycle) * Math.PI / 180);
        ctx.fillRect(-3 * scale, 0, 6 * scale, 12 * scale);

        // Boot
        ctx.fillStyle = '#1A202C';
        ctx.fillRect(-4 * scale, 10 * scale, 8 * scale, 4 * scale);
        ctx.restore();

        // Right leg
        ctx.save();
        ctx.translate(5 * scale, 15 * scale);
        ctx.rotate((-walkCycle) * Math.PI / 180);
        ctx.fillStyle = '#4A5568';
        ctx.fillRect(-3 * scale, 0, 6 * scale, 12 * scale);

        // Boot
        ctx.fillStyle = '#1A202C';
        ctx.fillRect(-4 * scale, 10 * scale, 8 * scale, 4 * scale);
        ctx.restore();
    }

    // Draw monster sprites
    drawMonsterBody(ctx, size, direction, animation, frame, type) {
        const centerX = size / 2;
        const centerY = size / 2;
        const scale = size / 60;

        ctx.save();
        ctx.translate(centerX, centerY);

        const rotations = {
            'E': 0, 'NE': -45, 'N': -90, 'NW': -135,
            'W': 180, 'SW': 135, 'S': 90, 'SE': 45
        };
        ctx.rotate((rotations[direction] || 0) * Math.PI / 180);

        const scaleX = ['W', 'NW', 'SW'].includes(direction) ? -1 : 1;
        ctx.scale(scaleX, 1);

        // Different monsters
        if (type === 'wolf') {
            this.drawWolf(ctx, scale, animation, frame);
        } else if (type === 'goblin') {
            this.drawGoblin(ctx, scale, animation, frame);
        } else if (type === 'orc') {
            this.drawOrc(ctx, scale, animation, frame);
        } else if (type === 'troll') {
            this.drawTroll(ctx, scale, animation, frame);
        }

        ctx.restore();
    }

    // Wolf sprite
    drawWolf(ctx, scale, animation, frame) {
        const walkCycle = animation === 'walk' ? Math.sin(frame * 0.5) * 3 : 0;

        // Body
        ctx.fillStyle = '#4A4A4A';
        ctx.beginPath();
        ctx.ellipse(0, 0, 20 * scale, 12 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Fur texture
        ctx.strokeStyle = '#363636';
        for (let i = -15; i < 15; i += 3) {
            ctx.beginPath();
            ctx.moveTo(i * scale, -8 * scale);
            ctx.lineTo(i * scale, 8 * scale);
            ctx.stroke();
        }

        // Legs
        for (let i = 0; i < 4; i++) {
            const x = (i < 2 ? -10 : 10) * scale;
            const phase = i % 2 === 0 ? walkCycle : -walkCycle;

            ctx.fillStyle = '#3A3A3A';
            ctx.fillRect(x - 2 * scale, 8 * scale + phase, 4 * scale, 10 * scale);

            // Paw
            ctx.fillStyle = '#2A2A2A';
            ctx.beginPath();
            ctx.arc(x, 18 * scale + phase, 3 * scale, 0, Math.PI * 2);
            ctx.fill();
        }

        // Head
        ctx.fillStyle = '#4A4A4A';
        ctx.beginPath();
        ctx.ellipse(18 * scale, -3 * scale, 10 * scale, 8 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Snout
        ctx.fillStyle = '#3A3A3A';
        ctx.beginPath();
        ctx.ellipse(25 * scale, 0, 5 * scale, 4 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Ears
        ctx.fillStyle = '#4A4A4A';
        ctx.beginPath();
        ctx.moveTo(12 * scale, -10 * scale);
        ctx.lineTo(10 * scale, -18 * scale);
        ctx.lineTo(15 * scale, -12 * scale);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(20 * scale, -10 * scale);
        ctx.lineTo(18 * scale, -18 * scale);
        ctx.lineTo(23 * scale, -12 * scale);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#FFD700';
        ctx.shadowBlur = 3;
        ctx.shadowColor = '#FFD700';
        ctx.beginPath();
        ctx.arc(20 * scale, -5 * scale, 2 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Pupil
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(20 * scale, -5 * scale, 1 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Tail
        ctx.save();
        ctx.translate(-20 * scale, 0);
        ctx.rotate((Math.sin(frame * 0.3) * 20) * Math.PI / 180);
        ctx.fillStyle = '#4A4A4A';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-10 * scale, -5 * scale, -15 * scale, 5 * scale);
        ctx.lineTo(-15 * scale, -5 * scale);
        ctx.quadraticCurveTo(-10 * scale, 0, 0, 0);
        ctx.fill();
        ctx.restore();
    }

    // Goblin sprite
    drawGoblin(ctx, scale, animation, frame) {
        const bounce = animation === 'walk' ? Math.abs(Math.sin(frame * 0.5)) * 5 : 0;

        ctx.save();
        ctx.translate(0, -bounce);

        // Legs
        ctx.fillStyle = '#228B22';
        ctx.fillRect(-5 * scale, 10 * scale, 4 * scale, 12 * scale);
        ctx.fillRect(1 * scale, 10 * scale, 4 * scale, 12 * scale);

        // Body
        ctx.fillStyle = '#654321';
        ctx.fillRect(-8 * scale, 0, 16 * scale, 12 * scale);

        // Arms
        ctx.fillStyle = '#228B22';
        ctx.fillRect(-12 * scale, 2 * scale, 4 * scale, 10 * scale);
        ctx.fillRect(8 * scale, 2 * scale, 4 * scale, 10 * scale);

        // Head
        ctx.fillStyle = '#32CD32';
        ctx.beginPath();
        ctx.arc(0, -8 * scale, 10 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Ears
        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.ellipse(-8 * scale, -10 * scale, 5 * scale, 3 * scale, -30 * Math.PI / 180, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(8 * scale, -10 * scale, 5 * scale, 3 * scale, 30 * Math.PI / 180, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.arc(-3 * scale, -10 * scale, 2 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(3 * scale, -10 * scale, 2 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Nose
        ctx.fillStyle = '#1F6B1F';
        ctx.beginPath();
        ctx.arc(0, -6 * scale, 2 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Weapon (club)
        if (animation === 'attack') {
            ctx.save();
            ctx.translate(10 * scale, 5 * scale);
            ctx.rotate((frame / 6 * 90) * Math.PI / 180);

            ctx.fillStyle = '#654321';
            ctx.fillRect(-2 * scale, -12 * scale, 4 * scale, 15 * scale);

            ctx.fillStyle = '#4A4A4A';
            ctx.beginPath();
            ctx.arc(0, -14 * scale, 4 * scale, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        ctx.restore();
    }

    // Orc sprite
    drawOrc(ctx, scale, animation, frame) {
        const walkCycle = animation === 'walk' ? Math.sin(frame * 0.5) * 4 : 0;

        // Legs
        ctx.fillStyle = '#654321';
        ctx.fillRect(-6 * scale, 12 * scale + walkCycle, 5 * scale, 15 * scale);
        ctx.fillRect(1 * scale, 12 * scale - walkCycle, 5 * scale, 15 * scale);

        // Body
        const bodyGradient = ctx.createLinearGradient(0, 0, 0, 15 * scale);
        bodyGradient.addColorStop(0, '#556B2F');
        bodyGradient.addColorStop(1, '#3D5229');
        ctx.fillStyle = bodyGradient;
        ctx.fillRect(-10 * scale, 0, 20 * scale, 15 * scale);

        // Armor plates
        ctx.fillStyle = '#4A4A4A';
        ctx.fillRect(-8 * scale, 2 * scale, 16 * scale, 3 * scale);
        ctx.fillRect(-8 * scale, 8 * scale, 16 * scale, 3 * scale);

        // Arms
        ctx.fillStyle = '#6B8E23';
        ctx.fillRect(-15 * scale, 3 * scale, 5 * scale, 12 * scale);
        ctx.fillRect(10 * scale, 3 * scale, 5 * scale, 12 * scale);

        // Hands
        ctx.fillStyle = '#556B2F';
        ctx.beginPath();
        ctx.arc(-12 * scale, 15 * scale, 3 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(12 * scale, 15 * scale, 3 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.fillStyle = '#6B8E23';
        ctx.beginPath();
        ctx.ellipse(0, -10 * scale, 12 * scale, 10 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Tusks
        ctx.fillStyle = '#FFFFF0';
        ctx.beginPath();
        ctx.moveTo(-5 * scale, -5 * scale);
        ctx.lineTo(-7 * scale, 0);
        ctx.lineTo(-4 * scale, -2 * scale);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(5 * scale, -5 * scale);
        ctx.lineTo(7 * scale, 0);
        ctx.lineTo(4 * scale, -2 * scale);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#8B0000';
        ctx.beginPath();
        ctx.arc(-4 * scale, -12 * scale, 2 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(4 * scale, -12 * scale, 2 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Eyebrows (angry)
        ctx.strokeStyle = '#3D5229';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-7 * scale, -14 * scale);
        ctx.lineTo(-2 * scale, -13 * scale);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(7 * scale, -14 * scale);
        ctx.lineTo(2 * scale, -13 * scale);
        ctx.stroke();

        // Axe
        if (animation === 'attack') {
            ctx.save();
            ctx.translate(12 * scale, 8 * scale);
            ctx.rotate((frame / 6 * 120) * Math.PI / 180);

            // Handle
            ctx.fillStyle = '#654321';
            ctx.fillRect(-2 * scale, -18 * scale, 4 * scale, 25 * scale);

            // Blade
            ctx.fillStyle = '#C0C0C0';
            ctx.beginPath();
            ctx.moveTo(-8 * scale, -20 * scale);
            ctx.lineTo(8 * scale, -20 * scale);
            ctx.lineTo(4 * scale, -15 * scale);
            ctx.lineTo(-4 * scale, -15 * scale);
            ctx.fill();

            // Blade edge
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.moveTo(-8 * scale, -20 * scale);
            ctx.lineTo(8 * scale, -20 * scale);
            ctx.lineTo(0, -18 * scale);
            ctx.fill();

            ctx.restore();
        }
    }

    // Troll sprite
    drawTroll(ctx, scale, animation, frame) {
        const sway = animation === 'walk' ? Math.sin(frame * 0.3) * 5 : 0;

        ctx.save();
        ctx.rotate(sway * Math.PI / 180);

        // Legs (big and stumpy)
        ctx.fillStyle = '#4A6741';
        ctx.fillRect(-10 * scale, 18 * scale, 8 * scale, 18 * scale);
        ctx.fillRect(2 * scale, 18 * scale, 8 * scale, 18 * scale);

        // Feet
        ctx.fillStyle = '#3A5431';
        ctx.beginPath();
        ctx.ellipse(-6 * scale, 36 * scale, 6 * scale, 4 * scale, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(6 * scale, 36 * scale, 6 * scale, 4 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body (large and hunched)
        const bodyGradient = ctx.createRadialGradient(0, 5 * scale, 0, 0, 5 * scale, 25 * scale);
        bodyGradient.addColorStop(0, '#5A7C52');
        bodyGradient.addColorStop(1, '#4A6741');
        ctx.fillStyle = bodyGradient;
        ctx.beginPath();
        ctx.ellipse(0, 5 * scale, 20 * scale, 18 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Belly
        ctx.fillStyle = '#6B8E5F';
        ctx.beginPath();
        ctx.ellipse(0, 10 * scale, 15 * scale, 12 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Arms (long)
        ctx.fillStyle = '#5A7C52';
        ctx.save();
        ctx.translate(-18 * scale, 0);
        ctx.rotate(-20 * Math.PI / 180);
        ctx.fillRect(-4 * scale, 0, 8 * scale, 25 * scale);

        // Hand
        ctx.fillStyle = '#4A6741';
        ctx.beginPath();
        ctx.arc(0, 25 * scale, 5 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Fingers
        for (let i = 0; i < 4; i++) {
            ctx.fillRect(-4 * scale + i * 2 * scale, 28 * scale, 1.5 * scale, 3 * scale);
        }
        ctx.restore();

        ctx.save();
        ctx.translate(18 * scale, 0);
        ctx.rotate(20 * Math.PI / 180);
        ctx.fillStyle = '#5A7C52';
        ctx.fillRect(-4 * scale, 0, 8 * scale, 25 * scale);

        ctx.fillStyle = '#4A6741';
        ctx.beginPath();
        ctx.arc(0, 25 * scale, 5 * scale, 0, Math.PI * 2);
        ctx.fill();

        for (let i = 0; i < 4; i++) {
            ctx.fillRect(-4 * scale + i * 2 * scale, 28 * scale, 1.5 * scale, 3 * scale);
        }
        ctx.restore();

        // Head (large and ugly)
        ctx.fillStyle = '#5A7C52';
        ctx.beginPath();
        ctx.ellipse(0, -15 * scale, 14 * scale, 12 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Warts/bumps
        ctx.fillStyle = '#4A6741';
        ctx.beginPath();
        ctx.arc(-5 * scale, -18 * scale, 3 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(6 * scale, -20 * scale, 2 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, -10 * scale, 2.5 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Eyes (small and beady)
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.arc(-5 * scale, -17 * scale, 2 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(5 * scale, -17 * scale, 2 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Pupils
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(-5 * scale, -17 * scale, 1 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(5 * scale, -17 * scale, 1 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Large nose
        ctx.fillStyle = '#4A6741';
        ctx.beginPath();
        ctx.ellipse(0, -12 * scale, 4 * scale, 6 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Nostrils
        ctx.fillStyle = '#2A3621';
        ctx.beginPath();
        ctx.arc(-2 * scale, -10 * scale, 1 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(2 * scale, -10 * scale, 1 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Mouth (wide and ugly)
        ctx.strokeStyle = '#2A3621';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, -8 * scale, 6 * scale, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();

        // Teeth
        ctx.fillStyle = '#FFFFF0';
        for (let i = -3; i <= 3; i++) {
            if (i % 2 === 0) {
                ctx.fillRect(i * 2 * scale, -8 * scale, 1.5 * scale, 3 * scale);
            }
        }

        // Hair (scraggly)
        ctx.strokeStyle = '#2A3621';
        ctx.lineWidth = 2;
        for (let i = -10; i <= 10; i += 4) {
            ctx.beginPath();
            ctx.moveTo(i * scale, -24 * scale);
            ctx.lineTo(i * scale + (Math.random() - 0.5) * 4 * scale, -28 * scale);
            ctx.stroke();
        }

        ctx.restore();
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DragonSpriteRenderer;
}
