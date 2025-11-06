// Character Classes
const CLASSES = {
    warrior: {
        name: 'Savaşçı',
        icon: '🛡️',
        color: 0x3498db, // Blue
        baseHP: 150,
        baseMP: 50,
        baseDamage: 15,
        baseDefense: 10,
        skills: [
            { name: 'Güçlü Vuruş', icon: '⚔️', damage: 30, mpCost: 15, cooldown: 3000, key: 'Q', color: 0xff6b6b },
            { name: 'Kalkan', icon: '🛡️', defense: 20, mpCost: 20, cooldown: 5000, key: 'W', color: 0x4ecdc4 },
            { name: 'Savaş Çığlığı', icon: '💥', damage: 50, mpCost: 30, cooldown: 8000, key: 'E', color: 0xffe66d }
        ]
    },
    ninja: {
        name: 'Ninja',
        icon: '🗡️',
        color: 0x9b59b6, // Purple
        baseHP: 100,
        baseMP: 80,
        baseDamage: 25,
        baseDefense: 5,
        skills: [
            { name: 'Hızlı Saldırı', icon: '⚡', damage: 20, mpCost: 10, cooldown: 2000, key: 'Q', color: 0xf39c12 },
            { name: 'Gölge Adımı', icon: '💨', dodge: true, mpCost: 15, cooldown: 4000, key: 'W', color: 0x34495e },
            { name: 'Kritik Vuruş', icon: '🗡️', damage: 60, mpCost: 25, cooldown: 6000, key: 'E', color: 0xe74c3c }
        ]
    },
    shaman: {
        name: 'Şaman',
        icon: '🔮',
        color: 0x1abc9c, // Teal
        baseHP: 120,
        baseMP: 120,
        baseDamage: 18,
        baseDefense: 7,
        skills: [
            { name: 'Işın', icon: '✨', damage: 25, mpCost: 12, cooldown: 2500, key: 'Q', color: 0xf1c40f },
            { name: 'İyileştirme', icon: '💚', heal: 40, mpCost: 20, cooldown: 5000, key: 'W', color: 0x2ecc71 },
            { name: 'Yıldırım', icon: '⚡', damage: 45, mpCost: 28, cooldown: 7000, key: 'E', color: 0x3498db }
        ]
    },
    sura: {
        name: 'Sura',
        icon: '⚡',
        color: 0xe74c3c, // Red
        baseHP: 130,
        baseMP: 100,
        baseDamage: 20,
        baseDefense: 8,
        skills: [
            { name: 'Karanlık Kılıç', icon: '🌑', damage: 28, mpCost: 14, cooldown: 2500, key: 'Q', color: 0x2c3e50 },
            { name: 'Ruh Emme', icon: '👻', damage: 20, lifesteal: 0.5, mpCost: 18, cooldown: 4500, key: 'W', color: 0x8e44ad },
            { name: 'Kara Büyü', icon: '💀', damage: 55, mpCost: 32, cooldown: 8000, key: 'E', color: 0x95a5a6 }
        ]
    }
};

// Mob types
const MOB_TYPES = [
    { name: 'Kurt', icon: '🐺', hp: 50, damage: 8, xp: 25, gold: 10, speed: 1.5, color: 0x95a5a6 },
    { name: 'Goblin', icon: '👹', hp: 60, damage: 10, xp: 30, gold: 15, speed: 1.2, color: 0x27ae60 },
    { name: 'Ork', icon: '👾', hp: 80, damage: 12, xp: 40, gold: 20, speed: 1.0, color: 0x16a085 },
    { name: 'Troll', icon: '🧟', hp: 120, damage: 15, xp: 60, gold: 30, speed: 0.8, color: 0x7f8c8d },
    { name: 'Ejderha', icon: '🐉', hp: 200, damage: 25, xp: 100, gold: 50, speed: 0.6, color: 0xc0392b }
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
        this.container = document.getElementById('gameCanvas');

        this.scene = null;
        this.camera = null;
        this.renderer = null;

        this.player = null;
        this.playerMesh = null;
        this.mobs = [];
        this.drops = [];
        this.projectiles = [];
        this.inventory = Array(5).fill(null);

        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        this.animationState = 'idle'; // idle, walking, attacking, skill
        this.animationTime = 0;

        this.setupControls();
    }

    initThreeJS() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);
        this.scene.fog = new THREE.Fog(0x1a1a2e, 50, 200);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 30, 40);
        this.camera.lookAt(0, 0, 0);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(50, 50, 50);
        dirLight.castShadow = true;
        dirLight.shadow.camera.left = -100;
        dirLight.shadow.camera.right = 100;
        dirLight.shadow.camera.top = 100;
        dirLight.shadow.camera.bottom = -100;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        this.scene.add(dirLight);

        // Ground
        const groundGeometry = new THREE.PlaneGeometry(200, 200, 20, 20);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x2c3e50,
            roughness: 0.8,
            metalness: 0.2
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Grid helper
        const gridHelper = new THREE.GridHelper(200, 40, 0x444444, 0x222222);
        this.scene.add(gridHelper);

        // Resize handler
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    createCharacterMesh(className) {
        const classData = CLASSES[className];
        const group = new THREE.Group();

        // Body
        const bodyGeometry = new THREE.BoxGeometry(1.2, 2, 0.8);
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: classData.color,
            roughness: 0.5,
            metalness: 0.3
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 1;
        body.castShadow = true;
        body.receiveShadow = true;
        group.add(body);

        // Head
        const headGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        const headMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd4a3,
            roughness: 0.7
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 2.5;
        head.castShadow = true;
        group.add(head);

        // Arms
        const armGeometry = new THREE.BoxGeometry(0.3, 1.2, 0.3);
        const armMaterial = new THREE.MeshStandardMaterial({
            color: classData.color,
            roughness: 0.5
        });

        const leftArm = new THREE.Mesh(armGeometry, armMaterial);
        leftArm.position.set(-0.8, 1.2, 0);
        leftArm.castShadow = true;
        group.add(leftArm);

        const rightArm = new THREE.Mesh(armGeometry, armMaterial);
        rightArm.position.set(0.8, 1.2, 0);
        rightArm.castShadow = true;
        group.add(rightArm);

        // Legs
        const legGeometry = new THREE.BoxGeometry(0.4, 1.5, 0.4);
        const legMaterial = new THREE.MeshStandardMaterial({
            color: 0x2c3e50,
            roughness: 0.8
        });

        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        leftLeg.position.set(-0.4, 0.25, 0);
        leftLeg.castShadow = true;
        group.add(leftLeg);

        const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        rightLeg.position.set(0.4, 0.25, 0);
        rightLeg.castShadow = true;
        group.add(rightLeg);

        // Weapon indicator based on class
        let weapon;
        if (className === 'warrior') {
            const weaponGeometry = new THREE.BoxGeometry(0.2, 2, 0.2);
            const weaponMaterial = new THREE.MeshStandardMaterial({ color: 0xc0c0c0 });
            weapon = new THREE.Mesh(weaponGeometry, weaponMaterial);
            weapon.position.set(1, 1.5, 0);
            weapon.castShadow = true;
            group.add(weapon);
        } else if (className === 'ninja') {
            const weaponGeometry = new THREE.BoxGeometry(0.15, 1.5, 0.1);
            const weaponMaterial = new THREE.MeshStandardMaterial({ color: 0x34495e });
            weapon = new THREE.Mesh(weaponGeometry, weaponMaterial);
            weapon.position.set(0.9, 1.2, 0);
            weapon.rotation.z = -0.5;
            weapon.castShadow = true;
            group.add(weapon);
        } else if (className === 'shaman') {
            const staffGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2.5);
            const staffMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
            weapon = new THREE.Mesh(staffGeometry, staffMaterial);
            weapon.position.set(0.9, 1.5, 0);
            weapon.castShadow = true;
            group.add(weapon);

            const orbGeometry = new THREE.SphereGeometry(0.3, 16, 16);
            const orbMaterial = new THREE.MeshStandardMaterial({
                color: 0x00ffff,
                emissive: 0x00ffff,
                emissiveIntensity: 0.5
            });
            const orb = new THREE.Mesh(orbGeometry, orbMaterial);
            orb.position.set(0.9, 2.8, 0);
            group.add(orb);
        } else if (className === 'sura') {
            const weaponGeometry = new THREE.BoxGeometry(0.2, 1.8, 0.3);
            const weaponMaterial = new THREE.MeshStandardMaterial({
                color: 0x8b0000,
                emissive: 0x8b0000,
                emissiveIntensity: 0.3
            });
            weapon = new THREE.Mesh(weaponGeometry, weaponMaterial);
            weapon.position.set(1, 1.4, 0);
            weapon.castShadow = true;
            group.add(weapon);
        }

        // Store body parts for animation
        group.userData = {
            body, head, leftArm, rightArm, leftLeg, rightLeg, weapon
        };

        return group;
    }

    createMobMesh(mobType) {
        const group = new THREE.Group();

        // Main body - different shapes for different mobs
        const bodyGeometry = new THREE.BoxGeometry(1, 1.5, 0.8);
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: mobType.color,
            roughness: 0.7,
            metalness: 0.2
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.75;
        body.castShadow = true;
        group.add(body);

        // Head
        const headGeometry = new THREE.SphereGeometry(0.4, 12, 12);
        const headMaterial = new THREE.MeshStandardMaterial({
            color: mobType.color,
            roughness: 0.7
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.8;
        head.castShadow = true;
        group.add(head);

        // Eyes (red glow)
        const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const eyeMaterial = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0xff0000,
            emissiveIntensity: 1
        });

        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.15, 1.85, 0.35);
        group.add(leftEye);

        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.15, 1.85, 0.35);
        group.add(rightEye);

        group.userData = { body, head };

        return group;
    }

    createDropMesh(item) {
        const group = new THREE.Group();

        let geometry, material;

        if (item.type === 'potion') {
            geometry = new THREE.CylinderGeometry(0.2, 0.25, 0.5, 8);
            material = new THREE.MeshStandardMaterial({
                color: item.heal ? 0xff0000 : 0x0000ff,
                emissive: item.heal ? 0xff0000 : 0x0000ff,
                emissiveIntensity: 0.3
            });
        } else if (item.type === 'gold') {
            geometry = new THREE.BoxGeometry(0.3, 0.3, 0.1);
            material = new THREE.MeshStandardMaterial({
                color: 0xffd700,
                emissive: 0xffd700,
                emissiveIntensity: 0.5,
                metalness: 0.8
            });
        } else {
            geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
            material = new THREE.MeshStandardMaterial({
                color: 0xc0c0c0,
                metalness: 0.7
            });
        }

        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        group.add(mesh);

        return group;
    }

    selectCharacter(className) {
        this.initThreeJS();

        const classData = CLASSES[className];

        this.player = {
            class: className,
            name: classData.name,
            icon: classData.icon,
            x: 0,
            y: 0,
            z: 0,

            level: 1,
            xp: 0,
            xpToLevel: 100,

            hp: classData.baseHP,
            maxHP: classData.baseHP,
            mp: classData.baseMP,
            maxMP: classData.baseMP,

            damage: classData.baseDamage,
            defense: classData.baseDefense,

            speed: 0.15,
            skills: classData.skills.map(s => ({...s, cooldownRemaining: 0})),

            gold: 0,
            attackCooldown: 0,
            rotation: 0
        };

        this.playerMesh = this.createCharacterMesh(className);
        this.playerMesh.position.set(0, 0, 0);
        this.scene.add(this.playerMesh);

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

            // Attack
            if (e.key === ' ') this.attack();

            // Use potion
            if (e.key >= '1' && e.key <= '5') {
                this.useItem(parseInt(e.key) - 1);
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        // Attack button
        const attackBtn = document.getElementById('attackBtn');
        attackBtn.addEventListener('click', () => this.attack());

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

        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 40;
        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;

        const mobMesh = this.createMobMesh(type);
        mobMesh.position.set(x, 0, z);
        this.scene.add(mobMesh);

        this.mobs.push({
            ...type,
            x, y: 0, z,
            maxHP: type.hp,
            mesh: mobMesh,
            targetCooldown: 0,
            animationTime: Math.random() * 100
        });
    }

    attack() {
        if (!this.player || this.player.attackCooldown > 0) return;

        this.player.attackCooldown = 500;
        this.animationState = 'attacking';
        this.animationTime = 0;

        const nearestMob = this.findNearestMob();
        if (nearestMob) {
            const distance = this.getDistance3D(this.player, nearestMob);
            if (distance < 5) {
                this.damageEnemy(nearestMob, this.player.damage);
            }
        }
    }

    useSkill(index) {
        if (!this.player) return;

        const skill = this.player.skills[index];

        if (skill.cooldownRemaining > 0) return;
        if (this.player.mp < skill.mpCost) return;

        this.player.mp -= skill.mpCost;
        skill.cooldownRemaining = skill.cooldown;

        this.animationState = 'skill';
        this.animationTime = 0;

        // Create skill effect
        this.createSkillEffect(skill);

        // Skill effects
        if (skill.damage) {
            const nearestMob = this.findNearestMob();
            if (nearestMob) {
                const distance = this.getDistance3D(this.player, nearestMob);
                if (distance < 10) {
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

    createSkillEffect(skill) {
        const geometry = new THREE.SphereGeometry(2, 16, 16);
        const material = new THREE.MeshStandardMaterial({
            color: skill.color,
            emissive: skill.color,
            emissiveIntensity: 0.8,
            transparent: true,
            opacity: 0.6
        });
        const effect = new THREE.Mesh(geometry, material);
        effect.position.copy(this.playerMesh.position);
        effect.position.y += 2;
        this.scene.add(effect);

        // Animate and remove effect
        let scale = 0.1;
        const animate = () => {
            scale += 0.1;
            effect.scale.set(scale, scale, scale);
            material.opacity -= 0.02;

            if (material.opacity <= 0) {
                this.scene.remove(effect);
            } else {
                requestAnimationFrame(animate);
            }
        };
        animate();
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
            const dist = this.getDistance3D(this.player, mob);
            if (dist < minDist) {
                minDist = dist;
                nearest = mob;
            }
        });

        return nearest;
    }

    getDistance3D(a, b) {
        return Math.sqrt((a.x - b.x) ** 2 + (a.z - b.z) ** 2);
    }

    damageEnemy(enemy, damage) {
        enemy.hp -= damage;
        this.showDamage(enemy.mesh.position.x, enemy.mesh.position.z, damage);

        // Flash red
        enemy.mesh.traverse((child) => {
            if (child.isMesh && child.material) {
                const originalColor = child.material.color.clone();
                child.material.color.set(0xff0000);
                setTimeout(() => {
                    child.material.color.copy(originalColor);
                }, 100);
            }
        });

        if (enemy.hp <= 0) {
            this.killEnemy(enemy);
        }
    }

    killEnemy(enemy) {
        const index = this.mobs.indexOf(enemy);
        if (index > -1) {
            this.mobs.splice(index, 1);
        }

        this.scene.remove(enemy.mesh);

        // XP
        this.player.xp += enemy.xp;
        if (this.player.xp >= this.player.xpToLevel) {
            this.levelUp();
        }

        // Drop
        if (Math.random() < 0.4) {
            const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
            const dropMesh = this.createDropMesh(item);
            dropMesh.position.set(enemy.x, 0.5, enemy.z);
            this.scene.add(dropMesh);

            this.drops.push({
                ...item,
                x: enemy.x,
                y: 0,
                z: enemy.z,
                mesh: dropMesh
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

        // Level up effect
        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            emissive: 0xffd700,
            emissiveIntensity: 1,
            transparent: true,
            opacity: 0.5
        });
        const levelUpEffect = new THREE.Mesh(geometry, material);
        levelUpEffect.position.copy(this.playerMesh.position);
        this.scene.add(levelUpEffect);

        setTimeout(() => this.scene.remove(levelUpEffect), 1000);

        this.showNotification('🎉 LEVEL UP! ' + this.player.level);
        this.updateHUD();
    }

    showDamage(x, z, damage) {
        const worldToScreen = (pos) => {
            const vector = pos.clone();
            vector.project(this.camera);

            const widthHalf = window.innerWidth / 2;
            const heightHalf = window.innerHeight / 2;

            return {
                x: (vector.x * widthHalf) + widthHalf,
                y: -(vector.y * heightHalf) + heightHalf
            };
        };

        const pos3D = new THREE.Vector3(x, 2, z);
        const pos2D = worldToScreen(pos3D);

        const dmg = document.createElement('div');
        dmg.className = 'damage-number';
        dmg.textContent = '-' + damage;
        dmg.style.left = pos2D.x + 'px';
        dmg.style.top = pos2D.y + 'px';
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

        this.scene.remove(drop.mesh);

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

    animateCharacter() {
        if (!this.playerMesh || !this.playerMesh.userData) return;

        const { body, head, leftArm, rightArm, leftLeg, rightLeg, weapon } = this.playerMesh.userData;

        if (this.animationState === 'walking') {
            // Walking animation - swinging arms and legs
            const walkCycle = Math.sin(this.animationTime * 10) * 0.5;

            if (leftArm) leftArm.rotation.x = walkCycle;
            if (rightArm) rightArm.rotation.x = -walkCycle;
            if (leftLeg) leftLeg.rotation.x = -walkCycle;
            if (rightLeg) rightLeg.rotation.x = walkCycle;

            // Bob up and down
            if (body) body.position.y = 1 + Math.abs(Math.sin(this.animationTime * 10)) * 0.1;
            if (head) head.position.y = 2.5 + Math.abs(Math.sin(this.animationTime * 10)) * 0.1;

        } else if (this.animationState === 'attacking') {
            // Attack animation - thrust forward
            const attackProgress = Math.min(this.animationTime / 0.3, 1);
            const thrust = Math.sin(attackProgress * Math.PI) * 0.5;

            if (rightArm) {
                rightArm.rotation.x = -Math.PI / 2 * attackProgress;
                rightArm.position.z = thrust;
            }
            if (weapon) {
                weapon.position.z = thrust;
            }

            if (attackProgress >= 1) {
                this.animationState = 'idle';
                if (rightArm) {
                    rightArm.rotation.x = 0;
                    rightArm.position.z = 0;
                }
                if (weapon) weapon.position.z = 0;
            }

        } else if (this.animationState === 'skill') {
            // Skill animation - spin and raise arms
            const skillProgress = Math.min(this.animationTime / 0.5, 1);

            this.playerMesh.rotation.y += 0.3;

            if (leftArm) leftArm.rotation.z = Math.PI / 4 * skillProgress;
            if (rightArm) rightArm.rotation.z = -Math.PI / 4 * skillProgress;

            const jump = Math.sin(skillProgress * Math.PI) * 1;
            this.playerMesh.position.y = jump;

            if (skillProgress >= 1) {
                this.animationState = 'idle';
                this.playerMesh.position.y = 0;
                if (leftArm) leftArm.rotation.z = 0;
                if (rightArm) rightArm.rotation.z = 0;
            }

        } else {
            // Idle animation - gentle breathing
            const idle = Math.sin(this.animationTime * 2) * 0.05;
            if (body) body.position.y = 1 + idle;
            if (head) head.position.y = 2.5 + idle;

            // Reset limbs
            if (leftArm) leftArm.rotation.x = 0;
            if (rightArm) rightArm.rotation.x = 0;
            if (leftLeg) leftLeg.rotation.x = 0;
            if (rightLeg) rightLeg.rotation.x = 0;
        }
    }

    animateMobs() {
        this.mobs.forEach(mob => {
            if (!mob.mesh || !mob.mesh.userData) return;

            const { body, head } = mob.mesh.userData;

            // Idle animation
            const idle = Math.sin(mob.animationTime) * 0.05;
            if (body) body.position.y = 0.75 + idle;
            if (head) head.position.y = 1.8 + idle;

            // Rotate slowly
            mob.mesh.rotation.y += 0.01;

            mob.animationTime += 0.05;
        });
    }

    update() {
        if (!this.player || !this.playerMesh) return;

        const deltaTime = 0.016; // ~60fps
        this.animationTime += deltaTime;

        // Player movement
        let dx = 0, dz = 0;
        let isMoving = false;

        if (this.keys['arrowleft'] || this.keys['a']) { dx -= 1; isMoving = true; }
        if (this.keys['arrowright'] || this.keys['d']) { dx += 1; isMoving = true; }
        if (this.keys['arrowup'] || this.keys['w']) { dz -= 1; isMoving = true; }
        if (this.keys['arrowdown'] || this.keys['s']) { dz += 1; isMoving = true; }

        // Joystick
        if (this.joystickActive) {
            dx = Math.cos(this.joystickAngle) * this.joystickPower;
            dz = Math.sin(this.joystickAngle) * this.joystickPower;
            isMoving = this.joystickPower > 0.1;
        }

        if (isMoving && this.animationState === 'idle') {
            this.animationState = 'walking';
        } else if (!isMoving && this.animationState === 'walking') {
            this.animationState = 'idle';
        }

        if (dx || dz) {
            const magnitude = Math.sqrt(dx * dx + dz * dz);
            dx = (dx / magnitude) * this.player.speed;
            dz = (dz / magnitude) * this.player.speed;

            this.player.x += dx;
            this.player.z += dz;

            // Clamp to bounds
            this.player.x = Math.max(-90, Math.min(90, this.player.x));
            this.player.z = Math.max(-90, Math.min(90, this.player.z));

            this.playerMesh.position.x = this.player.x;
            this.playerMesh.position.z = this.player.z;

            // Rotate player to face movement direction
            const targetRotation = Math.atan2(dx, dz);
            this.player.rotation = targetRotation;
            this.playerMesh.rotation.y = targetRotation;
        }

        // Animate character
        this.animateCharacter();
        this.animateMobs();

        // Update camera to follow player
        this.camera.position.x = this.player.x;
        this.camera.position.z = this.player.z + 40;
        this.camera.lookAt(this.player.x, 0, this.player.z);

        // Update mobs
        this.mobs.forEach(mob => {
            const dist = this.getDistance3D(this.player, mob);

            if (dist < 30) {
                const angle = Math.atan2(this.player.z - mob.z, this.player.x - mob.x);
                mob.x += Math.cos(angle) * mob.speed * 0.05;
                mob.z += Math.sin(angle) * mob.speed * 0.05;

                mob.mesh.position.x = mob.x;
                mob.mesh.position.z = mob.z;

                // Face player
                mob.mesh.rotation.y = angle + Math.PI / 2;

                // Attack player
                if (dist < 3) {
                    if (mob.targetCooldown <= 0) {
                        const damage = Math.max(1, mob.damage - this.player.defense);
                        this.player.hp -= damage;
                        this.showDamage(this.player.x, this.player.z, damage);
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

        // Update drops - rotate them
        this.drops.forEach(drop => {
            drop.mesh.rotation.y += 0.05;
            drop.mesh.position.y = 0.5 + Math.sin(Date.now() * 0.003) * 0.2;

            if (this.getDistance3D(this.player, drop) < 2) {
                this.pickupDrop(drop);
            }
        });

        // Update cooldowns
        this.player.skills.forEach(skill => {
            if (skill.cooldownRemaining > 0) {
                skill.cooldownRemaining -= 16;
            }
        });

        if (this.player.attackCooldown > 0) {
            this.player.attackCooldown -= 16;
        }

        // MP regen
        if (this.player.mp < this.player.maxMP) {
            this.player.mp = Math.min(this.player.maxMP, this.player.mp + 0.1);
            if (Math.random() < 0.1) this.updateHUD();
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
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game
const game = new Game();

function selectCharacter(className) {
    game.selectCharacter(className);
}
