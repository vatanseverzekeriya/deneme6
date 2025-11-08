// Character Classes
const CLASSES = {
    warrior: {
        name: 'Savaşçı',
        icon: '🛡️',
        baseHP: 150,
        baseMP: 50,
        baseDamage: 15,
        baseDefense: 10,
        skills: [
            { name: 'Güçlü Vuruş', icon: '⚔️', damage: 30, mpCost: 15, cooldown: 3000, key: 'Q' },
            { name: 'Kalkan', icon: '🛡️', defense: 20, mpCost: 20, cooldown: 5000, key: 'W' },
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

// Particle System Engine
class Particle {
    constructor(x, y, config) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * (config.speedX || 4);
        this.vy = (Math.random() - 0.5) * (config.speedY || 4);
        this.life = config.life || 60;
        this.maxLife = this.life;
        this.size = config.size || 5;
        this.color = config.color || '#fff';
        this.gravity = config.gravity || 0;
        this.friction = config.friction || 0.98;
        this.glow = config.glow || false;
        this.shape = config.shape || 'circle'; // circle, square, star
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.life--;
        return this.life > 0;
    }

    draw(ctx) {
        const alpha = this.life / this.maxLife;
        ctx.globalAlpha = alpha;

        if (this.glow) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
        }

        ctx.fillStyle = this.color;

        if (this.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.shape === 'square') {
            ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        } else if (this.shape === 'star') {
            this.drawStar(ctx, this.x, this.y, 5, this.size, this.size/2);
        }

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }

    drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);

        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }

        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();
    }
}

class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    emit(x, y, count, config) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(x, y, config));
        }
    }

    // Preset effects
    bloodSplatter(x, y) {
        this.emit(x, y, 15, {
            speedX: 8,
            speedY: 8,
            life: 40,
            size: 4,
            color: '#ff0000',
            gravity: 0.3,
            friction: 0.95
        });
    }

    goldSparkle(x, y) {
        this.emit(x, y, 20, {
            speedX: 6,
            speedY: 6,
            life: 50,
            size: 3,
            color: '#ffd700',
            gravity: -0.1,
            friction: 0.97,
            glow: true,
            shape: 'star'
        });
    }

    levelUpEffect(x, y) {
        this.emit(x, y, 50, {
            speedX: 8,
            speedY: 8,
            life: 80,
            size: 5,
            color: '#00ffff',
            gravity: -0.15,
            friction: 0.96,
            glow: true,
            shape: 'star'
        });
    }

    skillEffect(x, y, color, count = 30) {
        this.emit(x, y, count, {
            speedX: 10,
            speedY: 10,
            life: 60,
            size: 6,
            color: color,
            gravity: 0.05,
            friction: 0.94,
            glow: true
        });
    }

    healEffect(x, y) {
        this.emit(x, y, 25, {
            speedX: 4,
            speedY: 6,
            life: 70,
            size: 4,
            color: '#00ff00',
            gravity: -0.2,
            friction: 0.98,
            glow: true,
            shape: 'circle'
        });
    }

    explosionEffect(x, y, color) {
        this.emit(x, y, 40, {
            speedX: 12,
            speedY: 12,
            life: 50,
            size: 8,
            color: color,
            gravity: 0.2,
            friction: 0.92,
            glow: true
        });
    }

    update() {
        this.particles = this.particles.filter(p => p.update());
    }

    draw(ctx) {
        this.particles.forEach(p => p.draw(ctx));
    }
}

// Sound System
class SoundSystem {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.musicGain = null;
        this.sfxGain = null;
        this.enabled = true;
        this.init();
    }

    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // Create gain nodes for volume control
            this.musicGain = this.audioContext.createGain();
            this.musicGain.gain.value = 0.3;
            this.musicGain.connect(this.audioContext.destination);

            this.sfxGain = this.audioContext.createGain();
            this.sfxGain.gain.value = 0.5;
            this.sfxGain.connect(this.audioContext.destination);
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }

    // Generate sound effects using oscillators
    playHit() {
        if (!this.enabled) return;
        const osc = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        osc.connect(gainNode);
        gainNode.connect(this.sfxGain);

        osc.frequency.value = 200;
        osc.type = 'square';

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.1);
    }

    playSkill() {
        if (!this.enabled) return;
        const osc = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        osc.connect(gainNode);
        gainNode.connect(this.sfxGain);

        osc.frequency.setValueAtTime(400, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.2);
        osc.type = 'sine';

        gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.2);
    }

    playLevelUp() {
        if (!this.enabled) return;
        const times = [0, 0.1, 0.2];
        const freqs = [523, 659, 784];

        times.forEach((time, i) => {
            const osc = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            osc.connect(gainNode);
            gainNode.connect(this.sfxGain);

            osc.frequency.value = freqs[i];
            osc.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime + time);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + time + 0.3);

            osc.start(this.audioContext.currentTime + time);
            osc.stop(this.audioContext.currentTime + time + 0.3);
        });
    }

    playLoot() {
        if (!this.enabled) return;
        const osc = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        osc.connect(gainNode);
        gainNode.connect(this.sfxGain);

        osc.frequency.setValueAtTime(800, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.1);
        osc.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);

        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.15);
    }

    playDeath() {
        if (!this.enabled) return;
        const osc = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        osc.connect(gainNode);
        gainNode.connect(this.sfxGain);

        osc.frequency.setValueAtTime(400, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.5);
        osc.type = 'sawtooth';

        gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.5);
    }
}

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

        // Graphics systems
        this.particleSystem = new ParticleSystem();
        this.soundSystem = new SoundSystem();

        // Animation
        this.animationFrame = 0;
        this.backgroundOffset = 0;

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
            attackCooldown: 0
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

    useSkill(index) {
        if (!this.player) return;

        const skill = this.player.skills[index];

        if (skill.cooldownRemaining > 0) return;
        if (this.player.mp < skill.mpCost) return;

        this.player.mp -= skill.mpCost;
        skill.cooldownRemaining = skill.cooldown;

        // Visual and audio feedback
        this.soundSystem.playSkill();

        // Determine skill color based on type
        const skillColors = {
            '⚔️': '#ff4444',
            '🛡️': '#4444ff',
            '💥': '#ff8800',
            '⚡': '#ffff00',
            '💨': '#aaaaaa',
            '🗡️': '#ff0000',
            '✨': '#ff00ff',
            '💚': '#00ff00',
            '🌑': '#6600ff',
            '👻': '#8800ff',
            '💀': '#ff00ff'
        };

        const skillColor = skillColors[skill.icon] || '#ffffff';

        // Skill effects
        if (skill.damage) {
            const nearestMob = this.findNearestMob();
            if (nearestMob) {
                const distance = this.getDistance(this.player, nearestMob);
                if (distance < 300) {
                    // Visual effect at target
                    this.particleSystem.skillEffect(nearestMob.x, nearestMob.y, skillColor, 30);
                    this.particleSystem.explosionEffect(nearestMob.x, nearestMob.y, skillColor);

                    this.damageEnemy(nearestMob, skill.damage + this.player.damage);

                    if (skill.lifesteal) {
                        this.player.hp = Math.min(
                            this.player.maxHP,
                            this.player.hp + skill.damage * skill.lifesteal
                        );
                        this.particleSystem.healEffect(this.player.x, this.player.y);
                    }
                }
            }
            // Effect at player position
            this.particleSystem.skillEffect(this.player.x, this.player.y, skillColor, 15);
        }

        if (skill.heal) {
            this.player.hp = Math.min(this.player.maxHP, this.player.hp + skill.heal);
            this.particleSystem.healEffect(this.player.x, this.player.y);
            this.particleSystem.healEffect(this.player.x, this.player.y - 20);
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

        // Blood splatter effect
        this.particleSystem.bloodSplatter(enemy.x, enemy.y);
        this.soundSystem.playHit();

        if (enemy.hp <= 0) {
            this.killEnemy(enemy);
        }
    }

    killEnemy(enemy) {
        const index = this.mobs.indexOf(enemy);
        if (index > -1) {
            this.mobs.splice(index, 1);
        }

        // Death effects
        this.particleSystem.explosionEffect(enemy.x, enemy.y, '#ff0000');
        this.soundSystem.playDeath();

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

            // Gold sparkle effect
            if (item.type === 'gold') {
                this.particleSystem.goldSparkle(enemy.x, enemy.y);
            }
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

        // Epic level up effects
        this.particleSystem.levelUpEffect(this.player.x, this.player.y);
        this.soundSystem.playLevelUp();

        // Multiple rings of particles
        setTimeout(() => this.particleSystem.levelUpEffect(this.player.x, this.player.y), 200);
        setTimeout(() => this.particleSystem.levelUpEffect(this.player.x, this.player.y), 400);

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

        // Pickup effects
        this.soundSystem.playLoot();
        if (drop.type === 'gold') {
            this.particleSystem.goldSparkle(drop.x, drop.y);
        } else {
            this.particleSystem.skillEffect(drop.x, drop.y, '#00ff00', 20);
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

        // Update animation frame
        this.animationFrame++;
        this.backgroundOffset += 0.5;

        // Update particle system
        this.particleSystem.update();

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
                        const damage = Math.max(1, mob.damage - this.player.defense);
                        this.player.hp -= damage;
                        this.showDamage(this.player.x, this.player.y - 40, damage);
                        this.particleSystem.bloodSplatter(this.player.x, this.player.y);
                        this.soundSystem.playHit();
                        mob.targetCooldown = 1000;

                        if (this.player.hp <= 0) {
                            this.gameOver();
                        }

                        this.updateHUD();
                    }
                }
            }

            if (mob.targetCooldown > 0) {
                mob.targetCooldown -= 16;
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
                skill.cooldownRemaining -= 16;
            }
        });

        // MP regen
        if (this.player.mp < this.player.maxMP) {
            this.player.mp = Math.min(this.player.maxMP, this.player.mp + 0.1);
            if (Math.random() < 0.1) this.updateHUD();
        }
    }

    draw() {
        // Background gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#0a0e27');
        gradient.addColorStop(0.5, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Parallax stars (layer 1 - far)
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        for (let i = 0; i < 50; i++) {
            const x = (i * 137.5 + this.backgroundOffset * 0.2) % this.canvas.width;
            const y = (i * 113.7) % this.canvas.height;
            this.ctx.fillRect(x, y, 2, 2);
        }

        // Parallax stars (layer 2 - middle)
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        for (let i = 0; i < 30; i++) {
            const x = (i * 173.2 + this.backgroundOffset * 0.5) % this.canvas.width;
            const y = (i * 157.3) % this.canvas.height;
            this.ctx.fillRect(x, y, 3, 3);
        }

        // Grid with parallax
        this.ctx.strokeStyle = 'rgba(100, 150, 255, 0.08)';
        this.ctx.lineWidth = 1;
        const gridOffset = this.backgroundOffset % 50;
        for (let x = -gridOffset; x < this.canvas.width; x += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = -gridOffset; y < this.canvas.height; y += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        // Drops with glow
        this.drops.forEach(drop => {
            // Glow effect
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = drop.type === 'gold' ? '#ffd700' : '#00ff00';

            this.ctx.font = drop.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';

            // Bobbing animation
            const bob = Math.sin(this.animationFrame * 0.05 + drop.x) * 3;
            this.ctx.fillText(drop.icon, drop.x, drop.y + bob);

            this.ctx.shadowBlur = 0;
        });

        // Mobs with enhanced rendering
        this.mobs.forEach(mob => {
            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            this.ctx.beginPath();
            this.ctx.ellipse(mob.x, mob.y + mob.size/2, mob.size/2, mob.size/4, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Breathing animation
            const breathe = Math.sin(this.animationFrame * 0.05) * 2;

            // Mob glow based on type
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = '#ff0000';

            // Mob icon
            this.ctx.font = (mob.size + breathe) + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(mob.icon, mob.x, mob.y);

            this.ctx.shadowBlur = 0;

            // Enhanced HP bar
            const barWidth = 50;
            const barHeight = 6;
            const hpPercent = mob.hp / mob.maxHP;

            // Bar background
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(mob.x - barWidth/2 - 1, mob.y - mob.size - 8, barWidth + 2, barHeight + 2);

            // Bar fill with gradient
            const hpGradient = this.ctx.createLinearGradient(
                mob.x - barWidth/2, 0,
                mob.x + barWidth/2, 0
            );
            if (hpPercent > 0.5) {
                hpGradient.addColorStop(0, '#4ade80');
                hpGradient.addColorStop(1, '#22c55e');
            } else if (hpPercent > 0.25) {
                hpGradient.addColorStop(0, '#fbbf24');
                hpGradient.addColorStop(1, '#f59e0b');
            } else {
                hpGradient.addColorStop(0, '#ef4444');
                hpGradient.addColorStop(1, '#dc2626');
            }

            this.ctx.fillStyle = hpGradient;
            this.ctx.fillRect(mob.x - barWidth/2, mob.y - mob.size - 7, barWidth * hpPercent, barHeight);

            // Bar shine
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.fillRect(mob.x - barWidth/2, mob.y - mob.size - 7, barWidth * hpPercent, 2);
        });

        // Player with enhanced rendering
        if (this.player) {
            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            this.ctx.beginPath();
            this.ctx.ellipse(this.player.x, this.player.y + this.player.size/2, this.player.size/2, this.player.size/4, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Aura/ring around player
            const auraRadius = this.player.size/2 + 5 + Math.sin(this.animationFrame * 0.1) * 3;
            this.ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(this.player.x, this.player.y, auraRadius, 0, Math.PI * 2);
            this.ctx.stroke();

            // Player icon with enhanced glow
            this.ctx.font = this.player.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';

            // Multi-layer glow effect
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = '#ffd700';
            this.ctx.fillText(this.player.icon, this.player.x, this.player.y);

            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#ffff00';
            this.ctx.fillText(this.player.icon, this.player.x, this.player.y);

            this.ctx.shadowBlur = 0;

            // Level indicator
            this.ctx.font = '12px Arial';
            this.ctx.fillStyle = '#ffd700';
            this.ctx.strokeStyle = '#000';
            this.ctx.lineWidth = 3;
            this.ctx.strokeText('Lv.' + this.player.level, this.player.x, this.player.y - this.player.size);
            this.ctx.fillText('Lv.' + this.player.level, this.player.x, this.player.y - this.player.size);
        }

        // Draw particle effects
        this.particleSystem.draw(this.ctx);
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
