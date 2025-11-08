// Professional RPG Game Engine - Ancient Mystic Forest

// Character Classes (NO EMOJIS - will use professional sprites)
const CLASSES = {
    warrior: {
        name: 'Savaşçı',
        spritePrefix: 'warrior',
        baseHP: 150,
        baseMP: 50,
        baseDamage: 15,
        baseDefense: 10,
        skills: [
            { name: 'Güçlü Vuruş', damage: 30, mpCost: 15, cooldown: 3000, key: 'Q' },
            { name: 'Kalkan', defense: 20, mpCost: 20, cooldown: 5000, key: 'W' },
            { name: 'Savaş Çığlığı', damage: 50, mpCost: 30, cooldown: 8000, key: 'E' }
        ]
    },
    ninja: {
        name: 'Ninja',
        spritePrefix: 'ninja',
        baseHP: 100,
        baseMP: 80,
        baseDamage: 25,
        baseDefense: 5,
        skills: [
            { name: 'Hızlı Saldırı', damage: 20, mpCost: 10, cooldown: 2000, key: 'Q' },
            { name: 'Gölge Adımı', dodge: true, mpCost: 15, cooldown: 4000, key: 'W' },
            { name: 'Kritik Vuruş', damage: 60, mpCost: 25, cooldown: 6000, key: 'E' }
        ]
    },
    shaman: {
        name: 'Şaman',
        spritePrefix: 'shaman',
        baseHP: 120,
        baseMP: 120,
        baseDamage: 18,
        baseDefense: 7,
        skills: [
            { name: 'Işın', damage: 25, mpCost: 12, cooldown: 2500, key: 'Q' },
            { name: 'İyileştirme', heal: 40, mpCost: 20, cooldown: 5000, key: 'W' },
            { name: 'Yıldırım', damage: 45, mpCost: 28, cooldown: 7000, key: 'E' }
        ]
    },
    sura: {
        name: 'Sura',
        spritePrefix: 'sura',
        baseHP: 130,
        baseMP: 100,
        baseDamage: 20,
        baseDefense: 8,
        skills: [
            { name: 'Karanlık Kılıç', damage: 28, mpCost: 14, cooldown: 2500, key: 'Q' },
            { name: 'Ruh Emme', damage: 20, lifesteal: 0.5, mpCost: 18, cooldown: 4500, key: 'W' },
            { name: 'Kara Büyü', damage: 55, mpCost: 32, cooldown: 8000, key: 'E' }
        ]
    }
};

// Mob types (NO EMOJIS - will use professional sprites)
const MOB_TYPES = [
    { name: 'Kurt', spritePrefix: 'wolf', hp: 50, damage: 8, xp: 25, gold: 10, speed: 1.5 },
    { name: 'Goblin', spritePrefix: 'goblin', hp: 60, damage: 10, xp: 30, gold: 15, speed: 1.2 },
    { name: 'Ork', spritePrefix: 'orc', hp: 80, damage: 12, xp: 40, gold: 20, speed: 1.0 },
    { name: 'Troll', spritePrefix: 'troll', hp: 120, damage: 15, xp: 60, gold: 30, speed: 0.8 },
    { name: 'Ejderha', spritePrefix: 'dragon', hp: 200, damage: 25, xp: 100, gold: 50, speed: 0.6 }
];

// Items (simplified - will be rendered as icons)
const ITEMS = [
    { name: 'Can İksiri', type: 'potion', heal: 50, color: '#ff4444' },
    { name: 'Mana İksiri', type: 'potion', mana: 50, color: '#4444ff' },
    { name: 'Altın', type: 'gold', value: 10, color: '#ffd700' },
    { name: 'Kılıç', type: 'weapon', damage: 5, color: '#c0c0c0' },
    { name: 'Zırh', type: 'armor', defense: 5, color: '#8b7355' }
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

        // World map generation
        this.worldWidth = 2000;
        this.worldHeight = 2000;
        this.camera = { x: 0, y: 0 };
        this.generateWorld();

        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        this.lastFrameTime = Date.now();
        this.gameTime = 0;

        this.setupControls();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    generateWorld() {
        // Generate terrain tiles
        this.terrainMap = [];
        const tileSize = 64;
        const tilesX = Math.ceil(this.worldWidth / tileSize);
        const tilesY = Math.ceil(this.worldHeight / tileSize);

        for (let y = 0; y < tilesY; y++) {
            this.terrainMap[y] = [];
            for (let x = 0; x < tilesX; x++) {
                // Random terrain type
                const rand = Math.random();
                let type = 'grass';

                if (rand > 0.85) type = 'dirt';
                else if (rand > 0.75) type = 'stone';

                this.terrainMap[y][x] = {
                    type: type,
                    x: x * tileSize,
                    y: y * tileSize
                };
            }
        }

        // Generate trees (5 types)
        this.trees = [];
        const treeTypes = ['pine', 'oak', 'birch', 'willow', 'mystic'];

        for (let i = 0; i < 50; i++) {
            const type = treeTypes[Math.floor(Math.random() * treeTypes.length)];
            this.trees.push({
                type: type,
                x: Math.random() * this.worldWidth,
                y: Math.random() * this.worldHeight
            });
        }

        // Generate water streams
        this.waterStreams = [];
        for (let i = 0; i < 3; i++) {
            const startX = Math.random() * this.worldWidth;
            const startY = Math.random() * this.worldHeight;
            const length = 200 + Math.random() * 300;

            this.waterStreams.push({
                x: startX,
                y: startY,
                width: 80 + Math.random() * 60,
                height: 40 + Math.random() * 30,
                length: length,
                angle: Math.random() * Math.PI * 2
            });
        }
    }

    selectCharacter(className) {
        const classData = CLASSES[className];

        this.player = {
            class: className,
            name: classData.name,
            spritePrefix: classData.spritePrefix,
            x: this.worldWidth / 2,
            y: this.worldHeight / 2,
            size: 40,
            direction: 'down', // 8 directions: down, up, left, right, down-left, down-right, up-left, up-right

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

            // Movement animation
            isMoving: false,
            walkCycle: 0
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

            // Skill icon based on type
            let icon = '✨';
            if (skill.damage > 40) icon = '💥';
            else if (skill.heal) icon = '💚';
            else if (skill.defense) icon = '🛡️';
            else if (skill.dodge) icon = '💨';

            btn.innerHTML = `
                <div class="skill-icon">${icon}</div>
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

        const angle = Math.random() * Math.PI * 2;
        const distance = 400 + Math.random() * 400;
        const x = this.player.x + Math.cos(angle) * distance;
        const y = this.player.y + Math.sin(angle) * distance;

        this.mobs.push({
            ...type,
            x: Math.max(50, Math.min(this.worldWidth - 50, x)),
            y: Math.max(50, Math.min(this.worldHeight - 50, y)),
            maxHP: type.hp,
            size: 35,
            targetCooldown: 0,
            direction: 'down'
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

    showDamage(worldX, worldY, damage) {
        const screenX = worldX - this.camera.x + this.canvas.width / 2;
        const screenY = worldY - this.camera.y + this.canvas.height / 2;

        const dmg = document.createElement('div');
        dmg.className = 'damage-number';
        dmg.textContent = '-' + damage;
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
                this.showNotification(`+1 ${drop.name}`);
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
                // Draw item as colored circle
                slot.innerHTML = `<div style="width:20px;height:20px;border-radius:50%;background:${item.color}"></div>`;
                slot.classList.add('has-item');
            } else {
                slot.innerHTML = '';
                slot.classList.remove('has-item');
            }
        });
    }

    getDirection(dx, dy) {
        if (dx === 0 && dy === 0) return this.player.direction;

        const angle = Math.atan2(dy, dx);
        const deg = angle * 180 / Math.PI;

        // 8 directions
        if (deg >= -22.5 && deg < 22.5) return 'right';
        if (deg >= 22.5 && deg < 67.5) return 'down-right';
        if (deg >= 67.5 && deg < 112.5) return 'down';
        if (deg >= 112.5 && deg < 157.5) return 'down-left';
        if (deg >= 157.5 || deg < -157.5) return 'left';
        if (deg >= -157.5 && deg < -112.5) return 'up-left';
        if (deg >= -112.5 && deg < -67.5) return 'up';
        if (deg >= -67.5 && deg < -22.5) return 'up-right';

        return 'down';
    }

    getMobDirection(mob, targetX, targetY) {
        const dx = targetX - mob.x;
        const dy = targetY - mob.y;
        return this.getDirection(dx, dy);
    }

    update() {
        if (!this.player) return;

        const now = Date.now();
        const deltaTime = now - this.lastFrameTime;
        this.lastFrameTime = now;
        this.gameTime += deltaTime;

        // Update asset manager
        if (assetManager) {
            assetManager.update(deltaTime);
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
            const normalizedDx = (dx / magnitude) * this.player.speed;
            const normalizedDy = (dy / magnitude) * this.player.speed;

            const newX = this.player.x + normalizedDx;
            const newY = this.player.y + normalizedDy;

            this.player.x = Math.max(20, Math.min(this.worldWidth - 20, newX));
            this.player.y = Math.max(20, Math.min(this.worldHeight - 20, newY));

            this.player.direction = this.getDirection(dx, dy);
            this.player.isMoving = true;
            this.player.walkCycle += deltaTime / 200;

            // Trample grass
            if (terrainAssets) {
                const tileX = Math.floor(this.player.x / 64);
                const tileY = Math.floor(this.player.y / 64);
                if (this.terrainMap[tileY] && this.terrainMap[tileY][tileX]) {
                    const tile = this.terrainMap[tileY][tileX];
                    if (tile.type === 'grass') {
                        terrainAssets.trampleGrass(this.player.x, this.player.y, this.gameTime);
                    } else if (tile.type === 'dirt' || tile.type === 'stone') {
                        // Create dust particles occasionally
                        if (Math.random() < 0.1) {
                            terrainAssets.createDustParticle(this.player.x, this.player.y, tile.type);
                        }
                    }
                }
            }
        } else {
            this.player.isMoving = false;
        }

        // Update camera to follow player
        this.camera.x = this.player.x - this.canvas.width / 2;
        this.camera.y = this.player.y - this.canvas.height / 2;

        // Update mobs
        this.mobs.forEach(mob => {
            const dist = this.getDistance(this.player, mob);

            if (dist < 400) {
                const angle = Math.atan2(this.player.y - mob.y, this.player.x - mob.x);
                const moveX = Math.cos(angle) * mob.speed;
                const moveY = Math.sin(angle) * mob.speed;

                mob.x += moveX;
                mob.y += moveY;

                mob.direction = this.getMobDirection(mob, this.player.x, this.player.y);

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
                mob.targetCooldown -= deltaTime;
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
                skill.cooldownRemaining -= deltaTime;
            }
        });

        // MP regen
        if (this.player.mp < this.player.maxMP) {
            this.player.mp = Math.min(this.player.maxMP, this.player.mp + 0.05);
            if (Math.random() < 0.05) this.updateHUD();
        }
    }

    draw() {
        // Clear screen
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (!assetManager) {
            // Assets not loaded yet
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '24px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Loading assets...', this.canvas.width / 2, this.canvas.height / 2);
            return;
        }

        // Draw terrain
        this.terrainMap.forEach(row => {
            row.forEach(tile => {
                const screenX = tile.x - this.camera.x;
                const screenY = tile.y - this.camera.y;

                // Only draw visible tiles
                if (screenX > -64 && screenX < this.canvas.width + 64 &&
                    screenY > -64 && screenY < this.canvas.height + 64) {

                    let assetName = tile.type + '_';

                    if (tile.type === 'grass') {
                        // Check if trampled
                        const isTrampled = terrainAssets.isGrassTrampled(tile.x, tile.y, this.gameTime);
                        assetName = isTrampled ? 'grass_trampled' : 'grass_tile';
                    } else if (tile.type === 'dirt') {
                        assetName = 'dirt_road';
                    } else if (tile.type === 'stone') {
                        assetName = 'stone_road';
                    }

                    const asset = assetManager.getAsset(assetName);
                    if (asset) {
                        this.ctx.drawImage(asset, screenX, screenY);
                    }
                }
            });
        });

        // Draw water streams with animation
        this.waterStreams.forEach(stream => {
            const screenX = stream.x - this.camera.x;
            const screenY = stream.y - this.camera.y;

            if (screenX > -stream.width && screenX < this.canvas.width + stream.width &&
                screenY > -stream.height && screenY < this.canvas.height + stream.height) {
                terrainAssets.renderWater(this.ctx, screenX, screenY, stream.width, stream.height, this.gameTime / 1000);
            }
        });

        // Draw trees (sorted by Y for depth)
        const visibleTrees = this.trees.filter(tree => {
            const screenX = tree.x - this.camera.x;
            const screenY = tree.y - this.camera.y;
            return screenX > -120 && screenX < this.canvas.width + 120 &&
                   screenY > -160 && screenY < this.canvas.height + 160;
        });

        // Combine trees, player, mobs for depth sorting
        const entities = [
            ...visibleTrees.map(t => ({ type: 'tree', data: t })),
            { type: 'player', data: this.player },
            ...this.mobs.map(m => ({ type: 'mob', data: m })),
            ...this.drops.map(d => ({ type: 'drop', data: d }))
        ];

        entities.sort((a, b) => a.data.y - b.data.y);

        entities.forEach(entity => {
            if (entity.type === 'tree') {
                const tree = entity.data;
                const screenX = tree.x - this.camera.x;
                const screenY = tree.y - this.camera.y;
                const asset = assetManager.getAsset(`tree_${tree.type}`);
                if (asset) {
                    this.ctx.drawImage(asset, screenX - asset.width / 2, screenY - asset.height);
                }
            } else if (entity.type === 'player') {
                const player = entity.data;
                const screenX = player.x - this.camera.x + this.canvas.width / 2;
                const screenY = player.y - this.camera.y + this.canvas.height / 2;

                // Shadow
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                this.ctx.beginPath();
                this.ctx.ellipse(screenX, screenY + player.size/2, player.size/2, player.size/4, 0, 0, Math.PI * 2);
                this.ctx.fill();

                // Player sprite
                const asset = assetManager.getAsset(`${player.spritePrefix}_${player.direction}`);
                if (asset) {
                    this.ctx.drawImage(asset, screenX - asset.width / 2, screenY - asset.height / 2);
                }
            } else if (entity.type === 'mob') {
                const mob = entity.data;
                const screenX = mob.x - this.camera.x + this.canvas.width / 2;
                const screenY = mob.y - this.camera.y + this.canvas.height / 2;

                // Shadow
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                this.ctx.beginPath();
                this.ctx.ellipse(screenX, screenY + mob.size/2, mob.size/2, mob.size/4, 0, 0, Math.PI * 2);
                this.ctx.fill();

                // Mob sprite
                const asset = assetManager.getAsset(`${mob.spritePrefix}_${mob.direction}`);
                if (asset) {
                    this.ctx.drawImage(asset, screenX - asset.width / 2, screenY - asset.height / 2);
                }

                // HP bar
                const barWidth = 40;
                const barHeight = 4;
                const hpPercent = mob.hp / mob.maxHP;

                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                this.ctx.fillRect(screenX - barWidth/2, screenY - mob.size - 10, barWidth, barHeight);

                this.ctx.fillStyle = hpPercent > 0.5 ? '#4ade80' : hpPercent > 0.25 ? '#fbbf24' : '#ef4444';
                this.ctx.fillRect(screenX - barWidth/2, screenY - mob.size - 10, barWidth * hpPercent, barHeight);
            } else if (entity.type === 'drop') {
                const drop = entity.data;
                const screenX = drop.x - this.camera.x + this.canvas.width / 2;
                const screenY = drop.y - this.camera.y + this.canvas.height / 2;

                // Floating animation
                const float = Math.sin(this.gameTime / 300) * 3;

                // Glow
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = drop.color;
                this.ctx.fillStyle = drop.color;
                this.ctx.beginPath();
                this.ctx.arc(screenX, screenY + float, drop.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            }
        });

        // Draw particles (dust)
        assetManager.particles.forEach(p => {
            const screenX = p.x - this.camera.x + this.canvas.width / 2;
            const screenY = p.y - this.camera.y + this.canvas.height / 2;

            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(screenX, screenY, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
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

// Initialize game after assets are loaded
let game;

// Wait for DOM and assets to load
window.addEventListener('load', () => {
    // Initialize game after a small delay to ensure assets are loaded
    setTimeout(() => {
        game = new Game();
    }, 100);
});

function selectCharacter(className) {
    if (game) {
        game.selectCharacter(className);
    }
}
