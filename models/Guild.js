const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  tag: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 5,
    uppercase: true
  },
  description: {
    type: String,
    maxlength: 200,
    default: ''
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  officers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  level: {
    type: Number,
    default: 1,
    min: 1,
    max: 10
  },
  experience: {
    type: Number,
    default: 0
  },
  maxMembers: {
    type: Number,
    default: 20
  },
  warehouse: [{
    id: String,
    name: String,
    type: String,
    rarity: String,
    stats: mongoose.Schema.Types.Mixed,
    depositedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    depositedAt: {
      type: Date,
      default: Date.now
    }
  }],
  gold: {
    type: Number,
    default: 0
  },
  quests: [{
    id: String,
    name: String,
    description: String,
    type: {
      type: String,
      enum: ['kill', 'gather', 'dungeon']
    },
    target: String,
    current: {
      type: Number,
      default: 0
    },
    required: Number,
    reward: {
      gold: Number,
      experience: Number,
      items: [mongoose.Schema.Types.Mixed]
    },
    status: {
      type: String,
      enum: ['active', 'completed'],
      default: 'active'
    },
    startedAt: {
      type: Date,
      default: Date.now
    },
    completedAt: Date
  }],
  ranking: {
    pvpWins: {
      type: Number,
      default: 0
    },
    totalMembers: {
      type: Number,
      default: 1
    },
    averageLevel: {
      type: Number,
      default: 1
    },
    points: {
      type: Number,
      default: 0
    },
    rank: {
      type: Number,
      default: 0
    }
  },
  chat: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    senderName: String,
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  settings: {
    joinType: {
      type: String,
      enum: ['open', 'approval', 'invite-only'],
      default: 'approval'
    },
    minLevel: {
      type: Number,
      default: 1
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for total member count
guildSchema.virtual('memberCount').get(function() {
  return 1 + this.officers.length + this.members.length; // leader + officers + members
});

// Method to add chat message (with limit)
guildSchema.methods.addChatMessage = function(sender, senderName, message) {
  this.chat.push({ sender, senderName, message, timestamp: new Date() });

  // Keep only last 100 messages
  if (this.chat.length > 100) {
    this.chat = this.chat.slice(-100);
  }
};

// Method to check if user can deposit to warehouse
guildSchema.methods.canDeposit = function(userId) {
  return this.leader.equals(userId) ||
         this.officers.some(id => id.equals(userId)) ||
         this.members.some(id => id.equals(userId));
};

// Method to check if user can withdraw from warehouse
guildSchema.methods.canWithdraw = function(userId) {
  return this.leader.equals(userId) || this.officers.some(id => id.equals(userId));
};

module.exports = mongoose.model('Guild', guildSchema);
