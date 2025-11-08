// Professional Visual Effects System
// Particle systems, skill effects, and environmental effects

class VisualEffectsSystem {
    constructor() {
        this.effects = [];
        this.screenShakes = [];
    }

    update() {
        // Update all effects
        this.effects = this.effects.filter(effect => {
            effect.update();
            return !effect.isDead();
        });

        // Update screen shakes
        this.screenShakes = this.screenShakes.filter(shake => {
            shake.duration--;
            return shake.duration > 0;
        });
    }

    getScreenShakeOffset() {
        if (this.screenShakes.length === 0) return { x: 0, y: 0 };

        let totalX = 0;
        let totalY = 0;

        this.screenShakes.forEach(shake => {
            totalX += (Math.random() - 0.5) * shake.intensity;
            totalY += (Math.random() - 0.5) * shake.intensity;
        });

        return { x: totalX, y: totalY };
    }

    addScreenShake(intensity, duration) {
        this.screenShakes.push({ intensity, duration });
    }

    draw(ctx) {
        this.effects.forEach(effect => effect.draw(ctx));
    }

    // Skill effects
    createSlashEffect(x, y, direction = 1, color = '#ff0000') {
        this.effects.push(new SlashEffect(x, y, direction, color));
        this.addScreenShake(3, 5);
    }

    createFireballEffect(startX, startY, endX, endY) {
        this.effects.push(new FireballEffect(startX, startY, endX, endY));
    }

    createLightningEffect(startX, startY, endX, endY) {
        this.effects.push(new LightningEffect(startX, startY, endX, endY));
        this.addScreenShake(4, 6);
    }

    createHealEffect(x, y) {
        this.effects.push(new HealEffect(x, y));
    }

    createExplosionEffect(x, y, color = '#ff4500') {
        this.effects.push(new ExplosionEffect(x, y, color));
        this.addScreenShake(5, 8);
    }

    createBuffEffect(x, y, color = '#ffd700') {
        this.effects.push(new BuffEffect(x, y, color));
    }

    // Impact effects
    createImpactEffect(x, y, color = '#ffffff') {
        this.effects.push(new ImpactEffect(x, y, color));
    }

    // Environmental effects
    createBloodSplatter(x, y) {
        this.effects.push(new BloodSplatter(x, y));
    }

    createLevelUpEffect(x, y) {
        this.effects.push(new LevelUpEffect(x, y));
        this.addScreenShake(2, 10);
    }
}

// Slash Effect (for sword attacks)
class SlashEffect {
    constructor(x, y, direction, color) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.color = color;
        this.life = 20;
        this.maxLife = 20;
        this.angle = direction > 0 ? -45 : 45;
        this.radius = 40;
    }

    update() {
        this.life--;
        this.radius += 3;
    }

    isDead() {
        return this.life <= 0;
    }

    draw(ctx) {
        const alpha = this.life / this.maxLife;

        ctx.save();
        ctx.globalAlpha = alpha * 0.8;
        ctx.translate(this.x, this.y);

        // Arc slash
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.5, `${this.color}88`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.arc(0, 0, this.radius,
                (this.angle - 60) * Math.PI / 180,
                (this.angle + 60) * Math.PI / 180);
        ctx.stroke();

        // Inner bright line
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius,
                (this.angle - 50) * Math.PI / 180,
                (this.angle + 50) * Math.PI / 180);
        ctx.stroke();

        // Spark particles
        for (let i = 0; i < 5; i++) {
            const sparkAngle = (this.angle - 60 + i * 30) * Math.PI / 180;
            const sparkX = Math.cos(sparkAngle) * this.radius;
            const sparkY = Math.sin(sparkAngle) * this.radius;

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(sparkX, sparkY, 2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

// Fireball Effect
class FireballEffect {
    constructor(startX, startY, endX, endY) {
        this.x = startX;
        this.y = startY;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;

        this.life = 30;
        this.maxLife = 30;
        this.progress = 0;

        const dx = endX - startX;
        const dy = endY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.speed = distance / this.life;

        this.angle = Math.atan2(dy, dx);
        this.trail = [];
    }

    update() {
        this.life--;
        this.progress += 1 / this.maxLife;

        this.x = this.startX + (this.endX - this.startX) * this.progress;
        this.y = this.startY + (this.endY - this.startY) * this.progress;

        this.trail.push({ x: this.x, y: this.y, life: 10 });
        this.trail = this.trail.filter(t => {
            t.life--;
            return t.life > 0;
        });
    }

    isDead() {
        return this.life <= 0;
    }

    draw(ctx) {
        // Trail
        this.trail.forEach((t, i) => {
            const alpha = t.life / 10;
            const size = 8 * alpha;

            ctx.save();
            ctx.globalAlpha = alpha * 0.6;

            const gradient = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, size);
            gradient.addColorStop(0, '#ff4500');
            gradient.addColorStop(0.5, '#ff8c00');
            gradient.addColorStop(1, 'rgba(255, 69, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(t.x, t.y, size, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        });

        // Main fireball
        ctx.save();

        // Outer glow
        const outerGlow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 20);
        outerGlow.addColorStop(0, '#ff4500');
        outerGlow.addColorStop(0.4, '#ff8c00');
        outerGlow.addColorStop(1, 'rgba(255, 69, 0, 0)');

        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
        ctx.fill();

        // Core
        const coreGlow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 10);
        coreGlow.addColorStop(0, '#ffffff');
        coreGlow.addColorStop(0.5, '#ffff00');
        coreGlow.addColorStop(1, '#ff4500');

        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

// Lightning Effect
class LightningEffect {
    constructor(startX, startY, endX, endY) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;

        this.life = 15;
        this.maxLife = 15;

        this.generateBolt();
    }

    generateBolt() {
        this.points = [{ x: this.startX, y: this.startY }];

        const segments = 8;
        for (let i = 1; i < segments; i++) {
            const t = i / segments;
            const x = this.startX + (this.endX - this.startX) * t + (Math.random() - 0.5) * 30;
            const y = this.startY + (this.endY - this.startY) * t + (Math.random() - 0.5) * 30;
            this.points.push({ x, y });
        }

        this.points.push({ x: this.endX, y: this.endY });
    }

    update() {
        this.life--;

        // Regenerate bolt occasionally for flicker effect
        if (this.life % 3 === 0) {
            this.generateBolt();
        }
    }

    isDead() {
        return this.life <= 0;
    }

    draw(ctx) {
        const alpha = this.life / this.maxLife;

        ctx.save();
        ctx.globalAlpha = alpha;

        // Draw multiple bolts for thickness
        for (let i = 0; i < 3; i++) {
            ctx.strokeStyle = i === 0 ? '#ffffff' : '#4444ff';
            ctx.lineWidth = i === 0 ? 3 : 6;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            ctx.beginPath();
            ctx.moveTo(this.points[0].x, this.points[0].y);

            for (let j = 1; j < this.points.length; j++) {
                ctx.lineTo(this.points[j].x, this.points[j].y);
            }

            ctx.stroke();
        }

        // Glow at endpoints
        const glow = ctx.createRadialGradient(this.endX, this.endY, 0, this.endX, this.endY, 20);
        glow.addColorStop(0, '#ffffff');
        glow.addColorStop(0.5, '#4444ff');
        glow.addColorStop(1, 'rgba(68, 68, 255, 0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(this.endX, this.endY, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

// Heal Effect
class HealEffect {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.life = 60;
        this.maxLife = 60;
        this.particles = [];

        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            this.particles.push({
                x: 0,
                y: 0,
                angle: angle,
                radius: 5,
                speed: 0.5,
                life: 60
            });
        }
    }

    update() {
        this.life--;

        this.particles.forEach(p => {
            p.radius += p.speed;
            p.y -= 1;
            p.life--;
        });
    }

    isDead() {
        return this.life <= 0;
    }

    draw(ctx) {
        ctx.save();

        this.particles.forEach(p => {
            const alpha = p.life / this.maxLife;
            const x = this.x + Math.cos(p.angle) * p.radius;
            const y = this.y + p.y + Math.sin(p.angle) * p.radius;

            ctx.globalAlpha = alpha;

            // Green healing particle
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 4);
            gradient.addColorStop(0, '#00ff00');
            gradient.addColorStop(0.5, '#00ff88');
            gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();

            // Sparkle
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
        });

        // Center glow
        const alpha = this.life / this.maxLife;
        ctx.globalAlpha = alpha * 0.5;

        const centerGlow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 30);
        centerGlow.addColorStop(0, '#00ff00');
        centerGlow.addColorStop(1, 'rgba(0, 255, 0, 0)');

        ctx.fillStyle = centerGlow;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 30, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

// Explosion Effect
class ExplosionEffect {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.life = 40;
        this.maxLife = 40;
        this.radius = 5;
        this.maxRadius = 50;
        this.particles = [];

        for (let i = 0; i < 30; i++) {
            const angle = (Math.PI * 2 * i) / 30;
            const speed = 2 + Math.random() * 3;
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 40,
                size: 3 + Math.random() * 4
            });
        }
    }

    update() {
        this.life--;
        this.radius = this.maxRadius * (1 - this.life / this.maxLife);

        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.life--;
        });

        this.particles = this.particles.filter(p => p.life > 0);
    }

    isDead() {
        return this.life <= 0;
    }

    draw(ctx) {
        const alpha = this.life / this.maxLife;

        ctx.save();

        // Expanding shockwave
        ctx.globalAlpha = alpha * 0.6;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner bright ring
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.8, 0, Math.PI * 2);
        ctx.stroke();

        // Particles
        this.particles.forEach(p => {
            const pAlpha = p.life / 40;
            ctx.globalAlpha = pAlpha;

            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.5, this.color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore();
    }
}

// Buff Effect (spinning runes around character)
class BuffEffect {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.life = 80;
        this.maxLife = 80;
        this.rotation = 0;
        this.runes = 6;
    }

    update() {
        this.life--;
        this.rotation += 0.05;
    }

    isDead() {
        return this.life <= 0;
    }

    draw(ctx) {
        const alpha = Math.min(this.life / 20, 1);

        ctx.save();
        ctx.globalAlpha = alpha * 0.8;

        for (let i = 0; i < this.runes; i++) {
            const angle = (Math.PI * 2 * i / this.runes) + this.rotation;
            const radius = 30 + Math.sin(this.life * 0.1 + i) * 5;

            const x = this.x + Math.cos(angle) * radius;
            const y = this.y + Math.sin(angle) * radius;

            // Rune symbol
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle + Math.PI / 2);

            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 8);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('✦', 0, 0);

            ctx.restore();
        }

        ctx.restore();
    }
}

// Impact Effect (for hits)
class ImpactEffect {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.life = 20;
        this.maxLife = 20;
        this.rings = 3;
    }

    update() {
        this.life--;
    }

    isDead() {
        return this.life <= 0;
    }

    draw(ctx) {
        const alpha = this.life / this.maxLife;
        const progress = 1 - alpha;

        ctx.save();

        for (let i = 0; i < this.rings; i++) {
            const ringProgress = Math.max(0, progress - i * 0.2);
            const radius = ringProgress * 30;
            const ringAlpha = alpha * (1 - i * 0.3);

            ctx.globalAlpha = ringAlpha;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Center flash
        ctx.globalAlpha = alpha;
        const flash = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 10);
        flash.addColorStop(0, '#ffffff');
        flash.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = flash;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

// Blood Splatter
class BloodSplatter {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.life = 30;
        this.maxLife = 30;
        this.drops = [];

        for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 4;
            this.drops.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                size: 2 + Math.random() * 3,
                life: 30
            });
        }
    }

    update() {
        this.life--;

        this.drops.forEach(d => {
            d.x += d.vx;
            d.y += d.vy;
            d.vy += 0.2; // gravity
            d.vx *= 0.98; // air resistance
            d.life--;
        });
    }

    isDead() {
        return this.life <= 0;
    }

    draw(ctx) {
        ctx.save();

        this.drops.forEach(d => {
            const alpha = d.life / this.maxLife;
            ctx.globalAlpha = alpha;

            ctx.fillStyle = '#8b0000';
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
            ctx.fill();

            // Darker center
            ctx.fillStyle = '#5a0000';
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore();
    }
}

// Level Up Effect
class LevelUpEffect {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.life = 90;
        this.maxLife = 90;
        this.beams = [];

        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 * i) / 12;
            this.beams.push({ angle: angle, length: 0 });
        }
    }

    update() {
        this.life--;

        this.beams.forEach(b => {
            if (this.life > 60) {
                b.length += 5;
            } else if (this.life < 30) {
                b.length -= 3;
            }
            b.length = Math.max(0, Math.min(b.length, 100));
        });
    }

    isDead() {
        return this.life <= 0;
    }

    draw(ctx) {
        const alpha = Math.min(this.life / 30, (90 - this.life) / 30, 1);

        ctx.save();
        ctx.globalAlpha = alpha;

        // Beams of light
        this.beams.forEach(b => {
            const endX = this.x + Math.cos(b.angle) * b.length;
            const endY = this.y + Math.sin(b.angle) * b.length;

            const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
            gradient.addColorStop(0, '#ffd700');
            gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        });

        // Center star
        ctx.fillStyle = '#ffd700';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#ffd700';

        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('★', this.x, this.y);

        // Orbiting particles
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i / 8) + (this.life * 0.1);
            const radius = 40;
            const px = this.x + Math.cos(angle) * radius;
            const py = this.y + Math.sin(angle) * radius;

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VisualEffectsSystem;
}
