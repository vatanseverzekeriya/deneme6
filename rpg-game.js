// ═══════════════════════════════════════════════════════════════
// MYSTIC CRYSTAL WETLANDS - PROFESSIONAL RPG ASSET SYSTEM
// ═══════════════════════════════════════════════════════════════

// Asset Renderer - Draws professional quality sprites
class AssetRenderer {
    static drawTree(ctx, x, y, type) {
        const trees = {
            // Crystal Trees (1-5)
            0: () => this.drawCrystalPineTree(ctx, x, y),
            1: () => this.drawAmethystWillowTree(ctx, x, y),
            2: () => this.drawSapphireBirchTree(ctx, x, y),
            3: () => this.drawEmeraldOakTree(ctx, x, y),
            4: () => this.drawQuartzMaplTree(ctx, x, y),

            // Wetland Trees (6-10)
            5: () => this.drawMossyMangroveTree(ctx, x, y),
            6: () => this.drawGlowCypressTree(ctx, x, y),
            7: () => this.drawMistSwampTree(ctx, x, y),
            8: () => this.drawLuminousBogTree(ctx, x, y),
            9: () => this.drawTwistMarshTree(ctx, x, y),

            // Mystical Trees (11-15)
            10: () => this.drawAncientRuneTree(ctx, x, y),
            11: () => this.drawSpectralElmTree(ctx, x, y),
            12: () => this.drawEtherealCherryTree(ctx, x, y),
            13: () => this.drawVoidAshTree(ctx, x, y),
            14: () => this.drawCelestialBaobabTree(ctx, x, y),

            // Rare Crystal Formations (16-20)
            15: () => this.drawPrismaticCrystalTree(ctx, x, y),
            16: () => this.drawGeodeBlossomTree(ctx, x, y),
            17: () => this.drawStarlightConifer(ctx, x, y),
            18: () => this.drawTitaniumRootTree(ctx, x, y),
            19: () => this.drawOpalFernTree(ctx, x, y)
        };

        if (trees[type]) trees[type]();
    }

    // Tree Type 1: Crystal Pine Tree
    static drawCrystalPineTree(ctx, x, y) {
        ctx.save();

        // Trunk - crystalline structure
        const trunkGrad = ctx.createLinearGradient(x-8, y-40, x+8, y);
        trunkGrad.addColorStop(0, '#4a3f5c');
        trunkGrad.addColorStop(0.5, '#5d4e6f');
        trunkGrad.addColorStop(1, '#3a2f4c');
        ctx.fillStyle = trunkGrad;
        ctx.fillRect(x-8, y-40, 16, 40);

        // Crystal bark texture
        ctx.strokeStyle = '#6d5f8f';
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(x-8, y-35 + i*10);
            ctx.lineTo(x+8, y-32 + i*10);
            ctx.stroke();
        }

        // Pine layers - crystalline with glow
        const layers = [
            {y: -90, w: 70, h: 25, color: '#3d7a6f'},
            {y: -70, w: 60, h: 22, color: '#458270'},
            {y: -52, w: 50, h: 20, color: '#4d8a77'},
            {y: -36, w: 40, h: 18, color: '#56927e'}
        ];

        layers.forEach(layer => {
            // Shadow
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.beginPath();
            ctx.moveTo(x, y + layer.y);
            ctx.lineTo(x - layer.w/2 + 5, y + layer.y + layer.h);
            ctx.lineTo(x + layer.w/2 - 5, y + layer.y + layer.h);
            ctx.closePath();
            ctx.fill();

            // Main foliage with gradient
            const leafGrad = ctx.createLinearGradient(x, y+layer.y, x, y+layer.y+layer.h);
            leafGrad.addColorStop(0, layer.color);
            leafGrad.addColorStop(0.6, this.adjustBrightness(layer.color, -20));
            leafGrad.addColorStop(1, this.adjustBrightness(layer.color, -40));
            ctx.fillStyle = leafGrad;
            ctx.beginPath();
            ctx.moveTo(x, y + layer.y);
            ctx.lineTo(x - layer.w/2, y + layer.y + layer.h);
            ctx.lineTo(x + layer.w/2, y + layer.y + layer.h);
            ctx.closePath();
            ctx.fill();

            // Crystal highlights
            ctx.strokeStyle = 'rgba(147, 231, 255, 0.6)';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Sparkle effects
            for (let i = 0; i < 3; i++) {
                const sx = x + (Math.random() - 0.5) * layer.w * 0.6;
                const sy = y + layer.y + Math.random() * layer.h;
                this.drawSparkle(ctx, sx, sy, 3, '#9ff5ff');
            }
        });

        ctx.restore();
    }

    // Tree Type 2: Amethyst Willow
    static drawAmethystWillowTree(ctx, x, y) {
        ctx.save();

        // Trunk
        const trunkGrad = ctx.createLinearGradient(x-6, y-50, x+6, y);
        trunkGrad.addColorStop(0, '#5a4a6a');
        trunkGrad.addColorStop(1, '#4a3a5a');
        ctx.fillStyle = trunkGrad;
        ctx.fillRect(x-6, y-50, 12, 50);

        // Drooping branches with crystal effect
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI - Math.PI/2;
            const branchLength = 40 + Math.random() * 20;
            const startY = y - 80 + i * 8;

            ctx.beginPath();
            ctx.strokeStyle = '#6b4a8a';
            ctx.lineWidth = 3;
            ctx.moveTo(x, startY);

            // Curved drooping branch
            for (let j = 0; j <= 10; j++) {
                const t = j / 10;
                const bx = x + Math.cos(angle) * branchLength * t;
                const by = startY + Math.sin(angle) * branchLength * t * 0.3 + t * t * 30;
                ctx.lineTo(bx, by);
            }
            ctx.stroke();

            // Amethyst crystals along branch
            for (let j = 0; j < 5; j++) {
                const t = j / 5;
                const cx = x + Math.cos(angle) * branchLength * t;
                const cy = startY + Math.sin(angle) * branchLength * t * 0.3 + t * t * 30;
                this.drawCrystal(ctx, cx, cy, 4, '#9d5fb5', '#d89fff');
            }
        }

        ctx.restore();
    }

    // Tree Type 3: Sapphire Birch
    static drawSapphireBirchTree(ctx, x, y) {
        ctx.save();

        // White bark with dark marks
        ctx.fillStyle = '#e8e8f0';
        ctx.fillRect(x-7, y-60, 14, 60);

        // Birch bark marks
        ctx.fillStyle = '#2a2a3a';
        for (let i = 0; i < 6; i++) {
            const my = y - 55 + i * 10;
            ctx.fillRect(x-7, my, 14, 3);
            ctx.fillRect(x-7, my+5, 8, 2);
        }

        // Blue crystal foliage
        const canopy = {x: x, y: y-60, w: 60, h: 45};
        const canopyGrad = ctx.createRadialGradient(canopy.x, canopy.y, 0, canopy.x, canopy.y, canopy.w/2);
        canopyGrad.addColorStop(0, '#5588dd');
        canopyGrad.addColorStop(0.6, '#4477cc');
        canopyGrad.addColorStop(1, 'rgba(68, 119, 204, 0.3)');
        ctx.fillStyle = canopyGrad;
        ctx.beginPath();
        ctx.ellipse(canopy.x, canopy.y, canopy.w/2, canopy.h/2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Sapphire gem highlights
        for (let i = 0; i < 10; i++) {
            const gx = canopy.x + (Math.random() - 0.5) * canopy.w * 0.8;
            const gy = canopy.y + (Math.random() - 0.5) * canopy.h * 0.8;
            this.drawGem(ctx, gx, gy, 3, '#88bbff');
        }

        ctx.restore();
    }

    // Tree Type 4: Emerald Oak
    static drawEmeraldOakTree(ctx, x, y) {
        ctx.save();

        // Thick oak trunk
        const trunkGrad = ctx.createLinearGradient(x-12, y-55, x+12, y);
        trunkGrad.addColorStop(0, '#4a3422');
        trunkGrad.addColorStop(1, '#3a2412');
        ctx.fillStyle = trunkGrad;
        ctx.fillRect(x-12, y-55, 24, 55);

        // Bark texture
        ctx.strokeStyle = '#5a4432';
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            ctx.moveTo(x-12, y-50+i*7);
            ctx.lineTo(x-5, y-48+i*7);
            ctx.stroke();
        }

        // Emerald crystal foliage clusters
        const clusters = [
            {x: x-25, y: y-75, r: 25},
            {x: x+25, y: y-75, r: 25},
            {x: x, y: y-90, r: 30},
            {x: x-15, y: y-60, r: 20},
            {x: x+15, y: y-60, r: 20}
        ];

        clusters.forEach(cluster => {
            const grad = ctx.createRadialGradient(cluster.x, cluster.y, 0, cluster.x, cluster.y, cluster.r);
            grad.addColorStop(0, '#3fb573');
            grad.addColorStop(0.7, '#2a8f56');
            grad.addColorStop(1, 'rgba(42, 143, 86, 0.2)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(cluster.x, cluster.y, cluster.r, 0, Math.PI * 2);
            ctx.fill();

            // Emerald crystals
            for (let i = 0; i < 5; i++) {
                const cx = cluster.x + (Math.random() - 0.5) * cluster.r * 1.2;
                const cy = cluster.y + (Math.random() - 0.5) * cluster.r * 1.2;
                this.drawCrystal(ctx, cx, cy, 3, '#2fcc71', '#5fffa5');
            }
        });

        ctx.restore();
    }

    // Tree Type 5: Quartz Maple
    static drawQuartzMaplTree(ctx, x, y) {
        ctx.save();

        // Trunk
        ctx.fillStyle = '#6a5a4a';
        ctx.fillRect(x-8, y-50, 16, 50);

        // Maple foliage with quartz crystal effect
        const foliage = [
            {x: x-30, y: y-70, size: 22},
            {x: x+30, y: y-70, size: 22},
            {x: x-15, y: y-85, size: 25},
            {x: x+15, y: y-85, size: 25},
            {x: x, y: y-95, size: 28}
        ];

        foliage.forEach(leaf => {
            // Crystal maple leaf shape
            ctx.fillStyle = '#c96aa5';
            ctx.beginPath();
            ctx.moveTo(leaf.x, leaf.y - leaf.size);
            for (let i = 0; i <= 5; i++) {
                const angle = (i / 5) * Math.PI * 2;
                const r = leaf.size * (i % 2 === 0 ? 1 : 0.6);
                ctx.lineTo(
                    leaf.x + Math.cos(angle) * r,
                    leaf.y + Math.sin(angle) * r
                );
            }
            ctx.closePath();
            ctx.fill();

            // Quartz shine
            const shineGrad = ctx.createRadialGradient(leaf.x, leaf.y, 0, leaf.x, leaf.y, leaf.size);
            shineGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
            shineGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
            shineGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = shineGrad;
            ctx.beginPath();
            ctx.arc(leaf.x, leaf.y, leaf.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore();
    }

    // Tree Type 6: Mossy Mangrove
    static drawMossyMangroveTree(ctx, x, y) {
        ctx.save();

        // Multiple roots
        ctx.strokeStyle = '#4a3a2a';
        ctx.lineWidth = 6;
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 0.8 + Math.PI * 0.1;
            ctx.beginPath();
            ctx.moveTo(x, y - 30);
            ctx.quadraticCurveTo(
                x + Math.cos(angle) * 20,
                y - 10,
                x + Math.cos(angle) * 30,
                y + 5
            );
            ctx.stroke();
        }

        // Mossy growth on roots
        ctx.fillStyle = '#5a7a4a';
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 0.8 + Math.PI * 0.1;
            const mx = x + Math.cos(angle) * 25;
            const my = y;
            ctx.beginPath();
            ctx.arc(mx, my, 5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Main trunk
        ctx.fillStyle = '#5a4a3a';
        ctx.fillRect(x-10, y-60, 20, 35);

        // Lush green canopy
        const canopyGrad = ctx.createRadialGradient(x, y-60, 0, x, y-60, 50);
        canopyGrad.addColorStop(0, '#5a9a4a');
        canopyGrad.addColorStop(0.8, '#4a8a3a');
        canopyGrad.addColorStop(1, 'rgba(74, 138, 58, 0.2)');
        ctx.fillStyle = canopyGrad;
        ctx.beginPath();
        ctx.ellipse(x, y-65, 50, 35, 0, 0, Math.PI * 2);
        ctx.fill();

        // Dripping water droplets
        for (let i = 0; i < 6; i++) {
            const dx = x + (Math.random() - 0.5) * 80;
            const dy = y - 35 + Math.random() * 5;
            this.drawWaterDrop(ctx, dx, dy);
        }

        ctx.restore();
    }

    // Tree Type 7: Glow Cypress
    static drawGlowCypressTree(ctx, x, y) {
        ctx.save();

        // Tall thin trunk
        const trunkGrad = ctx.createLinearGradient(x-5, y-100, x+5, y);
        trunkGrad.addColorStop(0, '#3a3a4a');
        trunkGrad.addColorStop(1, '#2a2a3a');
        ctx.fillStyle = trunkGrad;
        ctx.fillRect(x-5, y-100, 10, 100);

        // Glowing ethereal foliage
        const glowLayers = [
            {y: -95, w: 30, color: '#4a6a8a', glow: '#7aa5cc'},
            {y: -80, w: 35, color: '#5a7a9a', glow: '#8ab5dc'},
            {y: -65, w: 32, color: '#4a6a8a', glow: '#7aa5cc'},
            {y: -50, w: 28, color: '#3a5a7a', glow: '#6a95bc'}
        ];

        glowLayers.forEach(layer => {
            // Glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = layer.glow;

            const grad = ctx.createRadialGradient(x, y+layer.y, 0, x, y+layer.y, layer.w);
            grad.addColorStop(0, layer.glow);
            grad.addColorStop(0.5, layer.color);
            grad.addColorStop(1, 'rgba(74, 106, 138, 0.1)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.ellipse(x, y+layer.y, layer.w, layer.w*0.6, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.shadowBlur = 0;
        });

        ctx.restore();
    }

    // Tree Type 8: Mist Swamp Tree
    static drawMistSwampTree(ctx, x, y) {
        ctx.save();

        // Gnarled twisted trunk
        ctx.strokeStyle = '#4a3a3a';
        ctx.lineWidth = 12;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x-10, y-20, x+15, y-40, x-5, y-60);
        ctx.bezierCurveTo(x-8, y-70, x+10, y-80, x, y-90);
        ctx.stroke();

        // Sparse foggy leaves
        for (let i = 0; i < 15; i++) {
            const lx = x + (Math.random() - 0.5) * 60;
            const ly = y - 90 + (Math.random() - 0.5) * 40;
            const size = 8 + Math.random() * 8;

            const leafGrad = ctx.createRadialGradient(lx, ly, 0, lx, ly, size);
            leafGrad.addColorStop(0, 'rgba(90, 110, 100, 0.8)');
            leafGrad.addColorStop(1, 'rgba(90, 110, 100, 0.1)');
            ctx.fillStyle = leafGrad;
            ctx.beginPath();
            ctx.ellipse(lx, ly, size, size*0.6, Math.random()*Math.PI, 0, Math.PI*2);
            ctx.fill();
        }

        // Mist particles
        for (let i = 0; i < 10; i++) {
            const mx = x + (Math.random() - 0.5) * 80;
            const my = y - 20 + (Math.random() - 0.5) * 80;
            ctx.fillStyle = 'rgba(200, 220, 230, 0.3)';
            ctx.beginPath();
            ctx.arc(mx, my, 3 + Math.random() * 4, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    // Tree Type 9: Luminous Bog Tree
    static drawLuminousBogTree(ctx, x, y) {
        ctx.save();

        // Dark wet trunk
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(x-7, y-55, 14, 55);

        // Bioluminescent mushrooms on trunk
        const mushroomColors = ['#ff6b9d', '#6bffb4', '#6bb4ff', '#ffb46b'];
        for (let i = 0; i < 8; i++) {
            const my = y - 50 + Math.random() * 50;
            const mx = x + (Math.random() > 0.5 ? 7 : -7);
            const color = mushroomColors[Math.floor(Math.random() * mushroomColors.length)];

            ctx.shadowBlur = 10;
            ctx.shadowColor = color;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(mx, my, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        // Glowing canopy
        const canopyGrad = ctx.createRadialGradient(x, y-65, 0, x, y-65, 45);
        canopyGrad.addColorStop(0, '#4affbb');
        canopyGrad.addColorStop(0.6, '#2add99');
        canopyGrad.addColorStop(1, 'rgba(42, 221, 153, 0.2)');
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#4affbb';
        ctx.fillStyle = canopyGrad;
        ctx.beginPath();
        ctx.arc(x, y-65, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();
    }

    // Tree Type 10: Twist Marsh Tree
    static drawTwistMarshTree(ctx, x, y) {
        ctx.save();

        // Twisted double trunk
        ctx.strokeStyle = '#5a4a3a';
        ctx.lineWidth = 10;

        // Left twist
        ctx.beginPath();
        ctx.moveTo(x-10, y);
        ctx.bezierCurveTo(x-15, y-30, x-5, y-50, x-8, y-70);
        ctx.stroke();

        // Right twist
        ctx.beginPath();
        ctx.moveTo(x+10, y);
        ctx.bezierCurveTo(x+15, y-30, x+5, y-50, x+8, y-70);
        ctx.stroke();

        // Twisted foliage
        const twistGrad = ctx.createRadialGradient(x, y-75, 0, x, y-75, 50);
        twistGrad.addColorStop(0, '#6a8a5a');
        twistGrad.addColorStop(1, 'rgba(106, 138, 90, 0.2)');
        ctx.fillStyle = twistGrad;

        // Irregular twisted shape
        ctx.beginPath();
        for (let i = 0; i <= 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const r = 40 + Math.sin(angle * 3) * 10;
            const px = x + Math.cos(angle) * r;
            const py = y - 75 + Math.sin(angle) * r * 0.8;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    // Tree Type 11: Ancient Rune Tree
    static drawAncientRuneTree(ctx, x, y) {
        ctx.save();

        // Ancient stone-like trunk
        const trunkGrad = ctx.createLinearGradient(x-15, y-70, x+15, y);
        trunkGrad.addColorStop(0, '#5a5a6a');
        trunkGrad.addColorStop(1, '#3a3a4a');
        ctx.fillStyle = trunkGrad;
        ctx.fillRect(x-15, y-70, 30, 70);

        // Runes carved into trunk
        const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ'];
        ctx.fillStyle = '#8affff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#4ad5ff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';

        runes.forEach((rune, i) => {
            ctx.fillText(rune, x, y - 60 + i * 15);
        });
        ctx.shadowBlur = 0;

        // Mystical purple canopy
        const canopyGrad = ctx.createRadialGradient(x, y-80, 0, x, y-80, 55);
        canopyGrad.addColorStop(0, '#9a6aff');
        canopyGrad.addColorStop(0.7, '#7a4adf');
        canopyGrad.addColorStop(1, 'rgba(122, 74, 223, 0.2)');
        ctx.fillStyle = canopyGrad;
        ctx.beginPath();
        ctx.arc(x, y-80, 50, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    // Tree Type 12: Spectral Elm
    static drawSpectralElmTree(ctx, x, y) {
        ctx.save();

        // Semi-transparent ghostly trunk
        ctx.fillStyle = 'rgba(150, 150, 180, 0.6)';
        ctx.fillRect(x-9, y-65, 18, 65);

        // Spectral aura
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#b0c4ff';

        // Ghostly branches
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const length = 35 + Math.random() * 15;

            ctx.strokeStyle = 'rgba(180, 180, 210, 0.5)';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(x, y - 60);
            ctx.lineTo(
                x + Math.cos(angle) * length,
                y - 60 + Math.sin(angle) * length * 0.6
            );
            ctx.stroke();

            // Spectral leaves
            for (let j = 0; j < 3; j++) {
                const t = (j + 1) / 4;
                const lx = x + Math.cos(angle) * length * t;
                const ly = y - 60 + Math.sin(angle) * length * 0.6 * t;

                ctx.fillStyle = 'rgba(200, 200, 255, 0.4)';
                ctx.beginPath();
                ctx.arc(lx, ly, 5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.shadowBlur = 0;
        ctx.restore();
    }

    // Tree Type 13: Ethereal Cherry
    static drawEtherealCherryTree(ctx, x, y) {
        ctx.save();

        // Delicate trunk
        ctx.fillStyle = '#6a5a5a';
        ctx.fillRect(x-6, y-55, 12, 55);

        // Pink ethereal blossoms
        for (let i = 0; i < 25; i++) {
            const bx = x + (Math.random() - 0.5) * 80;
            const by = y - 85 + (Math.random() - 0.5) * 40;

            // Blossom
            ctx.fillStyle = '#ffb4d9';
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#ff8ac9';

            for (let p = 0; p < 5; p++) {
                const angle = (p / 5) * Math.PI * 2;
                ctx.beginPath();
                ctx.arc(
                    bx + Math.cos(angle) * 4,
                    by + Math.sin(angle) * 4,
                    3, 0, Math.PI * 2
                );
                ctx.fill();
            }

            // Center
            ctx.fillStyle = '#ffe4f0';
            ctx.beginPath();
            ctx.arc(bx, by, 2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.shadowBlur = 0;
        ctx.restore();
    }

    // Tree Type 14: Void Ash
    static drawVoidAshTree(ctx, x, y) {
        ctx.save();

        // Dark void-like trunk
        ctx.fillStyle = '#1a1a2a';
        ctx.strokeStyle = '#3a2a4a';
        ctx.lineWidth = 2;
        ctx.fillRect(x-10, y-70, 20, 70);
        ctx.strokeRect(x-10, y-70, 20, 70);

        // Void energy emanating
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const length = 30;

            const voidGrad = ctx.createLinearGradient(
                x, y-70,
                x + Math.cos(angle) * length * 2,
                y - 70 + Math.sin(angle) * length * 2
            );
            voidGrad.addColorStop(0, '#6a4a8a');
            voidGrad.addColorStop(1, 'rgba(106, 74, 138, 0)');

            ctx.strokeStyle = voidGrad;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x, y - 70);
            ctx.lineTo(
                x + Math.cos(angle) * length * 1.5,
                y - 70 + Math.sin(angle) * length * 1.5
            );
            ctx.stroke();
        }

        // Void orbs floating
        for (let i = 0; i < 12; i++) {
            const ox = x + (Math.random() - 0.5) * 70;
            const oy = y - 90 + (Math.random() - 0.5) * 50;

            const orbGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, 5);
            orbGrad.addColorStop(0, '#aa88ff');
            orbGrad.addColorStop(1, 'rgba(170, 136, 255, 0)');
            ctx.fillStyle = orbGrad;
            ctx.beginPath();
            ctx.arc(ox, oy, 5, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    // Tree Type 15: Celestial Baobab
    static drawCelestialBaobabTree(ctx, x, y) {
        ctx.save();

        // Massive trunk
        const trunkGrad = ctx.createLinearGradient(x-20, y-60, x+20, y);
        trunkGrad.addColorStop(0, '#7a6a5a');
        trunkGrad.addColorStop(1, '#5a4a3a');
        ctx.fillStyle = trunkGrad;
        ctx.fillRect(x-20, y-60, 40, 60);

        // Celestial branches reaching up
        const branches = [
            {angle: -Math.PI*0.7, length: 45},
            {angle: -Math.PI*0.5, length: 50},
            {angle: -Math.PI*0.3, length: 45},
            {angle: -Math.PI*0.85, length: 40},
            {angle: -Math.PI*0.15, length: 40}
        ];

        branches.forEach(branch => {
            ctx.strokeStyle = '#6a5a4a';
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(x, y-60);
            ctx.lineTo(
                x + Math.cos(branch.angle) * branch.length,
                y - 60 + Math.sin(branch.angle) * branch.length
            );
            ctx.stroke();

            // Stars at branch tips
            const tipX = x + Math.cos(branch.angle) * branch.length;
            const tipY = y - 60 + Math.sin(branch.angle) * branch.length;
            this.drawStar(ctx, tipX, tipY, 6, '#fff8aa', '#ffee55');
        });

        ctx.restore();
    }

    // Tree Type 16: Prismatic Crystal Tree
    static drawPrismaticCrystalTree(ctx, x, y) {
        ctx.save();

        // Crystal formation as trunk
        const crystalColors = [
            '#ff6b9d', '#6bffd4', '#6b9dff', '#ffd46b', '#d46bff', '#9dff6b'
        ];

        // Main crystal structure
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const height = 60 + Math.random() * 30;

            ctx.fillStyle = crystalColors[i];
            ctx.shadowBlur = 15;
            ctx.shadowColor = crystalColors[i];

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.cos(angle) * 15, y - 10);
            ctx.lineTo(x + Math.cos(angle) * 10, y - height);
            ctx.lineTo(x + Math.cos(angle + 0.3) * 5, y - height + 10);
            ctx.closePath();
            ctx.fill();

            // Highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.moveTo(x + Math.cos(angle) * 10, y - height);
            ctx.lineTo(x + Math.cos(angle) * 12, y - height + 20);
            ctx.lineTo(x + Math.cos(angle) * 8, y - height + 25);
            ctx.closePath();
            ctx.fill();
        }

        ctx.shadowBlur = 0;
        ctx.restore();
    }

    // Tree Type 17: Geode Blossom
    static drawGeodeBlossomTree(ctx, x, y) {
        ctx.save();

        // Rocky exterior trunk
        ctx.fillStyle = '#6a6a7a';
        ctx.fillRect(x-11, y-58, 22, 58);

        // Geode opening at top
        const geodeGrad = ctx.createRadialGradient(x, y-60, 0, x, y-60, 45);
        geodeGrad.addColorStop(0, '#ff88dd');
        geodeGrad.addColorStop(0.4, '#dd66bb');
        geodeGrad.addColorStop(0.7, '#8a5a7a');
        geodeGrad.addColorStop(1, '#6a6a7a');
        ctx.fillStyle = geodeGrad;
        ctx.beginPath();
        ctx.arc(x, y-60, 40, 0, Math.PI * 2);
        ctx.fill();

        // Crystal formations inside geode
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const dist = 15 + Math.random() * 15;
            const cx = x + Math.cos(angle) * dist;
            const cy = y - 60 + Math.sin(angle) * dist;

            this.drawCrystal(ctx, cx, cy, 5 + Math.random() * 5, '#ff66cc', '#ffaaee');
        }

        ctx.restore();
    }

    // Tree Type 18: Starlight Conifer
    static drawStarlightConifer(ctx, x, y) {
        ctx.save();

        // Tall dark trunk
        ctx.fillStyle = '#2a2a3a';
        ctx.fillRect(x-7, y-100, 14, 100);

        // Conifer layers with starlight
        for (let i = 0; i < 7; i++) {
            const ly = y - 95 + i * 14;
            const lw = 55 - i * 5;

            // Dark layer
            ctx.fillStyle = '#3a4a5a';
            ctx.beginPath();
            ctx.moveTo(x, ly);
            ctx.lineTo(x - lw/2, ly + 15);
            ctx.lineTo(x + lw/2, ly + 15);
            ctx.closePath();
            ctx.fill();

            // Starlight particles
            for (let j = 0; j < 5; j++) {
                const sx = x + (Math.random() - 0.5) * lw * 0.8;
                const sy = ly + Math.random() * 12;

                ctx.fillStyle = '#ffffff';
                ctx.shadowBlur = 5;
                ctx.shadowColor = '#aaddff';
                ctx.beginPath();
                ctx.arc(sx, sy, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.shadowBlur = 0;
        ctx.restore();
    }

    // Tree Type 19: Titanium Root Tree
    static drawTitaniumRootTree(ctx, x, y) {
        ctx.save();

        // Metallic trunk
        const metalGrad = ctx.createLinearGradient(x-12, y-65, x+12, y);
        metalGrad.addColorStop(0, '#9a9aaa');
        metalGrad.addColorStop(0.5, '#7a7a8a');
        metalGrad.addColorStop(1, '#5a5a6a');
        ctx.fillStyle = metalGrad;
        ctx.fillRect(x-12, y-65, 24, 65);

        // Metallic shine
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(x-10, y-63, 6, 60);

        // Exposed metallic roots
        for (let i = 0; i < 7; i++) {
            const angle = Math.PI * 0.3 + (i / 7) * Math.PI * 0.4;
            const length = 25 + Math.random() * 15;

            const rootGrad = ctx.createLinearGradient(
                x, y,
                x + Math.cos(angle) * length,
                y + Math.sin(angle) * length
            );
            rootGrad.addColorStop(0, '#8a8a9a');
            rootGrad.addColorStop(1, '#5a5a6a');

            ctx.strokeStyle = rootGrad;
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
            ctx.stroke();
        }

        // Canopy with metallic sheen
        const canopyGrad = ctx.createRadialGradient(x, y-70, 0, x, y-70, 45);
        canopyGrad.addColorStop(0, '#6a8a7a');
        canopyGrad.addColorStop(0.6, '#5a7a6a');
        canopyGrad.addColorStop(1, 'rgba(90, 122, 106, 0.3)');
        ctx.fillStyle = canopyGrad;
        ctx.beginPath();
        ctx.arc(x, y-70, 42, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    // Tree Type 20: Opal Fern Tree
    static drawOpalFernTree(ctx, x, y) {
        ctx.save();

        // Thin elegant trunk
        ctx.fillStyle = '#5a5a6a';
        ctx.fillRect(x-5, y-70, 10, 70);

        // Opalescent fern fronds
        const frondColors = [
            {base: '#ff9a9a', light: '#ffcccc'},
            {base: '#9aff9a', light: '#ccffcc'},
            {base: '#9a9aff', light: '#ccccff'},
            {base: '#ff9aff', light: '#ffccff'}
        ];

        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const color = frondColors[i % frondColors.length];
            const fLength = 35;

            // Frond stem
            ctx.strokeStyle = color.base;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x, y - 70);
            ctx.lineTo(
                x + Math.cos(angle) * fLength,
                y - 70 + Math.sin(angle) * fLength * 0.5
            );
            ctx.stroke();

            // Frond leaves
            for (let j = 0; j < 8; j++) {
                const t = j / 8;
                const lx = x + Math.cos(angle) * fLength * t;
                const ly = y - 70 + Math.sin(angle) * fLength * 0.5 * t;
                const perpAngle = angle + Math.PI / 2;

                const leafGrad = ctx.createLinearGradient(
                    lx, ly,
                    lx + Math.cos(perpAngle) * 8,
                    ly + Math.sin(perpAngle) * 8
                );
                leafGrad.addColorStop(0, color.light);
                leafGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.fillStyle = leafGrad;
                ctx.beginPath();
                ctx.moveTo(lx, ly);
                ctx.lineTo(lx + Math.cos(perpAngle) * 8, ly + Math.sin(perpAngle) * 4);
                ctx.lineTo(lx + Math.cos(perpAngle) * 6, ly + Math.sin(perpAngle) * 2);
                ctx.closePath();
                ctx.fill();

                // Mirror side
                ctx.beginPath();
                ctx.moveTo(lx, ly);
                ctx.lineTo(lx - Math.cos(perpAngle) * 8, ly - Math.sin(perpAngle) * 4);
                ctx.lineTo(lx - Math.cos(perpAngle) * 6, ly - Math.sin(perpAngle) * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        ctx.restore();
    }

    // Helper: Draw sparkle
    static drawSparkle(ctx, x, y, size, color) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = color;

        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            if (i === 0) ctx.moveTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
            else ctx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
        }
        ctx.closePath();
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.restore();
    }

    // Helper: Draw crystal
    static drawCrystal(ctx, x, y, size, colorDark, colorLight) {
        ctx.save();

        const grad = ctx.createLinearGradient(x, y - size, x, y + size);
        grad.addColorStop(0, colorLight);
        grad.addColorStop(1, colorDark);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x - size * 0.5, y);
        ctx.lineTo(x, y + size * 0.7);
        ctx.lineTo(x + size * 0.5, y);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x - size * 0.3, y - size * 0.3);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    // Helper: Draw gem
    static drawGem(ctx, x, y, size, color) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(x - size * 0.3, y - size * 0.3, size * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // Helper: Draw water drop
    static drawWaterDrop(ctx, x, y) {
        ctx.save();
        ctx.fillStyle = 'rgba(150, 200, 255, 0.7)';
        ctx.beginPath();
        ctx.ellipse(x, y, 3, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(x - 1, y - 2, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // Helper: Draw star
    static drawStar(ctx, x, y, size, colorLight, colorDark) {
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = colorLight;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
        grad.addColorStop(0, colorLight);
        grad.addColorStop(1, colorDark);
        ctx.fillStyle = grad;

        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
            const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
            const radius = i % 2 === 0 ? size : size * 0.4;
            const px = x + Math.cos(angle) * radius;
            const py = y + Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.restore();
    }

    // Helper: Adjust brightness
    static adjustBrightness(color, amount) {
        const hex = color.replace('#', '');
        const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
        const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
        const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
        return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
    }

    // Draw terrain tile
    static drawTerrainTile(ctx, x, y, type, trampleLevel = 0, tileSize = 64) {
        switch(type) {
            case 'grass':
                this.drawGrassTile(ctx, x, y, tileSize, trampleLevel);
                break;
            case 'dirt':
                this.drawDirtTile(ctx, x, y, tileSize);
                break;
            case 'stone':
                this.drawStoneTile(ctx, x, y, tileSize);
                break;
            case 'water':
                this.drawWaterTile(ctx, x, y, tileSize);
                break;
        }
    }

    // Grass tile with trampling effect
    static drawGrassTile(ctx, x, y, size, trampleLevel) {
        ctx.save();

        // Base grass color - darker when trampled
        const baseGreen = 50 + (1 - trampleLevel) * 40;
        const lightGreen = 80 + (1 - trampleLevel) * 60;

        const grassGrad = ctx.createLinearGradient(x, y, x, y + size);
        grassGrad.addColorStop(0, `rgb(${baseGreen-10}, ${lightGreen}, ${baseGreen})`);
        grassGrad.addColorStop(1, `rgb(${baseGreen}, ${lightGreen-20}, ${baseGreen-10})`);
        ctx.fillStyle = grassGrad;
        ctx.fillRect(x, y, size, size);

        // Grass blades - fewer and bent when trampled
        const bladeCount = Math.floor(15 * (1 - trampleLevel * 0.7));
        for (let i = 0; i < bladeCount; i++) {
            const bx = x + Math.random() * size;
            const by = y + Math.random() * size;
            const height = 4 + Math.random() * 4;
            const bend = trampleLevel * (Math.random() * 3 - 1.5);

            ctx.strokeStyle = `rgba(${baseGreen+20}, ${lightGreen+20}, ${baseGreen+10}, ${0.4 + (1-trampleLevel)*0.4})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(bx, by);
            ctx.quadraticCurveTo(bx + bend, by - height/2, bx + bend*2, by - height);
            ctx.stroke();
        }

        // Crystal flowers occasionally
        if (Math.random() > 0.9 && trampleLevel < 0.3) {
            const fx = x + Math.random() * size;
            const fy = y + Math.random() * size;
            const flowerColors = ['#ff6b9d', '#6bffd4', '#d46bff'];
            const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];

            ctx.fillStyle = color;
            ctx.shadowBlur = 3;
            ctx.shadowColor = color;
            ctx.beginPath();
            ctx.arc(fx, fy, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        ctx.restore();
    }

    // Dirt road tile
    static drawDirtTile(ctx, x, y, size) {
        ctx.save();

        // Base dirt color with variation
        const dirtGrad = ctx.createRadialGradient(x + size/2, y + size/2, 0, x + size/2, y + size/2, size);
        dirtGrad.addColorStop(0, '#8b7355');
        dirtGrad.addColorStop(0.5, '#7a6245');
        dirtGrad.addColorStop(1, '#6a5235');
        ctx.fillStyle = dirtGrad;
        ctx.fillRect(x, y, size, size);

        // Pebbles and texture
        for (let i = 0; i < 8; i++) {
            const px = x + Math.random() * size;
            const py = y + Math.random() * size;
            const pSize = 1 + Math.random() * 2;

            ctx.fillStyle = `rgba(${100+Math.random()*50}, ${80+Math.random()*40}, ${60+Math.random()*30}, 0.6)`;
            ctx.beginPath();
            ctx.arc(px, py, pSize, 0, Math.PI * 2);
            ctx.fill();
        }

        // Dirt tracks
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + Math.random() * size, y);
        ctx.lineTo(x + Math.random() * size, y + size);
        ctx.stroke();

        ctx.restore();
    }

    // Stone road tile
    static drawStoneTile(ctx, x, y, size) {
        ctx.save();

        // Stone base
        ctx.fillStyle = '#6a7a8a';
        ctx.fillRect(x, y, size, size);

        // Individual stones
        const stones = [
            {x: 0.1, y: 0.1, w: 0.35, h: 0.35},
            {x: 0.55, y: 0.1, w: 0.35, h: 0.4},
            {x: 0.1, y: 0.55, w: 0.4, h: 0.35},
            {x: 0.58, y: 0.58, w: 0.32, h: 0.32}
        ];

        stones.forEach(stone => {
            const sx = x + stone.x * size;
            const sy = y + stone.y * size;
            const sw = stone.w * size;
            const sh = stone.h * size;

            // Stone color variation
            const stoneColor = ['#7a8a9a', '#6a7a8a', '#8a9aaa'][Math.floor(Math.random() * 3)];
            ctx.fillStyle = stoneColor;
            ctx.fillRect(sx, sy, sw, sh);

            // Stone highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fillRect(sx, sy, sw * 0.3, sh * 0.3);

            // Stone grout/gap
            ctx.strokeStyle = '#4a5a6a';
            ctx.lineWidth = 2;
            ctx.strokeRect(sx, sy, sw, sh);
        });

        ctx.restore();
    }

    // Animated water tile
    static drawWaterTile(ctx, x, y, size, time = 0) {
        ctx.save();

        // Base water color
        const waterGrad = ctx.createLinearGradient(x, y, x + size, y + size);
        waterGrad.addColorStop(0, '#4a8fbd');
        waterGrad.addColorStop(0.5, '#5a9fcd');
        waterGrad.addColorStop(1, '#4a8fbd');
        ctx.fillStyle = waterGrad;
        ctx.fillRect(x, y, size, size);

        // Wave ripples
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;

        for (let i = 0; i < 3; i++) {
            const offset = (time + i * 100) % 300 / 300;
            const waveY = y + size * offset;

            ctx.beginPath();
            ctx.moveTo(x, waveY);
            for (let wx = 0; wx <= size; wx += 4) {
                const wy = waveY + Math.sin((wx + time * 0.1) * 0.2) * 2;
                ctx.lineTo(x + wx, wy);
            }
            ctx.stroke();
        }

        // Light reflection
        const reflectGrad = ctx.createRadialGradient(
            x + size * 0.6 + Math.sin(time * 0.002) * size * 0.2,
            y + size * 0.4 + Math.cos(time * 0.002) * size * 0.2,
            0,
            x + size * 0.6,
            y + size * 0.4,
            size * 0.4
        );
        reflectGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        reflectGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = reflectGrad;
        ctx.fillRect(x, y, size, size);

        ctx.restore();
    }

    // Draw animated fish
    static drawFish(ctx, x, y, angle, size, time) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Fish body
        const bodyGrad = ctx.createLinearGradient(-size, 0, size, 0);
        bodyGrad.addColorStop(0, '#ff9a5a');
        bodyGrad.addColorStop(0.5, '#ffa56a');
        bodyGrad.addColorStop(1, '#ff8a4a');
        ctx.fillStyle = bodyGrad;

        ctx.beginPath();
        ctx.ellipse(0, 0, size, size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Tail animation
        const tailWave = Math.sin(time * 0.01) * 0.3;
        ctx.fillStyle = '#ff7a3a';
        ctx.beginPath();
        ctx.moveTo(-size, 0);
        ctx.lineTo(-size * 1.5, -size * 0.5 + tailWave);
        ctx.lineTo(-size * 1.5, size * 0.5 + tailWave);
        ctx.closePath();
        ctx.fill();

        // Eye
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(size * 0.5, -size * 0.2, size * 0.15, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(size * 0.5, -size * 0.2, size * 0.08, 0, Math.PI * 2);
        ctx.fill();

        // Fins
        ctx.fillStyle = 'rgba(255, 138, 74, 0.7)';
        ctx.beginPath();
        ctx.moveTo(0, size * 0.4);
        ctx.lineTo(-size * 0.3, size * 0.8);
        ctx.lineTo(size * 0.2, size * 0.5);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    // Draw character sprite (8-directional)
    static drawCharacter(ctx, x, y, direction, classType) {
        ctx.save();

        // Simple but professional character silhouette
        // Body
        const bodyGrad = ctx.createRadialGradient(x, y-15, 0, x, y-15, 20);
        bodyGrad.addColorStop(0, '#4a6a8a');
        bodyGrad.addColorStop(1, '#2a4a6a');
        ctx.fillStyle = bodyGrad;

        // Legs
        ctx.fillRect(x-8, y-10, 6, 15);
        ctx.fillRect(x+2, y-10, 6, 15);

        // Body
        ctx.beginPath();
        ctx.ellipse(x, y-20, 12, 18, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.fillStyle = '#f5d5b5';
        ctx.beginPath();
        ctx.arc(x, y-35, 10, 0, Math.PI * 2);
        ctx.fill();

        // Direction indicator (facing)
        ctx.fillStyle = '#ffffff';
        if (direction.includes('right')) {
            ctx.fillRect(x+6, y-36, 3, 2);
        } else if (direction.includes('left')) {
            ctx.fillRect(x-9, y-36, 3, 2);
        } else {
            ctx.fillRect(x-2, y-36, 4, 2);
        }

        // Class indicator glow
        const classColors = {
            warrior: '#ff6b6b',
            ninja: '#6bff6b',
            shaman: '#6b6bff',
            sura: '#ff6bff'
        };

        ctx.shadowBlur = 10;
        ctx.shadowColor = classColors[classType] || '#ffffff';
        ctx.strokeStyle = classColors[classType] || '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y-35, 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.restore();
    }

    // Draw monster sprite
    static drawMonster(ctx, x, y, type) {
        ctx.save();

        const monsters = {
            'Kurt': () => {
                // Wolf silhouette
                ctx.fillStyle = '#5a4a4a';
                ctx.beginPath();
                ctx.ellipse(x, y-12, 15, 10, 0, 0, Math.PI * 2);
                ctx.fill();
                // Head
                ctx.beginPath();
                ctx.ellipse(x+10, y-15, 8, 8, 0, 0, Math.PI * 2);
                ctx.fill();
                // Ears
                ctx.beginPath();
                ctx.moveTo(x+10, y-23);
                ctx.lineTo(x+5, y-28);
                ctx.lineTo(x+8, y-23);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(x+10, y-23);
                ctx.lineTo(x+15, y-28);
                ctx.lineTo(x+12, y-23);
                ctx.closePath();
                ctx.fill();
            },
            'Goblin': () => {
                // Goblin silhouette
                ctx.fillStyle = '#6a8a4a';
                ctx.beginPath();
                ctx.arc(x, y-12, 12, 0, Math.PI * 2);
                ctx.fill();
                // Head
                ctx.beginPath();
                ctx.ellipse(x, y-20, 10, 12, 0, 0, Math.PI * 2);
                ctx.fill();
                // Ears
                ctx.beginPath();
                ctx.ellipse(x-10, y-22, 4, 6, -0.3, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(x+10, y-22, 4, 6, 0.3, 0, Math.PI * 2);
                ctx.fill();
            },
            'Ork': () => {
                // Orc silhouette
                ctx.fillStyle = '#7a5a4a';
                ctx.fillRect(x-10, y-15, 20, 20);
                // Head
                ctx.fillStyle = '#8a6a5a';
                ctx.fillRect(x-12, y-30, 24, 18);
                // Tusks
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(x-8, y-15, 3, 5);
                ctx.fillRect(x+5, y-15, 3, 5);
            },
            'Troll': () => {
                // Troll silhouette
                ctx.fillStyle = '#5a7a5a';
                ctx.beginPath();
                ctx.ellipse(x, y-15, 18, 20, 0, 0, Math.PI * 2);
                ctx.fill();
                // Head
                ctx.beginPath();
                ctx.ellipse(x, y-32, 15, 18, 0, 0, Math.PI * 2);
                ctx.fill();
                // Arms
                ctx.fillRect(x-20, y-20, 8, 15);
                ctx.fillRect(x+12, y-20, 8, 15);
            },
            'Ejderha': () => {
                // Dragon silhouette
                ctx.fillStyle = '#aa4a4a';
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#ff6a6a';
                // Body
                ctx.beginPath();
                ctx.ellipse(x, y-15, 22, 15, 0, 0, Math.PI * 2);
                ctx.fill();
                // Head
                ctx.beginPath();
                ctx.moveTo(x+18, y-15);
                ctx.lineTo(x+30, y-18);
                ctx.lineTo(x+28, y-12);
                ctx.closePath();
                ctx.fill();
                // Wings
                ctx.fillStyle = 'rgba(170, 74, 74, 0.7)';
                ctx.beginPath();
                ctx.moveTo(x-5, y-20);
                ctx.lineTo(x-25, y-35);
                ctx.lineTo(x-15, y-15);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(x+5, y-20);
                ctx.lineTo(x+25, y-35);
                ctx.lineTo(x+15, y-15);
                ctx.closePath();
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        };

        if (monsters[type]) {
            monsters[type]();
        }

        ctx.restore();
    }
}

// Character Classes
const CLASSES = {
    warrior: {
        name: 'Savaşçı',
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

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.player = null;
        this.mobs = [];
        this.projectiles = [];
        this.drops = [];
        this.inventory = Array(5).fill(null);

        // Terrain system
        this.terrainMap = [];
        this.tileSize = 64;
        this.mapWidth = 120;
        this.mapHeight = 120;
        this.cameraX = 0;
        this.cameraY = 0;

        // Grass trampling system
        this.grassTrample = new Map(); // stores trample level per grass tile

        // Environmental features
        this.trees = [];
        this.waterStreams = [];
        this.fish = [];
        this.dustParticles = [];

        // Animation time
        this.time = 0;

        // 8-directional movement
        this.playerDirection = 'down';

        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        this.setupControls();
        this.generateWorld();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    generateWorld() {
        // Generate terrain map
        for (let y = 0; y < this.mapHeight; y++) {
            this.terrainMap[y] = [];
            for (let x = 0; x < this.mapWidth; x++) {
                // Procedural terrain generation
                const noise = this.simpleNoise(x * 0.1, y * 0.1);

                if (noise < 0.2) {
                    this.terrainMap[y][x] = 'water';
                } else if (noise < 0.35) {
                    this.terrainMap[y][x] = 'stone';
                } else if (noise < 0.5) {
                    this.terrainMap[y][x] = 'dirt';
                } else {
                    this.terrainMap[y][x] = 'grass';
                }
            }
        }

        // Generate 20 different tree types across the map
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * this.mapWidth * this.tileSize;
            const y = Math.random() * this.mapHeight * this.tileSize;
            const tileX = Math.floor(x / this.tileSize);
            const tileY = Math.floor(y / this.tileSize);

            // Only place trees on grass or dirt
            if (this.terrainMap[tileY] && (this.terrainMap[tileY][tileX] === 'grass' || this.terrainMap[tileY][tileX] === 'dirt')) {
                this.trees.push({
                    x: x,
                    y: y,
                    type: Math.floor(Math.random() * 20) // 0-19: all 20 tree types
                });
            }
        }

        // Generate water streams with fish
        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                if (this.terrainMap[y][x] === 'water') {
                    // Check if this is part of a stream (has water neighbors)
                    const hasWaterNeighbor =
                        (y > 0 && this.terrainMap[y-1][x] === 'water') ||
                        (y < this.mapHeight-1 && this.terrainMap[y+1][x] === 'water') ||
                        (x > 0 && this.terrainMap[y][x-1] === 'water') ||
                        (x < this.mapWidth-1 && this.terrainMap[y][x+1] === 'water');

                    if (hasWaterNeighbor && Math.random() < 0.05) {
                        // Add fish to water
                        this.fish.push({
                            x: x * this.tileSize + Math.random() * this.tileSize,
                            y: y * this.tileSize + Math.random() * this.tileSize,
                            angle: Math.random() * Math.PI * 2,
                            speed: 0.3 + Math.random() * 0.5,
                            size: 8 + Math.random() * 8,
                            swimPattern: Math.random() * 1000
                        });
                    }
                }
            }
        }
    }

    simpleNoise(x, y) {
        // Simple 2D noise function
        const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
        return n - Math.floor(n);
    }

    selectCharacter(className) {
        const classData = CLASSES[className];

        // Place player in world center
        this.player = {
            class: className,
            name: classData.name,
            x: (this.mapWidth * this.tileSize) / 2,
            y: (this.mapHeight * this.tileSize) / 2,
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

            speed: 4,
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
        const mobCount = 5 + Math.floor(this.player.level / 2);

        for (let i = 0; i < mobCount; i++) {
            this.spawnMob();
        }
    }

    spawnMob() {
        if (!this.player) return;

        const typeIndex = Math.min(
            Math.floor(this.player.level / 3),
            MOB_TYPES.length - 1
        );
        const type = MOB_TYPES[Math.floor(Math.random() * (typeIndex + 1))];

        // Spawn mobs around player in world coordinates
        const distance = 300 + Math.random() * 400;
        const angle = Math.random() * Math.PI * 2;
        const x = this.player.x + Math.cos(angle) * distance;
        const y = this.player.y + Math.sin(angle) * distance;

        // Keep within world bounds
        const clampedX = Math.max(50, Math.min(this.mapWidth * this.tileSize - 50, x));
        const clampedY = Math.max(50, Math.min(this.mapHeight * this.tileSize - 50, y));

        this.mobs.push({
            ...type,
            x: clampedX,
            y: clampedY,
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

        this.time++;

        // Player movement with 8 directions
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

            const newX = this.player.x + dx;
            const newY = this.player.y + dy;

            // Calculate 8-directional facing
            const angle = Math.atan2(dy, dx);
            if (angle > -Math.PI/8 && angle <= Math.PI/8) this.playerDirection = 'right';
            else if (angle > Math.PI/8 && angle <= 3*Math.PI/8) this.playerDirection = 'down-right';
            else if (angle > 3*Math.PI/8 && angle <= 5*Math.PI/8) this.playerDirection = 'down';
            else if (angle > 5*Math.PI/8 && angle <= 7*Math.PI/8) this.playerDirection = 'down-left';
            else if (angle > -3*Math.PI/8 && angle <= -Math.PI/8) this.playerDirection = 'up-right';
            else if (angle > -5*Math.PI/8 && angle <= -3*Math.PI/8) this.playerDirection = 'up';
            else if (angle > -7*Math.PI/8 && angle <= -5*Math.PI/8) this.playerDirection = 'up-left';
            else this.playerDirection = 'left';

            // Check bounds
            const maxX = this.mapWidth * this.tileSize - 20;
            const maxY = this.mapHeight * this.tileSize - 20;

            this.player.x = Math.max(20, Math.min(maxX, newX));
            this.player.y = Math.max(20, Math.min(maxY, newY));

            // Update camera to follow player
            this.cameraX = this.player.x - this.canvas.width / 2;
            this.cameraY = this.player.y - this.canvas.height / 2;

            // Get player's current tile
            const tileX = Math.floor(this.player.x / this.tileSize);
            const tileY = Math.floor(this.player.y / this.tileSize);

            if (this.terrainMap[tileY] && this.terrainMap[tileY][tileX]) {
                const terrain = this.terrainMap[tileY][tileX];

                // Grass trampling
                if (terrain === 'grass') {
                    const key = `${tileX},${tileY}`;
                    const current = this.grassTrample.get(key) || 0;
                    this.grassTrample.set(key, Math.min(1, current + 0.01));
                }

                // Dust particles on dirt/stone roads
                if ((terrain === 'dirt' || terrain === 'stone') && Math.random() < 0.2) {
                    this.dustParticles.push({
                        x: this.player.x + (Math.random() - 0.5) * 20,
                        y: this.player.y + (Math.random() - 0.5) * 20,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: -Math.random() * 0.8,
                        life: 30 + Math.random() * 30,
                        maxLife: 60,
                        size: 2 + Math.random() * 3
                    });
                }
            }
        }

        // Grass regrowth
        this.grassTrample.forEach((value, key) => {
            if (value > 0) {
                this.grassTrample.set(key, Math.max(0, value - 0.001));
            }
        });

        // Update dust particles
        this.dustParticles = this.dustParticles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            return p.life > 0;
        });

        // Update fish animations
        this.fish.forEach(fish => {
            fish.angle += (Math.random() - 0.5) * 0.1;
            fish.x += Math.cos(fish.angle) * fish.speed;
            fish.y += Math.sin(fish.angle) * fish.speed;

            // Keep fish in water
            const tileX = Math.floor(fish.x / this.tileSize);
            const tileY = Math.floor(fish.y / this.tileSize);

            if (this.terrainMap[tileY] && this.terrainMap[tileY][tileX] !== 'water') {
                fish.angle += Math.PI; // Turn around
            }

            // Boundaries
            fish.x = Math.max(0, Math.min(this.mapWidth * this.tileSize, fish.x));
            fish.y = Math.max(0, Math.min(this.mapHeight * this.tileSize, fish.y));
        });

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
        if (!this.player) return;

        // Sky/background
        const skyGrad = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        skyGrad.addColorStop(0, '#2a3a5a');
        skyGrad.addColorStop(1, '#1a2a4a');
        this.ctx.fillStyle = skyGrad;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Calculate visible tile range
        const startTileX = Math.max(0, Math.floor(this.cameraX / this.tileSize) - 1);
        const endTileX = Math.min(this.mapWidth, Math.ceil((this.cameraX + this.canvas.width) / this.tileSize) + 1);
        const startTileY = Math.max(0, Math.floor(this.cameraY / this.tileSize) - 1);
        const endTileY = Math.min(this.mapHeight, Math.ceil((this.cameraY + this.canvas.height) / this.tileSize) + 1);

        // Draw terrain tiles
        for (let ty = startTileY; ty < endTileY; ty++) {
            for (let tx = startTileX; tx < endTileX; tx++) {
                if (this.terrainMap[ty] && this.terrainMap[ty][tx]) {
                    const screenX = tx * this.tileSize - this.cameraX;
                    const screenY = ty * this.tileSize - this.cameraY;
                    const terrain = this.terrainMap[ty][tx];

                    // Get trample level for grass
                    const trampleLevel = terrain === 'grass' ? (this.grassTrample.get(`${tx},${ty}`) || 0) : 0;

                    // Draw terrain using AssetRenderer
                    if (terrain === 'water') {
                        AssetRenderer.drawWaterTile(this.ctx, screenX, screenY, this.tileSize, this.time);
                    } else {
                        AssetRenderer.drawTerrainTile(this.ctx, screenX, screenY, terrain, trampleLevel, this.tileSize);
                    }
                }
            }
        }

        // Draw fish in water
        this.fish.forEach(fish => {
            const screenX = fish.x - this.cameraX;
            const screenY = fish.y - this.cameraY;

            // Only draw if visible
            if (screenX > -50 && screenX < this.canvas.width + 50 &&
                screenY > -50 && screenY < this.canvas.height + 50) {
                AssetRenderer.drawFish(this.ctx, screenX, screenY, fish.angle, fish.size, this.time + fish.swimPattern);
            }
        });

        // Collect and sort entities by Y position for proper layering
        const entities = [];

        // Add trees
        this.trees.forEach(tree => {
            entities.push({
                type: 'tree',
                y: tree.y,
                data: tree
            });
        });

        // Add drops
        this.drops.forEach(drop => {
            entities.push({
                type: 'drop',
                y: drop.y,
                data: drop
            });
        });

        // Add mobs
        this.mobs.forEach(mob => {
            entities.push({
                type: 'mob',
                y: mob.y,
                data: mob
            });
        });

        // Add player
        if (this.player) {
            entities.push({
                type: 'player',
                y: this.player.y,
                data: this.player
            });
        }

        // Sort by Y position
        entities.sort((a, b) => a.y - b.y);

        // Draw all entities in order
        entities.forEach(entity => {
            const screenX = entity.data.x - this.cameraX;
            const screenY = entity.data.y - this.cameraY;

            // Only draw if visible
            if (screenX > -200 && screenX < this.canvas.width + 200 &&
                screenY > -200 && screenY < this.canvas.height + 200) {

                if (entity.type === 'tree') {
                    AssetRenderer.drawTree(this.ctx, screenX, screenY, entity.data.type);
                } else if (entity.type === 'drop') {
                    // Simple drop rendering
                    this.ctx.font = '24px Arial';
                    this.ctx.textAlign = 'center';
                    this.ctx.textBaseline = 'middle';
                    this.ctx.shadowBlur = 5;
                    this.ctx.shadowColor = '#ffd700';
                    this.ctx.fillStyle = '#ffffff';
                    this.ctx.fillText(entity.data.icon, screenX, screenY);
                    this.ctx.shadowBlur = 0;
                } else if (entity.type === 'mob') {
                    const mob = entity.data;

                    // Draw monster using AssetRenderer
                    AssetRenderer.drawMonster(this.ctx, screenX, screenY, mob.name);

                    // HP bar
                    const barWidth = 40;
                    const barHeight = 4;
                    const hpPercent = mob.hp / mob.maxHP;

                    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                    this.ctx.fillRect(screenX - barWidth/2, screenY - 40, barWidth, barHeight);

                    this.ctx.fillStyle = hpPercent > 0.5 ? '#4ade80' : hpPercent > 0.25 ? '#fbbf24' : '#ef4444';
                    this.ctx.fillRect(screenX - barWidth/2, screenY - 40, barWidth * hpPercent, barHeight);
                } else if (entity.type === 'player') {
                    // Draw player using AssetRenderer
                    AssetRenderer.drawCharacter(this.ctx, screenX, screenY, this.playerDirection, this.player.class);
                }
            }
        });

        // Draw dust particles (always on top)
        this.dustParticles.forEach(p => {
            const screenX = p.x - this.cameraX;
            const screenY = p.y - this.cameraY;
            const alpha = p.life / p.maxLife;

            this.ctx.fillStyle = `rgba(139, 115, 85, ${alpha * 0.5})`;
            this.ctx.beginPath();
            this.ctx.arc(screenX, screenY, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw minimap
        this.drawMinimap();
    }

    drawMinimap() {
        const minimapSize = 150;
        const minimapX = this.canvas.width - minimapSize - 10;
        const minimapY = this.canvas.height - minimapSize - 10;
        const scale = minimapSize / (this.mapWidth * this.tileSize);

        // Background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(minimapX, minimapY, minimapSize, minimapSize);

        // Border
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(minimapX, minimapY, minimapSize, minimapSize);

        // Player position
        if (this.player) {
            const px = minimapX + this.player.x * scale;
            const py = minimapY + this.player.y * scale;

            this.ctx.fillStyle = '#ff6b6b';
            this.ctx.beginPath();
            this.ctx.arc(px, py, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Mobs
        this.mobs.forEach(mob => {
            const mx = minimapX + mob.x * scale;
            const my = minimapY + mob.y * scale;

            this.ctx.fillStyle = '#ffd700';
            this.ctx.beginPath();
            this.ctx.arc(mx, my, 2, 0, Math.PI * 2);
            this.ctx.fill();
        });
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
