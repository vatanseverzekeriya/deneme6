// Load assets
let CrystalMageAsset, ShadowWraithAsset, CrystalGolemAsset, VoidBeastAsset, EnvironmentAssets, SpriteRenderer, AnimatedSprite;

// Character Class (only Crystal Mage now)
const CLASSES = {
    mage: {
        name: 'Kristal Büyücü',
        baseHP: 120,
        baseMP: 150,
        baseDamage: 20,
        baseDefense: 8,
        baseSpeed: 3.5,
        skills: [
            { name: 'Kristal Işını', damage: 35, mpCost: 20, cooldown: 2500, key: 'Q', type: 'projectile' },
            { name: 'Büyü Kalkanı', defense: 25, duration: 3000, mpCost: 25, cooldown: 5000, key: 'W', type: 'buff' },
            { name: 'Ruh Patlaması', damage: 60, aoe: 150, mpCost: 40, cooldown: 8000, key: 'E', type: 'aoe' }
        ]
    }
};

// Enhanced Mob types with proper assets
const MOB_TYPES = [
    { name: 'Gölge Hayalet', asset: 'wraith', hp: 60, damage: 12, xp: 30, gold: 15, speed: 2.0 },
    { name: 'Kristal Golem', asset: 'golem', hp: 120, damage: 18, xp: 50, gold: 30, speed: 1.2 },
    { name: 'Karanlık Canavar', asset: 'beast', hp: 80, damage: 15, xp: 40, gold: 20, speed: 2.5 },
    { name: 'Güçlü Golem', asset: 'golem', hp: 180, damage: 25, xp: 80, gold: 50, speed: 1.0 },
    { name: 'Gölge Sürüsü', asset: 'wraith', hp: 50, damage: 10, xp: 25, gold: 12, speed: 2.8 }
];

// Enhanced Items
const ITEMS = [
    { name: 'Can İksiri', type: 'potion', heal: 60, asset: 'healthPotion' },
    { name: 'Mana İksiri', type: 'potion', mana: 60, asset: 'manaPotion' },
    { name: 'Altın', type: 'gold', value: 15, asset: 'gold' },
    { name: 'Büyük Can İksiri', type: 'potion', heal: 100, asset: 'healthPotion' },
    { name: 'Büyük Mana İksiri', type: 'potion', mana: 100, asset: 'manaPotion' }
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
        this.particles = [];
        this.inventory = Array(5).fill(null);

        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        this.camera = { x: 0, y: 0 };
        this.lastTime = Date.now();

        // Load assets
        this.loadAssets();
        this.setupControls();
    }

    async loadAssets() {
        // Wait for assets.js to load
        if (typeof window.CrystalMageAsset === 'undefined') {
            const script = document.createElement('script');
            script.src = 'assets.js';
            document.head.appendChild(script);

            await new Promise(resolve => {
                script.onload = resolve;
            });
        }

        // Assets are now globally available (loaded from assets.js)
        // No need to reassign, they're already in global scope
        this.assetsLoaded = true;
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    selectCharacter(className) {
        const classData = CLASSES['mage']; // Only Crystal Mage available

        this.player = {
            class: 'mage',
            name: classData.name,
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
            skills: classData.skills.map(s => ({...s, cooldownRemaining: 0})),

            gold: 0,
            attackCooldown: 0,

            // Animation state
            currentAnimation: 'idle',
            animationFrame: 0,
            animationTime: 0,
            direction: 'south',
            facingAngle: 0,

            // Buffs
            buffs: []
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
                <div class="skill-icon">${['✨', '🛡️', '💥'][index]}</div>
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

        // Spawn outside visible area
        const spawnDistance = 400;
        const angle = Math.random() * Math.PI * 2;
        const x = this.player.x + Math.cos(angle) * spawnDistance;
        const y = this.player.y + Math.sin(angle) * spawnDistance;

        this.mobs.push({
            ...type,
            x, y,
            maxHP: type.hp,
            size: 45,
            targetCooldown: 0,
            currentAnimation: 'idle',
            animationFrame: 0,
            animationTime: 0
        });
    }

    useSkill(index) {
        if (!this.player) return;

        const skill = this.player.skills[index];

        if (skill.cooldownRemaining > 0) return;
        if (this.player.mp < skill.mpCost) return;

        this.player.mp -= skill.mpCost;
        skill.cooldownRemaining = skill.cooldown;

        // Start cast animation
        this.player.currentAnimation = 'cast';
        this.player.animationFrame = 0;
        this.player.animationTime = 0;

        // Skill effects based on type
        if (skill.type === 'projectile') {
            // Crystal Ray projectile
            const nearestMob = this.findNearestMob();
            if (nearestMob) {
                const angle = Math.atan2(nearestMob.y - this.player.y, nearestMob.x - this.player.x);
                this.projectiles.push({
                    x: this.player.x,
                    y: this.player.y,
                    vx: Math.cos(angle) * 8,
                    vy: Math.sin(angle) * 8,
                    damage: skill.damage + this.player.damage,
                    size: 12,
                    color: '#a78bfa',
                    lifetime: 100
                });

                // Sparkle trail
                for (let i = 0; i < 5; i++) {
                    this.createParticle(this.player.x, this.player.y, '#c4b5fd', 3, angle);
                }
            }
        } else if (skill.type === 'buff') {
            // Shield buff
            this.player.buffs.push({
                type: 'defense',
                value: skill.defense,
                duration: skill.duration,
                remainingTime: skill.duration
            });

            // Shield particles
            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2;
                this.createParticle(
                    this.player.x + Math.cos(angle) * 30,
                    this.player.y + Math.sin(angle) * 30,
                    '#fbbf24',
                    4,
                    angle + Math.PI
                );
            }
        } else if (skill.type === 'aoe') {
            // AOE explosion
            this.player.currentAnimation = 'attack';
            this.player.animationFrame = 0;

            this.mobs.forEach(mob => {
                const distance = this.getDistance(this.player, mob);
                if (distance < skill.aoe) {
                    this.damageEnemy(mob, skill.damage + this.player.damage);

                    // Knockback
                    const angle = Math.atan2(mob.y - this.player.y, mob.x - this.player.x);
                    mob.x += Math.cos(angle) * 20;
                    mob.y += Math.sin(angle) * 20;
                }
            });

            // Explosion particles
            for (let i = 0; i < 30; i++) {
                const angle = Math.random() * Math.PI * 2;
                this.createParticle(this.player.x, this.player.y, '#a78bfa', 6, angle, Math.random() * 5 + 3);
            }

            // Shockwave
            this.particles.push({
                x: this.player.x,
                y: this.player.y,
                type: 'shockwave',
                radius: 0,
                maxRadius: skill.aoe,
                alpha: 1,
                lifetime: 30
            });
        }

        this.updateHUD();
        this.updateSkillUI(index);
    }

    createParticle(x, y, color, size, angle, speed = 3) {
        this.particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color,
            size,
            alpha: 1,
            lifetime: 30 + Math.random() * 20,
            type: 'spark'
        });
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
        enemy.currentAnimation = 'hurt';
        enemy.animationFrame = 0;

        this.showDamage(enemy.x, enemy.y, damage, '#ff4444');

        // Damage particles
        for (let i = 0; i < 5; i++) {
            const angle = Math.random() * Math.PI * 2;
            this.createParticle(enemy.x, enemy.y, '#ef4444', 3, angle);
        }

        if (enemy.hp <= 0) {
            this.killEnemy(enemy);
        }
    }

    killEnemy(enemy) {
        enemy.currentAnimation = 'death';
        enemy.animationFrame = 0;
        enemy.dying = true;

        // Death explosion particles
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            this.createParticle(enemy.x, enemy.y, '#7c3aed', 4, angle, 4);
        }

        // Remove after death animation
        setTimeout(() => {
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
            if (Math.random() < 0.5) {
                const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
                this.drops.push({
                    ...item,
                    x: enemy.x,
                    y: enemy.y,
                    size: 25,
                    bobTime: 0
                });
            }

            // Spawn new mob
            setTimeout(() => this.spawnMob(), 3000);

            this.updateHUD();
        }, 800);
    }

    levelUp() {
        this.player.level++;
        this.player.xp = 0;
        this.player.xpToLevel = Math.floor(this.player.xpToLevel * 1.5);

        this.player.maxHP += 25;
        this.player.hp = this.player.maxHP;
        this.player.maxMP += 15;
        this.player.mp = this.player.maxMP;
        this.player.damage += 4;
        this.player.defense += 2;

        // Level up effect
        for (let i = 0; i < 40; i++) {
            const angle = (i / 40) * Math.PI * 2;
            this.createParticle(this.player.x, this.player.y, '#ffd700', 5, angle, 6);
        }

        this.showNotification('✨ LEVEL UP! Seviye ' + this.player.level);
        this.updateHUD();
    }

    showDamage(x, y, damage, color = '#ff4444') {
        const dmg = document.createElement('div');
        dmg.className = 'damage-number';
        dmg.textContent = '-' + Math.floor(damage);
        dmg.style.left = x + 'px';
        dmg.style.top = y + 'px';
        dmg.style.color = color;
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
            if (!this.inventory[i] ||
                (this.inventory[i].name === drop.name && drop.type !== 'gold')) {

                if (drop.type === 'gold') {
                    this.player.gold += drop.value;
                } else {
                    this.inventory[i] = drop;
                }

                this.updateInventory();
                this.showNotification(`+${drop.type === 'gold' ? drop.value + ' ' : ''}${drop.name}`);

                // Pickup particles
                for (let j = 0; j < 8; j++) {
                    const angle = (j / 8) * Math.PI * 2;
                    this.createParticle(drop.x, drop.y, '#ffd700', 2, angle);
                }
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
                this.showNotification(`+${item.heal} HP`);
            }
            if (item.mana) {
                this.player.mp = Math.min(this.player.maxMP, this.player.mp + item.mana);
                this.showNotification(`+${item.mana} MP`);
            }

            // Heal particles
            for (let i = 0; i < 10; i++) {
                const angle = Math.random() * Math.PI * 2;
                this.createParticle(
                    this.player.x,
                    this.player.y,
                    item.heal ? '#4ade80' : '#60a5fa',
                    3,
                    angle
                );
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
                // Use text for inventory icons
                const icons = {
                    'Can İksiri': '❤️',
                    'Mana İksiri': '💙',
                    'Büyük Can İksiri': '❤️',
                    'Büyük Mana İksiri': '💙'
                };
                slot.innerHTML = icons[item.name] || '📦';
                slot.classList.add('has-item');
            } else {
                slot.innerHTML = '';
                slot.classList.remove('has-item');
            }
        });
    }

    update() {
        if (!this.player) return;

        const now = Date.now();
        const deltaTime = now - this.lastTime;
        this.lastTime = now;

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

        const isMoving = dx !== 0 || dy !== 0;

        if (isMoving) {
            const magnitude = Math.sqrt(dx * dx + dy * dy);
            dx = (dx / magnitude) * this.player.speed;
            dy = (dy / magnitude) * this.player.speed;

            this.player.x += dx;
            this.player.y += dy;

            // Update animation
            if (this.player.currentAnimation !== 'cast' &&
                this.player.currentAnimation !== 'attack' &&
                this.player.currentAnimation !== 'hurt') {
                this.player.currentAnimation = 'walk';
            }

            // Update facing direction
            this.player.facingAngle = Math.atan2(dy, dx);
        } else {
            if (this.player.currentAnimation === 'walk') {
                this.player.currentAnimation = 'idle';
            }
        }

        // Update animation frame
        this.player.animationTime += deltaTime;
        if (this.player.animationTime >= 100) {
            this.player.animationTime = 0;
            this.player.animationFrame++;

            // Reset certain animations
            if (this.player.currentAnimation === 'cast' && this.player.animationFrame >= 8) {
                this.player.currentAnimation = 'idle';
                this.player.animationFrame = 0;
            } else if (this.player.currentAnimation === 'attack' && this.player.animationFrame >= 6) {
                this.player.currentAnimation = 'idle';
                this.player.animationFrame = 0;
            } else if (this.player.currentAnimation === 'hurt' && this.player.animationFrame >= 3) {
                this.player.currentAnimation = 'idle';
                this.player.animationFrame = 0;
            }
        }

        // Update camera (follow player)
        this.camera.x = this.player.x - this.canvas.width / 2;
        this.camera.y = this.player.y - this.canvas.height / 2;

        // Update mobs
        this.mobs.forEach(mob => {
            if (mob.dying) return;

            const dist = this.getDistance(this.player, mob);

            if (dist < 600) {
                const angle = Math.atan2(this.player.y - mob.y, this.player.x - mob.x);
                mob.x += Math.cos(angle) * mob.speed;
                mob.y += Math.sin(angle) * mob.speed;

                mob.currentAnimation = 'walk';

                // Attack player
                if (dist < 60) {
                    if (mob.targetCooldown <= 0) {
                        const totalDefense = this.player.defense +
                            this.player.buffs.filter(b => b.type === 'defense')
                                .reduce((sum, b) => sum + b.value, 0);

                        const damage = Math.max(1, mob.damage - totalDefense);
                        this.player.hp -= damage;
                        this.player.currentAnimation = 'hurt';
                        this.player.animationFrame = 0;

                        this.showDamage(this.player.x, this.player.y - 40, damage, '#ff4444');
                        mob.targetCooldown = 1000;
                        mob.currentAnimation = 'attack';
                        mob.animationFrame = 0;

                        if (this.player.hp <= 0) {
                            this.gameOver();
                        }

                        this.updateHUD();
                    }
                }
            } else {
                mob.currentAnimation = 'idle';
            }

            if (mob.targetCooldown > 0) {
                mob.targetCooldown -= deltaTime;
            }

            // Update mob animation
            mob.animationTime = (mob.animationTime || 0) + deltaTime;
            if (mob.animationTime >= 100) {
                mob.animationTime = 0;
                mob.animationFrame = (mob.animationFrame + 1) % 8;
            }
        });

        // Update projectiles
        this.projectiles = this.projectiles.filter(proj => {
            proj.x += proj.vx;
            proj.y += proj.vy;
            proj.lifetime--;

            if (proj.lifetime <= 0) return false;

            // Check collision with mobs
            for (let mob of this.mobs) {
                if (mob.dying) continue;

                const dist = Math.sqrt((proj.x - mob.x) ** 2 + (proj.y - mob.y) ** 2);
                if (dist < mob.size / 2 + proj.size) {
                    this.damageEnemy(mob, proj.damage);

                    // Impact particles
                    for (let i = 0; i < 8; i++) {
                        const angle = Math.random() * Math.PI * 2;
                        this.createParticle(proj.x, proj.y, proj.color, 3, angle);
                    }

                    return false;
                }
            }

            return true;
        });

        // Update drops
        this.drops.forEach(drop => {
            drop.bobTime = (drop.bobTime || 0) + deltaTime / 1000;

            if (this.getDistance(this.player, drop) < 50) {
                // Magnet effect
                const angle = Math.atan2(this.player.y - drop.y, this.player.x - drop.x);
                drop.x += Math.cos(angle) * 3;
                drop.y += Math.sin(angle) * 3;

                if (this.getDistance(this.player, drop) < 30) {
                    this.pickupDrop(drop);
                }
            }
        });

        // Update particles
        this.particles = this.particles.filter(p => {
            if (p.type === 'shockwave') {
                p.radius += 5;
                p.alpha -= 0.03;
                p.lifetime--;
                return p.lifetime > 0 && p.alpha > 0;
            } else {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.1; // Gravity
                p.alpha -= 0.02;
                p.lifetime--;
                return p.lifetime > 0 && p.alpha > 0;
            }
        });

        // Update cooldowns
        this.player.skills.forEach(skill => {
            if (skill.cooldownRemaining > 0) {
                skill.cooldownRemaining -= deltaTime;
            }
        });

        // Update buffs
        this.player.buffs = this.player.buffs.filter(buff => {
            buff.remainingTime -= deltaTime;
            return buff.remainingTime > 0;
        });

        // MP regen
        if (this.player.mp < this.player.maxMP) {
            this.player.mp = Math.min(this.player.maxMP, this.player.mp + 0.05);
            if (Math.random() < 0.05) this.updateHUD();
        }
    }

    draw() {
        // Clear screen
        this.ctx.fillStyle = '#0a0e1a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid (parallax effect)
        this.ctx.strokeStyle = 'rgba(167, 139, 250, 0.05)';
        this.ctx.lineWidth = 1;

        const gridSize = 60;
        const offsetX = -this.camera.x % gridSize;
        const offsetY = -this.camera.y % gridSize;

        for (let x = offsetX; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = offsetY; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        // Draw ambient crystals in background
        const crystalPositions = [
            { x: 200, y: 200, size: 0.8, hue: 270 },
            { x: 600, y: 300, size: 1.2, hue: 200 },
            { x: -300, y: 400, size: 1.0, hue: 180 },
            { x: 400, y: -200, size: 0.9, hue: 280 }
        ];

        crystalPositions.forEach(crystal => {
            const screenX = crystal.x - this.camera.x;
            const screenY = crystal.y - this.camera.y;
            if (screenX > -100 && screenX < this.canvas.width + 100 &&
                screenY > -100 && screenY < this.canvas.height + 100) {
                if (typeof EnvironmentAssets !== 'undefined') {
                    EnvironmentAssets.crystal(this.ctx, screenX, screenY, crystal.size, crystal.hue);
                }
            }
        });

        // Draw drops
        this.drops.forEach(drop => {
            const screenX = drop.x - this.camera.x;
            const screenY = drop.y - this.camera.y;

            if (typeof EnvironmentAssets !== 'undefined' && EnvironmentAssets[drop.asset]) {
                EnvironmentAssets[drop.asset](this.ctx, screenX, screenY);
            }
        });

        // Draw mobs
        this.mobs.forEach(mob => {
            const screenX = mob.x - this.camera.x;
            const screenY = mob.y - this.camera.y;

            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(screenX, screenY + mob.size/2, mob.size/2.5, mob.size/5, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw mob asset
            if (mob.asset === 'wraith' && typeof ShadowWraithAsset !== 'undefined') {
                ShadowWraithAsset[mob.currentAnimation]?.render(this.ctx, screenX, screenY, mob.animationFrame);
            } else if (mob.asset === 'golem' && typeof CrystalGolemAsset !== 'undefined') {
                CrystalGolemAsset[mob.currentAnimation]?.render(this.ctx, screenX, screenY, mob.animationFrame);
            } else if (mob.asset === 'beast' && typeof VoidBeastAsset !== 'undefined') {
                VoidBeastAsset[mob.currentAnimation]?.render(this.ctx, screenX, screenY, mob.animationFrame);
            }

            if (!mob.dying) {
                // HP bar
                const barWidth = 50;
                const barHeight = 5;
                const hpPercent = mob.hp / mob.maxHP;

                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
                this.ctx.fillRect(screenX - barWidth/2, screenY - mob.size/2 - 10, barWidth, barHeight);

                this.ctx.fillStyle = hpPercent > 0.5 ? '#4ade80' : hpPercent > 0.25 ? '#fbbf24' : '#ef4444';
                this.ctx.fillRect(screenX - barWidth/2, screenY - mob.size/2 - 10, barWidth * hpPercent, barHeight);
            }
        });

        // Draw player
        if (this.player) {
            const screenX = this.player.x - this.camera.x;
            const screenY = this.player.y - this.camera.y;

            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(screenX, screenY + this.player.size/2, this.player.size/2.5, this.player.size/5, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw Crystal Mage
            if (typeof CrystalMageAsset !== 'undefined') {
                CrystalMageAsset[this.player.currentAnimation]?.render(
                    this.ctx,
                    screenX,
                    screenY,
                    this.player.animationFrame,
                    this.player.direction
                );
            }

            // Shield buff visual
            if (this.player.buffs.some(b => b.type === 'defense')) {
                this.ctx.strokeStyle = `rgba(251, 191, 36, ${0.3 + Math.sin(Date.now() / 200) * 0.3})`;
                this.ctx.lineWidth = 3;
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = '#fbbf24';
                this.ctx.beginPath();
                this.ctx.arc(screenX, screenY, this.player.size / 2 + 10, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.shadowBlur = 0;
            }
        }

        // Draw projectiles
        this.projectiles.forEach(proj => {
            const screenX = proj.x - this.camera.x;
            const screenY = proj.y - this.camera.y;

            this.ctx.save();
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = proj.color;

            // Outer glow
            this.ctx.fillStyle = proj.color + '66';
            this.ctx.beginPath();
            this.ctx.arc(screenX, screenY, proj.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Inner bright
            this.ctx.fillStyle = proj.color;
            this.ctx.beginPath();
            this.ctx.arc(screenX, screenY, proj.size / 2, 0, Math.PI * 2);
            this.ctx.fill();

            // White center
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(screenX, screenY, proj.size / 4, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        });

        // Draw particles
        this.particles.forEach(p => {
            const screenX = p.x - this.camera.x;
            const screenY = p.y - this.camera.y;

            this.ctx.save();
            this.ctx.globalAlpha = p.alpha;

            if (p.type === 'shockwave') {
                this.ctx.strokeStyle = '#a78bfa';
                this.ctx.lineWidth = 3;
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = '#a78bfa';
                this.ctx.beginPath();
                this.ctx.arc(screenX, screenY, p.radius, 0, Math.PI * 2);
                this.ctx.stroke();
            } else {
                this.ctx.shadowBlur = 8;
                this.ctx.shadowColor = p.color;
                this.ctx.fillStyle = p.color;
                this.ctx.beginPath();
                this.ctx.arc(screenX, screenY, p.size, 0, Math.PI * 2);
                this.ctx.fill();
            }

            this.ctx.restore();
        });
    }

    updateHUD() {
        if (!this.player) return;

        document.getElementById('playerName').textContent = this.player.name + ' 💎';
        document.getElementById('playerLevel').textContent = `Seviye: ${this.player.level} | Altın: ${this.player.gold}`;

        const hpPercent = (this.player.hp / this.player.maxHP) * 100;
        const mpPercent = (this.player.mp / this.player.maxMP) * 100;
        const xpPercent = (this.player.xp / this.player.xpToLevel) * 100;

        document.getElementById('hpBar').style.width = Math.max(0, hpPercent) + '%';
        document.getElementById('mpBar').style.width = Math.max(0, mpPercent) + '%';
        document.getElementById('xpBar').style.width = Math.max(0, xpPercent) + '%';

        document.getElementById('hpText').textContent =
            `HP: ${Math.floor(Math.max(0, this.player.hp))}/${this.player.maxHP}`;
        document.getElementById('mpText').textContent =
            `MP: ${Math.floor(Math.max(0, this.player.mp))}/${this.player.maxMP}`;
        document.getElementById('xpText').textContent =
            `XP: ${this.player.xp}/${this.player.xpToLevel}`;
    }

    gameOver() {
        this.player.currentAnimation = 'death';
        this.player.animationFrame = 0;

        setTimeout(() => {
            alert(`💀 Game Over!\n\n✨ Seviye: ${this.player.level}\n⚔️ Kazanılan XP: ${this.player.xp}\n💰 Toplanan Altın: ${this.player.gold}`);
            window.location.reload();
        }, 1500);
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
