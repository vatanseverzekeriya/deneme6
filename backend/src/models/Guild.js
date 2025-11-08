const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Guild name is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Guild name must be at least 3 characters'],
        maxlength: [30, 'Guild name cannot exceed 30 characters']
    },
    tag: {
        type: String,
        required: [true, 'Guild tag is required'],
        unique: true,
        uppercase: true,
        trim: true,
        minlength: [2, 'Guild tag must be at least 2 characters'],
        maxlength: [5, 'Guild tag cannot exceed 5 characters']
    },
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    members: [{
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        },
        rank: {
            type: String,
            enum: ['Leader', 'Officer', 'Member'],
            default: 'Member'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],
    level: {
        type: Number,
        default: 1,
        min: 1,
        max: 20
    },
    experience: {
        type: Number,
        default: 0,
        min: 0
    },
    description: {
        type: String,
        maxlength: [200, 'Description cannot exceed 200 characters'],
        default: ''
    },
    treasury: {
        type: Number,
        default: 0,
        min: 0
    },
    maxMembers: {
        type: Number,
        default: 20
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
GuildSchema.index({ name: 1 });
GuildSchema.index({ tag: 1 });
GuildSchema.index({ level: -1 });

module.exports = mongoose.model('Guild', GuildSchema);
