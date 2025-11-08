// ============================================================================
// CRYSTAL-THEMED CHARACTER CLASSES
// ============================================================================

const CLASSES = {
    warrior: {
        name: 'Obsidian Knight',
        displayName: 'Obsidian Şövalye',
        description: 'Karanlık kristal zırhı ile korunan güçlü savaşçı',
        spriteType: 'knight',
        baseHP: 150,
        baseMP: 50,
        baseDamage: 15,
        baseDefense: 10,
        baseSpeed: 3,
        skills: [
            { name: 'Crystal Slash', displayName: 'Kristal Kılıç', damage: 30, mpCost: 15, cooldown: 3000, key: 'Q', color: '#7c3aed' },
            { name: 'Obsidian Shield', displayName: 'Obsidian Kalkan', defense: 20, mpCost: 20, cooldown: 5000, key: 'W', color: '#1a0f2e' },
            { name: 'Dark Eruption', displayName: 'Karanlık Patlama', damage: 50, mpCost: 30, cooldown: 8000, key: 'E', color: '#4a1fb8' }
        ]
    },
    ninja: {
        name: 'Shadow Assassin',
        displayName: 'Gölge Suikastçi',
        description: 'Hızlı ve ölümcül kristal kılıç ustası',
        spriteType: 'knight',
        baseHP: 100,
        baseMP: 80,
        baseDamage: 25,
        baseDefense: 5,
        baseSpeed: 4,
        skills: [
            { name: 'Swift Strike', displayName: 'Hızlı Darbe', damage: 20, mpCost: 10, cooldown: 2000, key: 'Q', color: '#a78bfa' },
            { name: 'Shadow Step', displayName: 'Gölge Adımı', dodge: true, mpCost: 15, cooldown: 4000, key: 'W', color: '#0d0717' },
            { name: 'Fatal Blow', displayName: 'Öldürücü Darbe', damage: 60, mpCost: 25, cooldown: 6000, key: 'E', color: '#c4b5fd' }
        ]
    },
    shaman: {
        name: 'Crystal Mage',
        displayName: 'Kristal Büyücü',
        description: 'Büyülü kristal gücünü kontrol eden sihirbaz',
        spriteType: 'knight',
        baseHP: 120,
        baseMP: 120,
        baseDamage: 18,
        baseDefense: 7,
        baseSpeed: 2.5,
        skills: [
            { name: 'Crystal Beam', displayName: 'Kristal Işını', damage: 25, mpCost: 12, cooldown: 2500, key: 'Q', color: '#3b82f6' },
            { name: 'Restoration', displayName: 'İyileştirme', heal: 40, mpCost: 20, cooldown: 5000, key: 'W', color: '#10b981' },
            { name: 'Lightning Storm', displayName: 'Yıldırım Fırtınası', damage: 45, mpCost: 28, cooldown: 7000, key: 'E', color: '#fbbf24' }
        ]
    },
    sura: {
        name: 'Void Sorcerer',
        displayName: 'Boşluk Büyücüsü',
        description: 'Karanlık kristal enerjisini kullanan güçlü büyücü',
        spriteType: 'knight',
        baseHP: 130,
        baseMP: 100,
        baseDamage: 20,
        baseDefense: 8,
        baseSpeed: 3,
        skills: [
            { name: 'Void Blade', displayName: 'Boşluk Kılıcı', damage: 28, mpCost: 14, cooldown: 2500, key: 'Q', color: '#2d1b69' },
            { name: 'Soul Drain', displayName: 'Ruh Emme', damage: 20, lifesteal: 0.5, mpCost: 18, cooldown: 4500, key: 'W', color: '#7c3aed' },
            { name: 'Dark Magic', displayName: 'Kara Büyü', damage: 55, mpCost: 32, cooldown: 8000, key: 'E', color: '#4a1fb8' }
        ]
    }
};

// ============================================================================
// CRYSTAL CREATURE ENEMIES
// ============================================================================

const MOB_TYPES = [
    {
        name: 'Amethyst Sprite',
        displayName: 'Ametist Ruhu',
        spriteType: 'amethystSprite',
        hp: 50,
        damage: 8,
        xp: 25,
        gold: 10,
        speed: 1.8,
        size: 24
    },
    {
        name: 'Emerald Golem',
        displayName: 'Zümrüt Golem',
        spriteType: 'emeraldGolem',
        hp: 70,
        damage: 10,
        xp: 35,
        gold: 15,
        speed: 1.0,
        size: 32
    },
    {
        name: 'Ruby Beast',
        displayName: 'Yakut Canavar',
        spriteType: 'rubyBeast',
        hp: 90,
        damage: 14,
        xp: 45,
        gold: 25,
        speed: 1.3,
        size: 28
    },
    {
        name: 'Sapphire Wraith',
        displayName: 'Safir Hayalet',
        spriteType: 'sapphireWraith',
        hp: 120,
        damage: 16,
        xp: 65,
        gold: 35,
        speed: 0.9,
        size: 26
    },
    {
        name: 'Diamond Titan',
        displayName: 'Elmas Titan',
        spriteType: 'diamondTitan',
        hp: 250,
        damage: 28,
        xp: 120,
        gold: 60,
        speed: 0.6,
        size: 48
    }
];

// ============================================================================
// CRYSTAL ITEMS
// ============================================================================

const ITEMS = [
    { name: 'Crystal Vial', displayName: 'Kristal Can İksiri', icon: '❤️', type: 'potion', heal: 50, color: '#ef4444' },
    { name: 'Mana Crystal', displayName: 'Mana Kristali', icon: '💙', type: 'potion', mana: 50, color: '#3b82f6' },
    { name: 'Gold Crystal', displayName: 'Altın Kristal', icon: '💰', type: 'gold', value: 10, color: '#fbbf24' },
    { name: 'Crystal Blade', displayName: 'Kristal Kılıç', icon: '⚔️', type: 'weapon', damage: 5, color: '#a78bfa' },
    { name: 'Crystal Armor', displayName: 'Kristal Zırh', icon: '🛡️', type: 'armor', defense: 5, color: '#7c3aed' }
];

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Initialize sprite system
        this.spriteAssets = new SpriteAssets();
        this.particleSystem = new ParticleSystem();

        this.player = null;
        this.playerAnimator = null;
        this.mobs = [];
        this.projectiles = [];
        this.drops = [];
        this.inventory = Array(5).fill(null);

        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        this.lastTimestamp = 0;

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
            displayName: classData.displayName,
            spriteType: classData.spriteType,
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

            speed: classData.baseSpeed,
            lastAngle: 270, // facing down
            isMoving: false,
            skills: classData.skills.map(s => ({...s, cooldownRemaining: 0})),

            gold: 0,
            attackCooldown: 0
        };

        // Create sprite animator for player
        this.playerAnimator = new SpriteAnimator(
            this.spriteAssets.sprites[this.player.spriteType]
        );

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
            btn.style.background = `linear-gradient(135deg, ${skill.color}dd, ${skill.color}88)`;
            btn.innerHTML = `
                <div class="skill-icon">${skill.displayName.substring(0, 2)}</div>
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

        const mob = {
            ...type,
            x, y,
            maxHP: type.hp,
            targetCooldown: 0,
            lastAngle: 270
        };

        // Create sprite animator for mob
        mob.animator = new SpriteAnimator(
            this.spriteAssets.sprites[type.spriteType]
        );

        this.mobs.push(mob);
    }

    useSkill(index) {
        if (!this.player) return;

        const skill = this.player.skills[index];

        if (skill.cooldownRemaining > 0) return;
        if (this.player.mp < skill.mpCost) return;

        this.player.mp -= skill.mpCost;
        skill.cooldownRemaining = skill.cooldown;

        // Trigger attack animation
        if (this.playerAnimator) {
            this.playerAnimator.attack();
        }

        // Particle effects
        this.particleSystem.emit(this.player.x, this.player.y, {
            count: 15,
            color: skill.color,
            speed: 3,
            life: 800
        });

        // Skill effects
        if (skill.damage) {
            const nearestMob = this.findNearestMob();
            if (nearestMob) {
                const distance = this.getDistance(this.player, nearestMob);
                if (distance < 300) {
                    this.damageEnemy(nearestMob, skill.damage + this.player.damage);

                    // Particle effect on hit
                    this.particleSystem.emit(nearestMob.x, nearestMob.y, {
                        count: 20,
                        color: skill.color,
                        speed: 4,
                        life: 600
                    });

                    if (skill.lifesteal) {
                        this.player.hp = Math.min(
                            this.player.maxHP,
                            this.player.hp + skill.damage * skill.lifesteal
                        );

                        // Healing particles
                        this.particleSystem.emit(this.player.x, this.player.y, {
                            count: 10,
                            color: '#10b981',
                            speed: 2,
                            life: 1000
                        });
                    }
                }
            }
        }

        if (skill.heal) {
            this.player.hp = Math.min(this.player.maxHP, this.player.hp + skill.heal);

            // Healing particles
            this.particleSystem.emit(this.player.x, this.player.y, {
                count: 25,
                color: '#10b981',
                speed: 2,
                life: 1200
            });
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

        // Death explosion particles
        const enemyConfig = this.spriteAssets.sprites[enemy.spriteType]?.config;
        const deathColor = enemyConfig?.glow || '#ffffff';

        this.particleSystem.emit(enemy.x, enemy.y, {
            count: 40,
            color: deathColor,
            speed: 6,
            life: 1000
        });

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

        // Epic level up particle effect
        this.particleSystem.emit(this.player.x, this.player.y, {
            count: 50,
            color: '#ffd700',
            speed: 5,
            life: 1500
        });

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

        // Pickup particle effect
        this.particleSystem.emit(drop.x, drop.y, {
            count: 15,
            color: drop.color || '#fbbf24',
            speed: 3,
            life: 600
        });

        // Add to inventory
        for (let i = 0; i < this.inventory.length; i++) {
            if (!this.inventory[i]) {
                this.inventory[i] = drop;
                this.updateInventory();
                this.showNotification(`+1 ${drop.displayName || drop.name} ${drop.icon}`);
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

        this.player.isMoving = false;

        if (dx || dy) {
            const magnitude = Math.sqrt(dx * dx + dy * dy);
            dx = (dx / magnitude) * this.player.speed;
            dy = (dy / magnitude) * this.player.speed;

            this.player.x = Math.max(20, Math.min(this.canvas.width - 20, this.player.x + dx));
            this.player.y = Math.max(20, Math.min(this.canvas.height - 20, this.player.y + dy));

            // Update player direction
            this.player.lastAngle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
            if (this.player.lastAngle < 0) this.player.lastAngle += 360;

            this.player.isMoving = true;

            // Update animator direction
            if (this.playerAnimator) {
                this.playerAnimator.setDirection(this.player.lastAngle);
            }
        }

        // Update mobs
        this.mobs.forEach(mob => {
            const dist = this.getDistance(this.player, mob);

            if (dist < 400) {
                const angle = Math.atan2(this.player.y - mob.y, this.player.x - mob.x);
                mob.x += Math.cos(angle) * mob.speed;
                mob.y += Math.sin(angle) * mob.speed;

                // Update mob direction
                mob.lastAngle = angle * 180 / Math.PI + 90;
                if (mob.lastAngle < 0) mob.lastAngle += 360;

                if (mob.animator) {
                    mob.animator.setDirection(mob.lastAngle);
                }

                // Attack player
                if (dist < 50) {
                    if (mob.targetCooldown <= 0) {
                        const damage = Math.max(1, mob.damage - this.player.defense);
                        this.player.hp -= damage;
                        this.showDamage(this.player.x, this.player.y - 40, damage);
                        mob.targetCooldown = 1000;

                        // Hit particles
                        this.particleSystem.emit(this.player.x, this.player.y, {
                            count: 10,
                            color: '#ef4444',
                            speed: 2,
                            life: 500
                        });

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

        // Update particle system
        this.particleSystem.update(16);

        // Update animators
        if (this.playerAnimator) {
            this.playerAnimator.update(this.lastTimestamp);
        }

        this.mobs.forEach(mob => {
            if (mob.animator) {
                mob.animator.update(this.lastTimestamp);
            }
        });
    }

    draw() {
        // Dark crystal-themed background
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#0a0e27');
        gradient.addColorStop(0.5, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Animated grid with crystal energy
        this.ctx.strokeStyle = 'rgba(124, 58, 237, 0.1)';
        this.ctx.lineWidth = 1;
        const gridOffset = (Date.now() / 50) % 50;

        for (let x = -gridOffset; x < this.canvas.width; x += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = -gridOffset; y < this.canvas.height; y += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        // Drops with crystal glow
        this.drops.forEach(drop => {
            // Glow effect
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = drop.color || '#a78bfa';

            // Floating animation
            const floatY = drop.y + Math.sin(Date.now() / 300 + drop.x) * 3;

            this.ctx.font = drop.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(drop.icon, drop.x, floatY);

            this.ctx.shadowBlur = 0;
        });

        // Mobs with sprite rendering
        this.mobs.forEach(mob => {
            // Draw sprite
            if (mob.animator) {
                mob.animator.draw(this.ctx, mob.x, mob.y, 1.2);
            }

            // HP bar
            const barWidth = 45;
            const barHeight = 5;
            const hpPercent = mob.hp / mob.maxHP;

            // HP bar background
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            this.ctx.fillRect(mob.x - barWidth/2, mob.y - mob.size/2 - 8, barWidth, barHeight);

            // HP bar fill with gradient
            const hpGradient = this.ctx.createLinearGradient(
                mob.x - barWidth/2, 0,
                mob.x + barWidth/2, 0
            );

            if (hpPercent > 0.5) {
                hpGradient.addColorStop(0, '#4ade80');
                hpGradient.addColorStop(1, '#22c55e');
            } else if (hpPercent > 0.25) {
                hpGradient.addColorStop(0, '#fbbf24');
                hpGradient.addColorStop(1, '#f59e0b');
            } else {
                hpGradient.addColorStop(0, '#ef4444');
                hpGradient.addColorStop(1, '#dc2626');
            }

            this.ctx.fillStyle = hpGradient;
            this.ctx.fillRect(mob.x - barWidth/2, mob.y - mob.size/2 - 8, barWidth * hpPercent, barHeight);

            // HP bar border
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(mob.x - barWidth/2, mob.y - mob.size/2 - 8, barWidth, barHeight);

            // Mob name
            this.ctx.font = '10px Arial';
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(mob.displayName, mob.x, mob.y - mob.size/2 - 15);
        });

        // Player with sprite rendering
        if (this.player && this.playerAnimator) {
            // Character glow
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = '#a78bfa';

            // Draw player sprite
            this.playerAnimator.draw(this.ctx, this.player.x, this.player.y, 1.3);

            this.ctx.shadowBlur = 0;

            // Player name tag
            this.ctx.font = 'bold 12px Arial';
            this.ctx.fillStyle = '#ffd700';
            this.ctx.textAlign = 'center';
            this.ctx.strokeStyle = '#000000';
            this.ctx.lineWidth = 3;
            this.ctx.strokeText(this.player.displayName, this.player.x, this.player.y - 30);
            this.ctx.fillText(this.player.displayName, this.player.x, this.player.y - 30);

            // Level indicator
            this.ctx.font = '10px Arial';
            this.ctx.fillStyle = '#c4b5fd';
            this.ctx.fillText(`Lv.${this.player.level}`, this.player.x, this.player.y - 40);
        }

        // Particle effects
        this.particleSystem.draw(this.ctx);
    }

    updateHUD() {
        if (!this.player) return;

        document.getElementById('playerName').textContent = this.player.displayName;
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

    gameLoop(timestamp = 0) {
        this.lastTimestamp = timestamp;
        this.update();
        this.draw();
        requestAnimationFrame((ts) => this.gameLoop(ts));
    }
}

// Initialize game
const game = new Game();

function selectCharacter(className) {
    game.selectCharacter(className);
}
