const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  character: {
    class: {
      type: String,
      enum: ['warrior', 'ninja', 'shaman', 'sura'],
      required: true
    },
    level: {
      type: Number,
      default: 1
    },
    experience: {
      type: Number,
      default: 0
    },
    gold: {
      type: Number,
      default: 100
    },
    stats: {
      maxHp: Number,
      maxMp: Number,
      damage: Number,
      defense: Number,
      speed: Number
    },
    position: {
      x: Number,
      y: Number
    },
    inventory: [{
      id: String,
      name: String,
      type: String,
      rarity: String,
      stats: mongoose.Schema.Types.Mixed
    }],
    equipment: {
      weapon: mongoose.Schema.Types.Mixed,
      armor: mongoose.Schema.Types.Mixed,
      helmet: mongoose.Schema.Types.Mixed,
      boots: mongoose.Schema.Types.Mixed,
      accessory: mongoose.Schema.Types.Mixed
    }
  },
  guild: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guild',
    default: null
  },
  guildRank: {
    type: String,
    enum: ['leader', 'officer', 'member'],
    default: null
  },
  pvp: {
    rating: {
      type: Number,
      default: 1000
    },
    wins: {
      type: Number,
      default: 0
    },
    losses: {
      type: Number,
      default: 0
    },
    totalMatches: {
      type: Number,
      default: 0
    },
    rank: {
      type: Number,
      default: 0
    }
  },
  online: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile (no sensitive data)
userSchema.methods.toPublicProfile = function() {
  return {
    id: this._id,
    username: this.username,
    character: this.character,
    guild: this.guild,
    guildRank: this.guildRank,
    pvp: this.pvp,
    online: this.online
  };
};

module.exports = mongoose.model('User', userSchema);
