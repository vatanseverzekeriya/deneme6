// Professional Character Sprite Renderers
// High-quality RPG assets for player characters

// Base Character Renderer
class CharacterRenderer {
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
            skill: {},
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

    update(deltaTime, isMoving, isAttacking, isUsingSkill, isHurt, isDead) {
        this.animationTimer += deltaTime;

        let newAnimation = 'idle';
        if (isDead) newAnimation = 'death';
        else if (isHurt) newAnimation = 'hurt';
        else if (isUsingSkill) newAnimation = 'skill';
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

// Warrior Character Renderer
class WarriorRenderer extends CharacterRenderer {
    constructor() {
        super(68, 68);
        this.generateAllFrames();
    }

    generateAllFrames() {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        directions.forEach(dir => {
            this.frames.idle[dir] = this.generateIdleFrames(dir);
            this.frames.walk[dir] = this.generateWalkFrames(dir);
            this.frames.attack[dir] = this.generateAttackFrames(dir);
            this.frames.skill[dir] = this.generateSkillFrames(dir);
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
            this.drawWarrior(ctx, direction, breathe);
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
            const bob = Math.abs(Math.sin(i * Math.PI / 3)) * 2;
            this.drawWarrior(ctx, direction, -bob, walkCycle);
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
            this.drawWarrior(ctx, direction, 0, 0, attackPhase);
            frames.push(canvas);
        }
        return frames;
    }

    generateSkillFrames(direction) {
        const frames = [];
        for (let i = 0; i < 8; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const skillPhase = i / 8;
            this.drawWarrior(ctx, direction, 0, 0, skillPhase, true);
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

            this.drawWarrior(ctx, direction, 0, 0, 0, false, i % 2 === 0);
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
            this.drawWarrior(ctx, 'S', fadePhase * 20);
            frames.push(canvas);
        }
        return frames;
    }

    drawWarrior(ctx, direction, yOffset = 0, legPhase = 0, swordPhase = 0, isSkill = false, isHurt = false) {
        ctx.save();
        const centerX = this.spriteWidth / 2;
        const centerY = this.spriteHeight / 2 + yOffset;
        const isFlipped = ['W', 'NW', 'SW'].includes(direction);

        ctx.translate(centerX, centerY);
        if (isFlipped) ctx.scale(-1, 1);

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 22, 14, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        const armorColor = isHurt ? '#8B4513' : '#C0C0C0';
        const accentColor = isHurt ? '#CD5C5C' : '#FFD700';

        // Legs with armor
        ctx.fillStyle = '#654321'; // Brown pants
        ctx.fillRect(-6, 8 + (legPhase === 0 ? 2 : 0), 5, 14);
        ctx.fillRect(2, 8 + (legPhase === 1 ? 2 : 0), 5, 14);

        // Leg armor plates
        ctx.fillStyle = armorColor;
        ctx.fillRect(-6, 10, 5, 3);
        ctx.fillRect(2, 10, 5, 3);
        ctx.fillRect(-6, 16, 5, 3);
        ctx.fillRect(2, 16, 5, 3);

        // Boots
        ctx.fillStyle = '#4A4A4A';
        ctx.fillRect(-7, 20, 6, 4);
        ctx.fillRect(2, 20, 6, 4);

        // Torso with plate armor
        ctx.fillStyle = armorColor;
        ctx.beginPath();
        ctx.ellipse(0, 0, 12, 14, 0, 0, Math.PI * 2);
        ctx.fill();

        // Chest plate details
        ctx.strokeStyle = '#808080';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 10, -Math.PI/3, Math.PI/3);
        ctx.stroke();

        // Gold trim
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, -2, 8, Math.PI, Math.PI * 2);
        ctx.stroke();

        // Shoulder pads
        ctx.fillStyle = armorColor;
        ctx.beginPath();
        ctx.ellipse(-10, -6, 5, 6, 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(10, -6, 5, 6, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Spikes on shoulders
        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.moveTo(-12, -11);
        ctx.lineTo(-14, -15);
        ctx.lineTo(-10, -12);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(12, -11);
        ctx.lineTo(14, -15);
        ctx.lineTo(10, -12);
        ctx.fill();

        // Left arm
        ctx.fillStyle = '#D2B48C'; // Skin
        ctx.beginPath();
        ctx.ellipse(-12, 2, 3, 8, 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Shield on left arm
        ctx.fillStyle = armorColor;
        ctx.beginPath();
        ctx.arc(-14, 4, 7, 0, Math.PI * 2);
        ctx.fill();

        // Shield boss
        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.arc(-14, 4, 3, 0, Math.PI * 2);
        ctx.fill();

        // Shield emblem
        ctx.strokeStyle = '#8B0000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-14, 0);
        ctx.lineTo(-14, 8);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-18, 4);
        ctx.lineTo(-10, 4);
        ctx.stroke();

        // Right arm with sword
        ctx.save();
        ctx.translate(12, 2);
        ctx.rotate(swordPhase * -Math.PI / 1.5);

        ctx.fillStyle = '#D2B48C';
        ctx.beginPath();
        ctx.ellipse(0, 0, 3, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Sword
        // Blade
        ctx.fillStyle = '#E8E8E8';
        ctx.shadowColor = isSkill ? '#FFD700' : 'transparent';
        ctx.shadowBlur = isSkill ? 10 : 0;
        ctx.fillRect(-2, 8, 4, 20);

        // Blade edge shine
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(-1.5, 8, 1, 20);

        ctx.shadowBlur = 0;

        // Guard
        ctx.fillStyle = accentColor;
        ctx.fillRect(-6, 8, 12, 3);

        // Handle
        ctx.fillStyle = '#654321';
        ctx.fillRect(-1.5, 2, 3, 6);

        // Pommel
        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.arc(0, 2, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Head with helmet
        ctx.fillStyle = armorColor;
        ctx.beginPath();
        ctx.ellipse(0, -12, 8, 9, 0, 0, Math.PI * 2);
        ctx.fill();

        // Helmet plume
        ctx.strokeStyle = '#DC143C';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, -20);
        ctx.quadraticCurveTo(-2, -24, -1, -26);
        ctx.stroke();

        // Visor slit
        ctx.fillStyle = '#000000';
        ctx.fillRect(-6, -13, 12, 2);

        // Nose guard
        ctx.strokeStyle = armorColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -11);
        ctx.lineTo(0, -8);
        ctx.stroke();

        // Helmet rivets
        ctx.fillStyle = '#808080';
        ctx.beginPath();
        ctx.arc(-5, -10, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(5, -10, 1, 0, Math.PI * 2);
        ctx.fill();

        // Skill aura effect
        if (isSkill) {
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)';
            ctx.lineWidth = 3;
            ctx.shadowColor = '#FFD700';
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(0, 0, 20, 0, Math.PI * 2);
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        ctx.restore();
    }
}

// Ninja Character Renderer
class NinjaRenderer extends CharacterRenderer {
    constructor() {
        super(60, 60);
        this.generateAllFrames();
    }

    generateAllFrames() {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        directions.forEach(dir => {
            this.frames.idle[dir] = this.generateIdleFrames(dir);
            this.frames.walk[dir] = this.generateWalkFrames(dir);
            this.frames.attack[dir] = this.generateAttackFrames(dir);
            this.frames.skill[dir] = this.generateSkillFrames(dir);
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

            const sway = Math.sin(i * Math.PI / 2) * 0.5;
            this.drawNinja(ctx, direction, sway);
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
            const crouch = Math.abs(Math.sin(i * Math.PI / 3)) * 1.5;
            this.drawNinja(ctx, direction, crouch, walkCycle);
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

            const attackPhase = i / 5;
            this.drawNinja(ctx, direction, 0, 0, attackPhase);
            frames.push(canvas);
        }
        return frames;
    }

    generateSkillFrames(direction) {
        const frames = [];
        for (let i = 0; i < 8; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            const skillPhase = i / 8;
            const opacity = i < 4 ? 1.0 - (i / 4) * 0.5 : 0.5 + ((i - 4) / 4) * 0.5;
            this.drawNinja(ctx, direction, 0, 0, 0, true, false, opacity);
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

            this.drawNinja(ctx, direction, 0, 0, 0, false, i % 2 === 0);
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
            this.drawNinja(ctx, 'S', fadePhase * 15, 0, 0, false, false, 1.0 - fadePhase);
            frames.push(canvas);
        }
        return frames;
    }

    drawNinja(ctx, direction, yOffset = 0, legPhase = 0, attackPhase = 0, isSkill = false, isHurt = false, opacity = 1.0) {
        ctx.save();
        ctx.globalAlpha = opacity;

        const centerX = this.spriteWidth / 2;
        const centerY = this.spriteHeight / 2 + yOffset;
        const isFlipped = ['W', 'NW', 'SW'].includes(direction);

        ctx.translate(centerX, centerY);
        if (isFlipped) ctx.scale(-1, 1);

        // Shadow (lighter for ninja)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(0, 20, 10, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        const ninjaColor = isHurt ? '#2C2C2C' : '#1C1C1C';

        // Crouched stance
        ctx.save();
        ctx.translate(0, 3);

        // Legs (crouched)
        ctx.fillStyle = ninjaColor;
        ctx.fillRect(-5, 6 + (legPhase === 0 ? 2 : 0), 4, 12);
        ctx.fillRect(2, 6 + (legPhase === 1 ? 2 : 0), 4, 12);

        // Wraps on legs
        ctx.strokeStyle = '#8B0000';
        ctx.lineWidth = 1;
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(-5, 8 + i * 3);
            ctx.lineTo(-1, 8 + i * 3);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(2, 8 + i * 3);
            ctx.lineTo(6, 8 + i * 3);
            ctx.stroke();
        }

        // Torso (slim)
        ctx.fillStyle = ninjaColor;
        ctx.beginPath();
        ctx.ellipse(0, 0, 8, 11, 0, 0, Math.PI * 2);
        ctx.fill();

        // Chest wrap detail
        ctx.strokeStyle = '#2C2C2C';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-8, -2);
        ctx.lineTo(8, 2);
        ctx.stroke();

        // Arms (thin, agile)
        ctx.fillStyle = ninjaColor;
        ctx.beginPath();
        ctx.ellipse(-9, 0, 2.5, 7, 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Right arm with katana
        ctx.save();
        ctx.translate(9, 0);
        ctx.rotate(attackPhase * -Math.PI);

        ctx.fillStyle = ninjaColor;
        ctx.beginPath();
        ctx.ellipse(0, 0, 2.5, 7, -0.5, 0, Math.PI * 2);
        ctx.fill();

        // Katana
        // Blade (curved)
        ctx.strokeStyle = '#E8E8E8';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00FFFF';
        ctx.shadowBlur = isSkill ? 10 : 0;
        ctx.beginPath();
        ctx.moveTo(0, 7);
        ctx.quadraticCurveTo(1, 15, 0, 22);
        ctx.stroke();

        // Blade shine
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0.5, 7);
        ctx.quadraticCurveTo(1.5, 15, 0.5, 22);
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Guard (tsuba)
        ctx.fillStyle = '#4A4A4A';
        ctx.beginPath();
        ctx.arc(0, 7, 2, 0, Math.PI * 2);
        ctx.fill();

        // Handle
        ctx.fillStyle = '#8B0000';
        ctx.fillRect(-1, 2, 2, 5);

        ctx.restore();

        // Head with mask
        ctx.fillStyle = ninjaColor;
        ctx.beginPath();
        ctx.ellipse(0, -10, 6, 7, 0, 0, Math.PI * 2);
        ctx.fill();

        // Headband
        ctx.fillStyle = '#8B0000';
        ctx.fillRect(-6, -14, 12, 3);

        // Metal plate on headband
        ctx.fillStyle = '#C0C0C0';
        ctx.fillRect(-2, -14, 4, 3);

        // Eyes (intense)
        ctx.fillStyle = '#00FFFF';
        ctx.shadowColor = '#00FFFF';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.ellipse(-2, -11, 1.5, 1, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(2, -11, 1.5, 1, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore(); // End crouched stance

        // Skill effect (shadow clones)
        if (isSkill) {
            ctx.globalAlpha = 0.3;
            for (let i = 0; i < 3; i++) {
                const offset = (i + 1) * 3;
                ctx.save();
                ctx.translate(-offset, -offset);
                ctx.fillStyle = '#00FFFF';
                ctx.beginPath();
                ctx.ellipse(0, 0, 8, 11, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        ctx.restore();
    }
}

// Shaman and Sura renderers would follow similar patterns
// For brevity, I'll create simplified versions

class ShamanRenderer extends CharacterRenderer {
    constructor() {
        super(64, 64);
        this.generateAllFrames();
    }

    generateAllFrames() {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        directions.forEach(dir => {
            this.frames.idle[dir] = this.generateGenericFrames(dir, 'idle');
            this.frames.walk[dir] = this.generateGenericFrames(dir, 'walk');
            this.frames.attack[dir] = this.generateGenericFrames(dir, 'attack');
            this.frames.skill[dir] = this.generateGenericFrames(dir, 'skill');
            this.frames.hurt[dir] = this.generateGenericFrames(dir, 'hurt');
        });
        this.frames.death = this.generateGenericFrames('S', 'death');
    }

    generateGenericFrames(direction, type) {
        const frames = [];
        const frameCount = type === 'death' ? 8 : type === 'skill' ? 8 : type === 'attack' ? 6 : type === 'walk' ? 6 : 4;

        for (let i = 0; i < frameCount; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            this.drawShaman(ctx, direction, i, frameCount, type);
            frames.push(canvas);
        }
        return frames;
    }

    drawShaman(ctx, direction, frame, totalFrames, animType) {
        ctx.save();
        const centerX = this.spriteWidth / 2;
        const centerY = this.spriteHeight / 2;
        const isFlipped = ['W', 'NW', 'SW'].includes(direction);

        ctx.translate(centerX, centerY);
        if (isFlipped) ctx.scale(-1, 1);

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 20, 12, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Robe
        ctx.fillStyle = '#4B0082';
        ctx.beginPath();
        ctx.moveTo(-10, 5);
        ctx.lineTo(-8, 18);
        ctx.lineTo(8, 18);
        ctx.lineTo(10, 5);
        ctx.closePath();
        ctx.fill();

        // Body
        ctx.fillStyle = '#6A5ACD';
        ctx.beginPath();
        ctx.ellipse(0, 0, 10, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Staff
        ctx.save();
        const staffAngle = animType === 'skill' ? (frame / totalFrames) * Math.PI / 4 : 0;
        ctx.translate(10, 0);
        ctx.rotate(staffAngle);

        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -20);
        ctx.stroke();

        // Crystal on staff
        const crystalGlow = animType === 'skill' ? Math.abs(Math.sin(frame * Math.PI / 4)) : 0.3;
        ctx.fillStyle = '#9370DB';
        ctx.shadowColor = '#9370DB';
        ctx.shadowBlur = 10 * crystalGlow;
        ctx.beginPath();
        ctx.arc(0, -20, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();

        // Head
        ctx.fillStyle = '#DEB887';
        ctx.beginPath();
        ctx.arc(0, -10, 7, 0, Math.PI * 2);
        ctx.fill();

        // Hood
        ctx.fillStyle = '#4B0082';
        ctx.beginPath();
        ctx.arc(0, -10, 9, Math.PI, Math.PI * 2);
        ctx.fill();

        // Face
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(-2, -11, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(2, -11, 1, 0, Math.PI * 2);
        ctx.fill();

        // Beard
        ctx.fillStyle = '#F5F5DC';
        ctx.beginPath();
        ctx.moveTo(-4, -7);
        ctx.lineTo(-2, -3);
        ctx.lineTo(0, -4);
        ctx.lineTo(2, -3);
        ctx.lineTo(4, -7);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}

class SuraRenderer extends CharacterRenderer {
    constructor() {
        super(64, 64);
        this.generateAllFrames();
    }

    generateAllFrames() {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        directions.forEach(dir => {
            this.frames.idle[dir] = this.generateGenericFrames(dir, 'idle');
            this.frames.walk[dir] = this.generateGenericFrames(dir, 'walk');
            this.frames.attack[dir] = this.generateGenericFrames(dir, 'attack');
            this.frames.skill[dir] = this.generateGenericFrames(dir, 'skill');
            this.frames.hurt[dir] = this.generateGenericFrames(dir, 'hurt');
        });
        this.frames.death = this.generateGenericFrames('S', 'death');
    }

    generateGenericFrames(direction, type) {
        const frames = [];
        const frameCount = type === 'death' ? 8 : type === 'skill' ? 8 : type === 'attack' ? 6 : type === 'walk' ? 6 : 4;

        for (let i = 0; i < frameCount; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            const ctx = canvas.getContext('2d');

            this.drawSura(ctx, direction, i, frameCount, type);
            frames.push(canvas);
        }
        return frames;
    }

    drawSura(ctx, direction, frame, totalFrames, animType) {
        ctx.save();
        const centerX = this.spriteWidth / 2;
        const centerY = this.spriteHeight / 2;
        const isFlipped = ['W', 'NW', 'SW'].includes(direction);

        ctx.translate(centerX, centerY);
        if (isFlipped) ctx.scale(-1, 1);

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 20, 12, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Dark aura
        if (animType === 'skill') {
            const auraSize = 15 + Math.abs(Math.sin(frame * Math.PI / 4)) * 5;
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, auraSize);
            gradient.addColorStop(0, 'rgba(75, 0, 130, 0.3)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, auraSize, 0, Math.PI * 2);
            ctx.fill();
        }

        // Legs
        ctx.fillStyle = '#2C2C2C';
        ctx.fillRect(-5, 8, 4, 12);
        ctx.fillRect(2, 8, 4, 12);

        // Dark robe
        ctx.fillStyle = '#1C1C1C';
        ctx.beginPath();
        ctx.moveTo(-12, 5);
        ctx.lineTo(-10, 18);
        ctx.lineTo(10, 18);
        ctx.lineTo(12, 5);
        ctx.closePath();
        ctx.fill();

        // Torso
        ctx.fillStyle = '#2C2C2C';
        ctx.beginPath();
        ctx.ellipse(0, 0, 10, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Purple energy lines
        ctx.strokeStyle = '#8B008B';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-8, -5);
        ctx.lineTo(8, 5);
        ctx.stroke();

        // Arms with dark swords
        const swordAngle = animType === 'attack' ? (frame / totalFrames) * -Math.PI / 2 : Math.PI / 6;

        // Left sword
        ctx.save();
        ctx.translate(-10, 2);
        ctx.rotate(-swordAngle);

        ctx.fillStyle = '#1C1C1C';
        ctx.fillRect(-2, 0, 4, 15);

        ctx.fillStyle = '#4B0082';
        ctx.shadowColor = '#4B0082';
        ctx.shadowBlur = 8;
        ctx.fillRect(-1.5, 0, 3, 15);
        ctx.shadowBlur = 0;

        ctx.restore();

        // Right sword
        ctx.save();
        ctx.translate(10, 2);
        ctx.rotate(swordAngle);

        ctx.fillStyle = '#1C1C1C';
        ctx.fillRect(-2, 0, 4, 15);

        ctx.fillStyle = '#4B0082';
        ctx.shadowColor = '#4B0082';
        ctx.shadowBlur = 8;
        ctx.fillRect(-1.5, 0, 3, 15);
        ctx.shadowBlur = 0;

        ctx.restore();

        // Head
        ctx.fillStyle = '#DEB887';
        ctx.beginPath();
        ctx.arc(0, -10, 6, 0, Math.PI * 2);
        ctx.fill();

        // Dark hood
        ctx.fillStyle = '#1C1C1C';
        ctx.beginPath();
        ctx.arc(0, -10, 8, Math.PI, Math.PI * 2);
        ctx.fill();

        // Glowing eyes
        ctx.fillStyle = '#8B008B';
        ctx.shadowColor = '#8B008B';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(-2, -11, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(2, -11, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();
    }
}
