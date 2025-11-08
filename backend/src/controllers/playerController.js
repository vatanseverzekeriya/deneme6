const Player = require('../models/Player');

// @desc    Get player profile
// @route   GET /api/players/:id
// @access  Public
exports.getPlayer = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id).select('-passwordHash');

        if (!player) {
            return res.status(404).json({
                success: false,
                message: 'Player not found'
            });
        }

        res.status(200).json({
            success: true,
            data: player.getPublicProfile()
        });
    } catch (error) {
        console.error('Get player error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update player position
// @route   PUT /api/players/position
// @access  Private
exports.updatePosition = async (req, res) => {
    try {
        const { x, y, map, direction } = req.body;

        const player = await Player.findByIdAndUpdate(
            req.user.id,
            {
                'characterData.position': { x, y, map, direction }
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: player.characterData.position
        });
    } catch (error) {
        console.error('Update position error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update player stats
// @route   PUT /api/players/stats
// @access  Private
exports.updateStats = async (req, res) => {
    try {
        const { stats } = req.body;

        const player = await Player.findByIdAndUpdate(
            req.user.id,
            { 'characterData.stats': stats },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: player.characterData.stats
        });
    } catch (error) {
        console.error('Update stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Level up player
// @route   POST /api/players/levelup
// @access  Private
exports.levelUp = async (req, res) => {
    try {
        const player = await Player.findById(req.user.id);

        if (!player) {
            return res.status(404).json({
                success: false,
                message: 'Player not found'
            });
        }

        // Calculate required XP for next level
        const requiredXp = Math.floor(100 * Math.pow(player.characterData.level, 1.5));

        if (player.characterData.experience < requiredXp) {
            return res.status(400).json({
                success: false,
                message: 'Not enough experience to level up'
            });
        }

        // Level up
        player.characterData.level += 1;
        player.characterData.experience -= requiredXp;
        player.characterData.skillPoints += 3;

        // Increase stats based on class
        const stats = player.characterData.stats;
        switch (player.characterData.class) {
            case 'Warrior':
                stats.maxHp += 20;
                stats.hp = stats.maxHp;
                stats.maxMp += 5;
                stats.mp = stats.maxMp;
                stats.attack += 3;
                stats.defense += 2;
                break;
            case 'Assassin':
                stats.maxHp += 12;
                stats.hp = stats.maxHp;
                stats.maxMp += 7;
                stats.mp = stats.maxMp;
                stats.attack += 2;
                stats.speed += 2;
                break;
            case 'Mage':
                stats.maxHp += 8;
                stats.hp = stats.maxHp;
                stats.maxMp += 15;
                stats.mp = stats.maxMp;
                stats.attack += 2;
                stats.defense += 1;
                break;
            case 'Archer':
                stats.maxHp += 15;
                stats.hp = stats.maxHp;
                stats.maxMp += 8;
                stats.mp = stats.maxMp;
                stats.attack += 3;
                stats.speed += 1;
                break;
        }

        await player.save();

        res.status(200).json({
            success: true,
            message: `Congratulations! You are now level ${player.characterData.level}`,
            data: {
                level: player.characterData.level,
                experience: player.characterData.experience,
                skillPoints: player.characterData.skillPoints,
                stats: player.characterData.stats
            }
        });
    } catch (error) {
        console.error('Level up error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Add experience to player
// @route   POST /api/players/experience
// @access  Private
exports.addExperience = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid experience amount'
            });
        }

        const player = await Player.findById(req.user.id);
        player.characterData.experience += amount;
        await player.save();

        res.status(200).json({
            success: true,
            data: {
                experience: player.characterData.experience,
                level: player.characterData.level
            }
        });
    } catch (error) {
        console.error('Add experience error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get leaderboard
// @route   GET /api/players/leaderboard
// @access  Public
exports.getLeaderboard = async (req, res) => {
    try {
        const { limit = 100, sortBy = 'level' } = req.query;

        let sortField = {};
        switch (sortBy) {
            case 'level':
                sortField = { 'characterData.level': -1, 'characterData.experience': -1 };
                break;
            case 'gold':
                sortField = { 'characterData.gold': -1 };
                break;
            default:
                sortField = { 'characterData.level': -1 };
        }

        const players = await Player.find()
            .select('username characterData.class characterData.level characterData.experience characterData.gold createdAt')
            .sort(sortField)
            .limit(parseInt(limit));

        res.status(200).json({
            success: true,
            count: players.length,
            data: players
        });
    } catch (error) {
        console.error('Get leaderboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get online players
// @route   GET /api/players/online
// @access  Public
exports.getOnlinePlayers = async (req, res) => {
    try {
        const players = await Player.find({ isOnline: true })
            .select('username characterData.class characterData.level characterData.position');

        res.status(200).json({
            success: true,
            count: players.length,
            data: players
        });
    } catch (error) {
        console.error('Get online players error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
