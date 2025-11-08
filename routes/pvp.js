const express = require('express');
const PvPMatch = require('../models/PvPMatch');
const User = require('../models/User');

const router = express.Router();

// Queue for matchmaking
const matchmakingQueue = {
  '1v1': [],
  '3v3': []
};

// Join matchmaking queue
router.post('/queue/join', async (req, res) => {
  try {
    const { matchType } = req.body; // '1v1' or '3v3'
    const userId = req.user.userId;

    if (!['1v1', '3v3'].includes(matchType)) {
      return res.status(400).json({ error: 'Invalid match type. Must be 1v1 or 3v3' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if already in queue
    const alreadyInQueue = matchmakingQueue[matchType].some(p => p.userId === userId);
    if (alreadyInQueue) {
      return res.status(400).json({ error: 'Already in matchmaking queue' });
    }

    // Add to queue
    const queueEntry = {
      userId,
      username: user.username,
      character: user.character,
      rating: user.pvp.rating,
      joinedAt: Date.now()
    };

    matchmakingQueue[matchType].push(queueEntry);

    // Try to create a match
    const match = await tryCreateMatch(matchType);

    if (match) {
      res.json({
        message: 'Match found!',
        matchId: match._id,
        match
      });
    } else {
      res.json({
        message: 'Joined matchmaking queue',
        queuePosition: matchmakingQueue[matchType].length,
        estimatedWaitTime: estimateWaitTime(matchType)
      });
    }

  } catch (error) {
    console.error('Queue join error:', error);
    res.status(500).json({ error: 'Server error joining queue' });
  }
});

// Leave matchmaking queue
router.post('/queue/leave', async (req, res) => {
  try {
    const { matchType } = req.body;
    const userId = req.user.userId;

    if (!['1v1', '3v3'].includes(matchType)) {
      return res.status(400).json({ error: 'Invalid match type' });
    }

    matchmakingQueue[matchType] = matchmakingQueue[matchType].filter(
      p => p.userId !== userId
    );

    res.json({ message: 'Left matchmaking queue' });

  } catch (error) {
    console.error('Queue leave error:', error);
    res.status(500).json({ error: 'Server error leaving queue' });
  }
});

// Get queue status
router.get('/queue/status/:matchType', async (req, res) => {
  try {
    const { matchType } = req.params;

    if (!['1v1', '3v3'].includes(matchType)) {
      return res.status(400).json({ error: 'Invalid match type' });
    }

    res.json({
      queueSize: matchmakingQueue[matchType].length,
      estimatedWaitTime: estimateWaitTime(matchType)
    });

  } catch (error) {
    console.error('Queue status error:', error);
    res.status(500).json({ error: 'Server error getting queue status' });
  }
});

// Get match details
router.get('/match/:matchId', async (req, res) => {
  try {
    const match = await PvPMatch.findById(req.params.matchId);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    res.json(match);
  } catch (error) {
    console.error('Match fetch error:', error);
    res.status(500).json({ error: 'Server error fetching match' });
  }
});

// Mark player as ready
router.post('/match/:matchId/ready', async (req, res) => {
  try {
    const userId = req.user.userId;
    const match = await PvPMatch.findById(req.params.matchId);

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    if (match.status !== 'waiting') {
      return res.status(400).json({ error: 'Match is not in waiting state' });
    }

    // Find player and mark as ready
    let found = false;
    match.team1.players.forEach(p => {
      if (p.user.equals(userId)) {
        p.ready = true;
        found = true;
      }
    });

    match.team2.players.forEach(p => {
      if (p.user.equals(userId)) {
        p.ready = true;
        found = true;
      }
    });

    if (!found) {
      return res.status(404).json({ error: 'Player not in this match' });
    }

    // Check if all players are ready
    if (match.allPlayersReady()) {
      match.status = 'in-progress';
      match.startedAt = new Date();
    }

    await match.save();

    res.json({
      message: 'Marked as ready',
      match,
      allReady: match.allPlayersReady()
    });

  } catch (error) {
    console.error('Ready error:', error);
    res.status(500).json({ error: 'Server error marking as ready' });
  }
});

// Complete match (report winner)
router.post('/match/:matchId/complete', async (req, res) => {
  try {
    const { winner } = req.body; // 'team1' or 'team2'
    const match = await PvPMatch.findById(req.params.matchId);

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    if (match.status !== 'in-progress') {
      return res.status(400).json({ error: 'Match is not in progress' });
    }

    if (!['team1', 'team2'].includes(winner)) {
      return res.status(400).json({ error: 'Invalid winner. Must be team1 or team2' });
    }

    // Complete match
    match.status = 'completed';
    match.winner = winner;
    match.completedAt = new Date();
    match.duration = Math.floor((match.completedAt - match.startedAt) / 1000);

    // Calculate rating changes
    const ratingChanges = match.calculateRatingChanges();

    // Update all players' ratings
    for (const change of ratingChanges) {
      const user = await User.findById(change.user);
      if (user) {
        user.pvp.rating = change.newRating;
        user.pvp.totalMatches += 1;

        if (winner === 'team1' && match.team1.players.some(p => p.user.equals(user._id))) {
          user.pvp.wins += 1;
        } else if (winner === 'team2' && match.team2.players.some(p => p.user.equals(user._id))) {
          user.pvp.wins += 1;
        } else {
          user.pvp.losses += 1;
        }

        await user.save();
      }
    }

    await match.save();

    res.json({
      message: 'Match completed',
      match,
      ratingChanges
    });

  } catch (error) {
    console.error('Match complete error:', error);
    res.status(500).json({ error: 'Server error completing match' });
  }
});

// Get user's match history
router.get('/matches/history', async (req, res) => {
  try {
    const userId = req.user.userId;
    const limit = parseInt(req.query.limit) || 10;

    const matches = await PvPMatch.find({
      $or: [
        { 'team1.players.user': userId },
        { 'team2.players.user': userId }
      ],
      status: 'completed'
    })
      .sort({ completedAt: -1 })
      .limit(limit);

    res.json(matches);
  } catch (error) {
    console.error('Match history error:', error);
    res.status(500).json({ error: 'Server error fetching match history' });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;

    const users = await User.find({ 'pvp.totalMatches': { $gte: 5 } })
      .select('username character.class character.level pvp')
      .sort({ 'pvp.rating': -1 })
      .limit(limit);

    // Update ranks
    for (let i = 0; i < users.length; i++) {
      users[i].pvp.rank = i + 1;
      await users[i].save();
    }

    res.json(users);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Server error fetching leaderboard' });
  }
});

// Get user's rank
router.get('/rank', async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Count users with higher rating
    const higherRanked = await User.countDocuments({
      'pvp.rating': { $gt: user.pvp.rating },
      'pvp.totalMatches': { $gte: 5 }
    });

    const rank = higherRanked + 1;
    user.pvp.rank = rank;
    await user.save();

    res.json({
      rank,
      rating: user.pvp.rating,
      wins: user.pvp.wins,
      losses: user.pvp.losses,
      totalMatches: user.pvp.totalMatches
    });

  } catch (error) {
    console.error('Rank fetch error:', error);
    res.status(500).json({ error: 'Server error fetching rank' });
  }
});

// Helper function to try creating a match from queue
async function tryCreateMatch(matchType) {
  const requiredPlayers = matchType === '1v1' ? 2 : 6;

  if (matchmakingQueue[matchType].length < requiredPlayers) {
    return null;
  }

  // Sort by rating for better matchmaking
  matchmakingQueue[matchType].sort((a, b) => a.rating - b.rating);

  // Take the required number of players
  const selectedPlayers = matchmakingQueue[matchType].splice(0, requiredPlayers);

  // Create match
  const match = new PvPMatch({
    type: matchType,
    status: 'waiting',
    team1: { players: [], score: 0 },
    team2: { players: [], score: 0 }
  });

  // Assign players to teams (try to balance by rating)
  for (let i = 0; i < selectedPlayers.length; i++) {
    const player = selectedPlayers[i];
    match.addPlayer(player.userId, player.username, player.character);
  }

  await match.save();
  return match;
}

// Helper function to estimate wait time
function estimateWaitTime(matchType) {
  const requiredPlayers = matchType === '1v1' ? 2 : 6;
  const currentQueue = matchmakingQueue[matchType].length;

  if (currentQueue >= requiredPlayers) {
    return '< 1 minute';
  }

  const playersNeeded = requiredPlayers - currentQueue;
  const estimatedMinutes = playersNeeded * 2; // Rough estimate: 2 minutes per player

  if (estimatedMinutes < 5) {
    return `${estimatedMinutes} minutes`;
  } else if (estimatedMinutes < 15) {
    return '5-15 minutes';
  } else {
    return '15+ minutes';
  }
}

module.exports = router;
