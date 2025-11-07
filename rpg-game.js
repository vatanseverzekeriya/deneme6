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

        // Off-screen canvas for grid (performance optimization)
        this.gridCanvas = document.createElement('canvas');
        this.gridCtx = this.gridCanvas.getContext('2d');

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.player = null;
        this.mobs = [];
        this.drops = [];
        this.inventory = Array(5).fill(null);
        this.particles = [];

        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        // Frame timing
        this.lastTime = 0;

        // Combo system
        this.combo = 0;
        this.comboTimer = 0;
        this.comboTimeout = 3000; // 3 seconds to continue combo

        // Camera shake
        this.cameraShake = 0;
        this.cameraX = 0;
        this.cameraY = 0;

        // Character animation
        this.playerBobOffset = 0;
        this.playerTrail = [];

        // Audio context
        this.audioContext = null;
        this.initAudio();

        this.setupControls();
    }

    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    playSound(type) {
        if (!this.audioContext) return;

        const ctx = this.audioContext;
        const now = ctx.currentTime;

        switch(type) {
            case 'hit':
                const hitOsc = ctx.createOscillator();
                const hitGain = ctx.createGain();
                hitOsc.connect(hitGain);
                hitGain.connect(ctx.destination);
                hitOsc.frequency.setValueAtTime(200, now);
                hitOsc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
                hitGain.gain.setValueAtTime(0.3, now);
                hitGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                hitOsc.start(now);
                hitOsc.stop(now + 0.1);
                break;

            case 'skill':
                const skillOsc = ctx.createOscillator();
                const skillGain = ctx.createGain();
                skillOsc.connect(skillGain);
                skillGain.connect(ctx.destination);
                skillOsc.type = 'sawtooth';
                skillOsc.frequency.setValueAtTime(400, now);
                skillOsc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
                skillGain.gain.setValueAtTime(0.2, now);
                skillGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                skillOsc.start(now);
                skillOsc.stop(now + 0.2);
                break;

            case 'levelup':
                for (let i = 0; i < 3; i++) {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.frequency.setValueAtTime(440 * (i + 1), now + i * 0.1);
                    gain.gain.setValueAtTime(0.2, now + i * 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.3);
                    osc.start(now + i * 0.1);
                    osc.stop(now + i * 0.1 + 0.3);
                }
                break;

            case 'pickup':
                const pickOsc = ctx.createOscillator();
                const pickGain = ctx.createGain();
                pickOsc.connect(pickGain);
                pickGain.connect(ctx.destination);
                pickOsc.frequency.setValueAtTime(800, now);
                pickOsc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
                pickGain.gain.setValueAtTime(0.15, now);
                pickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                pickOsc.start(now);
                pickOsc.stop(now + 0.1);
                break;

            case 'death':
                const deathOsc = ctx.createOscillator();
                const deathGain = ctx.createGain();
                deathOsc.connect(deathGain);
                deathGain.connect(ctx.destination);
                deathOsc.frequency.setValueAtTime(400, now);
                deathOsc.frequency.exponentialRampToValueAtTime(100, now + 0.5);
                deathGain.gain.setValueAtTime(0.3, now);
                deathGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                deathOsc.start(now);
                deathOsc.stop(now + 0.5);
                break;
        }
    }

    shakeCamera(intensity) {
        this.cameraShake = intensity;
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Render grid to off-screen canvas (performance optimization)
        this.gridCanvas.width = this.canvas.width;
        this.gridCanvas.height = this.canvas.height;

        this.gridCtx.fillStyle = '#1a1a2e';
        this.gridCtx.fillRect(0, 0, this.gridCanvas.width, this.gridCanvas.height);

        this.gridCtx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        this.gridCtx.lineWidth = 1;
        for (let x = 0; x < this.gridCanvas.width; x += 50) {
            this.gridCtx.beginPath();
            this.gridCtx.moveTo(x, 0);
            this.gridCtx.lineTo(x, this.gridCanvas.height);
            this.gridCtx.stroke();
        }
        for (let y = 0; y < this.gridCanvas.height; y += 50) {
            this.gridCtx.beginPath();
            this.gridCtx.moveTo(0, y);
            this.gridCtx.lineTo(this.gridCanvas.width, y);
            this.gridCtx.stroke();
        }
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
            killCount: 0
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

        // Haptic feedback and sound on skill use
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
        this.playSound('skill');

        // Skill visual effects based on skill type
        let skillColor = '#667eea';
        if (skill.name.includes('Karanlık') || skill.name.includes('Kara') || skill.name.includes('Ruh')) {
            skillColor = '#9333ea'; // Purple for dark magic
        } else if (skill.name.includes('İyileştirme')) {
            skillColor = '#10b981'; // Green for healing
        } else if (skill.name.includes('Yıldırım') || skill.name.includes('Işın')) {
            skillColor = '#3b82f6'; // Blue for magic
        } else if (skill.name.includes('Kalkan')) {
            skillColor = '#f59e0b'; // Orange for shield
        }

        // Create skill cast particles
        this.createParticles(this.player.x, this.player.y, 15, skillColor);

        // Skill effects
        if (skill.damage) {
            const nearestMob = this.findNearestMob();
            if (nearestMob) {
                const distance = this.getDistance(this.player, nearestMob);
                if (distance < 300) {
                    // Create projectile trail particles
                    const steps = 10;
                    for (let i = 0; i < steps; i++) {
                        const t = i / steps;
                        const x = this.player.x + (nearestMob.x - this.player.x) * t;
                        const y = this.player.y + (nearestMob.y - this.player.y) * t;
                        setTimeout(() => {
                            this.createParticles(x, y, 3, skillColor);
                        }, i * 20);
                    }

                    this.damageEnemy(nearestMob, skill.damage + this.player.damage);

                    if (skill.lifesteal) {
                        this.player.hp = Math.min(
                            this.player.maxHP,
                            this.player.hp + skill.damage * skill.lifesteal
                        );
                        // Lifesteal visual effect
                        this.createParticles(this.player.x, this.player.y, 10, '#10b981');
                    }
                }
            }
        }

        if (skill.heal) {
            this.player.hp = Math.min(this.player.maxHP, this.player.hp + skill.heal);
            // Healing visual effect
            this.createParticles(this.player.x, this.player.y, 20, '#10b981');
            this.shakeCamera(2);
        }

        this.updateHUD();
        this.updateSkillUI(index);
    }

    updateSkillUI(index) {
        const btn = document.getElementById(`skill${index}`);
        const skill = this.player.skills[index];

        btn.classList.add('cooldown');

        // Clear any existing interval to prevent memory leaks
        if (skill.cooldownInterval) {
            clearInterval(skill.cooldownInterval);
        }

        const overlay = document.createElement('div');
        overlay.className = 'cooldown-overlay';
        overlay.textContent = Math.ceil(skill.cooldownRemaining / 1000);
        btn.appendChild(overlay);

        skill.cooldownInterval = setInterval(() => {
            const remaining = Math.ceil(skill.cooldownRemaining / 1000);
            overlay.textContent = remaining;

            if (remaining <= 0) {
                btn.classList.remove('cooldown');
                overlay.remove();
                clearInterval(skill.cooldownInterval);
                skill.cooldownInterval = null;
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

    createParticles(x, y, count, color, type = 'circle') {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
            const speed = 2 + Math.random() * 3;
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1, // Slight upward bias
                life: 1.0,
                color: color || '#ffd700',
                size: 3 + Math.random() * 3,
                type: type,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2
            });
        }
    }

    damageEnemy(enemy, damage) {
        enemy.hp -= damage;
        this.showDamage(enemy.x, enemy.y, damage);

        // Create hit particles
        this.createParticles(enemy.x, enemy.y, 8, '#ff6b6b');

        // Play hit sound and shake camera
        this.playSound('hit');
        this.shakeCamera(3);

        if (enemy.hp <= 0) {
            this.killEnemy(enemy);
        }
    }

    killEnemy(enemy) {
        const index = this.mobs.indexOf(enemy);
        if (index > -1) {
            this.mobs.splice(index, 1);
        }

        // Increment kill count
        this.player.killCount++;

        // Combo system
        this.combo++;
        this.comboTimer = this.comboTimeout;
        if (this.combo > 1) {
            this.showNotification(`🔥 ${this.combo}x COMBO!`);
        }

        // Create death particles with mixed shapes
        this.createParticles(enemy.x, enemy.y, 10, '#ffd700', 'star');
        this.createParticles(enemy.x, enemy.y, 10, '#ff6b6b', 'circle');

        // Play death sound and bigger shake
        this.playSound('death');
        this.shakeCamera(5);

        // XP (with combo bonus)
        const comboBonus = Math.floor(this.combo / 5);
        this.player.xp += enemy.xp * (1 + comboBonus * 0.1);
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

        // Create level up particles - spectacular effect!
        this.createParticles(this.player.x, this.player.y, 20, '#00ff00', 'star');
        this.createParticles(this.player.x, this.player.y, 15, '#ffd700', 'square');
        this.createParticles(this.player.x, this.player.y, 15, '#00ffff', 'circle');

        // Haptic feedback and sound for level up
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100, 50, 100]);
        }
        this.playSound('levelup');
        this.shakeCamera(8);

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

        // Play pickup sound
        this.playSound('pickup');

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

    update(deltaTime) {
        if (!this.player) return;

        // Cap deltaTime to prevent huge jumps
        deltaTime = Math.min(deltaTime, 100);

        // Update camera shake
        if (this.cameraShake > 0) {
            this.cameraShake -= deltaTime / 100;
            this.cameraX = (Math.random() - 0.5) * this.cameraShake;
            this.cameraY = (Math.random() - 0.5) * this.cameraShake;
        } else {
            this.cameraX = 0;
            this.cameraY = 0;
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
            const speedMultiplier = deltaTime / 16; // Normalize to 60fps
            dx = (dx / magnitude) * this.player.speed * speedMultiplier;
            dy = (dy / magnitude) * this.player.speed * speedMultiplier;

            this.player.x = Math.max(20, Math.min(this.canvas.width - 20, this.player.x + dx));
            this.player.y = Math.max(20, Math.min(this.canvas.height - 20, this.player.y + dy));

            // Update player bob animation
            this.playerBobOffset = Math.sin(Date.now() / 100) * 3;

            // Add trail effect
            if (Math.random() < 0.3) {
                this.playerTrail.push({
                    x: this.player.x,
                    y: this.player.y,
                    alpha: 0.5,
                    icon: this.player.icon
                });
            }
        } else {
            this.playerBobOffset = 0;
        }

        // Update mobs
        this.mobs.forEach(mob => {
            const dist = this.getDistance(this.player, mob);

            if (dist < 400) {
                const speedMultiplier = deltaTime / 16;
                const angle = Math.atan2(this.player.y - mob.y, this.player.x - mob.x);
                mob.x += Math.cos(angle) * mob.speed * speedMultiplier;
                mob.y += Math.sin(angle) * mob.speed * speedMultiplier;

                // Attack player
                if (dist < 50) {
                    if (mob.targetCooldown <= 0) {
                        const damage = Math.max(1, mob.damage - this.player.defense);
                        this.player.hp -= damage;
                        this.showDamage(this.player.x, this.player.y - 40, damage);
                        mob.targetCooldown = 1000;

                        // Haptic feedback when taking damage
                        if (navigator.vibrate) {
                            navigator.vibrate(50);
                        }

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

        // Auto-attack nearest enemy
        if (this.player.attackCooldown <= 0) {
            const nearestMob = this.findNearestMob();
            if (nearestMob && this.getDistance(this.player, nearestMob) < 100) {
                this.damageEnemy(nearestMob, this.player.damage);
                this.player.attackCooldown = 1000; // 1 second cooldown
            }
        }
        if (this.player.attackCooldown > 0) {
            this.player.attackCooldown -= deltaTime;
        }

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

        // MP regen (frame-rate independent)
        if (this.player.mp < this.player.maxMP) {
            const regenAmount = (0.1 * deltaTime) / 16; // Normalize to 60fps
            this.player.mp = Math.min(this.player.maxMP, this.player.mp + regenAmount);
            if (Math.random() < 0.1) this.updateHUD();
        }

        // Update particles
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // Gravity
            p.life -= deltaTime / 1000;
            p.rotation += p.rotationSpeed;
            return p.life > 0;
        });

        // Update combo timer
        if (this.comboTimer > 0) {
            this.comboTimer -= deltaTime;
            if (this.comboTimer <= 0) {
                this.combo = 0;
            }
        }

        // Update player trail
        this.playerTrail = this.playerTrail.filter(t => {
            t.alpha -= deltaTime / 500;
            return t.alpha > 0;
        });
    }

    draw() {
        // Apply camera shake
        this.ctx.save();
        this.ctx.translate(this.cameraX, this.cameraY);

        // Draw pre-rendered grid from off-screen canvas (performance optimization)
        this.ctx.drawImage(this.gridCanvas, -this.cameraX, -this.cameraY);

        // Draw player trail
        this.playerTrail.forEach(t => {
            this.ctx.globalAlpha = t.alpha * 0.3;
            this.ctx.font = this.player.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillStyle = '#667eea';
            this.ctx.fillText(t.icon, t.x, t.y);
        });
        this.ctx.globalAlpha = 1.0;

        // Particles with glow and different shapes
        this.particles.forEach(p => {
            this.ctx.save();
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = p.color;

            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);

            this.ctx.beginPath();
            if (p.type === 'star') {
                // Draw star
                for (let i = 0; i < 5; i++) {
                    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                    const x = Math.cos(angle) * p.size;
                    const y = Math.sin(angle) * p.size;
                    if (i === 0) this.ctx.moveTo(x, y);
                    else this.ctx.lineTo(x, y);
                }
            } else if (p.type === 'square') {
                this.ctx.rect(-p.size/2, -p.size/2, p.size, p.size);
            } else {
                // Default circle
                this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            }
            this.ctx.fill();
            this.ctx.closePath();

            this.ctx.shadowBlur = 0;
            this.ctx.restore();
        });
        this.ctx.globalAlpha = 1.0;

        // Drops with floating animation and glow
        const time = Date.now() / 1000;
        this.drops.forEach((drop, i) => {
            const floatOffset = Math.sin(time * 2 + i) * 5;

            // Glow effect
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#ffd700';

            this.ctx.font = drop.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(drop.icon, drop.x, drop.y + floatOffset);

            this.ctx.shadowBlur = 0;
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

            // Player icon with bob animation
            this.ctx.font = this.player.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';

            // Enhanced glow effect
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = '#ffd700';

            // Apply bobbing animation
            const playerY = this.player.y + this.playerBobOffset;
            this.ctx.fillText(this.player.icon, this.player.x, playerY);

            this.ctx.shadowBlur = 0;
        }

        // Restore context (remove camera shake)
        this.ctx.restore();

        // Draw minimap (not affected by camera shake)
        if (this.player) {
            this.drawMinimap();
        }
    }

    drawMinimap() {
        const miniSize = 150;
        const miniX = this.canvas.width - miniSize - 10;
        const miniY = 100;
        const scale = miniSize / Math.max(this.canvas.width, this.canvas.height);

        // Background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(miniX, miniY, miniSize, miniSize);
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(miniX, miniY, miniSize, miniSize);

        // Draw player
        const playerMiniX = miniX + (this.player.x * scale);
        const playerMiniY = miniY + (this.player.y * scale);
        this.ctx.fillStyle = '#00ff00';
        this.ctx.beginPath();
        this.ctx.arc(playerMiniX, playerMiniY, 3, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw mobs
        this.ctx.fillStyle = '#ff0000';
        this.mobs.forEach(mob => {
            const mobMiniX = miniX + (mob.x * scale);
            const mobMiniY = miniY + (mob.y * scale);
            this.ctx.beginPath();
            this.ctx.arc(mobMiniX, mobMiniY, 2, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw drops
        this.ctx.fillStyle = '#ffd700';
        this.drops.forEach(drop => {
            const dropMiniX = miniX + (drop.x * scale);
            const dropMiniY = miniY + (drop.y * scale);
            this.ctx.fillRect(dropMiniX - 1, dropMiniY - 1, 2, 2);
        });

        // Combo counter overlay
        if (this.combo > 1) {
            this.ctx.fillStyle = 'rgba(255, 100, 0, 0.8)';
            this.ctx.font = 'bold 20px Arial';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(`🔥 ${this.combo}x COMBO`, miniX, miniY - 10);
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
        // Show custom modal instead of alert
        document.getElementById('finalLevel').textContent = this.player.level;
        document.getElementById('finalXP').textContent = this.player.xp;
        document.getElementById('killCount').textContent = this.player.killCount;
        document.getElementById('gameOverModal').classList.add('active');

        // Add haptic feedback on mobile
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }
    }

    gameLoop(currentTime = 0) {
        // Calculate delta time for frame-rate independent updates
        const deltaTime = this.lastTime ? currentTime - this.lastTime : 16;
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.draw();
        requestAnimationFrame((time) => this.gameLoop(time));
    }
}

// Initialize game
const game = new Game();

function selectCharacter(className) {
    game.selectCharacter(className);
}
