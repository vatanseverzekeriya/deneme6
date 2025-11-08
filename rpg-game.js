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

// World Maps Configuration
const WORLD_MAPS = {
    forest: {
        id: 'forest',
        name: 'Yeşil Orman',
        levelRange: [1, 15],
        theme: {
            background: 'linear-gradient(135deg, #1a4d1a 0%, #0d260d 100%)',
            tileColor: '#2d5016',
            decorations: ['🌲', '🌳', '🌿', '🍄', '🪨', '🌾']
        },
        mobs: [
            { name: 'Orman Kurdu', icon: '🐺', hp: 50, damage: 8, xp: 25, gold: 10, speed: 1.5, level: 1 },
            { name: 'Yaban Domuzu', icon: '🐗', hp: 70, damage: 10, xp: 30, gold: 15, speed: 1.3, level: 3 },
            { name: 'Dev Örümcek', icon: '🕷️', hp: 60, damage: 12, xp: 35, gold: 18, speed: 1.4, level: 5 },
            { name: 'Orman Goblin', icon: '👺', hp: 80, damage: 14, xp: 40, gold: 20, speed: 1.2, level: 8 },
            { name: 'Kara Ayı', icon: '🐻', hp: 100, damage: 16, xp: 50, gold: 25, speed: 1.0, level: 10 }
        ],
        miniBoss: {
            name: 'Alfa Kurt', icon: '🐺', hp: 300, damage: 25, xp: 150, gold: 100, speed: 0.9, level: 12,
            isBoss: true, spawnChance: 0.1
        },
        majorBoss: {
            name: 'Orman Koruyucusu', icon: '🌳', hp: 800, damage: 40, xp: 500, gold: 300, speed: 0.6, level: 15,
            isBoss: true, isElite: true, spawnChance: 0.05
        },
        npcs: [
            { name: 'Avcı Marcus', icon: '🏹', dialogue: 'Ormanda tehlikeli yaratıklar dolaşıyor. Dikkatli ol!', x: 200, y: 200 },
            { name: 'Şifacı Elena', icon: '💊', dialogue: 'Yaralandıysan sana yardım edebilirim.', x: 250, y: 200, heals: true }
        ],
        secretArea: {
            name: 'Gizli Şelale',
            entrance: { x: 800, y: 600 },
            reward: { name: 'Orman Mücevheri', icon: '💎', type: 'treasure', value: 500 }
        },
        teleports: [
            { x: 100, y: 100, targetMap: 'desert', label: 'Çöle Git' }
        ]
    },
    desert: {
        id: 'desert',
        name: 'Kızgın Çöl',
        levelRange: [16, 30],
        theme: {
            background: 'linear-gradient(135deg, #ff9933 0%, #cc6600 100%)',
            tileColor: '#d4a574',
            decorations: ['🌵', '🏜️', '🦂', '💀', '🪨', '🌿']
        },
        mobs: [
            { name: 'Çöl Akrebi', icon: '🦂', hp: 150, damage: 22, xp: 80, gold: 40, speed: 1.6, level: 16 },
            { name: 'Kum Yılanı', icon: '🐍', hp: 130, damage: 20, xp: 75, gold: 35, speed: 1.7, level: 18 },
            { name: 'Mısırlı Mumya', icon: '🧟', hp: 200, damage: 28, xp: 100, gold: 50, speed: 1.0, level: 20 },
            { name: 'Çöl Haydut', icon: '🏴‍☠️', hp: 180, damage: 25, xp: 90, gold: 45, speed: 1.3, level: 23 },
            { name: 'Dev Kum Kurdu', icon: '🪱', hp: 250, damage: 32, xp: 120, gold: 60, speed: 0.9, level: 26 }
        ],
        miniBoss: {
            name: 'Kum Fırtınası Elemental', icon: '🌪️', hp: 800, damage: 50, xp: 300, gold: 200, speed: 1.1, level: 28,
            isBoss: true, spawnChance: 0.1
        },
        majorBoss: {
            name: 'Firavun Laneti', icon: '👑', hp: 2000, damage: 75, xp: 1000, gold: 600, speed: 0.7, level: 30,
            isBoss: true, isElite: true, spawnChance: 0.05
        },
        npcs: [
            { name: 'Kervan Tüccarı', icon: '🐫', dialogue: 'Çölde kayboldun mu? Ben sana yol gösterebilirim.', x: 300, y: 300 },
            { name: 'Bilge Rahip', icon: '🧙', dialogue: 'Eski güçler bu topraklarda uyuyor...', x: 350, y: 300 }
        ],
        secretArea: {
            name: 'Gizli Piramit',
            entrance: { x: 900, y: 700 },
            reward: { name: 'Firavun Hazinesi', icon: '👑', type: 'treasure', value: 1000 }
        },
        teleports: [
            { x: 100, y: 100, targetMap: 'forest', label: 'Ormana Dön' },
            { x: 950, y: 100, targetMap: 'icemountain', label: 'Buz Dağlarına' }
        ]
    },
    icemountain: {
        id: 'icemountain',
        name: 'Buz Dağları',
        levelRange: [31, 45],
        theme: {
            background: 'linear-gradient(135deg, #b3e5fc 0%, #0277bd 100%)',
            tileColor: '#e1f5fe',
            decorations: ['⛰️', '🏔️', '❄️', '⛸️', '🧊', '💎']
        },
        mobs: [
            { name: 'Buz Kurdu', icon: '🐺', hp: 350, damage: 45, xp: 180, gold: 80, speed: 1.5, level: 31 },
            { name: 'Yeti', icon: '👹', hp: 450, damage: 55, xp: 220, gold: 100, speed: 1.1, level: 34 },
            { name: 'Buz Cadısı', icon: '🧙‍♀️', hp: 380, damage: 60, xp: 240, gold: 110, speed: 1.3, level: 37 },
            { name: 'Buzul Devleri', icon: '🧊', hp: 500, damage: 65, xp: 260, gold: 120, speed: 0.9, level: 40 },
            { name: 'Kar Fırtınası Şeytanı', icon: '😈', hp: 550, damage: 70, xp: 280, gold: 130, speed: 1.2, level: 43 }
        ],
        miniBoss: {
            name: 'Buz Ejderhası', icon: '🐉', hp: 1500, damage: 90, xp: 600, gold: 400, speed: 1.0, level: 43,
            isBoss: true, spawnChance: 0.1
        },
        majorBoss: {
            name: 'Donmuş Kral', icon: '👑', hp: 3500, damage: 120, xp: 2000, gold: 1000, speed: 0.8, level: 45,
            isBoss: true, isElite: true, spawnChance: 0.05
        },
        npcs: [
            { name: 'Dağ Rehberi', icon: '🧗', dialogue: 'Bu dağlar soğuk ve tehlikeli. Hazırlıklı ol!', x: 250, y: 250 },
            { name: 'Mistik Keşiş', icon: '🧘', dialogue: 'Zihinini temizle, gücün artacaktır.', x: 300, y: 250, buffs: true }
        ],
        secretArea: {
            name: 'Kristal Mağarası',
            entrance: { x: 850, y: 650 },
            reward: { name: 'Buz Kristali', icon: '💎', type: 'treasure', value: 1500 }
        },
        teleports: [
            { x: 100, y: 100, targetMap: 'desert', label: 'Çöle Dön' },
            { x: 950, y: 100, targetMap: 'lavacave', label: 'Lav Mağarasına' }
        ]
    },
    lavacave: {
        id: 'lavacave',
        name: 'Lav Mağarası',
        levelRange: [46, 60],
        theme: {
            background: 'linear-gradient(135deg, #ff5722 0%, #b71c1c 100%)',
            tileColor: '#4a0e0e',
            decorations: ['🔥', '🌋', '💀', '⚡', '🪨', '💎']
        },
        mobs: [
            { name: 'Ateş Elementi', icon: '🔥', hp: 650, damage: 85, xp: 350, gold: 150, speed: 1.4, level: 46 },
            { name: 'Lav Örümceği', icon: '🕷️', hp: 600, damage: 80, xp: 340, gold: 145, speed: 1.5, level: 49 },
            { name: 'Cehennem Köpeği', icon: '🐕', hp: 700, damage: 90, xp: 370, gold: 160, speed: 1.6, level: 52 },
            { name: 'Volkan Devleri', icon: '👹', hp: 800, damage: 100, xp: 400, gold: 180, speed: 1.0, level: 55 },
            { name: 'Ateş Şeytanı', icon: '😈', hp: 850, damage: 110, xp: 420, gold: 200, speed: 1.2, level: 58 }
        ],
        miniBoss: {
            name: 'Magma Titani', icon: '🔥', hp: 2500, damage: 140, xp: 1000, gold: 700, speed: 0.9, level: 58,
            isBoss: true, spawnChance: 0.1
        },
        majorBoss: {
            name: 'Yanardağ Tanrısı', icon: '🌋', hp: 5000, damage: 180, xp: 3500, gold: 2000, speed: 0.7, level: 60,
            isBoss: true, isElite: true, spawnChance: 0.05
        },
        npcs: [
            { name: 'Demirci Ustası', icon: '⚒️', dialogue: 'Buradaki ateş efsanevi silahlar yapmak için mükemmel!', x: 280, y: 280 },
            { name: 'Ateş Sihirbazı', icon: '🧙‍♂️', dialogue: 'Ateş büyülerini öğrenmek ister misin?', x: 330, y: 280, teaches: true }
        ],
        secretArea: {
            name: 'Lav Göl Adası',
            entrance: { x: 900, y: 650 },
            reward: { name: 'Ateş Taşı', icon: '🔥', type: 'treasure', value: 2500 }
        },
        teleports: [
            { x: 100, y: 100, targetMap: 'icemountain', label: 'Buz Dağlarına Dön' },
            { x: 950, y: 100, targetMap: 'darkcastle', label: 'Karanlık Kaleye' }
        ]
    },
    darkcastle: {
        id: 'darkcastle',
        name: 'Karanlık Kale',
        levelRange: [61, 100],
        theme: {
            background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
            tileColor: '#2a2a2a',
            decorations: ['🏰', '⚔️', '💀', '👻', '🦇', '🕯️']
        },
        mobs: [
            { name: 'Karanlık Şövalye', icon: '⚔️', hp: 1000, damage: 130, xp: 500, gold: 250, speed: 1.3, level: 61 },
            { name: 'Vampir', icon: '🧛', hp: 950, damage: 140, xp: 520, gold: 260, speed: 1.5, level: 65 },
            { name: 'Lich', icon: '💀', hp: 1100, damage: 150, xp: 550, gold: 280, speed: 1.1, level: 70 },
            { name: 'Gölge Assassin', icon: '🥷', hp: 900, damage: 160, xp: 580, gold: 300, speed: 1.8, level: 75 },
            { name: 'Demon Lord', icon: '😈', hp: 1300, damage: 180, xp: 650, gold: 350, speed: 1.2, level: 80 }
        ],
        miniBoss: {
            name: 'Karanlık Büyücü', icon: '🧙‍♂️', hp: 4000, damage: 200, xp: 2000, gold: 1200, speed: 1.0, level: 85,
            isBoss: true, spawnChance: 0.1
        },
        majorBoss: {
            name: 'Karanlık Kral', icon: '👑', hp: 10000, damage: 250, xp: 8000, gold: 5000, speed: 0.8, level: 100,
            isBoss: true, isElite: true, spawnChance: 0.05
        },
        npcs: [
            { name: 'Gizli İsyancı', icon: '🗡️', dialogue: 'Karanlık Kralı yenmek için sana ihtiyacımız var!', x: 300, y: 300 },
            { name: 'Esrarengiz Kütüphaneci', icon: '📚', dialogue: 'Eski bilgelik seni kurtarabilir...', x: 350, y: 300, sells: true }
        ],
        secretArea: {
            name: 'Taht Odası',
            entrance: { x: 950, y: 700 },
            reward: { name: 'Kraliyet Tacı', icon: '👑', type: 'treasure', value: 10000 }
        },
        teleports: [
            { x: 100, y: 100, targetMap: 'lavacave', label: 'Lav Mağarasına Dön' },
            { x: 500, y: 500, targetMap: 'forest', label: 'Başlangıca Dön' }
        ]
    }
};

// Legacy mob types for compatibility
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
        this.currentMap = null;
        this.mobs = [];
        this.projectiles = [];
        this.drops = [];
        this.npcs = [];
        this.teleports = [];
        this.decorations = [];
        this.secretAreaDiscovered = {};
        this.inventory = Array(5).fill(null);

        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

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

        // Load starting map
        this.loadMap('forest');
        this.gameLoop();
    }

    loadMap(mapId) {
        const mapData = WORLD_MAPS[mapId];
        if (!mapData) {
            console.error('Map not found:', mapId);
            return;
        }

        this.currentMap = mapData;
        this.mobs = [];
        this.npcs = [];
        this.teleports = [];
        this.decorations = [];

        // Generate decorations
        for (let i = 0; i < 20; i++) {
            this.decorations.push({
                icon: mapData.theme.decorations[Math.floor(Math.random() * mapData.theme.decorations.length)],
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: 20 + Math.random() * 20
            });
        }

        // Load NPCs
        mapData.npcs.forEach(npcData => {
            this.npcs.push({
                ...npcData,
                size: 35,
                interactionRadius: 80
            });
        });

        // Load teleports
        mapData.teleports.forEach(teleportData => {
            this.teleports.push({
                ...teleportData,
                size: 40,
                active: true
            });
        });

        // Spawn mobs
        this.spawnMobs();

        // Notification
        this.showNotification(`📍 ${mapData.name} - Seviye ${mapData.levelRange[0]}-${mapData.levelRange[1]}`);
    }

    changeMap(targetMapId) {
        this.loadMap(targetMapId);

        // Reset player position to spawn point
        this.player.x = this.canvas.width / 2;
        this.player.y = this.canvas.height / 2;
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
        if (!this.currentMap) return;

        const mobCount = 5 + Math.floor(this.player.level / 2);

        for (let i = 0; i < mobCount; i++) {
            this.spawnMob();
        }

        // Chance to spawn mini-boss
        if (Math.random() < this.currentMap.miniBoss.spawnChance) {
            this.spawnBoss(this.currentMap.miniBoss);
        }

        // Smaller chance to spawn major boss
        if (Math.random() < this.currentMap.majorBoss.spawnChance) {
            this.spawnBoss(this.currentMap.majorBoss);
        }
    }

    spawnMob() {
        if (!this.currentMap) return;

        // Select appropriate mob based on player level
        const suitableMobs = this.currentMap.mobs.filter(mob =>
            mob.level <= this.player.level + 5
        );

        if (suitableMobs.length === 0) return;

        const type = suitableMobs[Math.floor(Math.random() * suitableMobs.length)];

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
            size: type.isBoss ? 50 : 35,
            targetCooldown: 0
        });
    }

    spawnBoss(bossData) {
        // Spawn boss in center of map
        const x = this.canvas.width / 2 + (Math.random() - 0.5) * 200;
        const y = this.canvas.height / 2 + (Math.random() - 0.5) * 200;

        this.mobs.push({
            ...bossData,
            x, y,
            maxHP: bossData.hp,
            size: bossData.isElite ? 70 : 55,
            targetCooldown: 0
        });

        this.showNotification(`⚠️ ${bossData.name} ortaya çıktı!`);
    }

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

        // Check NPC interactions
        this.npcs.forEach(npc => {
            const dist = this.getDistance(this.player, npc);
            if (dist < npc.interactionRadius) {
                if (this.keys[' '] || this.keys['f']) {
                    this.interactWithNPC(npc);
                    this.keys[' '] = false;
                    this.keys['f'] = false;
                }
            }
        });

        // Check teleport triggers
        this.teleports.forEach(teleport => {
            if (this.getDistance(this.player, teleport) < teleport.size) {
                this.changeMap(teleport.targetMap);
            }
        });

        // Check secret area discovery
        if (this.currentMap && this.currentMap.secretArea) {
            const secretDist = this.getDistance(this.player, this.currentMap.secretArea.entrance);
            if (secretDist < 50 && !this.secretAreaDiscovered[this.currentMap.id]) {
                this.discoverSecretArea();
            }
        }

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

    interactWithNPC(npc) {
        if (npc.heals) {
            this.player.hp = this.player.maxHP;
            this.player.mp = this.player.maxMP;
            this.showNotification(`💚 ${npc.name}: Sağlığın tazelendi!`);
            this.updateHUD();
        } else if (npc.buffs) {
            this.player.damage += 5;
            this.player.defense += 3;
            this.showNotification(`✨ ${npc.name}: Güçlerin arttı!`);
        } else {
            this.showNotification(`💬 ${npc.name}: ${npc.dialogue}`);
        }
    }

    discoverSecretArea() {
        if (!this.currentMap) return;

        const secret = this.currentMap.secretArea;
        this.secretAreaDiscovered[this.currentMap.id] = true;

        // Award treasure
        this.player.gold += secret.reward.value;
        this.showNotification(`🎉 ${secret.name} keşfedildi! +${secret.reward.value} Altın!`);

        // Add visual reward
        this.drops.push({
            ...secret.reward,
            x: secret.entrance.x,
            y: secret.entrance.y,
            size: 35
        });
    }

    draw() {
        // Map background
        if (this.currentMap) {
            const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
            const bgMatch = this.currentMap.theme.background.match(/linear-gradient\(135deg, (.+?) 0%, (.+?) 100%\)/);
            if (bgMatch) {
                gradient.addColorStop(0, bgMatch[1]);
                gradient.addColorStop(1, bgMatch[2]);
                this.ctx.fillStyle = gradient;
            } else {
                this.ctx.fillStyle = '#1a1a2e';
            }
        } else {
            this.ctx.fillStyle = '#1a1a2e';
        }
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

        // Decorations
        this.decorations.forEach(deco => {
            this.ctx.font = deco.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.globalAlpha = 0.6;
            this.ctx.fillText(deco.icon, deco.x, deco.y);
            this.ctx.globalAlpha = 1.0;
        });

        // Teleports
        this.teleports.forEach(teleport => {
            // Portal animation
            const time = Date.now() / 1000;
            const pulseSize = Math.sin(time * 3) * 5;

            // Portal circle
            this.ctx.beginPath();
            this.ctx.arc(teleport.x, teleport.y, teleport.size + pulseSize, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(138, 43, 226, 0.3)';
            this.ctx.fill();
            this.ctx.strokeStyle = '#8a2be2';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();

            // Portal icon
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText('🌀', teleport.x, teleport.y);

            // Label
            this.ctx.font = '12px Arial';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(teleport.label, teleport.x, teleport.y + 50);
        });

        // Secret area indicator (if not discovered)
        if (this.currentMap && this.currentMap.secretArea && !this.secretAreaDiscovered[this.currentMap.id]) {
            const secret = this.currentMap.secretArea.entrance;
            const dist = this.player ? this.getDistance(this.player, secret) : 1000;

            if (dist < 150) {
                // Glowing indicator
                this.ctx.beginPath();
                this.ctx.arc(secret.x, secret.y, 30, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
                this.ctx.fill();
                this.ctx.strokeStyle = '#ffd700';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();

                this.ctx.font = '20px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillStyle = '#ffd700';
                this.ctx.fillText('❓', secret.x, secret.y);
            }
        }

        // NPCs
        this.npcs.forEach(npc => {
            const dist = this.player ? this.getDistance(this.player, npc) : 1000;

            // NPC icon
            this.ctx.font = npc.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(npc.icon, npc.x, npc.y);

            // Name tag
            this.ctx.font = '12px Arial';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.strokeStyle = '#000000';
            this.ctx.lineWidth = 3;
            this.ctx.strokeText(npc.name, npc.x, npc.y - 30);
            this.ctx.fillText(npc.name, npc.x, npc.y - 30);

            // Interaction indicator
            if (dist < npc.interactionRadius) {
                this.ctx.font = '16px Arial';
                this.ctx.fillStyle = '#ffd700';
                this.ctx.fillText('Press F', npc.x, npc.y + 30);
            }
        });

        // Drops
        this.drops.forEach(drop => {
            this.ctx.font = drop.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(drop.icon, drop.x, drop.y);
        });

        // Mobs
        this.mobs.forEach(mob => {
            // Boss aura
            if (mob.isBoss) {
                const time = Date.now() / 1000;
                const glowSize = Math.sin(time * 2) * 5;

                this.ctx.beginPath();
                this.ctx.arc(mob.x, mob.y, mob.size + 10 + glowSize, 0, Math.PI * 2);
                this.ctx.fillStyle = mob.isElite ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 165, 0, 0.2)';
                this.ctx.fill();
                this.ctx.strokeStyle = mob.isElite ? '#ff0000' : '#ffa500';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
            }

            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(mob.x, mob.y + mob.size/2, mob.size/2, mob.size/4, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Mob icon
            this.ctx.font = mob.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';

            // Boss glow effect
            if (mob.isBoss) {
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = mob.isElite ? '#ff0000' : '#ffa500';
            }
            this.ctx.fillText(mob.icon, mob.x, mob.y);
            this.ctx.shadowBlur = 0;

            // Boss crown
            if (mob.isBoss) {
                this.ctx.font = '20px Arial';
                this.ctx.fillText('👑', mob.x, mob.y - mob.size + 10);
            }

            // HP bar
            const barWidth = mob.isBoss ? 60 : 40;
            const barHeight = mob.isBoss ? 6 : 4;
            const hpPercent = mob.hp / mob.maxHP;

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(mob.x - barWidth/2, mob.y - mob.size - 10, barWidth, barHeight);

            this.ctx.fillStyle = hpPercent > 0.5 ? '#4ade80' : hpPercent > 0.25 ? '#fbbf24' : '#ef4444';
            this.ctx.fillRect(mob.x - barWidth/2, mob.y - mob.size - 10, barWidth * hpPercent, barHeight);

            // Mob name for bosses
            if (mob.isBoss) {
                this.ctx.font = '14px Arial';
                this.ctx.fillStyle = '#ffffff';
                this.ctx.strokeStyle = '#000000';
                this.ctx.lineWidth = 3;
                this.ctx.strokeText(mob.name, mob.x, mob.y - mob.size - 25);
                this.ctx.fillText(mob.name, mob.x, mob.y - mob.size - 25);
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
        }
    }

    updateHUD() {
        if (!this.player) return;

        const mapName = this.currentMap ? this.currentMap.name : 'Bilinmeyen Bölge';
        document.getElementById('playerName').textContent = `${this.player.name} | 💰${this.player.gold}`;
        document.getElementById('playerLevel').textContent = `Seviye: ${this.player.level} | 📍 ${mapName}`;

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

    // Tiled Map Editor JSON Import
    async loadTiledMap(jsonPath) {
        try {
            const response = await fetch(jsonPath);
            const tiledData = await response.json();

            // Parse Tiled map data
            const customMap = {
                id: tiledData.properties?.id || 'custom',
                name: tiledData.properties?.name || 'Custom Map',
                levelRange: tiledData.properties?.levelRange || [1, 10],
                theme: {
                    background: tiledData.properties?.background || 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    tileColor: tiledData.properties?.tileColor || '#2d5016',
                    decorations: tiledData.properties?.decorations || ['🌲', '🌳', '🌿']
                },
                mobs: this.parseTiledMobs(tiledData.layers),
                miniBoss: this.parseTiledBoss(tiledData.layers, 'miniboss'),
                majorBoss: this.parseTiledBoss(tiledData.layers, 'boss'),
                npcs: this.parseTiledNPCs(tiledData.layers),
                secretArea: this.parseTiledSecretArea(tiledData.layers),
                teleports: this.parseTiledTeleports(tiledData.layers)
            };

            // Add to WORLD_MAPS
            WORLD_MAPS[customMap.id] = customMap;

            this.showNotification(`🗺️ ${customMap.name} haritası yüklendi!`);
            return customMap.id;
        } catch (error) {
            console.error('Tiled map loading error:', error);
            this.showNotification('❌ Harita yüklenemedi!');
            return null;
        }
    }

    parseTiledMobs(layers) {
        const mobLayer = layers.find(l => l.name === 'mobs' || l.type === 'objectgroup');
        if (!mobLayer || !mobLayer.objects) return [];

        return mobLayer.objects
            .filter(obj => obj.type === 'mob')
            .map(obj => ({
                name: obj.properties?.name || 'Unknown',
                icon: obj.properties?.icon || '👾',
                hp: obj.properties?.hp || 50,
                damage: obj.properties?.damage || 10,
                xp: obj.properties?.xp || 25,
                gold: obj.properties?.gold || 10,
                speed: obj.properties?.speed || 1.0,
                level: obj.properties?.level || 1
            }));
    }

    parseTiledBoss(layers, bossType) {
        const bossLayer = layers.find(l => l.name === bossType);
        if (!bossLayer || !bossLayer.objects || bossLayer.objects.length === 0) {
            return {
                name: 'Boss',
                icon: '👹',
                hp: 500,
                damage: 50,
                xp: 200,
                gold: 100,
                speed: 0.8,
                level: 10,
                isBoss: true,
                spawnChance: 0.1
            };
        }

        const boss = bossLayer.objects[0];
        return {
            name: boss.properties?.name || 'Boss',
            icon: boss.properties?.icon || '👹',
            hp: boss.properties?.hp || 500,
            damage: boss.properties?.damage || 50,
            xp: boss.properties?.xp || 200,
            gold: boss.properties?.gold || 100,
            speed: boss.properties?.speed || 0.8,
            level: boss.properties?.level || 10,
            isBoss: true,
            isElite: bossType === 'boss',
            spawnChance: boss.properties?.spawnChance || 0.1
        };
    }

    parseTiledNPCs(layers) {
        const npcLayer = layers.find(l => l.name === 'npcs');
        if (!npcLayer || !npcLayer.objects) return [];

        return npcLayer.objects.map(obj => ({
            name: obj.properties?.name || 'NPC',
            icon: obj.properties?.icon || '🧙',
            dialogue: obj.properties?.dialogue || 'Hello!',
            x: obj.x || 200,
            y: obj.y || 200,
            heals: obj.properties?.heals || false,
            buffs: obj.properties?.buffs || false
        }));
    }

    parseTiledSecretArea(layers) {
        const secretLayer = layers.find(l => l.name === 'secret');
        if (!secretLayer || !secretLayer.objects || secretLayer.objects.length === 0) {
            return {
                name: 'Secret Area',
                entrance: { x: 800, y: 600 },
                reward: { name: 'Treasure', icon: '💎', type: 'treasure', value: 500 }
            };
        }

        const secret = secretLayer.objects[0];
        return {
            name: secret.properties?.name || 'Secret Area',
            entrance: { x: secret.x || 800, y: secret.y || 600 },
            reward: {
                name: secret.properties?.rewardName || 'Treasure',
                icon: secret.properties?.rewardIcon || '💎',
                type: 'treasure',
                value: secret.properties?.rewardValue || 500
            }
        };
    }

    parseTiledTeleports(layers) {
        const teleportLayer = layers.find(l => l.name === 'teleports');
        if (!teleportLayer || !teleportLayer.objects) return [];

        return teleportLayer.objects.map(obj => ({
            x: obj.x || 100,
            y: obj.y || 100,
            targetMap: obj.properties?.targetMap || 'forest',
            label: obj.properties?.label || 'Teleport'
        }));
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
