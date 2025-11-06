// Character Classes - Metin2 Style
const CLASSES = {
    warrior: {
        name: 'Savaşçı',
        icon: '🛡️',
        baseHP: 150,
        baseMP: 50,
        baseDamage: 15,
        baseDefense: 10,
        // Visual design
        primaryColor: '#4a90e2',     // Blue
        secondaryColor: '#c0c0c0',   // Silver
        glowColor: '#87ceeb',        // Light blue
        bodyColor: '#2c5aa0',
        armorColor: '#b8b8b8',
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
        // Visual design
        primaryColor: '#dc143c',     // Crimson
        secondaryColor: '#1a1a1a',   // Black
        glowColor: '#ff6b6b',        // Red glow
        bodyColor: '#8b0000',
        armorColor: '#2d2d2d',
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
        // Visual design
        primaryColor: '#9370db',     // Purple
        secondaryColor: '#ffd700',   // Gold
        glowColor: '#da70d6',        // Orchid
        bodyColor: '#663399',
        armorColor: '#daa520',
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
        // Visual design
        primaryColor: '#4b0082',     // Indigo/Dark purple
        secondaryColor: '#2d0a4e',   // Darker purple
        glowColor: '#8b00ff',        // Violet glow
        bodyColor: '#1a0033',
        armorColor: '#4b0082',
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

        // Safe Zone - Starting plaza
        this.safeZone = {
            x: 0,
            y: 0,
            width: 500,
            height: 500
        };

        // Electric poles in the plaza
        this.poles = [
            { x: 100, y: 100 },
            { x: 400, y: 100 },
            { x: 100, y: 400 },
            { x: 400, y: 400 }
        ];

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
            // Start in safe zone center
            x: this.safeZone.x + this.safeZone.width / 2,
            y: this.safeZone.y + this.safeZone.height / 2,
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

            // Visual properties
            primaryColor: classData.primaryColor,
            secondaryColor: classData.secondaryColor,
            glowColor: classData.glowColor,
            bodyColor: classData.bodyColor,
            armorColor: classData.armorColor
        };

        this.updateHUD();
        this.createSkillButtons();

        document.getElementById('charSelect').classList.add('hidden');
        document.getElementById('gameScreen').classList.add('active');

        this.spawnMobs();
        this.gameLoop();
    }

    // Check if entity is in safe zone
    isInSafeZone(entity) {
        return entity.x >= this.safeZone.x &&
               entity.x <= this.safeZone.x + this.safeZone.width &&
               entity.y >= this.safeZone.y &&
               entity.y <= this.safeZone.y + this.safeZone.height;
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

            // Mobs don't chase or attack in safe zone
            const playerInSafeZone = this.isInSafeZone(this.player);
            const mobInSafeZone = this.isInSafeZone(mob);

            if (dist < 400 && !playerInSafeZone) {
                const angle = Math.atan2(this.player.y - mob.y, this.player.x - mob.x);
                mob.x += Math.cos(angle) * mob.speed;
                mob.y += Math.sin(angle) * mob.speed;

                // Attack player - only if both are outside safe zone
                if (dist < 50 && !mobInSafeZone) {
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

        // Draw Safe Zone - Gray brick plaza
        this.drawSafeZone();

        // Grid (outside safe zone)
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
            this.drawPlayer();
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

    drawSafeZone() {
        const sz = this.safeZone;

        // Gray brick pattern
        const brickWidth = 40;
        const brickHeight = 20;

        for (let y = sz.y; y < sz.y + sz.height; y += brickHeight) {
            for (let x = sz.x; x < sz.x + sz.width; x += brickWidth) {
                const offset = (Math.floor((y - sz.y) / brickHeight) % 2) * (brickWidth / 2);
                const brickX = x + offset;

                if (brickX < sz.x + sz.width) {
                    // Brick color variation
                    const shade = 100 + Math.floor(Math.random() * 40);
                    this.ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
                    this.ctx.fillRect(brickX, y, brickWidth - 2, brickHeight - 2);

                    // Brick border
                    this.ctx.strokeStyle = '#555';
                    this.ctx.lineWidth = 1;
                    this.ctx.strokeRect(brickX, y, brickWidth - 2, brickHeight - 2);
                }
            }
        }

        // Border around safe zone
        this.ctx.strokeStyle = '#ffd700';
        this.ctx.lineWidth = 3;
        this.ctx.setLineDash([10, 5]);
        this.ctx.strokeRect(sz.x, sz.y, sz.width, sz.height);
        this.ctx.setLineDash([]);

        // Safe zone text
        this.ctx.fillStyle = '#ffd700';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🛡️ GÜVENLİ BÖLGE 🛡️', sz.x + sz.width / 2, sz.y - 10);

        // Draw electric poles
        this.poles.forEach(pole => {
            // Pole base
            this.ctx.fillStyle = '#444';
            this.ctx.fillRect(pole.x - 5, pole.y - 60, 10, 60);

            // Pole top
            this.ctx.fillStyle = '#666';
            this.ctx.fillRect(pole.x - 8, pole.y - 70, 16, 10);

            // Electric wires (horizontal between poles)
            this.ctx.strokeStyle = '#888';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(pole.x, pole.y - 65);
            // Find nearest pole and draw wire
            this.poles.forEach(otherPole => {
                if (pole !== otherPole) {
                    const dist = Math.sqrt((pole.x - otherPole.x) ** 2 + (pole.y - otherPole.y) ** 2);
                    if (dist < 350) {
                        this.ctx.lineTo(otherPole.x, otherPole.y - 65);
                    }
                }
            });
            this.ctx.stroke();

            // Light on pole
            const time = Date.now();
            const pulse = Math.sin(time / 500) * 0.5 + 0.5;
            this.ctx.fillStyle = `rgba(255, 255, 100, ${pulse})`;
            this.ctx.beginPath();
            this.ctx.arc(pole.x, pole.y - 65, 3, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawPlayer() {
        const p = this.player;

        // Shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.ellipse(p.x, p.y + p.size/2, p.size/2, p.size/4, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Character body with class colors
        const bodySize = p.size * 0.8;

        // Outer glow
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = p.glowColor;

        // Body circle
        this.ctx.fillStyle = p.bodyColor;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, bodySize / 2, 0, Math.PI * 2);
        this.ctx.fill();

        // Armor highlights
        this.ctx.fillStyle = p.armorColor;
        this.ctx.beginPath();
        this.ctx.arc(p.x - bodySize / 4, p.y - bodySize / 4, bodySize / 6, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(p.x + bodySize / 4, p.y - bodySize / 4, bodySize / 6, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.shadowBlur = 0;

        // Character icon (centered)
        this.ctx.font = p.size + 'px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = p.primaryColor;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = p.glowColor;
        this.ctx.fillText(p.icon, p.x, p.y);
        this.ctx.shadowBlur = 0;

        // Class-specific details
        if (p.class === 'warrior') {
            // Shield outline
            this.ctx.strokeStyle = p.secondaryColor;
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, bodySize / 2 + 2, 0, Math.PI * 2);
            this.ctx.stroke();
        } else if (p.class === 'ninja') {
            // Speed lines
            this.ctx.strokeStyle = p.primaryColor;
            this.ctx.lineWidth = 2;
            for (let i = 0; i < 3; i++) {
                const angle = (Date.now() / 100 + i * Math.PI * 2 / 3) % (Math.PI * 2);
                const x1 = p.x + Math.cos(angle) * bodySize / 2;
                const y1 = p.y + Math.sin(angle) * bodySize / 2;
                const x2 = p.x + Math.cos(angle) * (bodySize / 2 + 10);
                const y2 = p.y + Math.sin(angle) * (bodySize / 2 + 10);
                this.ctx.beginPath();
                this.ctx.moveTo(x1, y1);
                this.ctx.lineTo(x2, y2);
                this.ctx.stroke();
            }
        } else if (p.class === 'shaman') {
            // Magical aura particles
            const time = Date.now() / 1000;
            for (let i = 0; i < 5; i++) {
                const angle = time + i * Math.PI * 2 / 5;
                const radius = bodySize / 2 + 15 + Math.sin(time * 2 + i) * 5;
                const px = p.x + Math.cos(angle) * radius;
                const py = p.y + Math.sin(angle) * radius;
                this.ctx.fillStyle = p.secondaryColor;
                this.ctx.beginPath();
                this.ctx.arc(px, py, 3, 0, Math.PI * 2);
                this.ctx.fill();
            }
        } else if (p.class === 'sura') {
            // Dark energy swirls
            const time = Date.now() / 1000;
            this.ctx.strokeStyle = p.glowColor;
            this.ctx.lineWidth = 2;
            for (let i = 0; i < 2; i++) {
                this.ctx.beginPath();
                for (let t = 0; t < Math.PI * 2; t += 0.1) {
                    const radius = bodySize / 2 + 5 + Math.sin(t * 3 + time + i * Math.PI) * 8;
                    const x = p.x + Math.cos(t) * radius;
                    const y = p.y + Math.sin(t) * radius;
                    if (t === 0) {
                        this.ctx.moveTo(x, y);
                    } else {
                        this.ctx.lineTo(x, y);
                    }
                }
                this.ctx.stroke();
            }
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
