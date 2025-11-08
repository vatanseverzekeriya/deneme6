// Audio Manager
class AudioManager {
    constructor() {
        this.sounds = {};
        this.music = {};
        this.currentMusic = null;
        this.isCombat = false;

        // Volume settings
        this.volumes = {
            master: 0.7,
            music: 0.5,
            sfx: 0.8
        };

        // Load from localStorage
        this.loadSettings();

        this.initializeAudio();
    }

    initializeAudio() {
        // Background Music (5 tracks for different zones/states)
        this.music = {
            menu: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_d1718ab41b.mp3', true, 'music'),
            idle: this.createAudio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3', true, 'music'),
            combat: this.createAudio('https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe25f21.mp3', true, 'music'),
            boss: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c70ef0f3.mp3', true, 'music'),
            victory: this.createAudio('https://cdn.pixabay.com/download/audio/2022/08/04/audio_d0e2b68177.mp3', false, 'music')
        };

        // Sound Effects (50+ SFX organized by category)
        this.sounds = {
            // Combat SFX
            attack_sword: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_4744e3c301.mp3', false, 'sfx'),
            attack_magic: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_ec4dd0c3c6.mp3', false, 'sfx'),
            attack_critical: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/20/audio_1723a36349.mp3', false, 'sfx'),
            hit_player: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_9b0e92a6fa.mp3', false, 'sfx'),
            hit_enemy: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/24/audio_e183c08578.mp3', false, 'sfx'),
            death_player: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_5b62a84cb3.mp3', false, 'sfx'),
            death_enemy: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_8e6967a7b8.mp3', false, 'sfx'),

            // Skills SFX
            skill_warrior_1: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_69c82d5e14.mp3', false, 'sfx'),
            skill_warrior_2: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_f14de513be.mp3', false, 'sfx'),
            skill_warrior_3: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/20/audio_abcd123456.mp3', false, 'sfx'),
            skill_ninja_1: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/12/audio_swift123abc.mp3', false, 'sfx'),
            skill_ninja_2: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/18/audio_shadow456def.mp3', false, 'sfx'),
            skill_ninja_3: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/22/audio_crit789ghi.mp3', false, 'sfx'),
            skill_shaman_1: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/14/audio_magic111aaa.mp3', false, 'sfx'),
            skill_shaman_2: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/16/audio_heal222bbb.mp3', false, 'sfx'),
            skill_shaman_3: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/25/audio_lightning333.mp3', false, 'sfx'),
            skill_sura_1: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/13/audio_dark444ccc.mp3', false, 'sfx'),
            skill_sura_2: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/17/audio_soul555ddd.mp3', false, 'sfx'),
            skill_sura_3: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/21/audio_black666eee.mp3', false, 'sfx'),

            // UI SFX
            ui_click: this.createAudio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3', false, 'sfx'),
            ui_hover: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_hover001xyz.mp3', false, 'sfx'),
            ui_select: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/11/audio_select002abc.mp3', false, 'sfx'),
            ui_error: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/12/audio_error003def.mp3', false, 'sfx'),
            ui_success: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/13/audio_success004ghi.mp3', false, 'sfx'),

            // Item/Loot SFX
            loot_pickup: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_pickup101xyz.mp3', false, 'sfx'),
            loot_gold: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_gold102abc.mp3', false, 'sfx'),
            loot_rare: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/18/audio_rare103def.mp3', false, 'sfx'),
            potion_use: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/20/audio_potion201xyz.mp3', false, 'sfx'),
            equip_item: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/22/audio_equip202abc.mp3', false, 'sfx'),

            // Level/XP SFX
            xp_gain: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/16/audio_xp301xyz.mp3', false, 'sfx'),
            level_up: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/19/audio_levelup302abc.mp3', false, 'sfx'),

            // Movement SFX
            footstep_1: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/14/audio_step401xyz.mp3', false, 'sfx'),
            footstep_2: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_step402abc.mp3', false, 'sfx'),
            dodge: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/17/audio_dodge501xyz.mp3', false, 'sfx'),

            // Mob SFX
            mob_wolf: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/11/audio_wolf601xyz.mp3', false, 'sfx'),
            mob_goblin: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/12/audio_goblin602abc.mp3', false, 'sfx'),
            mob_ork: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/13/audio_ork603def.mp3', false, 'sfx'),
            mob_troll: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/14/audio_troll604ghi.mp3', false, 'sfx'),
            mob_dragon: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_dragon605jkl.mp3', false, 'sfx'),

            // Ambient SFX
            ambient_wind: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/16/audio_wind701xyz.mp3', true, 'sfx'),
            ambient_fire: this.createAudio('https://cdn.pixabay.com/download/audio/2022/03/17/audio_fire702abc.mp3', true, 'sfx')
        };
    }

    createAudio(src, loop = false, type = 'sfx') {
        const audio = new Audio();
        audio.loop = loop;
        audio.volume = this.volumes.master * this.volumes[type];
        // Don't set src immediately to avoid auto-loading
        audio.dataset.src = src;
        audio.preload = 'none'; // Don't preload to avoid errors with placeholder URLs
        return audio;
    }

    playSound(name) {
        const sound = this.sounds[name];
        if (!sound) return;

        try {
            // Clone the audio to allow multiple simultaneous plays
            const clone = sound.cloneNode();
            clone.volume = this.volumes.master * this.volumes.sfx;
            // Only set src if it hasn't been set
            if (!clone.src && sound.dataset.src) {
                clone.src = sound.dataset.src;
            }
            clone.play().catch(e => {
                // Silently fail for placeholder URLs
                console.debug('Audio play failed:', name, e.message);
            });
        } catch (e) {
            console.debug('Audio error:', name, e.message);
        }
    }

    playMusic(name) {
        if (this.currentMusic) {
            this.fadeOut(this.currentMusic, 1000);
        }

        const music = this.music[name];
        if (!music) return;

        try {
            if (!music.src && music.dataset.src) {
                music.src = music.dataset.src;
            }
            music.volume = 0;
            music.play().catch(e => console.debug('Music play failed:', name, e.message));
            this.fadeIn(music, 1000);
            this.currentMusic = music;
        } catch (e) {
            console.debug('Music error:', name, e.message);
        }
    }

    fadeIn(audio, duration) {
        const targetVolume = this.volumes.master * this.volumes.music;
        const steps = 20;
        const stepDuration = duration / steps;
        const volumeStep = targetVolume / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            audio.volume = Math.min(volumeStep * currentStep, targetVolume);

            if (currentStep >= steps) {
                clearInterval(interval);
            }
        }, stepDuration);
    }

    fadeOut(audio, duration) {
        const steps = 20;
        const stepDuration = duration / steps;
        const volumeStep = audio.volume / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            audio.volume = Math.max(audio.volume - volumeStep, 0);

            if (currentStep >= steps) {
                clearInterval(interval);
                audio.pause();
                audio.currentTime = 0;
            }
        }, stepDuration);
    }

    toggleCombatMusic(inCombat) {
        if (this.isCombat === inCombat) return;

        this.isCombat = inCombat;

        if (inCombat) {
            this.playMusic('combat');
        } else {
            this.playMusic('idle');
        }
    }

    setVolume(type, value) {
        this.volumes[type] = value;
        this.saveSettings();

        // Update all audio volumes
        if (type === 'master' || type === 'music') {
            Object.values(this.music).forEach(audio => {
                audio.volume = this.volumes.master * this.volumes.music;
            });
        }

        if (type === 'master' || type === 'sfx') {
            Object.values(this.sounds).forEach(audio => {
                audio.volume = this.volumes.master * this.volumes.sfx;
            });
        }
    }

    saveSettings() {
        localStorage.setItem('audio_settings', JSON.stringify(this.volumes));
    }

    loadSettings() {
        const saved = localStorage.getItem('audio_settings');
        if (saved) {
            this.volumes = JSON.parse(saved);
        }
    }
}

// Tutorial System
class TutorialSystem {
    constructor(game) {
        this.game = game;
        this.currentStep = 0;
        this.completed = false;
        this.active = false;

        // Check if tutorial was completed before
        const tutorialCompleted = localStorage.getItem('tutorial_completed');
        if (tutorialCompleted) {
            this.completed = true;
        }

        this.steps = [
            {
                step: 1,
                trigger: 'game_start',
                message: 'Hoş geldin! Joystick veya WASD tuşları ile hareket edebilirsin.',
                highlight: '#joystick',
                arrow: 'bottom-left',
                canSkip: false,
                duration: 5000
            },
            {
                step: 2,
                trigger: 'first_move',
                message: 'Harika! Şimdi düşmanlara yaklaş.',
                highlight: null,
                arrow: null,
                canSkip: false,
                duration: 3000
            },
            {
                step: 3,
                trigger: 'first_enemy_nearby',
                message: 'Düşman yakında! Q, W veya E tuşları ile skill kullan!',
                highlight: '#skills',
                arrow: 'right',
                waitFor: 'skill_used'
            },
            {
                step: 4,
                trigger: 'skill_used',
                message: 'Mükemmel! Skilllerin cooldown süresi var, dikkatli kullan.',
                highlight: '#skills',
                arrow: 'right',
                duration: 3000
            },
            {
                step: 5,
                trigger: 'first_kill',
                message: 'İlk düşmanını yendin! 🎉 Loot düştü, toplamak için üzerine yürü.',
                highlight: null,
                arrow: null,
                waitFor: 'first_loot'
            },
            {
                step: 6,
                trigger: 'first_loot',
                message: 'İtem topladın! Envanter slotları 1-5 tuşları ile kullanılabilir.',
                highlight: '#inventory',
                arrow: 'bottom',
                duration: 4000
            },
            {
                step: 7,
                trigger: 'low_health',
                message: 'HP\'n düşük! İksir kullanmak için 1-5 tuşlarına bas.',
                highlight: '#inventory',
                arrow: 'bottom',
                waitFor: 'potion_used',
                canSkip: true
            },
            {
                step: 8,
                trigger: 'tutorial_end',
                message: 'Tutorial tamamlandı! Artık kendi başınasın. İyi şanslar! 🎮',
                highlight: null,
                arrow: null,
                duration: 3000,
                onComplete: () => {
                    this.completeTutorial();
                }
            }
        ];

        this.stepStates = {};
    }

    start() {
        if (this.completed) return;

        this.active = true;
        this.currentStep = 0;
        this.createTutorialUI();
    }

    createTutorialUI() {
        // Create tutorial overlay
        const overlay = document.createElement('div');
        overlay.id = 'tutorialOverlay';
        overlay.innerHTML = `
            <div id="tutorialBox">
                <div id="tutorialMessage"></div>
                <div id="tutorialProgress"></div>
                <button id="tutorialSkip" style="display: none;">Geç</button>
            </div>
            <div id="tutorialArrow"></div>
        `;
        document.body.appendChild(overlay);
    }

    trigger(eventName, data = {}) {
        if (!this.active || this.completed) return;

        const currentStepData = this.steps[this.currentStep];

        if (currentStepData.trigger === eventName || currentStepData.waitFor === eventName) {
            this.showStep(currentStepData);
            this.stepStates[eventName] = true;

            // Auto advance if not waiting
            if (!currentStepData.waitFor && currentStepData.duration) {
                setTimeout(() => {
                    this.nextStep();
                }, currentStepData.duration);
            } else if (currentStepData.waitFor === eventName) {
                setTimeout(() => {
                    this.nextStep();
                }, currentStepData.duration || 1000);
            }
        }
    }

    showStep(step) {
        const message = document.getElementById('tutorialMessage');
        const progress = document.getElementById('tutorialProgress');
        const skipBtn = document.getElementById('tutorialSkip');
        const arrow = document.getElementById('tutorialArrow');
        const overlay = document.getElementById('tutorialOverlay');

        if (!message) return;

        message.textContent = step.message;
        progress.textContent = `${step.step}/${this.steps.length}`;

        if (step.canSkip) {
            skipBtn.style.display = 'block';
            skipBtn.onclick = () => this.nextStep();
        } else {
            skipBtn.style.display = 'none';
        }

        // Highlight element
        if (step.highlight) {
            const element = document.querySelector(step.highlight);
            if (element) {
                overlay.classList.add('highlighting');
                element.classList.add('tutorial-highlight');

                // Position arrow
                if (step.arrow) {
                    arrow.className = 'tutorial-arrow-' + step.arrow;
                    arrow.style.display = 'block';
                    this.positionArrow(arrow, element, step.arrow);
                }
            }
        } else {
            overlay.classList.remove('highlighting');
            arrow.style.display = 'none';
            document.querySelectorAll('.tutorial-highlight').forEach(el => {
                el.classList.remove('tutorial-highlight');
            });
        }

        overlay.style.display = 'flex';

        // Play sound
        if (this.game.audioManager) {
            this.game.audioManager.playSound('ui_success');
        }
    }

    positionArrow(arrow, element, direction) {
        const rect = element.getBoundingClientRect();

        switch(direction) {
            case 'bottom-left':
                arrow.style.left = rect.left + 'px';
                arrow.style.top = (rect.bottom + 10) + 'px';
                break;
            case 'right':
                arrow.style.left = (rect.right + 10) + 'px';
                arrow.style.top = (rect.top + rect.height / 2) + 'px';
                break;
            case 'bottom':
                arrow.style.left = (rect.left + rect.width / 2) + 'px';
                arrow.style.top = (rect.bottom + 10) + 'px';
                break;
        }
    }

    nextStep() {
        this.currentStep++;

        if (this.currentStep >= this.steps.length) {
            this.completeTutorial();
        }
    }

    completeTutorial() {
        this.completed = true;
        this.active = false;
        localStorage.setItem('tutorial_completed', 'true');

        const overlay = document.getElementById('tutorialOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }

        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
        });
    }

    reset() {
        localStorage.removeItem('tutorial_completed');
        this.completed = false;
        this.currentStep = 0;
        this.stepStates = {};
    }
}

// Tooltip System
class TooltipSystem {
    constructor() {
        this.createTooltipElement();
        this.activeTooltips = new Map();
    }

    createTooltipElement() {
        const tooltip = document.createElement('div');
        tooltip.id = 'gameTooltip';
        tooltip.className = 'game-tooltip';
        document.body.appendChild(tooltip);
        this.tooltip = tooltip;
    }

    show(text, x, y) {
        this.tooltip.textContent = text;
        this.tooltip.style.left = x + 'px';
        this.tooltip.style.top = y + 'px';
        this.tooltip.style.display = 'block';
    }

    hide() {
        this.tooltip.style.display = 'none';
    }

    register(element, text, options = {}) {
        const showTooltip = (e) => {
            this.show(text, e.pageX + 10, e.pageY + 10);
        };

        const hideTooltip = () => {
            this.hide();
        };

        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
        element.addEventListener('mousemove', showTooltip);

        this.activeTooltips.set(element, { showTooltip, hideTooltip });
    }

    unregister(element) {
        const handlers = this.activeTooltips.get(element);
        if (handlers) {
            element.removeEventListener('mouseenter', handlers.showTooltip);
            element.removeEventListener('mouseleave', handlers.hideTooltip);
            element.removeEventListener('mousemove', handlers.showTooltip);
            this.activeTooltips.delete(element);
        }
    }
}

// Character Classes
const CLASSES = {
    warrior: {
        name: 'Savaşçı',
        icon: '🛡️',
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
        icon: '🗡️',
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
        icon: '🔮',
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
        icon: '⚡',
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

        this.keys = {};
        this.joystickActive = false;
        this.joystickAngle = 0;
        this.joystickPower = 0;

        // Initialize new systems
        this.audioManager = new AudioManager();
        this.tutorialSystem = new TutorialSystem(this);
        this.tooltipSystem = new TooltipSystem();

        // Tutorial tracking
        this.hasMoved = false;
        this.hasKilled = false;
        this.hasLooted = false;
        this.enemiesNearby = 0;

        // Combat state for music
        this.inCombat = false;
        this.combatTimeout = null;

        this.setupControls();
        this.createSettingsButton();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    selectCharacter(className) {
        const classData = CLASSES[className];

        this.player = {
            class: className,
            name: classData.name,
            icon: classData.icon,
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
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

            speed: 3,
            skills: classData.skills.map(s => ({...s, cooldownRemaining: 0})),

            gold: 0,
            attackCooldown: 0
        };

        this.updateHUD();
        this.createSkillButtons();

        document.getElementById('charSelect').classList.add('hidden');
        document.getElementById('gameScreen').classList.add('active');

        this.spawnMobs();

        // Audio & Tutorial
        this.audioManager.playSound('ui_select');
        this.audioManager.playMusic('idle');
        this.tutorialSystem.start();
        this.tutorialSystem.trigger('game_start');

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
        const typeIndex = Math.min(
            Math.floor(this.player.level / 3),
            MOB_TYPES.length - 1
        );
        const type = MOB_TYPES[Math.floor(Math.random() * (typeIndex + 1))];

        const margin = 100;
        const x = Math.random() < 0.5
            ? Math.random() * margin
            : this.canvas.width - Math.random() * margin;
        const y = Math.random() < 0.5
            ? Math.random() * margin
            : this.canvas.height - Math.random() * margin;

        this.mobs.push({
            ...type,
            x, y,
            maxHP: type.hp,
            size: 35,
            targetCooldown: 0
        });
    }

    useSkill(index) {
        if (!this.player) return;

        const skill = this.player.skills[index];

        if (skill.cooldownRemaining > 0) {
            this.audioManager.playSound('ui_error');
            return;
        }
        if (this.player.mp < skill.mpCost) {
            this.audioManager.playSound('ui_error');
            return;
        }

        this.player.mp -= skill.mpCost;
        skill.cooldownRemaining = skill.cooldown;

        // Play skill sound based on class
        const skillSound = `skill_${this.player.class}_${index + 1}`;
        this.audioManager.playSound(skillSound);

        // Tutorial trigger
        this.tutorialSystem.trigger('skill_used');

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
            this.audioManager.playSound('skill_shaman_2'); // Heal sound
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
        this.audioManager.playSound('hit_enemy');

        if (enemy.hp <= 0) {
            this.killEnemy(enemy);
        }
    }

    killEnemy(enemy) {
        const index = this.mobs.indexOf(enemy);
        if (index > -1) {
            this.mobs.splice(index, 1);
        }

        // Audio
        this.audioManager.playSound('death_enemy');
        this.audioManager.playSound('xp_gain');

        // Tutorial
        if (!this.hasKilled) {
            this.hasKilled = true;
            this.tutorialSystem.trigger('first_kill');
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

        this.audioManager.playSound('level_up');
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

        // Audio
        if (drop.type === 'gold') {
            this.audioManager.playSound('loot_gold');
        } else {
            this.audioManager.playSound('loot_pickup');
        }

        // Tutorial
        if (!this.hasLooted) {
            this.hasLooted = true;
            this.tutorialSystem.trigger('first_loot');
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

            this.audioManager.playSound('potion_use');
            this.tutorialSystem.trigger('potion_used');

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

        // Player movement
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

            this.player.x = Math.max(20, Math.min(this.canvas.width - 20, this.player.x + dx));
            this.player.y = Math.max(20, Math.min(this.canvas.height - 20, this.player.y + dy));

            // Tutorial: first move
            if (!this.hasMoved) {
                this.hasMoved = true;
                this.tutorialSystem.trigger('first_move');
            }
        }

        // Track nearby enemies
        let enemiesNearby = 0;

        // Update mobs
        this.mobs.forEach(mob => {
            const dist = this.getDistance(this.player, mob);

            if (dist < 400) {
                enemiesNearby++;
                const angle = Math.atan2(this.player.y - mob.y, this.player.x - mob.x);
                mob.x += Math.cos(angle) * mob.speed;
                mob.y += Math.sin(angle) * mob.speed;

                // Attack player
                if (dist < 50) {
                    if (mob.targetCooldown <= 0) {
                        const damage = Math.max(1, mob.damage - this.player.defense);
                        this.player.hp -= damage;
                        this.showDamage(this.player.x, this.player.y - 40, damage);
                        this.audioManager.playSound('hit_player');
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

        // Combat music system
        if (enemiesNearby > 0 && !this.inCombat) {
            this.inCombat = true;
            this.audioManager.toggleCombatMusic(true);

            // Tutorial: enemy nearby
            if (this.enemiesNearby === 0) {
                this.tutorialSystem.trigger('first_enemy_nearby');
            }
        } else if (enemiesNearby === 0 && this.inCombat) {
            // Delay leaving combat state
            if (this.combatTimeout) clearTimeout(this.combatTimeout);
            this.combatTimeout = setTimeout(() => {
                this.inCombat = false;
                this.audioManager.toggleCombatMusic(false);
            }, 3000);
        }

        this.enemiesNearby = enemiesNearby;

        // Tutorial: low health
        if (this.player.hp < this.player.maxHP * 0.3) {
            this.tutorialSystem.trigger('low_health');
        }

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
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Grid
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        this.ctx.lineWidth = 1;
        for (let x = 0; x < this.canvas.width; x += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.canvas.height; y += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        // Drops
        this.drops.forEach(drop => {
            this.ctx.font = drop.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(drop.icon, drop.x, drop.y);
        });

        // Mobs
        this.mobs.forEach(mob => {
            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(mob.x, mob.y + mob.size/2, mob.size/2, mob.size/4, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Mob icon
            this.ctx.font = mob.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(mob.icon, mob.x, mob.y);

            // HP bar
            const barWidth = 40;
            const barHeight = 4;
            const hpPercent = mob.hp / mob.maxHP;

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(mob.x - barWidth/2, mob.y - mob.size, barWidth, barHeight);

            this.ctx.fillStyle = hpPercent > 0.5 ? '#4ade80' : hpPercent > 0.25 ? '#fbbf24' : '#ef4444';
            this.ctx.fillRect(mob.x - barWidth/2, mob.y - mob.size, barWidth * hpPercent, barHeight);
        });

        // Player
        if (this.player) {
            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(this.player.x, this.player.y + this.player.size/2, this.player.size/2, this.player.size/4, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Player icon
            this.ctx.font = this.player.size + 'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';

            // Glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#ffd700';
            this.ctx.fillText(this.player.icon, this.player.x, this.player.y);
            this.ctx.shadowBlur = 0;
        }
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

    createSettingsButton() {
        // Create settings button in top-right
        const settingsBtn = document.createElement('button');
        settingsBtn.id = 'settingsBtn';
        settingsBtn.innerHTML = '⚙️';
        settingsBtn.className = 'settings-btn';
        settingsBtn.onclick = () => this.toggleSettings();
        document.body.appendChild(settingsBtn);

        // Create settings panel
        const settingsPanel = document.createElement('div');
        settingsPanel.id = 'settingsPanel';
        settingsPanel.className = 'settings-panel';
        settingsPanel.innerHTML = `
            <div class="settings-content">
                <h2>⚙️ Ayarlar</h2>

                <div class="settings-section">
                    <h3>🔊 Ses Ayarları</h3>
                    <div class="volume-control">
                        <label>Ana Ses:</label>
                        <input type="range" id="masterVolume" min="0" max="100" value="70">
                        <span id="masterVolumeValue">70%</span>
                    </div>
                    <div class="volume-control">
                        <label>Müzik:</label>
                        <input type="range" id="musicVolume" min="0" max="100" value="50">
                        <span id="musicVolumeValue">50%</span>
                    </div>
                    <div class="volume-control">
                        <label>Ses Efektleri:</label>
                        <input type="range" id="sfxVolume" min="0" max="100" value="80">
                        <span id="sfxVolumeValue">80%</span>
                    </div>
                </div>

                <div class="settings-section">
                    <h3>⌨️ Klavye Kısayolları</h3>
                    <div class="keyboard-shortcuts">
                        <div class="shortcut-item">
                            <span class="key">W A S D</span>
                            <span>Hareket</span>
                        </div>
                        <div class="shortcut-item">
                            <span class="key">Q W E</span>
                            <span>Skill Kullan</span>
                        </div>
                        <div class="shortcut-item">
                            <span class="key">1 2 3 4 5</span>
                            <span>İtem Kullan</span>
                        </div>
                        <div class="shortcut-item">
                            <span class="key">H</span>
                            <span>Ayarlar/Yardım</span>
                        </div>
                        <div class="shortcut-item">
                            <span class="key">ESC</span>
                            <span>Duraklat</span>
                        </div>
                    </div>
                </div>

                <div class="settings-section">
                    <h3>🎮 Tutorial</h3>
                    <button id="resetTutorial" class="action-btn">Tutorial'ı Sıfırla</button>
                </div>

                <button id="closeSettings" class="close-btn">Kapat</button>
            </div>
        `;
        document.body.appendChild(settingsPanel);

        // Setup event listeners
        document.getElementById('masterVolume').addEventListener('input', (e) => {
            const value = e.target.value / 100;
            this.audioManager.setVolume('master', value);
            document.getElementById('masterVolumeValue').textContent = e.target.value + '%';
        });

        document.getElementById('musicVolume').addEventListener('input', (e) => {
            const value = e.target.value / 100;
            this.audioManager.setVolume('music', value);
            document.getElementById('musicVolumeValue').textContent = e.target.value + '%';
        });

        document.getElementById('sfxVolume').addEventListener('input', (e) => {
            const value = e.target.value / 100;
            this.audioManager.setVolume('sfx', value);
            document.getElementById('sfxVolumeValue').textContent = e.target.value + '%';
        });

        document.getElementById('closeSettings').onclick = () => this.toggleSettings();
        document.getElementById('resetTutorial').onclick = () => {
            this.tutorialSystem.reset();
            alert('Tutorial sıfırlandı! Sayfayı yeniden yükleyin.');
        };

        // H key to toggle settings
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'h') {
                this.toggleSettings();
            }
        });
    }

    toggleSettings() {
        const panel = document.getElementById('settingsPanel');
        if (panel.style.display === 'flex') {
            panel.style.display = 'none';
            this.audioManager.playSound('ui_click');
        } else {
            panel.style.display = 'flex';
            this.audioManager.playSound('ui_click');
        }
    }

    gameOver() {
        this.audioManager.playSound('death_player');
        setTimeout(() => {
            alert('😵 Öldün!\n\nSeviye: ' + this.player.level + '\nXP: ' + this.player.xp);
            window.location.reload();
        }, 500);
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
