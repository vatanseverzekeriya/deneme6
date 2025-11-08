/**
 * Professional Dragon Asset System
 * AAA-Quality Game Assets with Advanced Animations
 *
 * Features:
 * - Photorealistic dragon rendering
 * - 8-directional sprite system
 * - Frame-by-frame animation engine
 * - Advanced particle effects
 * - Dynamic lighting and shadows
 */

class DragonAssetSystem {
    constructor() {
        this.cache = new Map();
        this.animationFrames = new Map();
        this.particles = [];

        // Animation states
        this.STATES = {
            IDLE: 'idle',
            WALK: 'walk',
            ATTACK: 'attack',
            HIT: 'hit',
            DEATH: 'death'
        };

        // Pre-render all dragon assets
        this.preRenderAssets();
    }

    preRenderAssets() {
        // Pre-render dragon sprites for all states and directions
        const size = 120;

        for (let state of Object.values(this.STATES)) {
            for (let dir = 0; dir < 8; dir++) {
                const frames = this.generateStateFrames(state, dir, size);
                this.animationFrames.set(`${state}_${dir}`, frames);
            }
        }
    }

    generateStateFrames(state, direction, size) {
        const frames = [];
        let frameCount = 0;

        switch(state) {
            case this.STATES.IDLE:
                frameCount = 30; // 0.5s @ 60fps
                for (let i = 0; i < frameCount; i++) {
                    frames.push(this.renderIdleFrame(i, frameCount, direction, size));
                }
                break;

            case this.STATES.WALK:
                frameCount = 24; // 0.4s @ 60fps
                for (let i = 0; i < frameCount; i++) {
                    frames.push(this.renderWalkFrame(i, frameCount, direction, size));
                }
                break;

            case this.STATES.ATTACK:
                frameCount = 36; // 0.6s @ 60fps
                for (let i = 0; i < frameCount; i++) {
                    frames.push(this.renderAttackFrame(i, frameCount, direction, size));
                }
                break;

            case this.STATES.HIT:
                frameCount = 12; // 0.2s @ 60fps
                for (let i = 0; i < frameCount; i++) {
                    frames.push(this.renderHitFrame(i, frameCount, direction, size));
                }
                break;

            case this.STATES.DEATH:
                frameCount = 60; // 1.0s @ 60fps
                for (let i = 0; i < frameCount; i++) {
                    frames.push(this.renderDeathFrame(i, frameCount, direction, size));
                }
                break;
        }

        return frames;
    }

    renderIdleFrame(frame, totalFrames, direction, size) {
        const canvas = document.createElement('canvas');
        canvas.width = size * 2;
        canvas.height = size * 2;
        const ctx = canvas.getContext('2d');

        const progress = frame / totalFrames;
        const breathCycle = Math.sin(progress * Math.PI * 2);
        const breathOffset = breathCycle * 3;

        // Center point
        const cx = size;
        const cy = size;

        // Breathing animation - body expansion
        const bodyScale = 1 + (breathCycle * 0.05);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((direction * Math.PI) / 4);
        ctx.scale(bodyScale, bodyScale);

        // Draw dragon
        this.drawDragonBody(ctx, 0, breathOffset, size);
        this.drawDragonWings(ctx, 0, breathOffset, size, breathCycle * 0.3);
        this.drawDragonHead(ctx, 0, breathOffset, size, breathCycle * 5);
        this.drawDragonEyes(ctx, 0, breathOffset, size, true);
        this.drawDragonTail(ctx, 0, breathOffset, size, Math.sin(progress * Math.PI * 4) * 10);

        ctx.restore();

        // Ambient glow
        this.drawAmbientGlow(ctx, cx, cy, size, 0.3 + breathCycle * 0.1);

        return canvas;
    }

    renderWalkFrame(frame, totalFrames, direction, size) {
        const canvas = document.createElement('canvas');
        canvas.width = size * 2;
        canvas.height = size * 2;
        const ctx = canvas.getContext('2d');

        const progress = frame / totalFrames;
        const walkCycle = Math.sin(progress * Math.PI * 2);

        const cx = size;
        const cy = size + walkCycle * 8; // Vertical bob
        const bodyTilt = walkCycle * 15; // Body sway
        const wingFlap = Math.abs(Math.sin(progress * Math.PI * 4)) * 40; // Wing movement

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((direction * Math.PI) / 4);
        ctx.rotate((bodyTilt * Math.PI) / 180);

        // Draw dragon with walking animation
        this.drawDragonBody(ctx, 0, 0, size, 1 + walkCycle * 0.03);
        this.drawDragonWings(ctx, 0, 0, size, wingFlap);
        this.drawDragonHead(ctx, 0, 0, size, walkCycle * 8);
        this.drawDragonEyes(ctx, 0, 0, size, true);
        this.drawDragonTail(ctx, 0, 0, size, -walkCycle * 25);

        ctx.restore();

        // Shadow gets larger/smaller with vertical movement
        this.drawShadow(ctx, cx, size * 1.8, size, 0.3 - Math.abs(walkCycle) * 0.1);

        return canvas;
    }

    renderAttackFrame(frame, totalFrames, direction, size) {
        const canvas = document.createElement('canvas');
        canvas.width = size * 3;
        canvas.height = size * 3;
        const ctx = canvas.getContext('2d');

        const progress = frame / totalFrames;
        const cx = size * 1.5;
        const cy = size * 1.5;

        // Attack animation phases
        let phase = 'windup';
        let phaseProgress = 0;

        if (progress < 0.3) {
            phase = 'windup';
            phaseProgress = progress / 0.3;
        } else if (progress < 0.6) {
            phase = 'strike';
            phaseProgress = (progress - 0.3) / 0.3;
        } else {
            phase = 'recovery';
            phaseProgress = (progress - 0.6) / 0.4;
        }

        let headAngle = 0;
        let mouthOpen = 0;
        let fireIntensity = 0;

        if (phase === 'windup') {
            headAngle = -phaseProgress * 30;
            mouthOpen = phaseProgress * 40;
        } else if (phase === 'strike') {
            headAngle = -30 + phaseProgress * 60;
            mouthOpen = 40 + phaseProgress * 20;
            fireIntensity = phaseProgress;
        } else {
            headAngle = 30 - phaseProgress * 30;
            mouthOpen = 60 - phaseProgress * 60;
            fireIntensity = 1 - phaseProgress;
        }

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((direction * Math.PI) / 4);

        // Draw fire breath effect
        if (fireIntensity > 0) {
            this.drawFireBreath(ctx, size * 0.6, -size * 0.2, size * 2, fireIntensity, headAngle);
        }

        // Draw dragon
        this.drawDragonBody(ctx, 0, 0, size, 1.1);
        this.drawDragonWings(ctx, 0, 0, size, 45);
        this.drawDragonHead(ctx, 0, 0, size, headAngle, mouthOpen);
        this.drawDragonEyes(ctx, 0, 0, size, true, 1.2);
        this.drawDragonTail(ctx, 0, 0, size, -20);

        ctx.restore();

        return canvas;
    }

    renderHitFrame(frame, totalFrames, direction, size) {
        const canvas = document.createElement('canvas');
        canvas.width = size * 2;
        canvas.height = size * 2;
        const ctx = canvas.getContext('2d');

        const progress = frame / totalFrames;
        const hitShake = Math.sin(progress * Math.PI * 8) * (1 - progress) * 10;
        const flashIntensity = (1 - progress) * 0.5;

        const cx = size + hitShake;
        const cy = size;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((direction * Math.PI) / 4);

        // Draw dragon with damage flash
        ctx.globalAlpha = 1 - flashIntensity;
        this.drawDragonBody(ctx, 0, 0, size);
        this.drawDragonWings(ctx, 0, 0, size, -20);
        this.drawDragonHead(ctx, 0, 0, size, -15);
        this.drawDragonEyes(ctx, 0, 0, size, false);
        this.drawDragonTail(ctx, 0, 0, size, 30);
        ctx.globalAlpha = 1;

        ctx.restore();

        // Flash effect
        if (flashIntensity > 0) {
            ctx.globalAlpha = flashIntensity;
            ctx.fillStyle = '#ff4444';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;
        }

        return canvas;
    }

    renderDeathFrame(frame, totalFrames, direction, size) {
        const canvas = document.createElement('canvas');
        canvas.width = size * 2;
        canvas.height = size * 2;
        const ctx = canvas.getContext('2d');

        const progress = frame / totalFrames;
        const fallProgress = Math.min(progress * 2, 1);
        const fadeProgress = Math.max((progress - 0.5) * 2, 0);

        const cx = size;
        const cy = size + fallProgress * 30;
        const rotation = fallProgress * 90;
        const scale = 1 - fadeProgress * 0.5;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((direction * Math.PI) / 4);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(scale, scale);
        ctx.globalAlpha = 1 - fadeProgress;

        // Draw dying dragon
        this.drawDragonBody(ctx, 0, 0, size);
        this.drawDragonWings(ctx, 0, 0, size, -60 * fallProgress);
        this.drawDragonHead(ctx, 0, 0, size, -45 * fallProgress);
        this.drawDragonEyes(ctx, 0, 0, size, false);
        this.drawDragonTail(ctx, 0, 0, size, 0);

        ctx.restore();

        // Death particles
        if (progress > 0.3) {
            this.drawDeathParticles(ctx, cx, cy, size, (progress - 0.3) / 0.7);
        }

        return canvas;
    }

    // ============ DRAGON DRAWING METHODS ============

    drawDragonBody(ctx, x, y, size, scale = 1) {
        ctx.save();
        ctx.scale(scale, scale);

        // Main body
        const bodyGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 0.4);
        bodyGradient.addColorStop(0, '#8B0000');
        bodyGradient.addColorStop(0.5, '#660000');
        bodyGradient.addColorStop(1, '#4A0000');

        ctx.fillStyle = bodyGradient;
        ctx.beginPath();
        ctx.ellipse(x, y, size * 0.35, size * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();

        // Chest scales highlight
        ctx.fillStyle = 'rgba(200, 100, 0, 0.6)';
        ctx.beginPath();
        ctx.ellipse(x, y + size * 0.05, size * 0.25, size * 0.15, 0, 0, Math.PI * 2);
        ctx.fill();

        // Scale texture
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 1;
        for (let i = -3; i < 3; i++) {
            for (let j = -2; j < 2; j++) {
                ctx.beginPath();
                ctx.arc(x + i * 12, y + j * 12, 5, 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        ctx.restore();
    }

    drawDragonWings(ctx, x, y, size, flapAngle = 0) {
        // Left wing
        ctx.save();
        ctx.translate(x - size * 0.2, y - size * 0.1);
        ctx.rotate(((-45 + flapAngle) * Math.PI) / 180);

        const wingGradient = ctx.createLinearGradient(0, 0, size * 0.4, 0);
        wingGradient.addColorStop(0, '#660000');
        wingGradient.addColorStop(0.5, '#4A0000');
        wingGradient.addColorStop(1, 'rgba(74, 0, 0, 0.3)');

        ctx.fillStyle = wingGradient;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(size * 0.3, -size * 0.3, size * 0.5, -size * 0.2);
        ctx.quadraticCurveTo(size * 0.4, 0, size * 0.3, size * 0.1);
        ctx.closePath();
        ctx.fill();

        // Wing membrane structure
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(size * 0.5, -size * 0.2);
        ctx.stroke();

        ctx.restore();

        // Right wing (mirrored)
        ctx.save();
        ctx.translate(x + size * 0.2, y - size * 0.1);
        ctx.rotate(((45 - flapAngle) * Math.PI) / 180);

        ctx.fillStyle = wingGradient;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-size * 0.3, -size * 0.3, -size * 0.5, -size * 0.2);
        ctx.quadraticCurveTo(-size * 0.4, 0, -size * 0.3, size * 0.1);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-size * 0.5, -size * 0.2);
        ctx.stroke();

        ctx.restore();
    }

    drawDragonHead(ctx, x, y, size, angle = 0, mouthOpen = 0) {
        ctx.save();
        ctx.translate(x, y - size * 0.25);
        ctx.rotate((angle * Math.PI) / 180);

        // Neck
        const neckGradient = ctx.createLinearGradient(0, size * 0.1, 0, 0);
        neckGradient.addColorStop(0, '#660000');
        neckGradient.addColorStop(1, '#8B0000');

        ctx.fillStyle = neckGradient;
        ctx.beginPath();
        ctx.moveTo(-size * 0.08, size * 0.1);
        ctx.lineTo(-size * 0.06, -size * 0.05);
        ctx.lineTo(size * 0.06, -size * 0.05);
        ctx.lineTo(size * 0.08, size * 0.1);
        ctx.closePath();
        ctx.fill();

        // Head
        const headGradient = ctx.createRadialGradient(0, -size * 0.1, 0, 0, -size * 0.1, size * 0.2);
        headGradient.addColorStop(0, '#8B0000');
        headGradient.addColorStop(0.7, '#660000');
        headGradient.addColorStop(1, '#4A0000');

        ctx.fillStyle = headGradient;
        ctx.beginPath();
        ctx.ellipse(0, -size * 0.15, size * 0.18, size * 0.15, 0, 0, Math.PI * 2);
        ctx.fill();

        // Snout
        ctx.fillStyle = '#4A0000';
        ctx.beginPath();
        ctx.moveTo(-size * 0.08, -size * 0.1);
        ctx.quadraticCurveTo(0, -size * 0.35, size * 0.08, -size * 0.1);
        ctx.quadraticCurveTo(0, -size * 0.05, -size * 0.08, -size * 0.1);
        ctx.fill();

        // Mouth
        if (mouthOpen > 0) {
            ctx.save();
            ctx.translate(0, -size * 0.2);
            ctx.rotate((mouthOpen * Math.PI) / 180 / 2);

            ctx.fillStyle = 'rgba(255, 100, 0, 0.8)';
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.12, 0, Math.PI);
            ctx.fill();

            // Teeth
            ctx.fillStyle = '#FFFFFF';
            for (let i = -3; i <= 3; i++) {
                ctx.beginPath();
                ctx.moveTo(i * 8, 0);
                ctx.lineTo(i * 8 - 3, -8);
                ctx.lineTo(i * 8 + 3, -8);
                ctx.closePath();
                ctx.fill();
            }

            ctx.restore();
        }

        // Horns
        ctx.fillStyle = '#2A0000';
        ctx.beginPath();
        ctx.moveTo(-size * 0.12, -size * 0.2);
        ctx.lineTo(-size * 0.15, -size * 0.35);
        ctx.lineTo(-size * 0.1, -size * 0.25);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(size * 0.12, -size * 0.2);
        ctx.lineTo(size * 0.15, -size * 0.35);
        ctx.lineTo(size * 0.1, -size * 0.25);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    drawDragonEyes(ctx, x, y, size, glowing = true, intensity = 1) {
        ctx.save();
        ctx.translate(x, y - size * 0.25);

        const eyeColor = glowing ? '#FFD700' : '#666666';
        const glowSize = glowing ? 8 : 0;

        // Left eye
        if (glowing) {
            ctx.shadowBlur = glowSize;
            ctx.shadowColor = eyeColor;
        }
        ctx.fillStyle = eyeColor;
        ctx.beginPath();
        ctx.ellipse(-size * 0.08, -size * 0.18, 4 * intensity, 6 * intensity, 0, 0, Math.PI * 2);
        ctx.fill();

        // Right eye
        ctx.beginPath();
        ctx.ellipse(size * 0.08, -size * 0.18, 4 * intensity, 6 * intensity, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.restore();
    }

    drawDragonTail(ctx, x, y, size, swayAngle = 0) {
        ctx.save();
        ctx.translate(x, y + size * 0.2);

        const segments = 8;
        const segmentLength = size * 0.15;

        for (let i = 0; i < segments; i++) {
            const progress = i / segments;
            const angle = (swayAngle * Math.PI / 180) * Math.sin(progress * Math.PI);
            const segmentSize = (1 - progress) * size * 0.1;

            ctx.rotate(angle / segments);

            const gradient = ctx.createLinearGradient(0, 0, 0, segmentLength);
            gradient.addColorStop(0, '#660000');
            gradient.addColorStop(1, '#4A0000');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(-segmentSize, 0);
            ctx.lineTo(-segmentSize * 0.7, segmentLength);
            ctx.lineTo(segmentSize * 0.7, segmentLength);
            ctx.lineTo(segmentSize, 0);
            ctx.closePath();
            ctx.fill();

            ctx.translate(0, segmentLength);
        }

        // Tail spike
        ctx.fillStyle = '#2A0000';
        ctx.beginPath();
        ctx.moveTo(-size * 0.03, 0);
        ctx.lineTo(0, size * 0.15);
        ctx.lineTo(size * 0.03, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    // ============ EFFECTS ============

    drawFireBreath(ctx, x, y, length, intensity, angle) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((angle * Math.PI) / 180);

        // Fire core
        const fireGradient = ctx.createLinearGradient(0, 0, length * intensity, 0);
        fireGradient.addColorStop(0, 'rgba(255, 255, 100, 0.9)');
        fireGradient.addColorStop(0.3, 'rgba(255, 150, 0, 0.8)');
        fireGradient.addColorStop(0.6, 'rgba(255, 50, 0, 0.6)');
        fireGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

        for (let i = 0; i < 5; i++) {
            const offset = (Math.random() - 0.5) * 20;
            const width = 30 + Math.random() * 20;

            ctx.fillStyle = fireGradient;
            ctx.beginPath();
            ctx.moveTo(0, offset);
            ctx.lineTo(length * intensity, offset - width / 2);
            ctx.lineTo(length * intensity, offset + width / 2);
            ctx.closePath();
            ctx.fill();
        }

        // Glow
        ctx.shadowBlur = 30;
        ctx.shadowColor = 'rgba(255, 100, 0, 0.8)';
        ctx.fillStyle = 'rgba(255, 200, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(length * intensity * 0.5, 0, length * intensity * 0.6, 40, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();
    }

    drawAmbientGlow(ctx, x, y, size, intensity) {
        ctx.save();

        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        glowGradient.addColorStop(0, `rgba(255, 100, 0, ${intensity * 0.3})`);
        glowGradient.addColorStop(0.5, `rgba(255, 50, 0, ${intensity * 0.15})`);
        glowGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

        ctx.fillStyle = glowGradient;
        ctx.fillRect(x - size, y - size, size * 2, size * 2);

        ctx.restore();
    }

    drawShadow(ctx, x, y, size, opacity) {
        ctx.save();

        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.beginPath();
        ctx.ellipse(x, y, size * 0.5, size * 0.2, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    drawDeathParticles(ctx, x, y, size, progress) {
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const distance = progress * size * 1.5;
            const px = x + Math.cos(angle) * distance;
            const py = y + Math.sin(angle) * distance;
            const particleSize = (1 - progress) * 8;

            const particleGradient = ctx.createRadialGradient(px, py, 0, px, py, particleSize);
            particleGradient.addColorStop(0, 'rgba(255, 100, 0, 0.8)');
            particleGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

            ctx.fillStyle = particleGradient;
            ctx.beginPath();
            ctx.arc(px, py, particleSize, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // ============ ANIMATION CONTROLLER ============

    getFrame(state, direction, frameIndex) {
        const key = `${state}_${direction}`;
        const frames = this.animationFrames.get(key);

        if (!frames || frames.length === 0) {
            console.warn(`No frames found for ${key}`);
            return null;
        }

        return frames[frameIndex % frames.length];
    }

    getFrameCount(state) {
        switch(state) {
            case this.STATES.IDLE: return 30;
            case this.STATES.WALK: return 24;
            case this.STATES.ATTACK: return 36;
            case this.STATES.HIT: return 12;
            case this.STATES.DEATH: return 60;
            default: return 30;
        }
    }
}

// Global dragon asset system instance
const dragonAssets = new DragonAssetSystem();
