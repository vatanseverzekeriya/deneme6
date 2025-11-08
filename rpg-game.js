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

// Item Rarity System
const RARITY = {
    common: { name: 'Sıradan', color: '#9ca3af', chance: 0.50, statMultiplier: 1.0 },
    uncommon: { name: 'Nadir', color: '#22c55e', chance: 0.30, statMultiplier: 1.3 },
    rare: { name: 'Ender', color: '#3b82f6', chance: 0.12, statMultiplier: 1.6 },
    epic: { name: 'Epik', color: '#a855f7', chance: 0.06, statMultiplier: 2.0 },
    legendary: { name: 'Efsanevi', color: '#f59e0b', chance: 0.015, statMultiplier: 2.5 },
    mythic: { name: 'Mitolojik', color: '#ef4444', chance: 0.005, statMultiplier: 3.0 }
};

// Items with enhanced properties
const ITEMS = [
    { name: 'Can İksiri', icon: '❤️', type: 'potion', heal: 50 },
    { name: 'Mana İksiri', icon: '💙', type: 'potion', mana: 50 },
    { name: 'Büyük Can İksiri', icon: '💖', type: 'potion', heal: 150 },
    { name: 'Altın', icon: '💰', type: 'gold', value: 10 },

    // Weapons
    { name: 'Kılıç', icon: '⚔️', type: 'weapon', slot: 'weapon', damage: 5, reqLevel: 1 },
    { name: 'Balta', icon: '🪓', type: 'weapon', slot: 'weapon', damage: 8, reqLevel: 3 },
    { name: 'Mızrak', icon: '🔱', type: 'weapon', slot: 'weapon', damage: 12, reqLevel: 5 },
    { name: 'Büyülü Asa', icon: '🔮', type: 'weapon', slot: 'weapon', damage: 10, int: 5, reqLevel: 4 },

    // Armor
    { name: 'Deri Zırh', icon: '🛡️', type: 'armor', slot: 'armor', defense: 5, reqLevel: 1 },
    { name: 'Zincir Zırh', icon: '⚔️', type: 'armor', slot: 'armor', defense: 8, reqLevel: 3 },
    { name: 'Plaka Zırh', icon: '🛡️', type: 'armor', slot: 'armor', defense: 15, vit: 5, reqLevel: 6 },

    // Helmets
    { name: 'Deri Başlık', icon: '🎩', type: 'helmet', slot: 'helmet', defense: 3, reqLevel: 2 },
    { name: 'Zırh Miğfer', icon: '⛑️', type: 'helmet', slot: 'helmet', defense: 7, str: 3, reqLevel: 5 },

    // Gloves
    { name: 'Eldiven', icon: '🧤', type: 'gloves', slot: 'gloves', defense: 2, dex: 2, reqLevel: 2 },
    { name: 'Zırh Eldiven', icon: '🥊', type: 'gloves', slot: 'gloves', defense: 5, str: 4, reqLevel: 5 },

    // Boots
    { name: 'Çizme', icon: '👢', type: 'boots', slot: 'boots', defense: 2, dex: 3, reqLevel: 2 },
    { name: 'Ağır Çizme', icon: '🥾', type: 'boots', slot: 'boots', defense: 6, vit: 4, reqLevel: 5 },

    // Accessories
    { name: 'Kolye', icon: '📿', type: 'necklace', slot: 'necklace', int: 5, reqLevel: 3 },
    { name: 'Küpe', icon: '💍', type: 'earring', slot: 'earring', dex: 4, reqLevel: 3 },
    { name: 'Yüzük', icon: '💎', type: 'ring', slot: 'ring', str: 3, reqLevel: 2 }
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
        this.inventory = Array(30).fill(null); // Expanded to 30 slots

        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        this.saveSlot = 1;
        this.autoSaveInterval = null;

        this.setupControls();
        this.setupUI();
    }

    setupUI() {
        // Create inventory UI
        this.createInventoryUI();
        // Create equipment UI
        this.createEquipmentUI();
        // Create stat distribution UI
        this.createStatUI();
        // Create menu buttons
        this.createMenuButtons();
    }

    createMenuButtons() {
        const menuDiv = document.getElementById('menuButtons');
        if (!menuDiv) return;

        menuDiv.innerHTML = `
            <button class="menu-btn" onclick="game.toggleInventory()">💼</button>
            <button class="menu-btn" onclick="game.toggleEquipment()">⚔️</button>
            <button class="menu-btn" onclick="game.toggleStats()">📊</button>
            <button class="menu-btn" onclick="game.saveGame()">💾</button>
        `;
    }

    createInventoryUI() {
        let invPanel = document.getElementById('inventoryPanel');
        if (!invPanel) {
            invPanel = document.createElement('div');
            invPanel.id = 'inventoryPanel';
            invPanel.className = 'game-panel hidden';
            invPanel.innerHTML = `
                <div class="panel-header">
                    <h3>💼 ENVANTER (30 Slot)</h3>
                    <button onclick="game.toggleInventory()">✕</button>
                </div>
                <div class="panel-content">
                    <div id="inventoryGrid" class="inventory-grid"></div>
                </div>
            `;
            document.body.appendChild(invPanel);
        }

        const grid = document.getElementById('inventoryGrid');
        grid.innerHTML = '';
        for (let i = 0; i < 30; i++) {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';
            slot.id = `invSlot${i}`;
            slot.onclick = () => this.handleInventoryClick(i);
            grid.appendChild(slot);
        }
    }

    createEquipmentUI() {
        let eqPanel = document.getElementById('equipmentPanel');
        if (!eqPanel) {
            eqPanel = document.createElement('div');
            eqPanel.id = 'equipmentPanel';
            eqPanel.className = 'game-panel hidden';
            eqPanel.innerHTML = `
                <div class="panel-header">
                    <h3>⚔️ EKİPMAN</h3>
                    <button onclick="game.toggleEquipment()">✕</button>
                </div>
                <div class="panel-content">
                    <div class="equipment-grid">
                        <div class="eq-slot" id="eqWeapon" onclick="game.handleEquipmentClick('weapon')">
                            <div class="eq-label">Silah</div>
                        </div>
                        <div class="eq-slot" id="eqHelmet" onclick="game.handleEquipmentClick('helmet')">
                            <div class="eq-label">Başlık</div>
                        </div>
                        <div class="eq-slot" id="eqArmor" onclick="game.handleEquipmentClick('armor')">
                            <div class="eq-label">Zırh</div>
                        </div>
                        <div class="eq-slot" id="eqGloves" onclick="game.handleEquipmentClick('gloves')">
                            <div class="eq-label">Eldiven</div>
                        </div>
                        <div class="eq-slot" id="eqBoots" onclick="game.handleEquipmentClick('boots')">
                            <div class="eq-label">Ayakkabı</div>
                        </div>
                        <div class="eq-slot" id="eqNecklace" onclick="game.handleEquipmentClick('necklace')">
                            <div class="eq-label">Kolye</div>
                        </div>
                        <div class="eq-slot" id="eqEarring" onclick="game.handleEquipmentClick('earring')">
                            <div class="eq-label">Küpe</div>
                        </div>
                        <div class="eq-slot" id="eqRing" onclick="game.handleEquipmentClick('ring')">
                            <div class="eq-label">Yüzük</div>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(eqPanel);
        }
    }

    createStatUI() {
        let statPanel = document.getElementById('statPanel');
        if (!statPanel) {
            statPanel = document.createElement('div');
            statPanel.id = 'statPanel';
            statPanel.className = 'game-panel hidden';
            statPanel.innerHTML = `
                <div class="panel-header">
                    <h3>📊 İSTATİSTİKLER</h3>
                    <button onclick="game.toggleStats()">✕</button>
                </div>
                <div class="panel-content">
                    <div id="statContent"></div>
                </div>
            `;
            document.body.appendChild(statPanel);
        }
    }

    toggleInventory() {
        const panel = document.getElementById('inventoryPanel');
        panel.classList.toggle('hidden');
        if (!panel.classList.contains('hidden')) {
            this.updateInventoryUI();
        }
    }

    toggleEquipment() {
        const panel = document.getElementById('equipmentPanel');
        panel.classList.toggle('hidden');
        if (!panel.classList.contains('hidden')) {
            this.updateEquipmentUI();
        }
    }

    toggleStats() {
        const panel = document.getElementById('statPanel');
        panel.classList.toggle('hidden');
        if (!panel.classList.contains('hidden')) {
            this.updateStatUI();
        }
    }

    // Generate random rarity based on chances
    generateRarity() {
        const roll = Math.random();
        let cumulative = 0;

        for (const [key, data] of Object.entries(RARITY).reverse()) {
            cumulative += data.chance;
            if (roll <= cumulative) {
                return key;
            }
        }
        return 'common';
    }

    // Create item drop with rarity and enhancement
    createItemDrop(baseItem) {
        if (baseItem.type === 'potion' || baseItem.type === 'gold') {
            return {...baseItem};
        }

        const rarity = this.generateRarity();
        const rarityData = RARITY[rarity];
        const enhancement = Math.random() < 0.3 ? Math.floor(Math.random() * 6) : 0; // 30% chance for +0 to +5

        const item = {...baseItem};
        item.rarity = rarity;
        item.enhancement = enhancement;
        item.id = Date.now() + Math.random(); // Unique ID

        // Apply rarity multipliers
        if (item.damage) item.damage = Math.floor(item.damage * rarityData.statMultiplier);
        if (item.defense) item.defense = Math.floor(item.defense * rarityData.statMultiplier);
        if (item.str) item.str = Math.floor(item.str * rarityData.statMultiplier);
        if (item.int) item.int = Math.floor(item.int * rarityData.statMultiplier);
        if (item.dex) item.dex = Math.floor(item.dex * rarityData.statMultiplier);
        if (item.vit) item.vit = Math.floor(item.vit * rarityData.statMultiplier);

        // Apply enhancement bonuses (10% per level)
        if (enhancement > 0) {
            const enhMult = 1 + (enhancement * 0.1);
            if (item.damage) item.damage = Math.floor(item.damage * enhMult);
            if (item.defense) item.defense = Math.floor(item.defense * enhMult);
            if (item.str) item.str = Math.floor(item.str * enhMult);
            if (item.int) item.int = Math.floor(item.int * enhMult);
            if (item.dex) item.dex = Math.floor(item.dex * enhMult);
            if (item.vit) item.vit = Math.floor(item.vit * enhMult);
        }

        return item;
    }

    // Get item display name with enhancement
    getItemDisplayName(item) {
        if (!item) return '';
        let name = item.name;
        if (item.enhancement > 0) {
            name = `+${item.enhancement} ${name}`;
        }
        return name;
    }

    // Get item color based on rarity
    getItemColor(item) {
        if (!item || !item.rarity) return '#9ca3af';
        return RARITY[item.rarity].color;
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

            // Progression
            level: 1,
            xp: 0,
            xpToLevel: 100,
            statPoints: 0, // Points to distribute

            // Core Stats (NEW)
            str: 10, // Strength: +1 damage per point
            int: 10, // Intelligence: +0.5 damage, +5 MP per point
            dex: 10, // Dexterity: +0.3% crit chance per point
            vit: 10, // Vitality: +10 HP per point

            // Base stats from class
            baseHP: classData.baseHP,
            baseMP: classData.baseMP,
            baseDamage: classData.baseDamage,
            baseDefense: classData.baseDefense,

            // Current stats (calculated)
            hp: 0,
            maxHP: 0,
            mp: 0,
            maxMP: 0,
            damage: 0,
            defense: 0,

            // Equipment
            equipment: {
                weapon: null,
                helmet: null,
                armor: null,
                gloves: null,
                boots: null,
                necklace: null,
                earring: null,
                ring: null
            },

            speed: 3,
            skills: classData.skills.map(s => ({...s, cooldownRemaining: 0})),

            gold: 0,
            attackCooldown: 0
        };

        // Calculate initial stats
        this.recalculateStats();

        this.updateHUD();
        this.createSkillButtons();

        document.getElementById('charSelect').classList.add('hidden');
        document.getElementById('gameScreen').classList.add('active');

        this.spawnMobs();
        this.startAutoSave();
        this.gameLoop();
    }

    // Recalculate all derived stats from base stats + equipment
    recalculateStats() {
        if (!this.player) return;

        const p = this.player;

        // Calculate max HP: baseHP + (vit * 10) + equipment bonuses
        p.maxHP = p.baseHP + (p.vit * 10);

        // Calculate max MP: baseMP + (int * 5) + equipment bonuses
        p.maxMP = p.baseMP + (p.int * 5);

        // Calculate damage: baseDamage + str + (int * 0.5) + equipment bonuses
        p.damage = p.baseDamage + p.str + Math.floor(p.int * 0.5);

        // Calculate defense: baseDefense + equipment bonuses
        p.defense = p.baseDefense;

        // Add equipment bonuses
        for (const slot in p.equipment) {
            const item = p.equipment[slot];
            if (item) {
                if (item.damage) p.damage += item.damage;
                if (item.defense) p.defense += item.defense;
                if (item.str) p.str += item.str;
                if (item.int) p.int += item.int;
                if (item.dex) p.dex += item.dex;
                if (item.vit) {
                    p.maxHP += item.vit * 10;
                }
            }
        }

        // Ensure HP/MP don't exceed max
        if (p.hp > p.maxHP) p.hp = p.maxHP;
        if (p.mp > p.maxMP) p.mp = p.maxMP;

        // If this is initial setup, set to full
        if (p.hp === 0) p.hp = p.maxHP;
        if (p.mp === 0) p.mp = p.maxMP;
    }

    // Handle inventory click
    handleInventoryClick(slot) {
        const item = this.inventory[slot];
        if (!item) return;

        if (item.type === 'potion') {
            this.useItem(slot);
        } else if (item.type === 'gold') {
            this.player.gold += item.value || 10;
            this.inventory[slot] = null;
            this.updateInventoryUI();
            this.showNotification(`+${item.value || 10} Altın!`);
        } else if (item.slot) {
            // It's equipment, try to equip it
            this.equipItem(slot);
        }
    }

    // Equip item from inventory
    equipItem(invSlot) {
        const item = this.inventory[invSlot];
        if (!item || !item.slot) return;

        // Check level requirement
        if (item.reqLevel && this.player.level < item.reqLevel) {
            this.showNotification(`Seviye ${item.reqLevel} gerekli!`);
            return;
        }

        // Unequip current item in that slot if any
        const currentItem = this.player.equipment[item.slot];
        if (currentItem) {
            // Find empty inventory slot
            for (let i = 0; i < this.inventory.length; i++) {
                if (!this.inventory[i]) {
                    this.inventory[i] = currentItem;
                    break;
                }
            }
        }

        // Equip new item
        this.player.equipment[item.slot] = item;
        this.inventory[invSlot] = null;

        this.recalculateStats();
        this.updateInventoryUI();
        this.updateEquipmentUI();
        this.updateHUD();
        this.showNotification(`✅ ${this.getItemDisplayName(item)} kuşanıldı!`);
    }

    // Handle equipment slot click (unequip)
    handleEquipmentClick(slot) {
        const item = this.player.equipment[slot];
        if (!item) return;

        // Find empty inventory slot
        for (let i = 0; i < this.inventory.length; i++) {
            if (!this.inventory[i]) {
                this.inventory[i] = item;
                this.player.equipment[slot] = null;
                this.recalculateStats();
                this.updateInventoryUI();
                this.updateEquipmentUI();
                this.updateHUD();
                this.showNotification(`${this.getItemDisplayName(item)} çıkarıldı!`);
                return;
            }
        }

        this.showNotification('Envanter dolu!');
    }

    // Update inventory UI
    updateInventoryUI() {
        for (let i = 0; i < 30; i++) {
            const slotDiv = document.getElementById(`invSlot${i}`);
            if (!slotDiv) continue;

            const item = this.inventory[i];
            if (item) {
                const color = this.getItemColor(item);
                const displayName = this.getItemDisplayName(item);
                slotDiv.innerHTML = `
                    <div class="item-icon">${item.icon}</div>
                    <div class="item-name" style="color: ${color}">${displayName}</div>
                `;
                slotDiv.style.borderColor = color;
                slotDiv.classList.add('has-item');
            } else {
                slotDiv.innerHTML = '';
                slotDiv.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                slotDiv.classList.remove('has-item');
            }
        }
    }

    // Update equipment UI
    updateEquipmentUI() {
        for (const slot in this.player.equipment) {
            const slotDiv = document.getElementById(`eq${slot.charAt(0).toUpperCase() + slot.slice(1)}`);
            if (!slotDiv) continue;

            const item = this.player.equipment[slot];
            const label = slotDiv.querySelector('.eq-label');

            if (item) {
                const color = this.getItemColor(item);
                const displayName = this.getItemDisplayName(item);
                slotDiv.querySelector('.item-icon')?.remove();
                slotDiv.querySelector('.item-name')?.remove();

                const iconDiv = document.createElement('div');
                iconDiv.className = 'item-icon';
                iconDiv.textContent = item.icon;
                slotDiv.appendChild(iconDiv);

                const nameDiv = document.createElement('div');
                nameDiv.className = 'item-name';
                nameDiv.style.color = color;
                nameDiv.textContent = displayName;
                slotDiv.appendChild(nameDiv);

                slotDiv.style.borderColor = color;
                slotDiv.classList.add('has-item');
            } else {
                slotDiv.querySelector('.item-icon')?.remove();
                slotDiv.querySelector('.item-name')?.remove();
                slotDiv.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                slotDiv.classList.remove('has-item');
            }
        }
    }

    // Update stat UI
    updateStatUI() {
        const content = document.getElementById('statContent');
        if (!content || !this.player) return;

        content.innerHTML = `
            <div class="stat-section">
                <h4>Temel İstatistikler</h4>
                <div class="stat-row">
                    <span>Güç (STR):</span>
                    <span>${this.player.str}</span>
                    ${this.player.statPoints > 0 ? '<button onclick="game.addStat(\'str\')">+</button>' : ''}
                </div>
                <div class="stat-row">
                    <span>Zeka (INT):</span>
                    <span>${this.player.int}</span>
                    ${this.player.statPoints > 0 ? '<button onclick="game.addStat(\'int\')">+</button>' : ''}
                </div>
                <div class="stat-row">
                    <span>Çeviklik (DEX):</span>
                    <span>${this.player.dex}</span>
                    ${this.player.statPoints > 0 ? '<button onclick="game.addStat(\'dex\')">+</button>' : ''}
                </div>
                <div class="stat-row">
                    <span>Dayanıklılık (VIT):</span>
                    <span>${this.player.vit}</span>
                    ${this.player.statPoints > 0 ? '<button onclick="game.addStat(\'vit\')">+</button>' : ''}
                </div>
                ${this.player.statPoints > 0 ? `<p class="stat-points">Kalan Puan: ${this.player.statPoints}</p>` : ''}
            </div>
            <div class="stat-section">
                <h4>Hesaplanmış İstatistikler</h4>
                <div class="stat-row"><span>HP:</span><span>${this.player.maxHP}</span></div>
                <div class="stat-row"><span>MP:</span><span>${this.player.maxMP}</span></div>
                <div class="stat-row"><span>Hasar:</span><span>${this.player.damage}</span></div>
                <div class="stat-row"><span>Savunma:</span><span>${this.player.defense}</span></div>
                <div class="stat-row"><span>Altın:</span><span>${this.player.gold} 💰</span></div>
            </div>
        `;
    }

    // Add stat point
    addStat(stat) {
        if (this.player.statPoints <= 0) return;

        this.player[stat]++;
        this.player.statPoints--;

        this.recalculateStats();
        this.updateStatUI();
        this.updateHUD();
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

        // Gold
        this.player.gold += enemy.gold;

        if (this.player.xp >= this.player.xpToLevel) {
            this.levelUp();
        }

        // Drop
        if (Math.random() < 0.5) { // 50% drop chance
            const baseItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
            const item = this.createItemDrop(baseItem);
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

        // Give stat points (5 points per level)
        this.player.statPoints += 5;

        // Small base stat increases
        this.player.baseHP += 10;
        this.player.baseMP += 5;
        this.player.baseDamage += 1;
        this.player.baseDefense += 1;

        // Recalculate and heal to full
        this.recalculateStats();
        this.player.hp = this.player.maxHP;
        this.player.mp = this.player.maxMP;

        this.showNotification(`🎉 LEVEL ${this.player.level}! +5 Stat Puanı!`);
        this.updateHUD();

        // Auto-open stats panel to show stat points
        if (this.player.statPoints > 0) {
            document.getElementById('statPanel').classList.remove('hidden');
            this.updateStatUI();
        }
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
                const displayName = this.getItemDisplayName(drop);
                const rarityText = drop.rarity ? RARITY[drop.rarity].name : '';
                this.showNotification(`${rarityText} ${displayName} ${drop.icon}`);
                return;
            }
        }

        // Inventory full
        this.showNotification('⚠️ Envanter dolu!');
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
        // Update quick slots (first 5 items)
        for (let i = 0; i < 5; i++) {
            const slot = document.getElementById(`slot${i}`);
            if (!slot) continue;

            const item = this.inventory[i];
            if (item) {
                slot.innerHTML = `${item.icon}`;
                const color = this.getItemColor(item);
                slot.style.borderColor = color;
                slot.classList.add('has-item');
            } else {
                slot.innerHTML = '';
                slot.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                slot.classList.remove('has-item');
            }
        }
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
        // Stop auto-save
        this.stopAutoSave();

        const choice = confirm('😵 Öldün!\n\nSeviye: ' + this.player.level + '\nAltın: ' + this.player.gold + '\n\nKayıtlı oyunu yüklemek ister misin?');
        if (choice) {
            this.loadGame();
        } else {
            localStorage.removeItem('rpg_save_' + this.saveSlot);
            window.location.reload();
        }
    }

    // Save/Load System
    saveGame() {
        if (!this.player) {
            this.showNotification('❌ Oyun başlatılmamış!');
            return;
        }

        const saveData = {
            version: '2.0',
            timestamp: Date.now(),
            player: {
                // Character
                class: this.player.class,
                name: this.player.name,
                icon: this.player.icon,
                x: this.player.x,
                y: this.player.y,

                // Progression
                level: this.player.level,
                xp: this.player.xp,
                xpToLevel: this.player.xpToLevel,
                statPoints: this.player.statPoints,

                // Stats
                str: this.player.str,
                int: this.player.int,
                dex: this.player.dex,
                vit: this.player.vit,

                baseHP: this.player.baseHP,
                baseMP: this.player.baseMP,
                baseDamage: this.player.baseDamage,
                baseDefense: this.player.baseDefense,

                hp: this.player.hp,
                maxHP: this.player.maxHP,
                mp: this.player.mp,
                maxMP: this.player.maxMP,

                // Equipment
                equipment: this.player.equipment,

                // Inventory
                gold: this.player.gold,

                // Skills
                skills: this.player.skills
            },
            inventory: this.inventory
        };

        try {
            localStorage.setItem('rpg_save_' + this.saveSlot, JSON.stringify(saveData));
            this.showNotification('💾 Oyun kaydedildi!');
        } catch (e) {
            this.showNotification('❌ Kayıt hatası!');
            console.error('Save error:', e);
        }
    }

    loadGame(slot = 1) {
        this.saveSlot = slot;
        const saved = localStorage.getItem('rpg_save_' + slot);

        if (!saved) {
            this.showNotification('❌ Kayıt bulunamadı!');
            return false;
        }

        try {
            const data = JSON.parse(saved);

            // Hide char select, show game
            document.getElementById('charSelect').classList.add('hidden');
            document.getElementById('gameScreen').classList.add('active');

            // Restore player
            const classData = CLASSES[data.player.class];
            this.player = {
                ...data.player,
                size: 40,
                speed: 3,
                attackCooldown: 0
            };

            // Ensure equipment object exists
            if (!this.player.equipment) {
                this.player.equipment = {
                    weapon: null,
                    helmet: null,
                    armor: null,
                    gloves: null,
                    boots: null,
                    necklace: null,
                    earring: null,
                    ring: null
                };
            }

            // Restore inventory
            this.inventory = data.inventory || Array(30).fill(null);

            // Recalculate stats
            this.recalculateStats();

            this.updateHUD();
            this.createSkillButtons();
            this.spawnMobs();
            this.startAutoSave();

            if (!this.gameRunning) {
                this.gameRunning = true;
                this.gameLoop();
            }

            this.showNotification('✅ Oyun yüklendi!');
            return true;
        } catch (e) {
            this.showNotification('❌ Kayıt bozuk!');
            console.error('Load error:', e);
            return false;
        }
    }

    startAutoSave() {
        // Auto-save every 60 seconds
        this.stopAutoSave();
        this.autoSaveInterval = setInterval(() => {
            if (this.player) {
                this.saveGame();
            }
        }, 60000);
    }

    stopAutoSave() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
        }
    }

    // Check for saved game on start
    checkSavedGame() {
        const saved = localStorage.getItem('rpg_save_1');
        if (saved) {
            const loadBtn = document.createElement('button');
            loadBtn.className = 'load-game-btn';
            loadBtn.textContent = '💾 Kayıtlı Oyunu Yükle';
            loadBtn.onclick = () => {
                this.loadGame(1);
                loadBtn.remove();
            };
            document.getElementById('charSelect').appendChild(loadBtn);
        }
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game
const game = new Game();

// Check for saved game
window.addEventListener('load', () => {
    game.checkSavedGame();
});

function selectCharacter(className) {
    game.selectCharacter(className);
}
