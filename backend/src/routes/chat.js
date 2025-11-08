const express = require('express');
const router = express.Router();
const {
    sendMessage,
    getMessages,
    getUnreadCount,
    markAsRead,
    deleteMessage
} = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

router.post('/send', protect, sendMessage);
router.get('/messages', protect, getMessages);
router.get('/unread', protect, getUnreadCount);
router.put('/read', protect, markAsRead);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
