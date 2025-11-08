const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const PlayerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [20, 'Username cannot exceed 20 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    passwordHash: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false // Don't include password in queries by default
    },
    characterData: {
        class: {
            type: String,
            enum: ['Warrior', 'Assassin', 'Mage', 'Archer'],
            required: true
        },
        level: {
            type: Number,
            default: 1,
            min: 1,
            max: 120
        },
        experience: {
            type: Number,
            default: 0,
            min: 0
        },
        stats: {
            hp: { type: Number, default: 100 },
            maxHp: { type: Number, default: 100 },
            mp: { type: Number, default: 50 },
            maxMp: { type: Number, default: 50 },
            attack: { type: Number, default: 10 },
            defense: { type: Number, default: 5 },
            speed: { type: Number, default: 100 },
            strength: { type: Number, default: 10 },
            dexterity: { type: Number, default: 10 },
            intelligence: { type: Number, default: 10 },
            vitality: { type: Number, default: 10 }
        },
        position: {
            x: { type: Number, default: 400 },
            y: { type: Number, default: 300 },
            map: { type: String, default: 'town' },
            direction: { type: String, default: 'down' }
        },
        equipment: {
            weapon: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
            armor: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
            helmet: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
            boots: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
            accessory1: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
            accessory2: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null }
        },
        inventory: [{
            item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
            quantity: { type: Number, default: 1, min: 1 },
            slot: { type: Number, required: true }
        }],
        gold: {
            type: Number,
            default: 1000,
            min: 0
        },
        skillPoints: {
            type: Number,
            default: 0,
            min: 0
        },
        skills: [{
            skillId: { type: String, required: true },
            level: { type: Number, default: 1, min: 1, max: 20 }
        }],
        quests: [{
            questId: { type: String, required: true },
            status: { type: String, enum: ['active', 'completed', 'failed'], default: 'active' },
            progress: { type: Number, default: 0 }
        }]
    },
    achievements: [{
        achievementId: { type: String, required: true },
        unlockedAt: { type: Date, default: Date.now }
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    guild: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guild',
        default: null
    },
    settings: {
        sound: { type: Boolean, default: true },
        music: { type: Boolean, default: true },
        notifications: { type: Boolean, default: true },
        privateMessages: { type: Boolean, default: true }
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    lastOnline: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bannedUntil: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Index for faster queries
PlayerSchema.index({ username: 1 });
PlayerSchema.index({ email: 1 });
PlayerSchema.index({ 'characterData.level': -1 });
PlayerSchema.index({ isOnline: 1 });

// Hash password before saving
PlayerSchema.pre('save', async function(next) {
    if (!this.isModified('passwordHash')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
PlayerSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.passwordHash);
};

// Method to get public profile
PlayerSchema.methods.getPublicProfile = function() {
    return {
        id: this._id,
        username: this.username,
        characterData: {
            class: this.characterData.class,
            level: this.characterData.level,
            stats: this.characterData.stats
        },
        isOnline: this.isOnline,
        lastOnline: this.lastOnline,
        createdAt: this.createdAt
    };
};

// Virtual for next level XP requirement
PlayerSchema.virtual('characterData.nextLevelXp').get(function() {
    return Math.floor(100 * Math.pow(this.characterData.level, 1.5));
});

// Ensure virtuals are included in JSON
PlayerSchema.set('toJSON', { virtuals: true });
PlayerSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Player', PlayerSchema);
