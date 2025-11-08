const mongoose = require('mongoose');

const pvpMatchSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['1v1', '3v3'],
    required: true
  },
  status: {
    type: String,
    enum: ['waiting', 'in-progress', 'completed', 'cancelled'],
    default: 'waiting'
  },
  team1: {
    players: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      username: String,
      character: mongoose.Schema.Types.Mixed,
      ready: {
        type: Boolean,
        default: false
      }
    }],
    score: {
      type: Number,
      default: 0
    }
  },
  team2: {
    players: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      username: String,
      character: mongoose.Schema.Types.Mixed,
      ready: {
        type: Boolean,
        default: false
      }
    }],
    score: {
      type: Number,
      default: 0
    }
  },
  winner: {
    type: String,
    enum: ['team1', 'team2', null],
    default: null
  },
  map: {
    type: String,
    default: 'arena'
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  ratingChanges: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    oldRating: Number,
    newRating: Number,
    change: Number
  }],
  events: [{
    type: {
      type: String,
      enum: ['kill', 'death', 'skill-used', 'player-joined', 'player-left']
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    data: mongoose.Schema.Types.Mixed
  }],
  startedAt: Date,
  completedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Method to check if match is full
pvpMatchSchema.methods.isFull = function() {
  const requiredPlayers = this.type === '1v1' ? 1 : 3;
  return this.team1.players.length === requiredPlayers &&
         this.team2.players.length === requiredPlayers;
};

// Method to check if all players are ready
pvpMatchSchema.methods.allPlayersReady = function() {
  const allTeam1Ready = this.team1.players.every(p => p.ready);
  const allTeam2Ready = this.team2.players.every(p => p.ready);
  return allTeam1Ready && allTeam2Ready && this.isFull();
};

// Method to add player to match
pvpMatchSchema.methods.addPlayer = function(userId, username, character) {
  const requiredPlayers = this.type === '1v1' ? 1 : 3;

  if (this.team1.players.length < requiredPlayers) {
    this.team1.players.push({ user: userId, username, character, ready: false });
    return 'team1';
  } else if (this.team2.players.length < requiredPlayers) {
    this.team2.players.push({ user: userId, username, character, ready: false });
    return 'team2';
  }
  return null;
};

// Method to calculate rating changes (ELO-based)
pvpMatchSchema.methods.calculateRatingChanges = function() {
  const K = 32; // K-factor for ELO calculation

  // Calculate average ratings for each team
  const team1AvgRating = this.team1.players.reduce((sum, p) => sum + (p.character.pvpRating || 1000), 0) / this.team1.players.length;
  const team2AvgRating = this.team2.players.reduce((sum, p) => sum + (p.character.pvpRating || 1000), 0) / this.team2.players.length;

  // Expected scores
  const expectedTeam1 = 1 / (1 + Math.pow(10, (team2AvgRating - team1AvgRating) / 400));
  const expectedTeam2 = 1 / (1 + Math.pow(10, (team1AvgRating - team2AvgRating) / 400));

  // Actual scores
  const actualTeam1 = this.winner === 'team1' ? 1 : 0;
  const actualTeam2 = this.winner === 'team2' ? 1 : 0;

  // Calculate changes for each player
  const changes = [];

  this.team1.players.forEach(player => {
    const oldRating = player.character.pvpRating || 1000;
    const change = Math.round(K * (actualTeam1 - expectedTeam1));
    const newRating = Math.max(0, oldRating + change);
    changes.push({
      user: player.user,
      oldRating,
      newRating,
      change
    });
  });

  this.team2.players.forEach(player => {
    const oldRating = player.character.pvpRating || 1000;
    const change = Math.round(K * (actualTeam2 - expectedTeam2));
    const newRating = Math.max(0, oldRating + change);
    changes.push({
      user: player.user,
      oldRating,
      newRating,
      change
    });
  });

  this.ratingChanges = changes;
  return changes;
};

module.exports = mongoose.model('PvPMatch', pvpMatchSchema);
