// Advanced Sprite Animation System for RPG
class SpriteSystem {
    constructor() {
        this.spriteSheets = {};
        this.animations = {};
    }

    // Register a sprite sheet
    registerSpriteSheet(name, imageData, frameWidth, frameHeight) {
        const img = new Image();
        img.src = imageData;

        this.spriteSheets[name] = {
            image: img,
            frameWidth,
            frameHeight,
            loaded: false
        };

        img.onload = () => {
            this.spriteSheets[name].loaded = true;
        };
    }

    // Register an animation sequence
    registerAnimation(name, spriteSheetName, frames, fps = 10) {
        this.animations[name] = {
            spriteSheet: spriteSheetName,
            frames, // Array of {x, y} positions in the sprite sheet
            fps,
            frameDuration: 1000 / fps
        };
    }

    // Create an animated sprite instance
    createSprite(animationName) {
        const animation = this.animations[animationName];
        if (!animation) {
            console.error(`Animation ${animationName} not found`);
            return null;
        }

        return new AnimatedSprite(this, animation);
    }
}

class AnimatedSprite {
    constructor(system, animation) {
        this.system = system;
        this.currentAnimation = animation;
        this.currentFrame = 0;
        this.frameTimer = 0;
        this.playing = true;
        this.loop = true;
    }

    update(deltaTime) {
        if (!this.playing) return;

        this.frameTimer += deltaTime;

        if (this.frameTimer >= this.currentAnimation.frameDuration) {
            this.frameTimer = 0;
            this.currentFrame++;

            if (this.currentFrame >= this.currentAnimation.frames.length) {
                if (this.loop) {
                    this.currentFrame = 0;
                } else {
                    this.currentFrame = this.currentAnimation.frames.length - 1;
                    this.playing = false;
                }
            }
        }
    }

    draw(ctx, x, y, scale = 1) {
        const spriteSheet = this.system.spriteSheets[this.currentAnimation.spriteSheet];

        if (!spriteSheet || !spriteSheet.loaded) return;

        const frame = this.currentAnimation.frames[this.currentFrame];
        const { frameWidth, frameHeight } = spriteSheet;

        ctx.drawImage(
            spriteSheet.image,
            frame.x * frameWidth,
            frame.y * frameHeight,
            frameWidth,
            frameHeight,
            x - (frameWidth * scale) / 2,
            y - (frameHeight * scale) / 2,
            frameWidth * scale,
            frameHeight * scale
        );
    }

    setAnimation(animation) {
        this.currentAnimation = animation;
        this.currentFrame = 0;
        this.frameTimer = 0;
    }

    play() {
        this.playing = true;
    }

    pause() {
        this.playing = false;
    }

    reset() {
        this.currentFrame = 0;
        this.frameTimer = 0;
    }
}

// Direction utilities
class DirectionUtils {
    static getDirection8(dx, dy) {
        if (dx === 0 && dy === 0) return null;

        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const normalized = (angle + 360) % 360;

        // 8-directional mapping
        if (normalized >= 337.5 || normalized < 22.5) return 'E';
        if (normalized >= 22.5 && normalized < 67.5) return 'SE';
        if (normalized >= 67.5 && normalized < 112.5) return 'S';
        if (normalized >= 112.5 && normalized < 157.5) return 'SW';
        if (normalized >= 157.5 && normalized < 202.5) return 'W';
        if (normalized >= 202.5 && normalized < 247.5) return 'NW';
        if (normalized >= 247.5 && normalized < 292.5) return 'N';
        if (normalized >= 292.5 && normalized < 337.5) return 'NE';

        return 'S'; // default
    }

    static directionToAngle(direction) {
        const angles = {
            'E': 0,
            'SE': 45,
            'S': 90,
            'SW': 135,
            'W': 180,
            'NW': 225,
            'N': 270,
            'NE': 315
        };
        return angles[direction] || 0;
    }
}

// Character Sprite Manager - handles animation states
class CharacterSprite {
    constructor(spriteSystem, characterType) {
        this.spriteSystem = spriteSystem;
        this.characterType = characterType;
        this.direction = 'S';
        this.state = 'idle'; // idle, walk, attack, death
        this.currentSprite = null;
        this.x = 0;
        this.y = 0;
        this.scale = 2; // Default scale for pixel art
    }

    setState(state, direction = null) {
        if (direction) {
            this.direction = direction;
        }

        this.state = state;
        const animName = `${this.characterType}_${state}_${this.direction}`;

        if (this.spriteSystem.animations[animName]) {
            if (!this.currentSprite || this.currentSprite.currentAnimation !== this.spriteSystem.animations[animName]) {
                this.currentSprite = this.spriteSystem.createSprite(animName);
            }
        }
    }

    updateDirection(dx, dy) {
        const newDir = DirectionUtils.getDirection8(dx, dy);
        if (newDir && newDir !== this.direction) {
            this.direction = newDir;
            this.setState(this.state, this.direction);
        }
    }

    update(deltaTime, dx = 0, dy = 0) {
        // Update direction if moving
        if (dx !== 0 || dy !== 0) {
            this.updateDirection(dx, dy);
            if (this.state !== 'attack' && this.state !== 'death') {
                this.setState('walk');
            }
        } else {
            if (this.state === 'walk') {
                this.setState('idle');
            }
        }

        if (this.currentSprite) {
            this.currentSprite.update(deltaTime);
        }
    }

    draw(ctx, x, y) {
        this.x = x;
        this.y = y;

        if (this.currentSprite) {
            this.currentSprite.draw(ctx, x, y, this.scale);
        }
    }

    attack() {
        this.setState('attack');
        setTimeout(() => {
            if (this.state === 'attack') {
                this.setState('idle');
            }
        }, 500);
    }

    die() {
        this.setState('death');
    }
}
