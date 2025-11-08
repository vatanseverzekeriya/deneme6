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
    { name: 'Altın', icon: '💰', type: 'gold', value: 10 }
];

// Equipment items
const EQUIPMENT_ITEMS = [
    { name: 'Demir Kılıç', icon: '⚔️', type: 'weapon', slot: 'weapon', damage: 8, rarity: 'common' },
    { name: 'Çelik Kılıç', icon: '🗡️', type: 'weapon', slot: 'weapon', damage: 15, rarity: 'rare' },
    { name: 'Ejderha Kılıcı', icon: '⚔️', type: 'weapon', slot: 'weapon', damage: 25, rarity: 'legendary' },

    { name: 'Deri Zırh', icon: '🛡️', type: 'armor', slot: 'armor', defense: 6, rarity: 'common' },
    { name: 'Çelik Zırh', icon: '🛡️', type: 'armor', slot: 'armor', defense: 12, rarity: 'rare' },
    { name: 'Ejderha Zırhı', icon: '🛡️', type: 'armor', slot: 'armor', defense: 20, hp: 30, rarity: 'legendary' },

    { name: 'Deri Miğfer', icon: '⛑️', type: 'helmet', slot: 'helmet', defense: 3, rarity: 'common' },
    { name: 'Çelik Miğfer', icon: '⛑️', type: 'helmet', slot: 'helmet', defense: 7, hp: 15, rarity: 'rare' },

    { name: 'Deri Çizmeler', icon: '👢', type: 'boots', slot: 'boots', defense: 2, speed: 0.5, rarity: 'common' },
    { name: 'Hız Çizmeleri', icon: '👢', type: 'boots', slot: 'boots', speed: 1.5, rarity: 'rare' },

    { name: 'Güç Yüzüğü', icon: '💍', type: 'ring', slot: 'ring', damage: 5, rarity: 'rare' },
    { name: 'Koruma Yüzüğü', icon: '💍', type: 'ring', slot: 'ring', defense: 5, hp: 20, rarity: 'rare' },

    { name: 'Sağlık Kolyesi', icon: '📿', type: 'necklace', slot: 'necklace', hp: 40, rarity: 'rare' },
    { name: 'Mana Kolyesi', icon: '📿', type: 'necklace', slot: 'necklace', mp: 40, rarity: 'rare' }
];

// Rarity colors
const RARITY_COLORS = {
    common: '#9ca3af',
    rare: '#3b82f6',
    legendary: '#fbbf24'
};

// Particle class
class Particle {
    constructor(x, y, color, size, vx, vy, lifetime) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.vx = vx;
        this.vy = vy;
        this.lifetime = lifetime;
        this.age = 0;
        this.gravity = 0.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.age++;
        return this.age < this.lifetime;
    }

    draw(ctx) {
        const alpha = 1 - (this.age / this.lifetime);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Environment class for parallax backgrounds
class Environment {
    constructor(canvas) {
        this.canvas = canvas;
        this.layers = [];
        this.stars = [];
        this.clouds = [];
        this.trees = [];

        this.initStars();
        this.initClouds();
        this.initTrees();
    }

    initStars() {
        for (let i = 0; i < 100; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height * 0.6,
                size: Math.random() * 2,
                brightness: Math.random()
            });
        }
    }

    initClouds() {
        for (let i = 0; i < 5; i++) {
            this.clouds.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height * 0.3,
                width: 100 + Math.random() * 100,
                speed: 0.1 + Math.random() * 0.2
            });
        }
    }

    initTrees() {
        for (let i = 0; i < 15; i++) {
            this.trees.push({
                x: Math.random() * this.canvas.width,
                y: this.canvas.height - 100 - Math.random() * 50,
                size: 30 + Math.random() * 20,
                type: Math.random() > 0.5 ? '🌲' : '🌳'
            });
        }
    }

    update() {
        // Update clouds
        this.clouds.forEach(cloud => {
            cloud.x += cloud.speed;
            if (cloud.x > this.canvas.width + cloud.width) {
                cloud.x = -cloud.width;
            }
        });
    }

    draw(ctx, cameraX, cameraY) {
        // Sky gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#1a1a3e');
        gradient.addColorStop(0.6, '#2d1b4e');
        gradient.addColorStop(1, '#1a1a2e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Stars
        this.stars.forEach(star => {
            ctx.globalAlpha = star.brightness * (0.5 + Math.sin(Date.now() * 0.001 + star.x) * 0.5);
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;

        // Clouds
        this.clouds.forEach(cloud => {
            ctx.fillStyle = 'rgba(100, 100, 150, 0.3)';
            ctx.beginPath();
            ctx.ellipse(cloud.x, cloud.y, cloud.width, 30, 0, 0, Math.PI * 2);
            ctx.fill();
        });

        // Ground
        const groundGradient = ctx.createLinearGradient(0, this.canvas.height - 150, 0, this.canvas.height);
        groundGradient.addColorStop(0, '#2a4a2a');
        groundGradient.addColorStop(1, '#1a2a1a');
        ctx.fillStyle = groundGradient;
        ctx.fillRect(0, this.canvas.height - 150, this.canvas.width, 150);

        // Ground pattern
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 1;
        for (let x = 0; x < this.canvas.width; x += 30) {
            for (let y = this.canvas.height - 150; y < this.canvas.height; y += 30) {
                ctx.strokeRect(x, y, 30, 30);
            }
        }

        // Trees (background layer)
        this.trees.forEach(tree => {
            ctx.font = tree.size + 'px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.globalAlpha = 0.6;
            ctx.fillText(tree.type, tree.x, tree.y);
        });
        ctx.globalAlpha = 1;
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
        this.particles = [];

        // Environment
        this.environment = new Environment(this.canvas);

        // Equipment panel state
        this.equipmentPanelOpen = false;

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

            baseDamage: classData.baseDamage,
            baseDefense: classData.baseDefense,
            baseSpeed: 3,

            damage: classData.baseDamage,
            defense: classData.baseDefense,
            speed: 3,

            skills: classData.skills.map(s => ({...s, cooldownRemaining: 0})),

            gold: 0,
            attackCooldown: 0,

            // Equipment slots
            equipment: {
                weapon: null,
                armor: null,
                helmet: null,
                boots: null,
                ring: null,
                necklace: null
            }
        };

        this.updateHUD();
        this.createSkillButtons();
        this.createEquipmentPanel();

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

    createEquipmentPanel() {
        // Check if panel already exists
        if (document.getElementById('equipmentPanel')) return;

        const panel = document.createElement('div');
        panel.id = 'equipmentPanel';
        panel.className = 'equipment-panel';
        panel.innerHTML = `
            <div class="equipment-header">
                <h3>⚔️ EKIPMAN</h3>
                <button class="close-btn" onclick="game.toggleEquipmentPanel()">✕</button>
            </div>
            <div class="equipment-slots">
                <div class="equip-slot" data-slot="weapon">
                    <div class="slot-label">Silah</div>
                    <div class="slot-icon">⚔️</div>
                </div>
                <div class="equip-slot" data-slot="armor">
                    <div class="slot-label">Zırh</div>
                    <div class="slot-icon">🛡️</div>
                </div>
                <div class="equip-slot" data-slot="helmet">
                    <div class="slot-label">Miğfer</div>
                    <div class="slot-icon">⛑️</div>
                </div>
                <div class="equip-slot" data-slot="boots">
                    <div class="slot-label">Çizme</div>
                    <div class="slot-icon">👢</div>
                </div>
                <div class="equip-slot" data-slot="ring">
                    <div class="slot-label">Yüzük</div>
                    <div class="slot-icon">💍</div>
                </div>
                <div class="equip-slot" data-slot="necklace">
                    <div class="slot-label">Kolye</div>
                    <div class="slot-icon">📿</div>
                </div>
            </div>
            <div class="equipment-stats">
                <div class="stat-row">
                    <span>💪 Hasar:</span>
                    <span id="equipDamage">0</span>
                </div>
                <div class="stat-row">
                    <span>🛡️ Savunma:</span>
                    <span id="equipDefense">0</span>
                </div>
                <div class="stat-row">
                    <span>❤️ HP:</span>
                    <span id="equipHP">0</span>
                </div>
                <div class="stat-row">
                    <span>💙 MP:</span>
                    <span id="equipMP">0</span>
                </div>
                <div class="stat-row">
                    <span>⚡ Hız:</span>
                    <span id="equipSpeed">0</span>
                </div>
            </div>
        `;
        document.getElementById('gameScreen').appendChild(panel);

        // Create equipment toggle button
        const toggleBtn = document.createElement('div');
        toggleBtn.className = 'equipment-toggle-btn';
        toggleBtn.innerHTML = '⚔️';
        toggleBtn.onclick = () => this.toggleEquipmentPanel();
        document.getElementById('gameScreen').appendChild(toggleBtn);
    }

    toggleEquipmentPanel() {
        this.equipmentPanelOpen = !this.equipmentPanelOpen;
        const panel = document.getElementById('equipmentPanel');
        if (this.equipmentPanelOpen) {
            panel.classList.add('open');
            this.updateEquipmentDisplay();
        } else {
            panel.classList.remove('open');
        }
    }

    updateEquipmentDisplay() {
        const slots = ['weapon', 'armor', 'helmet', 'boots', 'ring', 'necklace'];
        slots.forEach(slot => {
            const slotDiv = document.querySelector(`.equip-slot[data-slot="${slot}"]`);
            const item = this.player.equipment[slot];

            if (item) {
                slotDiv.classList.add('has-item');
                slotDiv.querySelector('.slot-icon').textContent = item.icon;
                slotDiv.style.borderColor = RARITY_COLORS[item.rarity];
                slotDiv.title = item.name;
                slotDiv.onclick = () => this.unequipItem(slot);
            } else {
                slotDiv.classList.remove('has-item');
                const defaultIcons = {
                    weapon: '⚔️',
                    armor: '🛡️',
                    helmet: '⛑️',
                    boots: '👢',
                    ring: '💍',
                    necklace: '📿'
                };
                slotDiv.querySelector('.slot-icon').textContent = defaultIcons[slot];
                slotDiv.style.borderColor = '';
                slotDiv.title = '';
                slotDiv.onclick = null;
            }
        });

        // Update stats display
        const stats = this.calculateEquipmentStats();
        document.getElementById('equipDamage').textContent = `+${stats.damage}`;
        document.getElementById('equipDefense').textContent = `+${stats.defense}`;
        document.getElementById('equipHP').textContent = `+${stats.hp}`;
        document.getElementById('equipMP').textContent = `+${stats.mp}`;
        document.getElementById('equipSpeed').textContent = `+${stats.speed.toFixed(1)}`;
    }

    calculateEquipmentStats() {
        let stats = { damage: 0, defense: 0, hp: 0, mp: 0, speed: 0 };

        Object.values(this.player.equipment).forEach(item => {
            if (item) {
                stats.damage += item.damage || 0;
                stats.defense += item.defense || 0;
                stats.hp += item.hp || 0;
                stats.mp += item.mp || 0;
                stats.speed += item.speed || 0;
            }
        });

        return stats;
    }

    equipItem(item, fromSlot) {
        if (!item.slot) return;

        // Unequip current item in that slot
        if (this.player.equipment[item.slot]) {
            this.unequipItem(item.slot);
        }

        // Equip new item
        this.player.equipment[item.slot] = item;
        this.inventory[fromSlot] = null;

        // Update stats
        this.updatePlayerStats();
        this.updateInventory();
        this.updateEquipmentDisplay();

        // Show notification
        this.showNotification(`✅ ${item.name} kuşandın!`);

        // Particles
        this.createParticles(this.player.x, this.player.y, RARITY_COLORS[item.rarity], 15);
    }

    unequipItem(slot) {
        const item = this.player.equipment[slot];
        if (!item) return;

        // Find empty inventory slot
        const emptySlot = this.inventory.findIndex(i => i === null);
        if (emptySlot === -1) {
            this.showNotification('❌ Envanter dolu!');
            return;
        }

        // Move to inventory
        this.inventory[emptySlot] = item;
        this.player.equipment[slot] = null;

        // Update stats
        this.updatePlayerStats();
        this.updateInventory();
        this.updateEquipmentDisplay();

        this.showNotification(`📦 ${item.name} çıkarıldı`);
    }

    updatePlayerStats() {
        const equipStats = this.calculateEquipmentStats();

        // Base stats
        this.player.damage = this.player.baseDamage + equipStats.damage;
        this.player.defense = this.player.baseDefense + equipStats.defense;
        this.player.speed = this.player.baseSpeed + equipStats.speed;

        // Update max HP/MP if equipment provides bonuses
        const oldMaxHP = this.player.maxHP;
        const oldMaxMP = this.player.maxMP;

        this.player.maxHP = this.player.level * 20 + (this.player.class === 'warrior' ? 150 : this.player.class === 'shaman' ? 120 : this.player.class === 'sura' ? 130 : 100) + equipStats.hp;
        this.player.maxMP = this.player.level * 10 + (this.player.class === 'shaman' ? 120 : this.player.class === 'sura' ? 100 : this.player.class === 'ninja' ? 80 : 50) + equipStats.mp;

        // Maintain HP/MP ratio when max changes
        const hpRatio = this.player.hp / oldMaxHP;
        const mpRatio = this.player.mp / oldMaxMP;

        this.player.hp = Math.min(this.player.hp, this.player.maxHP);
        this.player.mp = Math.min(this.player.mp, this.player.maxMP);

        this.updateHUD();
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

            // Toggle equipment panel
            if (e.key.toLowerCase() === 'i') {
                this.toggleEquipmentPanel();
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

        // Skill particles based on skill type
        const skillColors = {
            '⚔️': '#ff4444',
            '🛡️': '#4444ff',
            '💥': '#ff8800',
            '⚡': '#ffff00',
            '💨': '#88ffff',
            '🗡️': '#ff4444',
            '✨': '#ff88ff',
            '💚': '#44ff44',
            '🌑': '#8800ff',
            '👻': '#aa00aa',
            '💀': '#440044'
        };
        const particleColor = skillColors[skill.icon] || '#ffffff';
        this.createParticles(this.player.x, this.player.y, particleColor, 20);

        // Skill effects
        if (skill.damage) {
            const nearestMob = this.findNearestMob();
            if (nearestMob) {
                const distance = this.getDistance(this.player, nearestMob);
                if (distance < 300) {
                    this.damageEnemy(nearestMob, skill.damage + this.player.damage);
                    this.createParticles(nearestMob.x, nearestMob.y, particleColor, 15);

                    if (skill.lifesteal) {
                        this.player.hp = Math.min(
                            this.player.maxHP,
                            this.player.hp + skill.damage * skill.lifesteal
                        );
                        this.createParticles(this.player.x, this.player.y, '#ff4444', 10);
                    }
                }
            }
        }

        if (skill.heal) {
            this.player.hp = Math.min(this.player.maxHP, this.player.hp + skill.heal);
            this.createParticles(this.player.x, this.player.y, '#44ff44', 20);
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

        // Death particles
        this.createParticles(enemy.x, enemy.y, '#ff4444', 20);

        // XP
        this.player.xp += enemy.xp;
        if (this.player.xp >= this.player.xpToLevel) {
            this.levelUp();
        }

        // Drop
        const dropChance = Math.random();
        if (dropChance < 0.5) {
            let item;
            if (dropChance < 0.15) {
                // 15% chance for equipment (rare drops)
                const equipIndex = Math.floor(Math.random() * EQUIPMENT_ITEMS.length);
                item = {...EQUIPMENT_ITEMS[equipIndex]};
            } else {
                // 35% chance for regular items
                const itemIndex = Math.floor(Math.random() * ITEMS.length);
                item = {...ITEMS[itemIndex]};
            }

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

    createParticles(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 4;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed - 2;
            const size = 2 + Math.random() * 4;
            const lifetime = 30 + Math.random() * 20;

            this.particles.push(new Particle(x, y, color, size, vx, vy, lifetime));
        }
    }

    levelUp() {
        this.player.level++;
        this.player.xp = 0;
        this.player.xpToLevel = Math.floor(this.player.xpToLevel * 1.5);

        this.player.baseDamage += 3;
        this.player.baseDefense += 2;

        // Level up particles
        this.createParticles(this.player.x, this.player.y, '#ffd700', 50);

        // Update stats (this will recalculate with equipment bonuses)
        this.updatePlayerStats();

        this.player.hp = this.player.maxHP;
        this.player.mp = this.player.maxMP;

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
                this.createParticles(this.player.x, this.player.y, '#ff4444', 10);
            }
            if (item.mana) {
                this.player.mp = Math.min(this.player.maxMP, this.player.mp + item.mana);
                this.createParticles(this.player.x, this.player.y, '#4444ff', 10);
            }

            this.inventory[slot] = null;
            this.updateInventory();
            this.updateHUD();
        } else if (item.slot) {
            // Equipment item - equip it
            this.equipItem(item, slot);
        }
    }

    updateInventory() {
        this.inventory.forEach((item, i) => {
            const slot = document.getElementById(`slot${i}`);
            if (item) {
                slot.innerHTML = `${item.icon}`;
                slot.classList.add('has-item');
                slot.title = item.name;

                // Color code by rarity for equipment
                if (item.rarity) {
                    slot.style.borderColor = RARITY_COLORS[item.rarity];
                } else {
                    slot.style.borderColor = '';
                }
            } else {
                slot.innerHTML = '';
                slot.classList.remove('has-item');
                slot.style.borderColor = '';
                slot.title = '';
            }
        });
    }

    update() {
        if (!this.player) return;

        // Update environment
        this.environment.update();

        // Update particles
        this.particles = this.particles.filter(p => p.update());

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
        // Draw environment (replaces plain background)
        this.environment.draw(this.ctx, 0, 0);

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

        // Draw particles
        this.particles.forEach(particle => {
            particle.draw(this.ctx);
        });
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
