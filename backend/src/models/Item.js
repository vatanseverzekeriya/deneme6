const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Item name is required'],
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        enum: ['weapon', 'armor', 'helmet', 'boots', 'accessory', 'consumable', 'material', 'quest'],
        required: true
    },
    rarity: {
        type: String,
        enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
        default: 'common'
    },
    level: {
        type: Number,
        default: 1,
        min: 1
    },
    stats: {
        attack: { type: Number, default: 0 },
        defense: { type: Number, default: 0 },
        hp: { type: Number, default: 0 },
        mp: { type: Number, default: 0 },
        speed: { type: Number, default: 0 },
        strength: { type: Number, default: 0 },
        dexterity: { type: Number, default: 0 },
        intelligence: { type: Number, default: 0 },
        vitality: { type: Number, default: 0 }
    },
    price: {
        buy: { type: Number, default: 0 },
        sell: { type: Number, default: 0 }
    },
    stackable: {
        type: Boolean,
        default: false
    },
    maxStack: {
        type: Number,
        default: 1
    },
    tradeable: {
        type: Boolean,
        default: true
    },
    requirements: {
        level: { type: Number, default: 1 },
        class: { type: [String], default: [] },
        strength: { type: Number, default: 0 },
        dexterity: { type: Number, default: 0 },
        intelligence: { type: Number, default: 0 }
    },
    effects: [{
        type: { type: String }, // heal, buff, debuff, etc.
        value: { type: Number },
        duration: { type: Number } // in seconds
    }],
    sprite: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Index for faster queries
ItemSchema.index({ itemId: 1 });
ItemSchema.index({ type: 1, rarity: 1 });
ItemSchema.index({ level: 1 });

module.exports = mongoose.model('Item', ItemSchema);
