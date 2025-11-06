// Character Classes
const CLASSES = {
    warrior: {
        name: 'Savaşçı',
        icon: '🛡️',
        baseHP: 150,
        baseMP: 50,
        baseDamage: 15,
        baseDefense: 10,
        color: 0x4488ff,
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
        color: 0x883388,
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
        color: 0x44ff88,
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
        color: 0xff4444,
        skills: [
            { name: 'Karanlık Kılıç', icon: '🌑', damage: 28, mpCost: 14, cooldown: 2500, key: 'Q' },
            { name: 'Ruh Emme', icon: '👻', damage: 20, lifesteal: 0.5, mpCost: 18, cooldown: 4500, key: 'W' },
            { name: 'Kara Büyü', icon: '💀', damage: 55, mpCost: 32, cooldown: 8000, key: 'E' }
        ]
    }
};

// First Village Monsters (Level 1-32) with 3D properties
const MOB_TYPES = [
    { name: 'Aç Köpek', icon: '🐕', hp: 30, damage: 3, xp: 8, gold: 5, speed: 2.0, minLevel: 1, maxLevel: 3, zone: 0,
      color: 0x8B4513, size: 0.8, height: 0.6, shape: 'dog' },
    { name: 'Köpek', icon: '🐶', hp: 45, damage: 5, xp: 12, gold: 8, speed: 1.8, minLevel: 2, maxLevel: 5, zone: 1,
      color: 0xA0522D, size: 0.9, height: 0.7, shape: 'dog' },
    { name: 'Kurt', icon: '🐺', hp: 65, damage: 8, xp: 18, gold: 12, speed: 1.7, minLevel: 4, maxLevel: 7, zone: 2,
      color: 0x696969, size: 1.0, height: 0.9, shape: 'wolf' },
    { name: 'Aç Kurt', icon: '🐺', hp: 85, damage: 11, xp: 25, gold: 15, speed: 1.8, minLevel: 6, maxLevel: 9, zone: 3,
      color: 0x556B2F, size: 1.1, height: 0.95, shape: 'wolf' },
    { name: 'Domuz', icon: '🐗', hp: 110, damage: 14, xp: 35, gold: 20, speed: 1.5, minLevel: 8, maxLevel: 11, zone: 4,
      color: 0x8B7355, size: 1.2, height: 0.8, shape: 'boar' },
    { name: 'Aç Domuz', icon: '🐗', hp: 140, damage: 18, xp: 50, gold: 25, speed: 1.6, minLevel: 10, maxLevel: 13, zone: 5,
      color: 0x654321, size: 1.3, height: 0.9, shape: 'boar' },
    { name: 'Ayı', icon: '🐻', hp: 180, damage: 23, xp: 70, gold: 35, speed: 1.3, minLevel: 12, maxLevel: 15, zone: 6,
      color: 0x8B4726, size: 1.5, height: 1.5, shape: 'bear' },
    { name: 'Aç Ayı', icon: '🐻', hp: 230, damage: 28, xp: 95, gold: 45, speed: 1.4, minLevel: 14, maxLevel: 17, zone: 7,
      color: 0x654321, size: 1.6, height: 1.6, shape: 'bear' },
    { name: 'Timsah', icon: '🐊', hp: 290, damage: 35, xp: 125, gold: 60, speed: 1.2, minLevel: 16, maxLevel: 19, zone: 8,
      color: 0x228B22, size: 1.8, height: 0.6, shape: 'crocodile' },
    { name: 'Aç Timsah', icon: '🐊', hp: 360, damage: 42, xp: 160, gold: 75, speed: 1.3, minLevel: 18, maxLevel: 21, zone: 9,
      color: 0x2F4F2F, size: 1.9, height: 0.7, shape: 'crocodile' },
    { name: 'Boz Ayı', icon: '🐻', hp: 440, damage: 50, xp: 200, gold: 95, speed: 1.2, minLevel: 20, maxLevel: 23, zone: 10,
      color: 0xA9A9A9, size: 1.7, height: 1.7, shape: 'bear' },
    { name: 'Aç Boz Ayı', icon: '🐻‍❄️', hp: 530, damage: 60, xp: 250, gold: 115, speed: 1.3, minLevel: 22, maxLevel: 25, zone: 11,
      color: 0xDCDCDC, size: 1.8, height: 1.8, shape: 'bear' },
    { name: 'Maymun', icon: '🐵', hp: 630, damage: 70, xp: 310, gold: 140, speed: 1.6, minLevel: 24, maxLevel: 27, zone: 12,
      color: 0xCD853F, size: 1.0, height: 1.2, shape: 'monkey' },
    { name: 'Aç Maymun', icon: '🐒', hp: 750, damage: 82, xp: 380, gold: 170, speed: 1.7, minLevel: 26, maxLevel: 29, zone: 13,
      color: 0xD2691E, size: 1.1, height: 1.3, shape: 'monkey' },
    { name: 'Kaplan', icon: '🐯', hp: 890, damage: 95, xp: 460, gold: 200, speed: 1.8, minLevel: 28, maxLevel: 31, zone: 14,
      color: 0xFF8C00, size: 1.6, height: 1.2, shape: 'tiger' },
    { name: 'Aç Kaplan', icon: '🐅', hp: 1050, damage: 110, xp: 550, gold: 240, speed: 1.9, minLevel: 30, maxLevel: 33, zone: 15,
      color: 0xFF6347, size: 1.7, height: 1.3, shape: 'tiger' },
    { name: 'Aslan', icon: '🦁', hp: 1240, damage: 128, xp: 650, gold: 280, speed: 1.7, minLevel: 31, maxLevel: 35, zone: 16,
      color: 0xDAA520, size: 1.8, height: 1.4, shape: 'lion' },
    { name: 'Aç Aslan', icon: '🦁', hp: 1460, damage: 148, xp: 770, gold: 330, speed: 1.8, minLevel: 32, maxLevel: 40, zone: 16,
      color: 0xB8860B, size: 1.9, height: 1.5, shape: 'lion' }
];

// Map zones for First Village
const MAP_ZONES = [
    { id: 0, x: 0, z: 0, width: 50, depth: 50, name: 'Aç Köpek Bölgesi', color: 0x2d5016 },
    { id: 1, x: 50, z: 0, width: 50, depth: 50, name: 'Köpek Bölgesi', color: 0x3a6b1f },
    { id: 2, x: 100, z: 0, width: 50, depth: 50, name: 'Kurt Bölgesi', color: 0x4a7c2f },
    { id: 3, x: 150, z: 0, width: 50, depth: 50, name: 'Aç Kurt Bölgesi', color: 0x5a8d3f },
    { id: 4, x: 200, z: 0, width: 50, depth: 50, name: 'Domuz Bölgesi', color: 0x6a9e4f },
    { id: 5, x: 250, z: 0, width: 50, depth: 50, name: 'Aç Domuz Bölgesi', color: 0x7aaf5f },
    { id: 6, x: 0, z: 50, width: 50, depth: 50, name: 'Ayı Bölgesi', color: 0x8ac06f },
    { id: 7, x: 50, z: 50, width: 50, depth: 50, name: 'Aç Ayı Bölgesi', color: 0x9ad17f },
    { id: 8, x: 100, z: 50, width: 50, depth: 50, name: 'Timsah Bölgesi', color: 0x2a4a5a },
    { id: 9, x: 150, z: 50, width: 50, depth: 50, name: 'Aç Timsah Bölgesi', color: 0x3a5a6a },
    { id: 10, x: 200, z: 50, width: 50, depth: 50, name: 'Boz Ayı Bölgesi', color: 0x4a6a7a },
    { id: 11, x: 250, z: 50, width: 50, depth: 50, name: 'Aç Boz Ayı Bölgesi', color: 0x5a7a8a },
    { id: 12, x: 0, z: 100, width: 100, depth: 50, name: 'Maymun Bölgesi', color: 0x6a4a3a },
    { id: 13, x: 100, z: 100, width: 100, depth: 50, name: 'Aç Maymun Bölgesi', color: 0x7a5a4a },
    { id: 14, x: 200, z: 100, width: 100, depth: 50, name: 'Kaplan Bölgesi', color: 0x8a6a5a },
    { id: 15, x: 0, z: 150, width: 150, depth: 50, name: 'Aç Kaplan Bölgesi', color: 0x9a7a6a },
    { id: 16, x: 150, z: 150, width: 150, depth: 50, name: 'Aslan Krallığı', color: 0xaa8a7a }
];

const WORLD_WIDTH = 300;
const WORLD_DEPTH = 200;

// Exponential XP requirements for levels 1-99
function calculateXPForLevel(level) {
    if (level <= 1) return 0;
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

// 3D Model Builders for different creature types
class Model3D {
    static createDog(color, size) {
        const group = new THREE.Group();

        // Body
        const bodyGeometry = new THREE.BoxGeometry(size * 1.2, size * 0.6, size * 0.8);
        const material = new THREE.MeshStandardMaterial({ color: color });
        const body = new THREE.Mesh(bodyGeometry, material);
        body.castShadow = true;
        body.position.y = size * 0.5;
        group.add(body);

        // Head
        const headGeometry = new THREE.BoxGeometry(size * 0.6, size * 0.5, size * 0.6);
        const head = new THREE.Mesh(headGeometry, material);
        head.castShadow = true;
        head.position.set(size * 0.7, size * 0.6, 0);
        group.add(head);

        // Ears
        const earGeometry = new THREE.ConeGeometry(size * 0.15, size * 0.3, 4);
        const leftEar = new THREE.Mesh(earGeometry, material);
        leftEar.position.set(size * 0.7, size * 0.9, size * 0.2);
        leftEar.castShadow = true;
        group.add(leftEar);

        const rightEar = leftEar.clone();
        rightEar.position.z = -size * 0.2;
        group.add(rightEar);

        // Legs (4 legs)
        const legGeometry = new THREE.CylinderGeometry(size * 0.1, size * 0.1, size * 0.5);
        const positions = [
            [size * 0.4, 0, size * 0.3],
            [size * 0.4, 0, -size * 0.3],
            [-size * 0.4, 0, size * 0.3],
            [-size * 0.4, 0, -size * 0.3]
        ];

        group.legs = [];
        positions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, material);
            leg.position.set(...pos);
            leg.castShadow = true;
            group.add(leg);
            group.legs.push(leg);
        });

        // Tail
        const tailGeometry = new THREE.CylinderGeometry(size * 0.08, size * 0.05, size * 0.6);
        const tail = new THREE.Mesh(tailGeometry, material);
        tail.rotation.z = Math.PI / 4;
        tail.position.set(-size * 0.8, size * 0.5, 0);
        tail.castShadow = true;
        group.add(tail);
        group.tail = tail;

        return group;
    }

    static createWolf(color, size) {
        const group = Model3D.createDog(color, size);
        // Make wolf more aggressive looking - larger head, sharper features
        const head = group.children.find(child => child.geometry instanceof THREE.BoxGeometry && child.position.x > 0);
        if (head) {
            head.scale.set(1.2, 1.1, 1.1);
        }
        return group;
    }

    static createBoar(color, size) {
        const group = new THREE.Group();

        // Body - wider and stockier
        const bodyGeometry = new THREE.BoxGeometry(size * 1.4, size * 0.8, size * 1.0);
        const material = new THREE.MeshStandardMaterial({ color: color });
        const body = new THREE.Mesh(bodyGeometry, material);
        body.castShadow = true;
        body.position.y = size * 0.5;
        group.add(body);

        // Head - larger and more prominent
        const headGeometry = new THREE.BoxGeometry(size * 0.8, size * 0.6, size * 0.7);
        const head = new THREE.Mesh(headGeometry, material);
        head.castShadow = true;
        head.position.set(size * 0.9, size * 0.5, 0);
        group.add(head);

        // Tusks
        const tuskGeometry = new THREE.ConeGeometry(size * 0.08, size * 0.4, 4);
        const tuskMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFF0 });
        const leftTusk = new THREE.Mesh(tuskGeometry, tuskMaterial);
        leftTusk.rotation.x = Math.PI / 2;
        leftTusk.position.set(size * 1.2, size * 0.4, size * 0.25);
        leftTusk.castShadow = true;
        group.add(leftTusk);

        const rightTusk = leftTusk.clone();
        rightTusk.position.z = -size * 0.25;
        group.add(rightTusk);

        // Legs
        const legGeometry = new THREE.CylinderGeometry(size * 0.12, size * 0.12, size * 0.5);
        const positions = [
            [size * 0.5, 0, size * 0.4],
            [size * 0.5, 0, -size * 0.4],
            [-size * 0.5, 0, size * 0.4],
            [-size * 0.5, 0, -size * 0.4]
        ];

        group.legs = [];
        positions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, material);
            leg.position.set(...pos);
            leg.castShadow = true;
            group.add(leg);
            group.legs.push(leg);
        });

        return group;
    }

    static createBear(color, size) {
        const group = new THREE.Group();

        // Body - large and imposing
        const bodyGeometry = new THREE.BoxGeometry(size * 1.5, size * 1.2, size * 1.2);
        const material = new THREE.MeshStandardMaterial({ color: color });
        const body = new THREE.Mesh(bodyGeometry, material);
        body.castShadow = true;
        body.position.y = size * 0.8;
        group.add(body);

        // Head
        const headGeometry = new THREE.BoxGeometry(size * 0.9, size * 0.8, size * 0.8);
        const head = new THREE.Mesh(headGeometry, material);
        head.castShadow = true;
        head.position.set(size * 0.8, size * 1.3, 0);
        group.add(head);

        // Ears - round
        const earGeometry = new THREE.SphereGeometry(size * 0.2, 8, 8);
        const leftEar = new THREE.Mesh(earGeometry, material);
        leftEar.position.set(size * 0.8, size * 1.7, size * 0.35);
        leftEar.castShadow = true;
        group.add(leftEar);

        const rightEar = leftEar.clone();
        rightEar.position.z = -size * 0.35;
        group.add(rightEar);

        // Legs - thick
        const legGeometry = new THREE.CylinderGeometry(size * 0.2, size * 0.2, size * 0.8);
        const positions = [
            [size * 0.5, 0, size * 0.5],
            [size * 0.5, 0, -size * 0.5],
            [-size * 0.5, 0, size * 0.5],
            [-size * 0.5, 0, -size * 0.5]
        ];

        group.legs = [];
        positions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, material);
            leg.position.set(...pos);
            leg.castShadow = true;
            group.add(leg);
            group.legs.push(leg);
        });

        return group;
    }

    static createCrocodile(color, size) {
        const group = new THREE.Group();

        // Body - long and low
        const bodyGeometry = new THREE.BoxGeometry(size * 2.0, size * 0.4, size * 0.8);
        const material = new THREE.MeshStandardMaterial({ color: color });
        const body = new THREE.Mesh(bodyGeometry, material);
        body.castShadow = true;
        body.position.y = size * 0.3;
        group.add(body);

        // Head - elongated snout
        const headGeometry = new THREE.BoxGeometry(size * 0.8, size * 0.3, size * 0.6);
        const head = new THREE.Mesh(headGeometry, material);
        head.castShadow = true;
        head.position.set(size * 1.2, size * 0.3, 0);
        group.add(head);

        // Jaw
        const jawGeometry = new THREE.BoxGeometry(size * 0.7, size * 0.2, size * 0.5);
        const jaw = new THREE.Mesh(jawGeometry, material);
        jaw.castShadow = true;
        jaw.position.set(size * 1.2, size * 0.15, 0);
        group.add(jaw);
        group.jaw = jaw;

        // Legs - short
        const legGeometry = new THREE.CylinderGeometry(size * 0.08, size * 0.08, size * 0.2);
        const positions = [
            [size * 0.6, 0, size * 0.35],
            [size * 0.6, 0, -size * 0.35],
            [-size * 0.6, 0, size * 0.35],
            [-size * 0.6, 0, -size * 0.35]
        ];

        group.legs = [];
        positions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, material);
            leg.position.set(...pos);
            leg.castShadow = true;
            group.add(leg);
            group.legs.push(leg);
        });

        // Tail - long
        const tailGeometry = new THREE.CylinderGeometry(size * 0.15, size * 0.08, size * 1.2);
        const tail = new THREE.Mesh(tailGeometry, material);
        tail.rotation.z = Math.PI / 2;
        tail.position.set(-size * 1.5, size * 0.3, 0);
        tail.castShadow = true;
        group.add(tail);
        group.tail = tail;

        return group;
    }

    static createMonkey(color, size) {
        const group = new THREE.Group();

        // Body - upright
        const bodyGeometry = new THREE.BoxGeometry(size * 0.8, size * 1.0, size * 0.6);
        const material = new THREE.MeshStandardMaterial({ color: color });
        const body = new THREE.Mesh(bodyGeometry, material);
        body.castShadow = true;
        body.position.y = size * 0.8;
        group.add(body);

        // Head
        const headGeometry = new THREE.SphereGeometry(size * 0.4, 12, 12);
        const head = new THREE.Mesh(headGeometry, material);
        head.castShadow = true;
        head.position.set(0, size * 1.5, 0);
        group.add(head);

        // Arms - long
        const armGeometry = new THREE.CylinderGeometry(size * 0.1, size * 0.08, size * 0.8);
        const leftArm = new THREE.Mesh(armGeometry, material);
        leftArm.rotation.z = Math.PI / 6;
        leftArm.position.set(-size * 0.5, size * 0.9, 0);
        leftArm.castShadow = true;
        group.add(leftArm);
        group.leftArm = leftArm;

        const rightArm = leftArm.clone();
        rightArm.rotation.z = -Math.PI / 6;
        rightArm.position.x = size * 0.5;
        group.add(rightArm);
        group.rightArm = rightArm;

        // Legs
        const legGeometry = new THREE.CylinderGeometry(size * 0.12, size * 0.1, size * 0.6);
        group.legs = [];
        const leftLeg = new THREE.Mesh(legGeometry, material);
        leftLeg.position.set(-size * 0.25, size * 0.1, 0);
        leftLeg.castShadow = true;
        group.add(leftLeg);
        group.legs.push(leftLeg);

        const rightLeg = leftLeg.clone();
        rightLeg.position.x = size * 0.25;
        group.add(rightLeg);
        group.legs.push(rightLeg);

        // Tail
        const tailGeometry = new THREE.CylinderGeometry(size * 0.08, size * 0.05, size * 1.0);
        const tail = new THREE.Mesh(tailGeometry, material);
        tail.rotation.x = Math.PI / 3;
        tail.position.set(0, size * 0.6, -size * 0.5);
        tail.castShadow = true;
        group.add(tail);
        group.tail = tail;

        return group;
    }

    static createTiger(color, size) {
        const group = Model3D.createDog(color, size * 1.2);
        // Add stripes
        const stripeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
        const stripeGeometry = new THREE.BoxGeometry(size * 0.1, size * 0.7, size * 0.9);

        for (let i = 0; i < 3; i++) {
            const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
            stripe.position.set(-size * 0.4 + i * size * 0.4, size * 0.5, 0);
            group.add(stripe);
        }

        return group;
    }

    static createLion(color, size) {
        const group = Model3D.createTiger(color, size);

        // Add mane
        const maneGeometry = new THREE.SphereGeometry(size * 0.5, 12, 12);
        const maneMaterial = new THREE.MeshStandardMaterial({ color: 0x8B7355 });
        const mane = new THREE.Mesh(maneGeometry, maneMaterial);
        mane.position.set(size * 0.7, size * 0.7, 0);
        mane.scale.set(1.2, 1.0, 1.2);
        mane.castShadow = true;
        group.add(mane);

        return group;
    }

    static createPlayer(color, size = 1) {
        const group = new THREE.Group();

        // Body
        const bodyGeometry = new THREE.BoxGeometry(size * 0.8, size * 1.2, size * 0.5);
        const material = new THREE.MeshStandardMaterial({ color: color });
        const body = new THREE.Mesh(bodyGeometry, material);
        body.castShadow = true;
        body.position.y = size * 1.2;
        group.add(body);

        // Head
        const headGeometry = new THREE.SphereGeometry(size * 0.4, 12, 12);
        const head = new THREE.Mesh(headGeometry, material);
        head.castShadow = true;
        head.position.y = size * 2.1;
        group.add(head);

        // Arms
        const armGeometry = new THREE.CylinderGeometry(size * 0.12, size * 0.12, size * 0.9);
        const leftArm = new THREE.Mesh(armGeometry, material);
        leftArm.position.set(-size * 0.5, size * 1.2, 0);
        leftArm.castShadow = true;
        group.add(leftArm);
        group.leftArm = leftArm;

        const rightArm = leftArm.clone();
        rightArm.position.x = size * 0.5;
        group.add(rightArm);
        group.rightArm = rightArm;

        // Legs
        const legGeometry = new THREE.CylinderGeometry(size * 0.15, size * 0.15, size * 1.0);
        group.legs = [];

        const leftLeg = new THREE.Mesh(legGeometry, material);
        leftLeg.position.set(-size * 0.25, size * 0.5, 0);
        leftLeg.castShadow = true;
        group.add(leftLeg);
        group.legs.push(leftLeg);

        const rightLeg = leftLeg.clone();
        rightLeg.position.x = size * 0.25;
        group.add(rightLeg);
        group.legs.push(rightLeg);

        // Weapon indicator (small cube in hand)
        const weaponGeometry = new THREE.BoxGeometry(size * 0.15, size * 0.6, size * 0.15);
        const weaponMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700 });
        const weapon = new THREE.Mesh(weaponGeometry, weaponMaterial);
        weapon.position.set(size * 0.5, size * 0.7, size * 0.3);
        weapon.castShadow = true;
        group.add(weapon);
        group.weapon = weapon;

        return group;
    }

    static createModel(type) {
        switch(type.shape) {
            case 'dog': return Model3D.createDog(type.color, type.size);
            case 'wolf': return Model3D.createWolf(type.color, type.size);
            case 'boar': return Model3D.createBoar(type.color, type.size);
            case 'bear': return Model3D.createBear(type.color, type.size);
            case 'crocodile': return Model3D.createCrocodile(type.color, type.size);
            case 'monkey': return Model3D.createMonkey(type.color, type.size);
            case 'tiger': return Model3D.createTiger(type.color, type.size);
            case 'lion': return Model3D.createLion(type.color, type.size);
            default: return Model3D.createDog(type.color, type.size);
        }
    }
}

// Animation Controller
class AnimationController {
    constructor(model) {
        this.model = model;
        this.currentAnimation = 'idle';
        this.time = 0;
        this.walkSpeed = 2.0;
        this.runSpeed = 3.5;
        this.attackSpeed = 5.0;
    }

    update(deltaTime) {
        this.time += deltaTime;

        switch(this.currentAnimation) {
            case 'walk':
                this.animateWalk();
                break;
            case 'run':
                this.animateRun();
                break;
            case 'attack':
                this.animateAttack();
                break;
            case 'idle':
            default:
                this.animateIdle();
                break;
        }
    }

    animateIdle() {
        // Gentle bobbing
        if (this.model.legs) {
            this.model.legs.forEach(leg => {
                leg.position.y = Math.sin(this.time * 1.5) * 0.02;
            });
        }

        // Tail wagging for creatures with tails
        if (this.model.tail) {
            this.model.tail.rotation.y = Math.sin(this.time * 2) * 0.2;
        }
    }

    animateWalk() {
        if (this.model.legs && this.model.legs.length >= 2) {
            // Alternate leg movement
            this.model.legs.forEach((leg, i) => {
                const phase = (i % 2) * Math.PI;
                leg.rotation.x = Math.sin(this.time * this.walkSpeed + phase) * 0.3;
            });
        }

        // Body bob
        this.model.position.y += Math.sin(this.time * this.walkSpeed * 2) * 0.003;

        // Tail movement
        if (this.model.tail) {
            this.model.tail.rotation.y = Math.sin(this.time * this.walkSpeed) * 0.4;
        }

        // Arms for bipeds
        if (this.model.leftArm && this.model.rightArm) {
            this.model.leftArm.rotation.x = Math.sin(this.time * this.walkSpeed) * 0.4;
            this.model.rightArm.rotation.x = Math.sin(this.time * this.walkSpeed + Math.PI) * 0.4;
        }
    }

    animateRun() {
        if (this.model.legs && this.model.legs.length >= 2) {
            // Faster, more pronounced leg movement
            this.model.legs.forEach((leg, i) => {
                const phase = (i % 2) * Math.PI;
                leg.rotation.x = Math.sin(this.time * this.runSpeed + phase) * 0.5;
            });
        }

        // More pronounced body bob
        this.model.position.y += Math.sin(this.time * this.runSpeed * 2) * 0.006;

        // Faster tail movement
        if (this.model.tail) {
            this.model.tail.rotation.y = Math.sin(this.time * this.runSpeed) * 0.6;
        }

        // Faster arm movement for bipeds
        if (this.model.leftArm && this.model.rightArm) {
            this.model.leftArm.rotation.x = Math.sin(this.time * this.runSpeed) * 0.6;
            this.model.rightArm.rotation.x = Math.sin(this.time * this.runSpeed + Math.PI) * 0.6;
        }
    }

    animateAttack() {
        const attackPhase = (this.time * this.attackSpeed) % (Math.PI * 2);

        if (attackPhase < Math.PI / 2) {
            // Wind up
            if (this.model.weapon) {
                this.model.weapon.rotation.z = -attackPhase * 2;
            }
            if (this.model.rightArm) {
                this.model.rightArm.rotation.x = -attackPhase;
            }
            // For quadrupeds, rear back
            if (this.model.legs && this.model.legs.length === 4) {
                this.model.rotation.x = attackPhase * 0.2;
            }
            // Open jaw for crocodile
            if (this.model.jaw) {
                this.model.jaw.rotation.x = attackPhase * 0.5;
            }
        } else if (attackPhase < Math.PI) {
            // Strike
            const strikePhase = attackPhase - Math.PI / 2;
            if (this.model.weapon) {
                this.model.weapon.rotation.z = -Math.PI / 2 + strikePhase * 3;
            }
            if (this.model.rightArm) {
                this.model.rightArm.rotation.x = -Math.PI / 4 + strikePhase * 2;
            }
            if (this.model.legs && this.model.legs.length === 4) {
                this.model.rotation.x = Math.PI / 10 - strikePhase * 0.2;
            }
            if (this.model.jaw) {
                this.model.jaw.rotation.x = Math.PI / 4 - strikePhase * 0.5;
            }
        } else {
            // Return to idle
            const returnPhase = (attackPhase - Math.PI) / Math.PI;
            if (this.model.weapon) {
                this.model.weapon.rotation.z = Math.PI / 2 * (1 - returnPhase);
            }
            if (this.model.rightArm) {
                this.model.rightArm.rotation.x = Math.PI / 4 * (1 - returnPhase);
            }
            if (this.model.legs && this.model.legs.length === 4) {
                this.model.rotation.x = 0;
            }
            if (this.model.jaw) {
                this.model.jaw.rotation.x = 0;
            }
        }
    }

    setAnimation(animName) {
        if (this.currentAnimation !== animName) {
            this.currentAnimation = animName;
            this.time = 0; // Reset time for new animation
        }
    }
}

// Main Game Class
class Game {
    constructor() {
        this.container = document.getElementById('gameCanvas');

        // Three.js setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB); // Sky blue
        this.scene.fog = new THREE.Fog(0x87CEEB, 50, 150);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 15, 20);
        this.camera.lookAt(0, 0, 0);

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);

        // Lighting
        this.setupLighting();

        // Create ground
        this.createGround();

        // Game state
        this.player = null;
        this.mobs = [];
        this.drops = [];
        this.inventory = Array(5).fill(null);

        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        this.clock = new THREE.Clock();

        // Setup controls
        this.setupControls();

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Directional light (sun)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 100, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.left = -100;
        directionalLight.shadow.camera.right = 100;
        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.bottom = -100;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 200;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Hemisphere light for better ambient lighting
        const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x8B7355, 0.3);
        this.scene.add(hemiLight);
    }

    createGround() {
        // Create ground with zones
        MAP_ZONES.forEach(zone => {
            const geometry = new THREE.PlaneGeometry(zone.width, zone.depth);
            const material = new THREE.MeshStandardMaterial({
                color: zone.color,
                roughness: 0.8,
                metalness: 0.2
            });
            const ground = new THREE.Mesh(geometry, material);
            ground.rotation.x = -Math.PI / 2;
            ground.position.set(zone.x + zone.width / 2, 0, zone.z + zone.depth / 2);
            ground.receiveShadow = true;
            this.scene.add(ground);

            // Add zone border
            const edges = new THREE.EdgesGeometry(geometry);
            const line = new THREE.LineSegments(
                edges,
                new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true })
            );
            line.rotation.x = -Math.PI / 2;
            line.position.copy(ground.position);
            line.position.y = 0.01;
            this.scene.add(line);
        });
    }

    selectCharacter(className) {
        const classData = CLASSES[className];

        // Start player in first zone
        const startZone = MAP_ZONES[0];
        const startX = startZone.x + startZone.width / 2;
        const startZ = startZone.z + startZone.depth / 2;

        // Create 3D player model
        const playerModel = Model3D.createPlayer(classData.color, 1);
        playerModel.position.set(startX, 0, startZ);
        this.scene.add(playerModel);

        this.player = {
            class: className,
            name: classData.name,
            icon: classData.icon,
            model: playerModel,
            x: startX,
            z: startZ,

            level: 1,
            xp: 0,
            xpToLevel: calculateXPForLevel(2),

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

            animator: new AnimationController(playerModel)
        };

        this.updateHUD();
        this.createSkillButtons();

        document.getElementById('charSelect').classList.add('hidden');
        document.getElementById('gameScreen').classList.add('active');

        this.spawnMobs();
        this.animate();
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

        // Joystick (mobile controls)
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
        MAP_ZONES.forEach(zone => {
            const mobCount = 8 + Math.floor(Math.random() * 8);

            for (let i = 0; i < mobCount; i++) {
                this.spawnMobInZone(zone.id);
            }
        });
    }

    spawnMobInZone(zoneId) {
        const zone = MAP_ZONES[zoneId];
        if (!zone) return;

        const zoneMobs = MOB_TYPES.filter(mob => mob.zone === zoneId);
        if (zoneMobs.length === 0) return;

        const type = zoneMobs[Math.floor(Math.random() * zoneMobs.length)];

        const padding = 5;
        const x = zone.x + padding + Math.random() * (zone.width - padding * 2);
        const z = zone.z + padding + Math.random() * (zone.depth - padding * 2);

        // Create 3D model
        const mobModel = Model3D.createModel(type);
        mobModel.position.set(x, 0, z);
        this.scene.add(mobModel);

        const mob = {
            ...type,
            x, z,
            maxHP: type.hp,
            model: mobModel,
            targetCooldown: 0,
            zoneId: zoneId,
            animator: new AnimationController(mobModel),
            state: 'idle'
        };

        this.mobs.push(mob);
    }

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

        // Play attack animation
        this.player.animator.setAnimation('attack');
        setTimeout(() => this.player.animator.setAnimation('idle'), 500);

        if (skill.damage) {
            const nearestMob = this.findNearestMob();
            if (nearestMob) {
                const distance = this.getDistance(this.player, nearestMob);
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
        return Math.sqrt((a.x - b.x) ** 2 + (a.z - b.z) ** 2);
    }

    damageEnemy(enemy, damage) {
        enemy.hp -= damage;
        this.showDamage(enemy.x, enemy.z, damage);

        if (enemy.hp <= 0) {
            this.killEnemy(enemy);
        }
    }

    killEnemy(enemy) {
        const index = this.mobs.indexOf(enemy);
        if (index > -1) {
            this.mobs.splice(index, 1);
            this.scene.remove(enemy.model);
        }

        this.player.xp += enemy.xp;
        if (this.player.xp >= this.player.xpToLevel) {
            this.levelUp();
        }

        if (Math.random() < 0.4) {
            const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
            this.drops.push({
                ...item,
                x: enemy.x,
                z: enemy.z
            });
        }

        this.respawnMob(enemy.zoneId);
        this.updateHUD();
    }

    levelUp() {
        this.player.level++;
        this.player.xp = 0;

        if (this.player.level < 99) {
            this.player.xpToLevel = calculateXPForLevel(this.player.level + 1);
        } else {
            this.player.xpToLevel = 999999;
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

    showDamage(x, z, damage) {
        // Show floating damage text (2D overlay would be more complex, simplified here)
        console.log(`Damage: ${damage} at (${x}, ${z})`);
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

        const deltaTime = this.clock.getDelta();
        const speed = 0.2;

        // Player movement
        let dx = 0, dz = 0;

        if (this.keys['arrowleft'] || this.keys['a']) dx -= 1;
        if (this.keys['arrowright'] || this.keys['d']) dx += 1;
        if (this.keys['arrowup'] || this.keys['w']) dz -= 1;
        if (this.keys['arrowdown'] || this.keys['s']) dz += 1;

        // Joystick
        if (this.joystickActive) {
            dx = Math.cos(this.joystickAngle) * this.joystickPower;
            dz = Math.sin(this.joystickAngle) * this.joystickPower;
        }

        const isMoving = dx !== 0 || dz !== 0;

        if (isMoving) {
            const magnitude = Math.sqrt(dx * dx + dz * dz);
            dx = (dx / magnitude) * speed;
            dz = (dz / magnitude) * speed;

            this.player.x = Math.max(0, Math.min(WORLD_WIDTH, this.player.x + dx));
            this.player.z = Math.max(0, Math.min(WORLD_DEPTH, this.player.z + dz));

            this.player.model.position.set(this.player.x, 0, this.player.z);

            // Rotate player to face movement direction
            this.player.model.rotation.y = Math.atan2(dx, dz);

            // Set walking animation
            this.player.animator.setAnimation('walk');
        } else {
            this.player.animator.setAnimation('idle');
        }

        // Update player animation
        this.player.animator.update(deltaTime);

        // Update camera to follow player
        this.camera.position.x = this.player.x;
        this.camera.position.z = this.player.z + 20;
        this.camera.lookAt(this.player.x, 0, this.player.z);

        // Update mobs
        this.mobs.forEach(mob => {
            const dist = this.getDistance(this.player, mob);

            if (dist < 15) {
                // Move towards player
                const angle = Math.atan2(this.player.z - mob.z, this.player.x - mob.x);
                const moveSpeed = mob.speed * 0.05;
                mob.x += Math.cos(angle) * moveSpeed;
                mob.z += Math.sin(angle) * moveSpeed;

                mob.model.position.set(mob.x, 0, mob.z);
                mob.model.rotation.y = angle + Math.PI / 2;

                // Set running animation when chasing
                mob.animator.setAnimation('run');

                // Attack player
                if (dist < 2) {
                    if (mob.targetCooldown <= 0) {
                        mob.animator.setAnimation('attack');
                        setTimeout(() => mob.animator.setAnimation('idle'), 500);

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
            } else {
                // Idle animation when not chasing
                mob.animator.setAnimation('idle');
            }

            if (mob.targetCooldown > 0) {
                mob.targetCooldown -= deltaTime * 1000;
            }

            // Update mob animation
            mob.animator.update(deltaTime);
        });

        // Update drops
        this.drops.forEach(drop => {
            if (this.getDistance(this.player, drop) < 2) {
                this.pickupDrop(drop);
            }
        });

        // Update cooldowns
        this.player.skills.forEach(skill => {
            if (skill.cooldownRemaining > 0) {
                skill.cooldownRemaining -= deltaTime * 1000;
            }
        });

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

        document.getElementById('hpText').textContent = `HP: ${Math.floor(this.player.hp)}/${this.player.maxHP}`;
        document.getElementById('mpText').textContent = `MP: ${Math.floor(this.player.mp)}/${this.player.maxMP}`;
        document.getElementById('xpText').textContent = `XP: ${this.player.xp}/${this.player.xpToLevel}`;
    }

    gameOver() {
        alert('😵 Öldün!\n\nSeviye: ' + this.player.level + '\nXP: ' + this.player.xp);
        window.location.reload();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.update();
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize game
const game = new Game();

function selectCharacter(className) {
    game.selectCharacter(className);
}
