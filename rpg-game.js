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
    { name: 'Kılıç', icon: '⚔️', type: 'weapon', damage: 5, slot: 'weapon', rarity: 'normal' },
    { name: 'Zırh', icon: '🛡️', type: 'armor', defense: 5, slot: 'chest', rarity: 'normal' }
];

// Equipment rarities with upgrade chances
const RARITIES = {
    normal: { color: '#ffffff', name: 'Normal', upgradeCost: 100, upgradeChance: 0.7 },
    rare: { color: '#4444ff', name: 'Nadir', upgradeCost: 250, upgradeChance: 0.5 },
    epic: { color: '#9933ff', name: 'Efsanevi', upgradeCost: 500, upgradeChance: 0.3 }
};

// Equipment types
const EQUIPMENT_TYPES = [
    { name: 'Demir Kılıç', icon: '⚔️', type: 'weapon', slot: 'weapon', damage: 5, rarity: 'normal', price: 50 },
    { name: 'Çelik Kılıç', icon: '⚔️', type: 'weapon', slot: 'weapon', damage: 10, rarity: 'rare', price: 150 },
    { name: 'Deri Zırh', icon: '🛡️', type: 'armor', slot: 'chest', defense: 5, rarity: 'normal', price: 50 },
    { name: 'Çelik Zırh', icon: '🛡️', type: 'armor', slot: 'chest', defense: 10, rarity: 'rare', price: 150 },
    { name: 'Demir Başlık', icon: '⛑️', type: 'armor', slot: 'head', defense: 3, hp: 20, rarity: 'normal', price: 40 },
    { name: 'Deri Eldivenler', icon: '🧤', type: 'armor', slot: 'gloves', defense: 2, damage: 2, rarity: 'normal', price: 30 },
    { name: 'Savaş Botları', icon: '👢', type: 'armor', slot: 'boots', defense: 2, speed: 0.5, rarity: 'normal', price: 30 }
];

// Shop items
const SHOP_ITEMS = [
    { name: 'Can İksiri', icon: '❤️', type: 'potion', heal: 50, price: 20 },
    { name: 'Mana İksiri', icon: '💙', type: 'potion', mana: 50, price: 15 },
    { name: 'Büyük Can İksiri', icon: '💖', type: 'potion', heal: 100, price: 50 },
    { name: 'Büyük Mana İksiri', icon: '💙', type: 'potion', mana: 100, price: 40 },
    ...EQUIPMENT_TYPES
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
        this.inventory = Array(20).fill(null); // Increased from 5 to 20
        this.equipment = {
            weapon: null,
            head: null,
            chest: null,
            gloves: null,
            boots: null
        };

        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        this.shopOpen = false;
        this.equipmentPanelOpen = false;

        this.setupControls();
        this.setupAutoSave();
    }

    setupAutoSave() {
        // Auto-save every 30 seconds
        setInterval(() => {
            if (this.player) {
                this.saveGame();
            }
        }, 30000);
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
            attackSpeed: 1000, // Base attack speed in ms
            critChance: 0.1,
            dodgeChance: 0.05,
            lastAutoAttack: 0
        };

        this.updateHUD();
        this.createSkillButtons();

        document.getElementById('charSelect').classList.add('hidden');
        document.getElementById('gameScreen').classList.add('active');

        this.spawnMobs();
        this.gameLoop();
    }

    // Save/Load System
    saveGame(slot = 'auto') {
        if (!this.player) return;

        const saveData = {
            timestamp: Date.now(),
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
                speed: this.player.speed,
                gold: this.player.gold,
                attackSpeed: this.player.attackSpeed,
                critChance: this.player.critChance,
                dodgeChance: this.player.dodgeChance
            },
            inventory: this.inventory,
            equipment: this.equipment
        };

        localStorage.setItem(`rpg_save_${slot}`, JSON.stringify(saveData));

        if (slot === 'auto') {
            this.showNotification('💾 Oyun otomatik kaydedildi');
        } else {
            this.showNotification(`💾 Slot ${slot}'a kaydedildi`);
        }
    }

    loadGame(slot = 'auto') {
        const saveData = localStorage.getItem(`rpg_save_${slot}`);
        if (!saveData) {
            this.showNotification('❌ Kayıt bulunamadı');
            return false;
        }

        try {
            const data = JSON.parse(saveData);

            // Load character
            this.selectCharacter(data.player.class);

            // Restore player stats
            Object.assign(this.player, data.player);

            // Restore inventory and equipment
            this.inventory = data.inventory || Array(20).fill(null);
            this.equipment = data.equipment || { weapon: null, head: null, chest: null, gloves: null, boots: null };

            this.updateHUD();
            this.updateInventory();
            this.updateEquipmentDisplay();
            this.recalculateStats();

            this.showNotification('✅ Oyun yüklendi');
            return true;
        } catch (e) {
            this.showNotification('❌ Yükleme hatası');
            console.error(e);
            return false;
        }
    }

    deleteSave(slot) {
        localStorage.removeItem(`rpg_save_${slot}`);
        this.showNotification(`🗑️ Slot ${slot} silindi`);
    }

    getSaveSlots() {
        const slots = [];
        for (let i = 1; i <= 3; i++) {
            const saveData = localStorage.getItem(`rpg_save_${i}`);
            if (saveData) {
                const data = JSON.parse(saveData);
                slots.push({
                    slot: i,
                    ...data
                });
            } else {
                slots.push({ slot: i, empty: true });
            }
        }
        return slots;
    }

    // Equipment System
    equipItem(item, fromInventorySlot) {
        if (!item || !item.slot) return;

        const slot = item.slot;

        // Unequip current item in that slot
        if (this.equipment[slot]) {
            this.addToInventory(this.equipment[slot]);
        }

        // Equip new item
        this.equipment[slot] = { ...item, upgrade: item.upgrade || 0 };

        // Remove from inventory
        if (fromInventorySlot !== undefined) {
            this.inventory[fromInventorySlot] = null;
        }

        this.recalculateStats();
        this.updateEquipmentDisplay();
        this.updateInventory();
        this.showNotification(`✅ ${item.name} giyildi`);
    }

    unequipItem(slot) {
        if (!this.equipment[slot]) return;

        const item = this.equipment[slot];

        // Add to inventory
        if (this.addToInventory(item)) {
            this.equipment[slot] = null;
            this.recalculateStats();
            this.updateEquipmentDisplay();
            this.showNotification(`✅ ${item.name} çıkarıldı`);
        } else {
            this.showNotification('❌ Envanter dolu');
        }
    }

    upgradeEquipment(slot) {
        const item = this.equipment[slot];
        if (!item) return;

        const upgrade = item.upgrade || 0;
        const rarity = RARITIES[item.rarity || 'normal'];
        const cost = rarity.upgradeCost * (upgrade + 1);

        if (this.player.gold < cost) {
            this.showNotification('❌ Yetersiz altın');
            return;
        }

        this.player.gold -= cost;

        if (Math.random() < rarity.upgradeChance) {
            item.upgrade = upgrade + 1;
            this.showNotification(`✅ ${item.name} +${item.upgrade} oldu!`);
        } else {
            this.showNotification('❌ Geliştirme başarısız');
        }

        this.recalculateStats();
        this.updateEquipmentDisplay();
        this.updateHUD();
    }

    recalculateStats() {
        if (!this.player) return;

        // Reset to base stats
        const classData = CLASSES[this.player.class];
        const levelBonus = this.player.level - 1;

        this.player.damage = classData.baseDamage + (levelBonus * 3);
        this.player.defense = classData.baseDefense + (levelBonus * 2);
        this.player.speed = 3;
        this.player.critChance = 0.1;
        this.player.dodgeChance = 0.05;

        // Apply equipment bonuses
        Object.values(this.equipment).forEach(item => {
            if (!item) return;

            const upgrade = item.upgrade || 0;
            const multiplier = 1 + (upgrade * 0.1);

            if (item.damage) this.player.damage += Math.floor(item.damage * multiplier);
            if (item.defense) this.player.defense += Math.floor(item.defense * multiplier);
            if (item.hp) this.player.maxHP += Math.floor(item.hp * multiplier);
            if (item.mp) this.player.maxMP += Math.floor(item.mp * multiplier);
            if (item.speed) this.player.speed += item.speed;
        });

        this.player.hp = Math.min(this.player.hp, this.player.maxHP);
        this.player.mp = Math.min(this.player.mp, this.player.maxMP);

        this.updateHUD();
    }

    addToInventory(item) {
        for (let i = 0; i < this.inventory.length; i++) {
            if (!this.inventory[i]) {
                this.inventory[i] = { ...item };
                this.updateInventory();
                return true;
            }
        }
        return false;
    }

    sellItem(inventorySlot) {
        const item = this.inventory[inventorySlot];
        if (!item) return;

        const sellPrice = Math.floor((item.price || 10) * 0.5);
        this.player.gold += sellPrice;
        this.inventory[inventorySlot] = null;

        this.updateInventory();
        this.updateHUD();
        this.showNotification(`💰 ${item.name} satıldı (+${sellPrice} altın)`);
    }

    // Shop System
    openShop() {
        this.shopOpen = true;
        this.renderShop();
        document.getElementById('shopModal').style.display = 'flex';
    }

    closeShop() {
        this.shopOpen = false;
        document.getElementById('shopModal').style.display = 'none';
    }

    buyItem(itemIndex) {
        const item = SHOP_ITEMS[itemIndex];
        if (!item) return;

        if (this.player.gold < item.price) {
            this.showNotification('❌ Yetersiz altın');
            return;
        }

        if (this.addToInventory(item)) {
            this.player.gold -= item.price;
            this.updateHUD();
            this.showNotification(`✅ ${item.name} satın alındı`);
        } else {
            this.showNotification('❌ Envanter dolu');
        }
    }

    renderShop() {
        const shopContent = document.getElementById('shopContent');
        shopContent.innerHTML = '';

        SHOP_ITEMS.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'shop-item';
            const rarity = item.rarity ? RARITIES[item.rarity].name : '';
            itemDiv.innerHTML = `
                <div class="shop-item-icon">${item.icon}</div>
                <div class="shop-item-info">
                    <div class="shop-item-name">${item.name} ${rarity}</div>
                    <div class="shop-item-stats">
                        ${item.damage ? `⚔️ +${item.damage} ` : ''}
                        ${item.defense ? `🛡️ +${item.defense} ` : ''}
                        ${item.heal ? `❤️ +${item.heal} ` : ''}
                        ${item.mana ? `💙 +${item.mana} ` : ''}
                    </div>
                    <div class="shop-item-price">💰 ${item.price} altın</div>
                </div>
                <button onclick="game.buyItem(${index})" class="shop-buy-btn">Satın Al</button>
            `;
            shopContent.appendChild(itemDiv);
        });
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

    performAutoAttack(enemy) {
        let damage = this.player.damage;
        let isCrit = false;

        // Check for critical hit
        if (Math.random() < this.player.critChance) {
            damage = Math.floor(damage * 1.5);
            isCrit = true;
        }

        this.damageEnemy(enemy, damage, isCrit);
    }

    damageEnemy(enemy, damage, isCrit = false) {
        enemy.hp -= damage;
        this.showDamage(enemy.x, enemy.y, damage, isCrit ? '#ffff00' : '#ff4444', isCrit);

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

        // Drop items
        if (Math.random() < 0.4) {
            const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
            this.drops.push({
                ...item,
                x: enemy.x,
                y: enemy.y,
                size: 25
            });
        }

        // Drop equipment (lower chance)
        if (Math.random() < 0.15) {
            const equipment = EQUIPMENT_TYPES[Math.floor(Math.random() * EQUIPMENT_TYPES.length)];
            this.drops.push({
                ...equipment,
                x: enemy.x + 20,
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

    showDamage(x, y, damage, color = '#ff4444', isCrit = false) {
        const dmg = document.createElement('div');
        dmg.className = 'damage-number';
        dmg.textContent = typeof damage === 'number' ? '-' + damage : damage;
        dmg.style.left = x + 'px';
        dmg.style.top = y + 'px';
        dmg.style.color = color;

        if (isCrit) {
            dmg.style.fontSize = '32px';
            dmg.style.fontWeight = 'bold';
            dmg.textContent = 'KRİTİK! -' + damage;
        }

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

        // Handle gold directly
        if (drop.type === 'gold') {
            this.player.gold += drop.value || 10;
            this.updateHUD();
            this.showNotification(`+${drop.value || 10} Altın 💰`);
            return;
        }

        // Add to inventory
        if (this.addToInventory(drop)) {
            this.showNotification(`+1 ${drop.name} ${drop.icon}`);
        } else {
            this.showNotification('❌ Envanter dolu');
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
            if (!slot) return;

            if (item) {
                const upgrade = item.upgrade > 0 ? `+${item.upgrade}` : '';
                slot.innerHTML = `${item.icon}${upgrade}`;
                slot.classList.add('has-item');

                // Add click handler for equipping
                slot.onclick = () => {
                    if (item.type === 'weapon' || item.type === 'armor') {
                        this.equipItem(item, i);
                    } else if (item.type === 'potion') {
                        this.useItem(i);
                    }
                };

                // Add right-click handler for selling
                slot.oncontextmenu = (e) => {
                    e.preventDefault();
                    if (confirm(`${item.name}'i satmak istiyor musun?`)) {
                        this.sellItem(i);
                    }
                };
            } else {
                slot.innerHTML = '';
                slot.classList.remove('has-item');
                slot.onclick = null;
                slot.oncontextmenu = null;
            }
        });
    }

    updateEquipmentDisplay() {
        const slots = ['weapon', 'head', 'chest', 'gloves', 'boots'];

        slots.forEach(slot => {
            const slotEl = document.getElementById(`equip_${slot}`);
            if (!slotEl) return;

            const item = this.equipment[slot];

            if (item) {
                const upgrade = item.upgrade > 0 ? `+${item.upgrade}` : '';
                slotEl.innerHTML = `${item.icon}${upgrade}`;
                slotEl.classList.add('has-item');

                slotEl.onclick = () => this.unequipItem(slot);
                slotEl.ondblclick = () => this.upgradeEquipment(slot);
            } else {
                slotEl.innerHTML = '';
                slotEl.classList.remove('has-item');
                slotEl.onclick = null;
                slotEl.ondblclick = null;
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
        const nearestMob = this.findNearestMob();
        if (nearestMob) {
            const dist = this.getDistance(this.player, nearestMob);
            const attackRange = 200;

            if (dist < attackRange) {
                const now = Date.now();
                if (now - this.player.lastAutoAttack >= this.player.attackSpeed) {
                    this.performAutoAttack(nearestMob);
                    this.player.lastAutoAttack = now;
                }
            }
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
                        // Player can dodge
                        if (Math.random() < this.player.dodgeChance) {
                            this.showDamage(this.player.x, this.player.y - 40, 'KAÇTI', '#00ff00');
                        } else {
                            const damage = Math.max(1, mob.damage - this.player.defense);
                            this.player.hp -= damage;
                            this.showDamage(this.player.x, this.player.y - 40, damage);
                        }

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

        // Update gold display
        const goldEl = document.getElementById('goldAmount');
        if (goldEl) {
            goldEl.textContent = this.player.gold;
        }

        // Update stats display
        const statsEl = document.getElementById('statsDisplay');
        if (statsEl) {
            statsEl.innerHTML = `
                ⚔️ ${this.player.damage} |
                🛡️ ${this.player.defense} |
                ⚡ ${Math.floor(this.player.speed * 10) / 10}
            `;
        }
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
