// Guild Quest Templates
const questTemplates = {
  kill: [
    {
      name: 'Monster Hunter',
      description: 'Defeat 100 enemies as a guild',
      target: 'any_enemy',
      required: 100,
      reward: {
        gold: 1000,
        experience: 500,
        items: []
      }
    },
    {
      name: 'Elite Slayer',
      description: 'Defeat 50 elite enemies as a guild',
      target: 'elite_enemy',
      required: 50,
      reward: {
        gold: 2000,
        experience: 1000,
        items: []
      }
    }
  ],
  gather: [
    {
      name: 'Resource Collector',
      description: 'Collect 200 resources as a guild',
      target: 'any_resource',
      required: 200,
      reward: {
        gold: 800,
        experience: 400,
        items: []
      }
    }
  ],
  dungeon: [
    {
      name: 'Dungeon Crawler',
      description: 'Complete 10 dungeons as a guild',
      target: 'any_dungeon',
      required: 10,
      reward: {
        gold: 5000,
        experience: 2500,
        items: []
      }
    }
  ]
};

// Generate a random quest for a guild
function generateRandomQuest() {
  const types = Object.keys(questTemplates);
  const randomType = types[Math.floor(Math.random() * types.length)];
  const quests = questTemplates[randomType];
  const randomQuest = quests[Math.floor(Math.random() * quests.length)];

  return {
    id: generateQuestId(),
    type: randomType,
    ...randomQuest,
    current: 0,
    status: 'active'
  };
}

// Generate unique quest ID
function generateQuestId() {
  return `quest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Update quest progress
async function updateQuestProgress(guild, questId, amount = 1) {
  const quest = guild.quests.find(q => q.id === questId);

  if (!quest || quest.status !== 'active') {
    return false;
  }

  quest.current = Math.min(quest.current + amount, quest.required);

  if (quest.current >= quest.required) {
    quest.status = 'completed';
    quest.completedAt = new Date();

    // Award rewards
    guild.gold += quest.reward.gold;
    guild.experience += quest.reward.experience;

    // Check for guild level up
    const xpNeeded = guild.level * 1000;
    if (guild.experience >= xpNeeded) {
      guild.level += 1;
      guild.experience -= xpNeeded;
      guild.maxMembers += 5; // Increase max members on level up
    }

    return {
      completed: true,
      quest,
      leveledUp: guild.experience < xpNeeded
    };
  }

  return {
    completed: false,
    quest
  };
}

// Add new random quest to guild
async function addRandomQuestToGuild(guild) {
  // Maximum 5 active quests at a time
  const activeQuests = guild.quests.filter(q => q.status === 'active');

  if (activeQuests.length >= 5) {
    return null;
  }

  const newQuest = generateRandomQuest();
  guild.quests.push(newQuest);

  return newQuest;
}

// Clean up completed quests (keep only last 10)
function cleanupCompletedQuests(guild) {
  const completedQuests = guild.quests
    .filter(q => q.status === 'completed')
    .sort((a, b) => b.completedAt - a.completedAt);

  if (completedQuests.length > 10) {
    const questsToRemove = completedQuests.slice(10);
    guild.quests = guild.quests.filter(
      q => !questsToRemove.some(r => r.id === q.id)
    );
  }
}

module.exports = {
  questTemplates,
  generateRandomQuest,
  updateQuestProgress,
  addRandomQuestToGuild,
  cleanupCompletedQuests
};
