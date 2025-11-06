// ========================================
// METIN2-STYLE PC MMORPG - FULL VERSION
// ========================================

// Kingdom Data
const KINGDOMS = {
    chunjo: {
        name: 'Chunjo',
        icon: '🔵',
        color: '#3b82f6',
        desc: 'Mavi Ejderha Krallığı'
    },
    jinno: {
        name: 'Jinno',
        icon: '🔴',
        color: '#ef4444',
        desc: 'Kırmızı Feniks Krallığı'
    },
    shinsoo: {
        name: 'Shinsoo',
        icon: '🟡',
        color: '#fbbf24',
        desc: 'Sarı Kaplan Krallığı'
    }
};

// Character Classes with Skills
const CLASSES = {
    warrior: {
        name: 'Savaşçı',
        icon: '🛡️',
        baseHP: 200,
        baseSP: 100,
        baseMP: 50,
        baseDamage: 25,
        baseDefense: 15,
        skills: [
            // Bedensel Yetenekler (Body Skills)
            { name: 'Üç Yol Kesimi', icon: '⚔️', type: 'physical', damage: 40, spCost: 20, cooldown: 3000, key: '1', tree: 'body' },
            { name: 'Kılıç Darbesi', icon: '🗡️', type: 'physical', damage: 60, spCost: 30, cooldown: 5000, key: '2', tree: 'body' },
            { name: 'Dönen Kılıç', icon: '🌀', type: 'physical', damage: 80, spCost: 40, cooldown: 8000, key: '3', tree: 'body', aoe: true },
            // Zihinsel Yetenekler (Mental Skills)
            { name: 'Güçlü Beden', icon: '💪', type: 'buff', defense: 30, spCost: 25, cooldown: 6000, key: '4', tree: 'mental', duration: 10000 },
            { name: 'Savaş Çığlığı', icon: '📢', type: 'buff', damage: 20, spCost: 35, cooldown: 10000, key: '5', tree: 'mental', duration: 15000 },
            { name: 'Ölümsüz', icon: '⭐', type: 'buff', heal: 100, spCost: 50, cooldown: 30000, key: '6', tree: 'mental' }
        ]
    },
    ninja: {
        name: 'Ninja',
        icon: '🗡️',
        baseHP: 150,
        baseSP: 150,
        baseMP: 80,
        baseDamage: 35,
        baseDefense: 8,
        skills: [
            // Bedensel Yetenekler (Body Skills)
            { name: 'Hızlı Saldırı', icon: '⚡', type: 'physical', damage: 30, spCost: 15, cooldown: 2000, key: '1', tree: 'body', critBonus: 0.3 },
            { name: 'Dönen Kama', icon: '🔪', type: 'physical', damage: 50, spCost: 25, cooldown: 4000, key: '2', tree: 'body' },
            { name: 'Ambus', icon: '💨', type: 'physical', damage: 90, spCost: 45, cooldown: 10000, key: '3', tree: 'body', critBonus: 0.5 },
            // Zihinsel Yetenekler (Mental Skills)
            { name: 'Gölge Adımı', icon: '👻', type: 'buff', dodge: true, spCost: 20, cooldown: 8000, key: '4', tree: 'mental', duration: 5000 },
            { name: 'Zehirli Bulut', icon: '☠️', type: 'magical', damage: 40, spCost: 30, cooldown: 7000, key: '5', tree: 'mental', dot: true },
            { name: 'Görünmezlik', icon: '🌫️', type: 'buff', invisible: true, spCost: 40, cooldown: 20000, key: '6', tree: 'mental', duration: 8000 }
        ]
    },
    shaman: {
        name: 'Şaman',
        icon: '🔮',
        baseHP: 170,
        baseSP: 120,
        baseMP: 150,
        baseDamage: 20,
        baseDefense: 10,
        skills: [
            // Ejderha Büyüleri (Dragon Magic)
            { name: 'Ejder Ateşi', icon: '🔥', type: 'magical', damage: 50, mpCost: 25, cooldown: 3000, key: '1', tree: 'dragon' },
            { name: 'Yıldırım Çağırma', icon: '⚡', type: 'magical', damage: 70, mpCost: 35, cooldown: 5000, key: '2', tree: 'dragon' },
            { name: 'Meteor', icon: '☄️', type: 'magical', damage: 100, mpCost: 50, cooldown: 12000, key: '3', tree: 'dragon', aoe: true },
            // İyileştirme Büyüleri (Healing Magic)
            { name: 'İyileştirme', icon: '💚', type: 'heal', heal: 60, mpCost: 30, cooldown: 5000, key: '4', tree: 'healing' },
            { name: 'Grup İyileştirme', icon: '✨', type: 'heal', heal: 40, mpCost: 45, cooldown: 8000, key: '5', tree: 'healing', aoe: true },
            { name: 'Kutsal Kalkan', icon: '🛡️', type: 'buff', shield: 100, mpCost: 40, cooldown: 15000, key: '6', tree: 'healing', duration: 10000 }
        ]
    },
    sura: {
        name: 'Sura',
        icon: '⚡',
        baseHP: 180,
        baseSP: 130,
        baseMP: 120,
        baseDamage: 30,
        baseDefense: 12,
        skills: [
            // Karabüyü (Black Magic)
            { name: 'Karanlık Darbe', icon: '🌑', type: 'magical', damage: 45, mpCost: 20, cooldown: 2500, key: '1', tree: 'black' },
            { name: 'Ruh Emme', icon: '👻', type: 'magical', damage: 35, mpCost: 25, cooldown: 4000, key: '2', tree: 'black', lifesteal: 0.5 },
            { name: 'Ölüm Darbesi', icon: '💀', type: 'magical', damage: 85, mpCost: 45, cooldown: 10000, key: '3', tree: 'black' },
            // Büyülü Silah Yetenekleri (Enchanted Weapon Skills)
            { name: 'Büyülü Zırh', icon: '🛡️', type: 'buff', defense: 25, mpCost: 30, cooldown: 8000, key: '4', tree: 'enchant', duration: 12000 },
            { name: 'Kor Ateşi', icon: '🔥', type: 'magical', damage: 60, mpCost: 35, cooldown: 6000, key: '5', tree: 'enchant', dot: true },
            { name: 'Karanlık Koruma', icon: '⚫', type: 'buff', absorb: 150, mpCost: 50, cooldown: 20000, key: '6', tree: 'enchant', duration: 8000 }
        ]
    }
};

// Equipment Items
const EQUIPMENT_ITEMS = {
    weapons: [
        { name: 'Kırık Kılıç', icon: '🗡️', damage: 5, level: 1, price: 100, quality: 'common' },
        { name: 'Demir Kılıç', icon: '⚔️', damage: 15, level: 5, price: 500, quality: 'uncommon' },
        { name: 'Çelik Kılıç', icon: '🗡️', damage: 30, level: 10, price: 2000, quality: 'rare' },
        { name: 'Gümüş Kılıç', icon: '⚔️', damage: 50, level: 20, price: 5000, quality: 'epic' },
        { name: 'Ejder Kılıcı', icon: '🐉', damage: 80, level: 40, price: 20000, quality: 'legendary' }
    ],
    helmets: [
        { name: 'Deri Başlık', icon: '🎩', defense: 3, level: 1, price: 80, quality: 'common' },
        { name: 'Demir Miğfer', icon: '🪖', defense: 10, level: 5, price: 400, quality: 'uncommon' },
        { name: 'Çelik Kask', icon: '⛑️', defense: 20, level: 10, price: 1500, quality: 'rare' },
        { name: 'Gümüş Taç', icon: '👑', defense: 35, level: 20, price: 4000, quality: 'epic' },
        { name: 'Ejder Tacı', icon: '🐲', defense: 60, level: 40, price: 15000, quality: 'legendary' }
    ],
    armors: [
        { name: 'Deri Zırh', icon: '🦺', defense: 5, hp: 20, level: 1, price: 150, quality: 'common' },
        { name: 'Demir Zırh', icon: '🛡️', defense: 15, hp: 50, level: 5, price: 700, quality: 'uncommon' },
        { name: 'Çelik Zırh', icon: '🛡️', defense: 30, hp: 100, level: 10, price: 2500, quality: 'rare' },
        { name: 'Gümüş Zırh', icon: '⚜️', defense: 50, hp: 200, level: 20, price: 7000, quality: 'epic' },
        { name: 'Ejder Zırhı', icon: '🐉', defense: 80, hp: 400, level: 40, price: 25000, quality: 'legendary' }
    ],
    necklaces: [
        { name: 'Bakır Kolye', icon: '📿', damage: 3, level: 1, price: 100, quality: 'common' },
        { name: 'Gümüş Kolye', icon: '💎', damage: 8, mp: 20, level: 5, price: 600, quality: 'uncommon' },
        { name: 'Altın Kolye', icon: '📿', damage: 15, mp: 50, level: 10, price: 2000, quality: 'rare' },
        { name: 'Yakut Kolye', icon: '💍', damage: 25, mp: 100, level: 20, price: 5000, quality: 'epic' },
        { name: 'Ejder Kolyesi', icon: '🐲', damage: 40, mp: 200, level: 40, price: 18000, quality: 'legendary' }
    ],
    bracelets: [
        { name: 'Deri Bilezik', icon: '⌚', defense: 2, level: 1, price: 80, quality: 'common' },
        { name: 'Bronz Bilezik', icon: '💎', defense: 6, sp: 20, level: 5, price: 500, quality: 'uncommon' },
        { name: 'Gümüş Bilezik', icon: '👑', defense: 12, sp: 50, level: 10, price: 1800, quality: 'rare' },
        { name: 'Elmas Bilezik', icon: '💍', defense: 20, sp: 100, level: 20, price: 4500, quality: 'epic' },
        { name: 'Ejder Bileziği', icon: '🐉', defense: 35, sp: 200, level: 40, price: 16000, quality: 'legendary' }
    ],
    shoes: [
        { name: 'Deri Ayakkabı', icon: '👞', speed: 5, level: 1, price: 70, quality: 'common' },
        { name: 'Sert Çizme', icon: '🥾', speed: 10, defense: 3, level: 5, price: 400, quality: 'uncommon' },
        { name: 'Çevik Çizme', icon: '👢', speed: 20, defense: 8, level: 10, price: 1500, quality: 'rare' },
        { name: 'Rüzgar Ayakkabısı', icon: '🌪️', speed: 35, defense: 15, level: 20, price: 4000, quality: 'epic' },
        { name: 'Ejder Çizmesi', icon: '🐲', speed: 60, defense: 25, level: 40, price: 15000, quality: 'legendary' }
    ]
};

// Potion Items
const POTIONS = {
    hp_small: { name: 'Küçük Can İksiri', icon: '💙', type: 'hp', restore: 100, price: 50, color: 'blue' },
    hp_medium: { name: 'Orta Can İksiri', icon: '💙', type: 'hp', restore: 250, price: 150, color: 'blue' },
    hp_large: { name: 'Büyük Can İksiri', icon: '💙', type: 'hp', restore: 500, price: 300, color: 'blue' },

    sp_small: { name: 'Küçük SP İksiri', icon: '❤️', type: 'sp', restore: 100, price: 50, color: 'red' },
    sp_medium: { name: 'Orta SP İksiri', icon: '❤️', type: 'sp', restore: 250, price: 150, color: 'red' },
    sp_large: { name: 'Büyük SP İksiri', icon: '❤️', type: 'sp', restore: 500, price: 300, color: 'red' },

    mp_small: { name: 'Küçük Mana İksiri', icon: '💜', type: 'mp', restore: 100, price: 50, color: 'purple' },
    mp_medium: { name: 'Orta Mana İksiri', icon: '💜', type: 'mp', restore: 250, price: 150, color: 'purple' },
    mp_large: { name: 'Büyük Mana İksiri', icon: '💜', type: 'mp', restore: 500, price: 300, color: 'purple' },

    antidote: { name: 'Panzehir', icon: '💚', type: 'antidote', price: 100, color: 'green' }
};

// Monster Types
const MONSTER_TYPES = [
    { name: 'Vahşi Kurt', icon: '🐺', hp: 100, damage: 10, defense: 3, xp: 25, gold: 15, level: 1, speed: 1.8 },
    { name: 'Goblin Savaşçı', icon: '👹', hp: 150, damage: 15, defense: 5, xp: 35, gold: 25, level: 3, speed: 1.5 },
    { name: 'Ork Berserker', icon: '👾', hp: 250, damage: 25, defense: 10, xp: 50, gold: 40, level: 5, speed: 1.2 },
    { name: 'Kara Büyücü', icon: '🧙', hp: 200, damage: 30, defense: 8, xp: 60, gold: 50, level: 8, speed: 1.0 },
    { name: 'Troll Kral', icon: '🧟', hp: 400, damage: 35, defense: 15, xp: 80, gold: 70, level: 12, speed: 0.9 },
    { name: 'Kızıl Ejderha', icon: '🐉', hp: 800, damage: 50, defense: 25, xp: 150, gold: 150, level: 20, speed: 0.7 },
    { name: 'Karanlık Lord', icon: '😈', hp: 1500, damage: 70, defense: 40, xp: 250, gold: 300, level: 30, speed: 0.6 },
    { name: 'Antik Ejderha', icon: '🐲', hp: 3000, damage: 100, defense: 60, xp: 500, gold: 600, level: 40, speed: 0.5 }
];

// NPC Definitions
const NPCS = {
    warehouse: {
        name: 'Depocular',
        icon: '📦',
        role: 'Depo Görevlisi',
        greeting: 'Hoş geldin savaşçı! Eşyalarını güvenle saklayabilirim.',
        type: 'warehouse'
    },
    trader: {
        name: 'Yaşlı Kadın Satıcı',
        icon: '👵',
        role: 'Tüccar',
        greeting: 'Gel gel evladım! En kaliteli malları satıyorum.',
        type: 'shop'
    },
    blacksmith: {
        name: 'Demirci',
        icon: '🔨',
        role: 'Usta Demirci',
        greeting: 'Silahlarını ve zırhlarını geliştirmek için geldiysen doğru yerdesin!',
        type: 'blacksmith'
    },
    guild_blacksmith: {
        name: 'Lonca Demircisi',
        icon: '⚒️',
        role: 'Lonca Demircisi',
        greeting: 'Loncan için özel ekipmanlar yapabilirim!',
        type: 'guild_blacksmith'
    },
    quest_giver: {
        name: 'Görev Ustası',
        icon: '📜',
        role: 'Görev Verici',
        greeting: 'Sana önemli görevler verebilirim. Cesur musun?',
        type: 'quest'
    },
    fisherman: {
        name: 'Balıkçı',
        icon: '🎣',
        role: 'Usta Balıkçı',
        greeting: 'Balık tutmak ister misin? Oltanı hazırla!',
        type: 'fishing'
    },
    stable: {
        name: 'Ahır Görevlisi',
        icon: '🐴',
        role: 'At Satıcısı',
        greeting: 'En iyi atları bulabilirsin burada!',
        type: 'stable'
    }
};

// Horse Types
const HORSES = {
    normal: { name: 'Normal At', icon: '🐴', speed: 20, price: 1000, level: 1 },
    armored: { name: 'Zırhlı At', icon: '🐎', speed: 35, defense: 10, price: 5000, level: 10 },
    war: { name: 'Savaş Atı', icon: '🏇', speed: 50, damage: 15, defense: 20, price: 15000, level: 20 }
};

// Quests
const QUESTS = [
    {
        id: 1,
        name: 'Kurt Avı',
        desc: 'Köyü tehdit eden 10 vahşi kurdu öldür',
        type: 'kill',
        target: 'Vahşi Kurt',
        required: 10,
        reward: { xp: 100, gold: 200 },
        level: 1
    },
    {
        id: 2,
        name: 'Goblin Tehdidi',
        desc: '15 Goblin Savaşçısını öldür',
        type: 'kill',
        target: 'Goblin Savaşçı',
        required: 15,
        reward: { xp: 200, gold: 400 },
        level: 3
    },
    {
        id: 3,
        name: 'Ork İstilası',
        desc: '20 Ork Berserker yok et',
        type: 'kill',
        target: 'Ork Berserker',
        required: 20,
        reward: { xp: 400, gold: 800 },
        level: 5
    },
    {
        id: 4,
        name: 'Kara Büyü',
        desc: '10 Kara Büyücüyü öldür',
        type: 'kill',
        target: 'Kara Büyücü',
        required: 10,
        reward: { xp: 600, gold: 1200 },
        level: 8
    },
    {
        id: 5,
        name: 'Ejderha Avı',
        desc: 'Efsanevi Kızıl Ejderhayı yok et',
        type: 'kill',
        target: 'Kızıl Ejderha',
        required: 1,
        reward: { xp: 2000, gold: 5000, item: 'Ejder Kılıcı' },
        level: 20
    }
];

// Fish Types
const FISH_TYPES = [
    { name: 'Küçük Balık', icon: '🐟', price: 10, rarity: 0.5 },
    { name: 'Orta Balık', icon: '🐠', price: 30, rarity: 0.3 },
    { name: 'Büyük Balık', icon: '🦈', price: 80, rarity: 0.15 },
    { name: 'Altın Balık', icon: '🐡', price: 200, rarity: 0.04 },
    { name: 'Ejderha Balığı', icon: '🐲', price: 1000, rarity: 0.01 }
];

// ========================================
// GAME CLASS
// ========================================

class Metin2Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.minimapCanvas = document.getElementById('minimapCanvas');
        this.minimapCtx = this.minimapCanvas.getContext('2d');

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Game State
        this.selectedKingdom = null;
        this.player = null;
        this.monsters = [];
        this.npcs = [];
        this.drops = [];
        this.projectiles = [];

        // Player Systems
        this.inventory = [];
        this.equipment = {
            weapon: null,
            helmet: null,
            armor: null,
            necklace: null,
            bracelet: null,
            shoes: null
        };
        this.horse = null;
        this.guild = null;
        this.quests = [];
        this.completedQuests = [];

        // Input
        this.keys = {};
        this.mouse = { x: 0, y: 0, down: false };

        // Camera
        this.camera = { x: 0, y: 0 };

        // World
        this.worldSize = 3000;

        this.setupControls();
        this.initInventory();
        this.spawnNPCs();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initInventory() {
        const invGrid = document.getElementById('invGrid');
        invGrid.innerHTML = '';

        for (let i = 0; i < 40; i++) {
            const slot = document.createElement('div');
            slot.className = 'inv-slot';
            slot.dataset.slot = i;
            slot.onclick = () => this.useInventoryItem(i);
            invGrid.appendChild(slot);
            this.inventory.push(null);
        }
    }

    setupControls() {
        // Keyboard
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;

            if (!this.player) return;

            // Skills (1-9)
            const keyNum = parseInt(e.key);
            if (keyNum >= 1 && keyNum <= 9) {
                this.useSkill(keyNum - 1);
            }

            // UI Toggles
            if (e.key.toLowerCase() === 'i') this.toggleInventory();
            if (e.key.toLowerCase() === 'g') this.toggleGuild();
            if (e.key.toLowerCase() === 'h') this.toggleHorse();
            if (e.key.toLowerCase() === 'f') this.interactNearestNPC();
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        // Mouse
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        this.canvas.addEventListener('mousedown', (e) => {
            this.mouse.down = true;
            if (e.button === 0) { // Left click
                this.autoAttackNearestMonster();
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            this.mouse.down = false;
        });

        // Chat
        const chatInput = document.getElementById('chatInput');
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && chatInput.value.trim()) {
                this.sendChatMessage(chatInput.value.trim());
                chatInput.value = '';
            }
        });
    }

    spawnNPCs() {
        const npcTypes = Object.keys(NPCS);
        const npcPositions = [
            { x: 500, y: 500 },
            { x: 800, y: 600 },
            { x: 1200, y: 800 },
            { x: 400, y: 1000 },
            { x: 2000, y: 1500 },
            { x: 2500, y: 500 },
            { x: 1500, y: 2000 }
        ];

        npcTypes.forEach((type, index) => {
            const npcData = NPCS[type];
            const pos = npcPositions[index % npcPositions.length];

            this.npcs.push({
                ...npcData,
                x: pos.x,
                y: pos.y,
                size: 50
            });
        });
    }

    selectKingdom(kingdom) {
        this.selectedKingdom = kingdom;
        document.getElementById('kingdomSelect').classList.add('hidden');
        document.getElementById('charSelect').classList.add('active');
    }

    selectCharacter(className) {
        const classData = CLASSES[className];
        const kingdomData = KINGDOMS[this.selectedKingdom];

        this.player = {
            class: className,
            name: classData.name,
            icon: classData.icon,
            kingdom: this.selectedKingdom,
            kingdomColor: kingdomData.color,

            x: this.worldSize / 2,
            y: this.worldSize / 2,
            size: 50,
            angle: 0,

            level: 1,
            xp: 0,
            xpToLevel: 100,

            hp: classData.baseHP,
            maxHP: classData.baseHP,
            sp: classData.baseSP,
            maxSP: classData.baseSP,
            mp: classData.baseMP,
            maxMP: classData.baseMP,

            damage: classData.baseDamage,
            defense: classData.baseDefense,
            speed: 4,
            baseSpeed: 4,

            gold: 1000,

            skills: classData.skills.map(s => ({...s, cooldownRemaining: 0})),
            activeBuffs: [],

            attackCooldown: 0,
            attackRange: 100,

            mounted: false
        };

        document.getElementById('charSelect').classList.remove('active');
        document.getElementById('gameScreen').classList.add('active');

        this.updateHUD();
        this.createSkillButtons();
        this.loadInitialQuests();
        this.spawnMonsters();

        // Give starting items
        this.addItemToInventory({...POTIONS.hp_small, count: 10});
        this.addItemToInventory({...POTIONS.sp_small, count: 10});
        this.addItemToInventory({...POTIONS.mp_small, count: 10});

        this.addChatMessage('system', `${kingdomData.name} krallığına hoş geldin, ${classData.name}!`);

        this.gameLoop();
    }

    createSkillButtons() {
        const skillsGrid = document.getElementById('skillsGrid');
        skillsGrid.innerHTML = '';

        this.player.skills.forEach((skill, index) => {
            const btn = document.createElement('div');
            btn.className = 'skill-btn';
            btn.id = `skill${index}`;
            btn.innerHTML = `
                <div class="skill-icon">${skill.icon}</div>
                <div class="skill-key">${skill.key}</div>
            `;
            btn.onclick = () => this.useSkill(index);
            skillsGrid.appendChild(btn);
        });
    }

    loadInitialQuests() {
        QUESTS.forEach(quest => {
            if (quest.level <= this.player.level + 5) {
                this.quests.push({
                    ...quest,
                    progress: 0,
                    active: false
                });
            }
        });
        this.updateQuestUI();
    }

    spawnMonsters() {
        const monstersToSpawn = 15 + Math.floor(this.player.level / 2);

        for (let i = 0; i < monstersToSpawn; i++) {
            this.spawnMonster();
        }
    }

    spawnMonster() {
        // Spawn monsters appropriate for player level
        const availableMonsters = MONSTER_TYPES.filter(m =>
            m.level <= this.player.level + 5 && m.level >= Math.max(1, this.player.level - 3)
        );

        if (availableMonsters.length === 0) return;

        const type = availableMonsters[Math.floor(Math.random() * availableMonsters.length)];

        const angle = Math.random() * Math.PI * 2;
        const distance = 300 + Math.random() * 500;
        const x = this.player.x + Math.cos(angle) * distance;
        const y = this.player.y + Math.sin(angle) * distance;

        this.monsters.push({
            ...type,
            x, y,
            maxHP: type.hp,
            size: 45,
            targetCooldown: 0,
            aggroRange: 400,
            alive: true
        });
    }

    useSkill(index) {
        if (!this.player || index >= this.player.skills.length) return;

        const skill = this.player.skills[index];

        if (skill.cooldownRemaining > 0) {
            this.showNotification('⏰ Bekleme süresinde!');
            return;
        }

        const cost = skill.spCost || skill.mpCost || 0;
        const resource = skill.spCost ? 'sp' : 'mp';

        if (this.player[resource] < cost) {
            this.showNotification(`❌ Yetersiz ${resource.toUpperCase()}!`);
            return;
        }

        this.player[resource] -= cost;
        skill.cooldownRemaining = skill.cooldown;

        // Skill Effects
        if (skill.type === 'physical' || skill.type === 'magical') {
            const nearestMonster = this.findNearestMonster();
            if (nearestMonster) {
                const distance = this.getDistance(this.player, nearestMonster);
                if (distance < 300) {
                    let damage = (skill.damage || 0) + this.player.damage;

                    // Critical hit
                    if (skill.critBonus && Math.random() < 0.2 + skill.critBonus) {
                        damage *= 2;
                        this.showDamage(nearestMonster.x, nearestMonster.y, damage, 'critical');
                    } else {
                        this.showDamage(nearestMonster.x, nearestMonster.y, damage, skill.type);
                    }

                    this.damageMonster(nearestMonster, damage);

                    // Lifesteal
                    if (skill.lifesteal) {
                        this.player.hp = Math.min(this.player.maxHP, this.player.hp + damage * skill.lifesteal);
                    }
                }
            }
        }

        if (skill.type === 'heal') {
            this.player.hp = Math.min(this.player.maxHP, this.player.hp + skill.heal);
            this.showDamage(this.player.x, this.player.y - 50, skill.heal, 'heal');
        }

        if (skill.type === 'buff') {
            this.applyBuff(skill);
        }

        this.updateHUD();
        this.updateSkillUI(index);
        this.addChatMessage('system', `${skill.name} kullanıldı!`);
    }

    applyBuff(skill) {
        const buff = {
            name: skill.name,
            duration: skill.duration || 0,
            defense: skill.defense || 0,
            damage: skill.damage || 0,
            shield: skill.shield || 0
        };

        this.player.activeBuffs.push(buff);

        if (buff.defense) this.player.defense += buff.defense;
        if (buff.damage) this.player.damage += buff.damage;
        if (buff.shield) {
            this.player.shield = (this.player.shield || 0) + buff.shield;
        }
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

    findNearestMonster() {
        let nearest = null;
        let minDist = Infinity;

        this.monsters.forEach(monster => {
            if (!monster.alive) return;
            const dist = this.getDistance(this.player, monster);
            if (dist < minDist) {
                minDist = dist;
                nearest = monster;
            }
        });

        return nearest;
    }

    autoAttackNearestMonster() {
        if (!this.player || this.player.attackCooldown > 0) return;

        const nearest = this.findNearestMonster();
        if (!nearest) return;

        const distance = this.getDistance(this.player, nearest);
        if (distance < this.player.attackRange + 50) {
            const damage = this.player.damage + this.getEquipmentBonus('damage');
            this.damageMonster(nearest, damage);
            this.showDamage(nearest.x, nearest.y, damage, 'physical');
            this.player.attackCooldown = 1000;
        }
    }

    damageMonster(monster, damage) {
        if (!monster.alive) return;

        const finalDamage = Math.max(1, damage - monster.defense);
        monster.hp -= finalDamage;

        if (monster.hp <= 0) {
            monster.alive = false;
            this.killMonster(monster);
        }
    }

    killMonster(monster) {
        // Award XP
        this.player.xp += monster.xp;
        if (this.player.xp >= this.player.xpToLevel) {
            this.levelUp();
        }

        // Award Gold
        this.player.gold += monster.gold;

        // Update Quests
        this.updateQuestProgress(monster.name);

        // Drop loot
        if (Math.random() < 0.3) {
            this.dropLoot(monster);
        }

        // Remove monster
        setTimeout(() => {
            const index = this.monsters.indexOf(monster);
            if (index > -1) {
                this.monsters.splice(index, 1);
                this.spawnMonster();
            }
        }, 2000);

        this.updateHUD();
    }

    dropLoot(monster) {
        const lootTypes = ['equipment', 'potion', 'gold'];
        const lootType = lootTypes[Math.floor(Math.random() * lootTypes.length)];

        let item = null;

        if (lootType === 'equipment') {
            const equipTypes = ['weapons', 'helmets', 'armors', 'necklaces', 'bracelets', 'shoes'];
            const equipType = equipTypes[Math.floor(Math.random() * equipTypes.length)];
            const items = EQUIPMENT_ITEMS[equipType].filter(i => i.level <= this.player.level + 5);
            if (items.length > 0) {
                item = {...items[Math.floor(Math.random() * items.length)]};
            }
        } else if (lootType === 'potion') {
            const potionKeys = Object.keys(POTIONS);
            const potionKey = potionKeys[Math.floor(Math.random() * potionKeys.length)];
            item = {...POTIONS[potionKey], count: Math.floor(Math.random() * 3) + 1};
        } else {
            item = { name: 'Yang', icon: '💰', type: 'gold', value: Math.floor(Math.random() * 100) + 50 };
        }

        if (item) {
            this.drops.push({
                ...item,
                x: monster.x,
                y: monster.y,
                size: 30
            });
        }
    }

    levelUp() {
        this.player.level++;
        this.player.xp = 0;
        this.player.xpToLevel = Math.floor(this.player.xpToLevel * 1.5);

        // Stat increases
        this.player.maxHP += 30;
        this.player.hp = this.player.maxHP;
        this.player.maxSP += 20;
        this.player.sp = this.player.maxSP;
        this.player.maxMP += 15;
        this.player.mp = this.player.maxMP;
        this.player.damage += 5;
        this.player.defense += 3;

        this.showNotification(`🎉 LEVEL UP! Seviye ${this.player.level}!`);
        this.addChatMessage('system', `Tebrikler! Seviye ${this.player.level}'e ulaştın!`);

        // Load new quests
        this.loadNewQuestsForLevel();

        this.updateHUD();
    }

    loadNewQuestsForLevel() {
        QUESTS.forEach(quest => {
            if (quest.level === this.player.level && !this.quests.find(q => q.id === quest.id)) {
                this.quests.push({
                    ...quest,
                    progress: 0,
                    active: false
                });
            }
        });
        this.updateQuestUI();
    }

    updateQuestProgress(monsterName) {
        this.quests.forEach(quest => {
            if (quest.type === 'kill' && quest.target === monsterName && !quest.completed) {
                quest.progress++;
                if (quest.progress >= quest.required) {
                    this.completeQuest(quest);
                }
            }
        });
        this.updateQuestUI();
    }

    completeQuest(quest) {
        quest.completed = true;
        this.player.xp += quest.reward.xp;
        this.player.gold += quest.reward.gold;

        if (quest.reward.item) {
            // Give reward item
            const itemType = quest.reward.item;
            // Find item in equipment
            for (let type in EQUIPMENT_ITEMS) {
                const item = EQUIPMENT_ITEMS[type].find(i => i.name === itemType);
                if (item) {
                    this.addItemToInventory({...item});
                    break;
                }
            }
        }

        this.showNotification(`✅ Görev Tamamlandı: ${quest.name}`);
        this.addChatMessage('system', `Görev tamamlandı: ${quest.name}! Ödül: ${quest.reward.xp} XP, ${quest.reward.gold} Yang`);

        this.completedQuests.push(quest);
        const index = this.quests.indexOf(quest);
        if (index > -1) {
            this.quests.splice(index, 1);
        }

        this.updateHUD();
    }

    updateQuestUI() {
        const questList = document.getElementById('questList');
        questList.innerHTML = '';

        this.quests.filter(q => !q.completed).forEach(quest => {
            const questItem = document.createElement('div');
            questItem.className = 'quest-item';
            questItem.innerHTML = `
                <div class="quest-name">${quest.name}</div>
                <div class="quest-progress">${quest.progress}/${quest.required} ${quest.target}</div>
            `;
            questList.appendChild(questItem);
        });
    }

    pickupDrop(drop) {
        const index = this.drops.indexOf(drop);
        if (index > -1) {
            this.drops.splice(index, 1);
        }

        if (drop.type === 'gold') {
            this.player.gold += drop.value;
            this.showNotification(`+${drop.value} Yang`);
        } else {
            this.addItemToInventory(drop);
            this.showNotification(`+${drop.name}`);
        }

        this.updateHUD();
    }

    addItemToInventory(item) {
        // Check if item is stackable and already exists
        if (item.count) {
            const existing = this.inventory.find(i => i && i.name === item.name);
            if (existing) {
                existing.count += item.count;
                this.updateInventoryUI();
                return true;
            }
        }

        // Find empty slot
        const emptySlot = this.inventory.findIndex(i => i === null);
        if (emptySlot >= 0) {
            this.inventory[emptySlot] = item;
            this.updateInventoryUI();
            return true;
        }

        this.showNotification('❌ Envanter dolu!');
        return false;
    }

    updateInventoryUI() {
        this.inventory.forEach((item, index) => {
            const slot = document.querySelector(`.inv-slot[data-slot="${index}"]`);
            if (!slot) return;

            if (item) {
                const quality = item.quality || 'common';
                slot.innerHTML = `
                    <div class="item-quality quality-${quality}"></div>
                    <div class="equip-icon">${item.icon}</div>
                    ${item.count ? `<div class="item-count">${item.count}</div>` : ''}
                    ${item.level ? `<div class="equip-level">+${item.level}</div>` : ''}
                `;
                slot.classList.add('has-item');
            } else {
                slot.innerHTML = '';
                slot.classList.remove('has-item');
            }
        });
    }

    useInventoryItem(slot) {
        const item = this.inventory[slot];
        if (!item) return;

        // Potions
        if (item.type === 'hp') {
            this.player.hp = Math.min(this.player.maxHP, this.player.hp + item.restore);
            this.consumeItem(slot);
            this.showNotification(`+${item.restore} HP`);
        } else if (item.type === 'sp') {
            this.player.sp = Math.min(this.player.maxSP, this.player.sp + item.restore);
            this.consumeItem(slot);
            this.showNotification(`+${item.restore} SP`);
        } else if (item.type === 'mp') {
            this.player.mp = Math.min(this.player.maxMP, this.player.mp + item.restore);
            this.consumeItem(slot);
            this.showNotification(`+${item.restore} MP`);
        } else if (item.type === 'antidote') {
            // Remove debuffs
            this.player.activeBuffs = this.player.activeBuffs.filter(b => b.duration > 0);
            this.consumeItem(slot);
            this.showNotification('💚 Zehir temizlendi!');
        }
        // Equipment - could be equipped
        else if (item.damage !== undefined || item.defense !== undefined) {
            this.showNotification(`${item.name} - Sağ tıkla kuşan`);
        }

        this.updateHUD();
    }

    consumeItem(slot) {
        const item = this.inventory[slot];
        if (item.count && item.count > 1) {
            item.count--;
        } else {
            this.inventory[slot] = null;
        }
        this.updateInventoryUI();
    }

    getEquipmentBonus(stat) {
        let bonus = 0;
        for (let slot in this.equipment) {
            const item = this.equipment[slot];
            if (item && item[stat]) {
                bonus += item[stat];
            }
        }
        return bonus;
    }

    interactNearestNPC() {
        if (!this.player) return;

        let nearest = null;
        let minDist = Infinity;

        this.npcs.forEach(npc => {
            const dist = this.getDistance(this.player, npc);
            if (dist < minDist && dist < 150) {
                minDist = dist;
                nearest = npc;
            }
        });

        if (nearest) {
            this.openNPCDialog(nearest);
        }
    }

    openNPCDialog(npc) {
        const dialog = document.getElementById('npcDialog');
        document.getElementById('npcIcon').textContent = npc.icon;
        document.getElementById('npcName').textContent = npc.name;
        document.getElementById('npcRole').textContent = npc.role;

        const content = document.getElementById('npcContent');
        content.innerHTML = `<div class="npc-text">${npc.greeting}</div>`;

        if (npc.type === 'shop') {
            this.showShop(content);
        } else if (npc.type === 'warehouse') {
            content.innerHTML += '<div class="npc-text">Depo sistemi yakında...</div>';
        } else if (npc.type === 'blacksmith') {
            content.innerHTML += '<div class="npc-text">Geliştirme sistemi yakında...</div>';
        } else if (npc.type === 'fishing') {
            content.innerHTML += `
                <div class="npc-options">
                    <div class="npc-option" onclick="game.startFishing()">🎣 Balık Tutmaya Başla</div>
                </div>
            `;
        } else if (npc.type === 'stable') {
            this.showStable(content);
        }

        dialog.classList.add('active');
    }

    showShop(content) {
        let shopHTML = '<div class="shop-grid">';

        // Show potions
        Object.values(POTIONS).forEach(potion => {
            shopHTML += `
                <div class="shop-item" onclick="game.buyItem('${potion.name}', ${potion.price})">
                    <div class="shop-item-icon">${potion.icon}</div>
                    <div class="shop-item-name">${potion.name}</div>
                    <div class="shop-item-price">💰 ${potion.price}</div>
                </div>
            `;
        });

        shopHTML += '</div>';
        content.innerHTML += shopHTML;
    }

    showStable(content) {
        let stableHTML = '<div class="shop-grid">';

        Object.values(HORSES).forEach(horse => {
            stableHTML += `
                <div class="shop-item" onclick="game.buyHorse('${horse.name}', ${horse.price})">
                    <div class="shop-item-icon">${horse.icon}</div>
                    <div class="shop-item-name">${horse.name}</div>
                    <div class="shop-item-price">💰 ${horse.price}</div>
                </div>
            `;
        });

        stableHTML += '</div>';
        content.innerHTML += stableHTML;
    }

    buyItem(itemName, price) {
        if (this.player.gold < price) {
            this.showNotification('❌ Yetersiz Yang!');
            return;
        }

        const potion = Object.values(POTIONS).find(p => p.name === itemName);
        if (potion) {
            this.player.gold -= price;
            this.addItemToInventory({...potion, count: 1});
            this.showNotification(`✅ ${itemName} satın alındı!`);
            this.updateHUD();
        }
    }

    buyHorse(horseName, price) {
        if (this.player.gold < price) {
            this.showNotification('❌ Yetersiz Yang!');
            return;
        }

        const horse = Object.values(HORSES).find(h => h.name === horseName);
        if (horse) {
            this.player.gold -= price;
            this.horse = {...horse};
            this.showNotification(`✅ ${horseName} satın alındı!`);
            this.addChatMessage('system', `${horseName} satın aldın! H tuşuna bas binek!`);
            this.updateHUD();
            this.closeNPC();
        }
    }

    closeNPC() {
        document.getElementById('npcDialog').classList.remove('active');
    }

    startFishing() {
        this.closeNPC();
        document.getElementById('fishingUI').classList.add('active');
        this.fishingActive = false;
    }

    castFishingRod() {
        if (this.fishingActive) return;

        this.fishingActive = true;
        this.fishingProgress = 0;
        this.fishingTarget = Math.random() * 320;

        const target = document.getElementById('fishingTarget');
        target.style.left = this.fishingTarget + 'px';

        const cursor = document.getElementById('fishingCursor');

        const fishingInterval = setInterval(() => {
            this.fishingProgress += 5;
            cursor.style.left = this.fishingProgress + 'px';

            if (this.fishingProgress >= 390) {
                clearInterval(fishingInterval);
                this.checkFishingResult();
            }
        }, 50);

        setTimeout(() => {
            if (this.fishingActive) {
                clearInterval(fishingInterval);
                this.checkFishingResult();
            }
        }, 4000);
    }

    checkFishingResult() {
        const cursor = document.getElementById('fishingCursor');
        const cursorPos = parseFloat(cursor.style.left) || 0;
        const targetPos = this.fishingTarget;

        // Check if cursor is in target range
        if (cursorPos >= targetPos && cursorPos <= targetPos + 80) {
            // Success! Catch a fish
            const roll = Math.random();
            let caughtFish = null;

            let cumulative = 0;
            for (let fish of FISH_TYPES) {
                cumulative += fish.rarity;
                if (roll <= cumulative) {
                    caughtFish = fish;
                    break;
                }
            }

            if (caughtFish) {
                this.player.gold += caughtFish.price;
                this.showNotification(`🎣 ${caughtFish.name} yakalandı! +${caughtFish.price} Yang`);
                this.addChatMessage('system', `${caughtFish.icon} ${caughtFish.name} yakaladın!`);
            }
        } else {
            this.showNotification('❌ Balık kaçtı!');
        }

        this.fishingActive = false;
        cursor.style.left = '0px';
        this.updateHUD();
    }

    closeFishing() {
        document.getElementById('fishingUI').classList.remove('active');
        this.fishingActive = false;
    }

    toggleHorse() {
        if (!this.horse) {
            this.showNotification('❌ Atın yok!');
            return;
        }

        this.player.mounted = !this.player.mounted;

        if (this.player.mounted) {
            this.player.speed = this.player.baseSpeed + this.horse.speed;
            document.getElementById('horsePanel').classList.add('active');
            document.getElementById('horseIcon').textContent = this.horse.icon;
            document.getElementById('horseName').textContent = this.horse.name;
            document.getElementById('horseStats').textContent = `Hız: +${this.horse.speed}%`;
            this.showNotification(`🐴 ${this.horse.name} binildi!`);
        } else {
            this.player.speed = this.player.baseSpeed;
            document.getElementById('horsePanel').classList.remove('active');
            this.showNotification('Attan inildi');
        }
    }

    toggleInventory() {
        const inv = document.getElementById('inventory');
        inv.style.display = inv.style.display === 'none' ? 'block' : 'none';
    }

    toggleGuild() {
        const guild = document.getElementById('guildUI');
        guild.classList.toggle('active');

        if (this.guild) {
            this.showGuildInfo();
        } else {
            this.showGuildCreate();
        }
    }

    showGuildInfo() {
        const content = document.getElementById('guildUI');
        document.getElementById('guildNameDisplay').textContent = this.guild.name;
        document.getElementById('guildLevelDisplay').textContent = `Seviye ${this.guild.level}`;

        const membersDiv = document.getElementById('guildMembers');
        membersDiv.innerHTML = '<h3>Üyeler:</h3>';
        this.guild.members.forEach(member => {
            membersDiv.innerHTML += `
                <div class="guild-member">
                    <span class="member-name">${member.name}</span>
                    <span class="member-rank">${member.rank}</span>
                </div>
            `;
        });
    }

    showGuildCreate() {
        const content = document.getElementById('guildUI');
        document.getElementById('guildNameDisplay').textContent = 'Lonca Oluştur';
        document.getElementById('guildLevelDisplay').textContent = '';

        const membersDiv = document.getElementById('guildMembers');
        membersDiv.innerHTML = `
            <div class="npc-text">Lonca oluşturmak için 10,000 Yang gerekli</div>
            <input type="text" class="guild-input" id="guildNameInput" placeholder="Lonca adı gir" maxlength="16">
            <button class="guild-btn" onclick="game.createGuild()">Lonca Oluştur (10,000 Yang)</button>
        `;
    }

    createGuild() {
        const guildName = document.getElementById('guildNameInput').value.trim();

        if (!guildName) {
            this.showNotification('❌ Lonca adı gir!');
            return;
        }

        if (this.player.gold < 10000) {
            this.showNotification('❌ Yetersiz Yang! (10,000 gerekli)');
            return;
        }

        this.player.gold -= 10000;
        this.guild = {
            name: guildName,
            level: 1,
            members: [
                { name: this.player.name, rank: 'Lonca Lideri' }
            ]
        };

        this.showNotification(`✅ ${guildName} loncası oluşturuldu!`);
        this.addChatMessage('guild', `${guildName} loncası kuruldu!`);
        this.updateHUD();
        this.showGuildInfo();
    }

    closeGuild() {
        document.getElementById('guildUI').classList.remove('active');
    }

    sendChatMessage(message) {
        this.addChatMessage('player', message);
    }

    addChatMessage(type, message) {
        const messagesDiv = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message chat-${type}`;

        let prefix = '';
        if (type === 'system') prefix = '[Sistem] ';
        else if (type === 'guild') prefix = '[Lonca] ';
        else if (type === 'player') prefix = `[${this.player.name}] `;

        messageDiv.textContent = prefix + message;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    getDistance(a, b) {
        return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }

    showDamage(x, y, damage, type = 'physical') {
        const dmg = document.createElement('div');
        dmg.className = `damage-number damage-${type}`;
        dmg.textContent = type === 'heal' ? `+${Math.floor(damage)}` : `-${Math.floor(damage)}`;

        const screenX = x - this.camera.x + this.canvas.width / 2;
        const screenY = y - this.camera.y + this.canvas.height / 2;

        dmg.style.left = screenX + 'px';
        dmg.style.top = screenY + 'px';
        document.body.appendChild(dmg);

        setTimeout(() => dmg.remove(), 1200);
    }

    showNotification(text) {
        const notif = document.createElement('div');
        notif.className = 'notification';
        notif.textContent = text;
        document.body.appendChild(notif);

        setTimeout(() => notif.remove(), 2000);
    }

    updateHUD() {
        if (!this.player) return;

        document.getElementById('playerName').textContent = this.player.name;
        document.getElementById('playerLevel').textContent = `Lv. ${this.player.level}`;
        document.getElementById('kingdomBadge').textContent = KINGDOMS[this.player.kingdom].name;
        document.getElementById('kingdomBadge').className = `kingdom-badge kingdom-${this.player.kingdom}`;

        const hpPercent = (this.player.hp / this.player.maxHP) * 100;
        const spPercent = (this.player.sp / this.player.maxSP) * 100;
        const mpPercent = (this.player.mp / this.player.maxMP) * 100;
        const xpPercent = (this.player.xp / this.player.xpToLevel) * 100;

        document.getElementById('hpBar').style.width = Math.max(0, hpPercent) + '%';
        document.getElementById('spBar').style.width = Math.max(0, spPercent) + '%';
        document.getElementById('mpBar').style.width = Math.max(0, mpPercent) + '%';
        document.getElementById('xpBar').style.width = Math.max(0, xpPercent) + '%';

        document.getElementById('hpText').textContent = `HP: ${Math.floor(this.player.hp)}/${this.player.maxHP}`;
        document.getElementById('spText').textContent = `SP: ${Math.floor(this.player.sp)}/${this.player.maxSP}`;
        document.getElementById('mpText').textContent = `MP: ${Math.floor(this.player.mp)}/${this.player.maxMP}`;
        document.getElementById('xpText').textContent = `XP: ${this.player.xp}/${this.player.xpToLevel}`;

        document.getElementById('statAtk').textContent = this.player.damage + this.getEquipmentBonus('damage');
        document.getElementById('statDef').textContent = this.player.defense + this.getEquipmentBonus('defense');
        document.getElementById('statGold').textContent = this.player.gold;
        document.getElementById('statLuck').textContent = '5%';
    }

    update() {
        if (!this.player) return;

        const deltaTime = 16;

        // Player movement
        let dx = 0, dy = 0;

        if (this.keys['arrowleft'] || this.keys['a']) dx -= 1;
        if (this.keys['arrowright'] || this.keys['d']) dx += 1;
        if (this.keys['arrowup'] || this.keys['w']) dy -= 1;
        if (this.keys['arrowdown'] || this.keys['s']) dy += 1;

        if (dx || dy) {
            const magnitude = Math.sqrt(dx * dx + dy * dy);
            dx = (dx / magnitude) * this.player.speed;
            dy = (dy / magnitude) * this.player.speed;

            this.player.x = Math.max(50, Math.min(this.worldSize - 50, this.player.x + dx));
            this.player.y = Math.max(50, Math.min(this.worldSize - 50, this.player.y + dy));

            this.player.angle = Math.atan2(dy, dx);
        }

        // Update camera
        this.camera.x = this.player.x;
        this.camera.y = this.player.y;

        // Update monsters
        this.monsters.forEach(monster => {
            if (!monster.alive) return;

            const dist = this.getDistance(this.player, monster);

            if (dist < monster.aggroRange) {
                const angle = Math.atan2(this.player.y - monster.y, this.player.x - monster.x);
                monster.x += Math.cos(angle) * monster.speed;
                monster.y += Math.sin(angle) * monster.speed;

                // Attack player
                if (dist < 60) {
                    if (monster.targetCooldown <= 0) {
                        const damage = Math.max(1, monster.damage - (this.player.defense + this.getEquipmentBonus('defense')));

                        if (this.player.shield && this.player.shield > 0) {
                            this.player.shield -= damage;
                            if (this.player.shield < 0) {
                                this.player.hp += this.player.shield;
                                this.player.shield = 0;
                            }
                        } else {
                            this.player.hp -= damage;
                        }

                        this.showDamage(this.player.x, this.player.y - 50, damage, 'physical');
                        monster.targetCooldown = 1500;

                        if (this.player.hp <= 0) {
                            this.gameOver();
                        }

                        this.updateHUD();
                    }
                }
            }

            if (monster.targetCooldown > 0) {
                monster.targetCooldown -= deltaTime;
            }
        });

        // Update drops
        this.drops.forEach(drop => {
            if (this.getDistance(this.player, drop) < 60) {
                this.pickupDrop(drop);
            }
        });

        // Update cooldowns
        if (this.player.attackCooldown > 0) {
            this.player.attackCooldown -= deltaTime;
        }

        this.player.skills.forEach(skill => {
            if (skill.cooldownRemaining > 0) {
                skill.cooldownRemaining -= deltaTime;
            }
        });

        // Update buffs
        this.player.activeBuffs.forEach((buff, index) => {
            if (buff.duration > 0) {
                buff.duration -= deltaTime;
                if (buff.duration <= 0) {
                    // Remove buff effects
                    if (buff.defense) this.player.defense -= buff.defense;
                    if (buff.damage) this.player.damage -= buff.damage;
                    this.player.activeBuffs.splice(index, 1);
                }
            }
        });

        // Regen
        if (this.player.sp < this.player.maxSP) {
            this.player.sp = Math.min(this.player.maxSP, this.player.sp + 0.15);
        }
        if (this.player.mp < this.player.maxMP) {
            this.player.mp = Math.min(this.player.maxMP, this.player.mp + 0.2);
        }

        // Update HUD periodically
        if (Math.random() < 0.05) {
            this.updateHUD();
        }
    }

    draw() {
        this.ctx.fillStyle = '#0a0e27';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Grid
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        this.ctx.lineWidth = 1;

        const gridSize = 100;
        const offsetX = (this.camera.x % gridSize) - this.canvas.width / 2;
        const offsetY = (this.camera.y % gridSize) - this.canvas.height / 2;

        for (let x = -offsetX; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = -offsetY; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        // Transform for camera
        this.ctx.save();
        this.ctx.translate(
            this.canvas.width / 2 - this.camera.x,
            this.canvas.height / 2 - this.camera.y
        );

        // Draw NPCs
        this.npcs.forEach(npc => {
            this.drawEntity(npc, npc.icon);

            // NPC name
            this.ctx.fillStyle = '#ffd700';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(npc.name, npc.x, npc.y - npc.size - 10);
        });

        // Draw drops
        this.drops.forEach(drop => {
            this.ctx.font = drop.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';

            // Glow effect
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#ffd700';
            this.ctx.fillText(drop.icon, drop.x, drop.y);
            this.ctx.shadowBlur = 0;
        });

        // Draw monsters
        this.monsters.forEach(monster => {
            if (!monster.alive) {
                // Death animation
                this.ctx.globalAlpha = 0.3;
            }

            this.drawEntity(monster, monster.icon);

            if (monster.alive) {
                // HP bar
                const barWidth = 50;
                const barHeight = 5;
                const hpPercent = monster.hp / monster.maxHP;

                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                this.ctx.fillRect(monster.x - barWidth/2, monster.y - monster.size - 10, barWidth, barHeight);

                this.ctx.fillStyle = hpPercent > 0.5 ? '#10b981' : hpPercent > 0.25 ? '#fbbf24' : '#ef4444';
                this.ctx.fillRect(monster.x - barWidth/2, monster.y - monster.size - 10, barWidth * hpPercent, barHeight);

                // Level
                this.ctx.fillStyle = '#fbbf24';
                this.ctx.font = 'bold 12px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(`Lv.${monster.level}`, monster.x, monster.y - monster.size - 20);
            }

            this.ctx.globalAlpha = 1;
        });

        // Draw player
        if (this.player) {
            this.drawEntity(this.player, this.player.icon);

            // Player name
            this.ctx.fillStyle = this.player.kingdomColor;
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(this.player.name, this.player.x, this.player.y - this.player.size - 15);

            // Shield indicator
            if (this.player.shield && this.player.shield > 0) {
                this.ctx.strokeStyle = '#60a5fa';
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.arc(this.player.x, this.player.y, this.player.size + 10, 0, Math.PI * 2);
                this.ctx.stroke();
            }
        }

        this.ctx.restore();

        // Draw minimap
        this.drawMinimap();
    }

    drawEntity(entity, icon) {
        // Shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        this.ctx.beginPath();
        this.ctx.ellipse(entity.x, entity.y + entity.size/2 + 5, entity.size/2, entity.size/5, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Icon
        this.ctx.font = entity.size + 'px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        if (entity === this.player) {
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = entity.kingdomColor;
        }

        this.ctx.fillText(icon, entity.x, entity.y);
        this.ctx.shadowBlur = 0;
    }

    drawMinimap() {
        const minimapSize = 200;
        const worldToMinimap = minimapSize / 1000; // Show 1000x1000 area

        this.minimapCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.minimapCtx.fillRect(0, 0, minimapSize, minimapSize);

        // Player (center)
        this.minimapCtx.fillStyle = this.player.kingdomColor;
        this.minimapCtx.beginPath();
        this.minimapCtx.arc(minimapSize/2, minimapSize/2, 5, 0, Math.PI * 2);
        this.minimapCtx.fill();

        // Monsters
        this.monsters.forEach(monster => {
            if (!monster.alive) return;

            const dx = (monster.x - this.player.x) * worldToMinimap;
            const dy = (monster.y - this.player.y) * worldToMinimap;

            if (Math.abs(dx) < minimapSize/2 && Math.abs(dy) < minimapSize/2) {
                this.minimapCtx.fillStyle = '#ef4444';
                this.minimapCtx.beginPath();
                this.minimapCtx.arc(
                    minimapSize/2 + dx,
                    minimapSize/2 + dy,
                    3, 0, Math.PI * 2
                );
                this.minimapCtx.fill();
            }
        });

        // NPCs
        this.npcs.forEach(npc => {
            const dx = (npc.x - this.player.x) * worldToMinimap;
            const dy = (npc.y - this.player.y) * worldToMinimap;

            if (Math.abs(dx) < minimapSize/2 && Math.abs(dy) < minimapSize/2) {
                this.minimapCtx.fillStyle = '#ffd700';
                this.minimapCtx.beginPath();
                this.minimapCtx.arc(
                    minimapSize/2 + dx,
                    minimapSize/2 + dy,
                    4, 0, Math.PI * 2
                );
                this.minimapCtx.fill();
            }
        });
    }

    gameOver() {
        const respawn = confirm(`💀 Öldün!\n\nSeviye: ${this.player.level}\nYang: ${this.player.gold}\n\nYeniden doğmak ister misin?`);

        if (respawn) {
            this.player.hp = this.player.maxHP;
            this.player.sp = this.player.maxSP;
            this.player.mp = this.player.maxMP;
            this.player.x = this.worldSize / 2;
            this.player.y = this.worldSize / 2;
            this.updateHUD();
            this.addChatMessage('system', 'Köyde yeniden doğdun!');
        } else {
            window.location.reload();
        }
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }

    showEquipmentSlot(slot) {
        const equipped = this.equipment[slot];
        if (equipped) {
            this.showNotification(`${equipped.name} - ${slot}`);
        } else {
            this.showNotification(`${slot} boş`);
        }
    }
}

// ========================================
// INITIALIZATION
// ========================================

const game = new Metin2Game();

function selectKingdom(kingdom) {
    game.selectKingdom(kingdom);
}

function selectCharacter(className) {
    game.selectCharacter(className);
}
