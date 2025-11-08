// ============================================
// QUEST SYSTEM - Sprint 7
// Complete quest framework with 50+ quests
// ============================================

// Quest Database - 20+ Main Quests
const MAIN_QUESTS = {
    'main_001': {
        id: 'main_001',
        title: 'Kayıp Köy',
        description: 'Kurt liderini öldür ve köylüleri kurtar',
        type: 'main',
        level: 1,
        objectives: [
            { type: 'kill', target: 'Kurt', count: 1, current: 0, description: 'Kurt Liderini öldür' }
        ],
        rewards: {
            xp: 500,
            gold: 100,
            items: []
        },
        nextQuest: 'main_002',
        npcStart: 'elder',
        npcEnd: 'elder'
    },

    'main_002': {
        id: 'main_002',
        title: 'Goblin İstilası',
        description: 'Köye saldıran goblinleri temizle',
        type: 'main',
        level: 2,
        objectives: [
            { type: 'kill', target: 'Goblin', count: 5, current: 0, description: '5 Goblin öldür' }
        ],
        rewards: {
            xp: 750,
            gold: 150,
            items: []
        },
        nextQuest: 'main_003',
        prereq: ['main_001'],
        npcStart: 'guard',
        npcEnd: 'guard'
    },

    'main_003': {
        id: 'main_003',
        title: 'Ork Şefi',
        description: 'Orkların liderini bul ve yok et',
        type: 'main',
        level: 4,
        objectives: [
            { type: 'kill', target: 'Ork', count: 3, current: 0, description: '3 Ork öldür' },
            { type: 'kill', target: 'Ork', count: 1, current: 0, description: 'Ork Şefini öldür' }
        ],
        rewards: {
            xp: 1000,
            gold: 250,
            items: []
        },
        nextQuest: 'main_004',
        prereq: ['main_002'],
        npcStart: 'captain',
        npcEnd: 'captain'
    },

    'main_004': {
        id: 'main_004',
        title: 'Karanlık Orman',
        description: 'Karanlık ormandaki tehlikeyi araştır',
        type: 'main',
        level: 6,
        objectives: [
            { type: 'kill', target: 'Troll', count: 2, current: 0, description: '2 Troll öldür' },
            { type: 'explore', location: 'dark_forest', current: false, description: 'Karanlık ormanı keşfet' }
        ],
        rewards: {
            xp: 1500,
            gold: 300,
            items: []
        },
        nextQuest: 'main_005',
        prereq: ['main_003'],
        npcStart: 'elder',
        npcEnd: 'elder'
    },

    'main_005': {
        id: 'main_005',
        title: 'Ejderha Tehdidi',
        description: 'Köyü tehdit eden ejderhayı durdur',
        type: 'main',
        level: 10,
        objectives: [
            { type: 'kill', target: 'Ejderha', count: 1, current: 0, description: 'Ejderhayı öldür' }
        ],
        rewards: {
            xp: 3000,
            gold: 500,
            items: []
        },
        nextQuest: 'main_006',
        prereq: ['main_004'],
        npcStart: 'king',
        npcEnd: 'king'
    },

    'main_006': {
        id: 'main_006',
        title: 'Kayıp Hazine',
        description: 'Eski haritayı takip ederek kayıp hazineyi bul',
        type: 'main',
        level: 12,
        objectives: [
            { type: 'collect', target: 'ancient_map', count: 1, current: 0, description: 'Eski haritayı bul' },
            { type: 'explore', location: 'treasure_cave', current: false, description: 'Hazine mağarasına git' }
        ],
        rewards: {
            xp: 2000,
            gold: 1000,
            items: []
        },
        nextQuest: 'main_007',
        prereq: ['main_005'],
        npcStart: 'merchant',
        npcEnd: 'merchant'
    },

    'main_007': {
        id: 'main_007',
        title: 'Kara Büyücü',
        description: 'Köyü lanetleyen kara büyücüyü bul',
        type: 'main',
        level: 15,
        objectives: [
            { type: 'kill', target: 'Goblin', count: 10, current: 0, description: '10 Goblin öldür' },
            { type: 'talk', target: 'wizard', current: false, description: 'Büyücü ile konuş' }
        ],
        rewards: {
            xp: 3500,
            gold: 600,
            items: []
        },
        nextQuest: 'main_008',
        prereq: ['main_006'],
        npcStart: 'wizard',
        npcEnd: 'wizard'
    },

    'main_008': {
        id: 'main_008',
        title: 'Kutsal Silah',
        description: 'Efsanevi kutsal silahı bul',
        type: 'main',
        level: 18,
        objectives: [
            { type: 'collect', target: 'holy_fragment_1', count: 1, current: 0, description: 'İlk parçayı bul' },
            { type: 'collect', target: 'holy_fragment_2', count: 1, current: 0, description: 'İkinci parçayı bul' },
            { type: 'collect', target: 'holy_fragment_3', count: 1, current: 0, description: 'Üçüncü parçayı bul' }
        ],
        rewards: {
            xp: 5000,
            gold: 800,
            items: []
        },
        nextQuest: 'main_009',
        prereq: ['main_007'],
        npcStart: 'priest',
        npcEnd: 'priest'
    },

    'main_009': {
        id: 'main_009',
        title: 'Karanlık Kale',
        description: 'Karanlık kaledeki şeytani güçleri yok et',
        type: 'main',
        level: 20,
        objectives: [
            { type: 'kill', target: 'Troll', count: 5, current: 0, description: '5 Troll öldür' },
            { type: 'explore', location: 'dark_castle', current: false, description: 'Karanlık kaleye git' }
        ],
        rewards: {
            xp: 6000,
            gold: 1000,
            items: []
        },
        nextQuest: 'main_010',
        prereq: ['main_008'],
        npcStart: 'king',
        npcEnd: 'king'
    },

    'main_010': {
        id: 'main_010',
        title: 'Nihai Savaş',
        description: 'Karanlık lordu yok ederek dünyayı kurtar',
        type: 'main',
        level: 25,
        objectives: [
            { type: 'kill', target: 'Ejderha', count: 2, current: 0, description: '2 Ejderha öldür' },
            { type: 'boss', target: 'dark_lord', current: false, description: 'Karanlık Lord ile savaş' }
        ],
        rewards: {
            xp: 10000,
            gold: 2000,
            items: []
        },
        nextQuest: 'main_011',
        prereq: ['main_009'],
        npcStart: 'king',
        npcEnd: 'king'
    },

    'main_011': {
        id: 'main_011',
        title: 'Kayıp Krallık',
        description: 'Eski krallığın sırlarını keşfet',
        type: 'main',
        level: 28,
        objectives: [
            { type: 'explore', location: 'ancient_ruins', current: false, description: 'Antik kalıntıları keşfet' },
            { type: 'collect', target: 'ancient_scroll', count: 3, current: 0, description: '3 Eski parşömen bul' }
        ],
        rewards: {
            xp: 7000,
            gold: 1200,
            items: []
        },
        nextQuest: 'main_012',
        prereq: ['main_010'],
        npcStart: 'historian',
        npcEnd: 'historian'
    },

    'main_012': {
        id: 'main_012',
        title: 'Elementlerin Gücü',
        description: 'Dört element tapınağını ziyaret et',
        type: 'main',
        level: 30,
        objectives: [
            { type: 'explore', location: 'fire_temple', current: false, description: 'Ateş tapınağı' },
            { type: 'explore', location: 'water_temple', current: false, description: 'Su tapınağı' },
            { type: 'explore', location: 'earth_temple', current: false, description: 'Toprak tapınağı' },
            { type: 'explore', location: 'air_temple', current: false, description: 'Hava tapınağı' }
        ],
        rewards: {
            xp: 8000,
            gold: 1500,
            items: []
        },
        nextQuest: 'main_013',
        prereq: ['main_011'],
        npcStart: 'sage',
        npcEnd: 'sage'
    },

    'main_013': {
        id: 'main_013',
        title: 'Zaman Yolculuğu',
        description: 'Geçmişe giderek tarihi değiştir',
        type: 'main',
        level: 32,
        objectives: [
            { type: 'talk', target: 'time_keeper', current: false, description: 'Zaman koruyucusu ile konuş' },
            { type: 'explore', location: 'time_portal', current: false, description: 'Zaman portalını bul' }
        ],
        rewards: {
            xp: 9000,
            gold: 1800,
            items: []
        },
        nextQuest: 'main_014',
        prereq: ['main_012'],
        npcStart: 'time_keeper',
        npcEnd: 'time_keeper'
    },

    'main_014': {
        id: 'main_014',
        title: 'Gölge Dünyası',
        description: 'Gölge dünyasının sırlarını çöz',
        type: 'main',
        level: 35,
        objectives: [
            { type: 'kill', target: 'Goblin', count: 20, current: 0, description: '20 Gölge yaratığı öldür' },
            { type: 'collect', target: 'shadow_essence', count: 5, current: 0, description: '5 Gölge özü topla' }
        ],
        rewards: {
            xp: 10000,
            gold: 2000,
            items: []
        },
        nextQuest: 'main_015',
        prereq: ['main_013'],
        npcStart: 'shadow_walker',
        npcEnd: 'shadow_walker'
    },

    'main_015': {
        id: 'main_015',
        title: 'Yıldız Düşüşü',
        description: 'Düşen yıldızdan gelen tehdidi önle',
        type: 'main',
        level: 38,
        objectives: [
            { type: 'explore', location: 'meteor_crater', current: false, description: 'Meteor kraterini araştır' },
            { type: 'kill', target: 'Ejderha', count: 3, current: 0, description: '3 Uzaylı yaratık öldür' }
        ],
        rewards: {
            xp: 11000,
            gold: 2500,
            items: []
        },
        nextQuest: 'main_016',
        prereq: ['main_014'],
        npcStart: 'astronomer',
        npcEnd: 'astronomer'
    },

    'main_016': {
        id: 'main_016',
        title: 'Denizin Derinlikleri',
        description: 'Deniz altı şehrini keşfet',
        type: 'main',
        level: 40,
        objectives: [
            { type: 'explore', location: 'underwater_city', current: false, description: 'Denizaltı şehrini bul' },
            { type: 'talk', target: 'merman_king', current: false, description: 'Deniz adamı kralı ile konuş' }
        ],
        rewards: {
            xp: 12000,
            gold: 3000,
            items: []
        },
        nextQuest: 'main_017',
        prereq: ['main_015'],
        npcStart: 'sailor',
        npcEnd: 'sailor'
    },

    'main_017': {
        id: 'main_017',
        title: 'Cennet Bahçeleri',
        description: 'Efsanevi cennet bahçelerini bul',
        type: 'main',
        level: 42,
        objectives: [
            { type: 'collect', target: 'golden_fruit', count: 3, current: 0, description: '3 Altın meyve topla' },
            { type: 'explore', location: 'heaven_garden', current: false, description: 'Cennet bahçelerini keşfet' }
        ],
        rewards: {
            xp: 13000,
            gold: 3500,
            items: []
        },
        nextQuest: 'main_018',
        prereq: ['main_016'],
        npcStart: 'angel',
        npcEnd: 'angel'
    },

    'main_018': {
        id: 'main_018',
        title: 'Cehennem Kapıları',
        description: 'Cehennem kapılarını kapat',
        type: 'main',
        level: 45,
        objectives: [
            { type: 'explore', location: 'hell_gate', current: false, description: 'Cehennem kapılarına git' },
            { type: 'kill', target: 'Troll', count: 10, current: 0, description: '10 Şeytan öldür' },
            { type: 'boss', target: 'demon_lord', current: false, description: 'Şeytan lordu ile savaş' }
        ],
        rewards: {
            xp: 15000,
            gold: 4000,
            items: []
        },
        nextQuest: 'main_019',
        prereq: ['main_017'],
        npcStart: 'priest',
        npcEnd: 'priest'
    },

    'main_019': {
        id: 'main_019',
        title: 'Tanrıların Gazabı',
        description: 'Tanrıların öfkesini yatıştır',
        type: 'main',
        level: 48,
        objectives: [
            { type: 'collect', target: 'divine_offering', count: 5, current: 0, description: '5 İlahi sunu topla' },
            { type: 'talk', target: 'high_priest', current: false, description: 'Baş rahip ile konuş' }
        ],
        rewards: {
            xp: 16000,
            gold: 4500,
            items: []
        },
        nextQuest: 'main_020',
        prereq: ['main_018'],
        npcStart: 'high_priest',
        npcEnd: 'high_priest'
    },

    'main_020': {
        id: 'main_020',
        title: 'Evrenin Dengesi',
        description: 'Evrenin dengesini yeniden kur',
        type: 'main',
        level: 50,
        objectives: [
            { type: 'boss', target: 'chaos_entity', current: false, description: 'Kaos varlığını yok et' },
            { type: 'explore', location: 'cosmic_center', current: false, description: 'Kozmik merkeze ulaş' }
        ],
        rewards: {
            xp: 20000,
            gold: 5000,
            items: []
        },
        nextQuest: null,
        prereq: ['main_019'],
        npcStart: 'oracle',
        npcEnd: 'oracle'
    }
};

// Side Quests - 30+ Side Quests
const SIDE_QUESTS = {
    'side_001': {
        id: 'side_001',
        title: 'Kurt Avı',
        description: 'Çiftçinin kaybolan koyunları için kurt avla',
        type: 'side',
        level: 1,
        objectives: [
            { type: 'kill', target: 'Kurt', count: 3, current: 0, description: '3 Kurt öldür' }
        ],
        rewards: {
            xp: 200,
            gold: 50,
            items: []
        },
        npcStart: 'farmer',
        npcEnd: 'farmer'
    },

    'side_002': {
        id: 'side_002',
        title: 'Kayıp Kedi',
        description: 'Yaşlı kadının kayıp kedisini bul',
        type: 'side',
        level: 1,
        objectives: [
            { type: 'find', target: 'lost_cat', current: false, description: 'Kayıp kediyi bul' }
        ],
        rewards: {
            xp: 150,
            gold: 30,
            items: []
        },
        npcStart: 'old_lady',
        npcEnd: 'old_lady'
    },

    'side_003': {
        id: 'side_003',
        title: 'İlaç Toplama',
        description: 'Hekim için 5 şifalı ot topla',
        type: 'side',
        level: 2,
        objectives: [
            { type: 'collect', target: 'healing_herb', count: 5, current: 0, description: '5 Şifalı ot topla' }
        ],
        rewards: {
            xp: 250,
            gold: 60,
            items: []
        },
        npcStart: 'healer',
        npcEnd: 'healer'
    },

    'side_004': {
        id: 'side_004',
        title: 'Demirci Yardımı',
        description: 'Demirci için 10 demir cevheri getir',
        type: 'side',
        level: 3,
        objectives: [
            { type: 'collect', target: 'iron_ore', count: 10, current: 0, description: '10 Demir cevheri topla' }
        ],
        rewards: {
            xp: 300,
            gold: 80,
            items: []
        },
        npcStart: 'blacksmith',
        npcEnd: 'blacksmith'
    },

    'side_005': {
        id: 'side_005',
        title: 'Goblin Problemi',
        description: 'Tüccarın kervanını soyan goblinleri yok et',
        type: 'side',
        level: 3,
        objectives: [
            { type: 'kill', target: 'Goblin', count: 7, current: 0, description: '7 Goblin öldür' }
        ],
        rewards: {
            xp: 350,
            gold: 100,
            items: []
        },
        npcStart: 'merchant',
        npcEnd: 'merchant'
    },

    'side_006': {
        id: 'side_006',
        title: 'Balık Tutma',
        description: 'Balıkçı için 5 balık tut',
        type: 'side',
        level: 2,
        objectives: [
            { type: 'collect', target: 'fish', count: 5, current: 0, description: '5 Balık tut' }
        ],
        rewards: {
            xp: 200,
            gold: 50,
            items: []
        },
        npcStart: 'fisherman',
        npcEnd: 'fisherman'
    },

    'side_007': {
        id: 'side_007',
        title: 'Mezarlık Keşfi',
        description: 'Eski mezarlıktaki hayaletleri temizle',
        type: 'side',
        level: 5,
        objectives: [
            { type: 'explore', location: 'graveyard', current: false, description: 'Mezarlığı keşfet' },
            { type: 'kill', target: 'Kurt', count: 5, current: 0, description: '5 Hayalet öldür' }
        ],
        rewards: {
            xp: 500,
            gold: 150,
            items: []
        },
        npcStart: 'priest',
        npcEnd: 'priest'
    },

    'side_008': {
        id: 'side_008',
        title: 'Aşk Mektubu',
        description: 'Genç adamın aşk mektubunu sevgilisine ulaştır',
        type: 'side',
        level: 1,
        objectives: [
            { type: 'deliver', target: 'love_letter', npc: 'maiden', current: false, description: 'Mektubu kıza ulaştır' }
        ],
        rewards: {
            xp: 100,
            gold: 25,
            items: []
        },
        npcStart: 'young_man',
        npcEnd: 'maiden'
    },

    'side_009': {
        id: 'side_009',
        title: 'Mağara Kaşifi',
        description: 'Bilinmeyen mağarayı keşfet',
        type: 'side',
        level: 6,
        objectives: [
            { type: 'explore', location: 'unknown_cave', current: false, description: 'Mağarayı keşfet' }
        ],
        rewards: {
            xp: 600,
            gold: 200,
            items: []
        },
        npcStart: 'explorer',
        npcEnd: 'explorer'
    },

    'side_010': {
        id: 'side_010',
        title: 'Ork Kampı',
        description: 'Ork kampını yok et',
        type: 'side',
        level: 7,
        objectives: [
            { type: 'kill', target: 'Ork', count: 10, current: 0, description: '10 Ork öldür' }
        ],
        rewards: {
            xp: 700,
            gold: 250,
            items: []
        },
        npcStart: 'captain',
        npcEnd: 'captain'
    },

    'side_011': {
        id: 'side_011',
        title: 'Müzik Yarışması',
        description: 'Bard için nadir bir enstrüman bul',
        type: 'side',
        level: 4,
        objectives: [
            { type: 'collect', target: 'rare_instrument', count: 1, current: 0, description: 'Nadir enstrüman bul' }
        ],
        rewards: {
            xp: 400,
            gold: 120,
            items: []
        },
        npcStart: 'bard',
        npcEnd: 'bard'
    },

    'side_012': {
        id: 'side_012',
        title: 'Yemek Yarışması',
        description: 'Aşçı için özel malzemeler topla',
        type: 'side',
        level: 5,
        objectives: [
            { type: 'collect', target: 'dragon_pepper', count: 3, current: 0, description: '3 Ejder biberi topla' },
            { type: 'collect', target: 'golden_wheat', count: 5, current: 0, description: '5 Altın buğday topla' }
        ],
        rewards: {
            xp: 450,
            gold: 150,
            items: []
        },
        npcStart: 'chef',
        npcEnd: 'chef'
    },

    'side_013': {
        id: 'side_013',
        title: 'Korsanlar',
        description: 'Limandaki korsanları yok et',
        type: 'side',
        level: 8,
        objectives: [
            { type: 'kill', target: 'Goblin', count: 8, current: 0, description: '8 Korsan öldür' }
        ],
        rewards: {
            xp: 800,
            gold: 300,
            items: []
        },
        npcStart: 'harbor_master',
        npcEnd: 'harbor_master'
    },

    'side_014': {
        id: 'side_014',
        title: 'Kayıp Yüzük',
        description: 'Asil kadının kayıp yüzüğünü bul',
        type: 'side',
        level: 6,
        objectives: [
            { type: 'find', target: 'lost_ring', current: false, description: 'Kayıp yüzüğü bul' }
        ],
        rewards: {
            xp: 550,
            gold: 200,
            items: []
        },
        npcStart: 'noblewoman',
        npcEnd: 'noblewoman'
    },

    'side_015': {
        id: 'side_015',
        title: 'Troll Köprüsü',
        description: 'Köprüyü ele geçiren trolleri temizle',
        type: 'side',
        level: 9,
        objectives: [
            { type: 'kill', target: 'Troll', count: 4, current: 0, description: '4 Troll öldür' }
        ],
        rewards: {
            xp: 900,
            gold: 350,
            items: []
        },
        npcStart: 'bridge_keeper',
        npcEnd: 'bridge_keeper'
    },

    'side_016': {
        id: 'side_016',
        title: 'Büyülü Kristal',
        description: 'Büyücü için büyülü kristal bul',
        type: 'side',
        level: 10,
        objectives: [
            { type: 'collect', target: 'magic_crystal', count: 3, current: 0, description: '3 Büyülü kristal topla' }
        ],
        rewards: {
            xp: 1000,
            gold: 400,
            items: []
        },
        npcStart: 'wizard',
        npcEnd: 'wizard'
    },

    'side_017': {
        id: 'side_017',
        title: 'Vahşi Atlar',
        description: 'Sürü için vahşi atları evcilleştir',
        type: 'side',
        level: 7,
        objectives: [
            { type: 'tame', target: 'wild_horse', count: 3, current: 0, description: '3 Vahşi at evcilleştir' }
        ],
        rewards: {
            xp: 700,
            gold: 250,
            items: []
        },
        npcStart: 'rancher',
        npcEnd: 'rancher'
    },

    'side_018': {
        id: 'side_018',
        title: 'Hırsız Çetesi',
        description: 'Şehirdeki hırsız çetesini yok et',
        type: 'side',
        level: 11,
        objectives: [
            { type: 'kill', target: 'Goblin', count: 12, current: 0, description: '12 Hırsız öldür' }
        ],
        rewards: {
            xp: 1100,
            gold: 450,
            items: []
        },
        npcStart: 'sheriff',
        npcEnd: 'sheriff'
    },

    'side_019': {
        id: 'side_019',
        title: 'Eski Kitap',
        description: 'Kütüphaneci için eski kitabı bul',
        type: 'side',
        level: 8,
        objectives: [
            { type: 'find', target: 'ancient_book', current: false, description: 'Eski kitabı bul' }
        ],
        rewards: {
            xp: 800,
            gold: 300,
            items: []
        },
        npcStart: 'librarian',
        npcEnd: 'librarian'
    },

    'side_020': {
        id: 'side_020',
        title: 'Mantar Toplama',
        description: 'Nadir mantar türlerini topla',
        type: 'side',
        level: 4,
        objectives: [
            { type: 'collect', target: 'rare_mushroom', count: 8, current: 0, description: '8 Nadir mantar topla' }
        ],
        rewards: {
            xp: 400,
            gold: 120,
            items: []
        },
        npcStart: 'herbalist',
        npcEnd: 'herbalist'
    },

    'side_021': {
        id: 'side_021',
        title: 'Kayıp Çocuk',
        description: 'Ormanda kaybolan çocuğu bul',
        type: 'side',
        level: 3,
        objectives: [
            { type: 'find', target: 'lost_child', current: false, description: 'Kayıp çocuğu bul' }
        ],
        rewards: {
            xp: 300,
            gold: 80,
            items: []
        },
        npcStart: 'worried_mother',
        npcEnd: 'worried_mother'
    },

    'side_022': {
        id: 'side_022',
        title: 'Zehirli Örümcekler',
        description: 'Mağaradaki dev örümcekleri temizle',
        type: 'side',
        level: 12,
        objectives: [
            { type: 'kill', target: 'Ork', count: 15, current: 0, description: '15 Dev örümcek öldür' }
        ],
        rewards: {
            xp: 1200,
            gold: 500,
            items: []
        },
        npcStart: 'cave_explorer',
        npcEnd: 'cave_explorer'
    },

    'side_023': {
        id: 'side_023',
        title: 'Kutsal Su',
        description: 'Kutsal pınardan su getir',
        type: 'side',
        level: 6,
        objectives: [
            { type: 'collect', target: 'holy_water', count: 3, current: 0, description: '3 Kutsal su topla' }
        ],
        rewards: {
            xp: 600,
            gold: 200,
            items: []
        },
        npcStart: 'priest',
        npcEnd: 'priest'
    },

    'side_024': {
        id: 'side_024',
        title: 'Yaramaz İmpler',
        description: 'Köyde şakalar yapan impleri durdur',
        type: 'side',
        level: 5,
        objectives: [
            { type: 'kill', target: 'Kurt', count: 10, current: 0, description: '10 İmp öldür' }
        ],
        rewards: {
            xp: 500,
            gold: 150,
            items: []
        },
        npcStart: 'innkeeper',
        npcEnd: 'innkeeper'
    },

    'side_025': {
        id: 'side_025',
        title: 'Gizli Tarif',
        description: 'Efsanevi yemek tarifini bul',
        type: 'side',
        level: 9,
        objectives: [
            { type: 'find', target: 'secret_recipe', current: false, description: 'Gizli tarifi bul' }
        ],
        rewards: {
            xp: 900,
            gold: 350,
            items: []
        },
        npcStart: 'master_chef',
        npcEnd: 'master_chef'
    },

    'side_026': {
        id: 'side_026',
        title: 'Kuyuyu Temizle',
        description: 'Zehirlenen kuyuyu temizle',
        type: 'side',
        level: 7,
        objectives: [
            { type: 'collect', target: 'purification_stone', count: 1, current: 0, description: 'Arındırma taşı bul' },
            { type: 'use', target: 'well', current: false, description: 'Kuyuyu temizle' }
        ],
        rewards: {
            xp: 700,
            gold: 250,
            items: []
        },
        npcStart: 'village_elder',
        npcEnd: 'village_elder'
    },

    'side_027': {
        id: 'side_027',
        title: 'Ejderha Yumurtası',
        description: 'Koleksiyoncu için ejderha yumurtası bul',
        type: 'side',
        level: 15,
        objectives: [
            { type: 'collect', target: 'dragon_egg', count: 1, current: 0, description: 'Ejderha yumurtası bul' }
        ],
        rewards: {
            xp: 1500,
            gold: 600,
            items: []
        },
        npcStart: 'collector',
        npcEnd: 'collector'
    },

    'side_028': {
        id: 'side_028',
        title: 'Rüzgar Çanları',
        description: 'Tapınak için 5 rüzgar çanı topla',
        type: 'side',
        level: 8,
        objectives: [
            { type: 'collect', target: 'wind_chime', count: 5, current: 0, description: '5 Rüzgar çanı topla' }
        ],
        rewards: {
            xp: 800,
            gold: 300,
            items: []
        },
        npcStart: 'monk',
        npcEnd: 'monk'
    },

    'side_029': {
        id: 'side_029',
        title: 'Hayalet Gemi',
        description: 'Hayalet gemiyi araştır',
        type: 'side',
        level: 13,
        objectives: [
            { type: 'explore', location: 'ghost_ship', current: false, description: 'Hayalet gemiyi keşfet' },
            { type: 'kill', target: 'Troll', count: 8, current: 0, description: '8 Hayalet korsan öldür' }
        ],
        rewards: {
            xp: 1300,
            gold: 550,
            items: []
        },
        npcStart: 'old_sailor',
        npcEnd: 'old_sailor'
    },

    'side_030': {
        id: 'side_030',
        title: 'Yıldız Tozları',
        description: 'Simyacı için yıldız tozu topla',
        type: 'side',
        level: 10,
        objectives: [
            { type: 'collect', target: 'star_dust', count: 7, current: 0, description: '7 Yıldız tozu topla' }
        ],
        rewards: {
            xp: 1000,
            gold: 400,
            items: []
        },
        npcStart: 'alchemist',
        npcEnd: 'alchemist'
    }
};

// Daily Quests
const DAILY_QUESTS = {
    'daily_001': {
        id: 'daily_001',
        title: 'Günlük Temizlik',
        description: '10 canavar öldür',
        type: 'daily',
        objectives: [
            { type: 'kill', target: 'any', count: 10, current: 0, description: '10 Canavar öldür' }
        ],
        rewards: {
            xp: 300,
            gold: 100
        },
        resetTime: '24h'
    },

    'daily_002': {
        id: 'daily_002',
        title: 'Goblin Avı',
        description: '15 goblin öldür',
        type: 'daily',
        objectives: [
            { type: 'kill', target: 'Goblin', count: 15, current: 0, description: '15 Goblin öldür' }
        ],
        rewards: {
            xp: 400,
            gold: 150
        },
        resetTime: '24h'
    },

    'daily_003': {
        id: 'daily_003',
        title: 'Kaynak Toplama',
        description: 'Çeşitli kaynaklar topla',
        type: 'daily',
        objectives: [
            { type: 'collect', target: 'any', count: 20, current: 0, description: '20 Kaynak topla' }
        ],
        rewards: {
            xp: 350,
            gold: 120
        },
        resetTime: '24h'
    }
};

// NPC Database
const NPCS = {
    elder: {
        id: 'elder',
        name: 'Köy Muhtarı',
        icon: '👴',
        dialogues: {
            greeting: 'Hoş geldin genç savaşçı!',
            questAvailable: 'Sana önemli bir görev vermek istiyorum.',
            questActive: 'Görevini tamamladın mı?',
            questComplete: 'Harika iş çıkardın! İşte ödülün.',
            noQuest: 'Şu an verecek görevim yok.'
        }
    },
    guard: {
        id: 'guard',
        name: 'Köy Muhafızı',
        icon: '💂',
        dialogues: {
            greeting: 'Selamlar!',
            questAvailable: 'Köyümüze yardım eder misin?',
            questActive: 'Goblinleri temizledin mi?',
            questComplete: 'Köyümüzü kurtardın!',
            noQuest: 'Her şey yolunda görünüyor.'
        }
    },
    captain: {
        id: 'captain',
        name: 'Muhafız Kaptanı',
        icon: '🛡️',
        dialogues: {
            greeting: 'Asker! Hazır mısın?',
            questAvailable: 'Önemli bir görev var.',
            questActive: 'Orkları yok ettin mi?',
            questComplete: 'Mükemmel! Sen gerçek bir savaşçısın.',
            noQuest: 'Devam et asker.'
        }
    },
    wizard: {
        id: 'wizard',
        name: 'Bilge Büyücü',
        icon: '🧙',
        dialogues: {
            greeting: 'Büyünün gücünü hisset...',
            questAvailable: 'Büyülü bir görev seni bekliyor.',
            questActive: 'Kristalleri buldun mu?',
            questComplete: 'Harika! Büyü gücün artıyor.',
            noQuest: 'Büyü çalışmalarıma devam etmeliyim.'
        }
    },
    merchant: {
        id: 'merchant',
        name: 'Tüccar',
        icon: '🧳',
        dialogues: {
            greeting: 'Hoş geldin! Alışveriş yapmak ister misin?',
            questAvailable: 'Yardımına ihtiyacım var!',
            questActive: 'Kervanımı kurtardın mı?',
            questComplete: 'Sana minnettarım! Al bu hediyeyi.',
            noQuest: 'İyi ticaret!'
        }
    },
    priest: {
        id: 'priest',
        name: 'Rahip',
        icon: '⛪',
        dialogues: {
            greeting: 'Tanrı seni kutsasın.',
            questAvailable: 'Kutsal bir görev var.',
            questActive: 'Kutsal görevi tamamladın mı?',
            questComplete: 'Tanrı seninle! İşte kutsaman.',
            noQuest: 'Dua etmeye devam et.'
        }
    },
    king: {
        id: 'king',
        name: 'Kral',
        icon: '👑',
        dialogues: {
            greeting: 'Krallığıma hoş geldin!',
            questAvailable: 'Krallık sana ihtiyaç duyuyor!',
            questActive: 'Görevinde başarılı olacağına inanıyorum.',
            questComplete: 'Krallığın kahramanısın!',
            noQuest: 'Krallık huzur içinde.'
        }
    },
    farmer: {
        id: 'farmer',
        name: 'Çiftçi',
        icon: '👨‍🌾',
        dialogues: {
            greeting: 'Günaydın!',
            questAvailable: 'Koyunlarım kayboldu!',
            questActive: 'Kurtları öldürdün mü?',
            questComplete: 'Teşekkürler! Çiftliğimi kurtardın.',
            noQuest: 'Ekinlerim iyi büyüyor.'
        }
    }
};

// Dialogue System
class DialogueSystem {
    constructor() {
        this.currentDialogue = null;
        this.dialogueHistory = [];
    }

    showDialogue(npc, type, quest = null) {
        const npcData = NPCS[npc];
        if (!npcData) return null;

        const dialogue = {
            npc: npcData,
            text: npcData.dialogues[type] || 'Merhaba!',
            quest: quest,
            timestamp: Date.now()
        };

        this.currentDialogue = dialogue;
        this.dialogueHistory.push(dialogue);

        return dialogue;
    }

    closeDialogue() {
        this.currentDialogue = null;
    }

    getHistory() {
        return this.dialogueHistory;
    }
}

// Quest Manager
class QuestManager {
    constructor() {
        this.activeQuests = [];
        this.completedQuests = [];
        this.availableQuests = [];
        this.dailyQuests = [];
        this.lastDailyReset = Date.now();

        this.dialogueSystem = new DialogueSystem();

        // Initialize with first quest
        this.availableQuests.push(MAIN_QUESTS['main_001']);
        this.availableQuests.push(SIDE_QUESTS['side_001']);
        this.availableQuests.push(SIDE_QUESTS['side_002']);

        // Initialize daily quests
        this.resetDailyQuests();
    }

    // Check if player meets quest requirements
    canAcceptQuest(quest, playerLevel) {
        if (quest.level > playerLevel) return false;

        if (quest.prereq) {
            for (let prereqId of quest.prereq) {
                if (!this.isQuestCompleted(prereqId)) {
                    return false;
                }
            }
        }

        return true;
    }

    // Accept a quest
    acceptQuest(questId) {
        const quest = this.findAvailableQuest(questId);
        if (!quest) return false;

        // Remove from available and add to active
        const index = this.availableQuests.indexOf(quest);
        if (index > -1) {
            this.availableQuests.splice(index, 1);
        }

        // Deep copy quest to avoid reference issues
        const activeQuest = JSON.parse(JSON.stringify(quest));
        this.activeQuests.push(activeQuest);

        return true;
    }

    // Find available quest by ID
    findAvailableQuest(questId) {
        return this.availableQuests.find(q => q.id === questId);
    }

    // Update quest objective
    updateObjective(objectiveType, target, amount = 1) {
        let updated = false;

        this.activeQuests.forEach(quest => {
            quest.objectives.forEach(obj => {
                if (obj.type === objectiveType) {
                    // Check if target matches (or 'any' for kill any monster)
                    if (obj.target === target || obj.target === 'any') {
                        if (obj.count !== undefined) {
                            obj.current = Math.min(obj.current + amount, obj.count);
                        } else {
                            obj.current = true;
                        }
                        updated = true;
                    }
                }
            });

            // Check if quest is complete
            if (this.isQuestComplete(quest.id)) {
                // Quest ready to turn in
                quest.readyToComplete = true;
            }
        });

        return updated;
    }

    // Check if quest is complete
    isQuestComplete(questId) {
        const quest = this.activeQuests.find(q => q.id === questId) ||
                     this.completedQuests.find(q => q.id === questId);

        if (!quest) return false;

        // If already in completed quests
        if (this.completedQuests.find(q => q.id === questId)) {
            return true;
        }

        // Check all objectives
        return quest.objectives.every(obj => {
            if (obj.count !== undefined) {
                return obj.current >= obj.count;
            } else {
                return obj.current === true;
            }
        });
    }

    // Complete quest and give rewards
    completeQuest(questId, player) {
        const questIndex = this.activeQuests.findIndex(q => q.id === questId);
        if (questIndex === -1) return null;

        const quest = this.activeQuests[questIndex];

        if (!this.isQuestComplete(questId)) return null;

        // Remove from active
        this.activeQuests.splice(questIndex, 1);

        // Add to completed
        this.completedQuests.push(quest);

        // Give rewards
        const rewards = quest.rewards;
        if (player) {
            if (rewards.xp) {
                player.xp += rewards.xp;
            }
            if (rewards.gold) {
                player.gold += rewards.gold;
            }
            if (rewards.items) {
                // Add items to inventory
                rewards.items.forEach(item => {
                    // Add item logic here
                });
            }
        }

        // Unlock next quest if available
        if (quest.nextQuest) {
            const nextQuest = MAIN_QUESTS[quest.nextQuest];
            if (nextQuest && !this.availableQuests.find(q => q.id === nextQuest.id)) {
                this.availableQuests.push(nextQuest);
            }
        }

        // Unlock new side quests based on level
        this.unlockSideQuests(player.level);

        return rewards;
    }

    // Unlock side quests based on player level
    unlockSideQuests(playerLevel) {
        Object.values(SIDE_QUESTS).forEach(quest => {
            if (quest.level <= playerLevel &&
                !this.availableQuests.find(q => q.id === quest.id) &&
                !this.activeQuests.find(q => q.id === quest.id) &&
                !this.completedQuests.find(q => q.id === quest.id)) {
                this.availableQuests.push(quest);
            }
        });
    }

    // Reset daily quests
    resetDailyQuests() {
        const now = Date.now();
        const hoursSinceReset = (now - this.lastDailyReset) / (1000 * 60 * 60);

        if (hoursSinceReset >= 24) {
            this.dailyQuests = [];
            Object.values(DAILY_QUESTS).forEach(quest => {
                const dailyQuest = JSON.parse(JSON.stringify(quest));
                this.dailyQuests.push(dailyQuest);
            });
            this.lastDailyReset = now;
        }
    }

    // Get quests by NPC
    getQuestsByNPC(npcId) {
        const available = this.availableQuests.filter(q => q.npcStart === npcId);
        const active = this.activeQuests.filter(q => q.npcEnd === npcId && q.readyToComplete);

        return { available, active };
    }

    // Interact with NPC
    interactWithNPC(npcId, player) {
        const quests = this.getQuestsByNPC(npcId);

        // Check for quest completion
        if (quests.active.length > 0) {
            const quest = quests.active[0];
            const dialogue = this.dialogueSystem.showDialogue(npcId, 'questComplete', quest);
            return { type: 'complete', quest, dialogue };
        }

        // Check for available quests
        if (quests.available.length > 0) {
            const quest = quests.available[0];
            if (this.canAcceptQuest(quest, player.level)) {
                const dialogue = this.dialogueSystem.showDialogue(npcId, 'questAvailable', quest);
                return { type: 'available', quest, dialogue };
            }
        }

        // No quest interaction
        const dialogue = this.dialogueSystem.showDialogue(npcId, 'greeting');
        return { type: 'greeting', dialogue };
    }

    // Get quest progress
    getQuestProgress(questId) {
        const quest = this.activeQuests.find(q => q.id === questId);
        if (!quest) return null;

        return {
            id: quest.id,
            title: quest.title,
            objectives: quest.objectives.map(obj => ({
                description: obj.description,
                current: obj.current,
                required: obj.count || 1,
                completed: obj.count ? obj.current >= obj.count : obj.current === true
            }))
        };
    }

    // Get all active quest progress
    getAllProgress() {
        return this.activeQuests.map(quest => this.getQuestProgress(quest.id));
    }
}

// Export for use in main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QuestManager, DialogueSystem, NPCS, MAIN_QUESTS, SIDE_QUESTS, DAILY_QUESTS };
}
