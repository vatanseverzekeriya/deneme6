/**
 * Professional Wizard Character Sprite System
 * High-quality RPG character with animations and particle effects
 */

class WizardSprite {
    constructor() {
        this.frameTime = 0;
        this.currentFrame = 0;
        this.animationSpeed = 100; // ms per frame

        // Animation states
        this.state = 'idle'; // idle, walk, attack, hurt, death
        this.direction = 'south'; // north, northeast, east, southeast, south, southwest, west, northwest

        // Character properties
        this.size = 64;
        this.scale = 1;

        // Colors - Professional wizard theme
        this.colors = {
            // Robe colors
            robeMain: '#2D3561',
            robeShadow: '#1A1F3A',
            robeHighlight: '#4A5A9E',
            robeAccent: '#8B5CF6',

            // Hat colors
            hatMain: '#2D3561',
            hatShadow: '#1A1F3A',
            hatStar: '#FFD700',

            // Skin
            skin: '#FDBCB4',
            skinShadow: '#E8A89E',

            // Beard
            beardMain: '#D3D3D3',
            beardShadow: '#A9A9A9',

            // Staff
            staffWood: '#8B4513',
            staffWoodDark: '#654321',
            staffOrb: '#4FC3F7',
            staffOrbGlow: '#81D4FA',

            // Magic effects
            magicPrimary: '#8B5CF6',
            magicSecondary: '#3B82F6',
            magicGlow: '#C4B5FD'
        };
    }

    /**
     * Draw the wizard character
     */
    draw(ctx, x, y, direction = 'south', state = 'idle', frame = 0) {
        this.state = state;
        this.direction = direction;
        this.currentFrame = frame;

        ctx.save();
        ctx.translate(x, y);

        // Apply direction flip
        const flipH = ['northwest', 'west', 'southwest'].includes(direction);
        if (flipH) {
            ctx.scale(-1, 1);
        }

        // Draw based on state
        switch(state) {
            case 'idle':
                this.drawIdle(ctx, frame);
                break;
            case 'walk':
                this.drawWalk(ctx, frame);
                break;
            case 'attack':
                this.drawAttack(ctx, frame);
                break;
            case 'hurt':
                this.drawHurt(ctx, frame);
                break;
            case 'death':
                this.drawDeath(ctx, frame);
                break;
            default:
                this.drawIdle(ctx, frame);
        }

        ctx.restore();
    }

    /**
     * Idle animation - breathing, subtle robe movement
     */
    drawIdle(ctx, frame) {
        const breathOffset = Math.sin(frame * 0.1) * 2;
        const robeWave = Math.sin(frame * 0.15) * 1;

        // Shadow
        this.drawShadow(ctx, 0, 20);

        // Staff (behind)
        this.drawStaff(ctx, -8, -10 + breathOffset, 0);

        // Robe
        this.drawRobe(ctx, 0, breathOffset, robeWave);

        // Body
        this.drawBody(ctx, 0, breathOffset);

        // Head
        this.drawHead(ctx, 0, -20 + breathOffset * 0.5);

        // Hat
        this.drawHat(ctx, 0, -35 + breathOffset * 0.3);

        // Beard
        this.drawBeard(ctx, 0, -12 + breathOffset * 0.5);

        // Staff orb glow (idle pulse)
        this.drawStaffGlow(ctx, -8, -35 + breathOffset, 0.3 + Math.sin(frame * 0.2) * 0.2);
    }

    /**
     * Walk animation - stepping motion
     */
    drawWalk(ctx, frame) {
        const step = frame % 8;
        const bobOffset = Math.abs(Math.sin(step * Math.PI / 4)) * 3;
        const armSwing = Math.sin(step * Math.PI / 4) * 5;
        const robeSwing = Math.sin(step * Math.PI / 4) * 3;

        // Shadow (moves with steps)
        this.drawShadow(ctx, Math.sin(step * Math.PI / 4) * 2, 20);

        // Staff (swings with movement)
        this.drawStaff(ctx, -8 + armSwing, -10 - bobOffset, armSwing * 2);

        // Robe (swaying)
        this.drawRobe(ctx, robeSwing * 0.5, -bobOffset, robeSwing);

        // Body
        this.drawBody(ctx, 0, -bobOffset);

        // Head
        this.drawHead(ctx, 0, -20 - bobOffset);

        // Hat
        this.drawHat(ctx, 0, -35 - bobOffset);

        // Beard
        this.drawBeard(ctx, 0, -12 - bobOffset);

        // Staff orb glow
        this.drawStaffGlow(ctx, -8 + armSwing, -35 - bobOffset, 0.4);
    }

    /**
     * Attack/Cast spell animation
     */
    drawAttack(ctx, frame) {
        const castPhase = frame % 12;
        let handX = 0, handY = 0, staffAngle = 0;
        let glowIntensity = 0;

        if (castPhase < 4) {
            // Wind up
            handX = -castPhase * 3;
            handY = -castPhase * 2;
            staffAngle = -castPhase * 5;
            glowIntensity = castPhase * 0.3;
        } else if (castPhase < 8) {
            // Cast
            const castFrame = castPhase - 4;
            handX = 12 + castFrame * 2;
            handY = -15;
            staffAngle = 20 + castFrame * 5;
            glowIntensity = 1.0;
        } else {
            // Recovery
            const recFrame = castPhase - 8;
            handX = 20 - recFrame * 5;
            handY = -15 + recFrame * 4;
            staffAngle = 35 - recFrame * 9;
            glowIntensity = 1.0 - recFrame * 0.3;
        }

        // Shadow
        this.drawShadow(ctx, 0, 20);

        // Robe (flowing with magic)
        this.drawRobe(ctx, Math.sin(frame * 0.3) * 2, 0, Math.sin(frame * 0.2) * 3);

        // Body
        this.drawBody(ctx, 0, 0);

        // Head
        this.drawHead(ctx, 0, -20);

        // Hat
        this.drawHat(ctx, 0, -35);

        // Beard
        this.drawBeard(ctx, 0, -12);

        // Staff (raised for casting)
        this.drawStaff(ctx, -8 + handX, -10 + handY, staffAngle);

        // Staff orb glow (intense during cast)
        this.drawStaffGlow(ctx, -8 + handX, -35 + handY, glowIntensity);

        // Magic particles
        if (castPhase >= 4 && castPhase < 8) {
            this.drawMagicParticles(ctx, 12, -25, castPhase - 4);
        }
    }

    /**
     * Hurt animation - recoil
     */
    drawHurt(ctx, frame) {
        const hurtPhase = frame % 6;
        const recoil = hurtPhase < 3 ? -5 + hurtPhase * 2 : 1 - (hurtPhase - 3) * 1;
        const shake = hurtPhase < 3 ? Math.sin(hurtPhase * 3) * 2 : 0;

        ctx.globalAlpha = hurtPhase % 2 === 0 ? 1 : 0.7; // Flash effect

        // Shadow
        this.drawShadow(ctx, recoil, 20);

        // Staff (dropped lower)
        this.drawStaff(ctx, -8 + recoil, -5, -10);

        // Robe
        this.drawRobe(ctx, recoil, shake, 0);

        // Body
        this.drawBody(ctx, recoil, shake);

        // Head (tilted)
        this.drawHead(ctx, recoil, -20 + shake);

        // Hat
        this.drawHat(ctx, recoil, -35 + shake);

        // Beard
        this.drawBeard(ctx, recoil, -12 + shake);

        ctx.globalAlpha = 1;
    }

    /**
     * Death animation - falling and fading
     */
    drawDeath(ctx, frame) {
        const deathPhase = Math.min(frame, 20);
        const fallRotation = (deathPhase / 20) * 90;
        const fadeAlpha = 1 - (deathPhase / 20) * 0.7;
        const fallY = (deathPhase / 20) * 15;

        ctx.globalAlpha = fadeAlpha;
        ctx.rotate(fallRotation * Math.PI / 180);

        // Shadow (fading)
        ctx.globalAlpha = fadeAlpha * 0.3;
        this.drawShadow(ctx, 0, 20 + fallY);
        ctx.globalAlpha = fadeAlpha;

        // Staff (falling)
        this.drawStaff(ctx, -8, -10 + fallY, fallRotation);

        // Robe
        this.drawRobe(ctx, 0, fallY, 0);

        // Body
        this.drawBody(ctx, 0, fallY);

        // Head
        this.drawHead(ctx, 0, -20 + fallY);

        // Hat
        this.drawHat(ctx, 0, -35 + fallY);

        // Beard
        this.drawBeard(ctx, 0, -12 + fallY);

        // Dissipating particles
        this.drawDeathParticles(ctx, 0, 0, deathPhase);

        ctx.globalAlpha = 1;
    }

    /**
     * Draw shadow
     */
    drawShadow(ctx, offsetX, offsetY) {
        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.ellipse(offsetX, offsetY, 15, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    /**
     * Draw wizard robe
     */
    drawRobe(ctx, offsetX, offsetY, wave) {
        ctx.save();

        // Main robe body
        ctx.fillStyle = this.colors.robeMain;
        ctx.beginPath();
        ctx.moveTo(offsetX - 12, offsetY - 5);
        ctx.quadraticCurveTo(offsetX - 15, offsetY + 5, offsetX - 10 + wave, offsetY + 18);
        ctx.lineTo(offsetX + 10 + wave, offsetY + 18);
        ctx.quadraticCurveTo(offsetX + 15, offsetY + 5, offsetX + 12, offsetY - 5);
        ctx.closePath();
        ctx.fill();

        // Robe shadows
        ctx.fillStyle = this.colors.robeShadow;
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY - 5);
        ctx.quadraticCurveTo(offsetX + 10, offsetY + 5, offsetX + 10 + wave, offsetY + 18);
        ctx.lineTo(offsetX + 5 + wave, offsetY + 18);
        ctx.quadraticCurveTo(offsetX + 5, offsetY + 5, offsetX, offsetY - 5);
        ctx.closePath();
        ctx.fill();

        // Robe highlights
        ctx.fillStyle = this.colors.robeHighlight;
        ctx.beginPath();
        ctx.moveTo(offsetX - 10, offsetY);
        ctx.quadraticCurveTo(offsetX - 12, offsetY + 3, offsetX - 9 + wave, offsetY + 10);
        ctx.lineTo(offsetX - 7 + wave, offsetY + 10);
        ctx.quadraticCurveTo(offsetX - 10, offsetY + 3, offsetX - 8, offsetY);
        ctx.closePath();
        ctx.fill();

        // Magic trim
        ctx.strokeStyle = this.colors.robeAccent;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(offsetX - 10 + wave, offsetY + 18);
        ctx.lineTo(offsetX + 10 + wave, offsetY + 18);
        ctx.stroke();

        // Belt
        ctx.fillStyle = '#8B7355';
        ctx.fillRect(offsetX - 12, offsetY + 2, 24, 3);
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(offsetX - 3, offsetY + 1, 6, 5);

        ctx.restore();
    }

    /**
     * Draw body (torso)
     */
    drawBody(ctx, offsetX, offsetY) {
        // Upper body under robe
        ctx.fillStyle = this.colors.robeMain;
        ctx.beginPath();
        ctx.ellipse(offsetX, offsetY - 3, 11, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Arms
        // Left arm
        ctx.fillStyle = this.colors.robeMain;
        ctx.beginPath();
        ctx.ellipse(offsetX - 13, offsetY + 2, 4, 8, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Right arm
        ctx.beginPath();
        ctx.ellipse(offsetX + 13, offsetY + 2, 4, 8, 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Hands
        ctx.fillStyle = this.colors.skin;
        // Left hand
        ctx.beginPath();
        ctx.arc(offsetX - 13, offsetY + 10, 3, 0, Math.PI * 2);
        ctx.fill();
        // Right hand
        ctx.beginPath();
        ctx.arc(offsetX + 13, offsetY + 10, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    /**
     * Draw head
     */
    drawHead(ctx, offsetX, offsetY) {
        // Face
        ctx.fillStyle = this.colors.skin;
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, 8, 0, Math.PI * 2);
        ctx.fill();

        // Face shadow
        ctx.fillStyle = this.colors.skinShadow;
        ctx.beginPath();
        ctx.arc(offsetX + 2, offsetY + 2, 8, 0, Math.PI * 2);
        ctx.globalAlpha = 0.2;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Eyes
        ctx.fillStyle = '#2C3E50';
        ctx.beginPath();
        ctx.arc(offsetX - 3, offsetY - 1, 1.5, 0, Math.PI * 2);
        ctx.arc(offsetX + 3, offsetY - 1, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Eye glow (magical)
        ctx.fillStyle = this.colors.magicSecondary;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(offsetX - 3, offsetY - 1, 2, 0, Math.PI * 2);
        ctx.arc(offsetX + 3, offsetY - 1, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Nose
        ctx.fillStyle = this.colors.skinShadow;
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY + 1);
        ctx.lineTo(offsetX - 1, offsetY + 3);
        ctx.lineTo(offsetX + 1, offsetY + 3);
        ctx.closePath();
        ctx.fill();

        // Mouth (slight smile)
        ctx.strokeStyle = this.colors.skinShadow;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(offsetX, offsetY + 2, 3, 0.2, Math.PI - 0.2);
        ctx.stroke();
    }

    /**
     * Draw wizard hat
     */
    drawHat(ctx, offsetX, offsetY) {
        // Hat main cone
        ctx.fillStyle = this.colors.hatMain;
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY - 20);
        ctx.quadraticCurveTo(offsetX - 8, offsetY - 10, offsetX - 12, offsetY);
        ctx.lineTo(offsetX + 12, offsetY);
        ctx.quadraticCurveTo(offsetX + 8, offsetY - 10, offsetX, offsetY - 20);
        ctx.closePath();
        ctx.fill();

        // Hat shadow
        ctx.fillStyle = this.colors.hatShadow;
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY - 20);
        ctx.quadraticCurveTo(offsetX + 8, offsetY - 10, offsetX + 12, offsetY);
        ctx.lineTo(offsetX + 8, offsetY);
        ctx.quadraticCurveTo(offsetX + 5, offsetY - 10, offsetX, offsetY - 20);
        ctx.closePath();
        ctx.fill();

        // Hat brim
        ctx.fillStyle = this.colors.hatMain;
        ctx.beginPath();
        ctx.ellipse(offsetX, offsetY, 13, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Hat brim shadow
        ctx.fillStyle = this.colors.hatShadow;
        ctx.beginPath();
        ctx.ellipse(offsetX, offsetY, 13, 4, 0, 0, Math.PI);
        ctx.fill();

        // Stars and moon decorations
        ctx.fillStyle = this.colors.hatStar;
        // Star
        this.drawStar(ctx, offsetX - 3, offsetY - 12, 2, 5, 0.5);
        // Moon
        ctx.beginPath();
        ctx.arc(offsetX + 4, offsetY - 8, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = this.colors.hatMain;
        ctx.beginPath();
        ctx.arc(offsetX + 5, offsetY - 8, 2, 0, Math.PI * 2);
        ctx.fill();

        // Small stars
        ctx.fillStyle = this.colors.hatStar;
        this.drawStar(ctx, offsetX + 2, offsetY - 15, 1, 4, 0.3);
        this.drawStar(ctx, offsetX - 5, offsetY - 6, 1, 4, 0.3);
    }

    /**
     * Draw star shape
     */
    drawStar(ctx, x, y, radius, points, inset) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.moveTo(0, -radius);
        for (let i = 0; i < points * 2; i++) {
            const r = i % 2 === 0 ? radius : radius * inset;
            const a = (Math.PI / points) * i;
            ctx.lineTo(Math.sin(a) * r, -Math.cos(a) * r);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    /**
     * Draw beard
     */
    drawBeard(ctx, offsetX, offsetY) {
        // Main beard
        ctx.fillStyle = this.colors.beardMain;
        ctx.beginPath();
        ctx.moveTo(offsetX - 6, offsetY);
        ctx.quadraticCurveTo(offsetX - 8, offsetY + 5, offsetX - 5, offsetY + 10);
        ctx.quadraticCurveTo(offsetX, offsetY + 12, offsetX, offsetY + 13);
        ctx.quadraticCurveTo(offsetX, offsetY + 12, offsetX + 5, offsetY + 10);
        ctx.quadraticCurveTo(offsetX + 8, offsetY + 5, offsetX + 6, offsetY);
        ctx.closePath();
        ctx.fill();

        // Beard texture (waves)
        ctx.strokeStyle = this.colors.beardShadow;
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(offsetX - 5, offsetY + 2 + i * 3);
            ctx.quadraticCurveTo(offsetX - 3, offsetY + 4 + i * 3, offsetX, offsetY + 3 + i * 3);
            ctx.quadraticCurveTo(offsetX + 3, offsetY + 4 + i * 3, offsetX + 5, offsetY + 2 + i * 3);
            ctx.stroke();
        }
    }

    /**
     * Draw magical staff
     */
    drawStaff(ctx, offsetX, offsetY, angle) {
        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.rotate(angle * Math.PI / 180);

        // Staff shaft
        const gradient = ctx.createLinearGradient(-3, 0, 3, 0);
        gradient.addColorStop(0, this.colors.staffWoodDark);
        gradient.addColorStop(0.5, this.colors.staffWood);
        gradient.addColorStop(1, this.colors.staffWoodDark);

        ctx.fillStyle = gradient;
        ctx.fillRect(-2, 0, 4, 35);

        // Wood texture
        ctx.strokeStyle = this.colors.staffWoodDark;
        ctx.lineWidth = 0.5;
        for (let i = 5; i < 35; i += 5) {
            ctx.beginPath();
            ctx.moveTo(-2, i);
            ctx.lineTo(2, i);
            ctx.stroke();
        }

        // Orb at top
        const orbGradient = ctx.createRadialGradient(0, -5, 0, 0, -5, 6);
        orbGradient.addColorStop(0, this.colors.staffOrbGlow);
        orbGradient.addColorStop(0.7, this.colors.staffOrb);
        orbGradient.addColorStop(1, this.colors.magicPrimary);

        ctx.fillStyle = orbGradient;
        ctx.beginPath();
        ctx.arc(0, -5, 6, 0, Math.PI * 2);
        ctx.fill();

        // Orb shine
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(-2, -7, 2, 0, Math.PI * 2);
        ctx.fill();

        // Decorative wrapping
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 8);
        ctx.lineTo(0, 12);
        ctx.stroke();

        ctx.restore();
    }

    /**
     * Draw staff glow effect
     */
    drawStaffGlow(ctx, x, y, intensity) {
        ctx.save();
        ctx.globalAlpha = intensity;

        // Outer glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
        gradient.addColorStop(0, this.colors.magicGlow);
        gradient.addColorStop(0.5, this.colors.magicPrimary);
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    /**
     * Draw magic particles for casting
     */
    drawMagicParticles(ctx, centerX, centerY, phase) {
        ctx.save();

        const particleCount = 8;
        const radius = 10 + phase * 5;

        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2 + phase * 0.5;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            // Particle trail
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 4);
            gradient.addColorStop(0, this.colors.magicGlow);
            gradient.addColorStop(0.5, this.colors.magicPrimary);
            gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();

            // Sparkle
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    /**
     * Draw death dissipation particles
     */
    drawDeathParticles(ctx, centerX, centerY, phase) {
        ctx.save();

        const particleCount = 12;

        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const distance = phase * 2;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance - phase;

            const alpha = 1 - (phase / 20);
            ctx.globalAlpha = alpha;

            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 3);
            gradient.addColorStop(0, this.colors.magicGlow);
            gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    /**
     * Get animation frame count for state
     */
    getFrameCount(state) {
        switch(state) {
            case 'idle': return 60;
            case 'walk': return 8;
            case 'attack': return 12;
            case 'hurt': return 6;
            case 'death': return 20;
            default: return 1;
        }
    }
}

// Particle system for environmental effects
class MagicParticleSystem {
    constructor() {
        this.particles = [];
    }

    addParticle(x, y, type = 'sparkle') {
        this.particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2 - 1,
            life: 1.0,
            decay: 0.02,
            size: Math.random() * 3 + 1,
            type,
            color: type === 'sparkle' ? '#8B5CF6' : '#3B82F6',
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.2
        });
    }

    update() {
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // Gravity
            p.life -= p.decay;
            p.angle += p.spin;
            return p.life > 0;
        });
    }

    draw(ctx) {
        this.particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);

            if (p.type === 'sparkle') {
                // Draw sparkle
                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
                gradient.addColorStop(0, '#FFFFFF');
                gradient.addColorStop(0.3, p.color);
                gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Draw magic wisp
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.moveTo(0, -p.size);
                ctx.lineTo(p.size * 0.3, 0);
                ctx.lineTo(0, p.size);
                ctx.lineTo(-p.size * 0.3, 0);
                ctx.closePath();
                ctx.fill();
            }

            ctx.restore();
        });
    }

    emit(x, y, count, type = 'sparkle') {
        for (let i = 0; i < count; i++) {
            this.addParticle(x, y, type);
        }
    }
}

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WizardSprite, MagicParticleSystem };
}
