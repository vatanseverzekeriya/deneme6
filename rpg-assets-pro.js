/**
 * Professional RPG Asset System - "Ancient Mystic Forest" Theme
 * High-quality canvas-based assets with animations
 * NO EMOJIS - Pure artistic 2D game assets
 */

class AssetManager {
    constructor() {
        this.cache = new Map();
        this.animations = new Map();
        this.particles = [];
        this.time = 0;
    }

    // Cache a rendered canvas
    cacheAsset(name, canvas) {
        this.cache.set(name, canvas);
        return canvas;
    }

    getAsset(name) {
        return this.cache.get(name);
    }

    update(deltaTime) {
        this.time += deltaTime;
        this.particles = this.particles.filter(p => p.life > 0);
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= deltaTime;
            p.alpha = Math.max(0, p.life / p.maxLife);
        });
    }

    // Create a temporary canvas for asset rendering
    createCanvas(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
}

// ==================== TERRAIN ASSETS ====================

class TerrainAssets {
    constructor(assetManager) {
        this.am = assetManager;
        this.grassTrampled = new Map(); // Track trampled grass positions
        this.waterWaves = [];
        this.initializeAssets();
    }

    initializeAssets() {
        this.createGrassTile();
        this.createDirtRoad();
        this.createStoneRoad();
        this.createWaterStream();
    }

    // GRASS TERRAIN with trampling effect
    createGrassTile() {
        const size = 64;
        const canvas = this.am.createCanvas(size, size);
        const ctx = canvas.getContext('2d');

        // Base grass
        const gradient = ctx.createLinearGradient(0, 0, 0, size);
        gradient.addColorStop(0, '#2d5016');
        gradient.addColorStop(0.5, '#3a6b1f');
        gradient.addColorStop(1, '#2d5016');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);

        // Grass blades (detailed)
        ctx.strokeStyle = '#4a7c2a';
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';

        for (let i = 0; i < 40; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const height = 4 + Math.random() * 6;
            const curve = (Math.random() - 0.5) * 3;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.quadraticCurveTo(x + curve, y - height/2, x + curve*2, y - height);
            ctx.stroke();
        }

        // Light grass highlights
        ctx.strokeStyle = '#5d9c35';
        ctx.lineWidth = 1;
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const height = 3 + Math.random() * 4;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + (Math.random() - 0.5) * 2, y - height);
            ctx.stroke();
        }

        // Small flowers (yellow/white dots)
        for (let i = 0; i < 8; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const color = Math.random() > 0.5 ? '#f4e04d' : '#ffffff';

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }

        this.am.cacheAsset('grass_tile', canvas);

        // Create trampled grass variant
        this.createTrampledGrass();
    }

    createTrampledGrass() {
        const size = 64;
        const canvas = this.am.createCanvas(size, size);
        const ctx = canvas.getContext('2d');

        // Darker, flattened grass
        ctx.fillStyle = '#35521c';
        ctx.fillRect(0, 0, size, size);

        // Flattened grass blades
        ctx.strokeStyle = '#426328';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        for (let i = 0; i < 30; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const length = 3 + Math.random() * 5;
            const angle = Math.random() * Math.PI / 4 - Math.PI / 8;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
            ctx.stroke();
        }

        this.am.cacheAsset('grass_trampled', canvas);
    }

    // DIRT ROAD with dust effect capability
    createDirtRoad() {
        const size = 64;
        const canvas = this.am.createCanvas(size, size);
        const ctx = canvas.getContext('2d');

        // Base dirt color
        const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
        gradient.addColorStop(0, '#8b7355');
        gradient.addColorStop(1, '#6b5344');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);

        // Dirt texture (random spots and variations)
        for (let i = 0; i < 80; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const radius = Math.random() * 2 + 0.5;
            const shade = Math.random() > 0.5 ? '#9d8566' : '#7a6250';

            ctx.fillStyle = shade;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Small rocks embedded in dirt
        ctx.fillStyle = 'rgba(90, 80, 70, 0.6)';
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const w = Math.random() * 3 + 2;
            const h = Math.random() * 2 + 1;

            ctx.fillRect(x, y, w, h);
        }

        // Dirt cracks
        ctx.strokeStyle = 'rgba(70, 60, 50, 0.4)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 10; i++) {
            const x1 = Math.random() * size;
            const y1 = Math.random() * size;
            const len = Math.random() * 10 + 5;
            const angle = Math.random() * Math.PI * 2;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + Math.cos(angle) * len, y1 + Math.sin(angle) * len);
            ctx.stroke();
        }

        this.am.cacheAsset('dirt_road', canvas);
    }

    // STONE ROAD with subtle texture
    createStoneRoad() {
        const size = 64;
        const canvas = this.am.createCanvas(size, size);
        const ctx = canvas.getContext('2d');

        // Base stone
        ctx.fillStyle = '#6b7280';
        ctx.fillRect(0, 0, size, size);

        // Individual stone tiles
        const stones = [
            [5, 5, 25, 25],
            [32, 3, 28, 27],
            [3, 33, 27, 28],
            [33, 35, 26, 24]
        ];

        stones.forEach(([x, y, w, h]) => {
            // Stone gradient
            const gradient = ctx.createLinearGradient(x, y, x + w, y + h);
            gradient.addColorStop(0, '#7c8a9a');
            gradient.addColorStop(0.5, '#5f6b7a');
            gradient.addColorStop(1, '#4a5562');
            ctx.fillStyle = gradient;

            ctx.fillRect(x, y, w, h);

            // Stone edge (darker)
            ctx.strokeStyle = '#3d4651';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, w, h);

            // Stone texture
            ctx.fillStyle = 'rgba(140, 150, 160, 0.3)';
            for (let i = 0; i < 8; i++) {
                const sx = x + Math.random() * w;
                const sy = y + Math.random() * h;
                ctx.fillRect(sx, sy, 1, 1);
            }
        });

        // Moss between stones
        ctx.fillStyle = 'rgba(60, 90, 40, 0.5)';
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            ctx.beginPath();
            ctx.arc(x, y, Math.random() * 2 + 1, 0, Math.PI * 2);
            ctx.fill();
        }

        this.am.cacheAsset('stone_road', canvas);
    }

    // WATER STREAM with animated waves
    createWaterStream() {
        const width = 128;
        const height = 64;
        const canvas = this.am.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        this.am.cacheAsset('water_stream', canvas);
    }

    renderWater(ctx, x, y, width, height, time) {
        // Animated water with waves
        const gradient = ctx.createLinearGradient(x, y, x, y + height);
        gradient.addColorStop(0, '#2d5a8c');
        gradient.addColorStop(0.5, '#3a6ea5');
        gradient.addColorStop(1, '#2d5a8c');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, width, height);

        // Animated waves (sine waves)
        ctx.strokeStyle = 'rgba(100, 150, 200, 0.4)';
        ctx.lineWidth = 1.5;

        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            for (let wx = 0; wx < width; wx += 2) {
                const waveY = y + height/2 + Math.sin((wx + time * 50 + i * 40) * 0.05) * 3;
                if (wx === 0) {
                    ctx.moveTo(x + wx, waveY);
                } else {
                    ctx.lineTo(x + wx, waveY);
                }
            }
            ctx.stroke();
        }

        // Water highlights
        ctx.fillStyle = 'rgba(150, 200, 255, 0.3)';
        for (let i = 0; i < 5; i++) {
            const hx = x + (time * 20 + i * 30) % width;
            const hy = y + height/2 + Math.sin(time * 2 + i) * 8;
            ctx.beginPath();
            ctx.arc(hx, hy, 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Render fish
        this.renderFish(ctx, x, y, width, height, time);
    }

    renderFish(ctx, x, y, width, height, time) {
        // Animated fish swimming
        const fishCount = 3;

        for (let i = 0; i < fishCount; i++) {
            const progress = (time * 0.3 + i * 0.4) % 1;
            const fx = x + progress * width;
            const fy = y + height/2 + Math.sin(time * 2 + i) * 12;
            const fishSize = 8;

            // Fish body (simple shape)
            ctx.save();
            ctx.translate(fx, fy);

            // Swim animation (wiggle)
            const wiggle = Math.sin(time * 8 + i * 2) * 0.1;
            ctx.rotate(wiggle);

            // Body
            ctx.fillStyle = '#c77d2e';
            ctx.beginPath();
            ctx.ellipse(0, 0, fishSize, fishSize * 0.6, 0, 0, Math.PI * 2);
            ctx.fill();

            // Tail
            ctx.beginPath();
            ctx.moveTo(-fishSize, 0);
            ctx.lineTo(-fishSize - 4, -3);
            ctx.lineTo(-fishSize - 4, 3);
            ctx.closePath();
            ctx.fill();

            // Eye
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(fishSize/2, -1, 1.5, 0, Math.PI * 2);
            ctx.fill();

            // Highlight
            ctx.fillStyle = 'rgba(255, 200, 100, 0.6)';
            ctx.beginPath();
            ctx.ellipse(2, -1, fishSize * 0.3, fishSize * 0.2, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    }

    // Trample grass at position
    trampleGrass(x, y, time) {
        const key = `${Math.floor(x/64)}_${Math.floor(y/64)}`;
        this.grassTrampled.set(key, time);
    }

    // Check if grass should be trampled
    isGrassTrampled(x, y, currentTime) {
        const key = `${Math.floor(x/64)}_${Math.floor(y/64)}`;
        const trampleTime = this.grassTrampled.get(key);

        if (!trampleTime) return false;

        const elapsed = currentTime - trampleTime;
        const regrowTime = 5000; // 5 seconds to regrow

        if (elapsed > regrowTime) {
            this.grassTrampled.delete(key);
            return false;
        }

        return true;
    }

    // Create dust particle when walking on dirt/stone
    createDustParticle(x, y, type = 'dirt') {
        const color = type === 'dirt' ? 'rgba(139, 115, 85, 0.4)' : 'rgba(150, 150, 150, 0.3)';

        for (let i = 0; i < 3; i++) {
            this.am.particles.push({
                x: x + (Math.random() - 0.5) * 10,
                y: y + (Math.random() - 0.5) * 10,
                vx: (Math.random() - 0.5) * 0.5,
                vy: -Math.random() * 0.3,
                life: 800,
                maxLife: 800,
                alpha: 1,
                color: color,
                size: 2 + Math.random() * 2
            });
        }
    }
}

// ==================== TREE ASSETS ====================

class TreeAssets {
    constructor(assetManager) {
        this.am = assetManager;
        this.initializeAssets();
    }

    initializeAssets() {
        this.createPineTree();
        this.createOakTree();
        this.createBirchTree();
        this.createWillowTree();
        this.createMysticTree();
    }

    // PINE TREE (Çam Ağacı)
    createPineTree() {
        const canvas = this.am.createCanvas(80, 120);
        const ctx = canvas.getContext('2d');

        // Trunk
        const trunkGradient = ctx.createLinearGradient(35, 60, 45, 120);
        trunkGradient.addColorStop(0, '#4a3728');
        trunkGradient.addColorStop(1, '#3d2d21');
        ctx.fillStyle = trunkGradient;
        ctx.fillRect(35, 60, 10, 60);

        // Trunk texture
        ctx.strokeStyle = 'rgba(60, 45, 35, 0.6)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            ctx.moveTo(35, 65 + i * 7);
            ctx.lineTo(45, 65 + i * 7);
            ctx.stroke();
        }

        // Foliage (triangular pine shape)
        ctx.fillStyle = '#1a4d2e';

        // Bottom layer
        ctx.beginPath();
        ctx.moveTo(40, 70);
        ctx.lineTo(10, 85);
        ctx.lineTo(70, 85);
        ctx.closePath();
        ctx.fill();

        // Middle layer
        ctx.fillStyle = '#1e5a36';
        ctx.beginPath();
        ctx.moveTo(40, 55);
        ctx.lineTo(15, 68);
        ctx.lineTo(65, 68);
        ctx.closePath();
        ctx.fill();

        // Top layer
        ctx.fillStyle = '#22673e';
        ctx.beginPath();
        ctx.moveTo(40, 40);
        ctx.lineTo(20, 53);
        ctx.lineTo(60, 53);
        ctx.closePath();
        ctx.fill();

        // Peak
        ctx.fillStyle = '#267445';
        ctx.beginPath();
        ctx.moveTo(40, 25);
        ctx.lineTo(28, 42);
        ctx.lineTo(52, 42);
        ctx.closePath();
        ctx.fill();

        // Highlights
        ctx.fillStyle = 'rgba(80, 180, 100, 0.3)';
        for (let i = 0; i < 12; i++) {
            const x = 25 + Math.random() * 30;
            const y = 30 + Math.random() * 50;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }

        this.am.cacheAsset('tree_pine', canvas);
    }

    // OAK TREE (Meşe Ağacı)
    createOakTree() {
        const canvas = this.am.createCanvas(100, 130);
        const ctx = canvas.getContext('2d');

        // Trunk (wider, more robust)
        const trunkGradient = ctx.createLinearGradient(40, 70, 60, 130);
        trunkGradient.addColorStop(0, '#5d4a3a');
        trunkGradient.addColorStop(1, '#4a3a2d');
        ctx.fillStyle = trunkGradient;

        ctx.beginPath();
        ctx.moveTo(45, 70);
        ctx.lineTo(42, 130);
        ctx.lineTo(58, 130);
        ctx.lineTo(55, 70);
        ctx.closePath();
        ctx.fill();

        // Trunk texture (bark)
        ctx.strokeStyle = 'rgba(70, 55, 45, 0.7)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 10; i++) {
            const y = 75 + i * 6;
            ctx.beginPath();
            ctx.moveTo(43, y);
            ctx.quadraticCurveTo(47, y + 2, 43, y + 4);
            ctx.stroke();
        }

        // Crown (round, bushy)
        ctx.fillStyle = '#2d5a1e';

        // Multiple foliage clusters
        const clusters = [
            [50, 35, 25],
            [30, 45, 22],
            [70, 45, 22],
            [40, 58, 20],
            [60, 58, 20],
            [50, 55, 18]
        ];

        clusters.forEach(([x, y, r]) => {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        });

        // Lighter green highlights
        ctx.fillStyle = '#3a7028';
        clusters.forEach(([x, y, r]) => {
            ctx.beginPath();
            ctx.arc(x - 5, y - 3, r * 0.6, 0, Math.PI * 2);
            ctx.fill();
        });

        // Leaf details
        ctx.fillStyle = '#4a8a35';
        for (let i = 0; i < 20; i++) {
            const x = 20 + Math.random() * 60;
            const y = 25 + Math.random() * 50;
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
        }

        this.am.cacheAsset('tree_oak', canvas);
    }

    // BIRCH TREE (Huş Ağacı)
    createBirchTree() {
        const canvas = this.am.createCanvas(70, 140);
        const ctx = canvas.getContext('2d');

        // Distinctive white trunk
        const trunkGradient = ctx.createLinearGradient(30, 40, 40, 140);
        trunkGradient.addColorStop(0, '#f0f0f0');
        trunkGradient.addColorStop(0.5, '#e8e8e8');
        trunkGradient.addColorStop(1, '#d0d0d0');
        ctx.fillStyle = trunkGradient;

        // Slim trunk
        ctx.beginPath();
        ctx.moveTo(33, 40);
        ctx.lineTo(31, 140);
        ctx.lineTo(39, 140);
        ctx.lineTo(37, 40);
        ctx.closePath();
        ctx.fill();

        // Characteristic black marks on birch
        ctx.fillStyle = '#2a2a2a';
        const marks = [
            [31, 50, 8, 3],
            [32, 65, 6, 2],
            [30, 80, 9, 4],
            [33, 95, 5, 2],
            [31, 110, 7, 3],
            [32, 125, 6, 3]
        ];

        marks.forEach(([x, y, w, h]) => {
            ctx.fillRect(x, y, w, h);
        });

        // Light, delicate foliage
        ctx.fillStyle = '#90c956';

        // Sparse, hanging branches
        const branches = [
            [35, 35, 18],
            [20, 48, 15],
            [48, 52, 14],
            [25, 62, 13],
            [45, 65, 12]
        ];

        branches.forEach(([x, y, r]) => {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        });

        // Lighter highlights
        ctx.fillStyle = '#b5e87d';
        branches.forEach(([x, y, r]) => {
            ctx.beginPath();
            ctx.arc(x - 3, y - 2, r * 0.5, 0, Math.PI * 2);
            ctx.fill();
        });

        // Small leaves
        ctx.fillStyle = '#a8d96a';
        for (let i = 0; i < 15; i++) {
            const x = 18 + Math.random() * 35;
            const y = 30 + Math.random() * 45;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }

        this.am.cacheAsset('tree_birch', canvas);
    }

    // WILLOW TREE (Söğüt)
    createWillowTree() {
        const canvas = this.am.createCanvas(110, 150);
        const ctx = canvas.getContext('2d');

        // Trunk
        const trunkGradient = ctx.createLinearGradient(50, 60, 60, 150);
        trunkGradient.addColorStop(0, '#6b5a48');
        trunkGradient.addColorStop(1, '#574839');
        ctx.fillStyle = trunkGradient;
        ctx.fillRect(50, 60, 10, 90);

        // Trunk texture
        ctx.strokeStyle = 'rgba(80, 70, 60, 0.5)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 12; i++) {
            ctx.beginPath();
            ctx.moveTo(50, 65 + i * 7);
            ctx.lineTo(60, 65 + i * 7);
            ctx.stroke();
        }

        // Drooping branches (characteristic of willow)
        ctx.strokeStyle = '#4a7c2a';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        // Left side drooping branches
        for (let i = 0; i < 8; i++) {
            const startY = 50 + i * 8;
            const startX = 50;
            const endX = 15 + Math.random() * 15;
            const endY = startY + 30 + Math.random() * 40;
            const cp1x = startX - 15;
            const cp1y = startY + 10;
            const cp2x = endX + 5;
            const cp2y = endY - 15;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
            ctx.stroke();
        }

        // Right side drooping branches
        for (let i = 0; i < 8; i++) {
            const startY = 50 + i * 8;
            const startX = 60;
            const endX = 80 + Math.random() * 15;
            const endY = startY + 30 + Math.random() * 40;
            const cp1x = startX + 15;
            const cp1y = startY + 10;
            const cp2x = endX - 5;
            const cp2y = endY - 15;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
            ctx.stroke();
        }

        // Leaves on branches (lighter green)
        ctx.fillStyle = '#6baa45';
        for (let i = 0; i < 40; i++) {
            const x = 15 + Math.random() * 80;
            const y = 60 + Math.random() * 80;
            ctx.beginPath();
            ctx.arc(x, y, 2 + Math.random() * 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Crown at top
        ctx.fillStyle = '#4a7c2a';
        ctx.beginPath();
        ctx.arc(55, 45, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#5d9c35';
        ctx.beginPath();
        ctx.arc(52, 42, 12, 0, Math.PI * 2);
        ctx.fill();

        this.am.cacheAsset('tree_willow', canvas);
    }

    // MYSTIC TREE (Mistik Ağaç - Ancient ruins theme)
    createMysticTree() {
        const canvas = this.am.createCanvas(120, 160);
        const ctx = canvas.getContext('2d');

        // Ancient, gnarled trunk
        const trunkGradient = ctx.createLinearGradient(55, 50, 65, 160);
        trunkGradient.addColorStop(0, '#3d2f26');
        trunkGradient.addColorStop(0.5, '#4a3a2e');
        trunkGradient.addColorStop(1, '#2d1f18');
        ctx.fillStyle = trunkGradient;

        // Twisted trunk shape
        ctx.beginPath();
        ctx.moveTo(58, 50);
        ctx.quadraticCurveTo(52, 80, 55, 110);
        ctx.lineTo(54, 160);
        ctx.lineTo(66, 160);
        ctx.lineTo(65, 110);
        ctx.quadraticCurveTo(68, 80, 62, 50);
        ctx.closePath();
        ctx.fill();

        // Deep bark texture
        ctx.strokeStyle = 'rgba(30, 20, 15, 0.8)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 15; i++) {
            const y = 55 + i * 7;
            ctx.beginPath();
            ctx.moveTo(54, y);
            ctx.quadraticCurveTo(60, y + 2, 54, y + 5);
            ctx.stroke();
        }

        // Magical glowing foliage
        ctx.fillStyle = '#2a4d5c';

        const clusters = [
            [60, 30, 22],
            [35, 45, 20],
            [85, 48, 18],
            [50, 55, 17],
            [70, 58, 16]
        ];

        clusters.forEach(([x, y, r]) => {
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
            gradient.addColorStop(0, '#3d6d7d');
            gradient.addColorStop(0.7, '#2a4d5c');
            gradient.addColorStop(1, '#1a3d4c');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        });

        // Mystical glow particles
        ctx.fillStyle = '#5dd3e8';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#5dd3e8';
        for (let i = 0; i < 25; i++) {
            const x = 30 + Math.random() * 60;
            const y = 25 + Math.random() * 50;
            const size = Math.random() * 2 + 1;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.shadowBlur = 0;

        // Ancient runes on trunk
        ctx.fillStyle = '#7dd3e8';
        ctx.font = 'bold 10px monospace';
        ctx.fillText('⚡', 57, 90);
        ctx.fillText('✦', 58, 120);

        // Magical aura
        ctx.strokeStyle = 'rgba(93, 211, 232, 0.3)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(60, 40, 45, 0, Math.PI * 2);
        ctx.stroke();

        this.am.cacheAsset('tree_mystic', canvas);
    }
}

// ==================== CHARACTER & MONSTER ASSETS ====================

class CharacterAssets {
    constructor(assetManager) {
        this.am = assetManager;
        this.initializeAssets();
    }

    initializeAssets() {
        // Create 8-directional sprites for each character class
        this.createWarriorSprites();
        this.createNinjaSprites();
        this.createShamanSprites();
        this.createSuraSprites();
    }

    // Helper to create character in specific direction
    drawCharacterBase(ctx, x, y, size, color, direction) {
        // Body
        ctx.fillStyle = color.body;
        ctx.fillRect(x - size/4, y - size/4, size/2, size * 0.6);

        // Head
        ctx.fillStyle = color.skin;
        ctx.beginPath();
        ctx.arc(x, y - size/3, size/4, 0, Math.PI * 2);
        ctx.fill();

        // Legs based on direction
        ctx.fillStyle = color.legs;
        const legOffset = size/6;
        if (direction === 'down' || direction === 'down-right' || direction === 'down-left') {
            ctx.fillRect(x - legOffset, y + size/6, size/6, size/3);
            ctx.fillRect(x + 2, y + size/6, size/6, size/3);
        } else if (direction === 'up' || direction === 'up-right' || direction === 'up-left') {
            ctx.fillRect(x - legOffset, y, size/6, size/4);
            ctx.fillRect(x + 2, y, size/6, size/4);
        } else {
            ctx.fillRect(x - legOffset, y + size/8, size/6, size/3);
            ctx.fillRect(x + 2, y + size/8, size/6, size/3);
        }

        // Arms
        ctx.fillStyle = color.arms;
        if (direction.includes('right')) {
            ctx.fillRect(x + size/4, y - size/6, size/6, size/3);
            ctx.fillRect(x - size/3, y, size/6, size/4);
        } else if (direction.includes('left')) {
            ctx.fillRect(x - size/3, y - size/6, size/6, size/3);
            ctx.fillRect(x + size/4, y, size/6, size/4);
        } else {
            ctx.fillRect(x - size/3, y - size/8, size/6, size/3);
            ctx.fillRect(x + size/4, y - size/8, size/6, size/3);
        }
    }

    createWarriorSprites() {
        const directions = ['down', 'up', 'left', 'right', 'down-left', 'down-right', 'up-left', 'up-right'];
        const size = 48;

        directions.forEach(dir => {
            const canvas = this.am.createCanvas(size, size);
            const ctx = canvas.getContext('2d');

            const colors = {
                body: '#8b4513',
                skin: '#f4c8a8',
                legs: '#654321',
                arms: '#f4c8a8',
                armor: '#c0c0c0'
            };

            this.drawCharacterBase(ctx, size/2, size/2, size * 0.7, colors, dir);

            // Shield
            ctx.fillStyle = '#c0c0c0';
            ctx.strokeStyle = '#8b7355';
            ctx.lineWidth = 2;

            if (dir.includes('left')) {
                ctx.beginPath();
                ctx.arc(size/2 - 12, size/2, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.arc(size/2 + 12, size/2, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            }

            this.am.cacheAsset(`warrior_${dir}`, canvas);
        });
    }

    createNinjaSprites() {
        const directions = ['down', 'up', 'left', 'right', 'down-left', 'down-right', 'up-left', 'up-right'];
        const size = 48;

        directions.forEach(dir => {
            const canvas = this.am.createCanvas(size, size);
            const ctx = canvas.getContext('2d');

            const colors = {
                body: '#1a1a2e',
                skin: '#f4c8a8',
                legs: '#0f0f1f',
                arms: '#1a1a2e'
            };

            this.drawCharacterBase(ctx, size/2, size/2, size * 0.65, colors, dir);

            // Ninja sword
            ctx.strokeStyle = '#606060';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';

            const centerX = size/2;
            const centerY = size/2;

            if (dir.includes('right')) {
                ctx.beginPath();
                ctx.moveTo(centerX + 8, centerY - 5);
                ctx.lineTo(centerX + 18, centerY - 15);
                ctx.stroke();
            } else if (dir.includes('left')) {
                ctx.beginPath();
                ctx.moveTo(centerX - 8, centerY - 5);
                ctx.lineTo(centerX - 18, centerY - 15);
                ctx.stroke();
            }

            this.am.cacheAsset(`ninja_${dir}`, canvas);
        });
    }

    createShamanSprites() {
        const directions = ['down', 'up', 'left', 'right', 'down-left', 'down-right', 'up-left', 'up-right'];
        const size = 48;

        directions.forEach(dir => {
            const canvas = this.am.createCanvas(size, size);
            const ctx = canvas.getContext('2d');

            const colors = {
                body: '#4a148c',
                skin: '#f4c8a8',
                legs: '#311b92',
                arms: '#f4c8a8'
            };

            this.drawCharacterBase(ctx, size/2, size/2, size * 0.68, colors, dir);

            // Magic staff
            ctx.strokeStyle = '#8d6e63';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';

            const centerX = size/2;
            const centerY = size/2;

            ctx.beginPath();
            if (dir === 'down' || dir === 'down-left' || dir === 'down-right') {
                ctx.moveTo(centerX + 10, centerY - 8);
                ctx.lineTo(centerX + 10, centerY + 18);
            } else {
                ctx.moveTo(centerX - 10, centerY - 18);
                ctx.lineTo(centerX - 10, centerY + 8);
            }
            ctx.stroke();

            // Magic orb on staff
            ctx.fillStyle = '#64b5f6';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#64b5f6';
            ctx.beginPath();
            if (dir === 'down' || dir === 'down-left' || dir === 'down-right') {
                ctx.arc(centerX + 10, centerY - 10, 4, 0, Math.PI * 2);
            } else {
                ctx.arc(centerX - 10, centerY - 20, 4, 0, Math.PI * 2);
            }
            ctx.fill();
            ctx.shadowBlur = 0;

            this.am.cacheAsset(`shaman_${dir}`, canvas);
        });
    }

    createSuraSprites() {
        const directions = ['down', 'up', 'left', 'right', 'down-left', 'down-right', 'up-left', 'up-right'];
        const size = 48;

        directions.forEach(dir => {
            const canvas = this.am.createCanvas(size, size);
            const ctx = canvas.getContext('2d');

            const colors = {
                body: '#b71c1c',
                skin: '#d7a89a',
                legs: '#8b0000',
                arms: '#d7a89a'
            };

            this.drawCharacterBase(ctx, size/2, size/2, size * 0.7, colors, dir);

            // Dark aura
            ctx.strokeStyle = 'rgba(139, 0, 139, 0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(size/2, size/2, size * 0.45, 0, Math.PI * 2);
            ctx.stroke();

            // Dark blade
            ctx.strokeStyle = '#4a148c';
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';

            const centerX = size/2;
            const centerY = size/2;

            if (dir.includes('right')) {
                ctx.beginPath();
                ctx.moveTo(centerX + 6, centerY);
                ctx.lineTo(centerX + 20, centerY - 8);
                ctx.stroke();
            } else if (dir.includes('left')) {
                ctx.beginPath();
                ctx.moveTo(centerX - 6, centerY);
                ctx.lineTo(centerX - 20, centerY - 8);
                ctx.stroke();
            }

            this.am.cacheAsset(`sura_${dir}`, canvas);
        });
    }
}

class MonsterAssets {
    constructor(assetManager) {
        this.am = assetManager;
        this.initializeAssets();
    }

    initializeAssets() {
        this.createWolfSprites();
        this.createGoblinSprites();
        this.createOrcSprites();
        this.createTrollSprites();
        this.createDragonSprites();
    }

    // WOLF - 8 directions
    createWolfSprites() {
        const directions = ['down', 'up', 'left', 'right', 'down-left', 'down-right', 'up-left', 'up-right'];
        const size = 40;

        directions.forEach(dir => {
            const canvas = this.am.createCanvas(size, size);
            const ctx = canvas.getContext('2d');

            const centerX = size/2;
            const centerY = size/2;

            // Wolf body
            ctx.fillStyle = '#5d5d5d';
            ctx.beginPath();
            ctx.ellipse(centerX, centerY, size * 0.35, size * 0.25, 0, 0, Math.PI * 2);
            ctx.fill();

            // Head based on direction
            let headX = centerX;
            let headY = centerY - 8;

            if (dir.includes('right')) headX = centerX + 8;
            if (dir.includes('left')) headX = centerX - 8;
            if (dir.includes('up')) headY = centerY - 12;
            if (dir.includes('down')) headY = centerY - 4;

            ctx.beginPath();
            ctx.arc(headX, headY, size * 0.25, 0, Math.PI * 2);
            ctx.fill();

            // Ears
            ctx.beginPath();
            ctx.moveTo(headX - 5, headY - 6);
            ctx.lineTo(headX - 8, headY - 12);
            ctx.lineTo(headX - 2, headY - 8);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(headX + 5, headY - 6);
            ctx.lineTo(headX + 8, headY - 12);
            ctx.lineTo(headX + 2, headY - 8);
            ctx.closePath();
            ctx.fill();

            // Eyes (red)
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(headX - 3, headY - 2, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(headX + 3, headY - 2, 2, 0, Math.PI * 2);
            ctx.fill();

            this.am.cacheAsset(`wolf_${dir}`, canvas);
        });
    }

    // GOBLIN - 8 directions
    createGoblinSprites() {
        const directions = ['down', 'up', 'left', 'right', 'down-left', 'down-right', 'up-left', 'up-right'];
        const size = 42;

        directions.forEach(dir => {
            const canvas = this.am.createCanvas(size, size);
            const ctx = canvas.getContext('2d');

            const centerX = size/2;
            const centerY = size/2;

            // Body
            ctx.fillStyle = '#5a7c3c';
            ctx.fillRect(centerX - size/6, centerY - size/6, size/3, size/2.5);

            // Head
            ctx.fillStyle = '#6a8c4c';
            ctx.beginPath();
            ctx.arc(centerX, centerY - size/3, size/4, 0, Math.PI * 2);
            ctx.fill();

            // Large ears
            ctx.beginPath();
            ctx.ellipse(centerX - size/4, centerY - size/3, size/6, size/4, -Math.PI/6, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(centerX + size/4, centerY - size/3, size/6, size/4, Math.PI/6, 0, Math.PI * 2);
            ctx.fill();

            // Evil eyes
            ctx.fillStyle = '#ffff00';
            ctx.beginPath();
            ctx.arc(centerX - 3, centerY - size/3, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(centerX + 3, centerY - size/3, 2, 0, Math.PI * 2);
            ctx.fill();

            // Weapon (club)
            ctx.strokeStyle = '#8b4513';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';

            if (dir.includes('right')) {
                ctx.beginPath();
                ctx.moveTo(centerX + 8, centerY);
                ctx.lineTo(centerX + 15, centerY + 8);
                ctx.stroke();

                ctx.fillStyle = '#654321';
                ctx.beginPath();
                ctx.arc(centerX + 16, centerY + 10, 4, 0, Math.PI * 2);
                ctx.fill();
            } else if (dir.includes('left')) {
                ctx.beginPath();
                ctx.moveTo(centerX - 8, centerY);
                ctx.lineTo(centerX - 15, centerY + 8);
                ctx.stroke();

                ctx.fillStyle = '#654321';
                ctx.beginPath();
                ctx.arc(centerX - 16, centerY + 10, 4, 0, Math.PI * 2);
                ctx.fill();
            }

            this.am.cacheAsset(`goblin_${dir}`, canvas);
        });
    }

    // ORC - 8 directions
    createOrcSprites() {
        const directions = ['down', 'up', 'left', 'right', 'down-left', 'down-right', 'up-left', 'up-right'];
        const size = 50;

        directions.forEach(dir => {
            const canvas = this.am.createCanvas(size, size);
            const ctx = canvas.getContext('2d');

            const centerX = size/2;
            const centerY = size/2;

            // Large muscular body
            ctx.fillStyle = '#4d6b3a';
            ctx.fillRect(centerX - size/4, centerY - size/5, size/2, size * 0.65);

            // Head
            ctx.fillStyle = '#5a7c47';
            ctx.beginPath();
            ctx.arc(centerX, centerY - size/3.5, size/3, 0, Math.PI * 2);
            ctx.fill();

            // Tusks
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(centerX - 6, centerY - size/5, 3, 8);
            ctx.fillRect(centerX + 3, centerY - size/5, 3, 8);

            // Angry eyes
            ctx.fillStyle = '#ff6600';
            ctx.beginPath();
            ctx.arc(centerX - 5, centerY - size/3.5, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(centerX + 5, centerY - size/3.5, 3, 0, Math.PI * 2);
            ctx.fill();

            // Armor
            ctx.strokeStyle = '#8b7355';
            ctx.lineWidth = 2;
            ctx.strokeRect(centerX - size/4, centerY - size/5, size/2, size * 0.3);

            // Axe
            if (dir.includes('right')) {
                ctx.strokeStyle = '#654321';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(centerX + 10, centerY);
                ctx.lineTo(centerX + 22, centerY - 10);
                ctx.stroke();

                ctx.fillStyle = '#808080';
                ctx.beginPath();
                ctx.moveTo(centerX + 22, centerY - 10);
                ctx.lineTo(centerX + 28, centerY - 8);
                ctx.lineTo(centerX + 24, centerY - 14);
                ctx.closePath();
                ctx.fill();
            } else if (dir.includes('left')) {
                ctx.strokeStyle = '#654321';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(centerX - 10, centerY);
                ctx.lineTo(centerX - 22, centerY - 10);
                ctx.stroke();

                ctx.fillStyle = '#808080';
                ctx.beginPath();
                ctx.moveTo(centerX - 22, centerY - 10);
                ctx.lineTo(centerX - 28, centerY - 8);
                ctx.lineTo(centerX - 24, centerY - 14);
                ctx.closePath();
                ctx.fill();
            }

            this.am.cacheAsset(`orc_${dir}`, canvas);
        });
    }

    // TROLL - 8 directions
    createTrollSprites() {
        const directions = ['down', 'up', 'left', 'right', 'down-left', 'down-right', 'up-left', 'up-right'];
        const size = 55;

        directions.forEach(dir => {
            const canvas = this.am.createCanvas(size, size);
            const ctx = canvas.getContext('2d');

            const centerX = size/2;
            const centerY = size/2;

            // Huge hunched body
            ctx.fillStyle = '#3d5a3d';
            ctx.beginPath();
            ctx.ellipse(centerX, centerY, size * 0.4, size * 0.35, 0, 0, Math.PI * 2);
            ctx.fill();

            // Large head
            ctx.fillStyle = '#4a6b4a';
            ctx.beginPath();
            ctx.arc(centerX, centerY - size/4, size/3.5, 0, Math.PI * 2);
            ctx.fill();

            // Large nose
            ctx.fillStyle = '#3d5a3d';
            ctx.beginPath();
            ctx.ellipse(centerX, centerY - size/4 + 2, 4, 6, 0, 0, Math.PI * 2);
            ctx.fill();

            // Small eyes
            ctx.fillStyle = '#ffff00';
            ctx.beginPath();
            ctx.arc(centerX - 6, centerY - size/4 - 3, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(centerX + 6, centerY - size/4 - 3, 2.5, 0, Math.PI * 2);
            ctx.fill();

            // Large club
            ctx.strokeStyle = '#5d4037';
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';

            if (dir.includes('right')) {
                ctx.beginPath();
                ctx.moveTo(centerX + 12, centerY + 5);
                ctx.lineTo(centerX + 24, centerY + 15);
                ctx.stroke();

                ctx.fillStyle = '#4e342e';
                ctx.beginPath();
                ctx.arc(centerX + 25, centerY + 17, 6, 0, Math.PI * 2);
                ctx.fill();
            } else if (dir.includes('left')) {
                ctx.beginPath();
                ctx.moveTo(centerX - 12, centerY + 5);
                ctx.lineTo(centerX - 24, centerY + 15);
                ctx.stroke();

                ctx.fillStyle = '#4e342e';
                ctx.beginPath();
                ctx.arc(centerX - 25, centerY + 17, 6, 0, Math.PI * 2);
                ctx.fill();
            }

            this.am.cacheAsset(`troll_${dir}`, canvas);
        });
    }

    // DRAGON - 8 directions
    createDragonSprites() {
        const directions = ['down', 'up', 'left', 'right', 'down-left', 'down-right', 'up-left', 'up-right'];
        const size = 70;

        directions.forEach(dir => {
            const canvas = this.am.createCanvas(size, size);
            const ctx = canvas.getContext('2d');

            const centerX = size/2;
            const centerY = size/2;

            // Dragon body (serpentine)
            const bodyGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size/2);
            bodyGradient.addColorStop(0, '#d32f2f');
            bodyGradient.addColorStop(0.7, '#b71c1c');
            bodyGradient.addColorStop(1, '#8b0000');
            ctx.fillStyle = bodyGradient;

            ctx.beginPath();
            ctx.ellipse(centerX, centerY, size * 0.4, size * 0.3, 0, 0, Math.PI * 2);
            ctx.fill();

            // Wings
            ctx.fillStyle = 'rgba(139, 0, 0, 0.7)';

            // Left wing
            ctx.beginPath();
            ctx.moveTo(centerX - 5, centerY - 5);
            ctx.quadraticCurveTo(centerX - 25, centerY - 15, centerX - 20, centerY + 5);
            ctx.lineTo(centerX - 5, centerY);
            ctx.closePath();
            ctx.fill();

            // Right wing
            ctx.beginPath();
            ctx.moveTo(centerX + 5, centerY - 5);
            ctx.quadraticCurveTo(centerX + 25, centerY - 15, centerX + 20, centerY + 5);
            ctx.lineTo(centerX + 5, centerY);
            ctx.closePath();
            ctx.fill();

            // Head
            ctx.fillStyle = '#d32f2f';
            let headX = centerX;
            let headY = centerY - 15;

            if (dir.includes('right')) headX = centerX + 12;
            if (dir.includes('left')) headX = centerX - 12;
            if (dir.includes('up')) headY = centerY - 20;
            if (dir.includes('down')) headY = centerY - 10;

            ctx.beginPath();
            ctx.arc(headX, headY, size/5, 0, Math.PI * 2);
            ctx.fill();

            // Horns
            ctx.fillStyle = '#8b0000';
            ctx.beginPath();
            ctx.moveTo(headX - 5, headY - 8);
            ctx.lineTo(headX - 8, headY - 15);
            ctx.lineTo(headX - 3, headY - 10);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(headX + 5, headY - 8);
            ctx.lineTo(headX + 8, headY - 15);
            ctx.lineTo(headX + 3, headY - 10);
            ctx.closePath();
            ctx.fill();

            // Eyes (glowing)
            ctx.fillStyle = '#ffeb3b';
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#ffeb3b';
            ctx.beginPath();
            ctx.arc(headX - 4, headY - 2, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(headX + 4, headY - 2, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // Tail
            ctx.strokeStyle = '#b71c1c';
            ctx.lineWidth = 6;
            ctx.lineCap = 'round';

            if (dir.includes('left')) {
                ctx.beginPath();
                ctx.moveTo(centerX + 15, centerY);
                ctx.quadraticCurveTo(centerX + 25, centerY + 5, centerX + 22, centerY + 12);
                ctx.stroke();
            } else if (dir.includes('right')) {
                ctx.beginPath();
                ctx.moveTo(centerX - 15, centerY);
                ctx.quadraticCurveTo(centerX - 25, centerY + 5, centerX - 22, centerY + 12);
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.moveTo(centerX, centerY + 10);
                ctx.quadraticCurveTo(centerX + 8, centerY + 18, centerX + 5, centerY + 22);
                ctx.stroke();
            }

            this.am.cacheAsset(`dragon_${dir}`, canvas);
        });
    }
}

// Initialize all assets
const assetManager = new AssetManager();
const terrainAssets = new TerrainAssets(assetManager);
const treeAssets = new TreeAssets(assetManager);
const characterAssets = new CharacterAssets(assetManager);
const monsterAssets = new MonsterAssets(assetManager);

// Export for game use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { assetManager, terrainAssets, treeAssets, characterAssets, monsterAssets };
}
