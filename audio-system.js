// Audio System for RPG Game
// Uses Web Audio API to generate all sounds procedurally

class AudioManager {
    constructor() {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.masterVolume = 0.3; // Overall volume (0.0 to 1.0)
        this.musicVolume = 0.4;
        this.sfxVolume = 0.5;
        this.enabled = true;
        this.currentMusic = null;
        this.musicGainNode = null;
        this.ambientSound = null;

        // Create master gain nodes
        this.masterGain = this.context.createGain();
        this.masterGain.gain.value = this.masterVolume;
        this.masterGain.connect(this.context.destination);

        this.musicGain = this.context.createGain();
        this.musicGain.gain.value = this.musicVolume;
        this.musicGain.connect(this.masterGain);

        this.sfxGain = this.context.createGain();
        this.sfxGain.gain.value = this.sfxVolume;
        this.sfxGain.connect(this.masterGain);
    }

    // ===== UTILITY FUNCTIONS =====

    playTone(frequency, duration, type = 'sine', volume = 0.3) {
        if (!this.enabled) return;

        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.type = type;
        oscillator.frequency.value = frequency;

        gainNode.gain.value = volume;
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(this.sfxGain);

        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + duration);

        return { oscillator, gainNode };
    }

    playNoise(duration, volume = 0.1, filterFreq = 1000) {
        if (!this.enabled) return;

        const bufferSize = this.context.sampleRate * duration;
        const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.context.createBufferSource();
        noise.buffer = buffer;

        const filter = this.context.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = filterFreq;

        const gainNode = this.context.createGain();
        gainNode.gain.value = volume;
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.sfxGain);

        noise.start(this.context.currentTime);

        return { noise, filter, gainNode };
    }

    // ===== SKILL SOUNDS =====

    playSkillSound(skillName, className) {
        if (!this.enabled) return;

        // Different sound profiles based on class
        switch(className) {
            case 'warrior':
                this.playWarriorSkill(skillName);
                break;
            case 'ninja':
                this.playNinjaSkill(skillName);
                break;
            case 'shaman':
                this.playShamanSkill(skillName);
                break;
            case 'sura':
                this.playSuraSkill(skillName);
                break;
        }
    }

    playWarriorSkill(skillName) {
        if (skillName.includes('Vuruş')) {
            // Güçlü Vuruş - Heavy sword swing
            this.playTone(150, 0.3, 'sawtooth', 0.4);
            setTimeout(() => this.playTone(100, 0.2, 'square', 0.3), 100);
        } else if (skillName.includes('Kalkan')) {
            // Shield - Metallic defense sound
            this.playTone(300, 0.15, 'triangle', 0.35);
            this.playTone(400, 0.15, 'triangle', 0.35);
            this.playTone(500, 0.15, 'triangle', 0.35);
        } else if (skillName.includes('Çığlık')) {
            // War Cry - Deep powerful roar
            this.playTone(80, 0.5, 'sawtooth', 0.5);
            this.playNoise(0.3, 0.2, 500);
        }
    }

    playNinjaSkill(skillName) {
        if (skillName.includes('Hızlı')) {
            // Fast Attack - Quick swish
            this.playTone(800, 0.1, 'sine', 0.3);
            setTimeout(() => this.playTone(600, 0.1, 'sine', 0.25), 50);
        } else if (skillName.includes('Gölge')) {
            // Shadow Step - Whoosh effect
            this.playTone(400, 0.3, 'sine', 0.2);
            this.playNoise(0.2, 0.15, 2000);
        } else if (skillName.includes('Kritik')) {
            // Critical Hit - Sharp strike
            this.playTone(1200, 0.15, 'square', 0.4);
            setTimeout(() => this.playTone(800, 0.1, 'square', 0.3), 80);
        }
    }

    playShamanSkill(skillName) {
        if (skillName.includes('Işın')) {
            // Light Beam - Bright magical sound
            this.playTone(800, 0.4, 'sine', 0.3);
            this.playTone(1200, 0.4, 'sine', 0.25);
            this.playTone(1600, 0.4, 'sine', 0.2);
        } else if (skillName.includes('İyileştirme')) {
            // Healing - Gentle magical chime
            this.playTone(523, 0.3, 'sine', 0.3);
            setTimeout(() => this.playTone(659, 0.3, 'sine', 0.25), 100);
            setTimeout(() => this.playTone(784, 0.3, 'sine', 0.2), 200);
        } else if (skillName.includes('Yıldırım')) {
            // Lightning - Electric crackling
            this.playNoise(0.3, 0.3, 3000);
            this.playTone(2000, 0.2, 'square', 0.35);
        }
    }

    playSuraSkill(skillName) {
        if (skillName.includes('Karanlık')) {
            // Dark Sword - Ominous blade
            this.playTone(200, 0.35, 'sawtooth', 0.4);
            this.playTone(150, 0.35, 'sawtooth', 0.3);
        } else if (skillName.includes('Ruh')) {
            // Soul Drain - Eerie suction
            this.playTone(300, 0.4, 'sine', 0.25);
            const osc = this.playTone(250, 0.4, 'sine', 0.25);
        } else if (skillName.includes('Kara')) {
            // Dark Magic - Sinister spell
            this.playTone(150, 0.5, 'triangle', 0.35);
            this.playTone(200, 0.5, 'triangle', 0.3);
            this.playNoise(0.3, 0.2, 800);
        }
    }

    // ===== COMBAT SOUNDS =====

    playHitSound() {
        if (!this.enabled) return;
        // Melee hit - punchy impact
        this.playTone(200, 0.1, 'square', 0.3);
        this.playNoise(0.08, 0.15, 1500);
    }

    playPlayerDamageSound() {
        if (!this.enabled) return;
        // Player takes damage - painful grunt
        this.playTone(150, 0.2, 'sawtooth', 0.3);
        this.playTone(100, 0.15, 'sawtooth', 0.25);
    }

    playEnemyDeathSound() {
        if (!this.enabled) return;
        // Enemy dies - dramatic death
        this.playTone(300, 0.3, 'sawtooth', 0.3);
        setTimeout(() => {
            this.playTone(200, 0.2, 'sawtooth', 0.25);
        }, 100);
        setTimeout(() => {
            this.playTone(100, 0.4, 'sawtooth', 0.2);
        }, 200);
    }

    playGameOverSound() {
        if (!this.enabled) return;
        // Game over - sad descending tones
        const notes = [523, 494, 440, 392, 349];
        notes.forEach((note, i) => {
            setTimeout(() => {
                this.playTone(note, 0.4, 'sine', 0.3);
            }, i * 150);
        });
    }

    // ===== UI SOUNDS =====

    playButtonClick() {
        if (!this.enabled) return;
        this.playTone(800, 0.05, 'sine', 0.2);
        setTimeout(() => this.playTone(1000, 0.05, 'sine', 0.15), 30);
    }

    playItemPickup() {
        if (!this.enabled) return;
        // Item pickup - satisfying chime
        this.playTone(660, 0.15, 'sine', 0.25);
        setTimeout(() => this.playTone(880, 0.2, 'sine', 0.2), 80);
    }

    playItemUse() {
        if (!this.enabled) return;
        // Potion/item use - gulp sound
        this.playTone(400, 0.1, 'sine', 0.25);
        setTimeout(() => this.playTone(300, 0.15, 'sine', 0.2), 100);
    }

    playLevelUp() {
        if (!this.enabled) return;
        // Level up - triumphant fanfare
        const melody = [523, 659, 784, 1047];
        melody.forEach((note, i) => {
            setTimeout(() => {
                this.playTone(note, 0.3, 'sine', 0.3);
            }, i * 100);
        });
        // Add harmony
        setTimeout(() => {
            this.playTone(1047, 0.5, 'sine', 0.25);
            this.playTone(1319, 0.5, 'sine', 0.2);
        }, 400);
    }

    // ===== BACKGROUND MUSIC =====

    playMenuMusic() {
        this.stopMusic();
        if (!this.enabled) return;

        // Simple ambient menu theme
        const playMenuLoop = () => {
            if (!this.currentMusic) return;

            const melody = [
                {note: 392, duration: 0.5},
                {note: 440, duration: 0.5},
                {note: 494, duration: 0.5},
                {note: 523, duration: 0.5},
                {note: 494, duration: 0.5},
                {note: 440, duration: 0.5},
                {note: 392, duration: 0.5},
                {note: 349, duration: 0.5}
            ];

            let time = 0;
            melody.forEach((item, i) => {
                if (this.currentMusic) {
                    setTimeout(() => {
                        if (this.currentMusic) {
                            this.playMusicNote(item.note, item.duration, 0.08);
                        }
                    }, time * 1000);
                    time += item.duration;
                }
            });

            setTimeout(playMenuLoop, time * 1000);
        };

        this.currentMusic = true;
        playMenuLoop();
    }

    playCombatMusic() {
        this.stopMusic();
        if (!this.enabled) return;

        // Intense battle music
        const playCombatLoop = () => {
            if (!this.currentMusic) return;

            const melody = [
                {note: 220, duration: 0.25},
                {note: 220, duration: 0.25},
                {note: 277, duration: 0.25},
                {note: 220, duration: 0.25},
                {note: 330, duration: 0.5},
                {note: 277, duration: 0.5},
                {note: 220, duration: 0.25},
                {note: 220, duration: 0.25}
            ];

            let time = 0;
            melody.forEach((item) => {
                if (this.currentMusic) {
                    setTimeout(() => {
                        if (this.currentMusic) {
                            this.playMusicNote(item.note, item.duration, 0.06);
                            // Add bass
                            this.playMusicNote(item.note / 2, item.duration, 0.04);
                        }
                    }, time * 1000);
                    time += item.duration;
                }
            });

            setTimeout(playCombatLoop, time * 1000);
        };

        this.currentMusic = true;
        playCombatLoop();
    }

    playBossMusic() {
        this.stopMusic();
        if (!this.enabled) return;

        // Epic boss battle music
        const playBossLoop = () => {
            if (!this.currentMusic) return;

            const melody = [
                {note: 165, duration: 0.3},
                {note: 220, duration: 0.3},
                {note: 277, duration: 0.3},
                {note: 330, duration: 0.3},
                {note: 370, duration: 0.6},
                {note: 330, duration: 0.3},
                {note: 277, duration: 0.3},
                {note: 220, duration: 0.6}
            ];

            let time = 0;
            melody.forEach((item) => {
                if (this.currentMusic) {
                    setTimeout(() => {
                        if (this.currentMusic) {
                            this.playMusicNote(item.note, item.duration, 0.05);
                            // Add power chord
                            this.playMusicNote(item.note * 1.5, item.duration, 0.04);
                            this.playMusicNote(item.note / 2, item.duration, 0.06);
                        }
                    }, time * 1000);
                    time += item.duration;
                }
            });

            setTimeout(playBossLoop, time * 1000);
        };

        this.currentMusic = true;
        playBossLoop();
    }

    playMusicNote(frequency, duration, volume) {
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;

        gainNode.gain.value = volume;

        oscillator.connect(gainNode);
        gainNode.connect(this.musicGain);

        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + duration);
    }

    stopMusic() {
        this.currentMusic = null;
    }

    // ===== AMBIENT SOUNDS =====

    startAmbientSound() {
        if (this.ambientSound || !this.enabled) return;

        const playAmbient = () => {
            if (!this.ambientSound) return;

            // Random bird chirps
            if (Math.random() > 0.7) {
                const pitch = 1500 + Math.random() * 1000;
                this.playTone(pitch, 0.1, 'sine', 0.05);
                setTimeout(() => {
                    this.playTone(pitch * 1.2, 0.1, 'sine', 0.04);
                }, 100);
            }

            // Wind/breeze (subtle noise)
            if (Math.random() > 0.8) {
                this.playNoise(0.5, 0.03, 800);
            }

            setTimeout(playAmbient, 2000 + Math.random() * 3000);
        };

        this.ambientSound = true;
        playAmbient();
    }

    stopAmbientSound() {
        this.ambientSound = null;
    }

    // ===== VOLUME CONTROLS =====

    setMasterVolume(value) {
        this.masterVolume = Math.max(0, Math.min(1, value));
        this.masterGain.gain.value = this.masterVolume;
    }

    setMusicVolume(value) {
        this.musicVolume = Math.max(0, Math.min(1, value));
        this.musicGain.gain.value = this.musicVolume;
    }

    setSFXVolume(value) {
        this.sfxVolume = Math.max(0, Math.min(1, value));
        this.sfxGain.gain.value = this.sfxVolume;
    }

    toggleMute() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            this.stopMusic();
            this.stopAmbientSound();
        }
        return this.enabled;
    }

    getMasterVolume() {
        return this.masterVolume;
    }

    getMusicVolume() {
        return this.musicVolume;
    }

    getSFXVolume() {
        return this.sfxVolume;
    }

    isEnabled() {
        return this.enabled;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioManager;
}
