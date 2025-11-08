// Professional RPG Character Sprite System
// High-quality assets for Ninja character with advanced animations

class CharacterSprite {
    constructor(type = 'ninja') {
        this.type = type;
        this.frame = 0;
        this.animationSpeed = 0.15;
        this.currentAnimation = 'idle';
        this.direction = 1; // 1 = right, -1 = left

        // Animation states
        this.animations = {
            idle: { frames: 6, speed: 0.1 },
            walk: { frames: 8, speed: 0.2 },
            attack: { frames: 6, speed: 0.3 },
            skill: { frames: 8, speed: 0.25 },
            hit: { frames: 3, speed: 0.3 },
            death: { frames: 8, speed: 0.15 }
        };

        // Particle effects
        this.particles = [];

        // Color schemes for different classes
        this.colorSchemes = {
            ninja: {
                primary: '#1a1a2e',      // Dark blue-black
                secondary: '#c41e3a',    // Blood red
                accent: '#8b0000',       // Dark red
                skin: '#d4a574',         // Skin tone
                cloth: '#2d2d44',        // Dark cloth
                metal: '#c0c0c0',        // Silver
                energy: '#ff0040'        // Red energy
            },
            warrior: {
                primary: '#4a4a4a',
                secondary: '#ffd700',
                accent: '#b8860b',
                skin: '#d4a574',
                cloth: '#8b4513',
                metal: '#c0c0c0',
                energy: '#ffa500'
            },
            shaman: {
                primary: '#2e1a47',
                secondary: '#9370db',
                accent: '#4b0082',
                skin: '#d4a574',
                cloth: '#483d8b',
                metal: '#9370db',
                energy: '#9370db'
            },
            sura: {
                primary: '#1a1a1a',
                secondary: '#8b00ff',
                accent: '#4b0082',
                skin: '#d4a574',
                cloth: '#2d1b3d',
                metal: '#666666',
                energy: '#8b00ff'
            }
        };

        this.colors = this.colorSchemes[type] || this.colorSchemes.ninja;
    }

    setAnimation(animation) {
        if (this.currentAnimation !== animation) {
            this.currentAnimation = animation;
            this.frame = 0;
        }
    }

    update() {
        const anim = this.animations[this.currentAnimation];
        this.frame += anim.speed;

        if (this.frame >= anim.frames) {
            if (this.currentAnimation === 'attack' || this.currentAnimation === 'skill' || this.currentAnimation === 'hit') {
                this.setAnimation('idle');
            } else if (this.currentAnimation === 'death') {
                this.frame = anim.frames - 1;
            } else {
                this.frame = 0;
            }
        }

        // Update particles
        this.particles = this.particles.filter(p => {
            p.life--;
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            return p.life > 0;
        });
    }

    addParticle(x, y, color, count = 1) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 10,
                y: y + (Math.random() - 0.5) * 10,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4 - 2,
                life: 20 + Math.random() * 20,
                color: color,
                size: 2 + Math.random() * 3
            });
        }
    }

    // Draw detailed ninja character
    drawNinja(ctx, x, y, scale = 1) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(this.direction * scale, scale);

        const frame = Math.floor(this.frame);

        // Draw based on animation state
        switch(this.currentAnimation) {
            case 'idle':
                this.drawIdleNinja(ctx, frame);
                break;
            case 'walk':
                this.drawWalkNinja(ctx, frame);
                break;
            case 'attack':
                this.drawAttackNinja(ctx, frame);
                break;
            case 'skill':
                this.drawSkillNinja(ctx, frame);
                break;
            case 'hit':
                this.drawHitNinja(ctx, frame);
                break;
            case 'death':
                this.drawDeathNinja(ctx, frame);
                break;
        }

        ctx.restore();

        // Draw particles (not affected by scale/direction)
        this.particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.life / 40;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(x + p.x, y + p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }

    // Idle animation - breathing and slight movement
    drawIdleNinja(ctx, frame) {
        const breathe = Math.sin(frame * 0.5) * 2;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 25, 15, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs
        this.drawLegs(ctx, 0, breathe);

        // Body
        this.drawBody(ctx, breathe);

        // Arms - slight movement
        const armWave = Math.sin(frame * 0.3) * 3;
        this.drawArms(ctx, breathe, armWave);

        // Head with mask
        this.drawHead(ctx, breathe);

        // Weapon (katana on back)
        this.drawSheatedKatana(ctx, breathe);

        // Cape flowing
        this.drawCape(ctx, frame, breathe);

        // Energy aura for idle
        if (frame % 2 === 0) {
            this.addParticle(0, 0, this.colors.energy, 0.3);
        }
    }

    // Walk animation
    drawWalkNinja(ctx, frame) {
        const walkCycle = Math.sin(frame * 0.8) * 5;
        const walkBounce = Math.abs(Math.sin(frame * 0.8)) * 3;

        // Shadow moves with walk
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 25, 15, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Walking legs
        this.drawWalkingLegs(ctx, frame);

        // Body bobbing
        this.drawBody(ctx, -walkBounce);

        // Arms swinging
        this.drawWalkingArms(ctx, frame, -walkBounce);

        // Head
        this.drawHead(ctx, -walkBounce);

        // Weapon
        this.drawSheatedKatana(ctx, -walkBounce);

        // Cape flowing with movement
        this.drawCape(ctx, frame * 1.5, -walkBounce);

        // Dust particles
        if (frame % 2 === 0) {
            this.addParticle(0, 20, 'rgba(100, 100, 100, 0.5)', 1);
        }
    }

    // Attack animation
    drawAttackNinja(ctx, frame) {
        const attackProgress = frame / this.animations.attack.frames;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 25, 15, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs in stance
        this.drawAttackLegs(ctx, attackProgress);

        // Body leaning forward
        const lean = attackProgress < 0.5 ? -attackProgress * 10 : -(1 - attackProgress) * 10;
        this.drawBody(ctx, lean);

        // Arms with katana
        this.drawAttackArms(ctx, attackProgress, lean);

        // Head
        this.drawHead(ctx, lean);

        // Katana slash effect
        this.drawKatanaSlash(ctx, attackProgress);

        // Cape dramatic movement
        this.drawCape(ctx, frame * 2, lean);

        // Attack particles
        if (attackProgress > 0.3 && attackProgress < 0.7) {
            this.addParticle(20, -10, this.colors.secondary, 2);
            this.addParticle(25, -5, '#ffffff', 1);
        }
    }

    // Skill animation (special ability)
    drawSkillNinja(ctx, frame) {
        const progress = frame / this.animations.skill.frames;
        const chargeUp = progress < 0.5;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 25, 15, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs
        this.drawLegs(ctx, 0, 0);

        // Body
        this.drawBody(ctx, 0);

        // Arms channeling energy
        this.drawChannelingArms(ctx, progress);

        // Head
        this.drawHead(ctx, 0);

        // Energy sphere
        if (chargeUp) {
            const size = progress * 40;
            ctx.save();
            ctx.globalAlpha = 0.7;

            // Outer glow
            const gradient = ctx.createRadialGradient(15, -5, 0, 15, -5, size);
            gradient.addColorStop(0, this.colors.energy);
            gradient.addColorStop(0.5, this.colors.secondary);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(15, -5, size, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        // Cape
        this.drawCape(ctx, frame, 0);

        // Intense particles
        this.addParticle(15, -5, this.colors.energy, 3);
        this.addParticle(0, 0, this.colors.secondary, 2);
    }

    // Hit animation
    drawHitNinja(ctx, frame) {
        const shake = (Math.random() - 0.5) * 4;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(shake, 25, 15, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Flash effect
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#ff0000';

        this.drawLegs(ctx, shake, 0);
        this.drawBody(ctx, shake);
        this.drawArms(ctx, shake, 0);
        this.drawHead(ctx, shake);
        this.drawSheatedKatana(ctx, shake);

        ctx.restore();

        // Impact particles
        this.addParticle(0, 0, '#ff0000', 5);
        this.addParticle(0, 0, '#ffff00', 3);
    }

    // Death animation
    drawDeathNinja(ctx, frame) {
        const progress = frame / this.animations.death.frames;
        const fallRotation = progress * Math.PI / 2;
        const fadeAlpha = 1 - progress * 0.7;

        ctx.save();
        ctx.globalAlpha = fadeAlpha;
        ctx.rotate(fallRotation);
        ctx.translate(0, progress * 20);

        // Shadow fading
        ctx.fillStyle = `rgba(0, 0, 0, ${0.3 * (1 - progress)})`;
        ctx.beginPath();
        ctx.ellipse(0, 25, 15, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        this.drawLegs(ctx, 0, 0);
        this.drawBody(ctx, 0);
        this.drawArms(ctx, 0, -20);
        this.drawHead(ctx, 0);
        this.drawSheatedKatana(ctx, 0);
        this.drawCape(ctx, frame, 0);

        ctx.restore();

        // Death particles
        if (frame < this.animations.death.frames - 1) {
            this.addParticle(0, 0, this.colors.primary, 2);
            this.addParticle(0, 10, this.colors.secondary, 1);
        }
    }

    // Component drawing methods
    drawLegs(ctx, offsetX = 0, offsetY = 0) {
        ctx.save();
        ctx.translate(offsetX, offsetY);

        // Left leg
        ctx.fillStyle = this.colors.cloth;
        ctx.beginPath();
        ctx.moveTo(-5, 5);
        ctx.lineTo(-6, 20);
        ctx.lineTo(-4, 20);
        ctx.lineTo(-3, 5);
        ctx.fill();

        // Right leg
        ctx.beginPath();
        ctx.moveTo(3, 5);
        ctx.lineTo(4, 20);
        ctx.lineTo(6, 20);
        ctx.lineTo(5, 5);
        ctx.fill();

        // Boots
        ctx.fillStyle = this.colors.primary;
        ctx.fillRect(-7, 19, 3, 4);
        ctx.fillRect(4, 19, 3, 4);

        ctx.restore();
    }

    drawWalkingLegs(ctx, frame) {
        const legSwing = Math.sin(frame * 0.8) * 15;

        ctx.save();

        // Left leg
        ctx.fillStyle = this.colors.cloth;
        ctx.save();
        ctx.translate(-3, 5);
        ctx.rotate(-legSwing * Math.PI / 180);
        ctx.fillRect(-2, 0, 4, 15);
        ctx.fillStyle = this.colors.primary;
        ctx.fillRect(-3, 14, 6, 4);
        ctx.restore();

        // Right leg
        ctx.fillStyle = this.colors.cloth;
        ctx.save();
        ctx.translate(3, 5);
        ctx.rotate(legSwing * Math.PI / 180);
        ctx.fillRect(-2, 0, 4, 15);
        ctx.fillStyle = this.colors.primary;
        ctx.fillRect(-3, 14, 6, 4);
        ctx.restore();

        ctx.restore();
    }

    drawAttackLegs(ctx, progress) {
        // Wide stance
        ctx.fillStyle = this.colors.cloth;

        // Left leg forward
        ctx.save();
        ctx.translate(-8, 5);
        ctx.rotate(-0.3);
        ctx.fillRect(-2, 0, 4, 15);
        ctx.fillStyle = this.colors.primary;
        ctx.fillRect(-3, 14, 6, 4);
        ctx.restore();

        // Right leg back
        ctx.fillStyle = this.colors.cloth;
        ctx.save();
        ctx.translate(8, 5);
        ctx.rotate(0.2);
        ctx.fillRect(-2, 0, 4, 15);
        ctx.fillStyle = this.colors.primary;
        ctx.fillRect(-3, 14, 6, 4);
        ctx.restore();
    }

    drawBody(ctx, offsetY = 0) {
        ctx.save();
        ctx.translate(0, offsetY);

        // Torso
        ctx.fillStyle = this.colors.primary;
        ctx.beginPath();
        ctx.moveTo(-8, -10);
        ctx.lineTo(-8, 5);
        ctx.lineTo(8, 5);
        ctx.lineTo(8, -10);
        ctx.closePath();
        ctx.fill();

        // Chest armor plates
        ctx.strokeStyle = this.colors.secondary;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-6, -5);
        ctx.lineTo(6, -5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-6, 0);
        ctx.lineTo(6, 0);
        ctx.stroke();

        // Belt
        ctx.fillStyle = this.colors.accent;
        ctx.fillRect(-8, 3, 16, 3);

        // Belt buckle
        ctx.fillStyle = this.colors.metal;
        ctx.fillRect(-2, 3, 4, 3);

        ctx.restore();
    }

    drawArms(ctx, offsetY = 0, armAngle = 0) {
        ctx.save();
        ctx.translate(0, offsetY);

        // Left arm
        ctx.fillStyle = this.colors.cloth;
        ctx.save();
        ctx.translate(-8, -5);
        ctx.rotate((-20 + armAngle) * Math.PI / 180);
        ctx.fillRect(-2, 0, 3, 12);
        // Hand
        ctx.fillStyle = this.colors.skin;
        ctx.beginPath();
        ctx.arc(-0.5, 12, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Right arm
        ctx.fillStyle = this.colors.cloth;
        ctx.save();
        ctx.translate(8, -5);
        ctx.rotate((20 - armAngle) * Math.PI / 180);
        ctx.fillRect(-1, 0, 3, 12);
        // Hand
        ctx.fillStyle = this.colors.skin;
        ctx.beginPath();
        ctx.arc(0.5, 12, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.restore();
    }

    drawWalkingArms(ctx, frame, offsetY) {
        const armSwing = Math.sin(frame * 0.8) * 20;

        ctx.save();
        ctx.translate(0, offsetY);

        // Left arm swings opposite to right leg
        ctx.fillStyle = this.colors.cloth;
        ctx.save();
        ctx.translate(-8, -5);
        ctx.rotate(armSwing * Math.PI / 180);
        ctx.fillRect(-2, 0, 3, 12);
        ctx.fillStyle = this.colors.skin;
        ctx.beginPath();
        ctx.arc(-0.5, 12, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Right arm
        ctx.fillStyle = this.colors.cloth;
        ctx.save();
        ctx.translate(8, -5);
        ctx.rotate(-armSwing * Math.PI / 180);
        ctx.fillRect(-1, 0, 3, 12);
        ctx.fillStyle = this.colors.skin;
        ctx.beginPath();
        ctx.arc(0.5, 12, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.restore();
    }

    drawAttackArms(ctx, progress, offsetY) {
        ctx.save();
        ctx.translate(0, offsetY);

        // Both arms swinging katana
        const swingAngle = progress < 0.5
            ? -90 - (progress * 2) * 100
            : -90 - (1 - (progress - 0.5) * 2) * 100;

        // Right arm (main hand)
        ctx.fillStyle = this.colors.cloth;
        ctx.save();
        ctx.translate(6, -8);
        ctx.rotate(swingAngle * Math.PI / 180);
        ctx.fillRect(-2, 0, 3, 14);
        ctx.fillStyle = this.colors.skin;
        ctx.beginPath();
        ctx.arc(-0.5, 14, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Left arm (support hand)
        ctx.fillStyle = this.colors.cloth;
        ctx.save();
        ctx.translate(-6, -8);
        ctx.rotate((swingAngle + 20) * Math.PI / 180);
        ctx.fillRect(-1, 0, 3, 12);
        ctx.fillStyle = this.colors.skin;
        ctx.beginPath();
        ctx.arc(0.5, 12, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.restore();
    }

    drawChannelingArms(ctx, progress) {
        ctx.save();

        const raiseAmount = Math.min(progress * 2, 1);

        // Both arms raised, hands together
        ctx.fillStyle = this.colors.cloth;

        // Left arm
        ctx.save();
        ctx.translate(-8, -5 - raiseAmount * 10);
        ctx.rotate(-60 * Math.PI / 180);
        ctx.fillRect(-2, 0, 3, 12);
        ctx.restore();

        // Right arm
        ctx.save();
        ctx.translate(8, -5 - raiseAmount * 10);
        ctx.rotate(60 * Math.PI / 180);
        ctx.fillRect(-1, 0, 3, 12);
        ctx.restore();

        // Hands together
        ctx.fillStyle = this.colors.skin;
        ctx.beginPath();
        ctx.arc(0, -15 - raiseAmount * 10, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    drawHead(ctx, offsetY = 0) {
        ctx.save();
        ctx.translate(0, offsetY);

        // Neck
        ctx.fillStyle = this.colors.skin;
        ctx.fillRect(-2, -11, 4, 3);

        // Head
        ctx.beginPath();
        ctx.arc(0, -16, 5, 0, Math.PI * 2);
        ctx.fill();

        // Mask
        ctx.fillStyle = this.colors.primary;
        ctx.fillRect(-5, -18, 10, 6);

        // Eye slit
        ctx.strokeStyle = this.colors.secondary;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-4, -16);
        ctx.lineTo(4, -16);
        ctx.stroke();

        // Eyes glow
        ctx.fillStyle = this.colors.energy;
        ctx.beginPath();
        ctx.arc(-2, -16, 1, 0, Math.PI * 2);
        ctx.arc(2, -16, 1, 0, Math.PI * 2);
        ctx.fill();

        // Headband
        ctx.fillStyle = this.colors.secondary;
        ctx.fillRect(-6, -20, 12, 2);

        // Headband tail
        ctx.save();
        ctx.translate(5, -19);
        ctx.rotate(20 * Math.PI / 180);
        ctx.fillRect(0, 0, 2, 8);
        ctx.restore();

        ctx.restore();
    }

    drawSheatedKatana(ctx, offsetY = 0) {
        ctx.save();
        ctx.translate(0, offsetY);

        // Katana on back
        ctx.strokeStyle = this.colors.accent;
        ctx.lineWidth = 2;
        ctx.save();
        ctx.translate(-2, -5);
        ctx.rotate(-30 * Math.PI / 180);

        // Scabbard
        ctx.strokeStyle = this.colors.primary;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -20);
        ctx.stroke();

        // Handle
        ctx.fillStyle = this.colors.secondary;
        ctx.fillRect(-2, -22, 4, 5);

        // Guard
        ctx.fillStyle = this.colors.metal;
        ctx.fillRect(-3, -21, 6, 2);

        ctx.restore();
        ctx.restore();
    }

    drawKatanaSlash(ctx, progress) {
        if (progress < 0.3 || progress > 0.7) return;

        ctx.save();

        const slashProgress = (progress - 0.3) / 0.4;
        const angle = -90 + slashProgress * 180;

        // Katana blade
        ctx.save();
        ctx.translate(10, -10);
        ctx.rotate(angle * Math.PI / 180);

        // Blade glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.colors.energy;

        // Blade
        ctx.strokeStyle = this.colors.metal;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -25);
        ctx.stroke();

        // Blade edge highlight
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-1, 0);
        ctx.lineTo(-1, -25);
        ctx.stroke();

        ctx.restore();

        // Slash arc trail
        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = this.colors.secondary;
        ctx.lineWidth = 3;
        ctx.beginPath();
        const radius = 30;
        ctx.arc(10, -10, radius,
                (-90 - 45) * Math.PI / 180,
                angle * Math.PI / 180);
        ctx.stroke();

        ctx.restore();
    }

    drawCape(ctx, frame, offsetY = 0) {
        ctx.save();
        ctx.translate(0, offsetY);

        const wave1 = Math.sin(frame * 0.2) * 3;
        const wave2 = Math.sin(frame * 0.2 + 1) * 2;
        const wave3 = Math.sin(frame * 0.2 + 2) * 4;

        // Cape - flowing behind
        ctx.fillStyle = this.colors.secondary;
        ctx.globalAlpha = 0.8;

        ctx.beginPath();
        ctx.moveTo(-7, -8);  // Left shoulder
        ctx.lineTo(-7 - wave1, 15 + wave3);  // Left bottom
        ctx.lineTo(-2 - wave2, 18 + wave3);  // Center bottom
        ctx.lineTo(2 + wave2, 18 + wave3);   // Center bottom
        ctx.lineTo(7 + wave1, 15 + wave3);   // Right bottom
        ctx.lineTo(7, -8);   // Right shoulder
        ctx.lineTo(5, -10);  // Right neck
        ctx.lineTo(-5, -10); // Left neck
        ctx.closePath();
        ctx.fill();

        // Cape inner shadow
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = this.colors.primary;
        ctx.beginPath();
        ctx.moveTo(-5, -5);
        ctx.lineTo(-5 - wave1 * 0.5, 10 + wave3 * 0.5);
        ctx.lineTo(5 + wave1 * 0.5, 10 + wave3 * 0.5);
        ctx.lineTo(5, -5);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    draw(ctx, x, y, scale = 1) {
        switch(this.type) {
            case 'ninja':
                this.drawNinja(ctx, x, y, scale);
                break;
            case 'warrior':
                this.drawNinja(ctx, x, y, scale); // Reuse with different colors
                break;
            case 'shaman':
                this.drawNinja(ctx, x, y, scale);
                break;
            case 'sura':
                this.drawNinja(ctx, x, y, scale);
                break;
            default:
                this.drawNinja(ctx, x, y, scale);
        }
    }
}

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CharacterSprite;
}
