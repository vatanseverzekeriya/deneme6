// ========================================
// WARRIOR ASSET SYSTEM - PROFESSIONAL QUALITY
// ========================================

// Particle System for visual effects
class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    createSlashTrail(x, y, angle, color = '#ff0000') {
        for (let i = 0; i < 15; i++) {
            const speed = 2 + Math.random() * 4;
            const spreadAngle = angle + (Math.random() - 0.5) * 0.8;
            this.particles.push({
                x, y,
                vx: Math.cos(spreadAngle) * speed,
                vy: Math.sin(spreadAngle) * speed,
                size: 3 + Math.random() * 5,
                life: 1,
                maxLife: 0.6 + Math.random() * 0.4,
                color,
                type: 'trail'
            });
        }
    }

    createImpact(x, y, color = '#ffaa00') {
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 5;
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 2 + Math.random() * 4,
                life: 1,
                maxLife: 0.5 + Math.random() * 0.5,
                color,
                type: 'spark'
            });
        }
    }

    createBlood(x, y) {
        for (let i = 0; i < 12; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 3;
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                size: 2 + Math.random() * 3,
                life: 1,
                maxLife: 0.8 + Math.random() * 0.4,
                color: '#8b0000',
                type: 'blood',
                gravity: 0.3
            });
        }
    }

    createHealEffect(x, y) {
        for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 2;
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: -Math.abs(Math.sin(angle) * speed) - 1,
                size: 3 + Math.random() * 4,
                life: 1,
                maxLife: 1 + Math.random() * 0.5,
                color: '#00ff00',
                type: 'heal',
                glow: true
            });
        }
    }

    createShieldEffect(x, y) {
        for (let i = 0; i < 25; i++) {
            const angle = (i / 25) * Math.PI * 2;
            const radius = 40 + Math.random() * 10;
            this.particles.push({
                x: x + Math.cos(angle) * radius,
                y: y + Math.sin(angle) * radius,
                vx: Math.cos(angle) * 0.5,
                vy: Math.sin(angle) * 0.5,
                size: 3 + Math.random() * 3,
                life: 1,
                maxLife: 0.6 + Math.random() * 0.4,
                color: '#4444ff',
                type: 'shield',
                glow: true
            });
        }
    }

    update(deltaTime) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            p.x += p.vx;
            p.y += p.vy;

            if (p.gravity) {
                p.vy += p.gravity;
            }

            p.vx *= 0.95;
            p.vy *= 0.95;

            p.life -= deltaTime / 1000 / p.maxLife;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    draw(ctx) {
        this.particles.forEach(p => {
            ctx.save();

            if (p.glow) {
                ctx.shadowBlur = 15;
                ctx.shadowColor = p.color;
            }

            const alpha = Math.max(0, p.life);
            ctx.globalAlpha = alpha;

            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        });
    }
}

// Warrior Sprite Renderer - Detailed pixel-art style
class WarriorSprite {
    constructor() {
        this.scale = 1;
        this.flip = false;
    }

    // Draw detailed warrior head with helmet
    drawHead(ctx, x, y, frame, hurtFlash = false) {
        ctx.save();

        // Helmet base (dark steel)
        ctx.fillStyle = hurtFlash ? '#ff6666' : '#2c3e50';
        ctx.beginPath();
        ctx.arc(x, y - 25, 10, Math.PI, 0, false);
        ctx.fill();

        // Helmet shine
        ctx.fillStyle = hurtFlash ? '#ffaaaa' : '#5d6d7e';
        ctx.beginPath();
        ctx.arc(x - 3, y - 27, 3, 0, Math.PI * 2);
        ctx.fill();

        // Visor
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(x - 8, y - 23, 16, 5);

        // Eye glow
        ctx.fillStyle = hurtFlash ? '#ff0000' : '#ff4444';
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#ff0000';
        ctx.fillRect(x - 6, y - 22, 3, 2);
        ctx.fillRect(x + 3, y - 22, 3, 2);
        ctx.shadowBlur = 0;

        // Helmet horns
        ctx.strokeStyle = hurtFlash ? '#ff6666' : '#34495e';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x - 10, y - 23);
        ctx.lineTo(x - 15, y - 30);
        ctx.moveTo(x + 10, y - 23);
        ctx.lineTo(x + 15, y - 30);
        ctx.stroke();

        ctx.restore();
    }

    // Draw armored torso
    drawTorso(ctx, x, y, frame, hurtFlash = false) {
        ctx.save();

        // Main armor (chest plate)
        const bodyColor = hurtFlash ? '#ff6666' : '#34495e';
        const shineColor = hurtFlash ? '#ffaaaa' : '#5d6d7e';

        // Chest plate
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.moveTo(x - 12, y - 15);
        ctx.lineTo(x - 14, y + 5);
        ctx.lineTo(x - 8, y + 8);
        ctx.lineTo(x + 8, y + 8);
        ctx.lineTo(x + 14, y + 5);
        ctx.lineTo(x + 12, y - 15);
        ctx.closePath();
        ctx.fill();

        // Armor plates detail
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - 10, y - 10);
        ctx.lineTo(x + 10, y - 10);
        ctx.moveTo(x - 9, y - 5);
        ctx.lineTo(x + 9, y - 5);
        ctx.moveTo(x - 8, y);
        ctx.lineTo(x + 8, y);
        ctx.stroke();

        // Shoulder armor (left)
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.arc(x - 13, y - 12, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = shineColor;
        ctx.beginPath();
        ctx.arc(x - 15, y - 14, 2, 0, Math.PI * 2);
        ctx.fill();

        // Shoulder armor (right)
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.arc(x + 13, y - 12, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = shineColor;
        ctx.beginPath();
        ctx.arc(x + 15, y - 14, 2, 0, Math.PI * 2);
        ctx.fill();

        // Belt
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x - 10, y + 6, 20, 3);
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(x - 3, y + 6, 6, 3);

        ctx.restore();
    }

    // Draw armored arms
    drawArms(ctx, x, y, frame, attackFrame = 0, hurtFlash = false) {
        ctx.save();

        const armColor = hurtFlash ? '#ff6666' : '#2c3e50';
        const breathOffset = Math.sin(frame * 0.1) * 1;

        // Left arm
        ctx.fillStyle = armColor;
        const leftArmAngle = attackFrame > 0 ? -0.5 : breathOffset * 0.1;
        ctx.translate(x - 12, y - 8);
        ctx.rotate(leftArmAngle);
        ctx.fillRect(-3, 0, 6, 15);

        // Left gauntlet
        ctx.fillStyle = hurtFlash ? '#ffaaaa' : '#5d6d7e';
        ctx.fillRect(-4, 12, 8, 5);

        ctx.rotate(-leftArmAngle);
        ctx.translate(-(x - 12), -(y - 8));

        // Right arm (sword arm)
        ctx.fillStyle = armColor;
        const rightArmAngle = attackFrame > 0 ? -1.2 - attackFrame * 0.5 : breathOffset * 0.1;
        ctx.translate(x + 12, y - 8);
        ctx.rotate(rightArmAngle);
        ctx.fillRect(-3, 0, 6, 15);

        // Right gauntlet
        ctx.fillStyle = hurtFlash ? '#ffaaaa' : '#5d6d7e';
        ctx.fillRect(-4, 12, 8, 5);

        ctx.restore();
    }

    // Draw legs with armor
    drawLegs(ctx, x, y, frame, walkCycle = 0, hurtFlash = false) {
        ctx.save();

        const legColor = hurtFlash ? '#ff6666' : '#34495e';
        const walk = Math.sin(walkCycle) * 0.2;

        // Left leg
        ctx.fillStyle = legColor;
        ctx.translate(x - 5, y + 8);
        ctx.rotate(walk);
        ctx.fillRect(-3, 0, 6, 18);

        // Left knee pad
        ctx.fillStyle = hurtFlash ? '#ffaaaa' : '#5d6d7e';
        ctx.fillRect(-4, 8, 8, 4);

        // Left boot
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(-4, 16, 8, 4);

        ctx.rotate(-walk);
        ctx.translate(-(x - 5), -(y + 8));

        // Right leg
        ctx.fillStyle = legColor;
        ctx.translate(x + 5, y + 8);
        ctx.rotate(-walk);
        ctx.fillRect(-3, 0, 6, 18);

        // Right knee pad
        ctx.fillStyle = hurtFlash ? '#ffaaaa' : '#5d6d7e';
        ctx.fillRect(-4, 8, 8, 4);

        // Right boot
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(-4, 16, 8, 4);

        ctx.restore();
    }

    // Draw shield
    drawShield(ctx, x, y, frame, blocking = false, hurtFlash = false) {
        ctx.save();

        const shieldX = x - 18;
        const shieldY = y;
        const blockOffset = blocking ? -5 : 0;

        // Shield body
        ctx.fillStyle = hurtFlash ? '#ff6666' : '#c0392b';
        ctx.beginPath();
        ctx.moveTo(shieldX + blockOffset, shieldY - 12);
        ctx.lineTo(shieldX - 5 + blockOffset, shieldY - 8);
        ctx.lineTo(shieldX - 5 + blockOffset, shieldY + 8);
        ctx.lineTo(shieldX + blockOffset, shieldY + 12);
        ctx.lineTo(shieldX + 5 + blockOffset, shieldY + 8);
        ctx.lineTo(shieldX + 5 + blockOffset, shieldY - 8);
        ctx.closePath();
        ctx.fill();

        // Shield rim
        ctx.strokeStyle = hurtFlash ? '#ffaa00' : '#f39c12';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Shield emblem
        ctx.fillStyle = hurtFlash ? '#ffaa00' : '#f39c12';
        ctx.beginPath();
        ctx.arc(shieldX + blockOffset, shieldY, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    // Draw sword
    drawSword(ctx, x, y, frame, attackFrame = 0, hurtFlash = false) {
        ctx.save();

        const swordX = x + 15;
        const swordY = y + 5;

        ctx.translate(swordX, swordY);

        // Sword angle based on attack
        let swordAngle = -0.5;
        if (attackFrame > 0) {
            swordAngle = -2.5 - attackFrame * 1.5;
        }
        ctx.rotate(swordAngle);

        // Blade
        const gradient = ctx.createLinearGradient(0, -20, 0, 0);
        gradient.addColorStop(0, hurtFlash ? '#ffffff' : '#e8e8e8');
        gradient.addColorStop(0.5, hurtFlash ? '#ffcccc' : '#c0c0c0');
        gradient.addColorStop(1, hurtFlash ? '#ff9999' : '#a0a0a0');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, -25);
        ctx.lineTo(2, -22);
        ctx.lineTo(2, 0);
        ctx.lineTo(-2, 0);
        ctx.lineTo(-2, -22);
        ctx.closePath();
        ctx.fill();

        // Blade edge highlight
        ctx.strokeStyle = hurtFlash ? '#ffffff' : '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-1, -24);
        ctx.lineTo(-1, -5);
        ctx.stroke();

        // Cross-guard
        ctx.fillStyle = hurtFlash ? '#ffaa00' : '#d4af37';
        ctx.fillRect(-6, -2, 12, 3);

        // Handle
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(-2, 0, 4, 8);

        // Pommel
        ctx.fillStyle = hurtFlash ? '#ffaa00' : '#d4af37';
        ctx.beginPath();
        ctx.arc(0, 9, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    // Main draw function
    draw(ctx, x, y, animation, frame, hurtFlash = false) {
        ctx.save();

        // Calculate animation offsets
        let walkCycle = 0;
        let attackFrame = 0;
        let breathOffset = Math.sin(frame * 0.05) * 2;
        let blocking = false;

        switch(animation) {
            case 'walk':
                walkCycle = frame * 0.2;
                breathOffset = 0;
                break;
            case 'attack':
                attackFrame = Math.min(frame / 5, 1);
                break;
            case 'block':
                blocking = true;
                break;
            case 'hurt':
                breathOffset = Math.sin(frame * 0.5) * 5;
                break;
        }

        const finalY = y + breathOffset;

        // Draw character parts (back to front)
        this.drawLegs(ctx, x, finalY, frame, walkCycle, hurtFlash);
        this.drawShield(ctx, x, finalY, frame, blocking, hurtFlash);
        this.drawTorso(ctx, x, finalY, frame, hurtFlash);
        this.drawArms(ctx, x, finalY, frame, attackFrame, hurtFlash);
        this.drawSword(ctx, x, finalY, frame, attackFrame, hurtFlash);
        this.drawHead(ctx, x, finalY, frame, hurtFlash);

        ctx.restore();
    }
}

// Animation Controller
class AnimationController {
    constructor() {
        this.currentAnimation = 'idle';
        this.frame = 0;
        this.animationSpeed = 1;
        this.loop = true;
    }

    play(animationName, loop = true) {
        if (this.currentAnimation !== animationName) {
            this.currentAnimation = animationName;
            this.frame = 0;
            this.loop = loop;
        }
    }

    update() {
        this.frame += this.animationSpeed;

        // Reset frame based on animation
        if (!this.loop) {
            if (this.currentAnimation === 'attack' && this.frame > 10) {
                this.play('idle');
            }
            if (this.currentAnimation === 'hurt' && this.frame > 15) {
                this.play('idle');
            }
        }
    }

    isPlaying(animationName) {
        return this.currentAnimation === animationName;
    }
}

// Character Classes
const CLASSES = {
    warrior: {
        name: 'Savaşçı',
        icon: '🛡️',
        baseHP: 150,
        baseMP: 50,
        baseDamage: 15,
        baseDefense: 10,
        useSprite: true,  // Use custom sprite instead of emoji
        skills: [
            { name: 'Güçlü Vuruş', icon: '⚔️', damage: 30, mpCost: 15, cooldown: 3000, key: 'Q' },
            { name: 'Kalkan', icon: '🛡️', defense: 20, mpCost: 20, cooldown: 5000, key: 'W', duration: 3000 },
            { name: 'Savaş Çığlığı', icon: '💥', damage: 50, mpCost: 30, cooldown: 8000, key: 'E' }
        ]
    },
    ninja: {
        name: 'Ninja',
        icon: '🗡️',
        baseHP: 100,
        baseMP: 80,
        baseDamage: 25,
        baseDefense: 5,
        useSprite: false,
        skills: [
            { name: 'Hızlı Saldırı', icon: '⚡', damage: 20, mpCost: 10, cooldown: 2000, key: 'Q' },
            { name: 'Gölge Adımı', icon: '💨', dodge: true, mpCost: 15, cooldown: 4000, key: 'W' },
            { name: 'Kritik Vuruş', icon: '🗡️', damage: 60, mpCost: 25, cooldown: 6000, key: 'E' }
        ]
    },
    shaman: {
        name: 'Şaman',
        icon: '🔮',
        baseHP: 120,
        baseMP: 120,
        baseDamage: 18,
        baseDefense: 7,
        useSprite: false,
        skills: [
            { name: 'Işın', icon: '✨', damage: 25, mpCost: 12, cooldown: 2500, key: 'Q' },
            { name: 'İyileştirme', icon: '💚', heal: 40, mpCost: 20, cooldown: 5000, key: 'W' },
            { name: 'Yıldırım', icon: '⚡', damage: 45, mpCost: 28, cooldown: 7000, key: 'E' }
        ]
    },
    sura: {
        name: 'Sura',
        icon: '⚡',
        baseHP: 130,
        baseMP: 100,
        baseDamage: 20,
        baseDefense: 8,
        useSprite: false,
        skills: [
            { name: 'Karanlık Kılıç', icon: '🌑', damage: 28, mpCost: 14, cooldown: 2500, key: 'Q' },
            { name: 'Ruh Emme', icon: '👻', damage: 20, lifesteal: 0.5, mpCost: 18, cooldown: 4500, key: 'W' },
            { name: 'Kara Büyü', icon: '💀', damage: 55, mpCost: 32, cooldown: 8000, key: 'E' }
        ]
    }
};

// Mob types
const MOB_TYPES = [
    { name: 'Kurt', icon: '🐺', hp: 50, damage: 8, xp: 25, gold: 10, speed: 1.5 },
    { name: 'Goblin', icon: '👹', hp: 60, damage: 10, xp: 30, gold: 15, speed: 1.2 },
    { name: 'Ork', icon: '👾', hp: 80, damage: 12, xp: 40, gold: 20, speed: 1.0 },
    { name: 'Troll', icon: '🧟', hp: 120, damage: 15, xp: 60, gold: 30, speed: 0.8 },
    { name: 'Ejderha', icon: '🐉', hp: 200, damage: 25, xp: 100, gold: 50, speed: 0.6 }
];

// Items
const ITEMS = [
    { name: 'Can İksiri', icon: '❤️', type: 'potion', heal: 50 },
    { name: 'Mana İksiri', icon: '💙', type: 'potion', mana: 50 },
    { name: 'Altın', icon: '💰', type: 'gold', value: 10 },
    { name: 'Kılıç', icon: '⚔️', type: 'weapon', damage: 5 },
    { name: 'Zırh', icon: '🛡️', type: 'armor', defense: 5 }
];

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.player = null;
        this.mobs = [];
        this.projectiles = [];
        this.drops = [];
        this.inventory = Array(5).fill(null);

        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        // Enhanced visual systems
        this.particleSystem = new ParticleSystem();
        this.warriorSprite = new WarriorSprite();
        this.screenShake = { x: 0, y: 0, intensity: 0 };

        this.lastTime = Date.now();

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
            icon: classData.icon,
            useSprite: classData.useSprite || false,
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            size: 40,

            level: 1,
            xp: 0,
            xpToLevel: 100,

            hp: classData.baseHP,
            maxHP: classData.baseHP,
            mp: classData.baseMP,
            maxMP: classData.baseMP,

            damage: classData.baseDamage,
            defense: classData.baseDefense,

            speed: 3,
            skills: classData.skills.map(s => ({...s, cooldownRemaining: 0})),

            gold: 0,
            attackCooldown: 0,

            // Animation system
            animator: new AnimationController(),
            hurtTime: 0,
            blockingUntil: 0
        };

        this.updateHUD();
        this.createSkillButtons();

        document.getElementById('charSelect').classList.add('hidden');
        document.getElementById('gameScreen').classList.add('active');

        this.spawnMobs();
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
                <div class="skill-icon">${skill.icon}</div>
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

            // Skills
            if (e.key.toLowerCase() === 'q') this.useSkill(0);
            if (e.key.toLowerCase() === 'w') this.useSkill(1);
            if (e.key.toLowerCase() === 'e') this.useSkill(2);

            // Use potion
            if (e.key >= '1' && e.key <= '5') {
                this.useItem(parseInt(e.key) - 1);
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        // Joystick
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

    spawnMobs() {
        const mobCount = 5 + Math.floor(this.player.level / 2);

        for (let i = 0; i < mobCount; i++) {
            this.spawnMob();
        }
    }

    spawnMob() {
        const typeIndex = Math.min(
            Math.floor(this.player.level / 3),
            MOB_TYPES.length - 1
        );
        const type = MOB_TYPES[Math.floor(Math.random() * (typeIndex + 1))];

        const margin = 100;
        const x = Math.random() < 0.5
            ? Math.random() * margin
            : this.canvas.width - Math.random() * margin;
        const y = Math.random() < 0.5
            ? Math.random() * margin
            : this.canvas.height - Math.random() * margin;

        this.mobs.push({
            ...type,
            x, y,
            maxHP: type.hp,
            size: 35,
            targetCooldown: 0
        });
    }

    addScreenShake(intensity) {
        this.screenShake.intensity = Math.max(this.screenShake.intensity, intensity);
    }

    useSkill(index) {
        if (!this.player) return;

        const skill = this.player.skills[index];

        if (skill.cooldownRemaining > 0) return;
        if (this.player.mp < skill.mpCost) return;

        this.player.mp -= skill.mpCost;
        skill.cooldownRemaining = skill.cooldown;

        // Play attack animation
        this.player.animator.play('attack', false);

        // Skill effects
        if (skill.damage) {
            const nearestMob = this.findNearestMob();
            if (nearestMob) {
                const distance = this.getDistance(this.player, nearestMob);
                if (distance < 300) {
                    // Create slash trail
                    const angle = Math.atan2(nearestMob.y - this.player.y, nearestMob.x - this.player.x);
                    this.particleSystem.createSlashTrail(
                        this.player.x + Math.cos(angle) * 30,
                        this.player.y + Math.sin(angle) * 30,
                        angle,
                        '#ff4444'
                    );

                    setTimeout(() => {
                        this.damageEnemy(nearestMob, skill.damage + this.player.damage);
                        this.particleSystem.createImpact(nearestMob.x, nearestMob.y, '#ffaa00');
                        this.addScreenShake(5);
                    }, 200);

                    if (skill.lifesteal) {
                        this.player.hp = Math.min(
                            this.player.maxHP,
                            this.player.hp + skill.damage * skill.lifesteal
                        );
                    }
                }
            }
        }

        if (skill.heal) {
            this.player.hp = Math.min(this.player.maxHP, this.player.hp + skill.heal);
            this.particleSystem.createHealEffect(this.player.x, this.player.y);
        }

        if (skill.defense && skill.duration) {
            this.player.blockingUntil = Date.now() + skill.duration;
            this.player.animator.play('block', false);
            this.particleSystem.createShieldEffect(this.player.x, this.player.y);
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

    findNearestMob() {
        let nearest = null;
        let minDist = Infinity;

        this.mobs.forEach(mob => {
            const dist = this.getDistance(this.player, mob);
            if (dist < minDist) {
                minDist = dist;
                nearest = mob;
            }
        });

        return nearest;
    }

    getDistance(a, b) {
        return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }

    damageEnemy(enemy, damage) {
        enemy.hp -= damage;
        this.showDamage(enemy.x, enemy.y, damage);
        this.particleSystem.createBlood(enemy.x, enemy.y);

        if (enemy.hp <= 0) {
            this.killEnemy(enemy);
        }
    }

    killEnemy(enemy) {
        const index = this.mobs.indexOf(enemy);
        if (index > -1) {
            this.mobs.splice(index, 1);
        }

        // XP
        this.player.xp += enemy.xp;
        if (this.player.xp >= this.player.xpToLevel) {
            this.levelUp();
        }

        // Drop
        if (Math.random() < 0.4) {
            const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
            this.drops.push({
                ...item,
                x: enemy.x,
                y: enemy.y,
                size: 25
            });
        }

        // Spawn new mob
        setTimeout(() => this.spawnMob(), 3000);

        this.updateHUD();
    }

    levelUp() {
        this.player.level++;
        this.player.xp = 0;
        this.player.xpToLevel = Math.floor(this.player.xpToLevel * 1.5);

        this.player.maxHP += 20;
        this.player.hp = this.player.maxHP;
        this.player.maxMP += 10;
        this.player.mp = this.player.maxMP;
        this.player.damage += 3;
        this.player.defense += 2;

        this.showNotification('🎉 LEVEL UP! ' + this.player.level);
        this.updateHUD();
    }

    showDamage(x, y, damage) {
        const dmg = document.createElement('div');
        dmg.className = 'damage-number';
        dmg.textContent = '-' + damage;
        dmg.style.left = x + 'px';
        dmg.style.top = y + 'px';
        dmg.style.color = '#ff4444';
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

        // Add to inventory
        for (let i = 0; i < this.inventory.length; i++) {
            if (!this.inventory[i]) {
                this.inventory[i] = drop;
                this.updateInventory();
                this.showNotification(`+1 ${drop.name} ${drop.icon}`);
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
                this.particleSystem.createHealEffect(this.player.x, this.player.y);
            }
            if (item.mana) {
                this.player.mp = Math.min(this.player.maxMP, this.player.mp + item.mana);
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

    update() {
        if (!this.player) return;

        const now = Date.now();
        const deltaTime = now - this.lastTime;
        this.lastTime = now;

        // Update animation controller
        this.player.animator.update();

        // Player movement
        let dx = 0, dy = 0;
        let isMoving = false;

        if (this.keys['arrowleft'] || this.keys['a']) { dx -= 1; isMoving = true; }
        if (this.keys['arrowright'] || this.keys['d']) { dx += 1; isMoving = true; }
        if (this.keys['arrowup'] || this.keys['w']) { dy -= 1; isMoving = true; }
        if (this.keys['arrowdown'] || this.keys['s']) { dy += 1; isMoving = true; }

        // Joystick
        if (this.joystickActive) {
            dx = Math.cos(this.joystickAngle) * this.joystickPower;
            dy = Math.sin(this.joystickAngle) * this.joystickPower;
            isMoving = this.joystickPower > 0.1;
        }

        if (isMoving && !this.player.animator.isPlaying('attack') && !this.player.animator.isPlaying('hurt')) {
            this.player.animator.play('walk');
        } else if (!isMoving && !this.player.animator.isPlaying('attack') && !this.player.animator.isPlaying('hurt')) {
            this.player.animator.play('idle');
        }

        if (dx || dy) {
            const magnitude = Math.sqrt(dx * dx + dy * dy);
            dx = (dx / magnitude) * this.player.speed;
            dy = (dy / magnitude) * this.player.speed;

            this.player.x = Math.max(20, Math.min(this.canvas.width - 20, this.player.x + dx));
            this.player.y = Math.max(20, Math.min(this.canvas.height - 20, this.player.y + dy));
        }

        // Update mobs
        this.mobs.forEach(mob => {
            const dist = this.getDistance(this.player, mob);

            if (dist < 400) {
                const angle = Math.atan2(this.player.y - mob.y, this.player.x - mob.x);
                mob.x += Math.cos(angle) * mob.speed;
                mob.y += Math.sin(angle) * mob.speed;

                // Attack player
                if (dist < 50) {
                    if (mob.targetCooldown <= 0) {
                        // Check if player is blocking
                        const isBlocking = Date.now() < this.player.blockingUntil;
                        const damageReduction = isBlocking ? 0.3 : 1;

                        const damage = Math.max(1, Math.floor((mob.damage - this.player.defense) * damageReduction));
                        this.player.hp -= damage;
                        this.showDamage(this.player.x, this.player.y - 40, damage);

                        if (!isBlocking) {
                            this.particleSystem.createBlood(this.player.x, this.player.y - 20);
                            this.player.animator.play('hurt', false);
                            this.player.hurtTime = Date.now();
                        } else {
                            this.particleSystem.createShieldEffect(this.player.x, this.player.y);
                        }

                        mob.targetCooldown = 1000;
                        this.addScreenShake(3);

                        if (this.player.hp <= 0) {
                            this.gameOver();
                        }

                        this.updateHUD();
                    }
                }
            }

            if (mob.targetCooldown > 0) {
                mob.targetCooldown -= deltaTime;
            }
        });

        // Update drops
        this.drops.forEach(drop => {
            if (this.getDistance(this.player, drop) < 40) {
                this.pickupDrop(drop);
            }
        });

        // Update cooldowns
        this.player.skills.forEach(skill => {
            if (skill.cooldownRemaining > 0) {
                skill.cooldownRemaining -= deltaTime;
            }
        });

        // MP regen
        if (this.player.mp < this.player.maxMP) {
            this.player.mp = Math.min(this.player.maxMP, this.player.mp + 0.05);
            if (Math.random() < 0.05) this.updateHUD();
        }

        // Update particle system
        this.particleSystem.update(deltaTime);

        // Update screen shake
        if (this.screenShake.intensity > 0) {
            this.screenShake.x = (Math.random() - 0.5) * this.screenShake.intensity;
            this.screenShake.y = (Math.random() - 0.5) * this.screenShake.intensity;
            this.screenShake.intensity *= 0.9;
            if (this.screenShake.intensity < 0.1) {
                this.screenShake.intensity = 0;
                this.screenShake.x = 0;
                this.screenShake.y = 0;
            }
        }
    }

    draw() {
        // Apply screen shake
        this.ctx.save();
        this.ctx.translate(this.screenShake.x, this.screenShake.y);

        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(-this.screenShake.x, -this.screenShake.y, this.canvas.width, this.canvas.height);

        // Grid
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        this.ctx.lineWidth = 1;
        for (let x = 0; x < this.canvas.width; x += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.canvas.height; y += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        // Drops
        this.drops.forEach(drop => {
            // Floating animation
            const floatOffset = Math.sin(Date.now() * 0.003 + drop.x) * 3;

            this.ctx.font = drop.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';

            // Glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#ffd700';
            this.ctx.fillText(drop.icon, drop.x, drop.y + floatOffset);
            this.ctx.shadowBlur = 0;
        });

        // Mobs
        this.mobs.forEach(mob => {
            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(mob.x, mob.y + mob.size/2, mob.size/2, mob.size/4, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Mob icon
            this.ctx.font = mob.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(mob.icon, mob.x, mob.y);

            // HP bar
            const barWidth = 40;
            const barHeight = 4;
            const hpPercent = mob.hp / mob.maxHP;

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(mob.x - barWidth/2, mob.y - mob.size, barWidth, barHeight);

            this.ctx.fillStyle = hpPercent > 0.5 ? '#4ade80' : hpPercent > 0.25 ? '#fbbf24' : '#ef4444';
            this.ctx.fillRect(mob.x - barWidth/2, mob.y - mob.size, barWidth * hpPercent, barHeight);
        });

        // Player
        if (this.player) {
            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(this.player.x, this.player.y + this.player.size/2, this.player.size/2, this.player.size/4, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw player sprite or emoji
            if (this.player.useSprite) {
                const hurtFlash = Date.now() - this.player.hurtTime < 200;
                this.warriorSprite.draw(
                    this.ctx,
                    this.player.x,
                    this.player.y,
                    this.player.animator.currentAnimation,
                    this.player.animator.frame,
                    hurtFlash
                );
            } else {
                // Default emoji rendering
                this.ctx.font = this.player.size + 'px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = '#ffd700';
                this.ctx.fillText(this.player.icon, this.player.x, this.player.y);
                this.ctx.shadowBlur = 0;
            }
        }

        // Draw particles
        this.particleSystem.draw(this.ctx);

        this.ctx.restore();
    }

    updateHUD() {
        if (!this.player) return;

        document.getElementById('playerName').textContent = this.player.name;
        document.getElementById('playerLevel').textContent = `Seviye: ${this.player.level}`;

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
        alert('😵 Öldün!\n\nSeviye: ' + this.player.level + '\nXP: ' + this.player.xp);
        window.location.reload();
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game
const game = new Game();

function selectCharacter(className) {
    game.selectCharacter(className);
}
