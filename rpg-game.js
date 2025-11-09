// Graphics helper functions
const Graphics = {
    drawShield(ctx, x, y, size, color = '#4a90e2') {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y - size/2);
        ctx.lineTo(x + size/3, y - size/3);
        ctx.lineTo(x + size/3, y + size/6);
        ctx.lineTo(x, y + size/2);
        ctx.lineTo(x - size/3, y + size/6);
        ctx.lineTo(x - size/3, y - size/3);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#2d5a8a';
        ctx.lineWidth = 2;
        ctx.stroke();
    },

    drawSword(ctx, x, y, size, color = '#c0c0c0') {
        ctx.strokeStyle = color;
        ctx.lineWidth = size/8;
        ctx.beginPath();
        ctx.moveTo(x - size/3, y + size/3);
        ctx.lineTo(x + size/3, y - size/3);
        ctx.stroke();
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x - size/2.5, y + size/3, size/5, size/6);
    },

    drawOrb(ctx, x, y, size, color = '#b19cd9') {
        const gradient = ctx.createRadialGradient(x, y, size/6, x, y, size/2);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, '#7b68ee');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size/2, 0, Math.PI * 2);
        ctx.fill();
    },

    drawLightning(ctx, x, y, size, color = '#ffd700') {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x + size/6, y - size/2);
        ctx.lineTo(x - size/8, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x - size/4, y + size/2);
        ctx.lineTo(x + size/8, y - size/8);
        ctx.lineTo(x, y - size/8);
        ctx.closePath();
        ctx.fill();
    },

    drawWolf(ctx, x, y, size) {
        ctx.fillStyle = '#666';
        ctx.beginPath();
        ctx.arc(x, y, size/2, 0, Math.PI * 2);
        ctx.fill();
        // Ears
        ctx.beginPath();
        ctx.moveTo(x - size/3, y - size/3);
        ctx.lineTo(x - size/4, y - size/2);
        ctx.lineTo(x - size/6, y - size/3);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + size/3, y - size/3);
        ctx.lineTo(x + size/4, y - size/2);
        ctx.lineTo(x + size/6, y - size/3);
        ctx.fill();
    },

    drawGoblin(ctx, x, y, size) {
        ctx.fillStyle = '#4a8f44';
        ctx.beginPath();
        ctx.arc(x, y, size/2, 0, Math.PI * 2);
        ctx.fill();
        // Eyes
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(x - size/6, y - size/8, size/10, 0, Math.PI * 2);
        ctx.arc(x + size/6, y - size/8, size/10, 0, Math.PI * 2);
        ctx.fill();
    },

    drawOrc(ctx, x, y, size) {
        ctx.fillStyle = '#7a5c4f';
        ctx.fillRect(x - size/2, y - size/2, size, size);
        ctx.fillStyle = '#fff';
        ctx.fillRect(x - size/8, y - size/6, size/4, size/8);
    },

    drawTroll(ctx, x, y, size) {
        ctx.fillStyle = '#8b7355';
        ctx.beginPath();
        ctx.ellipse(x, y, size/2, size/1.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#654321';
        ctx.fillRect(x - size/6, y, size/3, size/2);
    },

    drawDragon(ctx, x, y, size) {
        ctx.fillStyle = '#8b0000';
        ctx.beginPath();
        ctx.arc(x, y, size/2, 0, Math.PI * 2);
        ctx.fill();
        // Wings
        ctx.beginPath();
        ctx.moveTo(x - size/2, y);
        ctx.lineTo(x - size, y - size/4);
        ctx.lineTo(x - size/2, y + size/4);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + size/2, y);
        ctx.lineTo(x + size, y - size/4);
        ctx.lineTo(x + size/2, y + size/4);
        ctx.fill();
    },

    drawPotion(ctx, x, y, size, color) {
        // Bottle
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(x - size/3, y - size/4, size * 0.66, size/2, size/8);
        ctx.fill();
        // Cap
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x - size/4, y - size/2.5, size/2, size/6);
    },

    drawCoin(ctx, x, y, size) {
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(x, y, size/2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#b8860b';
        ctx.lineWidth = 2;
        ctx.stroke();
    },

    drawWeapon(ctx, x, y, size) {
        this.drawSword(ctx, x, y, size, '#e0e0e0');
    },

    drawArmor(ctx, x, y, size) {
        this.drawShield(ctx, x, y, size, '#666');
    }
};

// Character Classes
const CLASSES = {
    warrior: {
        name: 'Savaşçı',
        color: '#4a90e2',
        baseHP: 150,
        baseMP: 50,
        baseDamage: 15,
        baseDefense: 10,
        skills: [
            { name: 'Güçlü Vuruş', type: 'sword', damage: 30, mpCost: 15, cooldown: 3000, key: 'Q' },
            { name: 'Kalkan', type: 'shield', defense: 20, mpCost: 20, cooldown: 5000, key: 'W' },
            { name: 'Savaş Çığlığı', type: 'orb', damage: 50, mpCost: 30, cooldown: 8000, key: 'E' }
        ]
    },
    ninja: {
        name: 'Ninja',
        color: '#c0c0c0',
        baseHP: 100,
        baseMP: 80,
        baseDamage: 25,
        baseDefense: 5,
        skills: [
            { name: 'Hızlı Saldırı', type: 'lightning', damage: 20, mpCost: 10, cooldown: 2000, key: 'Q' },
            { name: 'Gölge Adımı', type: 'orb', dodge: true, mpCost: 15, cooldown: 4000, key: 'W' },
            { name: 'Kritik Vuruş', type: 'sword', damage: 60, mpCost: 25, cooldown: 6000, key: 'E' }
        ]
    },
    shaman: {
        name: 'Şaman',
        color: '#b19cd9',
        baseHP: 120,
        baseMP: 120,
        baseDamage: 18,
        baseDefense: 7,
        skills: [
            { name: 'Işın', type: 'orb', damage: 25, mpCost: 12, cooldown: 2500, key: 'Q' },
            { name: 'İyileştirme', type: 'orb', heal: 40, mpCost: 20, cooldown: 5000, key: 'W' },
            { name: 'Yıldırım', type: 'lightning', damage: 45, mpCost: 28, cooldown: 7000, key: 'E' }
        ]
    },
    sura: {
        name: 'Sura',
        color: '#ffd700',
        baseHP: 130,
        baseMP: 100,
        baseDamage: 20,
        baseDefense: 8,
        skills: [
            { name: 'Karanlık Kılıç', type: 'sword', damage: 28, mpCost: 14, cooldown: 2500, key: 'Q' },
            { name: 'Ruh Emme', type: 'orb', damage: 20, lifesteal: 0.5, mpCost: 18, cooldown: 4500, key: 'W' },
            { name: 'Kara Büyü', type: 'lightning', damage: 55, mpCost: 32, cooldown: 8000, key: 'E' }
        ]
    }
};

// Mob types
const MOB_TYPES = [
    { name: 'Kurt', type: 'wolf', hp: 50, damage: 8, xp: 25, gold: 10, speed: 1.5, color: '#666' },
    { name: 'Goblin', type: 'goblin', hp: 60, damage: 10, xp: 30, gold: 15, speed: 1.2, color: '#4a8f44' },
    { name: 'Ork', type: 'orc', hp: 80, damage: 12, xp: 40, gold: 20, speed: 1.0, color: '#7a5c4f' },
    { name: 'Troll', type: 'troll', hp: 120, damage: 15, xp: 60, gold: 30, speed: 0.8, color: '#8b7355' },
    { name: 'Ejderha', type: 'dragon', hp: 200, damage: 25, xp: 100, gold: 50, speed: 0.6, color: '#8b0000' }
];

// Items
const ITEMS = [
    { name: 'Can İksiri', type: 'potion', subtype: 'health', heal: 50, color: '#ff4444' },
    { name: 'Mana İksiri', type: 'potion', subtype: 'mana', mana: 50, color: '#4444ff' },
    { name: 'Altın', type: 'gold', value: 10 },
    { name: 'Kılıç', type: 'weapon', damage: 5 },
    { name: 'Zırh', type: 'armor', defense: 5 }
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
            color: classData.color,
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

            const canvas = document.createElement('canvas');
            canvas.width = 40;
            canvas.height = 40;
            canvas.className = 'skill-icon';

            const ctx = canvas.getContext('2d');
            this.drawSkillIcon(ctx, skill.type, 20, 20, 16);

            btn.appendChild(canvas);

            const keyDiv = document.createElement('div');
            keyDiv.className = 'skill-key';
            keyDiv.textContent = skill.key;
            btn.appendChild(keyDiv);

            btn.onclick = () => this.useSkill(index);
            skillsDiv.appendChild(btn);
        });
    }

    drawSkillIcon(ctx, type, x, y, size) {
        switch(type) {
            case 'sword': Graphics.drawSword(ctx, x, y, size); break;
            case 'shield': Graphics.drawShield(ctx, x, y, size); break;
            case 'orb': Graphics.drawOrb(ctx, x, y, size); break;
            case 'lightning': Graphics.drawLightning(ctx, x, y, size); break;
        }
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

        this.showNotification('LEVEL UP! ' + this.player.level);
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
            slot.innerHTML = '';

            if (item) {
                const canvas = document.createElement('canvas');
                canvas.width = 40;
                canvas.height = 40;
                const ctx = canvas.getContext('2d');

                this.drawItem(ctx, item, 20, 20, 18);

                slot.appendChild(canvas);
                slot.classList.add('has-item');
            } else {
                slot.classList.remove('has-item');
            }
        });
    }

    drawItem(ctx, item, x, y, size) {
        switch(item.type) {
            case 'potion':
                Graphics.drawPotion(ctx, x, y, size, item.color);
                break;
            case 'gold':
                Graphics.drawCoin(ctx, x, y, size);
                break;
            case 'weapon':
                Graphics.drawWeapon(ctx, x, y, size);
                break;
            case 'armor':
                Graphics.drawArmor(ctx, x, y, size);
                break;
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
            this.drawItem(this.ctx, drop, drop.x, drop.y, drop.size);
        });

        // Mobs
        this.mobs.forEach(mob => {
            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(mob.x, mob.y + mob.size/2, mob.size/2, mob.size/4, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Mob graphic
            this.ctx.save();
            switch(mob.type) {
                case 'wolf': Graphics.drawWolf(this.ctx, mob.x, mob.y, mob.size); break;
                case 'goblin': Graphics.drawGoblin(this.ctx, mob.x, mob.y, mob.size); break;
                case 'orc': Graphics.drawOrc(this.ctx, mob.x, mob.y, mob.size); break;
                case 'troll': Graphics.drawTroll(this.ctx, mob.x, mob.y, mob.size); break;
                case 'dragon': Graphics.drawDragon(this.ctx, mob.x, mob.y, mob.size); break;
            }
            this.ctx.restore();

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

            // Player character
            this.ctx.save();
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = this.player.color;

            this.ctx.fillStyle = this.player.color;
            this.ctx.beginPath();
            this.ctx.arc(this.player.x, this.player.y, this.player.size/2, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            this.ctx.restore();
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
        alert('Game Over!\n\nSeviye: ' + this.player.level + '\nXP: ' + this.player.xp);
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
