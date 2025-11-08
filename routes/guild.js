const express = require('express');
const Guild = require('../models/Guild');
const User = require('../models/User');
const {
  generateRandomQuest,
  updateQuestProgress,
  addRandomQuestToGuild,
  cleanupCompletedQuests
} = require('../utils/guildQuests');

const router = express.Router();

// Create a new guild
router.post('/create', async (req, res) => {
  try {
    const { name, tag, description } = req.body;
    const userId = req.user.userId;

    // Validation
    if (!name || !tag) {
      return res.status(400).json({ error: 'Guild name and tag are required' });
    }

    if (name.length < 3 || name.length > 20) {
      return res.status(400).json({ error: 'Guild name must be 3-20 characters' });
    }

    if (tag.length < 2 || tag.length > 5) {
      return res.status(400).json({ error: 'Guild tag must be 2-5 characters' });
    }

    // Check if user is already in a guild
    const user = await User.findById(userId);
    if (user.guild) {
      return res.status(400).json({ error: 'You are already in a guild' });
    }

    // Check if guild name or tag already exists
    const existingGuild = await Guild.findOne({
      $or: [{ name }, { tag: tag.toUpperCase() }]
    });

    if (existingGuild) {
      return res.status(400).json({
        error: existingGuild.name === name ?
          'Guild name already taken' : 'Guild tag already taken'
      });
    }

    // Create guild
    const guild = new Guild({
      name,
      tag: tag.toUpperCase(),
      description: description || '',
      leader: userId,
      officers: [],
      members: []
    });

    await guild.save();

    // Update user
    user.guild = guild._id;
    user.guildRank = 'leader';
    await user.save();

    res.status(201).json({
      message: 'Guild created successfully',
      guild
    });

  } catch (error) {
    console.error('Guild creation error:', error);
    res.status(500).json({ error: 'Server error creating guild' });
  }
});

// Get guild info
router.get('/:guildId', async (req, res) => {
  try {
    const guild = await Guild.findById(req.params.guildId)
      .populate('leader', 'username character.level character.class')
      .populate('officers', 'username character.level character.class')
      .populate('members', 'username character.level character.class');

    if (!guild) {
      return res.status(404).json({ error: 'Guild not found' });
    }

    res.json(guild);
  } catch (error) {
    console.error('Guild fetch error:', error);
    res.status(500).json({ error: 'Server error fetching guild' });
  }
});

// Get user's guild
router.get('/my/guild', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user.guild) {
      return res.status(404).json({ error: 'You are not in a guild' });
    }

    const guild = await Guild.findById(user.guild)
      .populate('leader', 'username character.level character.class online')
      .populate('officers', 'username character.level character.class online')
      .populate('members', 'username character.level character.class online');

    res.json(guild);
  } catch (error) {
    console.error('Guild fetch error:', error);
    res.status(500).json({ error: 'Server error fetching guild' });
  }
});

// Invite player to guild
router.post('/invite', async (req, res) => {
  try {
    const { username } = req.body;
    const userId = req.user.userId;

    const inviter = await User.findById(userId);
    if (!inviter.guild) {
      return res.status(400).json({ error: 'You are not in a guild' });
    }

    const guild = await Guild.findById(inviter.guild);

    // Check if inviter has permission (leader or officer)
    if (!guild.leader.equals(userId) && !guild.officers.some(id => id.equals(userId))) {
      return res.status(403).json({ error: 'Only leaders and officers can invite' });
    }

    // Find target user
    const targetUser = await User.findOne({ username });
    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (targetUser.guild) {
      return res.status(400).json({ error: 'User is already in a guild' });
    }

    // Check if guild is full
    if (guild.memberCount >= guild.maxMembers) {
      return res.status(400).json({ error: 'Guild is full' });
    }

    // In a real implementation, this would send an invitation
    // For now, we'll directly add the user
    guild.members.push(targetUser._id);
    await guild.save();

    targetUser.guild = guild._id;
    targetUser.guildRank = 'member';
    await targetUser.save();

    res.json({
      message: `${username} has been added to the guild`,
      guild
    });

  } catch (error) {
    console.error('Guild invite error:', error);
    res.status(500).json({ error: 'Server error inviting player' });
  }
});

// Leave guild
router.post('/leave', async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user.guild) {
      return res.status(400).json({ error: 'You are not in a guild' });
    }

    const guild = await Guild.findById(user.guild);

    // Leader cannot leave (must transfer leadership or disband)
    if (guild.leader.equals(userId)) {
      return res.status(400).json({
        error: 'Guild leader cannot leave. Transfer leadership or disband the guild.'
      });
    }

    // Remove user from guild
    guild.officers = guild.officers.filter(id => !id.equals(userId));
    guild.members = guild.members.filter(id => !id.equals(userId));
    await guild.save();

    // Update user
    user.guild = null;
    user.guildRank = null;
    await user.save();

    res.json({ message: 'You have left the guild' });

  } catch (error) {
    console.error('Guild leave error:', error);
    res.status(500).json({ error: 'Server error leaving guild' });
  }
});

// Kick member
router.post('/kick', async (req, res) => {
  try {
    const { username } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user.guild) {
      return res.status(400).json({ error: 'You are not in a guild' });
    }

    const guild = await Guild.findById(user.guild);

    // Check if user has permission (only leader can kick)
    if (!guild.leader.equals(userId)) {
      return res.status(403).json({ error: 'Only the guild leader can kick members' });
    }

    // Find target user
    const targetUser = await User.findOne({ username });
    if (!targetUser || !targetUser.guild || !targetUser.guild.equals(guild._id)) {
      return res.status(404).json({ error: 'User not found in this guild' });
    }

    if (guild.leader.equals(targetUser._id)) {
      return res.status(400).json({ error: 'Cannot kick the guild leader' });
    }

    // Remove user from guild
    guild.officers = guild.officers.filter(id => !id.equals(targetUser._id));
    guild.members = guild.members.filter(id => !id.equals(targetUser._id));
    await guild.save();

    // Update target user
    targetUser.guild = null;
    targetUser.guildRank = null;
    await targetUser.save();

    res.json({ message: `${username} has been kicked from the guild` });

  } catch (error) {
    console.error('Guild kick error:', error);
    res.status(500).json({ error: 'Server error kicking member' });
  }
});

// Promote member to officer
router.post('/promote', async (req, res) => {
  try {
    const { username } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user.guild) {
      return res.status(400).json({ error: 'You are not in a guild' });
    }

    const guild = await Guild.findById(user.guild);

    // Only leader can promote
    if (!guild.leader.equals(userId)) {
      return res.status(403).json({ error: 'Only the guild leader can promote members' });
    }

    // Find target user
    const targetUser = await User.findOne({ username });
    if (!targetUser || !targetUser.guild || !targetUser.guild.equals(guild._id)) {
      return res.status(404).json({ error: 'User not found in this guild' });
    }

    if (targetUser.guildRank !== 'member') {
      return res.status(400).json({ error: 'User is not a regular member' });
    }

    // Promote to officer
    guild.members = guild.members.filter(id => !id.equals(targetUser._id));
    guild.officers.push(targetUser._id);
    await guild.save();

    targetUser.guildRank = 'officer';
    await targetUser.save();

    res.json({ message: `${username} has been promoted to officer` });

  } catch (error) {
    console.error('Guild promote error:', error);
    res.status(500).json({ error: 'Server error promoting member' });
  }
});

// Demote officer to member
router.post('/demote', async (req, res) => {
  try {
    const { username } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user.guild) {
      return res.status(400).json({ error: 'You are not in a guild' });
    }

    const guild = await Guild.findById(user.guild);

    // Only leader can demote
    if (!guild.leader.equals(userId)) {
      return res.status(403).json({ error: 'Only the guild leader can demote officers' });
    }

    // Find target user
    const targetUser = await User.findOne({ username });
    if (!targetUser || !targetUser.guild || !targetUser.guild.equals(guild._id)) {
      return res.status(404).json({ error: 'User not found in this guild' });
    }

    if (targetUser.guildRank !== 'officer') {
      return res.status(400).json({ error: 'User is not an officer' });
    }

    // Demote to member
    guild.officers = guild.officers.filter(id => !id.equals(targetUser._id));
    guild.members.push(targetUser._id);
    await guild.save();

    targetUser.guildRank = 'member';
    await targetUser.save();

    res.json({ message: `${username} has been demoted to member` });

  } catch (error) {
    console.error('Guild demote error:', error);
    res.status(500).json({ error: 'Server error demoting officer' });
  }
});

// Get guild chat history
router.get('/:guildId/chat', async (req, res) => {
  try {
    const guild = await Guild.findById(req.params.guildId);
    if (!guild) {
      return res.status(404).json({ error: 'Guild not found' });
    }

    // Check if user is member
    const userId = req.user.userId;
    if (!guild.leader.equals(userId) &&
        !guild.officers.some(id => id.equals(userId)) &&
        !guild.members.some(id => id.equals(userId))) {
      return res.status(403).json({ error: 'You are not a member of this guild' });
    }

    res.json({ chat: guild.chat.slice(-50) }); // Last 50 messages
  } catch (error) {
    console.error('Guild chat fetch error:', error);
    res.status(500).json({ error: 'Server error fetching chat' });
  }
});

// Send chat message
router.post('/:guildId/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.userId;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    const guild = await Guild.findById(req.params.guildId);
    if (!guild) {
      return res.status(404).json({ error: 'Guild not found' });
    }

    // Check if user is member
    if (!guild.leader.equals(userId) &&
        !guild.officers.some(id => id.equals(userId)) &&
        !guild.members.some(id => id.equals(userId))) {
      return res.status(403).json({ error: 'You are not a member of this guild' });
    }

    const user = await User.findById(userId);
    guild.addChatMessage(userId, user.username, message.trim());
    await guild.save();

    res.json({
      message: 'Message sent',
      chat: guild.chat.slice(-1)[0]
    });

  } catch (error) {
    console.error('Guild chat error:', error);
    res.status(500).json({ error: 'Server error sending message' });
  }
});

// Guild warehouse - deposit item
router.post('/:guildId/warehouse/deposit', async (req, res) => {
  try {
    const { item } = req.body;
    const userId = req.user.userId;

    const guild = await Guild.findById(req.params.guildId);
    if (!guild) {
      return res.status(404).json({ error: 'Guild not found' });
    }

    if (!guild.canDeposit(userId)) {
      return res.status(403).json({ error: 'You are not a member of this guild' });
    }

    // Add item to warehouse
    guild.warehouse.push({
      ...item,
      depositedBy: userId,
      depositedAt: new Date()
    });
    await guild.save();

    res.json({
      message: 'Item deposited to guild warehouse',
      warehouse: guild.warehouse
    });

  } catch (error) {
    console.error('Warehouse deposit error:', error);
    res.status(500).json({ error: 'Server error depositing item' });
  }
});

// Guild warehouse - withdraw item
router.post('/:guildId/warehouse/withdraw', async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.user.userId;

    const guild = await Guild.findById(req.params.guildId);
    if (!guild) {
      return res.status(404).json({ error: 'Guild not found' });
    }

    if (!guild.canWithdraw(userId)) {
      return res.status(403).json({ error: 'Only leaders and officers can withdraw items' });
    }

    // Find and remove item
    const itemIndex = guild.warehouse.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in warehouse' });
    }

    const item = guild.warehouse[itemIndex];
    guild.warehouse.splice(itemIndex, 1);
    await guild.save();

    res.json({
      message: 'Item withdrawn from guild warehouse',
      item,
      warehouse: guild.warehouse
    });

  } catch (error) {
    console.error('Warehouse withdraw error:', error);
    res.status(500).json({ error: 'Server error withdrawing item' });
  }
});

// Get guild warehouse
router.get('/:guildId/warehouse', async (req, res) => {
  try {
    const userId = req.user.userId;
    const guild = await Guild.findById(req.params.guildId);

    if (!guild) {
      return res.status(404).json({ error: 'Guild not found' });
    }

    if (!guild.canDeposit(userId)) {
      return res.status(403).json({ error: 'You are not a member of this guild' });
    }

    res.json({ warehouse: guild.warehouse });
  } catch (error) {
    console.error('Warehouse fetch error:', error);
    res.status(500).json({ error: 'Server error fetching warehouse' });
  }
});

// Get all guilds (for browsing)
router.get('/list/all', async (req, res) => {
  try {
    const guilds = await Guild.find()
      .populate('leader', 'username character.level')
      .select('name tag description level memberCount ranking')
      .sort({ 'ranking.points': -1 })
      .limit(50);

    res.json(guilds);
  } catch (error) {
    console.error('Guild list error:', error);
    res.status(500).json({ error: 'Server error fetching guilds' });
  }
});

// Guild Quests
// Get guild quests
router.get('/:guildId/quests', async (req, res) => {
  try {
    const userId = req.user.userId;
    const guild = await Guild.findById(req.params.guildId);

    if (!guild) {
      return res.status(404).json({ error: 'Guild not found' });
    }

    if (!guild.canDeposit(userId)) {
      return res.status(403).json({ error: 'You are not a member of this guild' });
    }

    res.json({
      activeQuests: guild.quests.filter(q => q.status === 'active'),
      completedQuests: guild.quests.filter(q => q.status === 'completed').slice(-10)
    });
  } catch (error) {
    console.error('Quest fetch error:', error);
    res.status(500).json({ error: 'Server error fetching quests' });
  }
});

// Add new random quest
router.post('/:guildId/quests/add', async (req, res) => {
  try {
    const userId = req.user.userId;
    const guild = await Guild.findById(req.params.guildId);

    if (!guild) {
      return res.status(404).json({ error: 'Guild not found' });
    }

    // Only leader can add quests
    if (!guild.leader.equals(userId)) {
      return res.status(403).json({ error: 'Only guild leader can add quests' });
    }

    const newQuest = await addRandomQuestToGuild(guild);

    if (!newQuest) {
      return res.status(400).json({ error: 'Maximum 5 active quests at a time' });
    }

    cleanupCompletedQuests(guild);
    await guild.save();

    res.json({
      message: 'New quest added',
      quest: newQuest
    });
  } catch (error) {
    console.error('Quest add error:', error);
    res.status(500).json({ error: 'Server error adding quest' });
  }
});

// Update quest progress
router.post('/:guildId/quests/:questId/progress', async (req, res) => {
  try {
    const { amount = 1 } = req.body;
    const userId = req.user.userId;
    const guild = await Guild.findById(req.params.guildId);

    if (!guild) {
      return res.status(404).json({ error: 'Guild not found' });
    }

    if (!guild.canDeposit(userId)) {
      return res.status(403).json({ error: 'You are not a member of this guild' });
    }

    const result = await updateQuestProgress(guild, req.params.questId, amount);

    if (!result) {
      return res.status(404).json({ error: 'Quest not found or already completed' });
    }

    await guild.save();

    res.json({
      message: result.completed ? 'Quest completed!' : 'Quest progress updated',
      ...result,
      guild: {
        level: guild.level,
        experience: guild.experience,
        gold: guild.gold
      }
    });
  } catch (error) {
    console.error('Quest progress error:', error);
    res.status(500).json({ error: 'Server error updating quest progress' });
  }
});

module.exports = router;
