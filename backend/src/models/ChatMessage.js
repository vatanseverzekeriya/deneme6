const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    senderUsername: {
        type: String,
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        default: null // null for global/party messages
    },
    recipientUsername: {
        type: String,
        default: null
    },
    message: {
        type: String,
        required: [true, 'Message content is required'],
        maxlength: [500, 'Message cannot exceed 500 characters'],
        trim: true
    },
    type: {
        type: String,
        enum: ['global', 'party', 'whisper', 'guild', 'system'],
        default: 'global'
    },
    channel: {
        type: String,
        default: 'general' // general, trade, party, guild, etc.
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 604800 // Auto-delete after 7 days (TTL index)
    }
}, {
    timestamps: true
});

// Indexes for faster queries
ChatMessageSchema.index({ sender: 1, createdAt: -1 });
ChatMessageSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
ChatMessageSchema.index({ type: 1, channel: 1, createdAt: -1 });
ChatMessageSchema.index({ createdAt: 1 }); // TTL index

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
