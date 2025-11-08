/**
 * CYBER SAMURAI - Professional Sprite Engine
 * High-quality procedural sprite generation for RPG game
 * 8-directional movement with smooth animations
 */

class SpriteEngine {
    constructor() {
        this.cache = new Map();
        this.spriteSize = 128; // Base sprite size for high quality
    }

    /**
     * Create a canvas context for sprite drawing
     */
    createCanvas(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas.getContext('2d');
    }

    /**
     * Draw Cyber Samurai character - main hero
     * Features: Neon armor, katana, futuristic helmet
     */
    drawCyberSamurai(ctx, x, y, direction, frame, action = 'idle') {
        const size = this.spriteSize;
        const centerX = x + size / 2;
        const centerY = y + size / 2;

        ctx.save();
        ctx.translate(centerX, centerY);

        // Apply rotation based on direction
        const rotations = {
            'south': 0,
            'south-west': Math.PI / 4,
            'west': Math.PI / 2,
            'north-west': 3 * Math.PI / 4,
            'north': Math.PI,
            'north-east': -3 * Math.PI / 4,
            'east': -Math.PI / 2,
            'south-east': -Math.PI / 4
        };
        ctx.rotate(rotations[direction] || 0);

        // Animation offset
        const walkBob = action === 'walk' ? Math.sin(frame * 0.5) * 3 : 0;
        const attackSwing = action === 'attack' ? Math.sin(frame * 0.8) * 15 : 0;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 45, 25, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.translate(0, walkBob);

        // === LEGS ===
        // Left leg
        ctx.fillStyle = '#1a1a3e';
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-8, 15);
        ctx.lineTo(-10, 35);
        ctx.lineTo(-8, 45);
        ctx.stroke();

        // Right leg
        ctx.beginPath();
        ctx.moveTo(8, 15);
        ctx.lineTo(10, 35);
        ctx.lineTo(8, 45);
        ctx.stroke();

        // Leg armor plates
        ctx.fillStyle = '#00ffff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ffff';

        // Left knee armor
        ctx.beginPath();
        ctx.arc(-10, 30, 4, 0, Math.PI * 2);
        ctx.fill();

        // Right knee armor
        ctx.beginPath();
        ctx.arc(10, 30, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;

        // === BODY ===
        // Torso - main armor
        const gradient = ctx.createLinearGradient(-20, -10, 20, 25);
        gradient.addColorStop(0, '#0d1b2a');
        gradient.addColorStop(0.5, '#1b263b');
        gradient.addColorStop(1, '#0d1b2a');
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(-18, 0);
        ctx.lineTo(-15, 20);
        ctx.lineTo(15, 20);
        ctx.lineTo(18, 0);
        ctx.closePath();
        ctx.fill();

        // Armor details - neon lines
        ctx.strokeStyle = '#ff00ff';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ff00ff';

        // Vertical neon lines
        ctx.beginPath();
        ctx.moveTo(-8, -5);
        ctx.lineTo(-8, 18);
        ctx.moveTo(0, -5);
        ctx.lineTo(0, 18);
        ctx.moveTo(8, -5);
        ctx.lineTo(8, 18);
        ctx.stroke();

        // Chest core (energy source)
        ctx.fillStyle = '#00ffff';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ffff';
        ctx.beginPath();
        ctx.arc(0, 5, 5, 0, Math.PI * 2);
        ctx.fill();

        // Core ring
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 5, 7, 0, Math.PI * 2);
        ctx.stroke();

        ctx.shadowBlur = 0;

        // === ARMS ===
        // Left arm
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-18, 0);
        ctx.lineTo(-25, 10);
        ctx.lineTo(-22, 20);
        ctx.stroke();

        // Right arm (sword arm)
        const swordAngle = attackSwing * Math.PI / 180;
        ctx.save();
        ctx.rotate(swordAngle);

        ctx.beginPath();
        ctx.moveTo(18, 0);
        ctx.lineTo(25, 10);
        ctx.lineTo(22, 20);
        ctx.stroke();

        // === KATANA (Cyber Sword) ===
        if (action === 'attack') {
            ctx.strokeStyle = '#ff00ff';
            ctx.lineWidth = 3;
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ff00ff';

            // Blade
            ctx.beginPath();
            ctx.moveTo(22, 20);
            ctx.lineTo(35, -10);
            ctx.stroke();

            // Blade glow
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(22, 20);
            ctx.lineTo(35, -10);
            ctx.stroke();

            // Energy particles
            for (let i = 0; i < 3; i++) {
                const px = 22 + (35 - 22) * (i / 3);
                const py = 20 + (-10 - 20) * (i / 3);
                ctx.fillStyle = `rgba(255, 0, 255, ${0.8 - i * 0.2})`;
                ctx.beginPath();
                ctx.arc(px + Math.sin(frame + i) * 3, py, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        } else {
            // Sheathed sword glow
            ctx.fillStyle = '#ff00ff';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff00ff';
            ctx.beginPath();
            ctx.rect(15, 15, 3, 15);
            ctx.fill();
        }

        ctx.restore();
        ctx.shadowBlur = 0;

        // === SHOULDER ARMOR ===
        // Left shoulder
        ctx.fillStyle = '#1e3a5f';
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(-18, -5, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Right shoulder
        ctx.beginPath();
        ctx.arc(18, -5, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Shoulder lights
        ctx.fillStyle = '#00ffff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00ffff';
        ctx.beginPath();
        ctx.arc(-18, -5, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(18, -5, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;

        // === HEAD ===
        // Helmet base
        ctx.fillStyle = '#0d1b2a';
        ctx.beginPath();
        ctx.arc(0, -15, 12, 0, Math.PI * 2);
        ctx.fill();

        // Helmet details
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, -15, 12, 0, Math.PI * 2);
        ctx.stroke();

        // Visor (glowing)
        const visorGradient = ctx.createLinearGradient(-8, -18, 8, -18);
        visorGradient.addColorStop(0, '#ff00ff');
        visorGradient.addColorStop(0.5, '#00ffff');
        visorGradient.addColorStop(1, '#ff00ff');

        ctx.fillStyle = visorGradient;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#00ffff';
        ctx.beginPath();
        ctx.rect(-8, -18, 16, 4);
        ctx.fill();

        // Helmet crest
        ctx.strokeStyle = '#ff00ff';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff00ff';
        ctx.beginPath();
        ctx.moveTo(-3, -27);
        ctx.lineTo(0, -32);
        ctx.lineTo(3, -27);
        ctx.stroke();

        // Antenna lights
        ctx.fillStyle = '#ff00ff';
        ctx.beginPath();
        ctx.arc(-6, -26, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(6, -26, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;

        // === ENERGY AURA (when attacking) ===
        if (action === 'attack') {
            ctx.strokeStyle = `rgba(255, 0, 255, ${0.5 + Math.sin(frame) * 0.3})`;
            ctx.lineWidth = 3;
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#ff00ff';
            ctx.beginPath();
            ctx.arc(0, 0, 50 + Math.sin(frame * 0.5) * 5, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.restore();
    }

    /**
     * Draw Cyber Wolf - enemy mob
     */
    drawCyberWolf(ctx, x, y, direction, frame) {
        const size = 80;
        const centerX = x + size / 2;
        const centerY = y + size / 2;

        ctx.save();
        ctx.translate(centerX, centerY);

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 30, 20, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body
        const bodyGradient = ctx.createLinearGradient(-20, -10, 20, 20);
        bodyGradient.addColorStop(0, '#1a1a2e');
        bodyGradient.addColorStop(1, '#2d2d44');
        ctx.fillStyle = bodyGradient;

        ctx.beginPath();
        ctx.ellipse(0, 0, 25, 15, 0, 0, Math.PI * 2);
        ctx.fill();

        // Mechanical legs
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2;

        const legWalk = Math.sin(frame * 0.3) * 5;

        // Front legs
        ctx.beginPath();
        ctx.moveTo(-15, 10);
        ctx.lineTo(-15, 25 + legWalk);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(15, 10);
        ctx.lineTo(15, 25 - legWalk);
        ctx.stroke();

        // Back legs
        ctx.beginPath();
        ctx.moveTo(-10, 10);
        ctx.lineTo(-10, 25 - legWalk);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.lineTo(10, 25 + legWalk);
        ctx.stroke();

        // Head
        ctx.fillStyle = '#1a1a2e';
        ctx.beginPath();
        ctx.arc(-20, -8, 10, 0, Math.PI * 2);
        ctx.fill();

        // Glowing eyes
        ctx.fillStyle = '#ff0000';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff0000';

        ctx.beginPath();
        ctx.arc(-23, -10, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(-23, -6, 3, 0, Math.PI * 2);
        ctx.fill();

        // Teeth/jaw
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-28, -5);
        ctx.lineTo(-32, -5);
        ctx.stroke();

        // Spine glow
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00ff88';
        ctx.beginPath();
        ctx.moveTo(-10, -5);
        ctx.lineTo(15, 0);
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.restore();
    }

    /**
     * Draw Combat Drone - flying enemy
     */
    drawCombatDrone(ctx, x, y, direction, frame) {
        const size = 64;
        const centerX = x + size / 2;
        const centerY = y + size / 2;

        ctx.save();
        ctx.translate(centerX, centerY);

        // Hover effect
        const hover = Math.sin(frame * 0.2) * 3;
        ctx.translate(0, hover);

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(0, 35, 15, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Main body
        ctx.fillStyle = '#2d2d44';
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Propellers
        ctx.save();
        ctx.rotate(frame * 0.5);

        for (let i = 0; i < 4; i++) {
            ctx.save();
            ctx.rotate((i * Math.PI) / 2);

            // Propeller arm
            ctx.strokeStyle = '#1a1a2e';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -25);
            ctx.stroke();

            // Propeller light
            ctx.fillStyle = '#00ffff';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#00ffff';
            ctx.beginPath();
            ctx.arc(0, -25, 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
        ctx.restore();
        ctx.shadowBlur = 0;

        // Central eye
        ctx.fillStyle = '#ff0000';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ff0000';
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();

        // Eye pupil
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.restore();
    }

    /**
     * Draw Heavy Mech - boss enemy
     */
    drawHeavyMech(ctx, x, y, direction, frame) {
        const size = 160;
        const centerX = x + size / 2;
        const centerY = y + size / 2;

        ctx.save();
        ctx.translate(centerX, centerY);

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.ellipse(0, 60, 40, 15, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs (mechanical)
        ctx.strokeStyle = '#ff6600';
        ctx.lineWidth = 6;

        const legMove = Math.sin(frame * 0.2) * 3;

        // Left leg
        ctx.beginPath();
        ctx.moveTo(-20, 20);
        ctx.lineTo(-25, 45 + legMove);
        ctx.lineTo(-22, 60);
        ctx.stroke();

        // Right leg
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.lineTo(25, 45 - legMove);
        ctx.lineTo(22, 60);
        ctx.stroke();

        // Body (large armor)
        const bodyGradient = ctx.createLinearGradient(-35, -20, 35, 30);
        bodyGradient.addColorStop(0, '#0d1b2a');
        bodyGradient.addColorStop(0.5, '#1a1a2e');
        bodyGradient.addColorStop(1, '#0d1b2a');

        ctx.fillStyle = bodyGradient;
        ctx.strokeStyle = '#ff6600';
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.rect(-35, -20, 70, 40);
        ctx.fill();
        ctx.stroke();

        // Armor plating details
        ctx.strokeStyle = '#ff6600';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ff6600';

        for (let i = -2; i <= 2; i++) {
            ctx.beginPath();
            ctx.moveTo(i * 12, -15);
            ctx.lineTo(i * 12, 15);
            ctx.stroke();
        }

        // Reactor core
        ctx.fillStyle = '#ff0000';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#ff0000';
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.fill();

        // Core rings
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 2;
        for (let r = 15; r < 25; r += 5) {
            ctx.beginPath();
            ctx.arc(0, 0, r, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.shadowBlur = 0;

        // Arms/weapons
        ctx.strokeStyle = '#ff6600';
        ctx.lineWidth = 5;

        // Left arm cannon
        ctx.beginPath();
        ctx.moveTo(-35, -10);
        ctx.lineTo(-50, -15);
        ctx.lineTo(-55, -10);
        ctx.stroke();

        // Right arm cannon
        ctx.beginPath();
        ctx.moveTo(35, -10);
        ctx.lineTo(50, -15);
        ctx.lineTo(55, -10);
        ctx.stroke();

        // Cannon glows
        ctx.fillStyle = '#ffff00';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ffff00';

        ctx.beginPath();
        ctx.arc(-55, -10, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(55, -10, 4, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.fillStyle = '#1a1a2e';
        ctx.strokeStyle = '#ff6600';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.rect(-15, -35, 30, 15);
        ctx.fill();
        ctx.stroke();

        // Eyes (red visor)
        ctx.fillStyle = '#ff0000';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#ff0000';
        ctx.beginPath();
        ctx.rect(-12, -30, 24, 5);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.restore();
    }

    /**
     * Generate complete sprite sheet for character
     */
    generateCharacterSheet(characterType) {
        const cacheKey = `${characterType}-sheet`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        const directions = ['south', 'south-west', 'west', 'north-west', 'north', 'north-east', 'east', 'south-east'];
        const actions = ['idle', 'walk', 'attack'];
        const framesPerAction = 8;

        // Create large sprite sheet
        const sheetWidth = directions.length * this.spriteSize;
        const sheetHeight = actions.length * framesPerAction * this.spriteSize;

        const canvas = document.createElement('canvas');
        canvas.width = sheetWidth;
        canvas.height = sheetHeight;
        const ctx = canvas.getContext('2d');

        // Clear background
        ctx.clearRect(0, 0, sheetWidth, sheetHeight);

        let yOffset = 0;
        actions.forEach(action => {
            for (let frame = 0; frame < framesPerAction; frame++) {
                let xOffset = 0;
                directions.forEach(direction => {
                    // Draw sprite
                    switch(characterType) {
                        case 'cyber-samurai':
                            this.drawCyberSamurai(ctx, xOffset, yOffset, direction, frame, action);
                            break;
                        case 'cyber-wolf':
                            this.drawCyberWolf(ctx, xOffset, yOffset, direction, frame);
                            break;
                        case 'combat-drone':
                            this.drawCombatDrone(ctx, xOffset, yOffset, direction, frame);
                            break;
                        case 'heavy-mech':
                            this.drawHeavyMech(ctx, xOffset, yOffset, direction, frame);
                            break;
                    }
                    xOffset += this.spriteSize;
                });
                yOffset += this.spriteSize;
            }
        });

        const spriteSheet = {
            canvas: canvas,
            image: canvas,
            spriteSize: this.spriteSize,
            directions: directions,
            actions: actions,
            framesPerAction: framesPerAction
        };

        this.cache.set(cacheKey, spriteSheet);
        return spriteSheet;
    }

    /**
     * Get specific sprite frame
     */
    getSprite(characterType, direction, action, frame) {
        const sheet = this.generateCharacterSheet(characterType);
        const dirIndex = sheet.directions.indexOf(direction);
        const actionIndex = sheet.actions.indexOf(action);

        if (dirIndex === -1 || actionIndex === -1) return null;

        const canvas = document.createElement('canvas');
        canvas.width = this.spriteSize;
        canvas.height = this.spriteSize;
        const ctx = canvas.getContext('2d');

        const sx = dirIndex * this.spriteSize;
        const sy = (actionIndex * sheet.framesPerAction + frame) * this.spriteSize;

        ctx.drawImage(
            sheet.image,
            sx, sy, this.spriteSize, this.spriteSize,
            0, 0, this.spriteSize, this.spriteSize
        );

        return canvas;
    }
}

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SpriteEngine;
}
