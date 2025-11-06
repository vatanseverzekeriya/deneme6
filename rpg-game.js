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
    { name: 'Zırh', icon: '🛡️', type: 'armor', defense: 5 },
    { name: 'Skill Kitabı (M)', icon: '📘', type: 'skillbook', grade: 'master' },
    { name: 'Skill Kitabı (G)', icon: '📗', type: 'skillbook', grade: 'grandmaster' },
    { name: 'Skill Kitabı (P)', icon: '📕', type: 'skillbook', grade: 'perfect' }
];

// Skill grade requirements
const SKILL_GRADES = {
    master: { name: 'Master', shortName: 'M', maxLevel: 20, color: 'master' },
    grandmaster: { name: 'Grand Master', shortName: 'G', maxLevel: 30, color: 'grandmaster' },
    perfect: { name: 'Perfect', shortName: 'P', maxLevel: 40, color: 'perfect' }
};

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
            icon: classData.icon,
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            size: 40,

            level: 1,
            xp: 0,
            xpToLevel: 100,
            lastStatPoint: 0, // Track when last stat point was earned

            hp: classData.baseHP,
            maxHP: classData.baseHP,
            mp: classData.baseMP,
            maxMP: classData.baseMP,

            damage: classData.baseDamage,
            defense: classData.baseDefense,

            // Base stats for upgrades
            baseSTR: 10,
            baseDEX: 10,
            baseINT: 10,
            baseVIT: 10,

            statPoints: 0,

            speed: 3,
            skills: classData.skills.map(s => ({
                ...s,
                cooldownRemaining: 0,
                grade: 'master',
                gradeLevel: 1,
                gradeProgress: 0
            })),

            gold: 0,
            attackCooldown: 0
        };

        this.updateHUD();
        this.createSkillButtons();
        this.createStatPanel();
        this.createSkillPanel();

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

            // Panels
            if (e.key.toLowerCase() === 's') this.toggleStatPanel();
            if (e.key.toLowerCase() === 'k') this.toggleSkillPanel();

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

        // XP and stat points
        const oldXP = this.player.xp;
        this.player.xp += enemy.xp;

        // Check for stat point every 25% of level progress
        const checkpoints = [25, 50, 75];
        for (let checkpoint of checkpoints) {
            const checkpointXP = Math.floor(this.player.xpToLevel * checkpoint / 100);
            if (oldXP < checkpointXP && this.player.xp >= checkpointXP) {
                if (this.player.lastStatPoint < checkpointXP) {
                    this.player.statPoints++;
                    this.player.lastStatPoint = checkpointXP;
                    this.showNotification('⭐ +1 Stat Puanı! (Toplam: ' + this.player.statPoints + ')');
                    this.updateStatPanel();
                }
            }
        }

        if (this.player.xp >= this.player.xpToLevel) {
            this.levelUp();
        }

        // Drop (higher chance for skill books)
        if (Math.random() < 0.5) {
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
        this.player.lastStatPoint = 0; // Reset for new level

        this.player.maxHP += 20;
        this.player.hp = this.player.maxHP;
        this.player.maxMP += 10;
        this.player.mp = this.player.maxMP;
        this.player.damage += 3;
        this.player.defense += 2;

        // Bonus stat point at level up
        this.player.statPoints++;

        this.showNotification('🎉 LEVEL UP! ' + this.player.level + ' (+1 Stat Puanı)');
        this.updateHUD();
        this.updateStatPanel();
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
        } else if (item.type === 'skillbook') {
            // Store for skill upgrade
            this.showNotification('📖 Skill panelini aç (K) ve bir skill seç!');
            // Item will be consumed when skill is upgraded
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

    // Stat Panel Methods
    toggleStatPanel() {
        const panel = document.getElementById('statPanel');
        panel.classList.toggle('active');
    }

    createStatPanel() {
        this.updateStatPanel();
    }

    updateStatPanel() {
        if (!this.player) return;

        document.getElementById('statPointsInfo').textContent =
            `Kullanılabilir Stat Puanı: ${this.player.statPoints}`;

        const statRows = document.getElementById('statRows');
        statRows.innerHTML = `
            <div class="stat-row">
                <div class="stat-name">💪 STR (Güç)</div>
                <div class="stat-value">${this.player.baseSTR}</div>
                <button class="stat-btn" onclick="game.upgradeStat('STR')" ${this.player.statPoints <= 0 ? 'disabled' : ''}>+</button>
            </div>
            <div class="stat-row">
                <div class="stat-name">⚡ DEX (Çeviklik)</div>
                <div class="stat-value">${this.player.baseDEX}</div>
                <button class="stat-btn" onclick="game.upgradeStat('DEX')" ${this.player.statPoints <= 0 ? 'disabled' : ''}>+</button>
            </div>
            <div class="stat-row">
                <div class="stat-name">🧠 INT (Zeka)</div>
                <div class="stat-value">${this.player.baseINT}</div>
                <button class="stat-btn" onclick="game.upgradeStat('INT')" ${this.player.statPoints <= 0 ? 'disabled' : ''}>+</button>
            </div>
            <div class="stat-row">
                <div class="stat-name">❤️ VIT (Canlılık)</div>
                <div class="stat-value">${this.player.baseVIT}</div>
                <button class="stat-btn" onclick="game.upgradeStat('VIT')" ${this.player.statPoints <= 0 ? 'disabled' : ''}>+</button>
            </div>
            <div style="margin-top: 15px; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 8px; font-size: 12px;">
                <div><b>STR:</b> Hasar +2 per puan</div>
                <div><b>DEX:</b> Kritik şansı artırır</div>
                <div><b>INT:</b> MP +5, Skill hasarı +1%</div>
                <div><b>VIT:</b> HP +10 per puan</div>
            </div>
        `;
    }

    upgradeStat(statName) {
        if (!this.player || this.player.statPoints <= 0) return;

        this.player.statPoints--;

        switch(statName) {
            case 'STR':
                this.player.baseSTR++;
                this.player.damage += 2;
                this.showNotification('💪 +1 STR! Hasar arttı!');
                break;
            case 'DEX':
                this.player.baseDEX++;
                this.showNotification('⚡ +1 DEX! Kritik şansı arttı!');
                break;
            case 'INT':
                this.player.baseINT++;
                this.player.maxMP += 5;
                this.player.mp = Math.min(this.player.mp + 5, this.player.maxMP);
                this.showNotification('🧠 +1 INT! MP arttı!');
                break;
            case 'VIT':
                this.player.baseVIT++;
                this.player.maxHP += 10;
                this.player.hp = Math.min(this.player.hp + 10, this.player.maxHP);
                this.showNotification('❤️ +1 VIT! HP arttı!');
                break;
        }

        this.updateStatPanel();
        this.updateHUD();
    }

    // Skill Panel Methods
    toggleSkillPanel() {
        const panel = document.getElementById('skillPanel');
        panel.classList.toggle('active');
        if (panel.classList.contains('active')) {
            this.updateSkillPanel();
        }
    }

    createSkillPanel() {
        this.updateSkillPanel();
    }

    updateSkillPanel() {
        if (!this.player) return;

        const skillRows = document.getElementById('skillRows');
        skillRows.innerHTML = '';

        this.player.skills.forEach((skill, index) => {
            const gradeData = SKILL_GRADES[skill.grade];
            const maxProgress = gradeData.maxLevel;
            const progressPercent = (skill.gradeLevel / maxProgress) * 100;
            const canUpgrade = skill.gradeLevel < maxProgress;

            const row = document.createElement('div');
            row.className = 'skill-upgrade-row';
            row.innerHTML = `
                <div class="skill-header">
                    <div class="skill-title">
                        <span style="font-size: 20px;">${skill.icon}</span>
                        <span>${skill.name}</span>
                    </div>
                    <div class="skill-grade ${gradeData.color}">${gradeData.shortName}</div>
                </div>
                <div class="skill-progress">
                    <div class="skill-progress-bar">
                        <div class="skill-progress-fill" style="width: ${progressPercent}%"></div>
                        <div class="skill-progress-text">${skill.gradeLevel}/${maxProgress}</div>
                    </div>
                </div>
                <div class="book-required">
                    ${canUpgrade ? '📘 Gerekli: ' + gradeData.name + ' Kitabı' : '✅ Maksimum seviye!'}
                </div>
                <button class="skill-upgrade-btn" onclick="game.upgradeSkill(${index})" ${!canUpgrade ? 'disabled' : ''}>
                    Geliştir
                </button>
            `;
            skillRows.appendChild(row);
        });
    }

    upgradeSkill(skillIndex) {
        if (!this.player) return;

        const skill = this.player.skills[skillIndex];
        const gradeData = SKILL_GRADES[skill.grade];

        // Check if max level
        if (skill.gradeLevel >= gradeData.maxLevel) {
            this.showNotification('❌ Bu skill maksimum seviyede!');
            return;
        }

        // Find skill book in inventory
        let bookSlot = -1;
        for (let i = 0; i < this.inventory.length; i++) {
            const item = this.inventory[i];
            if (item && item.type === 'skillbook' && item.grade === skill.grade) {
                bookSlot = i;
                break;
            }
        }

        if (bookSlot === -1) {
            this.showNotification('❌ Gerekli skill kitabı yok! (' + gradeData.name + ')');
            return;
        }

        // Consume book and upgrade
        this.inventory[bookSlot] = null;
        this.updateInventory();

        const oldLevel = skill.gradeLevel;
        skill.gradeLevel++;

        // Upgrade to next grade if max level reached
        if (skill.gradeLevel >= gradeData.maxLevel) {
            if (skill.grade === 'master') {
                skill.grade = 'grandmaster';
                skill.gradeLevel = 1;
                this.showNotification(`🎉 ${skill.name} Grand Master oldu!`);
            } else if (skill.grade === 'grandmaster') {
                skill.grade = 'perfect';
                skill.gradeLevel = 1;
                this.showNotification(`✨ ${skill.name} Perfect oldu!`);
            } else {
                this.showNotification(`⭐ ${skill.name} Perfect Maksimum!`);
            }
        } else {
            this.showNotification(`📈 ${skill.name} ${gradeData.shortName}${skill.gradeLevel} oldu!`);
        }

        // Improve skill stats
        if (skill.damage) skill.damage += 5;
        if (skill.heal) skill.heal += 10;
        skill.mpCost = Math.max(5, skill.mpCost - 1);

        this.updateSkillPanel();
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
