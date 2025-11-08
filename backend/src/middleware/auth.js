const jwt = require('jsonwebtoken');
const Player = require('../models/Player');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token
        req.user = await Player.findById(decoded.id).select('-passwordHash');

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if user is banned
        if (req.user.bannedUntil && req.user.bannedUntil > Date.now()) {
            return res.status(403).json({
                success: false,
                message: 'Account is banned',
                bannedUntil: req.user.bannedUntil
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

// Generate JWT Token
exports.getSignedJwtToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Send token response
exports.sendTokenResponse = (player, statusCode, res) => {
    // Create token
    const token = exports.getSignedJwtToken(player._id);

    const response = {
        success: true,
        token,
        player: {
            id: player._id,
            username: player.username,
            email: player.email,
            characterData: player.characterData,
            createdAt: player.createdAt
        }
    };

    res.status(statusCode).json(response);
};
