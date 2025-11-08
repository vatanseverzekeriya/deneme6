// ==================== GAME DATA ====================

// Rarity tiers
const RARITY = {
    COMMON: { name: 'Yaygın', color: '#9ca3af', multiplier: 1 },
    UNCOMMON: { name: 'Nadir', color: '#22c55e', multiplier: 1.5 },
    RARE: { name: 'Ender', color: '#3b82f6', multiplier: 2 },
    EPIC: { name: 'Epik', color: '#a855f7', multiplier: 3 },
    LEGENDARY: { name: 'Efsanevi', color: '#f59e0b', multiplier: 5 },
    MYTHIC: { name: 'Mitik', color: '#ef4444', multiplier: 8 }
};

// Elements
const ELEMENTS = {
    FIRE: { name: 'Ateş', icon: '🔥', color: '#ef4444', weakness: 'WATER' },
    WATER: { name: 'Su', icon: '💧', color: '#3b82f6', weakness: 'EARTH' },
    EARTH: { name: 'Toprak', icon: '🪨', color: '#78716c', weakness: 'WIND' },
    WIND: { name: 'Rüzgar', icon: '💨', color: '#22d3ee', weakness: 'FIRE' },
    LIGHTNING: { name: 'Şimşek', icon: '⚡', color: '#eab308', weakness: 'EARTH' }
};

// Equipment templates
const EQUIPMENT_TYPES = {
    WEAPON: {
        SWORD: { name: 'Kılıç', icon: '⚔️', statBonus: 'damage' },
        AXE: { name: 'Balta', icon: '🪓', statBonus: 'damage' },
        BOW: { name: 'Yay', icon: '🏹', statBonus: 'damage' },
        STAFF: { name: 'Asa', icon: '🔮', statBonus: 'damage' }
    },
    ARMOR: {
        HELMET: { name: 'Miğfer', icon: '⛑️', statBonus: 'defense' },
        CHEST: { name: 'Göğüslük', icon: '🛡️', statBonus: 'defense' },
        PANTS: { name: 'Zırh Pantolon', icon: '👖', statBonus: 'defense' },
        BOOTS: { name: 'Bot', icon: '🥾', statBonus: 'defense' }
    },
    ACCESSORY: {
        RING: { name: 'Yüzük', icon: '💍', statBonus: 'damage' },
        NECKLACE: { name: 'Kolye', icon: '📿', statBonus: 'defense' },
        EARRING: { name: 'Küpe', icon: '💎', statBonus: 'hp' },
        BRACELET: { name: 'Bilezik', icon: '⌚', statBonus: 'mp' }
    }
};

// Map regions
const MAPS = [
    {
        name: 'Başlangıç Köyü',
        level: 1,
        bgColor: '#2d5016',
        mobLevelRange: [1, 3],
        icon: '🏘️',
        unlocked: true
    },
    {
        name: 'Karanlık Orman',
        level: 5,
        bgColor: '#1a3d1a',
        mobLevelRange: [4, 8],
        icon: '🌲',
        unlocked: false
    },
    {
        name: 'Kızıl Çöl',
        level: 10,
        bgColor: '#8b4513',
        mobLevelRange: [8, 12],
        icon: '🏜️',
        unlocked: false
    },
    {
        name: 'Buzul Dağları',
        level: 15,
        bgColor: '#4a5568',
        mobLevelRange: [12, 18],
        icon: '🏔️',
        unlocked: false
    },
    {
        name: 'Volkanik Araziler',
        level: 20,
        bgColor: '#7c2d12',
        mobLevelRange: [18, 25],
        icon: '🌋',
        unlocked: false
    },
    {
        name: 'Gizemli Bataklık',
        level: 25,
        bgColor: '#2d3319',
        mobLevelRange: [23, 30],
        icon: '🐊',
        unlocked: false
    },
    {
        name: 'Kristal Mağaralar',
        level: 30,
        bgColor: '#1e3a5f',
        mobLevelRange: [28, 35],
        icon: '💎',
        unlocked: false
    },
    {
        name: 'Hayalet Kale',
        level: 35,
        bgColor: '#1f1f1f',
        mobLevelRange: [33, 42],
        icon: '🏰',
        unlocked: false
    },
    {
        name: 'Yıldız Ovası',
        level: 40,
        bgColor: '#1a1a3e',
        mobLevelRange: [38, 48],
        icon: '✨',
        unlocked: false
    },
    {
        name: 'Ejderha Yuvası',
        level: 45,
        bgColor: '#3d0a0a',
        mobLevelRange: [43, 55],
        icon: '🐲',
        unlocked: false
    },
    {
        name: 'Kayıp Tapınak',
        level: 50,
        bgColor: '#4a3520',
        mobLevelRange: [48, 60],
        icon: '⛩️',
        unlocked: false
    },
    {
        name: 'Sonsuzluk Kapısı',
        level: 60,
        bgColor: '#0a0a0a',
        mobLevelRange: [55, 70],
        icon: '🌌',
        unlocked: false
    }
];

// Character Classes
const CLASSES = {
    warrior: {
        name: 'Savaşçı',
        icon: '🛡️',
        baseHP: 150,
        baseMP: 50,
        baseDamage: 15,
        baseDefense: 10,
        element: 'EARTH',
        skills: [
            { name: 'Güçlü Vuruş', icon: '⚔️', damage: 30, mpCost: 15, cooldown: 3000, key: 'Q', element: 'EARTH' },
            { name: 'Kalkan', icon: '🛡️', defense: 20, mpCost: 20, cooldown: 5000, key: 'W', element: 'EARTH' },
            { name: 'Savaş Çığlığı', icon: '💥', damage: 50, mpCost: 30, cooldown: 8000, key: 'E', element: 'EARTH' }
        ],
        skillTree: {
            offense: { unlocked: true, level: 0, maxLevel: 10, bonus: 'damage' },
            defense: { unlocked: false, level: 0, maxLevel: 10, bonus: 'defense' },
            vitality: { unlocked: false, level: 0, maxLevel: 10, bonus: 'hp' }
        }
    },
    ninja: {
        name: 'Ninja',
        icon: '🗡️',
        baseHP: 100,
        baseMP: 80,
        baseDamage: 25,
        baseDefense: 5,
        element: 'WIND',
        skills: [
            { name: 'Hızlı Saldırı', icon: '⚡', damage: 20, mpCost: 10, cooldown: 2000, key: 'Q', element: 'WIND' },
            { name: 'Gölge Adımı', icon: '💨', dodge: true, mpCost: 15, cooldown: 4000, key: 'W', element: 'WIND' },
            { name: 'Kritik Vuruş', icon: '🗡️', damage: 60, mpCost: 25, cooldown: 6000, key: 'E', element: 'WIND' }
        ],
        skillTree: {
            agility: { unlocked: true, level: 0, maxLevel: 10, bonus: 'critChance' },
            assassination: { unlocked: false, level: 0, maxLevel: 10, bonus: 'critDamage' },
            evasion: { unlocked: false, level: 0, maxLevel: 10, bonus: 'dodge' }
        }
    },
    shaman: {
        name: 'Şaman',
        icon: '🔮',
        baseHP: 120,
        baseMP: 120,
        baseDamage: 18,
        baseDefense: 7,
        element: 'WATER',
        skills: [
            { name: 'Işın', icon: '✨', damage: 25, mpCost: 12, cooldown: 2500, key: 'Q', element: 'WATER' },
            { name: 'İyileştirme', icon: '💚', heal: 40, mpCost: 20, cooldown: 5000, key: 'W', element: 'WATER' },
            { name: 'Yıldırım', icon: '⚡', damage: 45, mpCost: 28, cooldown: 7000, key: 'E', element: 'LIGHTNING' }
        ],
        skillTree: {
            healing: { unlocked: true, level: 0, maxLevel: 10, bonus: 'healPower' },
            magic: { unlocked: false, level: 0, maxLevel: 10, bonus: 'magicDamage' },
            wisdom: { unlocked: false, level: 0, maxLevel: 10, bonus: 'mp' }
        }
    },
    sura: {
        name: 'Sura',
        icon: '⚡',
        baseHP: 130,
        baseMP: 100,
        baseDamage: 20,
        baseDefense: 8,
        element: 'FIRE',
        skills: [
            { name: 'Karanlık Kılıç', icon: '🌑', damage: 28, mpCost: 14, cooldown: 2500, key: 'Q', element: 'FIRE' },
            { name: 'Ruh Emme', icon: '👻', damage: 20, lifesteal: 0.5, mpCost: 18, cooldown: 4500, key: 'W', element: 'FIRE' },
            { name: 'Kara Büyü', icon: '💀', damage: 55, mpCost: 32, cooldown: 8000, key: 'E', element: 'FIRE' }
        ],
        skillTree: {
            darkness: { unlocked: true, level: 0, maxLevel: 10, bonus: 'lifesteal' },
            destruction: { unlocked: false, level: 0, maxLevel: 10, bonus: 'damage' },
            cursing: { unlocked: false, level: 0, maxLevel: 10, bonus: 'dotDamage' }
        }
    }
};

// Mob types
const MOB_TYPES = [
    { name: 'Kurt', icon: '🐺', hp: 50, damage: 8, xp: 25, gold: 10, speed: 1.5, element: 'WIND' },
    { name: 'Goblin', icon: '👹', hp: 60, damage: 10, xp: 30, gold: 15, speed: 1.2, element: 'EARTH' },
    { name: 'Ork', icon: '👾', hp: 80, damage: 12, xp: 40, gold: 20, speed: 1.0, element: 'EARTH' },
    { name: 'Troll', icon: '🧟', hp: 120, damage: 15, xp: 60, gold: 30, speed: 0.8, element: 'EARTH' },
    { name: 'Ateş Elemental', icon: '🔥', hp: 100, damage: 20, xp: 70, gold: 35, speed: 1.3, element: 'FIRE' },
    { name: 'Su Elemental', icon: '💧', hp: 110, damage: 18, xp: 75, gold: 38, speed: 1.1, element: 'WATER' },
    { name: 'Kaya Golem', icon: '🗿', hp: 180, damage: 22, xp: 90, gold: 45, speed: 0.6, element: 'EARTH' },
    { name: 'Fırtına Ruhu', icon: '🌪️', hp: 90, damage: 25, xp: 85, gold: 42, speed: 1.6, element: 'WIND' },
    { name: 'Şimşek Ejderhası', icon: '⚡', hp: 250, damage: 30, xp: 120, gold: 60, speed: 0.9, element: 'LIGHTNING' },
    { name: 'Ejderha', icon: '🐉', hp: 300, damage: 35, xp: 150, gold: 75, speed: 0.7, element: 'FIRE' }
];

// Items
const ITEMS = [
    { name: 'Can İksiri', icon: '❤️', type: 'potion', heal: 50 },
    { name: 'Mana İksiri', icon: '💙', type: 'potion', mana: 50 },
    { name: 'Altın', icon: '💰', type: 'gold', value: 10 }
];

// ==================== GAME CLASS ====================

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

        // Equipment slots
        this.equipment = {
            weapon: null,
            helmet: null,
            chest: null,
            pants: null,
            boots: null,
            ring: null,
            necklace: null,
            earring: null,
            bracelet: null
        };

        // Combo system
        this.comboCount = 0;
        this.lastHitTime = 0;
        this.comboTimeout = 2000;

        // Current map
        this.currentMapIndex = 0;

        // Daily system
        this.dailyQuests = [];
        this.lastLoginDate = null;
        this.loginRewardDay = 0;

        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        this.setupControls();
        this.loadPlayerData();
        this.generateDailyQuests();
        this.checkLoginReward();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // ==================== SAVE/LOAD SYSTEM ====================

    savePlayerData() {
        if (!this.player) return;

        const saveData = {
            class: this.player.class,
            level: this.player.level,
            xp: this.player.xp,
            skillPoints: this.player.skillPoints || 0,
            skillTree: this.player.skillTree,
            equipment: this.equipment,
            currentMapIndex: this.currentMapIndex,
            lastLoginDate: new Date().toDateString(),
            loginRewardDay: this.loginRewardDay,
            completedQuests: this.player.completedQuests || []
        };

        localStorage.setItem('rpgSaveData', JSON.stringify(saveData));
    }

    loadPlayerData() {
        const saved = localStorage.getItem('rpgSaveData');
        if (saved) {
            this.saveData = JSON.parse(saved);
        }
    }

    // ==================== DAILY SYSTEM ====================

    generateDailyQuests() {
        const questTemplates = [
            { type: 'kill', target: 'mobs', amount: 10, reward: { xp: 100, gold: 50 }, desc: '10 canavar öldür' },
            { type: 'kill', target: 'mobs', amount: 25, reward: { xp: 250, gold: 100 }, desc: '25 canavar öldür' },
            { type: 'damage', amount: 500, reward: { xp: 150, gold: 75 }, desc: '500 hasar ver' },
            { type: 'heal', amount: 200, reward: { xp: 120, gold: 60 }, desc: '200 can iyileştir' },
            { type: 'combo', amount: 10, reward: { xp: 200, gold: 100 }, desc: '10 kombo yap' }
        ];

        this.dailyQuests = [];
        for (let i = 0; i < 3; i++) {
            const template = questTemplates[Math.floor(Math.random() * questTemplates.length)];
            this.dailyQuests.push({
                ...template,
                progress: 0,
                completed: false,
                id: Date.now() + i
            });
        }
    }

    checkLoginReward() {
        const today = new Date().toDateString();
        if (this.saveData && this.saveData.lastLoginDate !== today) {
            this.loginRewardDay = (this.saveData.loginRewardDay || 0) + 1;
            if (this.loginRewardDay > 7) this.loginRewardDay = 1;

            // Give login reward
            if (this.player) {
                const rewards = [100, 150, 200, 300, 400, 500, 1000];
                const gold = rewards[this.loginRewardDay - 1] || 100;
                this.player.gold += gold;
                this.showNotification(`🎁 Giriş Ödülü: ${gold} Altın! (Gün ${this.loginRewardDay})`);
            }
        }
    }

    updateQuest(type, amount = 1) {
        this.dailyQuests.forEach(quest => {
            if (!quest.completed && quest.type === type) {
                quest.progress += amount;
                if (quest.progress >= quest.amount) {
                    quest.completed = true;
                    this.player.xp += quest.reward.xp;
                    this.player.gold += quest.reward.gold;
                    this.showNotification(`✅ Görev Tamamlandı! +${quest.reward.xp} XP, +${quest.reward.gold} Altın`);

                    if (this.player.xp >= this.player.xpToLevel) {
                        this.levelUp();
                    }
                    this.updateHUD();
                }
            }
        });
    }

    // ==================== EQUIPMENT SYSTEM ====================

    generateEquipment(level, rarity) {
        const categories = Object.keys(EQUIPMENT_TYPES);
        const category = categories[Math.floor(Math.random() * categories.length)];
        const types = Object.values(EQUIPMENT_TYPES[category]);
        const type = types[Math.floor(Math.random() * types.length)];

        const rarityKeys = Object.keys(RARITY);
        const rarityKey = rarity || rarityKeys[Math.min(Math.floor(Math.random() * (level / 10 + 2)), rarityKeys.length - 1)];
        const rarityData = RARITY[rarityKey];

        const baseValue = 5 + level * 2;
        const statValue = Math.floor(baseValue * rarityData.multiplier);

        // Random element
        const elementKeys = Object.keys(ELEMENTS);
        const element = elementKeys[Math.floor(Math.random() * elementKeys.length)];

        return {
            ...type,
            category: category.toLowerCase(),
            level,
            rarity: rarityKey,
            rarityData,
            statValue,
            element,
            elementData: ELEMENTS[element]
        };
    }

    equipItem(item) {
        // Find appropriate slot
        let slot = null;
        if (item.category === 'weapon') slot = 'weapon';
        else if (item.name === 'Miğfer') slot = 'helmet';
        else if (item.name === 'Göğüslük') slot = 'chest';
        else if (item.name === 'Zırh Pantolon') slot = 'pants';
        else if (item.name === 'Bot') slot = 'boots';
        else if (item.name === 'Yüzük') slot = 'ring';
        else if (item.name === 'Kolye') slot = 'necklace';
        else if (item.name === 'Küpe') slot = 'earring';
        else if (item.name === 'Bilezik') slot = 'bracelet';

        if (slot && this.equipment[slot]) {
            // Unequip old item
            this.addToInventory(this.equipment[slot]);
        }

        this.equipment[slot] = item;
        this.updatePlayerStats();
        this.showNotification(`✨ Kuşanıldı: ${item.name} (${item.rarityData.name})`);
    }

    updatePlayerStats() {
        if (!this.player) return;

        // Reset to base stats
        const classData = CLASSES[this.player.class];
        this.player.damage = classData.baseDamage + (this.player.level - 1) * 3;
        this.player.defense = classData.baseDefense + (this.player.level - 1) * 2;

        // Add equipment bonuses
        Object.values(this.equipment).forEach(item => {
            if (item) {
                if (item.statBonus === 'damage') this.player.damage += item.statValue;
                if (item.statBonus === 'defense') this.player.defense += item.statValue;
                if (item.statBonus === 'hp') this.player.maxHP += item.statValue;
                if (item.statBonus === 'mp') this.player.maxMP += item.statValue;
            }
        });

        // Add skill tree bonuses
        if (this.player.skillTree) {
            Object.values(this.player.skillTree).forEach(branch => {
                if (branch.bonus === 'damage') this.player.damage += branch.level * 2;
                if (branch.bonus === 'defense') this.player.defense += branch.level * 2;
                if (branch.bonus === 'hp') this.player.maxHP += branch.level * 10;
                if (branch.bonus === 'mp') this.player.maxMP += branch.level * 5;
            });
        }
    }

    addToInventory(item) {
        for (let i = 0; i < this.inventory.length; i++) {
            if (!this.inventory[i]) {
                this.inventory[i] = item;
                this.updateInventory();
                return true;
            }
        }
        return false;
    }

    // ==================== CHARACTER SELECTION ====================

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
            skillPoints: 0,

            hp: classData.baseHP,
            maxHP: classData.baseHP,
            mp: classData.baseMP,
            maxMP: classData.baseMP,

            damage: classData.baseDamage,
            defense: classData.baseDefense,
            element: classData.element,

            speed: 3,
            skills: classData.skills.map(s => ({...s, cooldownRemaining: 0})),
            skillTree: JSON.parse(JSON.stringify(classData.skillTree)),

            gold: 0,
            attackCooldown: 0,

            critChance: 0.1,
            critDamage: 1.5,
            lifesteal: 0,

            completedQuests: []
        };

        // Load saved data if exists
        if (this.saveData && this.saveData.class === className) {
            this.player.level = this.saveData.level || 1;
            this.player.xp = this.saveData.xp || 0;
            this.player.skillPoints = this.saveData.skillPoints || 0;
            this.player.skillTree = this.saveData.skillTree || this.player.skillTree;
            this.equipment = this.saveData.equipment || this.equipment;
            this.currentMapIndex = this.saveData.currentMapIndex || 0;
            this.player.completedQuests = this.saveData.completedQuests || [];
        }

        this.updatePlayerStats();
        this.updateHUD();
        this.createSkillButtons();
        this.createUIButtons();

        document.getElementById('charSelect').classList.add('hidden');
        document.getElementById('gameScreen').classList.add('active');

        this.spawnMobs();
        this.gameLoop();

        this.checkLoginReward();
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

    createUIButtons() {
        // Add UI overlay for equipment, skill tree, quests, map
        const uiHTML = `
            <div id="gameUI" style="position: fixed; top: 150px; right: 10px; display: flex; flex-direction: column; gap: 10px; pointer-events: auto; z-index: 100;">
                <button onclick="game.toggleEquipment()" class="ui-btn">🎒</button>
                <button onclick="game.toggleSkillTree()" class="ui-btn">🌳</button>
                <button onclick="game.toggleQuests()" class="ui-btn">📜</button>
                <button onclick="game.toggleMap()" class="ui-btn">🗺️</button>
            </div>

            <div id="equipmentPanel" class="panel" style="display: none;"></div>
            <div id="skillTreePanel" class="panel" style="display: none;"></div>
            <div id="questsPanel" class="panel" style="display: none;"></div>
            <div id="mapPanel" class="panel" style="display: none;"></div>
            <div id="comboDisplay" style="display: none;"></div>
        `;

        document.getElementById('gameScreen').insertAdjacentHTML('beforeend', uiHTML);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .ui-btn {
                width: 50px;
                height: 50px;
                border-radius: 10px;
                border: 2px solid rgba(255, 255, 255, 0.5);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                font-size: 24px;
                cursor: pointer;
                transition: all 0.3s;
            }
            .ui-btn:hover, .ui-btn:active {
                transform: scale(1.1);
                border-color: #ffd700;
            }
            .panel {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.95);
                border: 3px solid #ffd700;
                border-radius: 20px;
                padding: 20px;
                max-width: 90vw;
                max-height: 80vh;
                overflow-y: auto;
                z-index: 200;
            }
            .panel h2 {
                color: #ffd700;
                margin-bottom: 15px;
                text-align: center;
            }
            .close-btn {
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 24px;
                cursor: pointer;
                color: #ff4444;
            }
            #comboDisplay {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 48px;
                font-weight: bold;
                color: #ffd700;
                text-shadow: 3px 3px 6px black;
                pointer-events: none;
                animation: comboAnim 0.5s;
                z-index: 300;
            }
            @keyframes comboAnim {
                0% { transform: translate(-50%, -50%) scale(0); }
                50% { transform: translate(-50%, -50%) scale(1.2); }
                100% { transform: translate(-50%, -50%) scale(1); }
            }
            .equipment-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
                margin-top: 15px;
            }
            .equip-slot {
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 10px;
                padding: 10px;
                text-align: center;
                min-height: 80px;
            }
            .skill-tree-grid {
                display: flex;
                flex-direction: column;
                gap: 15px;
                margin-top: 15px;
            }
            .skill-branch {
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 10px;
                padding: 15px;
            }
            .quest-item {
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 10px;
                padding: 10px;
                margin-bottom: 10px;
            }
            .map-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                gap: 10px;
                margin-top: 15px;
            }
            .map-card {
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 10px;
                padding: 15px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s;
            }
            .map-card.unlocked:hover {
                transform: scale(1.05);
                border-color: #ffd700;
            }
            .map-card.locked {
                opacity: 0.5;
                cursor: not-allowed;
            }
        `;
        document.head.appendChild(style);
    }

    // ==================== UI PANELS ====================

    toggleEquipment() {
        const panel = document.getElementById('equipmentPanel');
        if (panel.style.display === 'none') {
            panel.style.display = 'block';
            panel.innerHTML = `
                <span class="close-btn" onclick="game.toggleEquipment()">✖</span>
                <h2>⚔️ EKIPMAN</h2>
                <div class="equipment-grid">
                    ${Object.entries(this.equipment).map(([slot, item]) => `
                        <div class="equip-slot">
                            <div style="font-size: 10px; color: #aaa;">${slot.toUpperCase()}</div>
                            ${item ? `
                                <div style="font-size: 24px;">${item.icon}</div>
                                <div style="font-size: 12px; color: ${item.rarityData.color};">${item.name}</div>
                                <div style="font-size: 11px;">+${item.statValue} ${item.statBonus}</div>
                                <div style="font-size: 11px;">${item.elementData.icon} ${item.elementData.name}</div>
                            ` : '<div style="color: #666;">Boş</div>'}
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top: 20px; text-align: center;">
                    <button onclick="game.toggleEquipment()" style="padding: 10px 20px; background: #4ade80; border: none; border-radius: 5px; cursor: pointer;">Kapat</button>
                </div>
            `;
        } else {
            panel.style.display = 'none';
        }
    }

    toggleSkillTree() {
        const panel = document.getElementById('skillTreePanel');
        if (panel.style.display === 'none') {
            panel.style.display = 'block';
            panel.innerHTML = `
                <span class="close-btn" onclick="game.toggleSkillTree()">✖</span>
                <h2>🌳 YETENEK AĞACI</h2>
                <div style="text-align: center; margin-bottom: 15px; font-size: 18px; color: #ffd700;">
                    Kullanılabilir Puan: ${this.player.skillPoints}
                </div>
                <div class="skill-tree-grid">
                    ${Object.entries(this.player.skillTree).map(([name, branch]) => `
                        <div class="skill-branch">
                            <div style="font-size: 16px; font-weight: bold; margin-bottom: 10px;">${name.toUpperCase()}</div>
                            <div style="margin-bottom: 10px;">Seviye: ${branch.level}/${branch.maxLevel}</div>
                            <div style="margin-bottom: 10px;">Bonus: +${branch.level * 2} ${branch.bonus}</div>
                            ${branch.unlocked && branch.level < branch.maxLevel ? `
                                <button onclick="game.upgradeBranch('${name}')" style="padding: 8px 16px; background: #3b82f6; border: none; border-radius: 5px; color: white; cursor: pointer;">Yükselt</button>
                            ` : branch.unlocked ? '<div style="color: #4ade80;">MAX</div>' : '<div style="color: #666;">Kilitli</div>'}
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top: 20px; text-align: center;">
                    <button onclick="game.toggleSkillTree()" style="padding: 10px 20px; background: #4ade80; border: none; border-radius: 5px; cursor: pointer;">Kapat</button>
                </div>
            `;
        } else {
            panel.style.display = 'none';
        }
    }

    upgradeBranch(branchName) {
        if (this.player.skillPoints > 0) {
            const branch = this.player.skillTree[branchName];
            if (branch && branch.level < branch.maxLevel) {
                branch.level++;
                this.player.skillPoints--;
                this.updatePlayerStats();
                this.toggleSkillTree(); // Refresh display
                this.savePlayerData();
            }
        }
    }

    toggleQuests() {
        const panel = document.getElementById('questsPanel');
        if (panel.style.display === 'none') {
            panel.style.display = 'block';
            panel.innerHTML = `
                <span class="close-btn" onclick="game.toggleQuests()">✖</span>
                <h2>📜 GÜNLÜK GÖREVLER</h2>
                ${this.dailyQuests.map(quest => `
                    <div class="quest-item" style="border-color: ${quest.completed ? '#4ade80' : 'rgba(255, 255, 255, 0.3)'};">
                        <div style="font-weight: bold; margin-bottom: 5px;">${quest.desc}</div>
                        <div style="font-size: 12px; color: #aaa;">İlerleme: ${quest.progress}/${quest.amount}</div>
                        <div style="font-size: 12px; color: #ffd700;">Ödül: ${quest.reward.xp} XP, ${quest.reward.gold} Altın</div>
                        ${quest.completed ? '<div style="color: #4ade80; margin-top: 5px;">✓ Tamamlandı</div>' : ''}
                    </div>
                `).join('')}
                <div style="margin-top: 20px; text-align: center;">
                    <button onclick="game.toggleQuests()" style="padding: 10px 20px; background: #4ade80; border: none; border-radius: 5px; cursor: pointer;">Kapat</button>
                </div>
            `;
        } else {
            panel.style.display = 'none';
        }
    }

    toggleMap() {
        const panel = document.getElementById('mapPanel');
        if (panel.style.display === 'none') {
            panel.style.display = 'block';
            panel.innerHTML = `
                <span class="close-btn" onclick="game.toggleMap()">✖</span>
                <h2>🗺️ HARİTALAR</h2>
                <div class="map-grid">
                    ${MAPS.map((map, index) => {
                        const unlocked = this.player.level >= map.level || index === 0;
                        MAPS[index].unlocked = unlocked;
                        return `
                            <div class="map-card ${unlocked ? 'unlocked' : 'locked'}"
                                 onclick="${unlocked ? `game.changeMap(${index})` : ''}"
                                 style="background-color: ${unlocked ? map.bgColor : '#333'};">
                                <div style="font-size: 32px; margin-bottom: 5px;">${map.icon}</div>
                                <div style="font-weight: bold; margin-bottom: 5px;">${map.name}</div>
                                <div style="font-size: 12px; color: #aaa;">Seviye: ${map.level}</div>
                                ${index === this.currentMapIndex ? '<div style="color: #4ade80; margin-top: 5px;">✓ Şu An Buradasınız</div>' : ''}
                                ${!unlocked ? '<div style="color: #ef4444; margin-top: 5px;">🔒 Kilitli</div>' : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
                <div style="margin-top: 20px; text-align: center;">
                    <button onclick="game.toggleMap()" style="padding: 10px 20px; background: #4ade80; border: none; border-radius: 5px; cursor: pointer;">Kapat</button>
                </div>
            `;
        } else {
            panel.style.display = 'none';
        }
    }

    changeMap(index) {
        this.currentMapIndex = index;
        this.mobs = [];
        this.drops = [];
        this.spawnMobs();
        this.toggleMap(); // Close panel
        this.showNotification(`🗺️ ${MAPS[index].name} bölgesine girdiniz!`);
        this.savePlayerData();
    }

    // ==================== COMBO SYSTEM ====================

    addCombo() {
        const now = Date.now();
        if (now - this.lastHitTime < this.comboTimeout) {
            this.comboCount++;
        } else {
            this.comboCount = 1;
        }
        this.lastHitTime = now;

        if (this.comboCount >= 3) {
            this.showCombo();
        }

        if (this.comboCount === 10) {
            this.updateQuest('combo', 1);
        }
    }

    showCombo() {
        const display = document.getElementById('comboDisplay');
        display.textContent = `${this.comboCount} KOMBO! 🔥`;
        display.style.display = 'block';

        setTimeout(() => {
            display.style.display = 'none';
        }, 500);
    }

    resetCombo() {
        this.comboCount = 0;
    }

    // ==================== CONTROLS ====================

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

            // Save
            if (e.key.toLowerCase() === 'p') {
                this.savePlayerData();
                this.showNotification('💾 Oyun kaydedildi!');
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

    // ==================== MOBS ====================

    spawnMobs() {
        const currentMap = MAPS[this.currentMapIndex];
        const mobCount = 5 + Math.floor(this.player.level / 2);

        for (let i = 0; i < mobCount; i++) {
            this.spawnMob();
        }
    }

    spawnMob() {
        const currentMap = MAPS[this.currentMapIndex];
        const [minLevel, maxLevel] = currentMap.mobLevelRange;
        const mobLevel = Math.floor(Math.random() * (maxLevel - minLevel + 1)) + minLevel;

        const typeIndex = Math.min(
            Math.floor(mobLevel / 5),
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
            level: mobLevel,
            hp: type.hp * (1 + mobLevel * 0.2),
            maxHP: type.hp * (1 + mobLevel * 0.2),
            damage: type.damage * (1 + mobLevel * 0.1),
            size: 35,
            targetCooldown: 0
        });
    }

    // ==================== SKILLS ====================

    useSkill(index) {
        if (!this.player) return;

        const skill = this.player.skills[index];

        if (skill.cooldownRemaining > 0) return;
        if (this.player.mp < skill.mpCost) return;

        this.player.mp -= skill.mpCost;
        skill.cooldownRemaining = skill.cooldown;

        // Skill effects
        if (skill.damage) {
            const nearestMob = this.findNearestMob();
            if (nearestMob) {
                const distance = this.getDistance(this.player, nearestMob);
                if (distance < 300) {
                    let damage = skill.damage + this.player.damage;

                    // Critical hit
                    if (Math.random() < this.player.critChance) {
                        damage *= this.player.critDamage;
                        this.showNotification('💥 KRİTİK!');
                    }

                    // Elemental bonus
                    if (skill.element && nearestMob.element) {
                        const skillElement = ELEMENTS[skill.element];
                        if (skillElement.weakness === nearestMob.element) {
                            damage *= 1.5;
                            this.showNotification(`${skillElement.icon} SÜPER ETKİLİ!`);
                        }
                    }

                    // Combo bonus
                    damage *= (1 + this.comboCount * 0.1);

                    this.damageEnemy(nearestMob, damage);
                    this.addCombo();

                    if (skill.lifesteal || this.player.lifesteal > 0) {
                        const lifestealAmount = (skill.lifesteal || this.player.lifesteal) * damage;
                        this.player.hp = Math.min(
                            this.player.maxHP,
                            this.player.hp + lifestealAmount
                        );
                    }

                    this.updateQuest('damage', Math.floor(damage));
                }
            }
        }

        if (skill.heal) {
            const healAmount = skill.heal * (1 + (this.player.skillTree.healing?.level || 0) * 0.1);
            this.player.hp = Math.min(this.player.maxHP, this.player.hp + healAmount);
            this.updateQuest('heal', Math.floor(healAmount));
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

    // ==================== COMBAT ====================

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
        this.player.gold += enemy.gold;

        this.updateQuest('kill', 1);

        if (this.player.xp >= this.player.xpToLevel) {
            this.levelUp();
        }

        // Drop equipment with chance
        if (Math.random() < 0.3) {
            const equipment = this.generateEquipment(enemy.level, null);
            this.drops.push({
                ...equipment,
                x: enemy.x,
                y: enemy.y,
                size: 25,
                isEquipment: true
            });
        } else if (Math.random() < 0.4) {
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
        this.savePlayerData();
    }

    levelUp() {
        this.player.level++;
        this.player.xp = 0;
        this.player.xpToLevel = Math.floor(this.player.xpToLevel * 1.5);
        this.player.skillPoints += 2;

        this.player.maxHP += 20;
        this.player.hp = this.player.maxHP;
        this.player.maxMP += 10;
        this.player.mp = this.player.maxMP;

        // Unlock skill tree branches
        if (this.player.level >= 5) {
            Object.values(this.player.skillTree).forEach(branch => {
                branch.unlocked = true;
            });
        }

        this.updatePlayerStats();
        this.showNotification(`🎉 LEVEL UP! ${this.player.level} (+2 Yetenek Puanı)`);
        this.updateHUD();
        this.savePlayerData();
    }

    showDamage(x, y, damage) {
        const dmg = document.createElement('div');
        dmg.className = 'damage-number';
        dmg.textContent = '-' + Math.floor(damage);
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

    // ==================== ITEMS ====================

    pickupDrop(drop) {
        const index = this.drops.indexOf(drop);
        if (index > -1) {
            this.drops.splice(index, 1);
        }

        if (drop.isEquipment) {
            // Auto-equip if better or add to inventory
            const success = this.addToInventory(drop);
            if (success) {
                this.showNotification(`✨ ${drop.icon} ${drop.name} (${drop.rarityData.name}) +${drop.statValue}`);
                // Auto-equip if slot is empty
                this.equipItem(drop);
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
        } else if (item.isEquipment) {
            this.equipItem(item);
            this.inventory[slot] = null;
            this.updateInventory();
        }
    }

    updateInventory() {
        this.inventory.forEach((item, i) => {
            const slot = document.getElementById(`slot${i}`);
            if (item) {
                if (item.isEquipment) {
                    slot.innerHTML = `<div style="color: ${item.rarityData.color};">${item.icon}</div>`;
                } else {
                    slot.innerHTML = `${item.icon}`;
                }
                slot.classList.add('has-item');
            } else {
                slot.innerHTML = '';
                slot.classList.remove('has-item');
            }
        });
    }

    // ==================== GAME LOOP ====================

    update() {
        if (!this.player) return;

        // Check combo timeout
        if (Date.now() - this.lastHitTime > this.comboTimeout && this.comboCount > 0) {
            this.resetCombo();
        }

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
    }

    draw() {
        const currentMap = MAPS[this.currentMapIndex];

        this.ctx.fillStyle = currentMap.bgColor;
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

            if (drop.isEquipment) {
                // Glow for equipment
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = drop.rarityData.color;
            }

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

            // Level
            this.ctx.fillStyle = 'white';
            this.ctx.font = '10px Arial';
            this.ctx.fillText(`Lv${mob.level}`, mob.x, mob.y - mob.size - 10);
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

        // Draw map name
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(10, this.canvas.height - 40, 200, 30);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`${currentMap.icon} ${currentMap.name}`, 20, this.canvas.height - 22);
    }

    updateHUD() {
        if (!this.player) return;

        document.getElementById('playerName').textContent = this.player.name;
        document.getElementById('playerLevel').textContent = `Seviye: ${this.player.level} | 💰 ${this.player.gold}`;

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
        alert(`😵 Öldün!\n\nSeviye: ${this.player.level}\nXP: ${this.player.xp}\nAltın: ${this.player.gold}`);
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
