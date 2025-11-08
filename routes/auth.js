const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, characterClass } = req.body;

    // Validation
    if (!username || !email || !password || !characterClass) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({ error: 'Username must be 3-20 characters' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const validClasses = ['warrior', 'ninja', 'shaman', 'sura'];
    if (!validClasses.includes(characterClass)) {
      return res.status(400).json({ error: 'Invalid character class' });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({
        error: existingUser.username === username ?
          'Username already taken' : 'Email already registered'
      });
    }

    // Create character stats based on class
    const classStats = {
      warrior: { maxHp: 150, maxMp: 50, damage: 15, defense: 12, speed: 3 },
      ninja: { maxHp: 100, maxMp: 80, damage: 18, defense: 8, speed: 5 },
      shaman: { maxHp: 80, maxMp: 150, damage: 12, defense: 6, speed: 4 },
      sura: { maxHp: 120, maxMp: 100, damage: 16, defense: 10, speed: 4 }
    };

    // Create new user
    const user = new User({
      username,
      email,
      password,
      character: {
        class: characterClass,
        level: 1,
        experience: 0,
        gold: 100,
        stats: classStats[characterClass],
        position: { x: 400, y: 300 },
        inventory: [],
        equipment: {}
      }
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: user.toPublicProfile()
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update online status and last login
    user.online = true;
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: user.toPublicProfile()
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Logout
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.userId, { online: false });
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Server error during logout' });
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('guild');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.toPublicProfile());
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Server error fetching profile' });
  }
});

// Update character data
router.put('/character', authenticateToken, async (req, res) => {
  try {
    const { level, experience, gold, stats, position, inventory, equipment } = req.body;

    const updateData = {};
    if (level !== undefined) updateData['character.level'] = level;
    if (experience !== undefined) updateData['character.experience'] = experience;
    if (gold !== undefined) updateData['character.gold'] = gold;
    if (stats) updateData['character.stats'] = stats;
    if (position) updateData['character.position'] = position;
    if (inventory) updateData['character.inventory'] = inventory;
    if (equipment) updateData['character.equipment'] = equipment;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updateData },
      { new: true }
    );

    res.json({
      message: 'Character updated',
      character: user.character
    });

  } catch (error) {
    console.error('Character update error:', error);
    res.status(500).json({ error: 'Server error updating character' });
  }
});

module.exports = { router, authenticateToken };
