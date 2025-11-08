// Cyber-Samurai RPG - Professional Asset System
// High-quality pixel art sprites with 8-directional animation

class SpriteRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.spriteCache = new Map();
    }

    // Create pixel-perfect sprite
    createSprite(width, height, drawFunction) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        drawFunction(ctx);
        return canvas;
    }

    // 8-directional animation frames
    createCharacterSprites(characterData) {
        const directions = ['s', 'se', 'e', 'ne', 'n', 'nw', 'w', 'sw'];
        const sprites = {};

        directions.forEach((dir, index) => {
            sprites[dir] = {
                idle: this.createIdleFrames(characterData, index),
                walk: this.createWalkFrames(characterData, index),
                attack: this.createAttackFrames(characterData, index)
            };
        });

        return sprites;
    }

    createIdleFrames(data, dirIndex) {
        const frames = [];
        for (let i = 0; i < 4; i++) {
            frames.push(this.createSprite(64, 64, (ctx) => {
                this.drawCharacter(ctx, data, dirIndex, 'idle', i);
            }));
        }
        return frames;
    }

    createWalkFrames(data, dirIndex) {
        const frames = [];
        for (let i = 0; i < 4; i++) {
            frames.push(this.createSprite(64, 64, (ctx) => {
                this.drawCharacter(ctx, data, dirIndex, 'walk', i);
            }));
        }
        return frames;
    }

    createAttackFrames(data, dirIndex) {
        const frames = [];
        for (let i = 0; i < 6; i++) {
            frames.push(this.createSprite(64, 64, (ctx) => {
                this.drawCharacter(ctx, data, dirIndex, 'attack', i);
            }));
        }
        return frames;
    }

    // Advanced pixel art character renderer
    drawCharacter(ctx, data, dirIndex, animType, frame) {
        const colors = data.colors;
        const baseY = 32;
        const baseX = 32;

        // Calculate direction-based offsets
        const angle = (dirIndex * Math.PI) / 4;
        const facingRight = dirIndex >= 1 && dirIndex <= 3;
        const facingDown = dirIndex >= 3 && dirIndex <= 5;
        const facingLeft = dirIndex >= 5 && dirIndex <= 7;
        const facingUp = dirIndex === 0 || dirIndex >= 7 || dirIndex === 1;

        // Animation wobble
        const wobble = animType === 'walk' ? Math.sin(frame * Math.PI / 2) * 2 : 0;
        const attackExtend = animType === 'attack' ? (frame / 6) * 8 : 0;

        ctx.save();
        ctx.translate(baseX, baseY);

        if (data.type === 'cyberSamurai') {
            this.drawCyberSamurai(ctx, colors, dirIndex, animType, frame, wobble, attackExtend, facingRight, facingLeft, facingDown, facingUp);
        } else if (data.type === 'hoverDrone') {
            this.drawHoverDrone(ctx, colors, dirIndex, frame, wobble);
        } else if (data.type === 'cyberNinja') {
            this.drawCyberNinja(ctx, colors, dirIndex, animType, frame, wobble, facingRight, facingLeft);
        } else if (data.type === 'mechGolem') {
            this.drawMechGolem(ctx, colors, dirIndex, frame, wobble, facingRight, facingLeft);
        }

        ctx.restore();
    }

    // Cyber Samurai - Main Character
    drawCyberSamurai(ctx, colors, dirIndex, animType, frame, wobble, attackExtend, facingRight, facingLeft, facingDown, facingUp) {
        const isAttacking = animType === 'attack';
        const swordAngle = isAttacking ? (frame / 6) * Math.PI / 2 - Math.PI / 4 : -Math.PI / 4;

        // Shadow
        this.drawEllipse(ctx, 0, 12, 10, 4, 'rgba(0, 0, 0, 0.3)');

        // Legs
        const legOffset = wobble;
        this.drawRect(ctx, -4, 4 + legOffset, 3, 8, colors.legs);
        this.drawRect(ctx, 2, 4 - legOffset, 3, 8, colors.legs);

        // Body
        this.drawRect(ctx, -6, -6, 12, 12, colors.body);

        // Armor plating
        this.drawRect(ctx, -5, -5, 10, 2, colors.armor);
        this.drawRect(ctx, -5, -1, 10, 2, colors.armor);

        // Neon lights
        this.drawPixel(ctx, -4, -4, colors.neonBlue);
        this.drawPixel(ctx, 4, -4, colors.neonBlue);
        this.drawPixel(ctx, -4, 0, colors.neonPurple);
        this.drawPixel(ctx, 4, 0, colors.neonPurple);

        // Arms
        const armExtend = attackExtend / 2;
        if (facingRight || dirIndex === 0) {
            this.drawRect(ctx, 6 + armExtend, -2, 4, 3, colors.arms);
            this.drawRect(ctx, -10, -2, 4, 3, colors.arms);
        } else {
            this.drawRect(ctx, -10, -2, 4, 3, colors.arms);
            this.drawRect(ctx, 6 + armExtend, -2, 4, 3, colors.arms);
        }

        // Energy Sword
        ctx.save();
        if (facingRight) {
            ctx.translate(8 + attackExtend, 0);
        } else {
            ctx.translate(-8 - attackExtend, 0);
        }
        ctx.rotate(swordAngle);

        // Sword blade with energy glow
        const swordLength = isAttacking ? 16 + attackExtend : 14;
        this.drawRect(ctx, 0, -1, swordLength, 2, colors.swordBlade);

        // Energy glow
        if (isAttacking && frame % 2 === 0) {
            ctx.globalAlpha = 0.6;
            this.drawRect(ctx, 0, -2, swordLength + 2, 4, colors.neonBlue);
            ctx.globalAlpha = 1;
        }

        // Sword handle
        this.drawRect(ctx, -3, -1, 3, 2, colors.swordHandle);
        ctx.restore();

        // Head/Helmet
        this.drawRect(ctx, -5, -12, 10, 8, colors.helmet);

        // Visor
        this.drawRect(ctx, -4, -10, 8, 3, colors.visor);

        // Antenna
        this.drawPixel(ctx, -3, -13, colors.neonPurple);
        this.drawPixel(ctx, 3, -13, colors.neonPurple);

        // Kabuki-style face marking
        this.drawPixel(ctx, -2, -9, colors.neonBlue);
        this.drawPixel(ctx, 2, -9, colors.neonBlue);
    }

    // Hover Drone Enemy
    drawHoverDrone(ctx, colors, dirIndex, frame, wobble) {
        const float = Math.sin(frame * Math.PI / 2) * 1.5;

        // Shadow
        this.drawEllipse(ctx, 0, 8, 8, 3, 'rgba(0, 0, 0, 0.2)');

        // Body
        ctx.save();
        ctx.translate(0, float);

        // Main body - octagonal shape
        this.drawRect(ctx, -6, -2, 12, 4, colors.body);
        this.drawRect(ctx, -4, -4, 8, 8, colors.body);

        // Central core
        this.drawRect(ctx, -2, -2, 4, 4, colors.core);

        // Glowing eye
        const eyeGlow = frame % 3 === 0;
        this.drawPixel(ctx, 0, 0, eyeGlow ? colors.eyeActive : colors.eyeIdle);

        // Propellers
        const propAngle = frame * Math.PI / 4;
        const propLength = 4;

        // Top propellers
        ctx.strokeStyle = colors.propeller;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-8, -4);
        ctx.lineTo(-8 - propLength, -4);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(8, -4);
        ctx.lineTo(8 + propLength, -4);
        ctx.stroke();

        // Side panels
        this.drawRect(ctx, -8, -1, 2, 2, colors.panel);
        this.drawRect(ctx, 6, -1, 2, 2, colors.panel);

        // Energy trail
        if (frame % 2 === 0) {
            ctx.globalAlpha = 0.4;
            this.drawPixel(ctx, 0, 4, colors.neonRed);
            ctx.globalAlpha = 1;
        }

        ctx.restore();
    }

    // Cyber Ninja Enemy
    drawCyberNinja(ctx, colors, dirIndex, animType, frame, wobble, facingRight, facingLeft) {
        const isAttacking = animType === 'attack';
        const dashEffect = animType === 'walk' && frame % 2 === 0;

        // Dash trail effect
        if (dashEffect) {
            ctx.globalAlpha = 0.3;
            this.drawRect(ctx, facingRight ? -8 : 8, -4, 6, 10, colors.trailEffect);
            ctx.globalAlpha = 1;
        }

        // Shadow
        this.drawEllipse(ctx, 0, 12, 8, 3, 'rgba(0, 0, 0, 0.3)');

        // Legs in stealth pose
        this.drawRect(ctx, -3, 6 + wobble, 2, 6, colors.legs);
        this.drawRect(ctx, 2, 6 - wobble, 2, 6, colors.legs);

        // Body - slim armor
        this.drawRect(ctx, -4, -4, 8, 10, colors.body);

        // Chest armor plate
        this.drawRect(ctx, -3, -3, 6, 6, colors.armor);

        // Arms
        const armAngle = isAttacking ? frame / 6 : 0;
        if (facingRight) {
            this.drawRect(ctx, 4, -2 - armAngle * 3, 4, 2, colors.arms);
            this.drawRect(ctx, -8, 0, 4, 2, colors.arms);
        } else {
            this.drawRect(ctx, -8, -2 - armAngle * 3, 4, 2, colors.arms);
            this.drawRect(ctx, 4, 0, 4, 2, colors.arms);
        }

        // Kunai/blade
        if (isAttacking) {
            const bladeX = facingRight ? 8 : -10;
            this.drawRect(ctx, bladeX, -4, 6, 1, colors.blade);
            this.drawPixel(ctx, bladeX + (facingRight ? 6 : -1), -4, colors.neonRed);
        }

        // Head/mask
        this.drawRect(ctx, -3, -10, 6, 6, colors.head);

        // Visor strip
        this.drawRect(ctx, -3, -8, 6, 1, colors.visor);

        // Glowing eyes
        this.drawPixel(ctx, -1, -8, colors.eyeGlow);
        this.drawPixel(ctx, 2, -8, colors.eyeGlow);

        // Antenna
        this.drawPixel(ctx, 0, -11, colors.neonRed);
    }

    // Mech Golem Boss
    drawMechGolem(ctx, colors, dirIndex, frame, wobble, facingRight, facingLeft) {
        const breathe = Math.sin(frame * Math.PI / 4) * 0.5;

        // Large shadow
        this.drawEllipse(ctx, 0, 20, 18, 6, 'rgba(0, 0, 0, 0.4)');

        // Massive legs
        this.drawRect(ctx, -8, 8, 6, 12, colors.legs);
        this.drawRect(ctx, 3, 8, 6, 12, colors.legs);

        // Leg joints
        this.drawRect(ctx, -7, 14, 4, 2, colors.joints);
        this.drawRect(ctx, 4, 14, 4, 2, colors.joints);

        // Main body - large and imposing
        this.drawRect(ctx, -10, -8 + breathe, 20, 16, colors.body);

        // Armor plating
        this.drawRect(ctx, -9, -7 + breathe, 18, 3, colors.armorPlate);
        this.drawRect(ctx, -9, -1 + breathe, 18, 3, colors.armorPlate);
        this.drawRect(ctx, -9, 5 + breathe, 18, 3, colors.armorPlate);

        // Power core in center
        this.drawRect(ctx, -3, 0 + breathe, 6, 6, colors.core);
        const coreGlow = frame % 4 < 2;
        if (coreGlow) {
            ctx.globalAlpha = 0.7;
            this.drawRect(ctx, -4, -1 + breathe, 8, 8, colors.coreGlow);
            ctx.globalAlpha = 1;
        }

        // Heavy arms
        if (facingRight) {
            this.drawRect(ctx, 10, -4 + breathe, 6, 8, colors.arms);
            this.drawRect(ctx, -16, -4 + breathe, 6, 8, colors.arms);
            // Weapon on right arm
            this.drawRect(ctx, 16, -2 + breathe, 8, 4, colors.weapon);
        } else {
            this.drawRect(ctx, -16, -4 + breathe, 6, 8, colors.arms);
            this.drawRect(ctx, 10, -4 + breathe, 6, 8, colors.arms);
            // Weapon on left arm
            this.drawRect(ctx, -24, -2 + breathe, 8, 4, colors.weapon);
        }

        // Head/cockpit
        this.drawRect(ctx, -6, -14 + breathe, 12, 8, colors.head);

        // Viewport
        this.drawRect(ctx, -5, -12 + breathe, 10, 4, colors.viewport);

        // Eyes/sensors
        this.drawPixel(ctx, -3, -11 + breathe, colors.sensorLeft);
        this.drawPixel(ctx, 3, -11 + breathe, colors.sensorRight);

        // Antenna array
        this.drawPixel(ctx, -4, -15 + breathe, colors.antenna);
        this.drawPixel(ctx, 0, -16 + breathe, colors.antenna);
        this.drawPixel(ctx, 4, -15 + breathe, colors.antenna);

        // Exhaust ports
        if (frame % 3 === 0) {
            ctx.globalAlpha = 0.5;
            this.drawPixel(ctx, -9, 7 + breathe, colors.exhaust);
            this.drawPixel(ctx, 9, 7 + breathe, colors.exhaust);
            ctx.globalAlpha = 1;
        }
    }

    // Helper drawing functions
    drawRect(ctx, x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(Math.floor(x), Math.floor(y), width, height);
    }

    drawPixel(ctx, x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
    }

    drawCircle(ctx, x, y, radius, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(Math.floor(x), Math.floor(y), radius, 0, Math.PI * 2);
        ctx.fill();
    }

    drawEllipse(ctx, x, y, radiusX, radiusY, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(Math.floor(x), Math.floor(y), radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Character and Enemy Definitions
const CYBER_SAMURAI_COLORS = {
    type: 'cyberSamurai',
    colors: {
        body: '#1a1a2e',
        armor: '#2d4263',
        legs: '#16213e',
        arms: '#2d4263',
        helmet: '#0f3460',
        visor: '#00d9ff',
        neonBlue: '#00d9ff',
        neonPurple: '#b537f2',
        swordBlade: '#00f0ff',
        swordHandle: '#1a1a2e'
    }
};

const HOVER_DRONE_COLORS = {
    type: 'hoverDrone',
    colors: {
        body: '#2a2a3e',
        core: '#1a1a2e',
        panel: '#3a3a4e',
        propeller: '#666',
        eyeActive: '#ff0040',
        eyeIdle: '#660020',
        neonRed: '#ff0040'
    }
};

const CYBER_NINJA_COLORS = {
    type: 'cyberNinja',
    colors: {
        body: '#1a1a1a',
        armor: '#2a2a2a',
        legs: '#0a0a0a',
        arms: '#2a2a2a',
        head: '#1a1a1a',
        visor: '#ff0040',
        eyeGlow: '#ff0040',
        blade: '#c0c0c0',
        neonRed: '#ff0040',
        trailEffect: '#ff0040'
    }
};

const MECH_GOLEM_COLORS = {
    type: 'mechGolem',
    colors: {
        body: '#3a3a3a',
        armorPlate: '#4a4a4a',
        legs: '#2a2a2a',
        joints: '#5a5a5a',
        arms: '#2a2a2a',
        head: '#3a3a3a',
        viewport: '#001a33',
        core: '#ff6600',
        coreGlow: '#ffaa00',
        weapon: '#5a5a5a',
        sensorLeft: '#00ff00',
        sensorRight: '#00ff00',
        antenna: '#00ffaa',
        exhaust: '#ff6600'
    }
};

// Character Classes for Cyber-Samurai Theme
const CYBER_CLASSES = {
    warrior: {
        name: 'Cyber Samurai',
        spriteData: CYBER_SAMURAI_COLORS,
        baseHP: 150,
        baseMP: 50,
        baseDamage: 15,
        baseDefense: 10,
        speed: 3,
        skills: [
            { name: 'Energy Slash', damage: 30, mpCost: 15, cooldown: 3000, key: 'Q', effect: 'melee' },
            { name: 'Shield Matrix', defense: 20, mpCost: 20, cooldown: 5000, key: 'W', effect: 'defense' },
            { name: 'Thunder Strike', damage: 50, mpCost: 30, cooldown: 8000, key: 'E', effect: 'area' }
        ]
    },
    ninja: {
        name: 'Shadow Runner',
        spriteData: CYBER_NINJA_COLORS,
        baseHP: 100,
        baseMP: 80,
        baseDamage: 25,
        baseDefense: 5,
        speed: 4.5,
        skills: [
            { name: 'Rapid Strike', damage: 20, mpCost: 10, cooldown: 2000, key: 'Q', effect: 'melee' },
            { name: 'Phase Shift', dodge: true, mpCost: 15, cooldown: 4000, key: 'W', effect: 'dodge' },
            { name: 'Assassinate', damage: 60, mpCost: 25, cooldown: 6000, key: 'E', effect: 'critical' }
        ]
    },
    shaman: {
        name: 'Tech Priest',
        spriteData: CYBER_SAMURAI_COLORS, // Custom variant
        baseHP: 120,
        baseMP: 120,
        baseDamage: 18,
        baseDefense: 7,
        speed: 2.8,
        skills: [
            { name: 'Plasma Beam', damage: 25, mpCost: 12, cooldown: 2500, key: 'Q', effect: 'ranged' },
            { name: 'Nano Heal', heal: 40, mpCost: 20, cooldown: 5000, key: 'W', effect: 'heal' },
            { name: 'EMP Burst', damage: 45, mpCost: 28, cooldown: 7000, key: 'E', effect: 'area' }
        ]
    },
    sura: {
        name: 'Dark Ronin',
        spriteData: CYBER_NINJA_COLORS,
        baseHP: 130,
        baseMP: 100,
        baseDamage: 20,
        baseDefense: 8,
        speed: 3.2,
        skills: [
            { name: 'Void Blade', damage: 28, mpCost: 14, cooldown: 2500, key: 'Q', effect: 'melee' },
            { name: 'Life Drain', damage: 20, lifesteal: 0.5, mpCost: 18, cooldown: 4500, key: 'W', effect: 'lifesteal' },
            { name: 'Dark Pulse', damage: 55, mpCost: 32, cooldown: 8000, key: 'E', effect: 'area' }
        ]
    }
};

// Enemy Types
const CYBER_ENEMIES = [
    {
        name: 'Hover Drone',
        spriteData: HOVER_DRONE_COLORS,
        hp: 50,
        damage: 8,
        xp: 25,
        gold: 10,
        speed: 1.5,
        size: 32
    },
    {
        name: 'Rogue Bot',
        spriteData: HOVER_DRONE_COLORS,
        hp: 60,
        damage: 10,
        xp: 30,
        gold: 15,
        speed: 1.2,
        size: 32
    },
    {
        name: 'Cyber Ninja',
        spriteData: CYBER_NINJA_COLORS,
        hp: 80,
        damage: 12,
        xp: 40,
        gold: 20,
        speed: 1.8,
        size: 40
    },
    {
        name: 'Combat Android',
        spriteData: CYBER_NINJA_COLORS,
        hp: 120,
        damage: 15,
        xp: 60,
        gold: 30,
        speed: 0.8,
        size: 40
    },
    {
        name: 'Mech Golem',
        spriteData: MECH_GOLEM_COLORS,
        hp: 200,
        damage: 25,
        xp: 100,
        gold: 50,
        speed: 0.6,
        size: 64
    }
];

// Animation Controller
class AnimationController {
    constructor(sprites) {
        this.sprites = sprites;
        this.currentDirection = 's';
        this.currentAnimation = 'idle';
        this.currentFrame = 0;
        this.frameCounter = 0;
        this.frameDelay = 8; // Frames to wait before switching
    }

    update() {
        this.frameCounter++;
        if (this.frameCounter >= this.frameDelay) {
            this.frameCounter = 0;
            const maxFrames = this.sprites[this.currentDirection][this.currentAnimation].length;
            this.currentFrame = (this.currentFrame + 1) % maxFrames;
        }
    }

    setAnimation(animationType) {
        if (this.currentAnimation !== animationType) {
            this.currentAnimation = animationType;
            this.currentFrame = 0;
            this.frameCounter = 0;
        }
    }

    setDirection(dx, dy) {
        if (dx === 0 && dy === 0) return;

        const angle = Math.atan2(dy, dx);
        const directions = ['e', 'se', 's', 'sw', 'w', 'nw', 'n', 'ne'];
        const index = Math.round((angle + Math.PI) / (Math.PI / 4)) % 8;
        this.currentDirection = directions[index];
    }

    getCurrentFrame() {
        return this.sprites[this.currentDirection][this.currentAnimation][this.currentFrame];
    }
}

// Main Game Class
class CyberSamuraiGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;

        this.spriteRenderer = new SpriteRenderer(this.canvas);

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.player = null;
        this.mobs = [];
        this.projectiles = [];
        this.drops = [];
        this.particles = [];
        this.inventory = Array(5).fill(null);

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
        const classData = CYBER_CLASSES[className];

        // Generate sprites for player
        const playerSprites = this.spriteRenderer.createCharacterSprites(classData.spriteData);

        this.player = {
            class: className,
            name: classData.name,
            x: 400,
            y: 300,
            size: 64,

            level: 1,
            xp: 0,
            xpToLevel: 100,

            hp: classData.baseHP,
            maxHP: classData.baseHP,
            mp: classData.baseMP,
            maxMP: classData.baseMP,

            damage: classData.baseDamage,
            defense: classData.baseDefense,
            speed: classData.speed,

            sprites: playerSprites,
            animController: new AnimationController(playerSprites),

            skills: classData.skills.map(s => ({...s, cooldownRemaining: 0})),
            gold: 0,
            attackCooldown: 0,

            dx: 0,
            dy: 0
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

        const skillIcons = ['⚡', '🛡️', '💥'];

        this.player.skills.forEach((skill, index) => {
            const btn = document.createElement('div');
            btn.className = 'skill-btn';
            btn.id = `skill${index}`;
            btn.innerHTML = `
                <div class="skill-icon">${skillIcons[index]}</div>
                <div class="skill-key">${skill.key}</div>
            `;
            btn.onclick = () => this.useSkill(index);
            skillsDiv.appendChild(btn);
        });
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;

            if (e.key.toLowerCase() === 'q') this.useSkill(0);
            if (e.key.toLowerCase() === 'w') this.useSkill(1);
            if (e.key.toLowerCase() === 'e') this.useSkill(2);

            if (e.key >= '1' && e.key <= '5') {
                this.useItem(parseInt(e.key) - 1);
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

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
            CYBER_ENEMIES.length - 1
        );
        const type = CYBER_ENEMIES[Math.floor(Math.random() * (typeIndex + 1))];

        const spawnDistance = 500;
        const angle = Math.random() * Math.PI * 2;
        const x = this.player.x + Math.cos(angle) * spawnDistance;
        const y = this.player.y + Math.sin(angle) * spawnDistance;

        const mobSprites = this.spriteRenderer.createCharacterSprites(type.spriteData);

        this.mobs.push({
            ...type,
            x, y,
            maxHP: type.hp,
            sprites: mobSprites,
            animController: new AnimationController(mobSprites),
            targetCooldown: 0,
            dx: 0,
            dy: 0
        });
    }

    useSkill(index) {
        if (!this.player) return;

        const skill = this.player.skills[index];

        if (skill.cooldownRemaining > 0) return;
        if (this.player.mp < skill.mpCost) return;

        this.player.mp -= skill.mpCost;
        skill.cooldownRemaining = skill.cooldown;

        this.player.animController.setAnimation('attack');

        if (skill.damage) {
            const nearestMob = this.findNearestMob();
            if (nearestMob) {
                const distance = this.getDistance(this.player, nearestMob);
                if (distance < 300) {
                    this.damageEnemy(nearestMob, skill.damage + this.player.damage);
                    this.createHitEffect(nearestMob.x, nearestMob.y);

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
            this.createHealEffect(this.player.x, this.player.y);
        }

        setTimeout(() => {
            if (this.player) {
                this.player.animController.setAnimation('idle');
            }
        }, 500);

        this.updateHUD();
        this.updateSkillUI(index);
    }

    createHitEffect(x, y) {
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 30,
                color: '#00d9ff',
                size: 2
            });
        }
    }

    createHealEffect(x, y) {
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 2,
                vy: -Math.random() * 3,
                life: 40,
                color: '#00ff88',
                size: 3
            });
        }
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

        this.createDeathEffect(enemy.x, enemy.y);

        this.player.xp += enemy.xp;
        if (this.player.xp >= this.player.xpToLevel) {
            this.levelUp();
        }

        setTimeout(() => this.spawnMob(), 3000);

        this.updateHUD();
    }

    createDeathEffect(x, y) {
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 50,
                color: ['#ff0040', '#00d9ff', '#ffaa00'][Math.floor(Math.random() * 3)],
                size: 3
            });
        }
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

        this.showNotification('⚡ LEVEL UP! ' + this.player.level);
        this.updateHUD();
    }

    showDamage(x, y, damage) {
        const dmg = document.createElement('div');
        dmg.className = 'damage-number';
        dmg.textContent = '-' + damage;

        const screenX = x - this.camera.x + this.canvas.width / 2;
        const screenY = y - this.camera.y + this.canvas.height / 2;

        dmg.style.left = screenX + 'px';
        dmg.style.top = screenY + 'px';
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

    useItem(slot) {
        // Item usage implementation
    }

    update() {
        if (!this.player) return;

        // Player movement
        let dx = 0, dy = 0;

        if (this.keys['arrowleft'] || this.keys['a']) dx -= 1;
        if (this.keys['arrowright'] || this.keys['d']) dx += 1;
        if (this.keys['arrowup'] || this.keys['w']) dy -= 1;
        if (this.keys['arrowdown'] || this.keys['s']) dy += 1;

        if (this.joystickActive) {
            dx = Math.cos(this.joystickAngle) * this.joystickPower;
            dy = Math.sin(this.joystickAngle) * this.joystickPower;
        }

        if (dx !== 0 || dy !== 0) {
            const magnitude = Math.sqrt(dx * dx + dy * dy);
            dx = (dx / magnitude) * this.player.speed;
            dy = (dy / magnitude) * this.player.speed;

            this.player.x += dx;
            this.player.y += dy;

            this.player.animController.setDirection(dx, dy);
            this.player.animController.setAnimation('walk');

            this.player.dx = dx;
            this.player.dy = dy;
        } else {
            if (this.player.animController.currentAnimation === 'walk') {
                this.player.animController.setAnimation('idle');
            }
            this.player.dx = 0;
            this.player.dy = 0;
        }

        this.player.animController.update();

        // Update camera
        this.camera.x = this.player.x;
        this.camera.y = this.player.y;

        // Update mobs
        this.mobs.forEach(mob => {
            const dist = this.getDistance(this.player, mob);

            if (dist < 600) {
                const angle = Math.atan2(this.player.y - mob.y, this.player.x - mob.x);
                const dx = Math.cos(angle) * mob.speed;
                const dy = Math.sin(angle) * mob.speed;

                mob.x += dx;
                mob.y += dy;
                mob.dx = dx;
                mob.dy = dy;

                mob.animController.setDirection(dx, dy);
                mob.animController.setAnimation('walk');

                if (dist < 60) {
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
            } else {
                mob.animController.setAnimation('idle');
                mob.dx = 0;
                mob.dy = 0;
            }

            mob.animController.update();

            if (mob.targetCooldown > 0) {
                mob.targetCooldown -= 16;
            }
        });

        // Update particles
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            return p.life > 0;
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
        // Clear with gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#0a0e27');
        gradient.addColorStop(1, '#16213e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Cyberpunk grid
        this.ctx.strokeStyle = 'rgba(0, 217, 255, 0.1)';
        this.ctx.lineWidth = 1;

        const offsetX = (this.camera.x % 50);
        const offsetY = (this.camera.y % 50);

        for (let x = -offsetX; x < this.canvas.width; x += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = -offsetY; y < this.canvas.height; y += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        this.ctx.save();
        this.ctx.translate(
            this.canvas.width / 2 - this.camera.x,
            this.canvas.height / 2 - this.camera.y
        );

        // Draw mobs
        this.mobs.forEach(mob => {
            const frame = mob.animController.getCurrentFrame();
            this.ctx.drawImage(frame, mob.x - mob.size / 2, mob.y - mob.size / 2);

            // HP bar
            const barWidth = mob.size;
            const barHeight = 4;
            const hpPercent = mob.hp / mob.maxHP;

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(mob.x - barWidth/2, mob.y - mob.size/2 - 8, barWidth, barHeight);

            const hpColor = hpPercent > 0.5 ? '#4ade80' : hpPercent > 0.25 ? '#fbbf24' : '#ef4444';
            this.ctx.fillStyle = hpColor;
            this.ctx.fillRect(mob.x - barWidth/2, mob.y - mob.size/2 - 8, barWidth * hpPercent, barHeight);
        });

        // Draw player
        if (this.player) {
            const frame = this.player.animController.getCurrentFrame();

            // Glow effect
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#00d9ff';
            this.ctx.drawImage(frame, this.player.x - this.player.size / 2, this.player.y - this.player.size / 2);
            this.ctx.shadowBlur = 0;
        }

        // Draw particles
        this.particles.forEach(p => {
            this.ctx.globalAlpha = p.life / 50;
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
        });
        this.ctx.globalAlpha = 1;

        this.ctx.restore();
    }

    updateHUD() {
        if (!this.player) return;

        document.getElementById('playerName').textContent = this.player.name;
        document.getElementById('playerLevel').textContent = `Level: ${this.player.level}`;

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
        alert('💀 Defeated!\n\nLevel: ' + this.player.level + '\nXP: ' + this.player.xp);
        window.location.reload();
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game
const cyberGame = new CyberSamuraiGame();

function selectCharacter(className) {
    cyberGame.selectCharacter(className);
}
