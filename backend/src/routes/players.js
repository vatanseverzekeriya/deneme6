const express = require('express');
const router = express.Router();
const {
    getPlayer,
    updatePosition,
    updateStats,
    levelUp,
    addExperience,
    getLeaderboard,
    getOnlinePlayers
} = require('../controllers/playerController');
const { protect } = require('../middleware/auth');

router.get('/leaderboard', getLeaderboard);
router.get('/online', getOnlinePlayers);
router.get('/:id', getPlayer);
router.put('/position', protect, updatePosition);
router.put('/stats', protect, updateStats);
router.post('/levelup', protect, levelUp);
router.post('/experience', protect, addExperience);

module.exports = router;
