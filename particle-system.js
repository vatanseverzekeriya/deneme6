// Professional Particle Effect System
// For fire, sparks, blood, magic effects, etc.

class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    // Fire particles (for dragon breath, torches, etc.)
    createFireParticles(x, y, count = 10, direction = 0) {
        for (let i = 0; i < count; i++) {
            const angle = direction + (Math.random() - 0.5) * Math.PI / 3;
            const speed = 2 + Math.random() * 3;

            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1,
                size: 3 + Math.random() * 5,
                life: 1.0,
                maxLife: 0.5 + Math.random() * 0.5,
                type: 'fire',
                color: Math.random() > 0.5 ? '#FF6600' : '#FFAA00'
            });
        }
    }

    // Smoke particles
    createSmokeParticles(x, y, count = 5) {
        for (let i = 0; i < count; i++) {
            const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI / 4;
            const speed = 0.5 + Math.random();

            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 4 + Math.random() * 6,
                life: 1.0,
                maxLife: 1.0 + Math.random() * 0.5,
                type: 'smoke',
                opacity: 0.3 + Math.random() * 0.3
            });
        }
    }

    // Blood splatter
    createBloodParticles(x, y, count = 8) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 4;

            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                size: 2 + Math.random() * 3,
                life: 1.0,
                maxLife: 0.8 + Math.random() * 0.4,
                type: 'blood',
                gravity: 0.3
            });
        }
    }

    // Sparks (for metal hits, electricity)
    createSparkParticles(x, y, count = 15, color = '#FFD700') {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 5;

            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 1 + Math.random() * 2,
                life: 1.0,
                maxLife: 0.3 + Math.random() * 0.3,
                type: 'spark',
                color: color,
                gravity: 0.2
            });
        }
    }

    // Magic sparkles
    createMagicParticles(x, y, count = 20, color = '#9370DB') {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 2;
            const orbitRadius = Math.random() * 30;

            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 2 + Math.random() * 3,
                life: 1.0,
                maxLife: 1.0 + Math.random() * 0.5,
                type: 'magic',
                color: color,
                orbitAngle: angle,
                orbitRadius: orbitRadius,
                orbitSpeed: 0.05 + Math.random() * 0.05
            });
        }
    }

    // Healing particles (green/white sparkles)
    createHealParticles(x, y, count = 15) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random();

            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: -2 - Math.random() * 2,
                size: 2 + Math.random() * 3,
                life: 1.0,
                maxLife: 1.0 + Math.random() * 0.5,
                type: 'heal',
                pulseSpeed: 0.1 + Math.random() * 0.1
            });
        }
    }

    // Explosion particles
    createExplosionParticles(x, y, count = 30, size = 1.0) {
        // Fire burst
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const speed = (3 + Math.random() * 5) * size;

            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: (4 + Math.random() * 6) * size,
                life: 1.0,
                maxLife: 0.5 + Math.random() * 0.3,
                type: 'fire',
                color: i % 3 === 0 ? '#FFFF00' : i % 3 === 1 ? '#FF6600' : '#FF0000'
            });
        }

        // Smoke
        this.createSmokeParticles(x, y, Math.floor(count / 2));
    }

    // Dust particles (for impacts)
    createDustParticles(x, y, count = 10) {
        for (let i = 0; i < count; i++) {
            const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI;
            const speed = 1 + Math.random() * 2;

            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 2 + Math.random() * 4,
                life: 1.0,
                maxLife: 0.5 + Math.random() * 0.5,
                type: 'dust',
                opacity: 0.4 + Math.random() * 0.3,
                gravity: 0.1
            });
        }
    }

    // Poison cloud
    createPoisonParticles(x, y, count = 12) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.3 + Math.random() * 0.5;

            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 0.5,
                size: 5 + Math.random() * 8,
                life: 1.0,
                maxLife: 1.5 + Math.random() * 1.0,
                type: 'poison',
                opacity: 0.3 + Math.random() * 0.2,
                swirl: Math.random() * Math.PI * 2,
                swirlSpeed: 0.05 + Math.random() * 0.05
            });
        }
    }

    // Ice particles
    createIceParticles(x, y, count = 20) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 3;

            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1,
                size: 2 + Math.random() * 3,
                life: 1.0,
                maxLife: 0.8 + Math.random() * 0.4,
                type: 'ice',
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                gravity: 0.15
            });
        }
    }

    // Lightning effect
    createLightningParticles(x1, y1, x2, y2) {
        const steps = 10;
        for (let i = 0; i < steps; i++) {
            const t = i / steps;
            const x = x1 + (x2 - x1) * t + (Math.random() - 0.5) * 20;
            const y = y1 + (y2 - y1) * t + (Math.random() - 0.5) * 20;

            this.particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: 3 + Math.random() * 4,
                life: 1.0,
                maxLife: 0.2 + Math.random() * 0.1,
                type: 'lightning'
            });
        }
    }

    // Update all particles
    update(deltaTime) {
        const dt = deltaTime / 16; // Normalize to 60fps

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            // Update position
            p.x += p.vx * dt;
            p.y += p.vy * dt;

            // Apply gravity
            if (p.gravity) {
                p.vy += p.gravity * dt;
            }

            // Update velocity (friction)
            p.vx *= 0.98;
            p.vy *= 0.98;

            // Type-specific updates
            if (p.type === 'fire' || p.type === 'smoke') {
                p.size *= 1.02; // Grow
                p.vy -= 0.1 * dt; // Rise
            }

            if (p.type === 'magic' && p.orbitRadius) {
                p.orbitAngle += p.orbitSpeed * dt;
                p.x += Math.cos(p.orbitAngle) * 0.5;
                p.y += Math.sin(p.orbitAngle) * 0.5;
            }

            if (p.type === 'poison' && p.swirl !== undefined) {
                p.swirl += p.swirlSpeed * dt;
                p.vx += Math.cos(p.swirl) * 0.1;
            }

            if (p.type === 'ice' && p.rotation !== undefined) {
                p.rotation += p.rotationSpeed * dt;
            }

            // Update life
            p.life -= dt / (p.maxLife * 60);

            // Remove dead particles
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    // Render all particles
    render(ctx) {
        this.particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.life * (p.opacity || 1.0);

            switch (p.type) {
                case 'fire':
                    this.renderFire(ctx, p);
                    break;
                case 'smoke':
                    this.renderSmoke(ctx, p);
                    break;
                case 'blood':
                    this.renderBlood(ctx, p);
                    break;
                case 'spark':
                    this.renderSpark(ctx, p);
                    break;
                case 'magic':
                    this.renderMagic(ctx, p);
                    break;
                case 'heal':
                    this.renderHeal(ctx, p);
                    break;
                case 'dust':
                    this.renderDust(ctx, p);
                    break;
                case 'poison':
                    this.renderPoison(ctx, p);
                    break;
                case 'ice':
                    this.renderIce(ctx, p);
                    break;
                case 'lightning':
                    this.renderLightning(ctx, p);
                    break;
            }

            ctx.restore();
        });
    }

    renderFire(ctx, p) {
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, p.color || '#FFFF00');
        gradient.addColorStop(0.5, p.color || '#FF6600');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }

    renderSmoke(ctx, p) {
        ctx.fillStyle = `rgba(100, 100, 100, ${p.life * (p.opacity || 0.3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }

    renderBlood(ctx, p) {
        ctx.fillStyle = '#8B0000';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }

    renderSpark(ctx, p) {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 5;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    renderMagic(ctx, p) {
        const pulse = 0.7 + Math.sin(p.life * 10) * 0.3;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8 * pulse;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Star shape
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
    }

    renderHeal(ctx, p) {
        const pulse = 0.8 + Math.sin(p.life * (p.pulseSpeed * 60)) * 0.2;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, 'rgba(144, 238, 144, 1)');
        gradient.addColorStop(0.5, 'rgba(50, 205, 50, 0.8)');
        gradient.addColorStop(1, 'rgba(34, 139, 34, 0)');

        ctx.shadowColor = '#90EE90';
        ctx.shadowBlur = 6 * pulse;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Plus symbol
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        const crossSize = p.size * 0.6;
        ctx.fillRect(p.x - crossSize / 2, p.y - 0.5, crossSize, 1);
        ctx.fillRect(p.x - 0.5, p.y - crossSize / 2, 1, crossSize);
    }

    renderDust(ctx, p) {
        ctx.fillStyle = `rgba(139, 119, 101, ${p.life * (p.opacity || 0.4)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }

    renderPoison(ctx, p) {
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, 'rgba(124, 252, 0, 0.4)');
        gradient.addColorStop(0.5, 'rgba(50, 205, 50, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 100, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }

    renderIce(ctx, p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Diamond shape
        ctx.fillStyle = '#B0E0E6';
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size * 0.7, 0);
        ctx.lineTo(0, p.size);
        ctx.lineTo(-p.size * 0.7, 0);
        ctx.closePath();
        ctx.fill();

        // Highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.5);
        ctx.lineTo(p.size * 0.3, 0);
        ctx.lineTo(0, p.size * 0.5);
        ctx.lineTo(-p.size * 0.3, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    renderLightning(ctx, p) {
        ctx.shadowColor = '#00FFFF';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#00FFFF';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    // Clear all particles
    clear() {
        this.particles = [];
    }

    // Get particle count
    count() {
        return this.particles.length;
    }
}
