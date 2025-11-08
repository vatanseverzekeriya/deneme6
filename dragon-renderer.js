// Professional Dragon Sprite Renderer
// High-quality RPG assets for 🐉 Dragon
// Supports 8-directional movement with detailed pixel art

class DragonRenderer {
    constructor() {
        // Animation frames storage
        this.frames = {
            idle: {},
            walk: {},
            attack: {},
            hurt: {},
            death: {}
        };

        // Current animation state
        this.currentAnimation = 'idle';
        this.currentDirection = 'S'; // N, NE, E, SE, S, SW, W, NW
        this.currentFrame = 0;
        this.animationTimer = 0;
        this.animationSpeed = 150; // ms per frame

        // Dragon sprite dimensions
        this.spriteWidth = 96;
        this.spriteHeight = 96;

        // Particle effects
        this.particles = [];

        // Generate all sprite frames
        this.generateAllFrames();
    }

    // Generate all animation frames for all directions
    generateAllFrames() {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

        directions.forEach(dir => {
            this.frames.idle[dir] = this.generateIdleFrames(dir);
            this.frames.walk[dir] = this.generateWalkFrames(dir);
            this.frames.attack[dir] = this.generateAttackFrames(dir);
            this.frames.hurt[dir] = this.generateHurtFrames(dir);
        });

        this.frames.death = this.generateDeathFrames();
    }

    // Generate idle animation frames (breathing, wing flutter)
    generateIdleFrames(direction) {
        const frames = [];
        const frameCount = 4;

        for (let i = 0; i < frameCount; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const breatheOffset = Math.sin(i * Math.PI / 2) * 2;
            const wingFlutter = i % 2 === 0 ? 0 : 2;

            this.drawDragon(ctx, direction, breatheOffset, wingFlutter, 1.0);
            frames.push(canvas);
        }

        return frames;
    }

    // Generate walking animation frames
    generateWalkFrames(direction) {
        const frames = [];
        const frameCount = 6;

        for (let i = 0; i < frameCount; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const walkCycle = Math.sin(i * Math.PI / 3);
            const bobOffset = walkCycle * 3;
            const wingBeat = Math.abs(walkCycle) * 5;

            this.drawDragon(ctx, direction, bobOffset, wingBeat, 1.0);
            frames.push(canvas);
        }

        return frames;
    }

    // Generate attack animation frames (fire breath)
    generateAttackFrames(direction) {
        const frames = [];
        const frameCount = 8;

        for (let i = 0; i < frameCount; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const attackPhase = i / frameCount;
            const recoil = attackPhase < 0.5 ? attackPhase * -4 : (1 - attackPhase) * -2;
            const mouthOpen = attackPhase > 0.2 && attackPhase < 0.8 ? 1.0 : 0.0;

            this.drawDragon(ctx, direction, recoil, 0, 1.0, mouthOpen);

            // Draw fire breath effect
            if (attackPhase > 0.3 && attackPhase < 0.7) {
                this.drawFireBreath(ctx, direction, attackPhase);
            }

            frames.push(canvas);
        }

        return frames;
    }

    // Generate hurt animation frames
    generateHurtFrames(direction) {
        const frames = [];
        const frameCount = 3;

        for (let i = 0; i < frameCount; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const flashRed = i % 2 === 0;
            this.drawDragon(ctx, direction, 0, 0, flashRed ? 0.5 : 1.0);

            if (flashRed) {
                ctx.globalCompositeOperation = 'source-atop';
                ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                ctx.fillRect(0, 0, this.spriteWidth, this.spriteHeight);
                ctx.globalCompositeOperation = 'source-over';
            }

            frames.push(canvas);
        }

        return frames;
    }

    // Generate death animation frames
    generateDeathFrames() {
        const frames = [];
        const frameCount = 10;

        for (let i = 0; i < frameCount; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const fadePhase = i / frameCount;
            const fallRotation = fadePhase * 90;
            const opacity = 1.0 - fadePhase;

            ctx.save();
            ctx.translate(this.spriteWidth / 2, this.spriteHeight / 2);
            ctx.rotate(fallRotation * Math.PI / 180);
            ctx.translate(-this.spriteWidth / 2, -this.spriteHeight / 2);

            this.drawDragon(ctx, 'E', fadePhase * 10, 0, opacity);

            ctx.restore();
            frames.push(canvas);
        }

        return frames;
    }

    // Main dragon drawing function - creates detailed pixel art
    drawDragon(ctx, direction, yOffset = 0, wingOffset = 0, opacity = 1.0, mouthOpen = 0) {
        ctx.save();
        ctx.globalAlpha = opacity;

        const centerX = this.spriteWidth / 2;
        const centerY = this.spriteHeight / 2 + yOffset;

        // Get rotation angle based on direction
        const angle = this.getDirectionAngle(direction);
        const isFlipped = ['W', 'NW', 'SW'].includes(direction);

        // Apply transformations
        ctx.translate(centerX, centerY);
        if (isFlipped) {
            ctx.scale(-1, 1);
        }

        // Draw shadow
        this.drawShadow(ctx);

        // Draw dragon body parts in order (back to front)
        this.drawTail(ctx, angle);
        this.drawBackWing(ctx, wingOffset, angle);
        this.drawBackLeg(ctx, angle);
        this.drawBody(ctx, angle);
        this.drawFrontLeg(ctx, angle);
        this.drawNeck(ctx, angle);
        this.drawHead(ctx, angle, mouthOpen);
        this.drawFrontWing(ctx, wingOffset, angle);
        this.drawHorns(ctx, angle);
        this.drawEyes(ctx, angle);

        ctx.restore();
    }

    // Draw shadow beneath dragon
    drawShadow(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 35, 30, 10, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw dragon tail with scales
    drawTail(ctx, angle) {
        const segments = 5;
        ctx.strokeStyle = '#8B0000';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        for (let i = 0; i < segments; i++) {
            const t = i / segments;
            const x = -20 - t * 25;
            const y = 15 + Math.sin(t * Math.PI * 2) * 5;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();

        // Tail spikes
        ctx.fillStyle = '#FF4500';
        for (let i = 1; i < segments; i++) {
            const t = i / segments;
            const x = -20 - t * 25;
            const y = 15 + Math.sin(t * Math.PI * 2) * 5;

            ctx.beginPath();
            ctx.moveTo(x - 3, y);
            ctx.lineTo(x, y - 6);
            ctx.lineTo(x + 3, y);
            ctx.fill();
        }
    }

    // Draw back wing (behind body)
    drawBackWing(ctx, offset, angle) {
        ctx.save();
        ctx.translate(-8, -15 + offset);

        // Wing membrane
        ctx.fillStyle = 'rgba(139, 0, 0, 0.6)';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-25, -15, -30, -10);
        ctx.quadraticCurveTo(-25, 5, -15, 10);
        ctx.quadraticCurveTo(-10, 5, 0, 0);
        ctx.fill();

        // Wing bones
        ctx.strokeStyle = '#660000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-25, -15);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-15, 10);
        ctx.stroke();

        ctx.restore();
    }

    // Draw front wing (in front of body)
    drawFrontWing(ctx, offset, angle) {
        ctx.save();
        ctx.translate(8, -15 + offset);

        // Wing membrane - darker for front wing
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 30);
        gradient.addColorStop(0, 'rgba(220, 20, 20, 0.9)');
        gradient.addColorStop(1, 'rgba(139, 0, 0, 0.7)');
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(25, -20, 35, -12);
        ctx.quadraticCurveTo(30, 8, 18, 12);
        ctx.quadraticCurveTo(10, 5, 0, 0);
        ctx.fill();

        // Wing bones with glow
        ctx.strokeStyle = '#8B0000';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#FF0000';
        ctx.shadowBlur = 5;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(25, -20);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(30, 8);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(25, -20);
        ctx.lineTo(35, -12);
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Wing claws
        ctx.fillStyle = '#2C0000';
        ctx.beginPath();
        ctx.arc(35, -12, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    // Draw back leg
    drawBackLeg(ctx, angle) {
        // Upper leg
        ctx.fillStyle = '#A52A2A';
        ctx.beginPath();
        ctx.ellipse(-12, 15, 6, 12, 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Lower leg
        ctx.fillStyle = '#8B1A1A';
        ctx.beginPath();
        ctx.ellipse(-14, 25, 4, 10, 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Foot claws
        ctx.fillStyle = '#2C0000';
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.ellipse(-16 + i * 3, 33, 2, 4, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Draw front leg
    drawFrontLeg(ctx, angle) {
        // Upper leg
        ctx.fillStyle = '#DC143C';
        ctx.beginPath();
        ctx.ellipse(8, 15, 7, 13, -0.2, 0, Math.PI * 2);
        ctx.fill();

        // Muscle definition
        ctx.strokeStyle = '#A52A2A';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(8, 15, 7, 0.5, 2);
        ctx.stroke();

        // Lower leg
        ctx.fillStyle = '#C41E3A';
        ctx.beginPath();
        ctx.ellipse(10, 26, 5, 11, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Foot claws
        ctx.fillStyle = '#000000';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 3;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(8 + i * 3, 35);
            ctx.lineTo(7 + i * 3, 40);
            ctx.lineTo(9 + i * 3, 40);
            ctx.closePath();
            ctx.fill();
        }
        ctx.shadowBlur = 0;
    }

    // Draw main body with scales
    drawBody(ctx, angle) {
        // Main body
        const bodyGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 25);
        bodyGradient.addColorStop(0, '#DC143C');
        bodyGradient.addColorStop(0.6, '#B22222');
        bodyGradient.addColorStop(1, '#8B0000');

        ctx.fillStyle = bodyGradient;
        ctx.beginPath();
        ctx.ellipse(0, 5, 20, 18, 0, 0, Math.PI * 2);
        ctx.fill();

        // Belly (lighter)
        ctx.fillStyle = '#CD5C5C';
        ctx.beginPath();
        ctx.ellipse(0, 12, 14, 10, 0, 0, Math.PI);
        ctx.fill();

        // Scales pattern
        ctx.strokeStyle = '#A52A2A';
        ctx.lineWidth = 1.5;
        for (let y = -10; y < 15; y += 6) {
            for (let x = -15; x < 15; x += 6) {
                const offsetX = y % 12 === 0 ? 3 : 0;
                ctx.beginPath();
                ctx.arc(x + offsetX, y, 2.5, 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        // Spine ridges
        ctx.fillStyle = '#8B0000';
        for (let i = 0; i < 4; i++) {
            const x = -10 + i * 7;
            const y = -10;
            ctx.beginPath();
            ctx.moveTo(x - 2, y);
            ctx.lineTo(x, y - 5);
            ctx.lineTo(x + 2, y);
            ctx.closePath();
            ctx.fill();
        }
    }

    // Draw neck
    drawNeck(ctx, angle) {
        ctx.fillStyle = '#C41E3A';
        ctx.beginPath();
        ctx.moveTo(15, -5);
        ctx.quadraticCurveTo(20, -10, 22, -15);
        ctx.lineTo(20, -12);
        ctx.quadraticCurveTo(18, -8, 13, -3);
        ctx.closePath();
        ctx.fill();

        // Neck scales
        ctx.strokeStyle = '#8B0000';
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
            const t = i / 3;
            const x = 15 + t * 7;
            const y = -5 - t * 10;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    // Draw head
    drawHead(ctx, angle, mouthOpen) {
        // Snout
        ctx.fillStyle = '#DC143C';
        ctx.beginPath();
        ctx.ellipse(30, -15, 8, 6, -0.2, 0, Math.PI * 2);
        ctx.fill();

        // Upper jaw
        ctx.fillStyle = '#B22222';
        ctx.beginPath();
        ctx.moveTo(22, -18);
        ctx.quadraticCurveTo(28, -21, 34, -19);
        ctx.quadraticCurveTo(38, -17, 37, -15);
        ctx.quadraticCurveTo(30, -16, 24, -15);
        ctx.closePath();
        ctx.fill();

        // Lower jaw
        ctx.fillStyle = '#A52A2A';
        ctx.beginPath();
        ctx.moveTo(24, -15 + mouthOpen * 5);
        ctx.quadraticCurveTo(30, -14 + mouthOpen * 6, 37, -15 + mouthOpen * 4);
        ctx.quadraticCurveTo(35, -12 + mouthOpen * 6, 28, -12 + mouthOpen * 5);
        ctx.closePath();
        ctx.fill();

        // Nostrils
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.ellipse(32, -18, 1.5, 1, 0, 0, Math.PI * 2);
        ctx.fill();

        // Teeth (when mouth open)
        if (mouthOpen > 0.5) {
            ctx.fillStyle = '#FFFFFF';
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.moveTo(26 + i * 2, -15);
                ctx.lineTo(25 + i * 2, -12);
                ctx.lineTo(27 + i * 2, -12);
                ctx.closePath();
                ctx.fill();
            }
        }
    }

    // Draw horns
    drawHorns(ctx, angle) {
        ctx.fillStyle = '#2C0000';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 2;

        // Left horn
        ctx.beginPath();
        ctx.moveTo(20, -20);
        ctx.quadraticCurveTo(18, -28, 19, -32);
        ctx.lineTo(21, -31);
        ctx.quadraticCurveTo(20, -27, 22, -20);
        ctx.closePath();
        ctx.fill();

        // Right horn
        ctx.beginPath();
        ctx.moveTo(24, -20);
        ctx.quadraticCurveTo(26, -28, 25, -32);
        ctx.lineTo(23, -31);
        ctx.quadraticCurveTo(24, -27, 22, -20);
        ctx.closePath();
        ctx.fill();

        ctx.shadowBlur = 0;
    }

    // Draw eyes with glow
    drawEyes(ctx, angle) {
        // Eye glow
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.ellipse(25, -17, 2.5, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;

        // Pupil
        ctx.fillStyle = '#8B0000';
        ctx.beginPath();
        ctx.ellipse(25, -17, 1, 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Eye highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(24.5, -18, 0.8, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw fire breath effect
    drawFireBreath(ctx, direction, phase) {
        const distance = 40;
        const angle = this.getDirectionAngle(direction);

        ctx.save();

        // Flame particles
        for (let i = 0; i < 20; i++) {
            const t = i / 20;
            const x = 35 + distance * t * phase;
            const y = -15 + (Math.random() - 0.5) * 15 * t;
            const size = 8 * (1 - t) * phase;

            const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
            gradient.addColorStop(0, 'rgba(255, 255, 200, 0.9)');
            gradient.addColorStop(0.3, 'rgba(255, 150, 0, 0.7)');
            gradient.addColorStop(0.6, 'rgba(255, 50, 0, 0.5)');
            gradient.addColorStop(1, 'rgba(100, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    // Get rotation angle based on direction
    getDirectionAngle(direction) {
        const angles = {
            'N': -90,
            'NE': -45,
            'E': 0,
            'SE': 45,
            'S': 90,
            'SW': 135,
            'W': 180,
            'NW': -135
        };
        return angles[direction] || 0;
    }

    // Get direction based on movement vector
    getDirection(dx, dy) {
        if (dx === 0 && dy === 0) return this.currentDirection;

        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        if (angle >= -22.5 && angle < 22.5) return 'E';
        if (angle >= 22.5 && angle < 67.5) return 'SE';
        if (angle >= 67.5 && angle < 112.5) return 'S';
        if (angle >= 112.5 && angle < 157.5) return 'SW';
        if (angle >= 157.5 || angle < -157.5) return 'W';
        if (angle >= -157.5 && angle < -112.5) return 'NW';
        if (angle >= -112.5 && angle < -67.5) return 'N';
        if (angle >= -67.5 && angle < -22.5) return 'NE';

        return 'S';
    }

    // Update animation state
    update(deltaTime, isMoving, isAttacking, isHurt, isDead) {
        this.animationTimer += deltaTime;

        // Determine animation
        let newAnimation = 'idle';
        if (isDead) {
            newAnimation = 'death';
        } else if (isHurt) {
            newAnimation = 'hurt';
        } else if (isAttacking) {
            newAnimation = 'attack';
        } else if (isMoving) {
            newAnimation = 'walk';
        }

        // Reset frame if animation changed
        if (newAnimation !== this.currentAnimation) {
            this.currentAnimation = newAnimation;
            this.currentFrame = 0;
            this.animationTimer = 0;
        }

        // Update frame
        if (this.animationTimer >= this.animationSpeed) {
            this.animationTimer = 0;

            const frames = this.currentAnimation === 'death'
                ? this.frames.death
                : this.frames[this.currentAnimation][this.currentDirection];

            this.currentFrame = (this.currentFrame + 1) % frames.length;

            // Don't loop death animation
            if (this.currentAnimation === 'death' && this.currentFrame === 0 && deltaTime > 0) {
                this.currentFrame = frames.length - 1;
            }
        }
    }

    // Render the dragon
    render(ctx, x, y, dx, dy) {
        // Update direction based on movement
        if (dx !== 0 || dy !== 0) {
            this.currentDirection = this.getDirection(dx, dy);
        }

        // Get current frame
        const frames = this.currentAnimation === 'death'
            ? this.frames.death
            : this.frames[this.currentAnimation][this.currentDirection];

        const frame = frames[this.currentFrame];

        // Draw the frame
        ctx.save();
        ctx.translate(x, y);
        ctx.drawImage(
            frame,
            -this.spriteWidth / 2,
            -this.spriteHeight / 2,
            this.spriteWidth,
            this.spriteHeight
        );
        ctx.restore();
    }

    // Play attack animation
    playAttack() {
        this.currentAnimation = 'attack';
        this.currentFrame = 0;
        this.animationTimer = 0;
    }

    // Play hurt animation
    playHurt() {
        this.currentAnimation = 'hurt';
        this.currentFrame = 0;
        this.animationTimer = 0;
    }

    // Play death animation
    playDeath() {
        this.currentAnimation = 'death';
        this.currentFrame = 0;
        this.animationTimer = 0;
    }
}
