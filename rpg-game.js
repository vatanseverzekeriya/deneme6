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

// Items with rarity system
const ITEM_RARITIES = {
    common: { color: '#ffffff', glow: 'rgba(255,255,255,0.3)', dropRate: 0.6 },
    rare: { color: '#4da6ff', glow: 'rgba(77,166,255,0.5)', dropRate: 0.25 },
    epic: { color: '#a335ee', glow: 'rgba(163,53,238,0.7)', dropRate: 0.12 },
    legendary: { color: '#ff8000', glow: 'rgba(255,128,0,0.9)', dropRate: 0.03 }
};

const ITEMS = [
    { name: 'Can İksiri', icon: '❤️', type: 'potion', heal: 50, rarity: 'common' },
    { name: 'Büyük Can İksiri', icon: '💗', type: 'potion', heal: 150, rarity: 'rare' },
    { name: 'Mana İksiri', icon: '💙', type: 'potion', mana: 50, rarity: 'common' },
    { name: 'Büyük Mana İksiri', icon: '💎', type: 'potion', mana: 150, rarity: 'rare' },
    { name: 'Altın', icon: '💰', type: 'gold', value: 10, rarity: 'common' },
    { name: 'Altın Çuval', icon: '💸', type: 'gold', value: 50, rarity: 'rare' },
    { name: 'Demir Kılıç', icon: '⚔️', type: 'weapon', damage: 5, upgrade: 0, rarity: 'common' },
    { name: 'Çelik Kılıç', icon: '🗡️', type: 'weapon', damage: 10, upgrade: 0, rarity: 'rare' },
    { name: 'Ejder Kılıcı', icon: '⚔️', type: 'weapon', damage: 20, upgrade: 0, rarity: 'epic' },
    { name: 'Efsanevi Kılıç', icon: '🗡️', type: 'weapon', damage: 35, upgrade: 0, rarity: 'legendary' },
    { name: 'Deri Zırh', icon: '🛡️', type: 'armor', defense: 5, upgrade: 0, rarity: 'common' },
    { name: 'Zincir Zırh', icon: '🛡️', type: 'armor', defense: 10, upgrade: 0, rarity: 'rare' },
    { name: 'Plaka Zırh', icon: '🛡️', type: 'armor', defense: 20, upgrade: 0, rarity: 'epic' },
    { name: 'Ejder Zırhı', icon: '🛡️', type: 'armor', defense: 35, upgrade: 0, rarity: 'legendary' }
];

// Boss Types
const BOSS_TYPES = [
    {
        name: 'Ejder Kralı',
        icon: '🐲',
        hp: 500,
        damage: 30,
        xp: 300,
        gold: 100,
        speed: 0.5,
        isBoss: true,
        dropRareItem: true
    },
    {
        name: 'Karanlık Büyücü',
        icon: '🧙',
        hp: 400,
        damage: 35,
        xp: 250,
        gold: 80,
        speed: 0.7,
        isBoss: true,
        dropRareItem: true
    },
    {
        name: 'Dev Troll',
        icon: '👹',
        hp: 600,
        damage: 25,
        xp: 350,
        gold: 120,
        speed: 0.4,
        isBoss: true,
        dropRareItem: true
    }
];

// Quests
const QUESTS = [
    { id: 1, name: 'İlk Av', desc: '5 mob öldür', type: 'kill', target: 5, reward: { xp: 50, gold: 20 } },
    { id: 2, name: 'Güçlü Düşman', desc: '1 boss öldür', type: 'boss', target: 1, reward: { xp: 200, gold: 100 } },
    { id: 3, name: 'Deneyim Kazan', desc: 'Seviye 5\'e ulaş', type: 'level', target: 5, reward: { gold: 150 } },
    { id: 4, name: 'Hazine Avcısı', desc: '10 item topla', type: 'collect', target: 10, reward: { xp: 100, gold: 50 } },
    { id: 5, name: 'Skill Ustası', desc: '50 skill kullan', type: 'skills', target: 50, reward: { xp: 150, gold: 75 } }
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
        this.particles = [];

        // Combat system
        this.targetedEnemy = null;
        this.autoAttackEnabled = false;
        this.comboCount = 0;
        this.comboTimer = 0;
        this.lastAttackTime = 0;

        // Quest system
        this.quests = [];
        this.activeQuest = null;
        this.questProgress = {};
        this.completedQuests = [];

        // Stats
        this.stats = {
            mobsKilled: 0,
            bossesKilled: 0,
            itemsCollected: 0,
            skillsUsed: 0,
            criticalHits: 0,
            maxCombo: 0
        };

        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        this.setupControls();
        this.initQuests();
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
            criticalChance: 0.15, // 15% base critical chance
            criticalDamage: 1.6,  // 60% extra damage on crit (like Metin2)

            speed: 3,
            skills: classData.skills.map(s => ({...s, cooldownRemaining: 0})),

            gold: 0,
            attackCooldown: 0,
            equippedWeapon: null,
            equippedArmor: null
        };

        this.updateHUD();
        this.createSkillButtons();

        document.getElementById('charSelect').classList.add('hidden');
        document.getElementById('gameScreen').classList.add('active');

        this.spawnMobs();
        this.gameLoop();
    }

    initQuests() {
        // Load first 3 quests
        this.quests = QUESTS.slice(0, 3).map(q => ({...q, progress: 0}));
        this.activeQuest = this.quests[0];
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

            // Auto-attack toggle
            if (e.key === ' ') {
                e.preventDefault();
                this.toggleAutoAttack();
            }

            // Target nearest enemy
            if (e.key.toLowerCase() === 't') {
                this.targetNearestEnemy();
            }

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

        // Spawn a boss every 5 levels
        if (this.player.level % 5 === 0 && this.player.level > 0) {
            this.spawnBoss();
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
            targetCooldown: 0,
            isBoss: false
        });
    }

    spawnBoss() {
        const boss = BOSS_TYPES[Math.floor(Math.random() * BOSS_TYPES.length)];

        const margin = 200;
        const x = margin + Math.random() * (this.canvas.width - margin * 2);
        const y = margin + Math.random() * (this.canvas.height - margin * 2);

        this.mobs.push({
            ...boss,
            x, y,
            maxHP: boss.hp * (1 + this.player.level * 0.2), // Scale with level
            hp: boss.hp * (1 + this.player.level * 0.2),
            size: 50,
            targetCooldown: 0
        });

        this.showNotification('⚠️ BOSS GÖRÜNDÜ: ' + boss.name + ' ⚠️');
        this.createParticles(x, y, 20, '#ff0000');
    }

    useSkill(index) {
        if (!this.player) return;

        const skill = this.player.skills[index];

        if (skill.cooldownRemaining > 0) return;
        if (this.player.mp < skill.mpCost) return;

        this.player.mp -= skill.mpCost;
        skill.cooldownRemaining = skill.cooldown;

        // Update stats
        this.stats.skillsUsed++;
        this.updateQuestProgress('skills', 1);

        // Skill effects
        if (skill.damage) {
            const nearestMob = this.targetedEnemy || this.findNearestMob();
            if (nearestMob) {
                const distance = this.getDistance(this.player, nearestMob);
                if (distance < 300) {
                    // Calculate damage with critical hit
                    let damage = skill.damage + this.player.damage;
                    if (this.player.equippedWeapon) {
                        damage += this.player.equippedWeapon.damage;
                    }

                    const isCritical = Math.random() < this.player.criticalChance;
                    if (isCritical) {
                        damage *= this.player.criticalDamage;
                        this.stats.criticalHits++;
                    }

                    // Combo system
                    this.updateCombo();

                    if (this.comboCount > 1) {
                        damage *= (1 + this.comboCount * 0.1); // 10% per combo
                    }

                    this.damageEnemy(nearestMob, damage, isCritical);

                    // Particle effects
                    this.createParticles(nearestMob.x, nearestMob.y, 10, isCritical ? '#ff0000' : '#ffff00');

                    if (skill.lifesteal) {
                        this.player.hp = Math.min(
                            this.player.maxHP,
                            this.player.hp + damage * skill.lifesteal
                        );
                    }
                }
            }
        }

        if (skill.heal) {
            this.player.hp = Math.min(this.player.maxHP, this.player.hp + skill.heal);
            this.createParticles(this.player.x, this.player.y, 15, '#00ff00');
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

    damageEnemy(enemy, damage, isCritical = false) {
        const finalDamage = Math.floor(damage);
        enemy.hp -= finalDamage;

        this.showDamage(enemy.x, enemy.y, finalDamage, isCritical);

        if (enemy.hp <= 0) {
            this.killEnemy(enemy);
        }
    }

    updateCombo() {
        const currentTime = Date.now();

        // Reset combo if too much time passed (2 seconds)
        if (currentTime - this.lastAttackTime > 2000) {
            this.comboCount = 0;
        }

        this.comboCount++;
        this.lastAttackTime = currentTime;
        this.comboTimer = 2000;

        if (this.comboCount > this.stats.maxCombo) {
            this.stats.maxCombo = this.comboCount;
        }

        // Show combo counter
        if (this.comboCount > 1) {
            this.showComboText(this.comboCount);
        }
    }

    createParticles(x, y, count, color) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 3;

            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                color: color,
                size: 3 + Math.random() * 4
            });
        }
    }

    updateQuestProgress(type, amount) {
        this.quests.forEach(quest => {
            if (quest.type === type && quest.progress < quest.target) {
                quest.progress += amount;
                if (quest.progress >= quest.target) {
                    this.completeQuest(quest);
                }
            }
        });
    }

    completeQuest(quest) {
        if (this.completedQuests.includes(quest.id)) return;

        this.completedQuests.push(quest.id);

        // Give rewards
        if (quest.reward.xp) {
            this.player.xp += quest.reward.xp;
        }
        if (quest.reward.gold) {
            this.player.gold += quest.reward.gold;
        }

        this.showNotification('✅ GÖREV TAMAMLANDI: ' + quest.name + '!');

        // Load next quest
        const nextQuestIndex = this.completedQuests.length;
        if (nextQuestIndex < QUESTS.length) {
            const newQuest = {...QUESTS[nextQuestIndex], progress: 0};
            this.quests.push(newQuest);
        }

        this.updateHUD();
    }

    killEnemy(enemy) {
        const index = this.mobs.indexOf(enemy);
        if (index > -1) {
            this.mobs.splice(index, 1);
        }

        // Update stats and quests
        this.stats.mobsKilled++;
        this.updateQuestProgress('kill', 1);

        if (enemy.isBoss) {
            this.stats.bossesKilled++;
            this.updateQuestProgress('boss', 1);
        }

        // XP and Gold
        this.player.xp += enemy.xp;
        this.player.gold += enemy.gold || 0;

        if (this.player.xp >= this.player.xpToLevel) {
            this.levelUp();
        }

        // Improved drop system with rarity
        this.dropItems(enemy);

        // Clear target if killed
        if (this.targetedEnemy === enemy) {
            this.targetedEnemy = null;
        }

        // Particle effects
        this.createParticles(enemy.x, enemy.y, 15, enemy.isBoss ? '#ff8000' : '#ffff00');

        // Spawn new mob
        setTimeout(() => this.spawnMob(), 3000);

        this.updateHUD();
    }

    dropItems(enemy) {
        let dropChance = enemy.isBoss ? 1.0 : 0.5;

        if (Math.random() < dropChance) {
            // Determine rarity based on luck and boss status
            let selectedRarity = 'common';

            if (enemy.isBoss || enemy.dropRareItem) {
                const roll = Math.random();
                if (roll < 0.03) selectedRarity = 'legendary';
                else if (roll < 0.15) selectedRarity = 'epic';
                else if (roll < 0.40) selectedRarity = 'rare';
            } else {
                const roll = Math.random();
                if (roll < 0.05) selectedRarity = 'rare';
                else if (roll < 0.15) selectedRarity = 'epic';
            }

            // Filter items by rarity
            const possibleItems = ITEMS.filter(item => item.rarity === selectedRarity);
            if (possibleItems.length > 0) {
                const item = {...possibleItems[Math.floor(Math.random() * possibleItems.length)]};

                // For weapons and armor, add random upgrade
                if ((item.type === 'weapon' || item.type === 'armor') && Math.random() < 0.3) {
                    item.upgrade = Math.floor(Math.random() * 5) + 1;
                }

                this.drops.push({
                    ...item,
                    x: enemy.x,
                    y: enemy.y,
                    size: 25
                });
            }
        }

        // Boss always drops multiple items
        if (enemy.isBoss) {
            for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) {
                const item = {...ITEMS[Math.floor(Math.random() * ITEMS.length)]};
                this.drops.push({
                    ...item,
                    x: enemy.x + (Math.random() - 0.5) * 50,
                    y: enemy.y + (Math.random() - 0.5) * 50,
                    size: 25
                });
            }
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
        this.player.criticalChance += 0.01; // Increase crit chance by 1% per level

        // Check level quest
        this.updateQuestProgress('level', this.player.level);

        // Spawn boss every 5 levels
        if (this.player.level % 5 === 0) {
            setTimeout(() => this.spawnBoss(), 2000);
        }

        this.showNotification('🎉 LEVEL UP! Seviye ' + this.player.level);
        this.createParticles(this.player.x, this.player.y, 30, '#ffd700');
        this.updateHUD();
    }

    showDamage(x, y, damage, isCritical = false) {
        const dmg = document.createElement('div');
        dmg.className = 'damage-number';
        dmg.textContent = (isCritical ? 'CRIT! ' : '') + '-' + Math.floor(damage);
        dmg.style.left = x + 'px';
        dmg.style.top = y + 'px';
        dmg.style.color = isCritical ? '#ff0000' : '#ff4444';
        dmg.style.fontSize = isCritical ? '32px' : '24px';
        dmg.style.fontWeight = 'bold';
        if (isCritical) {
            dmg.style.textShadow = '0 0 10px #ff0000';
        }
        document.body.appendChild(dmg);

        setTimeout(() => dmg.remove(), 1000);
    }

    showComboText(combo) {
        const comboDiv = document.createElement('div');
        comboDiv.className = 'damage-number';
        comboDiv.textContent = combo + ' COMBO!';
        comboDiv.style.left = (this.player.x + 50) + 'px';
        comboDiv.style.top = (this.player.y - 50) + 'px';
        comboDiv.style.color = '#ffd700';
        comboDiv.style.fontSize = '28px';
        comboDiv.style.fontWeight = 'bold';
        comboDiv.style.textShadow = '0 0 10px #ffd700';
        document.body.appendChild(comboDiv);

        setTimeout(() => comboDiv.remove(), 1000);
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

        // Handle gold separately
        if (drop.type === 'gold') {
            this.player.gold += drop.value;
            this.showNotification(`+${drop.value} Altın ${drop.icon}`);
            this.updateHUD();
            return;
        }

        // Update stats
        this.stats.itemsCollected++;
        this.updateQuestProgress('collect', 1);

        // Add to inventory
        for (let i = 0; i < this.inventory.length; i++) {
            if (!this.inventory[i]) {
                this.inventory[i] = drop;
                this.updateInventory();

                const rarityColor = ITEM_RARITIES[drop.rarity]?.color || '#ffffff';
                const upgradeTxt = drop.upgrade ? ` +${drop.upgrade}` : '';
                this.showNotification(`${drop.icon} ${drop.name}${upgradeTxt}`);
                this.createParticles(this.player.x, this.player.y, 5, rarityColor);
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
                this.createParticles(this.player.x, this.player.y, 10, '#00ff00');
            }
            if (item.mana) {
                this.player.mp = Math.min(this.player.maxMP, this.player.mp + item.mana);
                this.createParticles(this.player.x, this.player.y, 10, '#0000ff');
            }

            this.inventory[slot] = null;
            this.updateInventory();
            this.updateHUD();
        } else if (item.type === 'weapon') {
            // Equip weapon
            if (this.player.equippedWeapon) {
                // Swap with current weapon
                const oldWeapon = this.player.equippedWeapon;
                this.player.equippedWeapon = item;
                this.inventory[slot] = oldWeapon;
            } else {
                this.player.equippedWeapon = item;
                this.inventory[slot] = null;
            }
            this.showNotification(`⚔️ Kuşanıldı: ${item.name}`);
            this.updateInventory();
            this.updateHUD();
        } else if (item.type === 'armor') {
            // Equip armor
            if (this.player.equippedArmor) {
                const oldArmor = this.player.equippedArmor;
                this.player.equippedArmor = item;
                this.inventory[slot] = oldArmor;
            } else {
                this.player.equippedArmor = item;
                this.inventory[slot] = null;
            }
            this.showNotification(`🛡️ Kuşanıldı: ${item.name}`);
            this.updateInventory();
            this.updateHUD();
        }
    }

    updateInventory() {
        this.inventory.forEach((item, i) => {
            const slot = document.getElementById(`slot${i}`);
            if (item) {
                const upgradeTxt = item.upgrade ? `<span style="color: #ffd700; font-size: 10px;">+${item.upgrade}</span>` : '';
                slot.innerHTML = `${item.icon}${upgradeTxt}`;
                slot.classList.add('has-item');

                // Set border color based on rarity
                const rarityColor = ITEM_RARITIES[item.rarity]?.color || '#ffffff';
                slot.style.borderColor = rarityColor;
                slot.style.boxShadow = `0 0 10px ${ITEM_RARITIES[item.rarity]?.glow || 'rgba(255,255,255,0.3)'}`;

                // Add click handler for mobile
                slot.onclick = () => this.useItem(i);
                slot.style.cursor = 'pointer';
            } else {
                slot.innerHTML = '';
                slot.classList.remove('has-item');
                slot.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                slot.style.boxShadow = 'none';
                slot.onclick = null;
                slot.style.cursor = 'default';
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

        // Auto-attack system
        if (this.autoAttackEnabled && this.player.attackCooldown <= 0) {
            const target = this.targetedEnemy || this.findNearestMob();
            if (target && this.getDistance(this.player, target) < 150) {
                this.performAutoAttack(target);
            }
        }

        if (this.player.attackCooldown > 0) {
            this.player.attackCooldown -= 16;
        }

        // Combo timer
        if (this.comboTimer > 0) {
            this.comboTimer -= 16;
            if (this.comboTimer <= 0) {
                this.comboCount = 0;
            }
        }

        // Update particles
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;
            p.vy += 0.1; // gravity
            return p.life > 0;
        });

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
                        let damage = Math.max(1, mob.damage - this.player.defense);

                        // Apply armor defense
                        if (this.player.equippedArmor) {
                            let armorDefense = this.player.equippedArmor.defense;
                            if (this.player.equippedArmor.upgrade) {
                                armorDefense += this.player.equippedArmor.upgrade * 2;
                            }
                            damage = Math.max(1, damage - armorDefense);
                        }

                        this.player.hp -= damage;
                        this.showDamage(this.player.x, this.player.y - 40, damage);
                        mob.targetCooldown = 1000;

                        // Reset combo when hit
                        this.comboCount = 0;

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

    performAutoAttack(target) {
        let damage = this.player.damage;

        // Add weapon damage
        if (this.player.equippedWeapon) {
            damage += this.player.equippedWeapon.damage;
            if (this.player.equippedWeapon.upgrade) {
                damage += this.player.equippedWeapon.upgrade * 3;
            }
        }

        // Critical hit check
        const isCritical = Math.random() < this.player.criticalChance;
        if (isCritical) {
            damage *= this.player.criticalDamage;
            this.stats.criticalHits++;
        }

        // Combo system
        this.updateCombo();
        if (this.comboCount > 1) {
            damage *= (1 + this.comboCount * 0.1);
        }

        this.damageEnemy(target, damage, isCritical);
        this.createParticles(target.x, target.y, 5, isCritical ? '#ff0000' : '#ffffff');

        this.player.attackCooldown = 800; // Attack every 800ms
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
            this.ctx.globalAlpha = 1;
        });

        // Drops with rarity glow
        this.drops.forEach(drop => {
            // Glow effect for rare items
            if (drop.rarity && ITEM_RARITIES[drop.rarity]) {
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = ITEM_RARITIES[drop.rarity].glow;
            }

            this.ctx.font = drop.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(drop.icon, drop.x, drop.y);

            this.ctx.shadowBlur = 0;
        });

        // Mobs
        this.mobs.forEach(mob => {
            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(mob.x, mob.y + mob.size/2, mob.size/2, mob.size/4, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Boss glow effect
            if (mob.isBoss) {
                this.ctx.shadowBlur = 20;
                this.ctx.shadowColor = '#ff0000';
            }

            // Mob icon
            this.ctx.font = mob.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(mob.icon, mob.x, mob.y);

            this.ctx.shadowBlur = 0;

            // Target indicator
            if (this.targetedEnemy === mob) {
                this.ctx.strokeStyle = '#ff0000';
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.arc(mob.x, mob.y, mob.size + 5, 0, Math.PI * 2);
                this.ctx.stroke();
            }

            // HP bar
            const barWidth = mob.isBoss ? 60 : 40;
            const barHeight = mob.isBoss ? 6 : 4;
            const hpPercent = mob.hp / mob.maxHP;

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(mob.x - barWidth/2, mob.y - mob.size - 10, barWidth, barHeight);

            this.ctx.fillStyle = hpPercent > 0.5 ? '#4ade80' : hpPercent > 0.25 ? '#fbbf24' : '#ef4444';
            this.ctx.fillRect(mob.x - barWidth/2, mob.y - mob.size - 10, barWidth * hpPercent, barHeight);

            // Boss name
            if (mob.isBoss) {
                this.ctx.font = '12px Arial';
                this.ctx.fillStyle = '#ff0000';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(mob.name, mob.x, mob.y - mob.size - 20);
            }
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

            // Combo display on player
            if (this.comboCount > 1) {
                this.ctx.font = '16px Arial';
                this.ctx.fillStyle = '#ffd700';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(this.comboCount + 'x', this.player.x, this.player.y - 50);
            }
        }
    }

    updateHUD() {
        if (!this.player) return;

        let nameText = this.player.name;
        if (this.player.gold > 0) {
            nameText += ` | 💰${this.player.gold}`;
        }

        document.getElementById('playerName').textContent = nameText;
        document.getElementById('playerLevel').textContent = `Lv.${this.player.level}`;

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

    toggleAutoAttack() {
        this.autoAttackEnabled = !this.autoAttackEnabled;
        const btn = document.getElementById('autoAttackBtn');
        if (this.autoAttackEnabled) {
            btn.style.background = 'rgba(100, 255, 100, 0.8)';
            btn.style.borderColor = '#00ff00';
            this.showNotification('⚔️ Auto-Attack AÇIK');
        } else {
            btn.style.background = 'rgba(255, 100, 100, 0.8)';
            btn.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            this.showNotification('⚔️ Auto-Attack KAPALI');
        }
    }

    targetNearestEnemy() {
        const nearest = this.findNearestMob();
        if (nearest) {
            this.targetedEnemy = nearest;
            this.showNotification('🎯 Hedef: ' + nearest.name);
            this.createParticles(nearest.x, nearest.y, 10, '#ff0000');
        }
    }

    updateQuestUI() {
        const questList = document.getElementById('questList');
        if (!questList) return;

        let html = '';
        this.quests.slice(0, 3).forEach(quest => {
            const isCompleted = this.completedQuests.includes(quest.id);
            const progress = Math.min(quest.progress, quest.target);

            if (!isCompleted) {
                html += `
                    <div style="margin-bottom: 8px; padding: 5px; background: rgba(255,255,255,0.05); border-radius: 5px;">
                        <div style="color: #ffd700; font-weight: bold;">${quest.name}</div>
                        <div style="color: #aaa; font-size: 10px;">${quest.desc}</div>
                        <div style="color: #fff; margin-top: 3px;">${progress}/${quest.target}</div>
                        <div style="width: 100%; height: 3px; background: rgba(0,0,0,0.5); border-radius: 2px; margin-top: 2px;">
                            <div style="width: ${(progress/quest.target)*100}%; height: 100%; background: #ffd700; border-radius: 2px;"></div>
                        </div>
                    </div>
                `;
            }
        });

        if (html === '') {
            html = '<div style="color: #aaa;">Tüm görevler tamamlandı!</div>';
        }

        questList.innerHTML = html;
    }

    gameOver() {
        const stats = `
😵 ÖLDÜN!

SEVIYE: ${this.player.level}
TOPLAM XP: ${this.player.xp}
ALTIN: ${this.player.gold}

İSTATİSTİKLER:
💀 Mob Öldürüldü: ${this.stats.mobsKilled}
👹 Boss Öldürüldü: ${this.stats.bossesKilled}
💎 Item Toplandı: ${this.stats.itemsCollected}
⚡ Skill Kullanımı: ${this.stats.skillsUsed}
🔥 Kritik Vuruş: ${this.stats.criticalHits}
⭐ Maks Combo: ${this.stats.maxCombo}
`;
        alert(stats);
        window.location.reload();
    }

    gameLoop() {
        this.update();
        this.draw();
        this.updateQuestUI();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game
const game = new Game();

function selectCharacter(className) {
    game.selectCharacter(className);
}
