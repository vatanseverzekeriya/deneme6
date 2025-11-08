// Professional Mob Sprite Renderers
// High-quality RPG assets for various mobs

// Base Mob Renderer Class
class MobRenderer {
    constructor(spriteWidth = 64, spriteHeight = 64) {
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.currentAnimation = 'idle';
        this.currentDirection = 'S';
        this.currentFrame = 0;
        this.animationTimer = 0;
        this.animationSpeed = 150;
        this.frames = {
            idle: {},
            walk: {},
            attack: {},
            hurt: {},
            death: {}
        };
    }

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

    update(deltaTime, isMoving, isAttacking, isHurt, isDead) {
        this.animationTimer += deltaTime;

        let newAnimation = 'idle';
        if (isDead) newAnimation = 'death';
        else if (isHurt) newAnimation = 'hurt';
        else if (isAttacking) newAnimation = 'attack';
        else if (isMoving) newAnimation = 'walk';

        if (newAnimation !== this.currentAnimation) {
            this.currentAnimation = newAnimation;
            this.currentFrame = 0;
            this.animationTimer = 0;
        }

        if (this.animationTimer >= this.animationSpeed) {
            this.animationTimer = 0;
            const frames = this.currentAnimation === 'death'
                ? this.frames.death
                : this.frames[this.currentAnimation][this.currentDirection];

            this.currentFrame = (this.currentFrame + 1) % frames.length;

            if (this.currentAnimation === 'death' && this.currentFrame === 0 && deltaTime > 0) {
                this.currentFrame = frames.length - 1;
            }
        }
    }

    render(ctx, x, y, dx, dy) {
        if (dx !== 0 || dy !== 0) {
            this.currentDirection = this.getDirection(dx, dy);
        }

        const frames = this.currentAnimation === 'death'
            ? this.frames.death
            : this.frames[this.currentAnimation][this.currentDirection];

        const frame = frames[this.currentFrame];

        ctx.save();
        ctx.translate(x, y);
        ctx.drawImage(frame, -this.spriteWidth / 2, -this.spriteHeight / 2, this.spriteWidth, this.spriteHeight);
        ctx.restore();
    }
}

// Wolf Renderer
class WolfRenderer extends MobRenderer {
    constructor() {
        super(64, 64);
        this.generateAllFrames();
    }

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

    generateIdleFrames(direction) {
        const frames = [];
        for (let i = 0; i < 4; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const breathe = Math.sin(i * Math.PI / 2) * 1;
            this.drawWolf(ctx, direction, breathe, 0);
            frames.push(canvas);
        }
        return frames;
    }

    generateWalkFrames(direction) {
        const frames = [];
        for (let i = 0; i < 6; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const walkCycle = Math.sin(i * Math.PI / 3) * 3;
            this.drawWolf(ctx, direction, 0, walkCycle);
            frames.push(canvas);
        }
        return frames;
    }

    generateAttackFrames(direction) {
        const frames = [];
        for (let i = 0; i < 6; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const lungePhase = i / 6;
            const lunge = lungePhase < 0.5 ? lungePhase * 10 : (1 - lungePhase) * 10;
            this.drawWolf(ctx, direction, -lunge / 2, 0, lungePhase > 0.3 && lungePhase < 0.7);
            frames.push(canvas);
        }
        return frames;
    }

    generateHurtFrames(direction) {
        const frames = [];
        for (let i = 0; i < 3; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            this.drawWolf(ctx, direction, 0, 0, false, i % 2 === 0);
            frames.push(canvas);
        }
        return frames;
    }

    generateDeathFrames() {
        const frames = [];
        for (let i = 0; i < 8; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const fadePhase = i / 8;
            ctx.globalAlpha = 1.0 - fadePhase;
            this.drawWolf(ctx, 'E', fadePhase * 10, 0);
            frames.push(canvas);
        }
        return frames;
    }

    drawWolf(ctx, direction, yOffset = 0, legOffset = 0, showTeeth = false, isHurt = false) {
        ctx.save();
        const centerX = this.spriteWidth / 2;
        const centerY = this.spriteHeight / 2 + yOffset;
        const isFlipped = ['W', 'NW', 'SW'].includes(direction);

        ctx.translate(centerX, centerY);
        if (isFlipped) ctx.scale(-1, 1);

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 20, 18, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body
        const bodyColor = isHurt ? '#8B0000' : '#696969';
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.ellipse(-2, 0, 18, 12, -0.1, 0, Math.PI * 2);
        ctx.fill();

        // Fur texture
        ctx.strokeStyle = '#505050';
        ctx.lineWidth = 1;
        for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            ctx.moveTo(-15 + i * 4, -8);
            ctx.lineTo(-15 + i * 4, 8);
            ctx.stroke();
        }

        // Legs (back)
        this.drawLeg(ctx, -10, 10, legOffset);
        this.drawLeg(ctx, -5, 10, -legOffset);

        // Legs (front)
        this.drawLeg(ctx, 5, 10, -legOffset);
        this.drawLeg(ctx, 10, 10, legOffset);

        // Tail
        ctx.strokeStyle = bodyColor;
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-18, -2);
        ctx.quadraticCurveTo(-22, -5, -20, -10);
        ctx.stroke();

        // Head
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.ellipse(12, -5, 10, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Snout
        ctx.fillStyle = '#505050';
        ctx.beginPath();
        ctx.ellipse(19, -4, 5, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Nose
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(22, -5, 2, 0, Math.PI * 2);
        ctx.fill();

        // Ears
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.moveTo(8, -12);
        ctx.lineTo(6, -18);
        ctx.lineTo(10, -13);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(14, -12);
        ctx.lineTo(16, -18);
        ctx.lineTo(12, -13);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#FFD700';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(15, -8, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(15, -8, 1, 0, Math.PI * 2);
        ctx.fill();

        // Teeth when attacking
        if (showTeeth) {
            ctx.fillStyle = '#FFFFFF';
            for (let i = 0; i < 4; i++) {
                ctx.beginPath();
                ctx.moveTo(17 + i * 2, -2);
                ctx.lineTo(16 + i * 2, 1);
                ctx.lineTo(18 + i * 2, 1);
                ctx.fill();
            }
        }

        ctx.restore();
    }

    drawLeg(ctx, x, y, offset) {
        ctx.fillStyle = '#505050';
        ctx.fillRect(x - 2, y + offset, 3, 12);

        // Paw
        ctx.fillStyle = '#303030';
        ctx.beginPath();
        ctx.arc(x, y + 12 + offset, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Goblin Renderer
class GoblinRenderer extends MobRenderer {
    constructor() {
        super(56, 56);
        this.generateAllFrames();
    }

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

    generateIdleFrames(direction) {
        const frames = [];
        for (let i = 0; i < 4; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const bounce = Math.sin(i * Math.PI / 2) * 1.5;
            this.drawGoblin(ctx, direction, bounce);
            frames.push(canvas);
        }
        return frames;
    }

    generateWalkFrames(direction) {
        const frames = [];
        for (let i = 0; i < 6; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const walkBounce = Math.abs(Math.sin(i * Math.PI / 3)) * 3;
            this.drawGoblin(ctx, direction, -walkBounce, i % 2);
            frames.push(canvas);
        }
        return frames;
    }

    generateAttackFrames(direction) {
        const frames = [];
        for (let i = 0; i < 5; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const swingPhase = i / 5;
            this.drawGoblin(ctx, direction, 0, 0, swingPhase);
            frames.push(canvas);
        }
        return frames;
    }

    generateHurtFrames(direction) {
        const frames = [];
        for (let i = 0; i < 3; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            this.drawGoblin(ctx, direction, 0, 0, 0, i % 2 === 0);
            frames.push(canvas);
        }
        return frames;
    }

    generateDeathFrames() {
        const frames = [];
        for (let i = 0; i < 8; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const fadePhase = i / 8;
            ctx.globalAlpha = 1.0 - fadePhase;
            this.drawGoblin(ctx, 'S', fadePhase * 15);
            frames.push(canvas);
        }
        return frames;
    }

    drawGoblin(ctx, direction, yOffset = 0, legPhase = 0, weaponPhase = 0, isHurt = false) {
        ctx.save();
        const centerX = this.spriteWidth / 2;
        const centerY = this.spriteHeight / 2 + yOffset;
        const isFlipped = ['W', 'NW', 'SW'].includes(direction);

        ctx.translate(centerX, centerY);
        if (isFlipped) ctx.scale(-1, 1);

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 18, 12, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs
        const legColor = isHurt ? '#4D6B3E' : '#556B2F';
        ctx.fillStyle = legColor;

        // Left leg
        ctx.fillRect(-5, 8 + (legPhase === 0 ? 2 : 0), 4, 10);
        // Right leg
        ctx.fillRect(2, 8 + (legPhase === 1 ? 2 : 0), 4, 10);

        // Feet
        ctx.fillStyle = '#3C5A28';
        ctx.fillRect(-6, 17, 6, 3);
        ctx.fillRect(2, 17, 6, 3);

        // Body
        const bodyColor = isHurt ? '#5C7A3D' : '#6B8E23';
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.ellipse(0, 0, 10, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Belly
        ctx.fillStyle = '#8FBC8F';
        ctx.beginPath();
        ctx.ellipse(0, 3, 7, 8, 0, 0, Math.PI);
        ctx.fill();

        // Arms
        ctx.strokeStyle = legColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';

        // Left arm
        ctx.beginPath();
        ctx.moveTo(-8, -3);
        ctx.lineTo(-12, 5);
        ctx.stroke();

        // Right arm (holding weapon)
        const weaponAngle = weaponPhase * Math.PI;
        ctx.save();
        ctx.translate(8, -3);
        ctx.rotate(weaponAngle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(8, 8);
        ctx.stroke();

        // Weapon (club)
        if (weaponPhase > 0) {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(6, 6, 3, 10);
            ctx.fillStyle = '#654321';
            ctx.beginPath();
            ctx.arc(7.5, 15, 4, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        // Head
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.ellipse(0, -10, 8, 9, 0, 0, Math.PI * 2);
        ctx.fill();

        // Ears
        ctx.fillStyle = '#556B2F';
        ctx.beginPath();
        ctx.ellipse(-7, -10, 3, 5, -0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(7, -10, 3, 5, 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#FFFF00';
        ctx.shadowColor = '#FFFF00';
        ctx.shadowBlur = 3;
        ctx.beginPath();
        ctx.arc(-3, -11, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(3, -11, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Pupils
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(-3, -11, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(3, -11, 1, 0, Math.PI * 2);
        ctx.fill();

        // Nose
        ctx.fillStyle = '#3C5A28';
        ctx.beginPath();
        ctx.arc(0, -8, 2, 0, Math.PI * 2);
        ctx.fill();

        // Mouth (evil grin)
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, -6, 4, 0, Math.PI);
        ctx.stroke();

        // Teeth
        ctx.fillStyle = '#FFF';
        for (let i = 0; i < 4; i++) {
            ctx.fillRect(-3 + i * 2, -6, 1, 2);
        }

        ctx.restore();
    }
}

// Orc Renderer - Similar structure, more muscular
class OrcRenderer extends MobRenderer {
    constructor() {
        super(72, 72);
        this.generateAllFrames();
    }

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

    generateIdleFrames(direction) {
        const frames = [];
        for (let i = 0; i < 4; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const breathe = Math.sin(i * Math.PI / 2) * 2;
            this.drawOrc(ctx, direction, breathe);
            frames.push(canvas);
        }
        return frames;
    }

    generateWalkFrames(direction) {
        const frames = [];
        for (let i = 0; i < 6; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const walkCycle = i % 2;
            this.drawOrc(ctx, direction, 0, walkCycle);
            frames.push(canvas);
        }
        return frames;
    }

    generateAttackFrames(direction) {
        const frames = [];
        for (let i = 0; i < 6; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const attackPhase = i / 6;
            this.drawOrc(ctx, direction, 0, 0, attackPhase);
            frames.push(canvas);
        }
        return frames;
    }

    generateHurtFrames(direction) {
        const frames = [];
        for (let i = 0; i < 3; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            this.drawOrc(ctx, direction, 0, 0, 0, i % 2 === 0);
            frames.push(canvas);
        }
        return frames;
    }

    generateDeathFrames() {
        const frames = [];
        for (let i = 0; i < 8; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const fadePhase = i / 8;
            ctx.globalAlpha = 1.0 - fadePhase;
            this.drawOrc(ctx, 'S', fadePhase * 20);
            frames.push(canvas);
        }
        return frames;
    }

    drawOrc(ctx, direction, yOffset = 0, legPhase = 0, weaponPhase = 0, isHurt = false) {
        ctx.save();
        const centerX = this.spriteWidth / 2;
        const centerY = this.spriteHeight / 2 + yOffset;
        const isFlipped = ['W', 'NW', 'SW'].includes(direction);

        ctx.translate(centerX, centerY);
        if (isFlipped) ctx.scale(-1, 1);

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.ellipse(0, 25, 18, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        const skinColor = isHurt ? '#4D6B3E' : '#228B22';

        // Legs (muscular)
        ctx.fillStyle = '#654321'; // Brown pants
        ctx.fillRect(-8, 10, 7, 15);
        ctx.fillRect(2, 10, 7, 15);

        // Leg muscles
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.ellipse(-5, 12 + (legPhase === 0 ? 2 : 0), 4, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(5, 12 + (legPhase === 1 ? 2 : 0), 4, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Boots
        ctx.fillStyle = '#1C1C1C';
        ctx.fillRect(-9, 23, 8, 5);
        ctx.fillRect(2, 23, 8, 5);

        // Torso (massive)
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.ellipse(0, 0, 14, 16, 0, 0, Math.PI * 2);
        ctx.fill();

        // Chest muscles definition
        ctx.strokeStyle = '#1C5A1C';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(-5, 0, 6, -Math.PI/4, Math.PI/4);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(5, 0, 6, Math.PI*3/4, Math.PI*5/4);
        ctx.stroke();

        // Arms (very muscular)
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.ellipse(-12, 0, 5, 10, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(12, 0, 5, 10, -0.5, 0, Math.PI * 2);
        ctx.fill();

        // Forearms
        ctx.beginPath();
        ctx.ellipse(-15, 8, 4, 8, 0.7, 0, Math.PI * 2);
        ctx.fill();

        // Right arm with weapon
        ctx.save();
        ctx.translate(15, 8);
        ctx.rotate(weaponPhase * -Math.PI / 2);
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.ellipse(0, 0, 4, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Weapon (axe)
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(-2, 8, 4, 18);
        ctx.fillStyle = '#C0C0C0';
        ctx.beginPath();
        ctx.moveTo(-8, 8);
        ctx.lineTo(0, 3);
        ctx.lineTo(8, 8);
        ctx.lineTo(0, 11);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Head (large)
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.ellipse(0, -14, 10, 11, 0, 0, Math.PI * 2);
        ctx.fill();

        // Tusks
        ctx.fillStyle = '#FFF8DC';
        ctx.beginPath();
        ctx.moveTo(-4, -8);
        ctx.lineTo(-6, -4);
        ctx.lineTo(-2, -6);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(4, -8);
        ctx.lineTo(6, -4);
        ctx.lineTo(2, -6);
        ctx.fill();

        // Eyes (fierce)
        ctx.fillStyle = '#8B0000';
        ctx.shadowColor = '#FF0000';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(-4, -16, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(4, -16, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Brow (angry)
        ctx.strokeStyle = '#1C5A1C';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-7, -18);
        ctx.lineTo(-2, -17);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(7, -18);
        ctx.lineTo(2, -17);
        ctx.stroke();

        // Nose
        ctx.fillStyle = '#1C5A1C';
        ctx.beginPath();
        ctx.ellipse(0, -11, 3, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Scars
        ctx.strokeStyle = '#1C5A1C';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(5, -12);
        ctx.lineTo(8, -10);
        ctx.stroke();

        ctx.restore();
    }
}

// Troll Renderer - Even bigger and meaner
class TrollRenderer extends MobRenderer {
    constructor() {
        super(88, 88);
        this.generateAllFrames();
    }

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

    generateIdleFrames(direction) {
        const frames = [];
        for (let i = 0; i < 4; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const breathe = Math.sin(i * Math.PI / 2) * 3;
            this.drawTroll(ctx, direction, breathe);
            frames.push(canvas);
        }
        return frames;
    }

    generateWalkFrames(direction) {
        const frames = [];
        for (let i = 0; i < 6; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const walkCycle = i % 2;
            const stomp = Math.abs(Math.sin(i * Math.PI / 3)) * 2;
            this.drawTroll(ctx, direction, -stomp, walkCycle);
            frames.push(canvas);
        }
        return frames;
    }

    generateAttackFrames(direction) {
        const frames = [];
        for (let i = 0; i < 8; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const attackPhase = i / 8;
            this.drawTroll(ctx, direction, 0, 0, attackPhase);
            frames.push(canvas);
        }
        return frames;
    }

    generateHurtFrames(direction) {
        const frames = [];
        for (let i = 0; i < 3; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            this.drawTroll(ctx, direction, 0, 0, 0, i % 2 === 0);
            frames.push(canvas);
        }
        return frames;
    }

    generateDeathFrames() {
        const frames = [];
        for (let i = 0; i < 10; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const fadePhase = i / 10;
            ctx.globalAlpha = 1.0 - fadePhase;
            ctx.save();
            ctx.translate(this.spriteWidth / 2, this.spriteHeight / 2);
            ctx.rotate(fadePhase * Math.PI / 2);
            ctx.translate(-this.spriteWidth / 2, -this.spriteHeight / 2);
            this.drawTroll(ctx, 'E', fadePhase * 25);
            ctx.restore();
            frames.push(canvas);
        }
        return frames;
    }

    drawTroll(ctx, direction, yOffset = 0, legPhase = 0, attackPhase = 0, isHurt = false) {
        ctx.save();
        const centerX = this.spriteWidth / 2;
        const centerY = this.spriteHeight / 2 + yOffset;
        const isFlipped = ['W', 'NW', 'SW'].includes(direction);

        ctx.translate(centerX, centerY);
        if (isFlipped) ctx.scale(-1, 1);

        // Shadow (large)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.ellipse(0, 32, 25, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        const skinColor = isHurt ? '#5C7A3D' : '#778B6B';

        // Hunched posture
        ctx.save();
        ctx.translate(0, 5);
        ctx.rotate(0.2);

        // Massive legs
        ctx.fillStyle = '#4A5A43';
        ctx.fillRect(-10, 12 + (legPhase === 0 ? 3 : 0), 9, 20);
        ctx.fillRect(2, 12 + (legPhase === 1 ? 3 : 0), 9, 20);

        // Leg muscles
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.ellipse(-5, 15, 6, 9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(6, 15, 6, 9, 0, 0, Math.PI * 2);
        ctx.fill();

        // Huge torso
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.ellipse(0, -3, 18, 20, 0, 0, Math.PI * 2);
        ctx.fill();

        // Belly
        ctx.fillStyle = '#8FA890';
        ctx.beginPath();
        ctx.ellipse(0, 5, 14, 15, 0, 0, Math.PI);
        ctx.fill();

        // Warts and boils
        ctx.fillStyle = '#5C7A3D';
        for (let i = 0; i < 8; i++) {
            const x = -12 + Math.random() * 24;
            const y = -15 + Math.random() * 30;
            ctx.beginPath();
            ctx.arc(x, y, 1 + Math.random() * 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Long arms
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.ellipse(-15, 0, 6, 14, 0.7, 0, Math.PI * 2);
        ctx.fill();

        // Right arm with club
        ctx.save();
        ctx.translate(15, 0);
        ctx.rotate(attackPhase * -Math.PI);

        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.ellipse(0, 0, 6, 14, 0, 0, Math.PI * 2);
        ctx.fill();

        // Huge club
        ctx.fillStyle = '#654321';
        ctx.fillRect(-4, 14, 8, 25);
        ctx.fillStyle = '#4A3218';
        ctx.beginPath();
        ctx.arc(0, 37, 8, 0, Math.PI * 2);
        ctx.fill();

        // Spikes on club
        ctx.fillStyle = '#8B8B8B';
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const x = Math.cos(angle) * 8;
            const y = 37 + Math.sin(angle) * 8;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x * 1.5, y * 1.2);
            ctx.lineTo(x * 0.8, y * 1.1);
            ctx.fill();
        }

        ctx.restore();

        // Massive head
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.ellipse(0, -20, 13, 14, 0, 0, Math.PI * 2);
        ctx.fill();

        // Protruding brow
        ctx.fillStyle = '#5C7A3D';
        ctx.fillRect(-10, -27, 20, 5);

        // Small eyes (piggy)
        ctx.fillStyle = '#8B0000';
        ctx.shadowColor = '#FF0000';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(-5, -24, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(5, -24, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Large nose
        ctx.fillStyle = '#4A5A43';
        ctx.beginPath();
        ctx.ellipse(0, -15, 5, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Nostrils
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(-2, -13, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(2, -13, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Mouth with bad teeth
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, -8, 6, 0, Math.PI);
        ctx.stroke();

        // Crooked teeth
        ctx.fillStyle = '#F0E68C';
        for (let i = 0; i < 5; i++) {
            const x = -5 + i * 2.5;
            const height = 2 + Math.random() * 3;
            ctx.fillRect(x, -8, 2, height);
        }

        ctx.restore(); // End hunched posture

        ctx.restore();
    }
}
