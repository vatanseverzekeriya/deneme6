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

// First Village Monsters (Level 1-32)
const MOB_TYPES = [
    { name: 'Aç Köpek', icon: '🐕', hp: 30, damage: 3, xp: 8, gold: 5, speed: 2.0, minLevel: 1, maxLevel: 3, zone: 0 },
    { name: 'Köpek', icon: '🐶', hp: 45, damage: 5, xp: 12, gold: 8, speed: 1.8, minLevel: 2, maxLevel: 5, zone: 1 },
    { name: 'Kurt', icon: '🐺', hp: 65, damage: 8, xp: 18, gold: 12, speed: 1.7, minLevel: 4, maxLevel: 7, zone: 2 },
    { name: 'Aç Kurt', icon: '🐺', hp: 85, damage: 11, xp: 25, gold: 15, speed: 1.8, minLevel: 6, maxLevel: 9, zone: 3 },
    { name: 'Domuz', icon: '🐗', hp: 110, damage: 14, xp: 35, gold: 20, speed: 1.5, minLevel: 8, maxLevel: 11, zone: 4 },
    { name: 'Aç Domuz', icon: '🐗', hp: 140, damage: 18, xp: 50, gold: 25, speed: 1.6, minLevel: 10, maxLevel: 13, zone: 5 },
    { name: 'Ayı', icon: '🐻', hp: 180, damage: 23, xp: 70, gold: 35, speed: 1.3, minLevel: 12, maxLevel: 15, zone: 6 },
    { name: 'Aç Ayı', icon: '🐻', hp: 230, damage: 28, xp: 95, gold: 45, speed: 1.4, minLevel: 14, maxLevel: 17, zone: 7 },
    { name: 'Timsah', icon: '🐊', hp: 290, damage: 35, xp: 125, gold: 60, speed: 1.2, minLevel: 16, maxLevel: 19, zone: 8 },
    { name: 'Aç Timsah', icon: '🐊', hp: 360, damage: 42, xp: 160, gold: 75, speed: 1.3, minLevel: 18, maxLevel: 21, zone: 9 },
    { name: 'Boz Ayı', icon: '🐻', hp: 440, damage: 50, xp: 200, gold: 95, speed: 1.2, minLevel: 20, maxLevel: 23, zone: 10 },
    { name: 'Aç Boz Ayı', icon: '🐻‍❄️', hp: 530, damage: 60, xp: 250, gold: 115, speed: 1.3, minLevel: 22, maxLevel: 25, zone: 11 },
    { name: 'Maymun', icon: '🐵', hp: 630, damage: 70, xp: 310, gold: 140, speed: 1.6, minLevel: 24, maxLevel: 27, zone: 12 },
    { name: 'Aç Maymun', icon: '🐒', hp: 750, damage: 82, xp: 380, gold: 170, speed: 1.7, minLevel: 26, maxLevel: 29, zone: 13 },
    { name: 'Kaplan', icon: '🐯', hp: 890, damage: 95, xp: 460, gold: 200, speed: 1.8, minLevel: 28, maxLevel: 31, zone: 14 },
    { name: 'Aç Kaplan', icon: '🐅', hp: 1050, damage: 110, xp: 550, gold: 240, speed: 1.9, minLevel: 30, maxLevel: 33, zone: 15 },
    { name: 'Aslan', icon: '🦁', hp: 1240, damage: 128, xp: 650, gold: 280, speed: 1.7, minLevel: 31, maxLevel: 35, zone: 16 },
    { name: 'Aç Aslan', icon: '🦁', hp: 1460, damage: 148, xp: 770, gold: 330, speed: 1.8, minLevel: 32, maxLevel: 40, zone: 16 }
];

// Map zones for First Village (large map: 3000x3000)
const MAP_ZONES = [
    { id: 0, x: 0, y: 0, width: 500, height: 500, name: 'Aç Köpek Bölgesi', color: '#2d5016' },
    { id: 1, x: 500, y: 0, width: 500, height: 500, name: 'Köpek Bölgesi', color: '#3a6b1f' },
    { id: 2, x: 1000, y: 0, width: 500, height: 500, name: 'Kurt Bölgesi', color: '#4a7c2f' },
    { id: 3, x: 1500, y: 0, width: 500, height: 500, name: 'Aç Kurt Bölgesi', color: '#5a8d3f' },
    { id: 4, x: 2000, y: 0, width: 500, height: 500, name: 'Domuz Bölgesi', color: '#6a9e4f' },
    { id: 5, x: 2500, y: 0, width: 500, height: 500, name: 'Aç Domuz Bölgesi', color: '#7aaf5f' },
    { id: 6, x: 0, y: 500, width: 500, height: 500, name: 'Ayı Bölgesi', color: '#8ac06f' },
    { id: 7, x: 500, y: 500, width: 500, height: 500, name: 'Aç Ayı Bölgesi', color: '#9ad17f' },
    { id: 8, x: 1000, y: 500, width: 500, height: 500, name: 'Timsah Bölgesi', color: '#2a4a5a' },
    { id: 9, x: 1500, y: 500, width: 500, height: 500, name: 'Aç Timsah Bölgesi', color: '#3a5a6a' },
    { id: 10, x: 2000, y: 500, width: 500, height: 500, name: 'Boz Ayı Bölgesi', color: '#4a6a7a' },
    { id: 11, x: 2500, y: 500, width: 500, height: 500, name: 'Aç Boz Ayı Bölgesi', color: '#5a7a8a' },
    { id: 12, x: 0, y: 1000, width: 1000, height: 500, name: 'Maymun Bölgesi', color: '#6a4a3a' },
    { id: 13, x: 1000, y: 1000, width: 1000, height: 500, name: 'Aç Maymun Bölgesi', color: '#7a5a4a' },
    { id: 14, x: 2000, y: 1000, width: 1000, height: 500, name: 'Kaplan Bölgesi', color: '#8a6a5a' },
    { id: 15, x: 0, y: 1500, width: 1500, height: 500, name: 'Aç Kaplan Bölgesi', color: '#9a7a6a' },
    { id: 16, x: 1500, y: 1500, width: 1500, height: 500, name: 'Aslan Krallığı', color: '#aa8a7a' }
];

const WORLD_WIDTH = 3000;
const WORLD_HEIGHT = 2000;

// Exponential XP requirements for levels 1-99
function calculateXPForLevel(level) {
    if (level <= 1) return 0;
    // Exponential formula: makes each level progressively harder
    // Level 2 = 50, Level 3 = 85, Level 4 = 135, etc.
    const baseXP = 50;
    const exponent = 1.15;
    return Math.floor(baseXP * Math.pow(level, exponent) * (level - 1));
}

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

        // Camera for large world
        this.camera = { x: 0, y: 0 };

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

        // Start player in first zone (Aç Köpek Bölgesi)
        const startZone = MAP_ZONES[0];
        const startX = startZone.x + startZone.width / 2;
        const startY = startZone.y + startZone.height / 2;

        this.player = {
            class: className,
            name: classData.name,
            icon: classData.icon,
            x: startX,
            y: startY,
            size: 40,

            level: 1,
            xp: 0,
            xpToLevel: calculateXPForLevel(2), // XP needed for level 2

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
        // Spawn monsters in each zone
        MAP_ZONES.forEach(zone => {
            // Number of mobs per zone (8-15 per zone)
            const mobCount = 8 + Math.floor(Math.random() * 8);

            for (let i = 0; i < mobCount; i++) {
                this.spawnMobInZone(zone.id);
            }
        });
    }

    spawnMobInZone(zoneId) {
        const zone = MAP_ZONES[zoneId];
        if (!zone) return;

        // Get all monster types that belong to this zone
        const zoneMobs = MOB_TYPES.filter(mob => mob.zone === zoneId);
        if (zoneMobs.length === 0) return;

        // Randomly select a monster type from this zone
        const type = zoneMobs[Math.floor(Math.random() * zoneMobs.length)];

        // Spawn in zone with padding from edges
        const padding = 50;
        const x = zone.x + padding + Math.random() * (zone.width - padding * 2);
        const y = zone.y + padding + Math.random() * (zone.height - padding * 2);

        this.mobs.push({
            ...type,
            x, y,
            maxHP: type.hp,
            size: 35,
            targetCooldown: 0,
            zoneId: zoneId
        });
    }

    // Respawn a mob in its appropriate zone
    respawnMob(zoneId) {
        setTimeout(() => this.spawnMobInZone(zoneId), 3000);
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

        // Respawn mob in same zone
        this.respawnMob(enemy.zoneId);

        this.updateHUD();
    }

    levelUp() {
        this.player.level++;
        this.player.xp = 0;

        // Use exponential XP formula (max level 99)
        if (this.player.level < 99) {
            this.player.xpToLevel = calculateXPForLevel(this.player.level + 1);
        } else {
            this.player.xpToLevel = 999999; // Max level reached
        }

        this.player.maxHP += 20;
        this.player.hp = this.player.maxHP;
        this.player.maxMP += 10;
        this.player.mp = this.player.maxMP;
        this.player.damage += 3;
        this.player.defense += 2;

        this.showNotification('🎉 LEVEL UP! Seviye ' + this.player.level);
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

            // Keep player within world bounds
            this.player.x = Math.max(20, Math.min(WORLD_WIDTH - 20, this.player.x + dx));
            this.player.y = Math.max(20, Math.min(WORLD_HEIGHT - 20, this.player.y + dy));
        }

        // Update camera to follow player
        this.camera.x = this.player.x - this.canvas.width / 2;
        this.camera.y = this.player.y - this.canvas.height / 2;

        // Keep camera within world bounds
        this.camera.x = Math.max(0, Math.min(WORLD_WIDTH - this.canvas.width, this.camera.x));
        this.camera.y = Math.max(0, Math.min(WORLD_HEIGHT - this.canvas.height, this.camera.y));

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
        // Clear canvas
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw map zones with different colors
        MAP_ZONES.forEach(zone => {
            this.ctx.fillStyle = zone.color;
            this.ctx.fillRect(
                zone.x - this.camera.x,
                zone.y - this.camera.y,
                zone.width,
                zone.height
            );

            // Zone borders
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(
                zone.x - this.camera.x,
                zone.y - this.camera.y,
                zone.width,
                zone.height
            );

            // Zone name (only if zone is visible)
            if (this.isVisible(zone.x + zone.width/2, zone.y + zone.height/2)) {
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                this.ctx.font = 'bold 18px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(
                    zone.name,
                    zone.x + zone.width/2 - this.camera.x,
                    zone.y + zone.height/2 - this.camera.y
                );
            }
        });

        // Grid overlay
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        this.ctx.lineWidth = 1;
        const gridSize = 50;
        const startX = Math.floor(this.camera.x / gridSize) * gridSize;
        const startY = Math.floor(this.camera.y / gridSize) * gridSize;

        for (let x = startX; x < this.camera.x + this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x - this.camera.x, 0);
            this.ctx.lineTo(x - this.camera.x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = startY; y < this.camera.y + this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y - this.camera.y);
            this.ctx.lineTo(this.canvas.width, y - this.camera.y);
            this.ctx.stroke();
        }

        // Drops (only draw visible ones)
        this.drops.forEach(drop => {
            if (!this.isVisible(drop.x, drop.y)) return;

            this.ctx.font = drop.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(drop.icon, drop.x - this.camera.x, drop.y - this.camera.y);
        });

        // Mobs (only draw visible ones)
        this.mobs.forEach(mob => {
            if (!this.isVisible(mob.x, mob.y)) return;

            const screenX = mob.x - this.camera.x;
            const screenY = mob.y - this.camera.y;

            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(screenX, screenY + mob.size/2, mob.size/2, mob.size/4, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Mob icon
            this.ctx.font = mob.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(mob.icon, screenX, screenY);

            // HP bar
            const barWidth = 40;
            const barHeight = 4;
            const hpPercent = mob.hp / mob.maxHP;

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(screenX - barWidth/2, screenY - mob.size, barWidth, barHeight);

            this.ctx.fillStyle = hpPercent > 0.5 ? '#4ade80' : hpPercent > 0.25 ? '#fbbf24' : '#ef4444';
            this.ctx.fillRect(screenX - barWidth/2, screenY - mob.size, barWidth * hpPercent, barHeight);

            // Mob name and level
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            this.ctx.font = '10px Arial';
            this.ctx.fillText(`${mob.name} (${mob.minLevel}-${mob.maxLevel})`, screenX, screenY - mob.size - 10);
        });

        // Player
        if (this.player) {
            const screenX = this.player.x - this.camera.x;
            const screenY = this.player.y - this.camera.y;

            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(screenX, screenY + this.player.size/2, this.player.size/2, this.player.size/4, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Player icon
            this.ctx.font = this.player.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';

            // Glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#ffd700';
            this.ctx.fillText(this.player.icon, screenX, screenY);
            this.ctx.shadowBlur = 0;
        }

        // Show current zone at top of screen
        this.drawCurrentZone();

        // Draw minimap
        this.drawMinimap();
    }

    drawMinimap() {
        if (!this.player) return;

        const minimapSize = 200;
        const minimapX = this.canvas.width - minimapSize - 20;
        const minimapY = this.canvas.height - minimapSize - 120; // Above UI

        // Minimap background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(minimapX, minimapY, minimapSize, minimapSize);

        // Minimap border
        this.ctx.strokeStyle = '#ffd700';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(minimapX, minimapY, minimapSize, minimapSize);

        // Draw zones on minimap
        const scaleX = minimapSize / WORLD_WIDTH;
        const scaleY = minimapSize / WORLD_HEIGHT;

        MAP_ZONES.forEach(zone => {
            this.ctx.fillStyle = zone.color;
            this.ctx.globalAlpha = 0.5;
            this.ctx.fillRect(
                minimapX + zone.x * scaleX,
                minimapY + zone.y * scaleY,
                zone.width * scaleX,
                zone.height * scaleY
            );
            this.ctx.globalAlpha = 1.0;

            // Zone borders
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(
                minimapX + zone.x * scaleX,
                minimapY + zone.y * scaleY,
                zone.width * scaleX,
                zone.height * scaleY
            );
        });

        // Draw player position on minimap
        const playerMinimapX = minimapX + this.player.x * scaleX;
        const playerMinimapY = minimapY + this.player.y * scaleY;

        this.ctx.fillStyle = '#ffd700';
        this.ctx.beginPath();
        this.ctx.arc(playerMinimapX, playerMinimapY, 4, 0, Math.PI * 2);
        this.ctx.fill();

        // Player direction indicator (pulsing effect)
        this.ctx.strokeStyle = '#ffd700';
        this.ctx.lineWidth = 2;
        this.ctx.globalAlpha = 0.5;
        this.ctx.beginPath();
        this.ctx.arc(playerMinimapX, playerMinimapY, 6, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.globalAlpha = 1.0;

        // Minimap title
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.font = 'bold 12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Harita', minimapX + minimapSize / 2, minimapY - 5);
    }

    isVisible(x, y) {
        const margin = 100; // Extra margin for smooth transitions
        return x >= this.camera.x - margin &&
               x <= this.camera.x + this.canvas.width + margin &&
               y >= this.camera.y - margin &&
               y <= this.camera.y + this.canvas.height + margin;
    }

    drawCurrentZone() {
        if (!this.player) return;

        // Find which zone the player is in
        const currentZone = MAP_ZONES.find(zone =>
            this.player.x >= zone.x &&
            this.player.x <= zone.x + zone.width &&
            this.player.y >= zone.y &&
            this.player.y <= zone.y + zone.height
        );

        if (currentZone) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            this.ctx.fillRect(this.canvas.width / 2 - 150, 10, 300, 35);

            this.ctx.fillStyle = '#ffd700';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(currentZone.name, this.canvas.width / 2, 30);
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
