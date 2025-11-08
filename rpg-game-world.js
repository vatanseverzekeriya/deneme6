// RPG Game - World Building Edition
// Integration with 5 unique maps, bosses, NPCs, and secret areas

// Load the map system (will be loaded via script tag)
// Assumes world-maps.js is already loaded

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

// Items
const ITEMS = [
    { name: 'Can İksiri', icon: '❤️', type: 'potion', heal: 50 },
    { name: 'Mana İksiri', icon: '💙', type: 'potion', mana: 50 },
    { name: 'Altın', icon: '💰', type: 'gold', value: 10 },
    { name: 'Kılıç', icon: '⚔️', type: 'weapon', damage: 5 },
    { name: 'Zırh', icon: '🛡️', type: 'armor', defense: 5 }
];

class WorldGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Game state
        this.player = null;
        this.mobs = [];
        this.bosses = [];
        this.npcs = [];
        this.projectiles = [];
        this.drops = [];
        this.inventory = Array(5).fill(null);

        // Camera
        this.camera = { x: 0, y: 0 };

        // Map system
        this.mapLoader = new TiledMapLoader(this);
        this.currentMapId = null;

        // Controls
        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        // NPC interaction
        this.nearbyNPC = null;
        this.showingDialogue = false;

        this.setupControls();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Map selection
    showMapSelector() {
        const maps = Object.values(WORLD_MAPS);
        let html = '<div class="map-selector"><h2>🗺️ Harita Seç</h2><div class="map-grid">';

        maps.forEach(map => {
            const locked = this.player && this.player.level < map.levelRange[0];
            const className = locked ? 'map-card locked' : 'map-card';

            html += `
                <div class="${className}" onclick="game.selectMap('${map.id}')">
                    <div class="map-name">${map.name}</div>
                    <div class="map-level">Level ${map.levelRange[0]}-${map.levelRange[1]}</div>
                    <div class="map-desc">${map.description}</div>
                    ${locked ? '<div class="locked-badge">🔒 Kilitli</div>' : ''}
                </div>
            `;
        });

        html += '</div></div>';

        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'mapSelectorOverlay';
        overlay.innerHTML = html;
        document.body.appendChild(overlay);
    }

    selectMap(mapId) {
        const mapData = WORLD_MAPS[mapId];

        // Check level requirement
        if (this.player && this.player.level < mapData.levelRange[0]) {
            alert(`Bu harita için en az ${mapData.levelRange[0]} seviye gerekli!`);
            return;
        }

        // Remove overlay
        const overlay = document.getElementById('mapSelectorOverlay');
        if (overlay) overlay.remove();

        // Load map
        this.currentMapId = mapId;
        this.mapLoader.loadMap(mapId);

        // Teleport player to spawn
        if (this.player) {
            const spawn = mapData.playerSpawn;
            this.player.x = spawn.x * mapData.tileSize;
            this.player.y = spawn.y * mapData.tileSize;
        }

        // Spawn initial mobs
        this.spawnMapMobs();

        this.showNotification(`🗺️ ${mapData.name} - Hoş geldin!`);
    }

    selectCharacter(className) {
        const classData = CLASSES[className];

        this.player = {
            class: className,
            name: classData.name,
            icon: classData.icon,
            x: 0,
            y: 0,
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
            quests: []
        };

        this.updateHUD();
        this.createSkillButtons();

        document.getElementById('charSelect').classList.add('hidden');
        document.getElementById('gameScreen').classList.add('active');

        // Show map selector
        this.showMapSelector();
    }

    spawnMapMobs() {
        const map = this.mapLoader.getCurrentMap();
        if (!map) return;

        const mobCount = 15 + Math.floor(this.player.level / 3);

        for (let i = 0; i < mobCount; i++) {
            this.spawnRandomMob(map);
        }
    }

    spawnRandomMob(map) {
        // Select mob type based on spawn chance
        let selectedMob = null;
        const rand = Math.random();
        let cumulative = 0;

        for (const mobType of map.mobs) {
            cumulative += mobType.spawnChance;
            if (rand <= cumulative) {
                selectedMob = mobType;
                break;
            }
        }

        if (!selectedMob) selectedMob = map.mobs[0];

        // Random spawn position
        const x = Math.random() * (map.width * map.tileSize);
        const y = Math.random() * (map.height * map.tileSize);

        // Check if walkable
        if (!this.mapLoader.isWalkable(x, y)) {
            return this.spawnRandomMob(map); // Try again
        }

        this.mobs.push({
            ...selectedMob,
            type: selectedMob.type,
            x, y,
            maxHP: selectedMob.hp,
            size: 35,
            targetCooldown: 0,
            poisoned: false,
            frozen: false
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

            // NPC interaction
            if (e.key.toLowerCase() === 'f') this.interactWithNPC();

            // Map selector
            if (e.key.toLowerCase() === 'm') this.showMapSelector();

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

    useSkill(index) {
        if (!this.player) return;

        const skill = this.player.skills[index];

        if (skill.cooldownRemaining > 0) return;
        if (this.player.mp < skill.mpCost) return;

        this.player.mp -= skill.mpCost;
        skill.cooldownRemaining = skill.cooldown;

        // Skill effects
        if (skill.damage) {
            const nearestEnemy = this.findNearestEnemy();
            if (nearestEnemy) {
                const distance = this.getDistance(this.player, nearestEnemy);
                if (distance < 300) {
                    this.damageEnemy(nearestEnemy, skill.damage + this.player.damage);

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

    findNearestEnemy() {
        let nearest = null;
        let minDist = Infinity;

        [...this.mobs, ...this.bosses].forEach(enemy => {
            const dist = this.getDistance(this.player, enemy);
            if (dist < minDist) {
                minDist = dist;
                nearest = enemy;
            }
        });

        return nearest;
    }

    getDistance(a, b) {
        return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }

    damageEnemy(enemy, damage) {
        const actualDamage = Math.max(1, damage - (enemy.defense || 0));
        enemy.hp -= actualDamage;
        this.showDamage(enemy.x, enemy.y, actualDamage);

        if (enemy.hp <= 0) {
            this.killEnemy(enemy);
        } else if (enemy.isBoss) {
            this.checkBossPhase(enemy);
        }
    }

    checkBossPhase(boss) {
        if (!boss.phases) return;

        const hpPercent = boss.hp / boss.maxHP;

        for (let i = boss.currentPhase || 0; i < boss.phases.length; i++) {
            const phase = boss.phases[i];
            if (hpPercent <= phase.hpThreshold) {
                boss.currentPhase = i + 1;
                this.showNotification(`⚠️ BOSS: ${phase.ability}!`);
                this.triggerBossAbility(boss, phase.ability);
                break;
            }
        }
    }

    triggerBossAbility(boss, ability) {
        // Boss ability logic
        if (ability.includes('Çağır') || ability.includes('Ordu')) {
            // Spawn minions
            for (let i = 0; i < 5; i++) {
                setTimeout(() => this.spawnRandomMob(this.mapLoader.getCurrentMap()), i * 500);
            }
        }
    }

    killEnemy(enemy) {
        // Remove from array
        if (enemy.isBoss) {
            const index = this.bosses.indexOf(enemy);
            if (index > -1) this.bosses.splice(index, 1);

            if (enemy.isMajorBoss) {
                this.showNotification(`🎉 MAJOR BOSS YENİLDİ: ${enemy.type}!`);
            } else {
                this.showNotification(`✨ MINI-BOSS YENİLDİ: ${enemy.type}!`);
            }
        } else {
            const index = this.mobs.indexOf(enemy);
            if (index > -1) this.mobs.splice(index, 1);
        }

        // XP
        this.player.xp += enemy.xp;
        if (this.player.xp >= this.player.xpToLevel) {
            this.levelUp();
        }

        // Gold
        this.player.gold += enemy.gold;

        // Drop loot
        if (enemy.drops) {
            // Boss drops
            enemy.drops.forEach(drop => {
                if (Math.random() < 0.5) { // 50% chance
                    this.drops.push({
                        ...drop,
                        x: enemy.x,
                        y: enemy.y,
                        size: 30
                    });
                }
            });
        } else {
            // Regular drops
            if (Math.random() < 0.4) {
                const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
                this.drops.push({
                    ...item,
                    x: enemy.x,
                    y: enemy.y,
                    size: 25
                });
            }
        }

        // Respawn regular mob
        if (!enemy.isBoss) {
            setTimeout(() => this.spawnRandomMob(this.mapLoader.getCurrentMap()), 5000);
        }

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

    interactWithNPC() {
        if (!this.nearbyNPC) return;

        const npc = this.nearbyNPC;

        if (npc.type === 'merchant') {
            this.showMerchant(npc);
        } else {
            this.showDialogue(npc);
        }
    }

    showDialogue(npc) {
        const dialogue = npc.dialogue[Math.floor(Math.random() * npc.dialogue.length)];
        this.showNotification(`💬 ${npc.name}: ${dialogue}`);
    }

    showMerchant(npc) {
        // Simple merchant interface
        alert(`🛒 ${npc.name}\n\nAltın: ${this.player.gold}\n\nAlışveriş menüsü yakında eklenecek!`);
    }

    showDamage(x, y, damage) {
        const dmg = document.createElement('div');
        dmg.className = 'damage-number';
        dmg.textContent = '-' + damage;

        // Convert world to screen coordinates
        const screenX = x - this.camera.x + this.canvas.width / 2;
        const screenY = y - this.camera.y + this.canvas.height / 2;

        dmg.style.left = screenX + 'px';
        dmg.style.top = screenY + 'px';
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
        }, 3000);
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
                return;
            }
        }

        this.showNotification('Envanter dolu!');
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
        if (!this.player || !this.currentMapId) return;

        const map = this.mapLoader.getCurrentMap();

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

            const newX = this.player.x + dx;
            const newY = this.player.y + dy;

            // Check collision with map
            if (this.mapLoader.isWalkable(newX, newY)) {
                this.player.x = newX;
                this.player.y = newY;
            }
        }

        // Update camera
        this.camera.x = this.player.x;
        this.camera.y = this.player.y;

        // Update mobs
        this.mobs.forEach(mob => this.updateMob(mob));
        this.bosses.forEach(boss => this.updateMob(boss));

        // Check NPC proximity
        this.nearbyNPC = null;
        this.npcs.forEach(npc => {
            if (this.getDistance(this.player, npc) < 60) {
                this.nearbyNPC = npc;
            }
        });

        // Update drops
        this.drops.forEach(drop => {
            if (this.getDistance(this.player, drop) < 50) {
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
            if (Math.random() < 0.05) this.updateHUD();
        }
    }

    updateMob(mob) {
        const dist = this.getDistance(this.player, mob);
        const aggroRange = mob.isBoss ? 600 : 400;

        if (dist < aggroRange) {
            const angle = Math.atan2(this.player.y - mob.y, this.player.x - mob.x);
            const newX = mob.x + Math.cos(angle) * mob.speed;
            const newY = mob.y + Math.sin(angle) * mob.speed;

            if (this.mapLoader.isWalkable(newX, newY)) {
                mob.x = newX;
                mob.y = newY;
            }

            // Attack player
            const attackRange = mob.isBoss ? 80 : 50;
            if (dist < attackRange) {
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
    }

    draw() {
        const map = this.mapLoader.getCurrentMap();

        if (!map) {
            this.ctx.fillStyle = '#1a1a2e';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            return;
        }

        // Clear
        this.ctx.fillStyle = map.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Camera offset
        const offsetX = this.canvas.width / 2 - this.camera.x;
        const offsetY = this.canvas.height / 2 - this.camera.y;

        // Draw tiles (visible area only)
        const startX = Math.max(0, Math.floor(-offsetX / map.tileSize) - 2);
        const startY = Math.max(0, Math.floor(-offsetY / map.tileSize) - 2);
        const endX = Math.min(map.width, startX + Math.ceil(this.canvas.width / map.tileSize) + 4);
        const endY = Math.min(map.height, startY + Math.ceil(this.canvas.height / map.tileSize) + 4);

        for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
                if (!map.tileMap || !map.tileMap[y]) continue;

                const tileName = map.tileMap[y][x];
                const tile = map.tiles[tileName];

                const screenX = x * map.tileSize + offsetX;
                const screenY = y * map.tileSize + offsetY;

                this.ctx.fillStyle = tile.color;
                this.ctx.fillRect(screenX, screenY, map.tileSize, map.tileSize);

                if (tile.pattern && tile.pattern.length === 1) {
                    this.ctx.font = (map.tileSize * 0.8) + 'px Arial';
                    this.ctx.textAlign = 'center';
                    this.ctx.textBaseline = 'middle';
                    this.ctx.fillText(tile.pattern, screenX + map.tileSize/2, screenY + map.tileSize/2);
                }
            }
        }

        // Draw grid
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        this.ctx.lineWidth = 1;
        for (let x = startX; x <= endX; x++) {
            const screenX = x * map.tileSize + offsetX;
            this.ctx.beginPath();
            this.ctx.moveTo(screenX, 0);
            this.ctx.lineTo(screenX, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = startY; y <= endY; y++) {
            const screenY = y * map.tileSize + offsetY;
            this.ctx.beginPath();
            this.ctx.moveTo(0, screenY);
            this.ctx.lineTo(this.canvas.width, screenY);
            this.ctx.stroke();
        }

        // Draw NPCs
        this.npcs.forEach(npc => {
            const screenX = npc.x + offsetX;
            const screenY = npc.y + offsetY;

            // Glow for nearby NPC
            if (npc === this.nearbyNPC) {
                this.ctx.shadowBlur = 20;
                this.ctx.shadowColor = '#ffd700';
            }

            this.ctx.font = npc.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(npc.icon, screenX, screenY);
            this.ctx.shadowBlur = 0;

            // Name
            this.ctx.font = '12px Arial';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(npc.name, screenX, screenY - 25);

            // Interaction hint
            if (npc === this.nearbyNPC) {
                this.ctx.fillStyle = '#ffd700';
                this.ctx.fillText('[ F ]', screenX, screenY + 25);
            }
        });

        // Draw drops
        this.drops.forEach(drop => {
            const screenX = drop.x + offsetX;
            const screenY = drop.y + offsetY;

            this.ctx.font = drop.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(drop.icon, screenX, screenY);
        });

        // Draw mobs
        this.mobs.forEach(mob => this.drawEntity(mob, offsetX, offsetY));
        this.bosses.forEach(boss => this.drawEntity(boss, offsetX, offsetY, true));

        // Draw player
        if (this.player) {
            const screenX = this.canvas.width / 2;
            const screenY = this.canvas.height / 2;

            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(screenX, screenY + this.player.size/2, this.player.size/2, this.player.size/4, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Player icon with glow
            this.ctx.font = this.player.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#ffd700';
            this.ctx.fillText(this.player.icon, screenX, screenY);
            this.ctx.shadowBlur = 0;
        }
    }

    drawEntity(entity, offsetX, offsetY, isBoss = false) {
        const screenX = entity.x + offsetX;
        const screenY = entity.y + offsetY;

        // Shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.ellipse(screenX, screenY + entity.size/2, entity.size/2, entity.size/4, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Entity icon
        this.ctx.font = entity.size + 'px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        if (isBoss) {
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = entity.isMajorBoss ? '#ff0000' : '#ff8800';
        }

        this.ctx.fillText(entity.icon, screenX, screenY);
        this.ctx.shadowBlur = 0;

        // HP bar
        const barWidth = isBoss ? 80 : 50;
        const barHeight = isBoss ? 8 : 5;
        const hpPercent = entity.hp / entity.maxHP;

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(screenX - barWidth/2, screenY - entity.size - 10, barWidth, barHeight);

        this.ctx.fillStyle = hpPercent > 0.5 ? '#4ade80' : hpPercent > 0.25 ? '#fbbf24' : '#ef4444';
        this.ctx.fillRect(screenX - barWidth/2, screenY - entity.size - 10, barWidth * hpPercent, barHeight);

        // Boss name
        if (isBoss) {
            this.ctx.font = 'bold 14px Arial';
            this.ctx.fillStyle = entity.isMajorBoss ? '#ff0000' : '#ff8800';
            this.ctx.fillText(entity.type, screenX, screenY - entity.size - 20);
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
const game = new WorldGame();

function selectCharacter(className) {
    game.selectCharacter(className);
    game.gameLoop();
}
