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
    { name: 'Can İksiri', icon: '❤️', type: 'potion', heal: 50, rarity: 'common' },
    { name: 'Mana İksiri', icon: '💙', type: 'potion', mana: 50, rarity: 'common' },
    { name: 'Altın', icon: '💰', type: 'gold', value: 10, rarity: 'common' },
    { name: 'Kılıç', icon: '⚔️', type: 'weapon', damage: 5, rarity: 'rare' },
    { name: 'Zırh', icon: '🛡️', type: 'armor', defense: 5, rarity: 'rare' },
    { name: 'Efsanevi Kılıç', icon: '🗡️', type: 'weapon', damage: 15, rarity: 'epic' },
    { name: 'Ejder Zırhı', icon: '🛡️', type: 'armor', defense: 15, rarity: 'epic' },
    { name: 'Pet Yumurtası', icon: '🥚', type: 'pet_egg', rarity: 'legendary' }
];

// Pet Types
const PET_TYPES = [
    {
        name: 'Kurt',
        icon: '🐺',
        rarity: 'common',
        bonuses: { damage: 5, critChance: 0.05 },
        passive: 'Düşmanlara %5 ekstra hasar'
    },
    {
        name: 'Kartal',
        icon: '🦅',
        rarity: 'rare',
        bonuses: { speed: 1, xpBonus: 0.1 },
        passive: '%10 bonus XP kazancı'
    },
    {
        name: 'Ejderha Yavrusu',
        icon: '🐲',
        rarity: 'epic',
        bonuses: { damage: 10, defense: 5, hpBonus: 20 },
        passive: 'Tüm özelliklere bonus'
    },
    {
        name: 'Föniks',
        icon: '🔥',
        rarity: 'legendary',
        bonuses: { damage: 15, hpRegen: 2, revive: true },
        passive: 'Canın bitince bir kez diriltir'
    }
];

// Achievements
const ACHIEVEMENTS = [
    { id: 'first_kill', name: 'İlk Kan', desc: 'İlk düşmanını öldür', icon: '⚔️', reward: { gold: 50 } },
    { id: 'level_5', name: 'Acemi Savaşçı', desc: '5. seviyeye ulaş', icon: '⭐', reward: { gold: 100 } },
    { id: 'level_10', name: 'Deneyimli Savaşçı', desc: '10. seviyeye ulaş', icon: '⭐', reward: { gold: 200 } },
    { id: 'kill_100', name: 'Canavar Avcısı', desc: '100 düşman öldür', icon: '💀', reward: { gold: 300 } },
    { id: 'collect_pet', name: 'Pet Eğiticisi', desc: 'İlk petini edin', icon: '🐾', reward: { gold: 150 } },
    { id: 'craft_item', name: 'Demirci', desc: 'İlk itemini geliştir', icon: '⚒️', reward: { gold: 100 } },
    { id: 'boss_kill', name: 'Boss Katili', desc: 'İlk boss\'u öldür', icon: '👑', reward: { gold: 500 } }
];

// Daily Quests
const DAILY_QUESTS = [
    { id: 'kill_10', name: '10 Düşman Öldür', progress: 0, target: 10, reward: { gold: 50, xp: 50 } },
    { id: 'use_skills', name: '20 Beceri Kullan', progress: 0, target: 20, reward: { gold: 30, xp: 30 } },
    { id: 'collect_items', name: '5 Item Topla', progress: 0, target: 5, reward: { gold: 40, xp: 40 } },
    { id: 'level_up', name: 'Seviye Atla', progress: 0, target: 1, reward: { gold: 100, xp: 0 } }
];

// Boss Types
const BOSS_TYPES = [
    {
        name: 'Kızıl Kurt Kralı',
        icon: '🐺',
        level: 5,
        hp: 500,
        damage: 20,
        defense: 10,
        xp: 200,
        gold: 150,
        speed: 0.5,
        specialAbility: 'howl', // Grup çağırma
        loot: ['Efsanevi Kılıç', 'Pet Yumurtası']
    },
    {
        name: 'Kara Ejderha',
        icon: '🐉',
        level: 10,
        hp: 1000,
        damage: 35,
        defense: 20,
        xp: 500,
        gold: 300,
        speed: 0.3,
        specialAbility: 'fire_breath', // Ateş nefesi
        loot: ['Ejder Zırhı', 'Pet Yumurtası']
    },
    {
        name: 'Ölüm Lordu',
        icon: '💀',
        level: 15,
        hp: 1500,
        damage: 50,
        defense: 30,
        xp: 1000,
        gold: 500,
        speed: 0.4,
        specialAbility: 'summon_undead',
        loot: ['Efsanevi Kılıç', 'Ejder Zırhı', 'Pet Yumurtası']
    }
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

        // New features
        this.pets = [];
        this.activePet = null;
        this.achievements = ACHIEVEMENTS.map(a => ({ ...a, unlocked: false }));
        this.dailyQuests = DAILY_QUESTS.map(q => ({ ...q }));
        this.statistics = {
            totalKills: 0,
            totalDamageDealt: 0,
            skillsUsed: 0,
            itemsCollected: 0,
            bossesKilled: 0
        };
        this.autoBattle = false;
        this.offlineTime = 0;
        this.lastPlayTime = Date.now();
        this.currentBoss = null;
        this.bossSpawnTimer = 0;
        this.bossSpawnInterval = 60000; // 60 seconds

        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        this.setupControls();
        this.loadGameData();
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

        // Apply pet bonuses if active
        this.applyPetBonuses();

        this.updateHUD();
        this.createSkillButtons();

        document.getElementById('charSelect').classList.add('hidden');
        document.getElementById('gameScreen').classList.add('active');

        // Calculate offline earnings
        this.calculateOfflineEarnings();

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

        // Update statistics and quest
        this.statistics.skillsUsed++;
        this.updateQuest('use_skills', 1);

        // Skill effects
        if (skill.damage) {
            const nearestMob = this.findNearestMob();
            if (nearestMob) {
                const distance = this.getDistance(this.player, nearestMob);
                if (distance < 300) {
                    let damage = skill.damage + this.player.damage;

                    // Apply crit chance from pet
                    if (this.activePet && this.activePet.bonuses.critChance) {
                        if (Math.random() < this.activePet.bonuses.critChance) {
                            damage *= 2;
                            this.showDamage(nearestMob.x, nearestMob.y - 20, 'CRIT!');
                        }
                    }

                    this.damageEnemy(nearestMob, damage);

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

        // Check boss first (priority target)
        if (this.currentBoss) {
            const dist = this.getDistance(this.player, this.currentBoss);
            if (dist < minDist) {
                minDist = dist;
                nearest = this.currentBoss;
            }
        }

        // Then check regular mobs
        this.mobs.forEach(mob => {
            const dist = this.getDistance(this.player, mob);
            if (dist < minDist) {
                minDist = dist;
                nearest = mob;
            }
        });

        return nearest;
    }

    useBossAbility(boss) {
        switch(boss.specialAbility) {
            case 'howl':
                // Spawn 2 additional mobs
                this.showNotification('🐺 Boss yardım çağırdı!');
                for (let i = 0; i < 2; i++) {
                    this.spawnMob();
                }
                break;

            case 'fire_breath':
                // Area damage
                const dist = this.getDistance(this.player, boss);
                if (dist < 300) {
                    const damage = Math.floor(boss.damage * 1.5);
                    this.player.hp -= damage;
                    this.showDamage(this.player.x, this.player.y - 40, damage);
                    this.showNotification('🔥 Ateş nefesi!');
                    this.updateHUD();
                }
                break;

            case 'summon_undead':
                // Spawn undead minions
                this.showNotification('💀 Boss ölü ordusu çağırdı!');
                for (let i = 0; i < 3; i++) {
                    this.spawnMob();
                }
                break;
        }
    }

    getDistance(a, b) {
        return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }

    damageEnemy(enemy, damage) {
        enemy.hp -= damage;
        this.showDamage(enemy.x, enemy.y, damage);
        this.statistics.totalDamageDealt += damage;

        if (enemy.hp <= 0) {
            if (enemy.isBoss) {
                this.killBoss(enemy);
            } else {
                this.killEnemy(enemy);
            }
        }
    }

    killEnemy(enemy) {
        const index = this.mobs.indexOf(enemy);
        if (index > -1) {
            this.mobs.splice(index, 1);
        }

        // Update statistics
        this.statistics.totalKills++;
        this.updateQuest('kill_10', 1);

        // Check achievements
        this.checkAchievement('first_kill');
        this.checkAchievement('kill_100');

        // XP with bonus
        let xpGain = enemy.xp;
        if (this.activePet && this.activePet.bonuses.xpBonus) {
            xpGain = Math.floor(xpGain * (1 + this.activePet.bonuses.xpBonus));
        }

        this.player.xp += xpGain;
        if (this.player.xp >= this.player.xpToLevel) {
            this.levelUp();
        }

        // Gold
        this.player.gold += enemy.gold || 0;

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

        // Update quest
        this.updateQuest('level_up', 1);

        // Check achievements
        this.checkAchievement('level_5');
        this.checkAchievement('level_10');

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

        // Update statistics and quest
        this.statistics.itemsCollected++;
        this.updateQuest('collect_items', 1);

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
        } else if (item.type === 'pet_egg') {
            this.hatchPetEgg();
            this.inventory[slot] = null;
            this.updateInventory();
        } else if (item.type === 'weapon') {
            this.player.damage += item.damage;
            this.showNotification(`⚔️ ${item.name} kuşandın! +${item.damage} Hasar`);
            this.checkAchievement('craft_item');
            this.inventory[slot] = null;
            this.updateInventory();
        } else if (item.type === 'armor') {
            this.player.defense += item.defense;
            this.showNotification(`🛡️ ${item.name} kuşandın! +${item.defense} Savunma`);
            this.checkAchievement('craft_item');
            this.inventory[slot] = null;
            this.updateInventory();
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

        // HP regen from pet
        if (this.activePet && this.activePet.bonuses.hpRegen) {
            this.player.hp = Math.min(this.player.maxHP, this.player.hp + this.activePet.bonuses.hpRegen * 0.016);
        }

        // Boss spawn timer
        if (!this.currentBoss && this.player.level >= 5) {
            this.bossSpawnTimer += 16;
            if (this.bossSpawnTimer >= this.bossSpawnInterval) {
                this.spawnBoss();
            }
        }

        // Boss AI
        if (this.currentBoss) {
            const boss = this.currentBoss;
            const dist = this.getDistance(this.player, boss);

            if (dist < 600) {
                const angle = Math.atan2(this.player.y - boss.y, this.player.x - boss.x);
                boss.x += Math.cos(angle) * boss.speed;
                boss.y += Math.sin(angle) * boss.speed;

                // Boss attack
                if (dist < 70) {
                    if (boss.targetCooldown <= 0) {
                        const damage = Math.max(1, boss.damage - this.player.defense);
                        this.player.hp -= damage;
                        this.showDamage(this.player.x, this.player.y - 40, damage);
                        boss.targetCooldown = 1500;

                        if (this.player.hp <= 0) {
                            this.gameOver();
                        }

                        this.updateHUD();
                    }
                }

                // Boss special ability
                boss.abilityTimer += 16;
                if (boss.abilityTimer >= 5000 && dist < 200) {
                    this.useBossAbility(boss);
                    boss.abilityTimer = 0;
                }
            }

            if (boss.targetCooldown > 0) {
                boss.targetCooldown -= 16;
            }
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

        // Drops
        this.drops.forEach(drop => {
            this.ctx.font = drop.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(drop.icon, drop.x, drop.y);
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

        // Boss
        if (this.currentBoss) {
            const boss = this.currentBoss;

            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            this.ctx.beginPath();
            this.ctx.ellipse(boss.x, boss.y + boss.size/2, boss.size/2, boss.size/4, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Boss icon with glow
            this.ctx.font = boss.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = '#ff0000';
            this.ctx.fillText(boss.icon, boss.x, boss.y);
            this.ctx.shadowBlur = 0;

            // Boss name
            this.ctx.font = '14px Arial';
            this.ctx.fillStyle = '#ff0000';
            this.ctx.fillText(boss.name, boss.x, boss.y - boss.size - 20);

            // Boss HP bar
            const barWidth = 80;
            const barHeight = 6;
            const hpPercent = boss.hp / boss.maxHP;

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(boss.x - barWidth/2, boss.y - boss.size - 10, barWidth, barHeight);

            this.ctx.fillStyle = '#ff0000';
            this.ctx.fillRect(boss.x - barWidth/2, boss.y - boss.size - 10, barWidth * hpPercent, barHeight);

            // Boss level
            this.ctx.font = '12px Arial';
            this.ctx.fillStyle = '#ffd700';
            this.ctx.fillText(`👑 Lv${boss.level}`, boss.x, boss.y + boss.size + 10);
        }

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

            // Draw active pet
            if (this.activePet) {
                const petX = this.player.x + 30;
                const petY = this.player.y - 20;

                this.ctx.font = '25px Arial';
                this.ctx.fillText(this.activePet.icon, petX, petY);

                // Pet level badge
                this.ctx.font = '12px Arial';
                this.ctx.fillStyle = '#ffd700';
                this.ctx.fillText(`L${this.activePet.level}`, petX, petY + 20);
            }
        }
    }

    updateHUD() {
        if (!this.player) return;

        document.getElementById('playerName').textContent = this.player.name + ' 💰' + this.player.gold;
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
        // Check phoenix revive
        if (this.activePet && this.activePet.bonuses.revive && !this.activePet.reviveUsed) {
            this.player.hp = this.player.maxHP * 0.5;
            this.activePet.reviveUsed = true;
            this.showNotification('🔥 Föniks seni diriltirdi!');
            return;
        }

        this.saveGameData();
        alert('😵 Öldün!\n\nSeviye: ' + this.player.level + '\nXP: ' + this.player.xp + '\nÖldürdüğün düşman: ' + this.statistics.totalKills);
        window.location.reload();
    }

    // Save/Load System
    saveGameData() {
        if (!this.player) return;

        const saveData = {
            player: this.player,
            pets: this.pets,
            activePet: this.activePet,
            achievements: this.achievements,
            statistics: this.statistics,
            inventory: this.inventory,
            lastPlayTime: Date.now()
        };
        localStorage.setItem('mythicRPG_save', JSON.stringify(saveData));
    }

    loadGameData() {
        const saveData = localStorage.getItem('mythicRPG_save');
        if (saveData) {
            const data = JSON.parse(saveData);
            this.pets = data.pets || [];
            this.activePet = data.activePet;
            this.achievements = data.achievements || this.achievements;
            this.statistics = data.statistics || this.statistics;

            // Calculate offline earnings
            const now = Date.now();
            const offlineTime = now - (data.lastPlayTime || now);
            this.offlineTime = Math.min(offlineTime, 3600000 * 4); // Max 4 hours
        }
    }

    // Pet System
    hatchPetEgg() {
        const randomPet = PET_TYPES[Math.floor(Math.random() * PET_TYPES.length)];
        const newPet = {
            ...randomPet,
            level: 1,
            xp: 0,
            xpToLevel: 100,
            reviveUsed: false
        };

        this.pets.push(newPet);
        if (!this.activePet) {
            this.activePet = newPet;
            this.applyPetBonuses();
        }

        this.checkAchievement('collect_pet');
        this.showNotification(`🥚 ${newPet.icon} ${newPet.name} kuluçkadan çıktı!`);
        this.updatePetUI();
    }

    applyPetBonuses() {
        if (!this.activePet || !this.player) return;

        const bonuses = this.activePet.bonuses;
        if (bonuses.damage) this.player.damage += bonuses.damage;
        if (bonuses.defense) this.player.defense += bonuses.defense;
        if (bonuses.speed) this.player.speed += bonuses.speed;
        if (bonuses.hpBonus) {
            this.player.maxHP += bonuses.hpBonus;
            this.player.hp += bonuses.hpBonus;
        }
    }

    updatePetUI() {
        // Will be implemented in HTML
    }

    // Achievement System
    checkAchievement(achievementId) {
        const achievement = this.achievements.find(a => a.id === achievementId && !a.unlocked);
        if (!achievement) return;

        let unlocked = false;

        switch(achievementId) {
            case 'first_kill':
                unlocked = this.statistics.totalKills >= 1;
                break;
            case 'level_5':
                unlocked = this.player && this.player.level >= 5;
                break;
            case 'level_10':
                unlocked = this.player && this.player.level >= 10;
                break;
            case 'kill_100':
                unlocked = this.statistics.totalKills >= 100;
                break;
            case 'collect_pet':
                unlocked = this.pets.length > 0;
                break;
            case 'craft_item':
            case 'boss_kill':
                unlocked = true; // Will be set manually when triggered
                break;
        }

        if (unlocked) {
            achievement.unlocked = true;
            this.player.gold += achievement.reward.gold || 0;
            this.showNotification(`🏆 ${achievement.icon} ${achievement.name} kilidi açıldı! +${achievement.reward.gold}💰`);
            this.saveGameData();
        }
    }

    // Quest System
    updateQuest(questId, amount = 1) {
        const quest = this.dailyQuests.find(q => q.id === questId);
        if (!quest || quest.progress >= quest.target) return;

        quest.progress += amount;

        if (quest.progress >= quest.target) {
            this.player.gold += quest.reward.gold;
            this.player.xp += quest.reward.xp;
            this.showNotification(`✅ Görev tamamlandı: ${quest.name}! +${quest.reward.gold}💰 +${quest.reward.xp}XP`);
        }
    }

    // Offline Earnings
    calculateOfflineEarnings() {
        if (this.offlineTime <= 0 || !this.player) return;

        const hours = this.offlineTime / 3600000;
        const goldPerHour = 50 * this.player.level;
        const xpPerHour = 30 * this.player.level;

        const offlineGold = Math.floor(goldPerHour * hours);
        const offlineXP = Math.floor(xpPerHour * hours);

        this.player.gold += offlineGold;
        this.player.xp += offlineXP;

        const hoursText = hours.toFixed(1);
        this.showNotification(`⏰ ${hoursText} saat sonra döndün! +${offlineGold}💰 +${offlineXP}XP`);

        this.offlineTime = 0;
        this.updateHUD();
    }

    // Boss System
    spawnBoss() {
        if (this.currentBoss || !this.player) return;

        // Boss spawn based on player level
        const availableBosses = BOSS_TYPES.filter(b => b.level <= this.player.level + 5);
        if (availableBosses.length === 0) return;

        const bossType = availableBosses[Math.floor(Math.random() * availableBosses.length)];

        const margin = 150;
        const x = Math.random() < 0.5
            ? Math.random() * margin
            : this.canvas.width - Math.random() * margin;
        const y = Math.random() < 0.5
            ? Math.random() * margin
            : this.canvas.height - Math.random() * margin;

        this.currentBoss = {
            ...bossType,
            x, y,
            maxHP: bossType.hp,
            size: 60,
            targetCooldown: 0,
            isBoss: true,
            abilityTimer: 0
        };

        this.showNotification(`⚠️ BOSS ORTAYA ÇIKTI: ${bossType.name}!`);
    }

    killBoss(boss) {
        this.statistics.bossesKilled++;
        this.checkAchievement('boss_kill');

        // XP and Gold
        this.player.xp += boss.xp;
        this.player.gold += boss.gold;

        // Special loot
        boss.loot.forEach(lootName => {
            if (Math.random() < 0.3) { // 30% chance for each special loot
                const item = ITEMS.find(i => i.name === lootName);
                if (item) {
                    this.drops.push({
                        ...item,
                        x: boss.x + (Math.random() - 0.5) * 50,
                        y: boss.y + (Math.random() - 0.5) * 50,
                        size: 30
                    });
                }
            }
        });

        this.showNotification(`👑 ${boss.name} öldürüldü! +${boss.gold}💰 +${boss.xp}XP`);
        this.currentBoss = null;
        this.bossSpawnTimer = 0;

        if (this.player.xp >= this.player.xpToLevel) {
            this.levelUp();
        }

        this.updateHUD();
    }

    gameLoop() {
        this.update();
        this.draw();

        // Auto-save every 30 seconds
        if (Math.random() < 0.001) {
            this.saveGameData();
        }

        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game
const game = new Game();

function selectCharacter(className) {
    game.selectCharacter(className);
}
