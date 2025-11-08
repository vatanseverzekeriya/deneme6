// Character Classes - CYBER THEME
const CLASSES = {
    warrior: {
        name: 'Cyber Samurai',
        spriteType: 'cyber-samurai',
        baseHP: 150,
        baseMP: 50,
        baseDamage: 15,
        baseDefense: 10,
        skills: [
            { name: 'Plasma Strike', icon: '⚡', damage: 30, mpCost: 15, cooldown: 3000, key: 'Q' },
            { name: 'Energy Shield', icon: '🛡️', defense: 20, mpCost: 20, cooldown: 5000, key: 'W' },
            { name: 'Cyber Slash', icon: '⚔️', damage: 50, mpCost: 30, cooldown: 8000, key: 'E' }
        ]
    },
    ninja: {
        name: 'Shadow Operative',
        spriteType: 'cyber-samurai', // Using same sprite with different stats
        baseHP: 100,
        baseMP: 80,
        baseDamage: 25,
        baseDefense: 5,
        skills: [
            { name: 'Rapid Strike', icon: '⚡', damage: 20, mpCost: 10, cooldown: 2000, key: 'Q' },
            { name: 'Phase Shift', icon: '💨', dodge: true, mpCost: 15, cooldown: 4000, key: 'W' },
            { name: 'Critical Hit', icon: '💥', damage: 60, mpCost: 25, cooldown: 6000, key: 'E' }
        ]
    },
    shaman: {
        name: 'Tech Mage',
        spriteType: 'cyber-samurai',
        baseHP: 120,
        baseMP: 120,
        baseDamage: 18,
        baseDefense: 7,
        skills: [
            { name: 'Laser Beam', icon: '✨', damage: 25, mpCost: 12, cooldown: 2500, key: 'Q' },
            { name: 'Nano Heal', icon: '💚', heal: 40, mpCost: 20, cooldown: 5000, key: 'W' },
            { name: 'EMP Blast', icon: '⚡', damage: 45, mpCost: 28, cooldown: 7000, key: 'E' }
        ]
    },
    sura: {
        name: 'Void Knight',
        spriteType: 'cyber-samurai',
        baseHP: 130,
        baseMP: 100,
        baseDamage: 20,
        baseDefense: 8,
        skills: [
            { name: 'Dark Blade', icon: '🌑', damage: 28, mpCost: 14, cooldown: 2500, key: 'Q' },
            { name: 'Life Drain', icon: '💀', damage: 20, lifesteal: 0.5, mpCost: 18, cooldown: 4500, key: 'W' },
            { name: 'Void Surge', icon: '💜', damage: 55, mpCost: 32, cooldown: 8000, key: 'E' }
        ]
    }
};

// Mob types - CYBER ENEMIES
const MOB_TYPES = [
    { name: 'Cyber Wolf', spriteType: 'cyber-wolf', hp: 50, damage: 8, xp: 25, gold: 10, speed: 1.5, size: 80 },
    { name: 'Combat Drone', spriteType: 'combat-drone', hp: 60, damage: 10, xp: 30, gold: 15, speed: 1.2, size: 64 },
    { name: 'War Bot', spriteType: 'cyber-wolf', hp: 80, damage: 12, xp: 40, gold: 20, speed: 1.0, size: 80 },
    { name: 'Heavy Mech', spriteType: 'heavy-mech', hp: 120, damage: 15, xp: 60, gold: 30, speed: 0.8, size: 160 },
    { name: 'Titan Mech', spriteType: 'heavy-mech', hp: 200, damage: 25, xp: 100, gold: 50, speed: 0.6, size: 160 }
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

        // Initialize sprite engine
        this.spriteEngine = new SpriteEngine();

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

        // Animation tracking
        this.animationFrame = 0;
        this.animationSpeed = 0.15;

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
            spriteType: classData.spriteType,
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            size: 128, // Larger size for detailed sprites

            // Animation state
            direction: 'south',
            action: 'idle',
            animFrame: 0,
            lastMoveX: 0,
            lastMoveY: 0,

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

        const margin = 200;
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
            size: type.size || 80,
            targetCooldown: 0,
            // Animation state
            direction: 'south',
            animFrame: 0
        });
    }

    useSkill(index) {
        if (!this.player) return;

        const skill = this.player.skills[index];

        if (skill.cooldownRemaining > 0) return;
        if (this.player.mp < skill.mpCost) return;

        this.player.mp -= skill.mpCost;
        skill.cooldownRemaining = skill.cooldown;

        // Trigger attack animation
        if (skill.damage) {
            this.player.action = 'attack';
            this.player.animFrame = 0;

            // Reset to idle after animation
            setTimeout(() => {
                if (this.player && this.player.action === 'attack') {
                    this.player.action = 'idle';
                }
            }, 500);
        }

        // Skill effects
        if (skill.damage) {
            const nearestMob = this.findNearestMob();
            if (nearestMob) {
                const distance = this.getDistance(this.player, nearestMob);
                if (distance < 300) {
                    // Face the enemy
                    const dx = nearestMob.x - this.player.x;
                    const dy = nearestMob.y - this.player.y;
                    this.player.direction = this.getDirection(dx, dy);

                    // Deal damage with delay for animation
                    setTimeout(() => {
                        this.damageEnemy(nearestMob, skill.damage + this.player.damage);

                        if (skill.lifesteal) {
                            this.player.hp = Math.min(
                                this.player.maxHP,
                                this.player.hp + skill.damage * skill.lifesteal
                            );
                        }
                    }, 200);

                    // Create attack effect
                    this.createAttackEffect(nearestMob.x, nearestMob.y);
                }
            }
        }

        if (skill.heal) {
            this.player.hp = Math.min(this.player.maxHP, this.player.hp + skill.heal);
            this.createHealEffect(this.player.x, this.player.y);
        }

        this.updateHUD();
        this.updateSkillUI(index);
    }

    /**
     * Create visual attack effect
     */
    createAttackEffect(x, y) {
        const effect = document.createElement('div');
        effect.style.position = 'fixed';
        effect.style.left = x + 'px';
        effect.style.top = y + 'px';
        effect.style.width = '80px';
        effect.style.height = '80px';
        effect.style.borderRadius = '50%';
        effect.style.background = 'radial-gradient(circle, rgba(255,0,255,0.8) 0%, rgba(255,0,255,0) 70%)';
        effect.style.pointerEvents = 'none';
        effect.style.animation = 'expand 0.5s ease-out';
        effect.style.transform = 'translate(-50%, -50%)';

        document.body.appendChild(effect);

        setTimeout(() => effect.remove(), 500);
    }

    /**
     * Create visual heal effect
     */
    createHealEffect(x, y) {
        const effect = document.createElement('div');
        effect.style.position = 'fixed';
        effect.style.left = x + 'px';
        effect.style.top = y + 'px';
        effect.style.fontSize = '32px';
        effect.textContent = '💚';
        effect.style.pointerEvents = 'none';
        effect.style.animation = 'floatUp 1s ease-out';
        effect.style.transform = 'translate(-50%, -50%)';

        document.body.appendChild(effect);

        setTimeout(() => effect.remove(), 1000);
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

    /**
     * Get 8-directional direction from movement vector
     */
    getDirection(dx, dy) {
        if (dx === 0 && dy === 0) return this.player ? this.player.direction : 'south';

        const angle = Math.atan2(dy, dx);
        const degrees = angle * 180 / Math.PI;

        // Convert angle to 8 directions
        if (degrees >= -22.5 && degrees < 22.5) return 'east';
        if (degrees >= 22.5 && degrees < 67.5) return 'south-east';
        if (degrees >= 67.5 && degrees < 112.5) return 'south';
        if (degrees >= 112.5 && degrees < 157.5) return 'south-west';
        if (degrees >= 157.5 || degrees < -157.5) return 'west';
        if (degrees >= -157.5 && degrees < -112.5) return 'north-west';
        if (degrees >= -112.5 && degrees < -67.5) return 'north';
        if (degrees >= -67.5 && degrees < -22.5) return 'north-east';

        return 'south';
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

        // Update animation frame
        this.animationFrame += this.animationSpeed;

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

            this.player.x = Math.max(64, Math.min(this.canvas.width - 64, this.player.x + dx));
            this.player.y = Math.max(64, Math.min(this.canvas.height - 64, this.player.y + dy));

            // Update player direction based on movement (8 directions)
            this.player.direction = this.getDirection(dx, dy);
            this.player.action = 'walk';
            this.player.animFrame = Math.floor(this.animationFrame) % 8;

            this.player.lastMoveX = dx;
            this.player.lastMoveY = dy;
        } else {
            this.player.action = 'idle';
            this.player.animFrame = Math.floor(this.animationFrame * 0.5) % 8;
        }

        // Update mobs
        this.mobs.forEach(mob => {
            const dist = this.getDistance(this.player, mob);

            if (dist < 400) {
                const angle = Math.atan2(this.player.y - mob.y, this.player.x - mob.x);
                const moveX = Math.cos(angle) * mob.speed;
                const moveY = Math.sin(angle) * mob.speed;

                mob.x += moveX;
                mob.y += moveY;

                // Update mob direction
                mob.direction = this.getDirection(moveX, moveY);
                mob.animFrame = Math.floor(this.animationFrame) % 8;

                // Attack player
                if (dist < 80) {
                    if (mob.targetCooldown <= 0) {
                        const damage = Math.max(1, mob.damage - this.player.defense);
                        this.player.hp -= damage;
                        this.showDamage(this.player.x, this.player.y - 60, damage);
                        mob.targetCooldown = 1000;

                        if (this.player.hp <= 0) {
                            this.gameOver();
                        }

                        this.updateHUD();
                    }
                }
            } else {
                mob.animFrame = Math.floor(this.animationFrame * 0.3) % 8;
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
        // Background
        this.ctx.fillStyle = '#0a0e27';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Cyber grid with glow
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = 'rgba(0, 255, 255, 0.3)';

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

        this.ctx.shadowBlur = 0;

        // Drops (items)
        this.drops.forEach(drop => {
            // Item glow
            this.ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
            this.ctx.beginPath();
            this.ctx.arc(drop.x, drop.y, drop.size * 1.5, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.font = drop.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#ffd700';
            this.ctx.fillText(drop.icon, drop.x, drop.y);
            this.ctx.shadowBlur = 0;
        });

        // Draw mobs with sprites
        this.mobs.forEach(mob => {
            this.spriteEngine.drawCyberWolf(
                this.ctx,
                mob.x - mob.size / 2,
                mob.y - mob.size / 2,
                mob.direction || 'south',
                mob.animFrame || 0
            );

            // HP bar
            const barWidth = mob.size * 0.8;
            const barHeight = 6;
            const hpPercent = mob.hp / mob.maxHP;

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(mob.x - barWidth/2, mob.y - mob.size/2 - 15, barWidth, barHeight);

            // HP bar gradient
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
            this.ctx.fillRect(mob.x - barWidth/2, mob.y - mob.size/2 - 15, barWidth * hpPercent, barHeight);

            // HP bar glow
            this.ctx.strokeStyle = hpPercent > 0.5 ? '#4ade80' : hpPercent > 0.25 ? '#fbbf24' : '#ef4444';
            this.ctx.lineWidth = 1;
            this.ctx.shadowBlur = 5;
            this.ctx.shadowColor = this.ctx.strokeStyle;
            this.ctx.strokeRect(mob.x - barWidth/2, mob.y - mob.size/2 - 15, barWidth, barHeight);
            this.ctx.shadowBlur = 0;

            // Mob name
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '10px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.shadowBlur = 3;
            this.ctx.shadowColor = '#000000';
            this.ctx.fillText(mob.name, mob.x, mob.y - mob.size/2 - 25);
            this.ctx.shadowBlur = 0;
        });

        // Draw player with sprite
        if (this.player) {
            // Player glow aura
            const glowGradient = this.ctx.createRadialGradient(
                this.player.x, this.player.y, 0,
                this.player.x, this.player.y, this.player.size
            );
            glowGradient.addColorStop(0, 'rgba(0, 255, 255, 0.3)');
            glowGradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

            this.ctx.fillStyle = glowGradient;
            this.ctx.beginPath();
            this.ctx.arc(this.player.x, this.player.y, this.player.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw player sprite
            this.spriteEngine.drawCyberSamurai(
                this.ctx,
                this.player.x - this.player.size / 2,
                this.player.y - this.player.size / 2,
                this.player.direction,
                this.player.animFrame,
                this.player.action
            );

            // Player name tag
            this.ctx.fillStyle = '#00ffff';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.shadowBlur = 5;
            this.ctx.shadowColor = '#00ffff';
            this.ctx.fillText(this.player.name, this.player.x, this.player.y - this.player.size/2 - 20);
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
