// Professional RPG Enemy/Mob Sprite System
// High-quality monster and enemy assets

class MobSprite {
    constructor(type = 'wolf') {
        this.type = type;
        this.frame = 0;
        this.animationSpeed = 0.15;
        this.currentAnimation = 'idle';
        this.direction = 1;

        this.animations = {
            idle: { frames: 4, speed: 0.1 },
            walk: { frames: 6, speed: 0.15 },
            attack: { frames: 5, speed: 0.25 },
            hit: { frames: 2, speed: 0.3 },
            death: { frames: 6, speed: 0.15 }
        };

        this.particles = [];

        // Color palettes for different mob types
        this.mobColors = {
            wolf: {
                fur: '#4a5568',
                furDark: '#2d3748',
                eyes: '#ff0000',
                teeth: '#ffffff',
                accent: '#718096'
            },
            goblin: {
                skin: '#5a9a3d',
                skinDark: '#3d6b28',
                clothes: '#8b4513',
                eyes: '#ffff00',
                accent: '#4a7c2f'
            },
            orc: {
                skin: '#4a7c4a',
                skinDark: '#2d4a2d',
                armor: '#5c5c5c',
                eyes: '#ff0000',
                accent: '#7a9a7a'
            },
            troll: {
                skin: '#6b8e6b',
                skinDark: '#4a6b4a',
                moss: '#3d5a3d',
                eyes: '#00ff00',
                accent: '#557a55'
            },
            dragon: {
                scales: '#8b0000',
                scalesDark: '#5a0000',
                belly: '#d4a574',
                eyes: '#ffd700',
                fire: '#ff4500',
                accent: '#a52a2a'
            }
        };

        this.colors = this.mobColors[type] || this.mobColors.wolf;
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
            if (this.currentAnimation === 'attack' || this.currentAnimation === 'hit') {
                this.setAnimation('idle');
            } else if (this.currentAnimation === 'death') {
                this.frame = anim.frames - 1;
            } else {
                this.frame = 0;
            }
        }

        this.particles = this.particles.filter(p => {
            p.life--;
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1;
            return p.life > 0;
        });
    }

    addParticle(x, y, color, count = 1) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 10,
                y: y + (Math.random() - 0.5) * 10,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3 - 1,
                life: 15 + Math.random() * 15,
                color: color,
                size: 2 + Math.random() * 2
            });
        }
    }

    // Draw Wolf
    drawWolf(ctx, x, y, scale, animation, frame) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(this.direction * scale, scale);

        const bounce = Math.sin(frame * 1.5) * 2;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 18, 12, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        if (animation === 'attack') {
            this.drawWolfAttack(ctx, frame);
        } else if (animation === 'death') {
            this.drawWolfDeath(ctx, frame);
        } else {
            this.drawWolfIdle(ctx, bounce);
        }

        ctx.restore();

        // Particles
        this.particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.life / 30;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(x + p.x, y + p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }

    drawWolfIdle(ctx, bounce) {
        // Body
        ctx.fillStyle = this.colors.fur;
        ctx.beginPath();
        ctx.ellipse(0, 0 - bounce, 15, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Darker back fur
        ctx.fillStyle = this.colors.furDark;
        ctx.beginPath();
        ctx.ellipse(0, -2 - bounce, 13, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs
        ctx.fillStyle = this.colors.fur;
        ctx.fillRect(-10, 5 - bounce, 4, 10);
        ctx.fillRect(-3, 5 - bounce, 4, 10);
        ctx.fillRect(3, 5 - bounce, 4, 10);
        ctx.fillRect(10, 5 - bounce, 4, 10);

        // Paws
        ctx.fillStyle = this.colors.furDark;
        ctx.fillRect(-10, 14 - bounce, 4, 2);
        ctx.fillRect(-3, 14 - bounce, 4, 2);
        ctx.fillRect(3, 14 - bounce, 4, 2);
        ctx.fillRect(10, 14 - bounce, 4, 2);

        // Head
        ctx.fillStyle = this.colors.fur;
        ctx.beginPath();
        ctx.arc(18, -5 - bounce, 7, 0, Math.PI * 2);
        ctx.fill();

        // Snout
        ctx.fillStyle = this.colors.furDark;
        ctx.beginPath();
        ctx.ellipse(23, -4 - bounce, 4, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Ears
        ctx.fillStyle = this.colors.fur;
        ctx.beginPath();
        ctx.moveTo(14, -10 - bounce);
        ctx.lineTo(16, -15 - bounce);
        ctx.lineTo(18, -10 - bounce);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(18, -10 - bounce);
        ctx.lineTo(20, -15 - bounce);
        ctx.lineTo(22, -10 - bounce);
        ctx.fill();

        // Eyes
        ctx.fillStyle = this.colors.eyes;
        ctx.beginPath();
        ctx.arc(16, -6 - bounce, 1.5, 0, Math.PI * 2);
        ctx.arc(20, -6 - bounce, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Eye glow
        ctx.fillStyle = '#ff0000';
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(16, -6 - bounce, 2, 0, Math.PI * 2);
        ctx.arc(20, -6 - bounce, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Nose
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(26, -4 - bounce, 1, 0, Math.PI * 2);
        ctx.fill();

        // Tail
        ctx.fillStyle = this.colors.fur;
        ctx.save();
        ctx.translate(-12, 0 - bounce);
        ctx.rotate(-45 * Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-5, -3, -8, -6);
        ctx.lineWidth = 5;
        ctx.strokeStyle = this.colors.fur;
        ctx.stroke();
        ctx.restore();
    }

    drawWolfAttack(ctx, frame) {
        const attackProgress = (frame % this.animations.attack.frames) / this.animations.attack.frames;
        const lunge = attackProgress < 0.5 ? attackProgress * 20 : (1 - attackProgress) * 20;

        ctx.save();
        ctx.translate(lunge, 0);

        // Body - lunging forward
        ctx.fillStyle = this.colors.fur;
        ctx.beginPath();
        ctx.ellipse(0, 0, 16, 7, -10 * Math.PI / 180, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = this.colors.furDark;
        ctx.beginPath();
        ctx.ellipse(0, -2, 14, 5, -10 * Math.PI / 180, 0, Math.PI * 2);
        ctx.fill();

        // Legs - running
        ctx.fillStyle = this.colors.fur;
        const legOffset = attackProgress * 15;
        ctx.fillRect(-12 + legOffset, 5, 4, 8);
        ctx.fillRect(-5 - legOffset, 5, 4, 8);
        ctx.fillRect(5 + legOffset, 5, 4, 8);
        ctx.fillRect(12 - legOffset, 5, 4, 8);

        // Head - mouth open
        ctx.fillStyle = this.colors.fur;
        ctx.beginPath();
        ctx.arc(18, -8, 7, 0, Math.PI * 2);
        ctx.fill();

        // Open mouth
        ctx.fillStyle = '#2d1b1b';
        ctx.beginPath();
        ctx.ellipse(24, -6, 5, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Teeth
        ctx.fillStyle = this.colors.teeth;
        // Upper teeth
        ctx.fillRect(20, -8, 2, 3);
        ctx.fillRect(24, -8, 2, 3);
        ctx.fillRect(28, -8, 2, 3);
        // Lower teeth
        ctx.fillRect(20, -3, 2, 3);
        ctx.fillRect(24, -3, 2, 3);
        ctx.fillRect(28, -3, 2, 3);

        // Ears - back
        ctx.fillStyle = this.colors.fur;
        ctx.beginPath();
        ctx.moveTo(14, -13);
        ctx.lineTo(15, -17);
        ctx.lineTo(17, -13);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(18, -13);
        ctx.lineTo(19, -17);
        ctx.lineTo(21, -13);
        ctx.fill();

        // Eyes - aggressive
        ctx.fillStyle = this.colors.eyes;
        ctx.beginPath();
        ctx.arc(16, -9, 2, 0, Math.PI * 2);
        ctx.arc(20, -9, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Saliva particles when attacking
        if (attackProgress > 0.4 && attackProgress < 0.6) {
            this.addParticle(25 + lunge, -6, 'rgba(255, 255, 255, 0.6)', 2);
        }
    }

    drawWolfDeath(ctx, frame) {
        const progress = (frame % this.animations.death.frames) / this.animations.death.frames;
        const fallAngle = progress * 90;

        ctx.save();
        ctx.rotate(fallAngle * Math.PI / 180);
        ctx.globalAlpha = 1 - progress * 0.5;

        this.drawWolfIdle(ctx, 0);

        ctx.restore();
    }

    // Draw Goblin
    drawGoblin(ctx, x, y, scale, animation, frame) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(this.direction * scale, scale);

        const bounce = Math.sin(frame * 1.5) * 1.5;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 15, 10, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        if (animation === 'attack') {
            this.drawGoblinAttack(ctx, frame);
        } else {
            this.drawGoblinIdle(ctx, bounce);
        }

        ctx.restore();

        this.particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.life / 30;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(x + p.x, y + p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }

    drawGoblinIdle(ctx, bounce) {
        // Legs
        ctx.fillStyle = this.colors.skin;
        ctx.fillRect(-6, 3 - bounce, 4, 10);
        ctx.fillRect(2, 3 - bounce, 4, 10);

        // Feet
        ctx.fillStyle = this.colors.skinDark;
        ctx.beginPath();
        ctx.ellipse(-4, 13 - bounce, 3, 2, 0, 0, Math.PI * 2);
        ctx.ellipse(4, 13 - bounce, 3, 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body with loincloth
        ctx.fillStyle = this.colors.skin;
        ctx.beginPath();
        ctx.ellipse(0, -2 - bounce, 8, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Loincloth
        ctx.fillStyle = this.colors.clothes;
        ctx.fillRect(-6, 2 - bounce, 12, 4);

        // Arms
        ctx.fillStyle = this.colors.skin;
        // Left arm
        ctx.save();
        ctx.translate(-7, -3 - bounce);
        ctx.rotate(-20 * Math.PI / 180);
        ctx.fillRect(-2, 0, 3, 8);
        ctx.restore();

        // Right arm holding club
        ctx.save();
        ctx.translate(7, -3 - bounce);
        ctx.rotate(20 * Math.PI / 180);
        ctx.fillRect(-1, 0, 3, 8);
        // Club
        ctx.fillStyle = '#654321';
        ctx.fillRect(0, 7, 2, 10);
        ctx.beginPath();
        ctx.arc(1, 17, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Head
        ctx.fillStyle = this.colors.skin;
        ctx.beginPath();
        ctx.arc(0, -10 - bounce, 6, 0, Math.PI * 2);
        ctx.fill();

        // Large ears
        ctx.fillStyle = this.colors.accent;
        ctx.beginPath();
        ctx.ellipse(-6, -11 - bounce, 3, 5, -30 * Math.PI / 180, 0, Math.PI * 2);
        ctx.ellipse(6, -11 - bounce, 3, 5, 30 * Math.PI / 180, 0, Math.PI * 2);
        ctx.fill();

        // Eyes - evil yellow
        ctx.fillStyle = this.colors.eyes;
        ctx.beginPath();
        ctx.arc(-2, -11 - bounce, 2, 0, Math.PI * 2);
        ctx.arc(2, -11 - bounce, 2, 0, Math.PI * 2);
        ctx.fill();

        // Pupils
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(-2, -11 - bounce, 1, 0, Math.PI * 2);
        ctx.arc(2, -11 - bounce, 1, 0, Math.PI * 2);
        ctx.fill();

        // Nose
        ctx.fillStyle = this.colors.skinDark;
        ctx.beginPath();
        ctx.moveTo(0, -9 - bounce);
        ctx.lineTo(-2, -7 - bounce);
        ctx.lineTo(2, -7 - bounce);
        ctx.fill();

        // Mouth - evil grin
        ctx.strokeStyle = this.colors.skinDark;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, -8 - bounce, 3, 0, Math.PI);
        ctx.stroke();

        // Teeth
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-2, -8 - bounce);
        ctx.lineTo(-2, -6 - bounce);
        ctx.moveTo(0, -8 - bounce);
        ctx.lineTo(0, -6 - bounce);
        ctx.moveTo(2, -8 - bounce);
        ctx.lineTo(2, -6 - bounce);
        ctx.stroke();
    }

    drawGoblinAttack(ctx, frame) {
        const attackProgress = (frame % this.animations.attack.frames) / this.animations.attack.frames;
        const swing = attackProgress < 0.5 ? attackProgress * 2 : 2 - (attackProgress * 2);

        this.drawGoblinIdle(ctx, 0);

        // Draw swinging club effect
        if (attackProgress > 0.2 && attackProgress < 0.8) {
            ctx.save();
            ctx.translate(10, -5);
            ctx.rotate((swing * 120 - 30) * Math.PI / 180);

            // Motion blur
            ctx.globalAlpha = 0.3;
            for (let i = 0; i < 3; i++) {
                ctx.rotate(-10 * Math.PI / 180);
                ctx.fillStyle = '#654321';
                ctx.fillRect(0, 0, 2, 15);
            }

            ctx.restore();

            // Impact effect
            if (attackProgress > 0.45 && attackProgress < 0.55) {
                this.addParticle(15, 5, '#ffff00', 3);
            }
        }
    }

    // Draw Dragon (Boss)
    drawDragon(ctx, x, y, scale, animation, frame) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(this.direction * scale, scale);

        const breathe = Math.sin(frame * 0.3) * 3;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.ellipse(0, 35, 25, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        if (animation === 'attack') {
            this.drawDragonAttack(ctx, frame);
        } else {
            this.drawDragonIdle(ctx, breathe);
        }

        ctx.restore();

        this.particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.life / 30;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(x + p.x, y + p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }

    drawDragonIdle(ctx, breathe) {
        // Tail
        ctx.fillStyle = this.colors.scales;
        ctx.save();
        ctx.translate(-20, 15 + breathe);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-15, 5, -25, 0);
        ctx.lineWidth = 8;
        ctx.strokeStyle = this.colors.scales;
        ctx.stroke();
        // Tail spikes
        ctx.fillStyle = this.colors.scalesDark;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(-8 * i, 2);
            ctx.lineTo(-8 * i - 2, -3);
            ctx.lineTo(-8 * i - 4, 2);
            ctx.fill();
        }
        ctx.restore();

        // Back legs
        ctx.fillStyle = this.colors.scales;
        // Left back leg
        ctx.save();
        ctx.translate(-10, 15 + breathe);
        ctx.fillRect(-4, 0, 6, 15);
        // Claws
        ctx.fillStyle = '#2d2d2d';
        ctx.beginPath();
        ctx.moveTo(-3, 15);
        ctx.lineTo(-4, 20);
        ctx.lineTo(-2, 15);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(1, 15);
        ctx.lineTo(0, 20);
        ctx.lineTo(2, 15);
        ctx.fill();
        ctx.restore();

        // Right back leg
        ctx.save();
        ctx.translate(10, 15 + breathe);
        ctx.fillRect(-2, 0, 6, 15);
        ctx.fillStyle = '#2d2d2d';
        ctx.beginPath();
        ctx.moveTo(-1, 15);
        ctx.lineTo(-2, 20);
        ctx.lineTo(0, 15);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(3, 15);
        ctx.lineTo(2, 20);
        ctx.lineTo(4, 15);
        ctx.fill();
        ctx.restore();

        // Body
        ctx.fillStyle = this.colors.scales;
        ctx.beginPath();
        ctx.ellipse(0, 0 + breathe, 20, 15, 0, 0, Math.PI * 2);
        ctx.fill();

        // Belly (lighter)
        ctx.fillStyle = this.colors.belly;
        ctx.beginPath();
        ctx.ellipse(0, 5 + breathe, 15, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Scales on back
        ctx.fillStyle = this.colors.scalesDark;
        for (let i = -10; i < 15; i += 6) {
            ctx.beginPath();
            ctx.arc(i, -5 + breathe, 3, 0, Math.PI * 2);
            ctx.fill();
        }

        // Front legs
        ctx.fillStyle = this.colors.scales;
        // Left front leg
        ctx.save();
        ctx.translate(-15, 5 + breathe);
        ctx.fillRect(-3, 0, 5, 18);
        ctx.fillStyle = '#2d2d2d';
        // Claws
        for (let i = -2; i < 3; i += 2) {
            ctx.beginPath();
            ctx.moveTo(i, 18);
            ctx.lineTo(i - 1, 23);
            ctx.lineTo(i + 1, 18);
            ctx.fill();
        }
        ctx.restore();

        // Right front leg
        ctx.save();
        ctx.translate(15, 5 + breathe);
        ctx.fillRect(-2, 0, 5, 18);
        ctx.fillStyle = '#2d2d2d';
        for (let i = -1; i < 4; i += 2) {
            ctx.beginPath();
            ctx.moveTo(i, 18);
            ctx.lineTo(i - 1, 23);
            ctx.lineTo(i + 1, 18);
            ctx.fill();
        }
        ctx.restore();

        // Neck
        ctx.fillStyle = this.colors.scales;
        ctx.save();
        ctx.translate(18, -5 + breathe);
        ctx.rotate(30 * Math.PI / 180);
        ctx.fillRect(-4, 0, 8, 18);
        ctx.restore();

        // Head
        ctx.fillStyle = this.colors.scales;
        ctx.save();
        ctx.translate(25, -15 + breathe);

        // Head main
        ctx.beginPath();
        ctx.ellipse(0, 0, 10, 7, 0, 0, Math.PI * 2);
        ctx.fill();

        // Snout
        ctx.fillStyle = this.colors.scalesDark;
        ctx.beginPath();
        ctx.ellipse(10, 0, 6, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Horns
        ctx.fillStyle = '#2d2d2d';
        ctx.beginPath();
        ctx.moveTo(-5, -5);
        ctx.lineTo(-7, -12);
        ctx.lineTo(-3, -6);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(5, -5);
        ctx.lineTo(7, -12);
        ctx.lineTo(3, -6);
        ctx.fill();

        // Eyes - glowing gold
        ctx.fillStyle = this.colors.eyes;
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.colors.eyes;
        ctx.beginPath();
        ctx.arc(-3, -2, 2, 0, Math.PI * 2);
        ctx.arc(3, -2, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Nostrils
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.arc(13, -2, 1.5, 0, Math.PI * 2);
        ctx.arc(13, 2, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Teeth visible
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(8, 3);
        ctx.lineTo(7, 6);
        ctx.lineTo(9, 3);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(12, 3);
        ctx.lineTo(11, 6);
        ctx.lineTo(13, 3);
        ctx.fill();

        ctx.restore();

        // Wings
        this.drawDragonWings(ctx, breathe);

        // Smoke from nostrils
        if (Math.random() < 0.1) {
            this.addParticle(38, -15 + breathe, this.colors.scalesDark, 1);
        }
    }

    drawDragonWings(ctx, breathe) {
        const wingFlap = Math.sin(breathe * 0.5) * 15;

        ctx.save();
        ctx.globalAlpha = 0.85;

        // Left wing
        ctx.fillStyle = this.colors.accent;
        ctx.save();
        ctx.translate(-10, -5 + breathe);
        ctx.rotate((wingFlap - 30) * Math.PI / 180);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-20, -15);
        ctx.lineTo(-15, 5);
        ctx.closePath();
        ctx.fill();

        // Wing membrane
        ctx.strokeStyle = this.colors.scalesDark;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-15, -10);
        ctx.moveTo(-5, -3);
        ctx.lineTo(-12, 0);
        ctx.stroke();

        ctx.restore();

        // Right wing
        ctx.fillStyle = this.colors.accent;
        ctx.save();
        ctx.translate(10, -5 + breathe);
        ctx.rotate((-wingFlap + 30) * Math.PI / 180);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(20, -15);
        ctx.lineTo(15, 5);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = this.colors.scalesDark;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(15, -10);
        ctx.moveTo(5, -3);
        ctx.lineTo(12, 0);
        ctx.stroke();

        ctx.restore();

        ctx.restore();
    }

    drawDragonAttack(ctx, frame) {
        const attackProgress = (frame % this.animations.attack.frames) / this.animations.attack.frames;

        this.drawDragonIdle(ctx, 0);

        // Fire breath effect
        if (attackProgress > 0.3 && attackProgress < 0.9) {
            ctx.save();
            ctx.translate(25, -15);

            const fireLength = (attackProgress - 0.3) * 80;

            // Fire cone
            const gradient = ctx.createLinearGradient(15, 0, 15 + fireLength, 0);
            gradient.addColorStop(0, this.colors.fire);
            gradient.addColorStop(0.5, '#ff8c00');
            gradient.addColorStop(1, 'rgba(255, 69, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(15, -3);
            ctx.lineTo(15 + fireLength, -10);
            ctx.lineTo(15 + fireLength, 10);
            ctx.lineTo(15, 3);
            ctx.closePath();
            ctx.fill();

            // Fire particles
            for (let i = 0; i < 5; i++) {
                this.addParticle(
                    30 + Math.random() * fireLength,
                    -10 + Math.random() * 20,
                    Math.random() > 0.5 ? this.colors.fire : '#ff8c00',
                    1
                );
            }

            ctx.restore();
        }
    }

    draw(ctx, x, y, scale = 1) {
        const frame = Math.floor(this.frame);

        switch(this.type) {
            case 'wolf':
                this.drawWolf(ctx, x, y, scale, this.currentAnimation, frame);
                break;
            case 'goblin':
                this.drawGoblin(ctx, x, y, scale, this.currentAnimation, frame);
                break;
            case 'orc':
                this.drawGoblin(ctx, x, y, scale * 1.2, this.currentAnimation, frame); // Bigger goblin
                break;
            case 'troll':
                this.drawGoblin(ctx, x, y, scale * 1.5, this.currentAnimation, frame); // Even bigger
                break;
            case 'dragon':
                this.drawDragon(ctx, x, y, scale, this.currentAnimation, frame);
                break;
            default:
                this.drawWolf(ctx, x, y, scale, this.currentAnimation, frame);
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobSprite;
}
