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
    { name: 'İskelet', icon: '💀', hp: 70, damage: 11, xp: 35, gold: 18, speed: 1.1 },
    { name: 'Ork', icon: '👾', hp: 80, damage: 12, xp: 40, gold: 20, speed: 1.0 },
    { name: 'Golem', icon: '🗿', hp: 100, damage: 14, xp: 50, gold: 25, speed: 0.9 },
    { name: 'Troll', icon: '🧟', hp: 120, damage: 15, xp: 60, gold: 30, speed: 0.8 },
    { name: 'Vampir', icon: '🧛', hp: 150, damage: 20, xp: 80, gold: 40, speed: 0.7 },
    { name: 'Ejderha', icon: '🐉', hp: 200, damage: 25, xp: 100, gold: 50, speed: 0.6 },
    { name: 'Ateş Ruhu', icon: '👻', hp: 180, damage: 22, xp: 90, gold: 45, speed: 0.65 }
];

// Boss types
const BOSS_TYPES = [
    { name: 'Kara Şövalye', icon: '⚔️', hp: 500, damage: 30, xp: 500, gold: 200, speed: 0.5, size: 60, isBoss: true },
    { name: 'Cehennem Lordu', icon: '😈', hp: 800, damage: 40, xp: 800, gold: 300, speed: 0.4, size: 65, isBoss: true },
    { name: 'Antik Ejderha', icon: '🐲', hp: 1200, damage: 50, xp: 1200, gold: 500, speed: 0.3, size: 70, isBoss: true },
    { name: 'Karanlık Büyücü', icon: '🧙', hp: 1000, damage: 45, xp: 1000, gold: 400, speed: 0.35, size: 65, isBoss: true }
];

// Items
const ITEMS = [
    { name: 'Can İksiri', icon: '❤️', type: 'potion', heal: 50 },
    { name: 'Büyük Can İksiri', icon: '💖', type: 'potion', heal: 100 },
    { name: 'Mana İksiri', icon: '💙', type: 'potion', mana: 50 },
    { name: 'Büyük Mana İksiri', icon: '💜', type: 'potion', mana: 100 },
    { name: 'Altın', icon: '💰', type: 'gold', value: 10 },
    { name: 'Altın Yığını', icon: '💎', type: 'gold', value: 50 },
    { name: 'Demir Kılıç', icon: '⚔️', type: 'weapon', damage: 5 },
    { name: 'Çelik Kılıç', icon: '🗡️', type: 'weapon', damage: 10 },
    { name: 'Efsanevi Kılıç', icon: '⚜️', type: 'weapon', damage: 20 },
    { name: 'Deri Zırh', icon: '🛡️', type: 'armor', defense: 5 },
    { name: 'Demir Zırh', icon: '🔰', type: 'armor', defense: 10 },
    { name: 'Ejderha Zırhı', icon: '🐉', type: 'armor', defense: 20 }
];

// Achievements
const ACHIEVEMENTS = [
    { id: 'first_kill', name: 'İlk Kan', desc: 'İlk düşmanı öldür', check: (game) => game.player.kills >= 1 },
    { id: 'killer', name: 'Katil', desc: '10 düşman öldür', check: (game) => game.player.kills >= 10 },
    { id: 'slayer', name: 'Katliam', desc: '50 düşman öldür', check: (game) => game.player.kills >= 50 },
    { id: 'level_5', name: 'Güçleniyor', desc: 'Seviye 5\'e ulaş', check: (game) => game.player.level >= 5 },
    { id: 'level_10', name: 'Usta', desc: 'Seviye 10\'a ulaş', check: (game) => game.player.level >= 10 },
    { id: 'first_boss', name: 'Boss Avcısı', desc: 'İlk Boss\'u öldür', check: (game) => game.player.bossKills >= 1 },
    { id: 'combo_10', name: 'Kombo Ustası', desc: '10x Combo yap', check: (game) => game.maxCombo >= 10 },
    { id: 'rich', name: 'Zengin', desc: '500 altın topla', check: (game) => game.player.gold >= 500 }
];

// Sound System
class SoundSystem {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }

    playTone(frequency, duration, type = 'sine', volume = 0.1) {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = type;
        oscillator.frequency.value = frequency;
        gainNode.gain.value = volume;

        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    hit() {
        this.playTone(200, 0.1, 'square', 0.05);
    }

    kill() {
        this.playTone(150, 0.2, 'sawtooth', 0.08);
        setTimeout(() => this.playTone(100, 0.3, 'sawtooth', 0.05), 100);
    }

    levelUp() {
        this.playTone(523, 0.15, 'sine', 0.1);
        setTimeout(() => this.playTone(659, 0.15, 'sine', 0.1), 150);
        setTimeout(() => this.playTone(784, 0.3, 'sine', 0.1), 300);
    }

    achievement() {
        this.playTone(440, 0.1, 'sine', 0.1);
        setTimeout(() => this.playTone(554, 0.1, 'sine', 0.1), 100);
        setTimeout(() => this.playTone(659, 0.2, 'sine', 0.1), 200);
    }

    pickup() {
        this.playTone(800, 0.1, 'sine', 0.08);
    }

    boss() {
        this.playTone(100, 0.3, 'sawtooth', 0.15);
        setTimeout(() => this.playTone(80, 0.3, 'sawtooth', 0.15), 200);
    }

    skill() {
        this.playTone(600, 0.15, 'triangle', 0.07);
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.minimapCanvas = document.getElementById('minimap');
        this.minimapCtx = this.minimapCanvas.getContext('2d');

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.player = null;
        this.mobs = [];
        this.projectiles = [];
        this.drops = [];
        this.inventory = Array(5).fill(null);
        this.particles = [];
        this.unlockedAchievements = [];
        this.combo = 0;
        this.comboTimer = 0;
        this.maxCombo = 0;
        this.lastLevelUp = 0;
        this.autoSaveTimer = 0;

        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        this.sound = new SoundSystem();

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
            attackCooldown: 0,
            kills: 0,
            bossKills: 0,

            equipment: {
                weapon: null,
                armor: null
            }
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
        this.sound.skill();

        // Skill effects
        if (skill.damage) {
            const nearestMob = this.findNearestMob();
            if (nearestMob) {
                const distance = this.getDistance(this.player, nearestMob);
                if (distance < 300) {
                    this.damageEnemy(nearestMob, skill.damage + this.player.damage);

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
        // Combo system
        this.combo++;
        this.comboTimer = 3000; // 3 seconds to continue combo

        if (this.combo > this.maxCombo) {
            this.maxCombo = this.combo;
        }

        const comboDamage = Math.floor(damage * (1 + this.combo * 0.1));
        enemy.hp -= comboDamage;
        this.sound.hit();

        // Show combo if > 1
        const displayDamage = this.combo > 1 ? `${comboDamage} x${this.combo}` : comboDamage;
        this.showDamage(enemy.x, enemy.y, displayDamage);

        if (enemy.hp <= 0) {
            this.killEnemy(enemy);
        }
    }

    killEnemy(enemy) {
        const index = this.mobs.indexOf(enemy);
        if (index > -1) {
            this.mobs.splice(index, 1);
        }

        this.sound.kill();

        // Particle effect
        const particleColor = enemy.isBoss ? '#ff00ff' : '#ff4444';
        const particleCount = enemy.isBoss ? 50 : 20;
        this.createParticleBurst(enemy.x, enemy.y, particleCount, particleColor);

        // XP and stats
        this.player.xp += enemy.xp;
        this.player.gold += enemy.gold || 0;
        this.player.kills++;

        if (enemy.isBoss) {
            this.player.bossKills++;
            this.showNotification(`🏆 BOSS YENİLDİ! +${enemy.xp} XP, +${enemy.gold} Altın`);
        }

        // Check achievements
        this.checkAchievements();

        if (this.player.xp >= this.player.xpToLevel) {
            this.levelUp();
        }

        // Drop
        const dropChance = enemy.isBoss ? 1.0 : 0.4;
        const dropCount = enemy.isBoss ? 3 : 1;

        for (let i = 0; i < dropCount; i++) {
            if (Math.random() < dropChance) {
                const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
                this.drops.push({
                    ...item,
                    x: enemy.x + (Math.random() - 0.5) * 50,
                    y: enemy.y + (Math.random() - 0.5) * 50,
                    size: 25
                });
            }
        }

        // Spawn new mob (not for bosses)
        if (!enemy.isBoss) {
            setTimeout(() => this.spawnMob(), 3000);
        }

        this.updateHUD();
    }

    spawnBoss() {
        const bossIndex = Math.min(
            Math.floor(this.player.level / 10),
            BOSS_TYPES.length - 1
        );
        const bossType = BOSS_TYPES[bossIndex];

        const boss = {
            ...bossType,
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            maxHP: bossType.hp,
            targetCooldown: 0
        };

        this.mobs.push(boss);
        this.sound.boss();
        this.showNotification(`⚠️ BOSS ORTAYA ÇIKTI: ${boss.name}!`);
        this.createParticleBurst(boss.x, boss.y, 40, '#ff00ff');
    }

    createParticleBurst(x, y, count, color) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = 2 + Math.random() * 3;

            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                color: color,
                size: 3 + Math.random() * 3
            });
        }
    }

    checkAchievements() {
        ACHIEVEMENTS.forEach(achievement => {
            if (!this.unlockedAchievements.includes(achievement.id)) {
                if (achievement.check(this)) {
                    this.unlockedAchievements.push(achievement.id);
                    this.sound.achievement();
                    this.showNotification(`🏆 BAŞARIM: ${achievement.name} - ${achievement.desc}`);
                    this.createParticleBurst(this.player.x, this.player.y, 20, '#ffd700');
                }
            }
        });
    }

    saveGame() {
        if (!this.player) return;

        const saveData = {
            player: {
                class: this.player.class,
                level: this.player.level,
                xp: this.player.xp,
                xpToLevel: this.player.xpToLevel,
                hp: this.player.hp,
                maxHP: this.player.maxHP,
                mp: this.player.mp,
                maxMP: this.player.maxMP,
                damage: this.player.damage,
                defense: this.player.defense,
                gold: this.player.gold,
                kills: this.player.kills,
                bossKills: this.player.bossKills,
                equipment: this.player.equipment
            },
            inventory: this.inventory,
            unlockedAchievements: this.unlockedAchievements,
            maxCombo: this.maxCombo
        };

        localStorage.setItem('rpg_save', JSON.stringify(saveData));
    }

    loadGame() {
        const saveData = localStorage.getItem('rpg_save');
        if (!saveData) return false;

        try {
            const data = JSON.parse(saveData);

            // Start game with saved character
            this.selectCharacter(data.player.class);

            // Restore player data
            Object.assign(this.player, data.player);

            // Restore other data
            this.inventory = data.inventory || Array(5).fill(null);
            this.unlockedAchievements = data.unlockedAchievements || [];
            this.maxCombo = data.maxCombo || 0;

            this.updateHUD();
            this.updateInventory();

            return true;
        } catch (e) {
            console.error('Failed to load save:', e);
            return false;
        }
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

        this.sound.levelUp();

        // Boss spawn at every 5 levels
        if (this.player.level % 5 === 0) {
            this.spawnBoss();
        }

        // Particle effect for level up
        this.createParticleBurst(this.player.x, this.player.y, 30, '#ffd700');

        this.showNotification('🎉 LEVEL UP! ' + this.player.level);
        this.checkAchievements();
        this.updateHUD();
        this.lastLevelUp = this.player.level;
        this.saveGame();
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

        this.sound.pickup();

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
        } else if (item.type === 'gold') {
            this.player.gold += item.value || 10;
            this.inventory[slot] = null;
            this.updateInventory();
            this.updateHUD();
            this.showNotification(`💰 +${item.value || 10} Altın`);
        } else if (item.type === 'weapon') {
            // Unequip current weapon if any
            if (this.player.equipment.weapon) {
                this.player.damage -= this.player.equipment.weapon.damage;
            }

            // Equip new weapon
            this.player.equipment.weapon = item;
            this.player.damage += item.damage;
            this.inventory[slot] = null;
            this.updateInventory();
            this.updateHUD();
            this.showNotification(`⚔️ ${item.name} kuşanıldı! +${item.damage} Hasar`);
        } else if (item.type === 'armor') {
            // Unequip current armor if any
            if (this.player.equipment.armor) {
                this.player.defense -= this.player.equipment.armor.defense;
            }

            // Equip new armor
            this.player.equipment.armor = item;
            this.player.defense += item.defense;
            this.inventory[slot] = null;
            this.updateInventory();
            this.updateHUD();
            this.showNotification(`🛡️ ${item.name} kuşanıldı! +${item.defense} Savunma`);
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

        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.life -= 0.02;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }

        // Update combo timer
        if (this.comboTimer > 0) {
            this.comboTimer -= 16;
            if (this.comboTimer <= 0) {
                this.combo = 0;
            }
        }

        // Auto-save every 10 seconds
        this.autoSaveTimer += 16;
        if (this.autoSaveTimer >= 10000) {
            this.saveGame();
            this.autoSaveTimer = 0;
        }
    }

    draw() {
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

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

        // Particles
        this.particles.forEach(p => {
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1.0;

        // Drops
        this.drops.forEach(drop => {
            this.ctx.font = drop.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(drop.icon, drop.x, drop.y);
        });

        // Mobs
        this.mobs.forEach(mob => {
            const mobSize = mob.size || 35;

            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(mob.x, mob.y + mobSize/2, mobSize/2, mobSize/4, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Boss glow effect
            if (mob.isBoss) {
                this.ctx.shadowBlur = 20;
                this.ctx.shadowColor = '#ff00ff';
            }

            // Mob icon
            this.ctx.font = mobSize + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(mob.icon, mob.x, mob.y);
            this.ctx.shadowBlur = 0;

            // Boss name
            if (mob.isBoss) {
                this.ctx.font = '14px Arial';
                this.ctx.fillStyle = '#ff00ff';
                this.ctx.strokeStyle = 'black';
                this.ctx.lineWidth = 3;
                this.ctx.strokeText(mob.name, mob.x, mob.y - mobSize - 15);
                this.ctx.fillText(mob.name, mob.x, mob.y - mobSize - 15);
            }

            // HP bar
            const barWidth = mob.isBoss ? 80 : 40;
            const barHeight = mob.isBoss ? 6 : 4;
            const hpPercent = mob.hp / mob.maxHP;

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(mob.x - barWidth/2, mob.y - mobSize - 5, barWidth, barHeight);

            this.ctx.fillStyle = hpPercent > 0.5 ? '#4ade80' : hpPercent > 0.25 ? '#fbbf24' : '#ef4444';
            this.ctx.fillRect(mob.x - barWidth/2, mob.y - mobSize - 5, barWidth * hpPercent, barHeight);
        });

        // Player
        if (this.player) {
            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(this.player.x, this.player.y + this.player.size/2, this.player.size/2, this.player.size/4, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Player icon
            this.ctx.font = this.player.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';

            // Glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#ffd700';
            this.ctx.fillText(this.player.icon, this.player.x, this.player.y);
            this.ctx.shadowBlur = 0;
        }
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

        document.getElementById('goldDisplay').textContent = `💰 Altın: ${this.player.gold}`;

        if (this.combo > 1) {
            document.getElementById('comboDisplay').textContent = `🔥 COMBO x${this.combo}`;
        } else {
            document.getElementById('comboDisplay').textContent = '';
        }
    }

    gameOver() {
        alert('😵 Öldün!\n\nSeviye: ' + this.player.level + '\nXP: ' + this.player.xp);
        window.location.reload();
    }

    drawMinimap() {
        if (!this.player) return;

        const mmCtx = this.minimapCtx;
        const mmSize = this.minimapCanvas.width;
        const mapRadius = 300; // How far to show on minimap

        // Clear
        mmCtx.fillStyle = 'rgba(10, 14, 39, 0.9)';
        mmCtx.fillRect(0, 0, mmSize, mmSize);

        // Border
        mmCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        mmCtx.lineWidth = 2;
        mmCtx.strokeRect(0, 0, mmSize, mmSize);

        const scale = mmSize / (mapRadius * 2);
        const centerX = mmSize / 2;
        const centerY = mmSize / 2;

        // Draw mobs
        this.mobs.forEach(mob => {
            const dx = mob.x - this.player.x;
            const dy = mob.y - this.player.y;

            if (Math.abs(dx) < mapRadius && Math.abs(dy) < mapRadius) {
                const mmX = centerX + dx * scale;
                const mmY = centerY + dy * scale;

                mmCtx.fillStyle = mob.isBoss ? '#ff00ff' : '#ff4444';
                mmCtx.beginPath();
                mmCtx.arc(mmX, mmY, mob.isBoss ? 4 : 2, 0, Math.PI * 2);
                mmCtx.fill();
            }
        });

        // Draw drops
        this.drops.forEach(drop => {
            const dx = drop.x - this.player.x;
            const dy = drop.y - this.player.y;

            if (Math.abs(dx) < mapRadius && Math.abs(dy) < mapRadius) {
                const mmX = centerX + dx * scale;
                const mmY = centerY + dy * scale;

                mmCtx.fillStyle = '#ffd700';
                mmCtx.beginPath();
                mmCtx.arc(mmX, mmY, 1.5, 0, Math.PI * 2);
                mmCtx.fill();
            }
        });

        // Draw player
        mmCtx.fillStyle = '#00ff88';
        mmCtx.beginPath();
        mmCtx.arc(centerX, centerY, 3, 0, Math.PI * 2);
        mmCtx.fill();
    }

    gameLoop() {
        this.update();
        this.draw();
        this.drawMinimap();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game
const game = new Game();

function selectCharacter(className) {
    game.selectCharacter(className);
}
