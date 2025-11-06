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
        this.mobGroups = []; // Track mob groups
        this.nextGroupId = 0; // Counter for group IDs
        this.projectiles = [];
        this.drops = [];
        this.inventory = Array(5).fill(null);

        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        // City structure
        this.setupCity();

        this.setupControls();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Update city position if it exists
        if (this.city) {
            this.setupCity();
        }
    }

    setupCity() {
        // City at center of map
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        this.city = {
            x: centerX,
            y: centerY,
            innerRadius: 150, // City area
            wallThickness: 20,
            wallRadius: 170, // City walls
            riverWidth: 60,
            riverRadius: 250, // River around city

            // Three bridges - North, Southeast, Southwest
            bridges: [
                { angle: -Math.PI / 2, width: 80, name: 'Kuzey Köprüsü' },      // North (top)
                { angle: Math.PI / 6, width: 80, name: 'Güneydoğu Köprüsü' },   // Southeast
                { angle: 5 * Math.PI / 6, width: 80, name: 'Güneybatı Köprüsü' } // Southwest
            ]
        };
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
        // Spawn mobs in groups of 3
        const totalMobs = 5 + Math.floor(this.player.level / 2);
        const groupCount = Math.ceil(totalMobs / 3);

        for (let i = 0; i < groupCount; i++) {
            this.spawnMobGroup();
        }
    }

    spawnMobGroup() {
        // Spawn a group of 3 mobs
        const groupId = this.nextGroupId++;
        const typeIndex = Math.min(
            Math.floor(this.player.level / 3),
            MOB_TYPES.length - 1
        );
        const type = MOB_TYPES[Math.floor(Math.random() * (typeIndex + 1))];

        // Choose a spawn location for the group (outside city and river)
        let groupX, groupY;
        let attempts = 0;
        do {
            const margin = 100;
            groupX = Math.random() < 0.5
                ? Math.random() * margin
                : this.canvas.width - Math.random() * margin;
            groupY = Math.random() < 0.5
                ? Math.random() * margin
                : this.canvas.height - Math.random() * margin;
            attempts++;
        } while (!this.canMobMoveTo(groupX, groupY) && attempts < 50);

        // If couldn't find spot after 50 attempts, spawn far from city
        if (attempts >= 50 && this.city) {
            const angle = Math.random() * Math.PI * 2;
            const distance = this.city.riverRadius + 100;
            groupX = this.city.x + Math.cos(angle) * distance;
            groupY = this.city.y + Math.sin(angle) * distance;
        }

        // Create group info
        const group = {
            id: groupId,
            aggro: false, // Group starts as non-aggressive
            centerX: groupX,
            centerY: groupY,
            members: []
        };

        // Spawn 3 mobs in a triangle formation around the group center
        for (let i = 0; i < 3; i++) {
            const angle = (i * Math.PI * 2) / 3; // 120 degrees apart
            const offsetX = Math.cos(angle) * 60; // 60px radius
            const offsetY = Math.sin(angle) * 60;

            const mob = {
                ...type,
                x: groupX + offsetX,
                y: groupY + offsetY,
                maxHP: type.hp,
                size: 35,
                targetCooldown: 0,
                groupId: groupId,
                groupPosition: i // Position within group (0, 1, 2)
            };

            this.mobs.push(mob);
            group.members.push(mob);
        }

        this.mobGroups.push(group);
    }

    spawnMob() {
        // Legacy function - now spawns a single group
        this.spawnMobGroup();
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

    isInCity(x, y) {
        if (!this.city) return false;
        const dist = Math.sqrt((x - this.city.x) ** 2 + (y - this.city.y) ** 2);
        return dist <= this.city.wallRadius;
    }

    isInRiver(x, y) {
        if (!this.city) return false;
        const dist = Math.sqrt((x - this.city.x) ** 2 + (y - this.city.y) ** 2);
        const riverInner = this.city.wallRadius + 20;
        const riverOuter = this.city.riverRadius;
        return dist >= riverInner && dist <= riverOuter;
    }

    isOnBridge(x, y) {
        if (!this.city || !this.isInRiver(x, y)) return false;

        const dx = x - this.city.x;
        const dy = y - this.city.y;
        const angle = Math.atan2(dy, dx);
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Check each bridge
        for (const bridge of this.city.bridges) {
            let angleDiff = Math.abs(angle - bridge.angle);
            // Normalize angle difference to 0-PI range
            if (angleDiff > Math.PI) angleDiff = 2 * Math.PI - angleDiff;

            // Bridge width in radians at current distance
            const bridgeAngleWidth = bridge.width / dist;

            if (angleDiff < bridgeAngleWidth) {
                return true;
            }
        }

        return false;
    }

    canMobMoveTo(x, y) {
        // Mobs cannot enter city or cross river (except on bridges, but we block them anyway)
        if (this.isInCity(x, y)) return false;
        if (this.isInRiver(x, y) && !this.isOnBridge(x, y)) return false;
        return true;
    }

    canPlayerMoveTo(x, y) {
        // Players can cross river only on bridges
        if (this.isInRiver(x, y) && !this.isOnBridge(x, y)) return false;
        return true;
    }

    damageEnemy(enemy, damage) {
        enemy.hp -= damage;
        this.showDamage(enemy.x, enemy.y, damage);

        // When a mob is attacked, make its entire group aggressive
        const group = this.mobGroups.find(g => g.id === enemy.groupId);
        if (group && !group.aggro) {
            group.aggro = true;
            this.showNotification(`⚠️ ${enemy.name} Grubu Saldırıya Geçti!`);
        }

        if (enemy.hp <= 0) {
            this.killEnemy(enemy);
        }
    }

    killEnemy(enemy) {
        const index = this.mobs.indexOf(enemy);
        if (index > -1) {
            this.mobs.splice(index, 1);
        }

        // Remove from group
        const group = this.mobGroups.find(g => g.id === enemy.groupId);
        if (group) {
            const memberIndex = group.members.indexOf(enemy);
            if (memberIndex > -1) {
                group.members.splice(memberIndex, 1);
            }

            // If group is empty, remove it
            if (group.members.length === 0) {
                const groupIndex = this.mobGroups.indexOf(group);
                if (groupIndex > -1) {
                    this.mobGroups.splice(groupIndex, 1);
                }
            }
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

        // Spawn new mob group after delay
        setTimeout(() => this.spawnMobGroup(), 3000);

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

            const newX = Math.max(20, Math.min(this.canvas.width - 20, this.player.x + dx));
            const newY = Math.max(20, Math.min(this.canvas.height - 20, this.player.y + dy));

            // Check if player can move to new position (river/bridge collision)
            if (this.canPlayerMoveTo(newX, newY)) {
                this.player.x = newX;
                this.player.y = newY;
            }
        }

        // Update mob groups first
        this.mobGroups.forEach(group => {
            // Update group center based on living members
            if (group.members.length > 0) {
                const sumX = group.members.reduce((sum, m) => sum + m.x, 0);
                const sumY = group.members.reduce((sum, m) => sum + m.y, 0);
                group.centerX = sumX / group.members.length;
                group.centerY = sumY / group.members.length;
            }
        });

        // Update mobs
        this.mobs.forEach(mob => {
            const dist = this.getDistance(this.player, mob);
            const group = this.mobGroups.find(g => g.id === mob.groupId);

            if (group && group.aggro) {
                // Aggressive group - chase player aggressively (no distance limit)
                const angle = Math.atan2(this.player.y - mob.y, this.player.x - mob.x);

                // Run faster when aggressive (2x speed)
                const chaseSpeed = mob.speed * 2;
                const newX = mob.x + Math.cos(angle) * chaseSpeed;
                const newY = mob.y + Math.sin(angle) * chaseSpeed;

                // Check if mob can move to new position (cannot enter city/river)
                if (this.canMobMoveTo(newX, newY)) {
                    mob.x = newX;
                    mob.y = newY;
                }

                // Attack player when close
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
            } else if (group) {
                // Non-aggressive group - maintain formation and wander
                const targetAngle = (mob.groupPosition * Math.PI * 2) / 3;
                const targetX = group.centerX + Math.cos(targetAngle) * 60;
                const targetY = group.centerY + Math.sin(targetAngle) * 60;

                // Move towards formation position
                const distToTarget = Math.sqrt(
                    (targetX - mob.x) ** 2 + (targetY - mob.y) ** 2
                );

                if (distToTarget > 10) {
                    const angle = Math.atan2(targetY - mob.y, targetX - mob.x);
                    const newX = mob.x + Math.cos(angle) * mob.speed * 0.5;
                    const newY = mob.y + Math.sin(angle) * mob.speed * 0.5;

                    // Check collision before moving
                    if (this.canMobMoveTo(newX, newY)) {
                        mob.x = newX;
                        mob.y = newY;
                    }
                }

                // Group wanders slowly (move center)
                if (!group.wanderAngle) {
                    group.wanderAngle = Math.random() * Math.PI * 2;
                    group.wanderTime = 0;
                }

                group.wanderTime = (group.wanderTime || 0) + 16;
                if (group.wanderTime > 2000) {
                    group.wanderAngle = Math.random() * Math.PI * 2;
                    group.wanderTime = 0;
                }

                // Move group center slowly - avoid city area
                const newCenterX = group.centerX + Math.cos(group.wanderAngle) * 0.3;
                const newCenterY = group.centerY + Math.sin(group.wanderAngle) * 0.3;

                if (this.canMobMoveTo(newCenterX, newCenterY)) {
                    group.centerX = newCenterX;
                    group.centerY = newCenterY;
                } else {
                    // If blocked, change direction
                    group.wanderAngle = Math.random() * Math.PI * 2;
                }

                // Keep group on screen
                group.centerX = Math.max(100, Math.min(this.canvas.width - 100, group.centerX));
                group.centerY = Math.max(100, Math.min(this.canvas.height - 100, group.centerY));
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

        // Draw City
        if (this.city) {
            // Draw river (blue ring)
            this.ctx.fillStyle = '#1e90ff';
            this.ctx.beginPath();
            this.ctx.arc(this.city.x, this.city.y, this.city.riverRadius, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw bridges over the river
            this.city.bridges.forEach(bridge => {
                const startDist = this.city.wallRadius + 20;
                const endDist = this.city.riverRadius;

                // Bridge path
                const startX1 = this.city.x + Math.cos(bridge.angle - bridge.width / (startDist * 2)) * startDist;
                const startY1 = this.city.y + Math.sin(bridge.angle - bridge.width / (startDist * 2)) * startDist;
                const startX2 = this.city.x + Math.cos(bridge.angle + bridge.width / (startDist * 2)) * startDist;
                const startY2 = this.city.y + Math.sin(bridge.angle + bridge.width / (startDist * 2)) * startDist;

                const endX1 = this.city.x + Math.cos(bridge.angle - bridge.width / (endDist * 2)) * endDist;
                const endY1 = this.city.y + Math.sin(bridge.angle - bridge.width / (endDist * 2)) * endDist;
                const endX2 = this.city.x + Math.cos(bridge.angle + bridge.width / (endDist * 2)) * endDist;
                const endY2 = this.city.y + Math.sin(bridge.angle + bridge.width / (endDist * 2)) * endDist;

                // Draw bridge (stone color)
                this.ctx.fillStyle = '#8b7355';
                this.ctx.beginPath();
                this.ctx.moveTo(startX1, startY1);
                this.ctx.lineTo(endX1, endY1);
                this.ctx.lineTo(endX2, endY2);
                this.ctx.lineTo(startX2, startY2);
                this.ctx.closePath();
                this.ctx.fill();

                // Bridge border
                this.ctx.strokeStyle = '#654321';
                this.ctx.lineWidth = 3;
                this.ctx.stroke();
            });

            // Draw city ground (grass green)
            this.ctx.fillStyle = '#2d5016';
            this.ctx.beginPath();
            this.ctx.arc(this.city.x, this.city.y, this.city.wallRadius, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw city walls (stone)
            this.ctx.strokeStyle = '#696969';
            this.ctx.lineWidth = this.city.wallThickness;
            this.ctx.beginPath();
            this.ctx.arc(this.city.x, this.city.y, this.city.wallRadius - this.city.wallThickness / 2, 0, Math.PI * 2);
            this.ctx.stroke();

            // Draw wall details (brick pattern)
            this.ctx.strokeStyle = '#505050';
            this.ctx.lineWidth = 2;
            for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 12) {
                this.ctx.beginPath();
                this.ctx.moveTo(
                    this.city.x + Math.cos(angle) * (this.city.wallRadius - this.city.wallThickness),
                    this.city.y + Math.sin(angle) * (this.city.wallRadius - this.city.wallThickness)
                );
                this.ctx.lineTo(
                    this.city.x + Math.cos(angle) * this.city.wallRadius,
                    this.city.y + Math.sin(angle) * this.city.wallRadius
                );
                this.ctx.stroke();
            }

            // Draw gates at bridge entrances
            this.city.bridges.forEach(bridge => {
                const gateX = this.city.x + Math.cos(bridge.angle) * (this.city.wallRadius - this.city.wallThickness / 2);
                const gateY = this.city.y + Math.sin(bridge.angle) * (this.city.wallRadius - this.city.wallThickness / 2);

                // Gate
                this.ctx.fillStyle = '#3d2817';
                this.ctx.beginPath();
                this.ctx.arc(gateX, gateY, 15, 0, Math.PI * 2);
                this.ctx.fill();
            });
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
            const group = this.mobGroups.find(g => g.id === mob.groupId);

            // Running effect for aggressive mobs (motion lines)
            if (group && group.aggro) {
                const dist = this.getDistance(this.player, mob);
                if (dist > 50) { // Only show when running
                    const angle = Math.atan2(this.player.y - mob.y, this.player.x - mob.x);

                    // Draw motion lines behind the mob
                    for (let i = 1; i <= 3; i++) {
                        const lineX = mob.x - Math.cos(angle) * i * 15;
                        const lineY = mob.y - Math.sin(angle) * i * 15;
                        const opacity = 0.3 - (i * 0.08);

                        this.ctx.fillStyle = `rgba(255, 0, 0, ${opacity})`;
                        this.ctx.beginPath();
                        this.ctx.arc(lineX, lineY, mob.size / 4, 0, Math.PI * 2);
                        this.ctx.fill();
                    }
                }
            }

            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(mob.x, mob.y + mob.size/2, mob.size/2, mob.size/4, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Aggro indicator (red glow for aggressive groups)
            if (group && group.aggro) {
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = '#ff0000';
                this.ctx.strokeStyle = '#ff0000';
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.arc(mob.x, mob.y, mob.size / 2, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.shadowBlur = 0;
            }

            // Mob icon with running animation (slight bounce)
            let yOffset = 0;
            if (group && group.aggro) {
                const dist = this.getDistance(this.player, mob);
                if (dist > 50) {
                    yOffset = Math.sin(Date.now() / 100) * 3; // Bounce effect
                }
            }

            this.ctx.font = mob.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(mob.icon, mob.x, mob.y + yOffset);

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
