const ChatMessage = require('../models/ChatMessage');
const Player = require('../models/Player');

// @desc    Send a message
// @route   POST /api/chat/send
// @access  Private
exports.sendMessage = async (req, res) => {
    try {
        const { message, type, channel, recipientUsername } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Message cannot be empty'
            });
        }

        const sender = await Player.findById(req.user.id);

        let recipient = null;
        if (type === 'whisper' && recipientUsername) {
            recipient = await Player.findOne({ username: recipientUsername });

            if (!recipient) {
                return res.status(404).json({
                    success: false,
                    message: 'Recipient not found'
                });
            }

            // Check if recipient has private messages enabled
            if (!recipient.settings.privateMessages) {
                return res.status(403).json({
                    success: false,
                    message: 'Recipient has disabled private messages'
                });
            }
        }

        const chatMessage = await ChatMessage.create({
            sender: sender._id,
            senderUsername: sender.username,
            recipient: recipient ? recipient._id : null,
            recipientUsername: recipient ? recipient.username : null,
            message: message.trim(),
            type: type || 'global',
            channel: channel || 'general'
        });

        res.status(201).json({
            success: true,
            data: chatMessage
        });
    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get chat messages
// @route   GET /api/chat/messages
// @access  Private
exports.getMessages = async (req, res) => {
    try {
        const { type = 'global', channel = 'general', limit = 50 } = req.query;

        let query = {};

        if (type === 'whisper') {
            // Get whispers to/from current user
            query = {
                $or: [
                    { sender: req.user.id, type: 'whisper' },
                    { recipient: req.user.id, type: 'whisper' }
                ]
            };
        } else {
            query = { type, channel };
        }

        const messages = await ChatMessage.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .populate('sender', 'username characterData.class characterData.level')
            .populate('recipient', 'username');

        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages.reverse() // Reverse to get chronological order
        });
    } catch (error) {
        console.error('Get messages error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get unread message count
// @route   GET /api/chat/unread
// @access  Private
exports.getUnreadCount = async (req, res) => {
    try {
        const count = await ChatMessage.countDocuments({
            recipient: req.user.id,
            isRead: false
        });

        res.status(200).json({
            success: true,
            data: { count }
        });
    } catch (error) {
        console.error('Get unread count error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Mark messages as read
// @route   PUT /api/chat/read
// @access  Private
exports.markAsRead = async (req, res) => {
    try {
        const { messageIds } = req.body;

        await ChatMessage.updateMany(
            {
                _id: { $in: messageIds },
                recipient: req.user.id
            },
            { isRead: true }
        );

        res.status(200).json({
            success: true,
            message: 'Messages marked as read'
        });
    } catch (error) {
        console.error('Mark as read error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Delete a message
// @route   DELETE /api/chat/:id
// @access  Private
exports.deleteMessage = async (req, res) => {
    try {
        const message = await ChatMessage.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }

        // Only sender can delete the message
        if (message.sender.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this message'
            });
        }

        await message.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Message deleted'
        });
    } catch (error) {
        console.error('Delete message error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
