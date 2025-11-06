// Character Classes
const CLASSES = {
    warrior: {
        name: 'Savaşçı',
        icon: '🛡️',
        color: 0x4a9eff,
        baseHP: 150,
        baseMP: 50,
        baseDamage: 15,
        baseDefense: 10
    },
    ninja: {
        name: 'Ninja',
        icon: '🗡️',
        color: 0xff4444,
        baseHP: 100,
        baseMP: 80,
        baseDamage: 25,
        baseDefense: 5
    },
    shaman: {
        name: 'Şaman',
        icon: '🔮',
        color: 0x9944ff,
        baseHP: 120,
        baseMP: 120,
        baseDamage: 18,
        baseDefense: 7
    },
    sura: {
        name: 'Sura',
        icon: '⚡',
        color: 0xffaa00,
        baseHP: 130,
        baseMP: 100,
        baseDamage: 20,
        baseDefense: 8
    }
};

class Game3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.player = null;
        this.mobs = [];
        this.terrain = null;

        // World settings
        this.WORLD_SIZE = 200;
        this.TERRAIN_SEGMENTS = 50;

        // Controls
        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        // Game state
        this.selectedClass = null;
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87ceeb);
        this.scene.fog = new THREE.Fog(0x87ceeb, 50, 150);

        // Create camera (3rd person view)
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 100, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.left = -100;
        directionalLight.shadow.camera.right = 100;
        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.bottom = -100;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Create terrain
        this.createTerrain();

        // Setup controls
        this.setupControls();

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());

        // Start animation loop
        this.animate();
    }

    createTerrain() {
        // Create heightmap terrain
        const geometry = new THREE.PlaneGeometry(
            this.WORLD_SIZE,
            this.WORLD_SIZE,
            this.TERRAIN_SEGMENTS,
            this.TERRAIN_SEGMENTS
        );

        // Generate random heights
        const vertices = geometry.attributes.position.array;
        for (let i = 0; i < vertices.length; i += 3) {
            const x = vertices[i];
            const y = vertices[i + 1];

            // Use noise-like function for natural terrain
            const height = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 3 +
                          Math.sin(x * 0.05) * Math.cos(y * 0.05) * 5;

            vertices[i + 2] = height;
        }
        geometry.computeVertexNormals();

        // Create material with vertex colors for grass/dirt/hills
        const material = new THREE.MeshStandardMaterial({
            color: 0x3a8a3f,
            flatShading: false,
            roughness: 0.8,
            metalness: 0.2
        });

        this.terrain = new THREE.Mesh(geometry, material);
        this.terrain.rotation.x = -Math.PI / 2;
        this.terrain.receiveShadow = true;
        this.scene.add(this.terrain);

        // Add some trees/obstacles
        this.addTrees();
    }

    addTrees() {
        const treeCount = 30;
        for (let i = 0; i < treeCount; i++) {
            const x = (Math.random() - 0.5) * this.WORLD_SIZE * 0.8;
            const z = (Math.random() - 0.5) * this.WORLD_SIZE * 0.8;
            const y = this.getTerrainHeight(x, z);

            // Tree trunk
            const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.7, 4, 8);
            const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
            const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
            trunk.position.set(x, y + 2, z);
            trunk.castShadow = true;
            trunk.receiveShadow = true;
            this.scene.add(trunk);

            // Tree foliage
            const foliageGeometry = new THREE.ConeGeometry(2, 5, 8);
            const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
            const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
            foliage.position.set(x, y + 6, z);
            foliage.castShadow = true;
            foliage.receiveShadow = true;
            this.scene.add(foliage);
        }
    }

    getTerrainHeight(x, z) {
        // Calculate terrain height at position
        return Math.sin(x * 0.1) * Math.cos(z * 0.1) * 3 +
               Math.sin(x * 0.05) * Math.cos(z * 0.05) * 5;
    }

    selectCharacter(className) {
        this.selectedClass = className;
        const classData = CLASSES[className];

        // Create player (3D character)
        const geometry = new THREE.CapsuleGeometry(1, 2, 8, 16);
        const material = new THREE.MeshStandardMaterial({
            color: classData.color,
            roughness: 0.5,
            metalness: 0.3
        });

        this.player = new THREE.Mesh(geometry, material);
        this.player.position.set(0, 3, 0);
        this.player.castShadow = true;
        this.player.receiveShadow = true;
        this.scene.add(this.player);

        // Player data
        this.player.userData = {
            class: className,
            name: classData.name,
            icon: classData.icon,
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
            rotationSpeed: 0.1,
            targetRotation: 0
        };

        // Position camera behind player
        this.updateCamera();

        // Hide character selection
        document.getElementById('charSelect').classList.add('hidden');
        document.getElementById('hud').style.display = 'block';
        document.getElementById('joystick').style.display = 'block';
        document.getElementById('minimap').style.display = 'block';

        // Spawn mobs
        this.spawnMobs();

        // Update HUD
        this.updateHUD();
    }

    spawnMobs() {
        const mobCount = 10;
        const mobGeometry = new THREE.BoxGeometry(1.5, 2, 1.5);

        for (let i = 0; i < mobCount; i++) {
            const x = (Math.random() - 0.5) * this.WORLD_SIZE * 0.7;
            const z = (Math.random() - 0.5) * this.WORLD_SIZE * 0.7;
            const y = this.getTerrainHeight(x, z);

            const mobMaterial = new THREE.MeshStandardMaterial({
                color: 0xff0000,
                roughness: 0.7
            });
            const mob = new THREE.Mesh(mobGeometry, mobMaterial);
            mob.position.set(x, y + 1, z);
            mob.castShadow = true;
            mob.receiveShadow = true;

            mob.userData = {
                hp: 50,
                maxHP: 50,
                damage: 10,
                speed: 0.05,
                targetCooldown: 0
            };

            this.scene.add(mob);
            this.mobs.push(mob);
        }
    }

    setupControls() {
        // Keyboard
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
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

    update() {
        if (!this.player) return;

        const data = this.player.userData;
        let moveX = 0;
        let moveZ = 0;

        // Keyboard input
        if (this.keys['w'] || this.keys['arrowup']) moveZ -= 1;
        if (this.keys['s'] || this.keys['arrowdown']) moveZ += 1;
        if (this.keys['a'] || this.keys['arrowleft']) moveX -= 1;
        if (this.keys['d'] || this.keys['arrowright']) moveX += 1;

        // Joystick input
        if (this.joystickActive) {
            moveX = Math.cos(this.joystickAngle) * this.joystickPower;
            moveZ = Math.sin(this.joystickAngle) * this.joystickPower;
        }

        // Move player
        if (moveX !== 0 || moveZ !== 0) {
            // Normalize movement
            const magnitude = Math.sqrt(moveX * moveX + moveZ * moveZ);
            moveX = (moveX / magnitude) * data.speed;
            moveZ = (moveZ / magnitude) * data.speed;

            // Move in world space
            this.player.position.x += moveX;
            this.player.position.z += moveZ;

            // Clamp to world bounds
            const halfWorld = this.WORLD_SIZE / 2 - 5;
            this.player.position.x = Math.max(-halfWorld, Math.min(halfWorld, this.player.position.x));
            this.player.position.z = Math.max(-halfWorld, Math.min(halfWorld, this.player.position.z));

            // Update player height based on terrain
            this.player.position.y = this.getTerrainHeight(this.player.position.x, this.player.position.z) + 2;

            // Rotate player towards movement direction
            data.targetRotation = Math.atan2(moveX, moveZ);
        }

        // Smooth rotation
        let rotationDiff = data.targetRotation - this.player.rotation.y;
        while (rotationDiff > Math.PI) rotationDiff -= Math.PI * 2;
        while (rotationDiff < -Math.PI) rotationDiff += Math.PI * 2;
        this.player.rotation.y += rotationDiff * data.rotationSpeed;

        // Update camera
        this.updateCamera();

        // Update mobs
        this.updateMobs();
    }

    updateMobs() {
        if (!this.player) return;

        this.mobs.forEach(mob => {
            const dx = this.player.position.x - mob.position.x;
            const dz = this.player.position.z - mob.position.z;
            const distance = Math.sqrt(dx * dx + dz * dz);

            // Chase player if nearby
            if (distance < 30) {
                const moveX = (dx / distance) * mob.userData.speed;
                const moveZ = (dz / distance) * mob.userData.speed;

                mob.position.x += moveX;
                mob.position.z += moveZ;
                mob.position.y = this.getTerrainHeight(mob.position.x, mob.position.z) + 1;

                // Rotate towards player
                mob.rotation.y = Math.atan2(dx, dz);

                // Attack player
                if (distance < 3 && mob.userData.targetCooldown <= 0) {
                    const damage = Math.max(1, mob.userData.damage - this.player.userData.defense);
                    this.player.userData.hp -= damage;
                    mob.userData.targetCooldown = 60;

                    if (this.player.userData.hp <= 0) {
                        alert('Öldün! Seviye: ' + this.player.userData.level);
                        location.reload();
                    }

                    this.updateHUD();
                }
            }

            if (mob.userData.targetCooldown > 0) {
                mob.userData.targetCooldown--;
            }
        });
    }

    updateCamera() {
        if (!this.player) return;

        // 3rd person camera behind player
        const cameraDistance = 15;
        const cameraHeight = 8;

        const offsetX = Math.sin(this.player.rotation.y) * cameraDistance;
        const offsetZ = Math.cos(this.player.rotation.y) * cameraDistance;

        this.camera.position.x = this.player.position.x + offsetX;
        this.camera.position.y = this.player.position.y + cameraHeight;
        this.camera.position.z = this.player.position.z + offsetZ;

        this.camera.lookAt(
            this.player.position.x,
            this.player.position.y + 2,
            this.player.position.z
        );
    }

    updateHUD() {
        if (!this.player) return;

        const data = this.player.userData;

        document.getElementById('playerName').textContent = data.name;
        document.getElementById('playerLevel').textContent = `Seviye: ${data.level}`;

        const hpPercent = (data.hp / data.maxHP) * 100;
        const mpPercent = (data.mp / data.maxMP) * 100;
        const xpPercent = (data.xp / data.xpToLevel) * 100;

        document.getElementById('hpBar').style.width = hpPercent + '%';
        document.getElementById('mpBar').style.width = mpPercent + '%';
        document.getElementById('xpBar').style.width = xpPercent + '%';

        document.getElementById('hpText').textContent = `HP: ${Math.floor(data.hp)}/${data.maxHP}`;
        document.getElementById('mpText').textContent = `MP: ${Math.floor(data.mp)}/${data.maxMP}`;
        document.getElementById('xpText').textContent = `XP: ${data.xp}/${data.xpToLevel}`;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.update();
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Initialize game
const game = new Game3D();
game.init();

function selectCharacter(className) {
    game.selectCharacter(className);
}
