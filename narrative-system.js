// NARRATIVE SYSTEM INTEGRATION
// This file handles NPC interactions, quests, and story progression

class NarrativeSystem {
    constructor(game) {
        this.game = game;
        this.activeQuests = [];
        this.completedQuests = [];
        this.currentDialogue = null;
        this.npcsInWorld = [];
        this.currentChapter = 1;
        this.achievements = [];
        this.dialogueHistory = [];

        // Track daily quest resets
        this.lastDailyReset = new Date().toDateString();
    }

    initialize() {
        // Spawn initial NPCs
        this.spawnNPC('elder', 100, 100);
        this.spawnNPC('blacksmith', 200, 150);
        this.spawnNPC('merchant', 300, 100);

        // Auto-start first quest
        this.startQuest('story_1');

        // Check for daily reset
        this.checkDailyReset();
    }

    spawnNPC(npcId, x, y) {
        const npcData = NPCS[npcId];
        if (!npcData) return;

        this.npcsInWorld.push({
            id: npcId,
            x, y,
            size: 40,
            ...npcData,
            hasQuest: npcData.quests && npcData.quests.length > 0,
            questAvailable: this.checkNPCQuests(npcId)
        });
    }

    checkNPCQuests(npcId) {
        const npc = NPCS[npcId];
        if (!npc || !npc.quests) return false;

        return npc.quests.some(questId => {
            const quest = QUESTS[questId];
            if (!quest) return false;

            // Check if quest is already active or completed
            if (this.activeQuests.some(q => q.id === questId)) return false;
            if (this.completedQuests.includes(questId)) return false;

            // Check level requirement
            if (quest.unlockLevel && this.game.player.level < quest.unlockLevel) return false;

            return true;
        });
    }

    startQuest(questId) {
        const questData = QUESTS[questId];
        if (!questData) return;

        const quest = {
            ...questData,
            objectives: questData.objectives.map(obj => ({...obj})),
            startTime: Date.now()
        };

        this.activeQuests.push(quest);
        this.showNotification(`📜 Yeni Görev: ${quest.name}`, 'quest');
        this.updateQuestUI();
    }

    updateQuestProgress(type, target, amount = 1) {
        let questCompleted = false;

        this.activeQuests.forEach(quest => {
            quest.objectives.forEach(obj => {
                // Match objective type and target
                if (obj.type === type && (!obj.target || obj.target === target)) {
                    if (obj.count) {
                        obj.current = Math.min((obj.current || 0) + amount, obj.count);
                        if (obj.current >= obj.count) {
                            obj.completed = true;
                        }
                    } else {
                        obj.completed = true;
                    }
                }
            });

            // Check if all objectives completed
            if (quest.objectives.every(obj => obj.completed) && !quest.readyToComplete) {
                quest.readyToComplete = true;
                questCompleted = true;
                this.showNotification(`✅ Görev Tamamlandı: ${quest.name}`, 'success');
            }
        });

        if (questCompleted) {
            this.updateQuestUI();
        }
    }

    completeQuest(questId) {
        const questIndex = this.activeQuests.findIndex(q => q.id === questId);
        if (questIndex === -1) return;

        const quest = this.activeQuests[questIndex];
        if (!quest.readyToComplete) return;

        // Give rewards
        if (quest.rewards) {
            if (quest.rewards.xp) {
                this.game.player.xp += quest.rewards.xp;
                this.showNotification(`+${quest.rewards.xp} XP`, 'xp');
            }
            if (quest.rewards.gold) {
                this.game.player.gold += quest.rewards.gold;
                this.showNotification(`+${quest.rewards.gold} Altın 💰`, 'gold');
            }
            if (quest.rewards.item) {
                this.game.addItemToInventory(quest.rewards.item);
                this.showNotification(`Kazanıldı: ${quest.rewards.item}`, 'item');
            }
        }

        // Move to completed
        this.activeQuests.splice(questIndex, 1);
        this.completedQuests.push(questId);

        // Update story chapter if it's a main quest
        if (quest.type === 'main' && quest.chapter) {
            this.currentChapter = Math.max(this.currentChapter, quest.chapter + 1);
            this.unlockNextStoryQuest();
        }

        // Check achievements
        this.checkAchievements();

        this.updateQuestUI();
        this.game.updateHUD();
    }

    unlockNextStoryQuest() {
        const nextChapter = STORY_CHAPTERS.find(c => c.id === this.currentChapter);
        if (nextChapter && !nextChapter.completed) {
            const questId = `story_${nextChapter.id}`;
            if (QUESTS[questId]) {
                setTimeout(() => this.startQuest(questId), 2000);
            }
        }
    }

    interactWithNPC(npc) {
        // Check if NPC has a quest to give
        if (npc.questAvailable) {
            const availableQuest = npc.quests.find(qId => {
                const quest = QUESTS[qId];
                return quest && !this.activeQuests.some(q => q.id === qId) &&
                       !this.completedQuests.includes(qId);
            });

            if (availableQuest) {
                this.showQuestDialog(availableQuest, npc);
                return;
            }
        }

        // Check if NPC is quest target
        const questTarget = this.activeQuests.find(q =>
            q.objectives.some(obj => obj.type === 'talk' && obj.target === npc.id)
        );

        if (questTarget) {
            this.updateQuestProgress('talk', npc.id);
        }

        // Show dialogue
        this.showDialogue(npc);
    }

    showDialogue(npc) {
        const dialogue = npc.dialogue;
        if (!dialogue) return;

        // Select appropriate dialogue
        let text = '';
        if (dialogue.greeting && Array.isArray(dialogue.greeting)) {
            text = dialogue.greeting[Math.floor(Math.random() * dialogue.greeting.length)];
        }

        this.currentDialogue = {
            npc,
            text,
            options: [
                { text: 'Görevi anlat', action: 'show_quest' },
                { text: 'Ticaret yap', action: 'trade' },
                { text: 'Söylentiler', action: 'rumors' },
                { text: 'Hoşça kal', action: 'close' }
            ]
        };

        this.showDialogueUI();
    }

    showQuestDialog(questId, npc) {
        const quest = QUESTS[questId];
        if (!quest) return;

        this.currentDialogue = {
            npc,
            quest,
            text: quest.description,
            options: [
                { text: 'Kabul et', action: 'accept_quest', questId },
                { text: 'Daha sonra', action: 'close' }
            ]
        };

        this.showDialogueUI();
    }

    handleDialogueOption(option) {
        switch (option.action) {
            case 'accept_quest':
                this.startQuest(option.questId);
                this.closeDialogue();
                break;
            case 'show_quest':
                if (this.currentDialogue.npc.dialogue.quest) {
                    this.currentDialogue.text = this.currentDialogue.npc.dialogue.quest[0];
                }
                this.showDialogueUI();
                break;
            case 'rumors':
                if (this.currentDialogue.npc.dialogue.rumors) {
                    const rumors = this.currentDialogue.npc.dialogue.rumors;
                    this.currentDialogue.text = rumors[Math.floor(Math.random() * rumors.length)];
                }
                this.showDialogueUI();
                break;
            case 'trade':
                this.showShop(this.currentDialogue.npc);
                break;
            case 'close':
                this.closeDialogue();
                break;
        }
    }

    showShop(npc) {
        if (!npc.shop) {
            this.showNotification('Bu NPC ticaret yapmıyor.', 'info');
            return;
        }

        // Show shop UI (will be implemented in UI section)
        this.game.showShopUI(npc.shop);
    }

    checkDailyReset() {
        const today = new Date().toDateString();
        if (this.lastDailyReset !== today) {
            this.lastDailyReset = today;
            // Reset daily quests
            this.activeQuests = this.activeQuests.filter(q => q.type !== 'daily');

            // Make daily quests available again
            Object.keys(QUESTS).forEach(questId => {
                const quest = QUESTS[questId];
                if (quest.type === 'daily') {
                    const index = this.completedQuests.indexOf(questId);
                    if (index > -1) {
                        this.completedQuests.splice(index, 1);
                    }
                }
            });
        }
    }

    checkAchievements() {
        Object.keys(ACHIEVEMENTS).forEach(achId => {
            if (this.achievements.includes(achId)) return;

            const ach = ACHIEVEMENTS[achId];
            let unlocked = false;

            switch (achId) {
                case 'first_blood':
                    unlocked = this.game.player.killCount > 0;
                    break;
                case 'level_10':
                    unlocked = this.game.player.level >= 10;
                    break;
                case 'boss_slayer':
                    unlocked = this.game.player.bossKills >= 10;
                    break;
                case 'story_complete':
                    unlocked = this.completedQuests.includes('story_12');
                    break;
                case 'collector':
                    unlocked = this.game.player.itemsCollected >= 100;
                    break;
            }

            if (unlocked) {
                this.unlockAchievement(achId, ach);
            }
        });
    }

    unlockAchievement(achId, achievement) {
        this.achievements.push(achId);
        this.showNotification(`🏆 Başarı: ${achievement.name}`, 'achievement');

        // Give rewards
        if (achievement.reward) {
            if (achievement.reward.xp) this.game.player.xp += achievement.reward.xp;
            if (achievement.reward.gold) this.game.player.gold += achievement.reward.gold;
            if (achievement.reward.title) this.game.player.title = achievement.reward.title;
            if (achievement.reward.item) this.game.addItemToInventory(achievement.reward.item);
        }
    }

    showNotification(text, type = 'info') {
        const notif = document.getElementById('storyNotif');
        if (!notif) return;

        let icon = 'ℹ️';
        let color = '#60a5fa';

        switch (type) {
            case 'quest': icon = '📜'; color = '#fbbf24'; break;
            case 'success': icon = '✅'; color = '#4ade80'; break;
            case 'xp': icon = '⭐'; color = '#a78bfa'; break;
            case 'gold': icon = '💰'; color = '#fbbf24'; break;
            case 'item': icon = '🎁'; color = '#f97316'; break;
            case 'achievement': icon = '🏆'; color = '#fcd34d'; break;
        }

        notif.innerHTML = `<span style="font-size: 20px">${icon}</span> ${text}`;
        notif.style.borderColor = color;
        notif.style.display = 'flex';

        setTimeout(() => {
            notif.style.display = 'none';
        }, 3000);
    }

    updateQuestUI() {
        const questLog = document.getElementById('questLog');
        if (!questLog) return;

        let html = '<div class="quest-header">📜 GÖREVLER</div>';

        // Main quests
        const mainQuests = this.activeQuests.filter(q => q.type === 'main');
        if (mainQuests.length > 0) {
            html += '<div class="quest-section">🎯 Ana Görevler</div>';
            mainQuests.forEach(q => {
                html += this.renderQuest(q);
            });
        }

        // Side quests
        const sideQuests = this.activeQuests.filter(q => q.type === 'side');
        if (sideQuests.length > 0) {
            html += '<div class="quest-section">⚔️ Yan Görevler</div>';
            sideQuests.forEach(q => {
                html += this.renderQuest(q);
            });
        }

        // Daily quests
        const dailyQuests = this.activeQuests.filter(q => q.type === 'daily');
        if (dailyQuests.length > 0) {
            html += '<div class="quest-section">📅 Günlük Görevler</div>';
            dailyQuests.forEach(q => {
                html += this.renderQuest(q);
            });
        }

        if (this.activeQuests.length === 0) {
            html += '<div class="no-quests">Aktif görev yok</div>';
        }

        questLog.innerHTML = html;
    }

    renderQuest(quest) {
        let html = `<div class="quest-item ${quest.readyToComplete ? 'complete' : ''}">`;
        html += `<div class="quest-title">${quest.name}</div>`;
        html += `<div class="quest-desc">${quest.description}</div>`;

        quest.objectives.forEach(obj => {
            const completed = obj.completed ? '✅' : '⏳';
            const text = obj.text || obj.type;
            let progress = '';

            if (obj.count) {
                progress = ` (${obj.current || 0}/${obj.count})`;
            }

            html += `<div class="quest-objective ${obj.completed ? 'completed' : ''}">${completed} ${text}${progress}</div>`;
        });

        if (quest.readyToComplete) {
            html += `<button class="quest-complete-btn" onclick="game.narrative.completeQuest('${quest.id}')">Tamamla!</button>`;
        }

        html += '</div>';
        return html;
    }

    showDialogueUI() {
        const dialogueBox = document.getElementById('dialogueBox');
        if (!dialogueBox || !this.currentDialogue) return;

        let html = `
            <div class="dialogue-header">
                <span class="dialogue-npc-icon">${this.currentDialogue.npc.icon}</span>
                <div class="dialogue-npc-name">${this.currentDialogue.npc.name}</div>
                <button class="dialogue-close" onclick="game.narrative.closeDialogue()">✕</button>
            </div>
            <div class="dialogue-text">${this.currentDialogue.text}</div>
            <div class="dialogue-options">
        `;

        this.currentDialogue.options.forEach((option, index) => {
            html += `<button class="dialogue-option" onclick="game.narrative.handleDialogueOption(${JSON.stringify(option).replace(/"/g, '&quot;')})">${option.text}</button>`;
        });

        html += '</div>';
        dialogueBox.innerHTML = html;
        dialogueBox.style.display = 'block';
    }

    closeDialogue() {
        const dialogueBox = document.getElementById('dialogueBox');
        if (dialogueBox) {
            dialogueBox.style.display = 'none';
        }
        this.currentDialogue = null;
    }

    update() {
        // Check NPC proximity
        this.npcsInWorld.forEach(npc => {
            const dist = this.game.getDistance(this.game.player, npc);
            if (dist < 60) {
                npc.nearby = true;
            } else {
                npc.nearby = false;
            }
        });
    }

    draw(ctx) {
        // Draw NPCs
        this.npcsInWorld.forEach(npc => {
            // Shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.beginPath();
            ctx.ellipse(npc.x, npc.y + npc.size/2, npc.size/2, npc.size/4, 0, 0, Math.PI * 2);
            ctx.fill();

            // NPC icon
            ctx.font = npc.size + 'px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(npc.icon, npc.x, npc.y);

            // Name tag
            ctx.font = '12px Arial';
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.strokeText(npc.name, npc.x, npc.y - 30);
            ctx.fillText(npc.name, npc.x, npc.y - 30);

            // Quest indicator
            if (npc.questAvailable) {
                ctx.font = '20px Arial';
                ctx.fillText('❗', npc.x, npc.y - 50);
            }

            // Interaction hint
            if (npc.nearby) {
                ctx.font = '14px Arial';
                ctx.fillStyle = '#fbbf24';
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                const hint = '[F] Konuş';
                ctx.strokeText(hint, npc.x, npc.y + 40);
                ctx.fillText(hint, npc.x, npc.y + 40);
            }
        });
    }

    handleInteraction() {
        // Find nearby NPC
        const nearbyNPC = this.npcsInWorld.find(npc => {
            const dist = this.game.getDistance(this.game.player, npc);
            return dist < 60;
        });

        if (nearbyNPC) {
            this.interactWithNPC(nearbyNPC);
        }
    }
}
