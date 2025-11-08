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

        // Audio system
        this.audioContext = null;
        this.isMuted = false;
        this.initAudioSystem();

        // Combat enhancements
        this.comboCount = 0;
        this.lastHitTime = 0;
        this.comboTimeout = null;

        // Daily engagement
        this.dailyQuests = [];
        this.achievements = [];
        this.loginReward = null;
        this.initDailyEngagement();

        this.setupControls();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Audio System
    initAudioSystem() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) {
            console.warn('Audio not supported');
        }
    }

    playSound(type) {
        if (!this.audioContext || this.isMuted) return;

        const ctx = this.audioContext;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        switch(type) {
            case 'hit':
                oscillator.frequency.value = 200;
                gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.1);
                break;
            case 'skill':
                oscillator.frequency.value = 400;
                gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.3);
                break;
            case 'levelup':
                oscillator.frequency.value = 523;
                gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.5);
                setTimeout(() => {
                    const osc2 = ctx.createOscillator();
                    const gain2 = ctx.createGain();
                    osc2.connect(gain2);
                    gain2.connect(ctx.destination);
                    osc2.frequency.value = 659;
                    gain2.gain.setValueAtTime(0.3, ctx.currentTime);
                    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                    osc2.start(ctx.currentTime);
                    osc2.stop(ctx.currentTime + 0.5);
                }, 150);
                break;
            case 'pickup':
                oscillator.frequency.value = 800;
                gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.2);
                break;
            case 'damage':
                oscillator.frequency.value = 100;
                gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.15);
                break;
            case 'death':
                oscillator.frequency.value = 150;
                gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.4);
                break;
            case 'combo':
                oscillator.frequency.value = 600 + (this.comboCount * 50);
                gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.2);
                break;
        }
    }

    // Daily Engagement System
    initDailyEngagement() {
        const today = new Date().toDateString();
        const savedData = localStorage.getItem('rpg_daily_data');

        if (savedData) {
            const data = JSON.parse(savedData);
            if (data.lastLogin !== today) {
                // New day - reset quests and give login reward
                this.generateDailyQuests();
                this.giveLoginReward();
                this.saveDailyData(today);
            } else {
                // Same day - load existing quests
                this.dailyQuests = data.quests || [];
                this.achievements = data.achievements || [];
            }
        } else {
            // First time
            this.generateDailyQuests();
            this.giveLoginReward();
            this.saveDailyData(today);
        }

        this.loadAchievements();
    }

    generateDailyQuests() {
        this.dailyQuests = [
            { id: 1, name: 'Canavar Avcısı', desc: 'Türe göre 10 canavar öldür', target: 10, progress: 0, reward: 100, type: 'kill' },
            { id: 2, name: 'Seviye Atlama', desc: '2 seviye atla', target: 2, progress: 0, reward: 150, type: 'level' },
            { id: 3, name: 'Altın Toplayıcı', desc: '200 altın topla', target: 200, progress: 0, reward: 50, type: 'gold' }
        ];
    }

    giveLoginReward() {
        const rewards = [
            { name: 'Can İksiri', icon: '❤️', type: 'potion', heal: 50 },
            { name: 'Mana İksiri', icon: '💙', type: 'potion', mana: 50 },
            { name: 'Altın', icon: '💰', type: 'gold', value: 50 }
        ];
        this.loginReward = rewards[Math.floor(Math.random() * rewards.length)];
        this.showNotification(`🎁 Giriş Ödülü: ${this.loginReward.icon} ${this.loginReward.name}`);
    }

    saveDailyData(date) {
        const data = {
            lastLogin: date,
            quests: this.dailyQuests,
            achievements: this.achievements
        };
        localStorage.setItem('rpg_daily_data', JSON.stringify(data));
    }

    updateQuestProgress(type, amount = 1) {
        this.dailyQuests.forEach(quest => {
            if (quest.type === type && quest.progress < quest.target) {
                quest.progress += amount;
                if (quest.progress >= quest.target) {
                    this.completeQuest(quest);
                }
            }
        });
        this.saveDailyData(new Date().toDateString());
    }

    completeQuest(quest) {
        this.showNotification(`✅ Görev Tamamlandı: ${quest.name} (+${quest.reward} Altın)`);
        if (this.player) {
            this.player.gold += quest.reward;
        }
        this.playSound('levelup');
    }

    loadAchievements() {
        const savedAchievements = localStorage.getItem('rpg_achievements');
        if (savedAchievements) {
            this.achievements = JSON.parse(savedAchievements);
        } else {
            this.achievements = [
                { id: 1, name: 'İlk Kan', desc: 'İlk canavarı öldür', unlocked: false },
                { id: 2, name: 'Acemi Savaşçı', desc: 'Seviye 5e ulaş', unlocked: false },
                { id: 3, name: 'Usta Savaşçı', desc: 'Seviye 10a ulaş', unlocked: false },
                { id: 4, name: 'Kombo Ustası', desc: '5 kombo yap', unlocked: false },
                { id: 5, name: 'Hazine Avcısı', desc: '1000 altın topla', unlocked: false }
            ];
        }
    }

    unlockAchievement(id) {
        const achievement = this.achievements.find(a => a.id === id);
        if (achievement && !achievement.unlocked) {
            achievement.unlocked = true;
            this.showNotification(`🏆 Başarım Kazanıldı: ${achievement.name}`);
            this.playSound('levelup');
            localStorage.setItem('rpg_achievements', JSON.stringify(this.achievements));
        }
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

            // Advanced combat stats
            critChance: 0.15,  // 15% crit chance
            critDamage: 2.0,   // 2x damage on crit
            dodgeChance: 0.10, // 10% dodge chance

            speed: 3,
            skills: classData.skills.map(s => ({...s, cooldownRemaining: 0})),

            gold: 0,
            attackCooldown: 0,
            totalKills: 0
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

        // Play skill sound
        this.playSound('skill');

        // Skill effects
        if (skill.damage) {
            const nearestMob = this.findNearestMob();
            if (nearestMob) {
                const distance = this.getDistance(this.player, nearestMob);
                if (distance < 300) {
                    // Critical hit chance
                    const isCrit = Math.random() < this.player.critChance;
                    let totalDamage = skill.damage + this.player.damage;
                    if (isCrit) {
                        totalDamage *= this.player.critDamage;
                        this.showDamage(nearestMob.x, nearestMob.y - 20, totalDamage, true);
                    }

                    this.damageEnemy(nearestMob, totalDamage, isCrit);

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
            this.playSound('pickup');
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

    damageEnemy(enemy, damage, isCrit = false) {
        enemy.hp -= damage;

        if (!isCrit) {
            this.showDamage(enemy.x, enemy.y, damage, false);
        }

        // Combo system
        const now = Date.now();
        if (now - this.lastHitTime < 2000) {
            this.comboCount++;
            if (this.comboCount >= 3) {
                this.showComboText(this.comboCount);
                this.playSound('combo');

                // Check combo achievement
                if (this.comboCount >= 5) {
                    this.unlockAchievement(4);
                }
            }
        } else {
            this.comboCount = 1;
        }
        this.lastHitTime = now;

        // Reset combo after 2 seconds
        if (this.comboTimeout) clearTimeout(this.comboTimeout);
        this.comboTimeout = setTimeout(() => {
            this.comboCount = 0;
        }, 2000);

        this.playSound('hit');

        if (enemy.hp <= 0) {
            this.killEnemy(enemy);
        }
    }

    killEnemy(enemy) {
        const index = this.mobs.indexOf(enemy);
        if (index > -1) {
            this.mobs.splice(index, 1);
        }

        // Play death sound
        this.playSound('death');

        // Track kills and quests
        this.player.totalKills++;
        this.updateQuestProgress('kill', 1);

        // Check achievements
        if (this.player.totalKills === 1) {
            this.unlockAchievement(1); // First blood
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

        // Slightly increase crit and dodge chance on level up
        this.player.critChance = Math.min(0.5, this.player.critChance + 0.01);
        this.player.dodgeChance = Math.min(0.3, this.player.dodgeChance + 0.005);

        this.playSound('levelup');
        this.showNotification('🎉 LEVEL UP! ' + this.player.level);

        // Update quest progress
        this.updateQuestProgress('level', 1);

        // Check achievements
        if (this.player.level === 5) {
            this.unlockAchievement(2);
        }
        if (this.player.level === 10) {
            this.unlockAchievement(3);
        }

        this.updateHUD();
    }

    showDamage(x, y, damage, isCrit = false) {
        const dmg = document.createElement('div');
        dmg.className = 'damage-number';
        dmg.textContent = '-' + Math.floor(damage);
        dmg.style.left = x + 'px';
        dmg.style.top = y + 'px';

        if (isCrit) {
            dmg.style.color = '#ffd700';
            dmg.style.fontSize = '32px';
            dmg.style.fontWeight = 'bold';
            dmg.textContent = 'CRIT! -' + Math.floor(damage);
        } else {
            dmg.style.color = '#ff4444';
        }

        document.body.appendChild(dmg);
        setTimeout(() => dmg.remove(), 1000);
    }

    showComboText(combo) {
        const comboText = document.createElement('div');
        comboText.className = 'damage-number';
        comboText.textContent = `${combo}x COMBO!`;
        comboText.style.left = (this.canvas.width / 2) + 'px';
        comboText.style.top = '200px';
        comboText.style.color = '#00ff00';
        comboText.style.fontSize = '28px';
        comboText.style.fontWeight = 'bold';
        document.body.appendChild(comboText);

        setTimeout(() => comboText.remove(), 1000);
    }

    showDodgeText() {
        const dodgeText = document.createElement('div');
        dodgeText.className = 'damage-number';
        dodgeText.textContent = 'DODGE!';
        dodgeText.style.left = this.player.x + 'px';
        dodgeText.style.top = (this.player.y - 50) + 'px';
        dodgeText.style.color = '#00ffff';
        dodgeText.style.fontSize = '24px';
        dodgeText.style.fontWeight = 'bold';
        document.body.appendChild(dodgeText);

        setTimeout(() => dodgeText.remove(), 1000);
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

        // Play pickup sound
        this.playSound('pickup');

        // Handle gold separately
        if (drop.type === 'gold') {
            const goldAmount = drop.value || 10;
            this.player.gold += goldAmount;
            this.updateQuestProgress('gold', goldAmount);
            this.showNotification(`+${goldAmount} Altın 💰`);

            // Check gold achievement
            if (this.player.gold >= 1000) {
                this.unlockAchievement(5);
            }
        } else {
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

        this.updateHUD();
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
                        // Check dodge
                        const isDodged = Math.random() < this.player.dodgeChance;

                        if (isDodged) {
                            this.showDodgeText();
                            this.playSound('skill');
                        } else {
                            const damage = Math.max(1, mob.damage - this.player.defense);
                            this.player.hp -= damage;
                            this.showDamage(this.player.x, this.player.y - 40, damage);
                            this.playSound('damage');

                            if (this.player.hp <= 0) {
                                this.gameOver();
                            }
                        }

                        mob.targetCooldown = 1000;
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
        document.getElementById('playerGold').textContent = `💰 ${this.player.gold}`;
        document.getElementById('playerKills').textContent = `⚔️ ${this.player.totalKills}`;

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
        // Save score to leaderboard
        this.saveToLeaderboard();

        alert('😵 Öldün!\n\nSeviye: ' + this.player.level + '\nXP: ' + this.player.xp + '\nAltın: ' + this.player.gold);
        window.location.reload();
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }

    // UI Methods
    togglePanel(panelName) {
        const panel = document.getElementById(panelName + 'Panel');
        if (!panel) return;

        const isActive = panel.classList.contains('active');

        // Close all panels first
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));

        if (!isActive) {
            panel.classList.add('active');

            // Update panel content
            if (panelName === 'quests') {
                this.updateQuestsUI();
            } else if (panelName === 'achievements') {
                this.updateAchievementsUI();
            } else if (panelName === 'leaderboard') {
                this.updateLeaderboardUI();
            }
        }
    }

    toggleSound() {
        this.isMuted = !this.isMuted;
        const btn = document.querySelector('.menu-btn[title="Ses"]');
        if (btn) {
            btn.textContent = this.isMuted ? '🔇' : '🔊';
        }
    }

    updateQuestsUI() {
        const container = document.getElementById('questsList');
        if (!container) return;

        container.innerHTML = '';

        this.dailyQuests.forEach(quest => {
            const progress = Math.min(quest.progress, quest.target);
            const percent = (progress / quest.target) * 100;
            const isCompleted = progress >= quest.target;

            const div = document.createElement('div');
            div.className = 'quest-item' + (isCompleted ? ' completed' : '');
            div.innerHTML = `
                <div class="quest-name">${quest.name}</div>
                <div class="quest-desc">${quest.desc} - Ödül: ${quest.reward} Altın</div>
                <div class="quest-progress">
                    <div class="quest-progress-bar" style="width: ${percent}%"></div>
                    <div class="quest-progress-text">${progress} / ${quest.target}</div>
                </div>
            `;
            container.appendChild(div);
        });
    }

    updateAchievementsUI() {
        const container = document.getElementById('achievementsList');
        if (!container) return;

        container.innerHTML = '';

        this.achievements.forEach(achievement => {
            const div = document.createElement('div');
            div.className = 'achievement-item' + (achievement.unlocked ? ' unlocked' : '');
            div.innerHTML = `
                <div class="achievement-icon">${achievement.unlocked ? '🏆' : '🔒'}</div>
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-desc">${achievement.desc}</div>
                </div>
            `;
            container.appendChild(div);
        });
    }

    updateLeaderboardUI() {
        const container = document.getElementById('leaderboardList');
        if (!container) return;

        const leaderboard = this.getLeaderboard();
        container.innerHTML = '';

        leaderboard.forEach((entry, index) => {
            const isCurrentPlayer = this.player && entry.name === this.player.name && entry.level === this.player.level;
            const div = document.createElement('div');
            div.className = 'leaderboard-item';
            if (isCurrentPlayer) {
                div.style.borderColor = '#ffd700';
            }

            const rank = index + 1;
            let rankIcon = '🥉';
            if (rank === 1) rankIcon = '🥇';
            else if (rank === 2) rankIcon = '🥈';

            div.innerHTML = `
                <div class="leaderboard-rank">${rankIcon} #${rank}</div>
                <div class="leaderboard-info">
                    <div class="leaderboard-name">${entry.name} ${entry.icon}</div>
                    <div class="leaderboard-stats">Seviye ${entry.level} • ${entry.kills} Öldürme • ${entry.gold} Altın</div>
                </div>
            `;
            container.appendChild(div);
        });
    }

    saveToLeaderboard() {
        if (!this.player) return;

        const leaderboard = this.getLeaderboard();

        const entry = {
            name: this.player.name,
            icon: this.player.icon,
            level: this.player.level,
            kills: this.player.totalKills,
            gold: this.player.gold,
            timestamp: Date.now()
        };

        leaderboard.push(entry);
        leaderboard.sort((a, b) => {
            if (b.level !== a.level) return b.level - a.level;
            if (b.kills !== a.kills) return b.kills - a.kills;
            return b.gold - a.gold;
        });

        // Keep top 10
        const top10 = leaderboard.slice(0, 10);
        localStorage.setItem('rpg_leaderboard', JSON.stringify(top10));
    }

    getLeaderboard() {
        const saved = localStorage.getItem('rpg_leaderboard');
        return saved ? JSON.parse(saved) : [];
    }

    shareScore() {
        if (!this.player) return;

        const text = `🎮 RPG Mobile - Metin2 Style\n\n` +
                    `${this.player.icon} ${this.player.name}\n` +
                    `📊 Seviye: ${this.player.level}\n` +
                    `⚔️ Öldürme: ${this.player.totalKills}\n` +
                    `💰 Altın: ${this.player.gold}`;

        if (navigator.share) {
            navigator.share({
                title: 'RPG Mobile Score',
                text: text
            }).catch(() => {});
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('📋 Skor panoya kopyalandı!');
            });
        }
    }
}

// Initialize game
const game = new Game();

function selectCharacter(className) {
    game.selectCharacter(className);
}
