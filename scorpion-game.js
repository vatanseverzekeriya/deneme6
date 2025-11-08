/**
 * Desert Scorpion Hunter RPG
 * Professional quality game engine with 8-directional movement
 */

// Animation Controller
class AnimationController {
    constructor() {
        this.currentAnim = 'idle';
        this.currentDirection = 's';
        this.frame = 0;
        this.frameTime = 0;
        this.frameDelay = 150; // ms per frame
        this.animations = {
            'idle': { frames: 2, speed: 500 },
            'walk': { frames: 4, speed: 150 },
            'attack': { frames: 4, speed: 100 },
            'hurt': { frames: 2, speed: 200 },
            'death': { frames: 4, speed: 200 }
        };
    }

    update(deltaTime, velocity) {
        // Determine animation based on velocity
        const isMoving = Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1;

        if (isMoving && this.currentAnim !== 'attack' && this.currentAnim !== 'hurt' && this.currentAnim !== 'death') {
            this.currentAnim = 'walk';

            // Update direction based on velocity
            const angle = Math.atan2(velocity.y, velocity.x);
            const dir = this.angleToDirection(angle);
            this.currentDirection = dir;
        } else if (!isMoving && this.currentAnim === 'walk') {
            this.currentAnim = 'idle';
        }

        // Update frame
        this.frameTime += deltaTime;
        const animData = this.animations[this.currentAnim];
        if (this.frameTime >= animData.speed) {
            this.frameTime = 0;
            this.frame = (this.frame + 1) % animData.frames;
        }
    }

    playAnimation(name, onComplete = null) {
        if (this.currentAnim !== name) {
            this.currentAnim = name;
            this.frame = 0;
            this.frameTime = 0;
            this.onComplete = onComplete;
        }
    }

    angleToDirection(angle) {
        // Convert radians to 8 directions
        const deg = angle * 180 / Math.PI;
        const normalizedDeg = (deg + 360) % 360;

        if (normalizedDeg >= 337.5 || normalizedDeg < 22.5) return 'e';
        if (normalizedDeg >= 22.5 && normalizedDeg < 67.5) return 'se';
        if (normalizedDeg >= 67.5 && normalizedDeg < 112.5) return 's';
        if (normalizedDeg >= 112.5 && normalizedDeg < 157.5) return 'sw';
        if (normalizedDeg >= 157.5 && normalizedDeg < 202.5) return 'w';
        if (normalizedDeg >= 202.5 && normalizedDeg < 247.5) return 'nw';
        if (normalizedDeg >= 247.5 && normalizedDeg < 292.5) return 'n';
        return 'ne';
    }

    reset() {
        this.currentAnim = 'idle';
        this.frame = 0;
        this.frameTime = 0;
    }
}

// Base Entity Class
class Entity {
    constructor(x, y, config) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.hp = config.maxHP;
        this.maxHP = config.maxHP;
        this.speed = config.speed || 2;
        this.radius = config.radius || 20;
        this.animator = new AnimationController();
        this.dead = false;
        this.attackCooldown = 0;
        this.hurtTime = 0;
    }

    update(deltaTime) {
        this.animator.update(deltaTime, { x: this.vx, y: this.vy });

        // Apply velocity
        this.x += this.vx * deltaTime / 16;
        this.y += this.vy * deltaTime / 16;

        // Update timers
        if (this.attackCooldown > 0) {
            this.attackCooldown -= deltaTime;
        }
        if (this.hurtTime > 0) {
            this.hurtTime -= deltaTime;
        }
    }

    takeDamage(amount) {
        if (this.dead || this.hurtTime > 0) return false;

        this.hp -= amount;
        this.hurtTime = 500;
        this.animator.playAnimation('hurt');

        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
            return true;
        }
        return false;
    }

    die() {
        this.dead = true;
        this.animator.playAnimation('death');
    }

    isAlive() {
        return !this.dead && this.hp > 0;
    }

    getDirection() {
        return this.animator.currentDirection;
    }

    getBounds() {
        return {
            x: this.x - this.radius,
            y: this.y - this.radius,
            width: this.radius * 2,
            height: this.radius * 2
        };
    }
}

// Player Class
class Player extends Entity {
    constructor(x, y) {
        super(x, y, {
            maxHP: 100,
            speed: 3,
            radius: 24
        });

        this.level = 1;
        this.xp = 0;
        this.xpToLevel = 100;

        this.mp = 100;
        this.maxMP = 100;

        this.damage = 15;
        this.defense = 5;

        this.gold = 0;
        this.inventory = [];
        this.equipment = {
            weapon: null,
            armor: null
        };

        this.skills = [
            { name: 'Quick Strike', key: 'Q', damage: 25, mpCost: 10, cooldown: 2000, cooldownRemaining: 0 },
            { name: 'Poison Blade', key: 'W', damage: 15, poison: 5, mpCost: 20, cooldown: 5000, cooldownRemaining: 0 },
            { name: 'Whirlwind', key: 'E', damage: 40, aoe: true, mpCost: 35, cooldown: 8000, cooldownRemaining: 0 }
        ];
    }

    update(deltaTime) {
        super.update(deltaTime);

        // MP regeneration
        if (this.mp < this.maxMP) {
            this.mp = Math.min(this.maxMP, this.mp + deltaTime * 0.02);
        }

        // Update skill cooldowns
        this.skills.forEach(skill => {
            if (skill.cooldownRemaining > 0) {
                skill.cooldownRemaining -= deltaTime;
            }
        });
    }

    useSkill(index) {
        const skill = this.skills[index];
        if (!skill) return null;

        if (skill.cooldownRemaining > 0 || this.mp < skill.mpCost) {
            return null;
        }

        this.mp -= skill.mpCost;
        skill.cooldownRemaining = skill.cooldown;

        return {
            ...skill,
            direction: this.getDirection(),
            x: this.x,
            y: this.y
        };
    }

    gainXP(amount) {
        this.xp += amount;
        if (this.xp >= this.xpToLevel) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.xp -= this.xpToLevel;
        this.xpToLevel = Math.floor(this.xpToLevel * 1.5);

        // Stat increases
        this.maxHP += 20;
        this.hp = this.maxHP;
        this.maxMP += 15;
        this.mp = this.maxMP;
        this.damage += 3;
        this.defense += 2;

        return true;
    }

    addItem(item) {
        this.inventory.push(item);
    }
}

// Scorpion Enemy Class
class Scorpion extends Entity {
    constructor(x, y, variant) {
        const configs = {
            'baby': { maxHP: 30, speed: 1.8, damage: 5, xp: 15, gold: 5, radius: 16 },
            'soldier': { maxHP: 50, speed: 1.5, damage: 10, xp: 25, gold: 10, radius: 20 },
            'warrior': { maxHP: 80, speed: 1.3, damage: 15, xp: 40, gold: 20, radius: 24 },
            'giant': { maxHP: 150, speed: 1.0, damage: 25, xp: 75, gold: 40, radius: 32 },
            'alpha': { maxHP: 250, speed: 0.9, damage: 35, xp: 120, gold: 80, radius: 40 },
            'boss': { maxHP: 500, speed: 0.7, damage: 50, xp: 300, gold: 200, radius: 50 }
        };

        const config = configs[variant] || configs['soldier'];
        super(x, y, config);

        this.variant = variant;
        this.damage = config.damage;
        this.xpReward = config.xp;
        this.goldReward = config.gold;

        this.aggroRange = 300;
        this.attackRange = 40;
        this.target = null;
        this.wanderTime = 0;
        this.wanderDirection = { x: 0, y: 0 };

        // Special abilities
        this.poisonDamage = variant === 'boss' || variant === 'alpha' ? 3 : 1;
        this.canPoisonAttack = Math.random() < 0.3;
    }

    update(deltaTime, player) {
        if (this.dead) {
            super.update(deltaTime);
            return;
        }

        const distToPlayer = Math.hypot(player.x - this.x, player.y - this.y);

        // AI Behavior
        if (distToPlayer < this.aggroRange) {
            this.target = player;

            // Move towards player
            if (distToPlayer > this.attackRange) {
                const angle = Math.atan2(player.y - this.y, player.x - this.x);
                this.vx = Math.cos(angle) * this.speed;
                this.vy = Math.sin(angle) * this.speed;
            } else {
                // In attack range
                this.vx = 0;
                this.vy = 0;

                if (this.attackCooldown <= 0) {
                    this.attack(player);
                }
            }
        } else {
            // Wander behavior
            this.target = null;
            this.wanderTime -= deltaTime;

            if (this.wanderTime <= 0) {
                this.wanderTime = 2000 + Math.random() * 3000;
                const angle = Math.random() * Math.PI * 2;
                this.wanderDirection = {
                    x: Math.cos(angle) * this.speed * 0.3,
                    y: Math.sin(angle) * this.speed * 0.3
                };
            }

            this.vx = this.wanderDirection.x;
            this.vy = this.wanderDirection.y;
        }

        super.update(deltaTime);
    }

    attack(player) {
        this.attackCooldown = 1500;
        this.animator.playAnimation('attack');

        const actualDamage = Math.max(1, this.damage - player.defense);
        player.takeDamage(actualDamage);

        // Poison attack chance
        if (this.canPoisonAttack) {
            return {
                type: 'poison',
                damage: this.poisonDamage,
                duration: 3000
            };
        }

        return null;
    }
}

// Particle System
class Particle {
    constructor(x, y, type, config = {}) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.life = config.life || 1000;
        this.maxLife = this.life;
        this.vx = config.vx || (Math.random() - 0.5) * 2;
        this.vy = config.vy || (Math.random() - 0.5) * 2;
        this.color = config.color || '#FFD700';
        this.size = config.size || 5;
        this.gravity = config.gravity || 0;
    }

    update(deltaTime) {
        this.life -= deltaTime;
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        return this.life > 0;
    }

    draw(ctx) {
        const alpha = this.life / this.maxLife;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Main Game Class
class DesertScorpionGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.spriteRenderer = new SpriteRenderer();

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Game state
        this.player = null;
        this.enemies = [];
        this.particles = [];
        this.environment = [];
        this.droppedItems = [];

        // Camera
        this.camera = { x: 0, y: 0 };

        // World
        this.worldWidth = 2000;
        this.worldHeight = 2000;

        // Controls
        this.keys = {};
        this.joystick = {
            active: false,
            x: 0,
            y: 0,
            power: 0,
            angle: 0
        };

        // Time
        this.lastTime = 0;
        this.gameRunning = false;

        // UI
        this.damageNumbers = [];

        this.setupControls();
        this.generateWorld();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupControls() {
        // Keyboard
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;

            // Skills
            if (e.key.toLowerCase() === 'q') this.useSkill(0);
            if (e.key.toLowerCase() === 'w') this.useSkill(1);
            if (e.key.toLowerCase() === 'e') this.useSkill(2);

            // Potions
            if (e.key >= '1' && e.key <= '9') {
                this.useItem(parseInt(e.key) - 1);
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        // Joystick
        this.setupJoystick();
    }

    setupJoystick() {
        const joystickEl = document.getElementById('joystick');
        const stickEl = document.getElementById('joystickStick');

        const handleStart = (e) => {
            e.preventDefault();
            this.joystick.active = true;
        };

        const handleMove = (e) => {
            if (!this.joystick.active) return;
            e.preventDefault();

            const touch = e.touches ? e.touches[0] : e;
            const rect = joystickEl.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = touch.clientX - centerX;
            const deltaY = touch.clientY - centerY;

            const distance = Math.min(Math.hypot(deltaX, deltaY), 50);
            this.joystick.angle = Math.atan2(deltaY, deltaX);
            this.joystick.power = distance / 50;

            const stickX = Math.cos(this.joystick.angle) * distance;
            const stickY = Math.sin(this.joystick.angle) * distance;

            stickEl.style.transform = `translate(calc(-50% + ${stickX}px), calc(-50% + ${stickY}px))`;
        };

        const handleEnd = (e) => {
            e.preventDefault();
            this.joystick.active = false;
            this.joystick.power = 0;
            stickEl.style.transform = 'translate(-50%, -50%)';
        };

        joystickEl.addEventListener('touchstart', handleStart);
        joystickEl.addEventListener('touchmove', handleMove);
        joystickEl.addEventListener('touchend', handleEnd);
        joystickEl.addEventListener('mousedown', handleStart);
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
    }

    generateWorld() {
        // Generate environment objects
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * this.worldWidth;
            const y = Math.random() * this.worldHeight;

            const rand = Math.random();
            let type;
            if (rand < 0.4) type = 'cactus';
            else if (rand < 0.7) type = 'rock';
            else if (rand < 0.85) type = 'sand_dune';
            else if (rand < 0.92) type = 'skull';
            else if (rand < 0.97) type = 'oasis';
            else type = 'pyramid';

            this.environment.push({
                x, y,
                type,
                variant: Math.floor(Math.random() * 3)
            });
        }

        // Sort by y for proper rendering
        this.environment.sort((a, b) => a.y - b.y);
    }

    startGame() {
        // Create player
        this.player = new Player(this.worldWidth / 2, this.worldHeight / 2);

        // Spawn initial enemies
        for (let i = 0; i < 15; i++) {
            this.spawnEnemy();
        }

        this.gameRunning = true;
        this.updateHUD();

        // Hide character select
        document.getElementById('charSelect').classList.add('hidden');
        document.getElementById('gameScreen').classList.add('active');

        // Start game loop
        this.lastTime = performance.now();
        this.gameLoop();
    }

    spawnEnemy() {
        // Random position away from player
        let x, y;
        do {
            x = Math.random() * this.worldWidth;
            y = Math.random() * this.worldHeight;
        } while (this.player && Math.hypot(x - this.player.x, y - this.player.y) < 200);

        // Variant based on player level
        const variants = ['baby', 'soldier', 'warrior', 'giant', 'alpha', 'boss'];
        const maxVariantIndex = Math.min(Math.floor(this.player.level / 3), variants.length - 2);
        const variantIndex = Math.floor(Math.random() * (maxVariantIndex + 1));
        const variant = variants[variantIndex];

        const scorpion = new Scorpion(x, y, variant);
        this.enemies.push(scorpion);
    }

    useSkill(index) {
        if (!this.player || !this.player.isAlive()) return;

        const skillData = this.player.useSkill(index);
        if (!skillData) return;

        // Execute skill effect
        if (skillData.aoe) {
            // AoE damage
            this.enemies.forEach(enemy => {
                const dist = Math.hypot(enemy.x - this.player.x, enemy.y - this.player.y);
                if (dist < 150 && enemy.isAlive()) {
                    this.damageEnemy(enemy, skillData.damage);
                }
            });

            // Create particle effect
            for (let i = 0; i < 30; i++) {
                const angle = (i / 30) * Math.PI * 2;
                this.particles.push(new Particle(
                    this.player.x + Math.cos(angle) * 100,
                    this.player.y + Math.sin(angle) * 100,
                    'attack',
                    { color: '#FFD700', life: 500, size: 4 }
                ));
            }
        } else {
            // Single target damage
            const nearest = this.findNearestEnemy();
            if (nearest && Math.hypot(nearest.x - this.player.x, nearest.y - this.player.y) < 200) {
                this.damageEnemy(nearest, skillData.damage);

                if (skillData.poison) {
                    // Apply poison effect
                    nearest.poisonDamage = skillData.poison;
                    nearest.poisonDuration = 3000;
                }
            }
        }

        this.updateHUD();
    }

    findNearestEnemy() {
        let nearest = null;
        let minDist = Infinity;

        this.enemies.forEach(enemy => {
            if (!enemy.isAlive()) return;
            const dist = Math.hypot(enemy.x - this.player.x, enemy.y - this.player.y);
            if (dist < minDist) {
                minDist = dist;
                nearest = enemy;
            }
        });

        return nearest;
    }

    damageEnemy(enemy, damage) {
        const killed = enemy.takeDamage(damage);

        // Show damage number
        this.showDamage(enemy.x, enemy.y - 30, damage, '#FF4444');

        // Create hit particles
        for (let i = 0; i < 5; i++) {
            this.particles.push(new Particle(
                enemy.x,
                enemy.y,
                'blood',
                { color: '#DC143C', life: 300, size: 3 }
            ));
        }

        if (killed) {
            this.onEnemyKilled(enemy);
        }
    }

    onEnemyKilled(enemy) {
        this.player.gainXP(enemy.xpReward);
        this.player.gold += enemy.goldReward;

        // Drop loot
        if (Math.random() < 0.4) {
            const lootTypes = [
                { type: 'health', name: 'Health Potion', heal: 50, color: '#FF4444' },
                { type: 'mana', name: 'Mana Potion', mana: 50, color: '#4444FF' },
                { type: 'gold', name: 'Gold', value: 20, color: '#FFD700' }
            ];

            const loot = lootTypes[Math.floor(Math.random() * lootTypes.length)];
            this.droppedItems.push({
                ...loot,
                x: enemy.x,
                y: enemy.y,
                pickupRadius: 30
            });
        }

        // Death particles
        for (let i = 0; i < 20; i++) {
            this.particles.push(new Particle(
                enemy.x,
                enemy.y,
                'death',
                {
                    color: '#8B4513',
                    life: 1000,
                    size: 4,
                    gravity: 0.1
                }
            ));
        }

        // Remove enemy after death animation
        setTimeout(() => {
            const index = this.enemies.indexOf(enemy);
            if (index > -1) {
                this.enemies.splice(index, 1);
                this.spawnEnemy(); // Spawn new enemy
            }
        }, 1000);

        this.updateHUD();
    }

    showDamage(x, y, damage, color) {
        this.damageNumbers.push({
            x, y,
            damage,
            color,
            life: 1000,
            maxLife: 1000
        });
    }

    useItem(index) {
        // Implement item usage
        if (!this.player || !this.player.inventory[index]) return;

        const item = this.player.inventory[index];

        if (item.heal) {
            this.player.hp = Math.min(this.player.maxHP, this.player.hp + item.heal);
        }
        if (item.mana) {
            this.player.mp = Math.min(this.player.maxMP, this.player.mp + item.mana);
        }

        this.player.inventory.splice(index, 1);
        this.updateHUD();
    }

    update(deltaTime) {
        if (!this.gameRunning || !this.player) return;

        // Update player movement
        let dx = 0, dy = 0;

        if (this.keys['arrowleft'] || this.keys['a']) dx -= 1;
        if (this.keys['arrowright'] || this.keys['d']) dx += 1;
        if (this.keys['arrowup'] || this.keys['w']) dy -= 1;
        if (this.keys['arrowdown'] || this.keys['s']) dy += 1;

        // Joystick
        if (this.joystick.active) {
            dx = Math.cos(this.joystick.angle) * this.joystick.power;
            dy = Math.sin(this.joystick.angle) * this.joystick.power;
        }

        // Normalize and apply
        if (dx !== 0 || dy !== 0) {
            const magnitude = Math.hypot(dx, dy);
            this.player.vx = (dx / magnitude) * this.player.speed;
            this.player.vy = (dy / magnitude) * this.player.speed;
        } else {
            this.player.vx = 0;
            this.player.vy = 0;
        }

        // Keep player in bounds
        this.player.x = Math.max(50, Math.min(this.worldWidth - 50, this.player.x));
        this.player.y = Math.max(50, Math.min(this.worldHeight - 50, this.player.y));

        // Update player
        this.player.update(deltaTime);

        // Update enemies
        this.enemies.forEach(enemy => {
            enemy.update(deltaTime, this.player);
        });

        // Update particles
        this.particles = this.particles.filter(p => p.update(deltaTime));

        // Update damage numbers
        this.damageNumbers = this.damageNumbers.filter(dn => {
            dn.life -= deltaTime;
            dn.y -= 1;
            return dn.life > 0;
        });

        // Check item pickups
        this.droppedItems = this.droppedItems.filter(item => {
            const dist = Math.hypot(item.x - this.player.x, item.y - this.player.y);
            if (dist < item.pickupRadius) {
                this.player.addItem(item);
                this.showNotification(`Picked up ${item.name}`);
                return false;
            }
            return true;
        });

        // Update camera (follow player)
        this.camera.x = this.player.x - this.canvas.width / 2;
        this.camera.y = this.player.y - this.canvas.height / 2;
    }

    draw() {
        // Clear
        this.ctx.fillStyle = '#D4B896';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Desert sand texture
        this.ctx.fillStyle = '#C9A876';
        for (let i = 0; i < 100; i++) {
            const x = (Math.sin(i) * this.worldWidth) % this.canvas.width;
            const y = (Math.cos(i) * this.worldHeight) % this.canvas.height;
            this.ctx.fillRect(x, y, 2, 2);
        }

        this.ctx.save();
        this.ctx.translate(-this.camera.x, -this.camera.y);

        // Draw environment
        this.environment.forEach(env => {
            if (!this.isOnScreen(env.x, env.y, 128)) return;

            const sprite = this.spriteRenderer.drawEnvironment(env.type, env.variant);
            this.ctx.drawImage(sprite, env.x - 64, env.y - 64);
        });

        // Draw dropped items
        this.droppedItems.forEach(item => {
            if (!this.isOnScreen(item.x, item.y, 32)) return;

            this.ctx.fillStyle = item.color;
            this.ctx.beginPath();
            this.ctx.arc(item.x, item.y, 12, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.strokeStyle = '#FFD700';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });

        // Draw enemies
        this.enemies.forEach(enemy => {
            if (!this.isOnScreen(enemy.x, enemy.y, enemy.radius * 2)) return;

            const sprite = this.spriteRenderer.drawScorpion(
                enemy.variant,
                enemy.getDirection(),
                enemy.animator.frame,
                enemy.animator.currentAnim
            );

            this.ctx.drawImage(sprite, enemy.x - sprite.width / 2, enemy.y - sprite.height / 2);

            // HP bar
            this.drawHPBar(enemy.x, enemy.y - enemy.radius - 10, enemy.hp, enemy.maxHP);
        });

        // Draw player
        if (this.player && this.player.isAlive()) {
            const sprite = this.spriteRenderer.drawDesertHunter(
                this.player.getDirection(),
                this.player.animator.frame,
                this.player.animator.currentAnim
            );

            this.ctx.drawImage(sprite, this.player.x - sprite.width / 2, this.player.y - sprite.height / 2);
        }

        // Draw particles
        this.particles.forEach(p => p.draw(this.ctx));

        // Draw damage numbers
        this.damageNumbers.forEach(dn => {
            const alpha = dn.life / dn.maxLife;
            this.ctx.globalAlpha = alpha;
            this.ctx.font = 'bold 24px Arial';
            this.ctx.fillStyle = dn.color;
            this.ctx.strokeStyle = '#000';
            this.ctx.lineWidth = 3;
            this.ctx.strokeText('-' + dn.damage, dn.x, dn.y);
            this.ctx.fillText('-' + dn.damage, dn.x, dn.y);
            this.ctx.globalAlpha = 1;
        });

        this.ctx.restore();
    }

    drawHPBar(x, y, hp, maxHP) {
        const width = 40;
        const height = 5;
        const percent = hp / maxHP;

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(x - width / 2, y, width, height);

        this.ctx.fillStyle = percent > 0.5 ? '#4ade80' : percent > 0.25 ? '#fbbf24' : '#ef4444';
        this.ctx.fillRect(x - width / 2, y, width * percent, height);
    }

    isOnScreen(x, y, margin = 0) {
        return x > this.camera.x - margin &&
               x < this.camera.x + this.canvas.width + margin &&
               y > this.camera.y - margin &&
               y < this.camera.y + this.canvas.height + margin;
    }

    updateHUD() {
        if (!this.player) return;

        document.getElementById('playerName').textContent = 'Desert Hunter';
        document.getElementById('playerLevel').textContent = `Level: ${this.player.level} | Gold: ${this.player.gold}`;

        const hpPercent = (this.player.hp / this.player.maxHP) * 100;
        const mpPercent = (this.player.mp / this.player.maxMP) * 100;
        const xpPercent = (this.player.xp / this.player.xpToLevel) * 100;

        document.getElementById('hpBar').style.width = hpPercent + '%';
        document.getElementById('mpBar').style.width = mpPercent + '%';
        document.getElementById('xpBar').style.width = xpPercent + '%';

        document.getElementById('hpText').textContent = `HP: ${Math.floor(this.player.hp)}/${this.player.maxHP}`;
        document.getElementById('mpText').textContent = `MP: ${Math.floor(this.player.mp)}/${this.player.maxMP}`;
        document.getElementById('xpText').textContent = `XP: ${this.player.xp}/${this.player.xpToLevel}`;

        // Update skill cooldowns
        this.player.skills.forEach((skill, index) => {
            const btn = document.getElementById(`skill${index}`);
            if (!btn) return;

            if (skill.cooldownRemaining > 0 || this.player.mp < skill.mpCost) {
                btn.classList.add('cooldown');
                btn.style.opacity = '0.5';
            } else {
                btn.classList.remove('cooldown');
                btn.style.opacity = '1';
            }
        });
    }

    showNotification(text) {
        const notif = document.getElementById('lootNotif');
        notif.textContent = text;
        notif.style.display = 'flex';

        setTimeout(() => {
            notif.style.display = 'none';
        }, 2000);
    }

    gameLoop() {
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.draw();

        if (this.gameRunning) {
            requestAnimationFrame(() => this.gameLoop());
        }
    }
}

// Initialize game
let game;

function startGame() {
    game = new DesertScorpionGame();
    game.startGame();

    // Create skill buttons
    const skillsDiv = document.getElementById('skills');
    skillsDiv.innerHTML = '';

    game.player.skills.forEach((skill, index) => {
        const btn = document.createElement('div');
        btn.className = 'skill-btn';
        btn.id = `skill${index}`;
        btn.innerHTML = `
            <div class="skill-icon">⚔️</div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-key">${skill.key}</div>
        `;
        btn.onclick = () => game.useSkill(index);
        skillsDiv.appendChild(btn);
    });
}
