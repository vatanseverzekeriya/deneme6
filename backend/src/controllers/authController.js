const Player = require('../models/Player');
const { sendTokenResponse } = require('../middleware/auth');

// @desc    Register new player
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { username, email, password, characterClass } = req.body;

        // Validation
        if (!username || !email || !password || !characterClass) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Check if user already exists
        const existingPlayer = await Player.findOne({
            $or: [{ username }, { email }]
        });

        if (existingPlayer) {
            return res.status(400).json({
                success: false,
                message: 'Username or email already exists'
            });
        }

        // Validate character class
        const validClasses = ['Warrior', 'Assassin', 'Mage', 'Archer'];
        if (!validClasses.includes(characterClass)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid character class'
            });
        }

        // Set initial stats based on class
        const classStats = {
            Warrior: {
                hp: 150, maxHp: 150, mp: 30, maxMp: 30,
                attack: 15, defense: 10, speed: 80,
                strength: 15, dexterity: 8, intelligence: 5, vitality: 15
            },
            Assassin: {
                hp: 100, maxHp: 100, mp: 40, maxMp: 40,
                attack: 12, defense: 6, speed: 120,
                strength: 10, dexterity: 15, intelligence: 8, vitality: 10
            },
            Mage: {
                hp: 80, maxHp: 80, mp: 100, maxMp: 100,
                attack: 8, defense: 5, speed: 90,
                strength: 5, dexterity: 8, intelligence: 18, vitality: 8
            },
            Archer: {
                hp: 110, maxHp: 110, mp: 50, maxMp: 50,
                attack: 13, defense: 7, speed: 110,
                strength: 10, dexterity: 14, intelligence: 10, vitality: 10
            }
        };

        // Create player
        const player = await Player.create({
            username,
            email,
            passwordHash: password, // Will be hashed by pre-save middleware
            characterData: {
                class: characterClass,
                level: 1,
                experience: 0,
                stats: classStats[characterClass],
                position: {
                    x: 400,
                    y: 300,
                    map: 'town',
                    direction: 'down'
                },
                inventory: [],
                gold: 1000,
                skillPoints: 0,
                skills: [],
                quests: []
            }
        });

        sendTokenResponse(player, 201, res);
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration',
            error: error.message
        });
    }
};

// @desc    Login player
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide username and password'
            });
        }

        // Find player (include password for comparison)
        const player = await Player.findOne({ username }).select('+passwordHash');

        if (!player) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check if password matches
        const isMatch = await player.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check if banned
        if (player.bannedUntil && player.bannedUntil > Date.now()) {
            return res.status(403).json({
                success: false,
                message: 'Account is banned',
                bannedUntil: player.bannedUntil
            });
        }

        // Update last online
        player.lastOnline = Date.now();
        player.isOnline = true;
        await player.save();

        sendTokenResponse(player, 200, res);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login',
            error: error.message
        });
    }
};

// @desc    Get current logged in player
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const player = await Player.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: player
        });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Logout player
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
    try {
        // Update player online status
        await Player.findByIdAndUpdate(req.user.id, {
            isOnline: false,
            lastOnline: Date.now()
        });

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during logout',
            error: error.message
        });
    }
};
