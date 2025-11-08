/**
 * Professional Sprite Rendering System
 * Creates high-quality, animated sprites programmatically
 */

class SpriteRenderer {
    constructor() {
        this.cache = new Map();
        this.directions = ['s', 'se', 'e', 'ne', 'n', 'nw', 'w', 'sw']; // 8 directions
    }

    /**
     * Create a temporary canvas for sprite rendering
     */
    createCanvas(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return { canvas, ctx: canvas.getContext('2d') };
    }

    /**
     * Draw Desert Hunter Character (Player)
     * Professional quality with detailed armor and weapons
     */
    drawDesertHunter(direction, frame, animState = 'idle') {
        const key = `hunter_${direction}_${animState}_${frame}`;
        if (this.cache.has(key)) return this.cache.get(key);

        const size = 96;
        const { canvas, ctx } = this.createCanvas(size, size);
        const cx = size / 2;
        const cy = size / 2;

        ctx.save();

        // Apply rotation based on direction
        const angle = this.getDirectionAngle(direction);
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.translate(-cx, -cy);

        // Animation offset
        const walkBob = animState === 'walk' ? Math.sin(frame * Math.PI / 2) * 2 : 0;
        const attackLunge = animState === 'attack' ? frame * 3 : 0;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(cx, cy + 35, 18, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body position
        const bodyY = cy - 10 + walkBob;

        // Legs (walking animation)
        if (animState === 'walk') {
            const legSwing = Math.sin(frame * Math.PI / 2) * 8;

            // Back leg
            ctx.strokeStyle = '#8B4513';
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(cx - 6, bodyY + 10);
            ctx.lineTo(cx - 6 - legSwing, bodyY + 20);
            ctx.stroke();

            // Front leg
            ctx.beginPath();
            ctx.moveTo(cx + 6, bodyY + 10);
            ctx.lineTo(cx + 6 + legSwing, bodyY + 20);
            ctx.stroke();
        }

        // Torso - Desert Cloak
        const gradient = ctx.createLinearGradient(cx - 15, bodyY - 15, cx + 15, bodyY + 15);
        gradient.addColorStop(0, '#D4A574');
        gradient.addColorStop(0.5, '#C8956D');
        gradient.addColorStop(1, '#B8865E');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(cx, bodyY, 16, 22, 0, 0, Math.PI * 2);
        ctx.fill();

        // Armor details
        ctx.strokeStyle = '#8B6914';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, bodyY - 5, 14, 0, Math.PI * 2);
        ctx.stroke();

        // Belt
        ctx.fillStyle = '#654321';
        ctx.fillRect(cx - 16, bodyY + 5, 32, 4);

        // Head with turban
        ctx.fillStyle = '#E8C4A0';
        ctx.beginPath();
        ctx.arc(cx, bodyY - 20, 12, 0, Math.PI * 2);
        ctx.fill();

        // Turban
        ctx.fillStyle = '#C19A6B';
        ctx.beginPath();
        ctx.ellipse(cx, bodyY - 25, 14, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#2C1810';
        ctx.fillRect(cx - 6, bodyY - 22, 3, 2);
        ctx.fillRect(cx + 3, bodyY - 22, 3, 2);

        // Weapon - Spear/Sword
        if (animState === 'attack') {
            ctx.strokeStyle = '#C0C0C0';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cx + 20, bodyY - 10);
            ctx.lineTo(cx + 35 + attackLunge, bodyY - 20);
            ctx.stroke();

            // Blade
            ctx.fillStyle = '#E8E8E8';
            ctx.beginPath();
            ctx.moveTo(cx + 35 + attackLunge, bodyY - 20);
            ctx.lineTo(cx + 45 + attackLunge, bodyY - 22);
            ctx.lineTo(cx + 43 + attackLunge, bodyY - 18);
            ctx.fill();
        } else {
            // Holstered weapon
            ctx.strokeStyle = '#8B7355';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx - 10, bodyY + 8);
            ctx.lineTo(cx - 10, bodyY + 20);
            ctx.stroke();
        }

        // Shield on back
        if (animState !== 'attack') {
            ctx.fillStyle = '#8B4513';
            ctx.beginPath();
            ctx.arc(cx - 18, bodyY, 8, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = '#DAA520';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(cx - 18, bodyY, 6, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.restore();

        this.cache.set(key, canvas);
        return canvas;
    }

    /**
     * Draw Scorpion Enemy - Multiple variants
     * Hyper-realistic scorpion with detailed segments
     */
    drawScorpion(variant, direction, frame, animState = 'idle') {
        const key = `scorpion_${variant}_${direction}_${animState}_${frame}`;
        if (this.cache.has(key)) return this.cache.get(key);

        const sizes = {
            'baby': 48,
            'soldier': 72,
            'warrior': 96,
            'giant': 128,
            'alpha': 160,
            'boss': 200
        };

        const size = sizes[variant] || 72;
        const { canvas, ctx } = this.createCanvas(size, size);
        const cx = size / 2;
        const cy = size / 2;

        ctx.save();

        // Direction rotation
        const angle = this.getDirectionAngle(direction);
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.translate(-cx, -cy);

        // Animation
        const walkWave = animState === 'walk' ? Math.sin(frame * Math.PI / 2) * 0.1 : 0;
        const attackLunge = animState === 'attack' ? frame * 0.2 : 0;

        // Scale based on variant
        const scale = size / 72;
        const bodyLength = 25 * scale;
        const bodyWidth = 18 * scale;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.ellipse(cx, cy + bodyLength, bodyWidth, bodyWidth * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Color scheme based on variant
        const colors = {
            'baby': { body: '#D2B48C', segment: '#C9A87C', claw: '#B8976C' },
            'soldier': { body: '#8B7355', segment: '#7A6449', claw: '#6A543A' },
            'warrior': { body: '#654321', segment: '#543210', claw: '#432100' },
            'giant': { body: '#4A3728', segment: '#3A2718', claw: '#2A1708' },
            'alpha': { body: '#2C1810', segment: '#1C0800', claw: '#8B0000' },
            'boss': { body: '#1A0A00', segment: '#0A0000', claw: '#DC143C' }
        };

        const color = colors[variant] || colors['soldier'];

        // Tail segments with curl
        const tailSegments = 6;
        const tailCurl = variant === 'boss' ? 0.3 : 0.2;

        for (let i = 0; i < tailSegments; i++) {
            const t = i / tailSegments;
            const curlAngle = t * Math.PI * tailCurl + walkWave * Math.PI;
            const segmentX = cx + Math.sin(curlAngle) * bodyLength * (1 - t);
            const segmentY = cy - bodyLength * 0.8 - Math.cos(curlAngle) * bodyLength * t;
            const segmentSize = bodyWidth * (1 - t * 0.6);

            // Segment gradient
            const gradient = ctx.createRadialGradient(segmentX, segmentY, 0, segmentX, segmentY, segmentSize);
            gradient.addColorStop(0, color.segment);
            gradient.addColorStop(1, color.body);

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(segmentX, segmentY, segmentSize, 0, Math.PI * 2);
            ctx.fill();

            // Segment ridges
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(segmentX, segmentY, segmentSize * 0.8, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Stinger at tail end
        const lastT = 1;
        const lastCurlAngle = lastT * Math.PI * tailCurl + walkWave * Math.PI;
        const stingerX = cx + Math.sin(lastCurlAngle) * bodyLength * 0.3;
        const stingerY = cy - bodyLength * 0.8 - Math.cos(lastCurlAngle) * bodyLength;

        ctx.fillStyle = variant === 'boss' || variant === 'alpha' ? '#8B0000' : '#2C1810';
        ctx.beginPath();
        ctx.moveTo(stingerX, stingerY);
        ctx.lineTo(stingerX - 3 * scale, stingerY - 8 * scale);
        ctx.lineTo(stingerX + 3 * scale, stingerY - 8 * scale);
        ctx.closePath();
        ctx.fill();

        // Main body (cephalothorax)
        const bodyGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, bodyWidth);
        bodyGradient.addColorStop(0, color.body);
        bodyGradient.addColorStop(0.7, color.segment);
        bodyGradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');

        ctx.fillStyle = bodyGradient;
        ctx.beginPath();
        ctx.ellipse(cx, cy, bodyWidth, bodyLength, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body texture
        for (let i = 0; i < 3; i++) {
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.2 - i * 0.05})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(cx, cy - bodyLength * 0.3 + i * bodyLength * 0.3,
                       bodyWidth * 0.9, bodyLength * 0.25, 0, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Legs (8 legs total, 4 on each side)
        const legCount = 4;
        const legLength = bodyWidth * 1.5;

        for (let i = 0; i < legCount; i++) {
            const side = i < legCount / 2 ? 1 : -1;
            const legIndex = i % (legCount / 2);
            const legY = cy - bodyLength * 0.4 + legIndex * bodyLength * 0.4;
            const legSwing = animState === 'walk' ?
                Math.sin(frame * Math.PI / 2 + legIndex * Math.PI / 2) * 0.3 : 0;

            ctx.strokeStyle = color.segment;
            ctx.lineWidth = 2 * scale;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            ctx.beginPath();
            ctx.moveTo(cx, legY);
            const midX = cx + side * legLength * 0.6 + legSwing * side * 5;
            const midY = legY + legLength * 0.3;
            ctx.lineTo(midX, midY);
            ctx.lineTo(midX + side * legLength * 0.4, midY + legLength * 0.4);
            ctx.stroke();
        }

        // Claws (pedipalps)
        const clawSize = bodyWidth * 0.8;
        const clawOffset = animState === 'attack' ? attackLunge * 10 : 0;

        // Left claw
        ctx.fillStyle = color.claw;
        ctx.beginPath();
        ctx.arc(cx - bodyWidth * 0.8 - clawOffset, cy - bodyLength * 0.5, clawSize, 0, Math.PI * 2);
        ctx.fill();

        // Claw pincer
        ctx.strokeStyle = color.segment;
        ctx.lineWidth = 3 * scale;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cx - bodyWidth * 0.8 - clawOffset - clawSize * 0.5, cy - bodyLength * 0.5 - clawSize * 0.3);
        ctx.lineTo(cx - bodyWidth * 0.8 - clawOffset - clawSize * 0.8, cy - bodyLength * 0.5 - clawSize * 0.5);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx - bodyWidth * 0.8 - clawOffset - clawSize * 0.5, cy - bodyLength * 0.5 + clawSize * 0.3);
        ctx.lineTo(cx - bodyWidth * 0.8 - clawOffset - clawSize * 0.8, cy - bodyLength * 0.5 + clawSize * 0.5);
        ctx.stroke();

        // Right claw
        ctx.fillStyle = color.claw;
        ctx.beginPath();
        ctx.arc(cx + bodyWidth * 0.8 + clawOffset, cy - bodyLength * 0.5, clawSize, 0, Math.PI * 2);
        ctx.fill();

        // Claw pincer
        ctx.beginPath();
        ctx.moveTo(cx + bodyWidth * 0.8 + clawOffset + clawSize * 0.5, cy - bodyLength * 0.5 - clawSize * 0.3);
        ctx.lineTo(cx + bodyWidth * 0.8 + clawOffset + clawSize * 0.8, cy - bodyLength * 0.5 - clawSize * 0.5);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx + bodyWidth * 0.8 + clawOffset + clawSize * 0.5, cy - bodyLength * 0.5 + clawSize * 0.3);
        ctx.lineTo(cx + bodyWidth * 0.8 + clawOffset + clawSize * 0.8, cy - bodyLength * 0.5 + clawSize * 0.5);
        ctx.stroke();

        // Eyes (multiple small eyes on top)
        ctx.fillStyle = '#000000';
        const eyePositions = [
            [-4, -4], [-2, -6], [2, -6], [4, -4]
        ];
        eyePositions.forEach(([ex, ey]) => {
            ctx.beginPath();
            ctx.arc(cx + ex * scale, cy - bodyLength * 0.5 + ey * scale, 1.5 * scale, 0, Math.PI * 2);
            ctx.fill();
        });

        // Boss/Alpha special effects
        if (variant === 'boss' || variant === 'alpha') {
            ctx.strokeStyle = 'rgba(220, 20, 60, 0.3)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(cx, cy, bodyWidth + 5, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.restore();

        this.cache.set(key, canvas);
        return canvas;
    }

    /**
     * Draw environmental elements
     */
    drawEnvironment(type, variant = 0) {
        const key = `env_${type}_${variant}`;
        if (this.cache.has(key)) return this.cache.get(key);

        const size = 128;
        const { canvas, ctx } = this.createCanvas(size, size);
        const cx = size / 2;
        const cy = size / 2;

        switch(type) {
            case 'cactus':
                this.drawCactus(ctx, cx, cy, variant);
                break;
            case 'rock':
                this.drawRock(ctx, cx, cy, variant);
                break;
            case 'skull':
                this.drawSkull(ctx, cx, cy);
                break;
            case 'oasis':
                this.drawOasis(ctx, cx, cy);
                break;
            case 'pyramid':
                this.drawPyramid(ctx, cx, cy);
                break;
            case 'sand_dune':
                this.drawSandDune(ctx, cx, cy, variant);
                break;
        }

        this.cache.set(key, canvas);
        return canvas;
    }

    drawCactus(ctx, cx, cy, variant) {
        // Main trunk
        const gradient = ctx.createLinearGradient(cx - 15, cy, cx + 15, cy);
        gradient.addColorStop(0, '#2D5016');
        gradient.addColorStop(0.5, '#3A6B1F');
        gradient.addColorStop(1, '#2D5016');

        ctx.fillStyle = gradient;
        ctx.fillRect(cx - 12, cy - 40, 24, 60);

        // Ridges
        ctx.strokeStyle = '#1C3A0F';
        ctx.lineWidth = 2;
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(cx - 12 + i * 8, cy - 40);
            ctx.lineTo(cx - 12 + i * 8, cy + 20);
            ctx.stroke();
        }

        // Arms
        if (variant % 2 === 0) {
            // Left arm
            ctx.fillStyle = gradient;
            ctx.fillRect(cx - 28, cy - 10, 16, 30);
            ctx.fillRect(cx - 28, cy - 10, 20, 16);
        }
        if (variant > 1) {
            // Right arm
            ctx.fillRect(cx + 12, cy, 16, 30);
            ctx.fillRect(cx + 8, cy, 20, 16);
        }

        // Spines
        ctx.strokeStyle = '#8B8B00';
        ctx.lineWidth = 1;
        for (let i = 0; i < 20; i++) {
            const x = cx - 12 + Math.random() * 24;
            const y = cy - 40 + Math.random() * 60;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.random() * 6 - 3, y - 5);
            ctx.stroke();
        }

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(cx, cy + 22, 15, 4, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    drawRock(ctx, cx, cy, variant) {
        const rockSize = 30 + variant * 10;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(cx, cy + rockSize * 0.6, rockSize * 0.8, rockSize * 0.2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Rock gradient
        const gradient = ctx.createRadialGradient(cx - 10, cy - 10, 0, cx, cy, rockSize);
        gradient.addColorStop(0, '#9C8A7C');
        gradient.addColorStop(0.5, '#7D6E63');
        gradient.addColorStop(1, '#5D4E43');

        // Irregular rock shape
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(cx, cy - rockSize);
        for (let i = 0; i <= 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const radius = rockSize * (0.8 + Math.random() * 0.4);
            ctx.lineTo(
                cx + Math.cos(angle) * radius,
                cy + Math.sin(angle) * radius
            );
        }
        ctx.closePath();
        ctx.fill();

        // Cracks
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(cx + Math.random() * 20 - 10, cy + Math.random() * 20 - 10);
            ctx.lineTo(cx + Math.random() * 20 - 10, cy + Math.random() * 20 - 10);
            ctx.stroke();
        }

        // Highlights
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(cx - 8, cy - 8, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    drawSkull(ctx, cx, cy) {
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(cx, cy + 18, 15, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Skull
        ctx.fillStyle = '#E8DCC8';
        ctx.beginPath();
        ctx.arc(cx, cy, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(cx - 8, cy + 5, 16, 10);

        // Eye sockets
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(cx - 6, cy - 2, 4, 0, Math.PI * 2);
        ctx.arc(cx + 6, cy - 2, 4, 0, Math.PI * 2);
        ctx.fill();

        // Nose
        ctx.beginPath();
        ctx.moveTo(cx, cy + 3);
        ctx.lineTo(cx - 3, cy + 8);
        ctx.lineTo(cx + 3, cy + 8);
        ctx.closePath();
        ctx.fill();

        // Teeth
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(cx - 8 + i * 4, cy + 10);
            ctx.lineTo(cx - 8 + i * 4, cy + 14);
            ctx.stroke();
        }

        // Cracks
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.moveTo(cx + 8, cy - 5);
        ctx.lineTo(cx + 12, cy);
        ctx.stroke();
    }

    drawSandDune(ctx, cx, cy, variant) {
        const width = 80 + variant * 20;
        const height = 30 + variant * 10;

        // Gradient sand
        const gradient = ctx.createLinearGradient(cx - width/2, cy - height, cx + width/2, cy);
        gradient.addColorStop(0, '#F4E4C1');
        gradient.addColorStop(0.5, '#E8D4A8');
        gradient.addColorStop(1, '#D4C4A8');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(cx - width/2, cy);
        ctx.quadraticCurveTo(cx - width/4, cy - height, cx, cy - height * 0.8);
        ctx.quadraticCurveTo(cx + width/4, cy - height * 0.6, cx + width/2, cy);
        ctx.closePath();
        ctx.fill();

        // Sand texture
        ctx.fillStyle = 'rgba(212, 196, 168, 0.3)';
        for (let i = 0; i < 20; i++) {
            ctx.beginPath();
            ctx.arc(
                cx - width/2 + Math.random() * width,
                cy - Math.random() * height,
                1,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    }

    drawOasis(ctx, cx, cy) {
        // Water
        const waterGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
        waterGradient.addColorStop(0, '#4A90A4');
        waterGradient.addColorStop(0.7, '#3A7A94');
        waterGradient.addColorStop(1, '#2A6A84');

        ctx.fillStyle = waterGradient;
        ctx.beginPath();
        ctx.ellipse(cx, cy, 40, 30, 0, 0, Math.PI * 2);
        ctx.fill();

        // Water shimmer
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.ellipse(cx - 10, cy - 5, 15, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Palm tree
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx + 35, cy - 10);
        ctx.lineTo(cx + 30, cy - 40);
        ctx.stroke();

        // Palm leaves
        ctx.strokeStyle = '#228B22';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(cx + 30, cy - 40);
            ctx.lineTo(
                cx + 30 + Math.cos(angle) * 20,
                cy - 40 + Math.sin(angle) * 20
            );
            ctx.stroke();
        }
    }

    drawPyramid(ctx, cx, cy) {
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.moveTo(cx - 50, cy + 20);
        ctx.lineTo(cx + 50, cy + 20);
        ctx.lineTo(cx + 30, cy + 30);
        ctx.lineTo(cx - 30, cy + 30);
        ctx.closePath();
        ctx.fill();

        // Main pyramid structure
        const pyramidGradient = ctx.createLinearGradient(cx - 40, cy - 40, cx + 40, cy + 20);
        pyramidGradient.addColorStop(0, '#E8D4A8');
        pyramidGradient.addColorStop(0.5, '#D4C098');
        pyramidGradient.addColorStop(1, '#C0AC88');

        // Front face
        ctx.fillStyle = pyramidGradient;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 50);
        ctx.lineTo(cx - 40, cy + 20);
        ctx.lineTo(cx + 40, cy + 20);
        ctx.closePath();
        ctx.fill();

        // Left face (darker)
        ctx.fillStyle = '#B49C78';
        ctx.beginPath();
        ctx.moveTo(cx, cy - 50);
        ctx.lineTo(cx - 40, cy + 20);
        ctx.lineTo(cx, cy + 20);
        ctx.closePath();
        ctx.fill();

        // Stone blocks
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 8; i++) {
            const y = cy - 40 + i * 8;
            const width = 70 - i * 8;
            ctx.beginPath();
            ctx.moveTo(cx - width/2, y);
            ctx.lineTo(cx + width/2, y);
            ctx.stroke();
        }

        // Entrance
        ctx.fillStyle = '#000000';
        ctx.fillRect(cx - 6, cy + 5, 12, 15);

        // Highlights
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.moveTo(cx, cy - 50);
        ctx.lineTo(cx + 40, cy + 20);
        ctx.lineTo(cx + 35, cy + 15);
        ctx.lineTo(cx, cy - 45);
        ctx.closePath();
        ctx.fill();
    }

    /**
     * Draw particle effects
     */
    drawEffect(type, frame) {
        const key = `effect_${type}_${frame}`;
        if (this.cache.has(key)) return this.cache.get(key);

        const size = 64;
        const { canvas, ctx } = this.createCanvas(size, size);
        const cx = size / 2;
        const cy = size / 2;

        switch(type) {
            case 'poison':
                this.drawPoisonEffect(ctx, cx, cy, frame);
                break;
            case 'attack':
                this.drawAttackEffect(ctx, cx, cy, frame);
                break;
            case 'dust':
                this.drawDustEffect(ctx, cx, cy, frame);
                break;
            case 'sandstorm':
                this.drawSandstormEffect(ctx, cx, cy, frame);
                break;
        }

        this.cache.set(key, canvas);
        return canvas;
    }

    drawPoisonEffect(ctx, cx, cy, frame) {
        const alpha = 1 - frame / 10;
        const radius = 5 + frame * 3;

        ctx.fillStyle = `rgba(138, 43, 226, ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(75, 0, 130, ${alpha * 0.4})`;
        ctx.beginPath();
        ctx.arc(cx - 5, cy - 5, radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
    }

    drawAttackEffect(ctx, cx, cy, frame) {
        const alpha = 1 - frame / 5;
        const size = 10 + frame * 8;

        ctx.strokeStyle = `rgba(255, 215, 0, ${alpha})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, size, 0, Math.PI * 2);
        ctx.stroke();

        // Slash marks
        ctx.beginPath();
        ctx.moveTo(cx - size, cy - size);
        ctx.lineTo(cx + size, cy + size);
        ctx.stroke();
    }

    drawDustEffect(ctx, cx, cy, frame) {
        const alpha = 1 - frame / 8;
        const spread = frame * 4;

        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2 + frame * 0.1;
            const x = cx + Math.cos(angle) * spread;
            const y = cy + Math.sin(angle) * spread;

            ctx.fillStyle = `rgba(212, 196, 168, ${alpha * 0.5})`;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawSandstormEffect(ctx, cx, cy, frame) {
        const alpha = 0.3 + Math.sin(frame * 0.5) * 0.2;

        for (let i = 0; i < 30; i++) {
            const x = (cx + i * 10 - frame * 20) % 64;
            const y = cy + Math.sin(i + frame * 0.3) * 20;

            ctx.fillStyle = `rgba(232, 212, 168, ${alpha})`;
            ctx.fillRect(x, y, 2, 2);
        }
    }

    /**
     * Get rotation angle for direction
     */
    getDirectionAngle(direction) {
        const angles = {
            'n': -Math.PI / 2,
            'ne': -Math.PI / 4,
            'e': 0,
            'se': Math.PI / 4,
            's': Math.PI / 2,
            'sw': 3 * Math.PI / 4,
            'w': Math.PI,
            'nw': -3 * Math.PI / 4
        };
        return angles[direction] || 0;
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
    }
}
