// STORY DATA & NARRATIVE SYSTEM
// This file contains all story, quest, NPC, and lore data

// ============================================
// MAIN STORY - 12 CHAPTERS
// ============================================
const STORY_CHAPTERS = [
    {
        id: 1,
        title: "Karanlığın Uyanışı",
        description: "Huzurlu köyünüz gece yarısı gizemli bir güçle sarsıldı. Yaşlılar eski bir lanet hakkında fısıldaşıyor.",
        objectives: [
            { type: 'talk', target: 'elder', text: 'Köy Yaşlısı ile konuş' },
            { type: 'kill', target: 'Kurt', count: 5, current: 0, text: '5 Kurt öldür' }
        ],
        rewards: { xp: 200, gold: 50, item: 'Kılıç' },
        unlockLevel: 1,
        completed: false
    },
    {
        id: 2,
        title: "İlk İpuçları",
        description: "Yaşlı sana eski bir efsaneden bahsetti. Karanlık Lord tekrar uyanmak üzere. İlk ipucunu bulmak için ormana gitmelisin.",
        objectives: [
            { type: 'explore', target: 'dark_forest', text: 'Karanlık Orman\'ı keşfet' },
            { type: 'kill', target: 'Goblin', count: 10, current: 0, text: '10 Goblin öldür' },
            { type: 'collect', target: 'Eski Kitap', count: 1, current: 0, text: 'Eski Kitabı bul' }
        ],
        rewards: { xp: 300, gold: 100, item: 'Zırh' },
        unlockLevel: 3,
        completed: false
    },
    {
        id: 3,
        title: "Unutulmuş Tapınak",
        description: "Eski kitapta bir harita var. Kayıp bir tapınağa işaret ediyor. Belki orada cevaplar bulabilirsin.",
        objectives: [
            { type: 'explore', target: 'temple', text: 'Unutulmuş Tapınağı keşfet' },
            { type: 'kill', target: 'Temple Guardian', count: 3, current: 0, text: '3 Tapınak Muhafızı öldür' },
            { type: 'boss', target: 'Corrupted Priest', text: 'Bozulmuş Rahip ile savaş' }
        ],
        rewards: { xp: 500, gold: 200, item: 'Kutsal Madalyon' },
        unlockLevel: 5,
        completed: false
    },
    {
        id: 4,
        title: "Üç Mühür",
        description: "Karanlık Lord üç güçlü mühürle hapsedilmiş. Ama mühürler zayıflıyor. Onları güçlendirmelsin.",
        objectives: [
            { type: 'collect', target: 'Kuzey Mührü', count: 1, current: 0, text: 'Kuzey Mührü\'nü bul' },
            { type: 'collect', target: 'Güney Mührü', count: 1, current: 0, text: 'Güney Mührü\'nü bul' },
            { type: 'collect', target: 'Doğu Mührü', count: 1, current: 0, text: 'Doğu Mührü\'nü bul' }
        ],
        rewards: { xp: 800, gold: 300, item: 'Mühür Anahtarı' },
        unlockLevel: 7,
        completed: false
    },
    {
        id: 5,
        title: "Dağ Kaleleri",
        description: "Kuzey mührü buzlu dağların zirvesindeki eski bir kalede. Orklar kaleyi ele geçirmiş.",
        objectives: [
            { type: 'explore', target: 'mountain_fortress', text: 'Dağ Kalesini keşfet' },
            { type: 'kill', target: 'Ork', count: 20, current: 0, text: '20 Ork öldür' },
            { type: 'boss', target: 'Ork Warlord', text: 'Ork Savaş Lordu ile savaş' }
        ],
        rewards: { xp: 1000, gold: 400, item: 'Buzlu Kılıç' },
        unlockLevel: 10,
        completed: false
    },
    {
        id: 6,
        title: "Bataklık Sırları",
        description: "Güney mührü zehirli bataklıkların derinliklerinde. Troller ve karanlık yaratıklar seni bekliyor.",
        objectives: [
            { type: 'explore', target: 'poison_swamp', text: 'Zehir Bataklığını keşfet' },
            { type: 'kill', target: 'Troll', count: 15, current: 0, text: '15 Troll öldür' },
            { type: 'boss', target: 'Swamp Witch', text: 'Bataklık Cadısı ile savaş' }
        ],
        rewards: { xp: 1200, gold: 500, item: 'Zehir Direnç Zırhı' },
        unlockLevel: 12,
        completed: false
    },
    {
        id: 7,
        title: "Ateş Diyarı",
        description: "Doğu mührü volkanik topraklarda, ateş ejderhalarının yuvasında bulunuyor.",
        objectives: [
            { type: 'explore', target: 'volcano', text: 'Yanardağı keşfet' },
            { type: 'kill', target: 'Ateş Elementi', count: 25, current: 0, text: '25 Ateş Elementi öldür' },
            { type: 'boss', target: 'Fire Drake', text: 'Ateş Ejderhası ile savaş' }
        ],
        rewards: { xp: 1500, gold: 600, item: 'Ateş Taşı' },
        unlockLevel: 15,
        completed: false
    },
    {
        id: 8,
        title: "İhanet",
        description: "Köyüne döndüğünde korkunç bir gerçek öğreniyorsun. Biri mühürleri zayıflatıyor. İçeriden bir hain var!",
        objectives: [
            { type: 'talk', target: 'suspicious_merchant', text: 'Şüpheli Tüccar ile konuş' },
            { type: 'investigate', target: 'betrayal', text: 'İhaneti araştır' },
            { type: 'boss', target: 'Corrupted Knight', text: 'Bozulmuş Şövalye ile savaş' }
        ],
        rewards: { xp: 2000, gold: 800, item: 'Gerçek Görücü Amulet' },
        unlockLevel: 18,
        completed: false
    },
    {
        id: 9,
        title: "Karanlık Ordu",
        description: "Karanlık Lord'un ordusu uyanıyor. Her yerden karanlık yaratıklar beliriyor. Hazırlanmalısın!",
        objectives: [
            { type: 'kill', target: 'Shadow Warrior', count: 30, current: 0, text: '30 Gölge Savaşçısı öldür' },
            { type: 'defend', target: 'village', text: 'Köyü savun' },
            { type: 'ally', target: 'guilds', text: 'Loncalardan yardım topla' }
        ],
        rewards: { xp: 2500, gold: 1000, item: 'Işık Kılıcı' },
        unlockLevel: 20,
        completed: false
    },
    {
        id: 10,
        title: "Kayıp Silah",
        description: "Efsanevi bir silah var. Tek başına Karanlık Lord'a karşı durabilecek güce sahip. Onu bulmalısın!",
        objectives: [
            { type: 'explore', target: 'ancient_ruins', text: 'Antik Harabeleri keşfet' },
            { type: 'solve', target: 'ancient_puzzle', text: 'Eski bulmacayı çöz' },
            { type: 'boss', target: 'Ancient Guardian', text: 'Antik Muhafız ile savaş' }
        ],
        rewards: { xp: 3000, gold: 1500, item: 'Yıldız Kılıcı' },
        unlockLevel: 23,
        completed: false
    },
    {
        id: 11,
        title: "Son Hazırlık",
        description: "Artık zamanı geldi. Karanlık Lord'un kalesine saldırıya hazırlanıyorsun. Tüm güçlerini toplamalısın.",
        objectives: [
            { type: 'powerup', target: 'max_level', text: 'Seviye 25\'e ulaş' },
            { type: 'collect', target: 'Legendary Gear', count: 5, current: 0, text: '5 Efsanevi Ekipman topla' },
            { type: 'ally', target: 'final_army', text: 'Son orduyu topla' }
        ],
        rewards: { xp: 4000, gold: 2000, item: 'Ejderha Zırhı' },
        unlockLevel: 25,
        completed: false
    },
    {
        id: 12,
        title: "Son Savaş",
        description: "Karanlık Lord'un kalesi önünde duruyorsun. Dünyanın kaderi senin ellerinde. Zafer ya da ölüm!",
        objectives: [
            { type: 'explore', target: 'dark_castle', text: 'Karanlık Kale\'ye gir' },
            { type: 'boss', target: 'Dark General', text: 'Karanlık General ile savaş' },
            { type: 'boss', target: 'Dark Lord', text: 'Karanlık Lord ile son savaş!' }
        ],
        rewards: { xp: 10000, gold: 5000, item: 'Kahraman Tacı' },
        unlockLevel: 28,
        completed: false,
        isFinal: true
    }
];

// ============================================
// NPC SYSTEM
// ============================================
const NPCS = {
    elder: {
        name: 'Bilge Yaşlı',
        icon: '🧙',
        title: 'Köy Yaşlısı',
        location: 'village',
        dialogue: {
            greeting: [
                "Hoş geldin genç savaşçı. Çok kötü haberler var...",
                "Eski güçler tekrar uyanıyor. Yardımına ihtiyacımız var.",
                "Zamanında bir kahraman vardı. Belki sen o kahramanın yolundan gidebilirsin."
            ],
            quest: [
                "Ormanda garip şeyler oluyor. Kurtlar saldırganlaştı. Onları temizler misin?",
                "5 kurt öldürürsen köy daha güvenli olur. Sana ödül vereceğim."
            ],
            complete: [
                "Harika iş çıkardın! Al, bu ödülü hak ettin.",
                "Ama bu sadece başlangıç. Daha büyük tehlikeler bizi bekliyor..."
            ],
            rumors: [
                "Eski efsanelere göre, Karanlık Lord üç mühürle hapsedilmiş.",
                "Dağların ardında eski bir tapınak var. Oraya kimse yaklaşamıyor.",
                "Bazı tüccarlar çok şüpheli... Dikkatli ol."
            ]
        },
        quests: ['story_1', 'side_1']
    },
    blacksmith: {
        name: 'Demirci Grom',
        icon: '⚒️',
        title: 'Usta Demirci',
        location: 'village',
        dialogue: {
            greeting: [
                "Ho! Yeni müşteri! Silaha mı ihtiyacın var?",
                "En iyi zırhları ben yaparım. Ama malzeme lazım!"
            ],
            shop: [
                "Bak ne güzel şeyler var. Ama ucuz değil!",
                "Altın var mı? Varsa iyi silahlar alabiliriz."
            ],
            quest: [
                "Bana 10 tane Demir Cevheri getir, sana özel bir kılıç yapayım!"
            ]
        },
        shop: {
            weapons: [
                { name: 'Çelik Kılıç', damage: 15, price: 200 },
                { name: 'Savaş Baltası', damage: 20, price: 350 },
                { name: 'Ejderha Kılıcı', damage: 35, price: 1000 }
            ],
            armor: [
                { name: 'Deri Zırh', defense: 10, price: 150 },
                { name: 'Zincirli Zırh', defense: 20, price: 400 },
                { name: 'Plaka Zırh', defense: 35, price: 900 }
            ]
        },
        quests: ['side_3', 'side_7']
    },
    mysterious_wizard: {
        name: 'Gizemli Büyücü',
        icon: '🔮',
        title: 'Eski Bilge',
        location: 'forest',
        dialogue: {
            greeting: [
                "Hmm... Seni bekliyordum. Kaderin seni buraya getirdi.",
                "Gelecekte büyük şeyler görüyorum... Ve büyük tehlikeler."
            ],
            prophecy: [
                "Üç mühür zayıflıyor. Biri kuzeyden, biri güneyden, biri doğudan.",
                "Karanlık Lord uyanırsa, bu dünya sona erer.",
                "Ama sen... Sen farklısın. İçinde güç görüyorum."
            ],
            magic: [
                "Sana eski büyüleri öğretebilirim. Ama bedeli ağır...",
                "Bilgelik parasız değildir genç savaşçı."
            ]
        },
        quests: ['story_3', 'side_5'],
        teaches: ['magic_skills']
    },
    merchant: {
        name: 'Tüccar Malik',
        icon: '💼',
        title: 'Gezgin Tüccar',
        location: 'village',
        dialogue: {
            greeting: [
                "Hoş geldin! En iyi iksirleri satıyorum!",
                "Maceranda sana lazım olacak şeyler var burada."
            ],
            shop: [
                "Bakkalım, neye ihtiyacın var?"
            ]
        },
        shop: {
            potions: [
                { name: 'Can İksiri', heal: 50, price: 20 },
                { name: 'Büyük Can İksiri', heal: 100, price: 50 },
                { name: 'Mana İksiri', mana: 50, price: 25 },
                { name: 'Büyük Mana İksiri', mana: 100, price: 60 }
            ],
            misc: [
                { name: 'Şans Tılsımı', effect: 'luck', price: 100 },
                { name: 'XP Artışı', effect: 'xp_boost', price: 150 }
            ]
        }
    },
    suspicious_merchant: {
        name: 'Şüpheli Adam',
        icon: '🥷',
        title: '???',
        location: 'dark_alley',
        dialogue: {
            greeting: [
                "Pssst... Buraya gel. Özel şeyler satıyorum...",
                "Kimseye söyleme ama... Çok güçlü itemler var."
            ],
            suspicious: [
                "Ne bakıyorsun öyle? Sorun mu var?",
                "Ben sadece iş yapıyorum. Soru sorma çok."
            ],
            truth: [
                "Kahretsin! Beni tanıdın değil mi?",
                "Evet, Karanlık Lord için çalışıyorum! Ne yapacaksın?"
            ]
        },
        quests: ['story_8'],
        hostile: true
    },
    dragon_elder: {
        name: 'Ejderha Yaşlısı Ignis',
        icon: '🐲',
        title: 'Son Ejderha',
        location: 'dragon_peak',
        dialogue: {
            greeting: [
                "İnsanoğlu... Yüzyıllardır kimse buraya gelmedi.",
                "Ne cesaret... Ne aptallık... Yoksa kaderin mi seni getirdi?"
            ],
            wisdom: [
                "Ben son ejderhayım. Kardeşlerimi Karanlık Lord öldürdü.",
                "Eğer onu yenmek istiyorsan, gücüme ihtiyacın olacak.",
                "Ama önce değerini kanıtlamalısın!"
            ],
            trial: [
                "Üç denemeyi geç. Sonra sana güç vereceğim.",
                "Güç... Cesaret... Bilgelik... Hepsini göstermelisin!"
            ]
        },
        quests: ['story_10', 'dragon_trial'],
        gives: ['dragon_blessing']
    }
};

// ============================================
// QUEST SYSTEM
// ============================================
const QUESTS = {
    // Main Story Quests
    story_1: {
        id: 'story_1',
        type: 'main',
        chapter: 1,
        name: 'Karanlığın Uyanışı',
        giver: 'elder',
        description: 'Köy yaşlısı seninle konuşmak istiyor.',
        objectives: [
            { type: 'talk', target: 'elder', completed: false },
            { type: 'kill', target: 'Kurt', count: 5, current: 0 }
        ],
        rewards: { xp: 200, gold: 50, item: 'Kılıç' },
        unlockLevel: 1
    },

    // Side Quests
    side_1: {
        id: 'side_1',
        type: 'side',
        name: 'Kayıp Kedi',
        giver: 'little_girl',
        description: 'Küçük kızın kedisi ormanda kaybolmuş.',
        objectives: [
            { type: 'find', target: 'lost_cat', completed: false }
        ],
        rewards: { xp: 50, gold: 20 },
        unlockLevel: 1,
        timeLimit: null
    },

    side_2: {
        id: 'side_2',
        type: 'side',
        name: 'Şifalı Otlar',
        giver: 'healer',
        description: 'Şifacı kadın acil şifalı otlara ihtiyaç duyuyor.',
        objectives: [
            { type: 'collect', target: 'Şifalı Ot', count: 10, current: 0 }
        ],
        rewards: { xp: 100, gold: 30, item: 'Can İksiri' },
        unlockLevel: 2
    },

    side_3: {
        id: 'side_3',
        type: 'side',
        name: 'Demircinin Siparişi',
        giver: 'blacksmith',
        description: 'Demirci senden demir cevheri toplamını istiyor.',
        objectives: [
            { type: 'collect', target: 'Demir Cevheri', count: 10, current: 0 }
        ],
        rewards: { xp: 150, gold: 100, item: 'Çelik Kılıç' },
        unlockLevel: 3,
        repeatable: true
    },

    side_4: {
        id: 'side_4',
        type: 'side',
        name: 'Haydutlar!',
        giver: 'guard',
        description: 'Haydutlar yol kesiyorlar. Onları durdur!',
        objectives: [
            { type: 'kill', target: 'Haydut', count: 15, current: 0 }
        ],
        rewards: { xp: 200, gold: 150 },
        unlockLevel: 5
    },

    side_5: {
        id: 'side_5',
        type: 'side',
        name: 'Büyülü Malzemeler',
        giver: 'mysterious_wizard',
        description: 'Büyücü nadir malzemeler arıyor.',
        objectives: [
            { type: 'collect', target: 'Ay Kristali', count: 3, current: 0 },
            { type: 'collect', target: 'Yıldız Tozu', count: 5, current: 0 }
        ],
        rewards: { xp: 300, gold: 200, item: 'Büyü Kitabı' },
        unlockLevel: 7
    },

    // Daily Quests
    daily_1: {
        id: 'daily_1',
        type: 'daily',
        name: 'Günlük Avlanma',
        description: 'Bugün 20 mob öldür.',
        objectives: [
            { type: 'kill', count: 20, current: 0 }
        ],
        rewards: { xp: 150, gold: 50 },
        resetTime: 'daily'
    },

    daily_2: {
        id: 'daily_2',
        type: 'daily',
        name: 'Günlük Toplama',
        description: 'Bugün 15 item topla.',
        objectives: [
            { type: 'collect', count: 15, current: 0 }
        ],
        rewards: { xp: 100, gold: 40 },
        resetTime: 'daily'
    },

    daily_3: {
        id: 'daily_3',
        type: 'daily',
        name: 'Günlük Boss Avı',
        description: 'Bugün 5 boss öldür.',
        objectives: [
            { type: 'kill_boss', count: 5, current: 0 }
        ],
        rewards: { xp: 300, gold: 100, item: 'Nadir Sandık' },
        resetTime: 'daily'
    }
};

// ============================================
// WORLD LORE
// ============================================
const WORLD_LORE = {
    regions: {
        village: {
            name: 'Umut Köyü',
            description: 'Huzurlu bir köy. Yüzyıllardır burada yaşayan halk barış içinde. Ama artık karanlık güçler yaklaşıyor.',
            history: 'Köy, Karanlık Lord\'un ilk savaşında kahramanlar tarafından kuruldu. Her ev bir savaşçının anısına yapıldı.',
            secrets: 'Köyün altında eski bir sığınak var. İçinde unutulmuş hazineler saklanıyor.'
        },
        dark_forest: {
            name: 'Karanlık Orman',
            description: 'Gün ışığının zor ulaştığı, tehlikeli yaratıklarla dolu bir orman.',
            history: 'Eskiden Elf\'lerin yurdu. Karanlık Lord\'un laneti ormana çöktüğünde terk edildi.',
            secrets: 'Ormanın kalbinde eski bir Elf tapınağı var. İçinde güçlü büyüler saklanıyor.',
            dangers: ['Kurtlar', 'Goblinler', 'Karanlık Ruhlar']
        },
        mountain_fortress: {
            name: 'Kuzey Dağları',
            description: 'Buzla kaplı, yüksek dağlar. Eski bir kale burada unutulmuş.',
            history: 'Cüce savaşçıların evi. En büyük silahları burada yapılmıştı. Orklar tarafından ele geçirildi.',
            secrets: 'Dağların derinliklerinde mitril cevheri var. Efsanevi silahlar yapılabilir.',
            dangers: ['Orklar', 'Buz Devleri', 'Kar Fırtınaları']
        },
        poison_swamp: {
            name: 'Zehir Bataklığı',
            description: 'Ölümcül gazlar ve zehirli sularla dolu karanlık bir bataklık.',
            history: 'Eski bir savaşta kimyasal silahlar kullanıldı. Toprak asla iyileşmedi.',
            secrets: 'Bataklığın ortasında bir ada var. Orada güçlü bir cadı yaşıyor.',
            dangers: ['Troller', 'Zehirli Sürüngenler', 'Bataklık Cadısı']
        },
        volcano: {
            name: 'Ateş Dağı',
            description: 'Aktif bir yanardağ. Lav nehirleri ve ateş elementleri her yerde.',
            history: 'Ejderhaların doğum yeri. Hâlâ bazı ejderhalar burada yaşıyor.',
            secrets: 'Volkanın kraterin içinde Ateş Kristali var. Sınırsız güç verir.',
            dangers: ['Ateş Elementleri', 'Lav Yaratıkları', 'Genç Ejderhalar']
        },
        dark_castle: {
            name: 'Karanlık Kale',
            description: 'Karanlık Lord\'un evidir. Korku ve ölüm burayı kuşatmış.',
            history: 'Bin yıl önce bir kahraman burayı bastı ve Karanlık Lord\'u mühürledi.',
            secrets: 'Kalenin en derininde eski bir portal var. Başka boyutlara açılıyor.',
            dangers: ['Shadow Warriors', 'Ölümsüz Gardiyanlar', 'Karanlık Lord']
        }
    },

    bosses: {
        'Corrupted Priest': {
            name: 'Bozulmuş Rahip',
            lore: 'Bir zamanlar kutsal bir rahipti. Karanlık Lord onu lanetledi ve kötülüğün hizmetkarı yaptı.',
            weakness: 'Kutsal büyülerden korkar.',
            drops: ['Kutsal Madalyon', 'Bozulmuş Kitap']
        },
        'Ork Warlord': {
            name: 'Ork Savaş Lordu',
            lore: 'Ork kabilelerinin en güçlüsü. Kuzey Dağları\'nı ele geçirdi ve Cüceleri sürdü.',
            weakness: 'Yavaş ama çok güçlü. Hızlı saldırılarla yenilebilir.',
            drops: ['Ork Zırhı', 'Savaş Baltası']
        },
        'Swamp Witch': {
            name: 'Bataklık Cadısı',
            lore: 'Yüzyıllardır bataklıkta yaşıyor. Zehir büyülerinde uzman.',
            weakness: 'Ateş büyülerine karşı savunmasız.',
            drops: ['Cadı Asası', 'Zehir Antidotu Formülü']
        },
        'Fire Drake': {
            name: 'Ateş Ejderhası',
            lore: 'Genç bir ejderha. Ama hâlâ çok güçlü. Volkanı korur.',
            weakness: 'Su ve buz büyüleri.',
            drops: ['Ejderha Pulu', 'Ateş Taşı']
        },
        'Dark Lord': {
            name: 'Karanlık Lord',
            lore: 'Ölümsüz bir varlık. Bin yıl önce yenildi ama tekrar uyanıyor. Eğer serbest kalırsa dünya yok olacak.',
            weakness: 'Sadece Yıldız Kılıcı ile yaralanabilir. Üç mührün gücü gerekli.',
            drops: ['Karanlık Taç', 'Ölümsüzlük Mücevheri', 'Karanlık Lord\'un Kılıcı'],
            phases: 3,
            abilities: ['Karanlık Patlama', 'Ruh Emme', 'Ölümsüz Ordu Çağırma']
        }
    },

    items: {
        'Yıldız Kılıcı': {
            name: 'Yıldız Kılıcı',
            lore: 'Antik çağda tanrılar tarafından yapılmış. Karanlığı yok etme gücü var.',
            history: 'Son kahraman bunu kullanarak Karanlık Lord\'u mühürledi.',
            power: 'Karanlık varlıklara ekstra hasar verir.'
        },
        'Kutsal Madalyon': {
            name: 'Kutsal Madalyon',
            lore: 'Eski tapınağın baş rahibine aitti. Koruyucu güçleri var.',
            power: 'Karanlık büyülere karşı koruma sağlar.'
        },
        'Ejderha Zırhı': {
            name: 'Ejderha Zırhı',
            lore: 'Ejderha pullarından yapılmış. Neredeyse yok edilemez.',
            history: 'Eski bir ejderha avcısına ait.',
            power: 'Ateş hasarını %50 azaltır.'
        },
        'Kahraman Tacı': {
            name: 'Kahraman Tacı',
            lore: 'Karanlık Lord\'u yenenlere verilen ödül. Sonsuz şan ve şeref sembolü.',
            power: 'Tüm yetenekleri güçlendirir.',
            legendary: true
        }
    },

    factions: {
        warriors_guild: {
            name: 'Savaşçılar Loncası',
            description: 'En güçlü savaşçıların toplandığı yer.',
            leader: 'Komutan Marcus',
            benefits: 'Savaş yetenekleri artışı, özel ekipman',
            quests: ['arena_battles', 'monster_slayer']
        },
        mages_tower: {
            name: 'Büyücüler Kulesi',
            description: 'Büyü ustalarının araştırma merkezi.',
            leader: 'Başbüyücü Elara',
            benefits: 'Büyü güçlendirme, nadir büyüler öğrenme',
            quests: ['magical_research', 'artifact_hunt']
        },
        thieves_den: {
            name: 'Hırsızlar Ini',
            description: 'Gizli bir organizasyon. Bilgi ve nadir itemler satan.',
            leader: 'Gölge Kraliçesi',
            benefits: 'Kritik şans artışı, gizli görevler',
            quests: ['stealth_missions', 'heist']
        }
    }
};

// ============================================
// DIALOGUE TREES
// ============================================
const DIALOGUE_TREES = {
    elder_first_meet: {
        start: {
            text: "Ah, genç savaşçı. Tam seni arıyordum.",
            options: [
                { text: "Ne oldu?", next: "explain_danger" },
                { text: "Meşgulüm şimdi.", next: "dismiss", attitude: -5 }
            ]
        },
        explain_danger: {
            text: "Korkunç haberler var. Karanlık güçler tekrar uyanıyor. Yardımına ihtiyacım var.",
            options: [
                { text: "Nasıl yardım edebilirim?", next: "give_quest", attitude: +10 },
                { text: "Bu benim sorunum değil.", next: "refuse", attitude: -10 }
            ]
        },
        give_quest: {
            text: "Ormandaki kurtlar çok saldırgan oldu. 5 tanesini öldürürsen köy güvende olur.",
            action: "start_quest",
            questId: "story_1"
        },
        refuse: {
            text: "Anlıyorum... Ama yakında herkesin sorunu olacak bu.",
            end: true
        },
        dismiss: {
            text: "Peki... Ama bu çok önemli. Sonra gel.",
            end: true
        }
    }
};

// ============================================
// ACHIEVEMENTS & TITLES
// ============================================
const ACHIEVEMENTS = {
    first_blood: {
        name: 'İlk Kan',
        description: 'İlk mobunu öldür',
        reward: { title: 'Acemi Avcı', xp: 50 },
        icon: '⚔️'
    },
    level_10: {
        name: 'Güçleniyorsun',
        description: 'Seviye 10\'a ulaş',
        reward: { title: 'Deneyimli Savaşçı', gold: 100 },
        icon: '🌟'
    },
    boss_slayer: {
        name: 'Boss Avcısı',
        description: '10 boss öldür',
        reward: { title: 'Boss Katili', item: 'Efsanevi Sandık' },
        icon: '💀'
    },
    story_complete: {
        name: 'Hikaye Tamamlandı',
        description: 'Ana hikayeyi tamamla',
        reward: { title: 'Kahraman', item: 'Kahraman Tacı' },
        icon: '👑',
        legendary: true
    },
    collector: {
        name: 'Koleksiyoncu',
        description: '100 item topla',
        reward: { title: 'Hazine Avcısı', gold: 500 },
        icon: '💎'
    },
    speed_runner: {
        name: 'Hız Canavarı',
        description: 'Ana hikayeyi 5 saatte bitir',
        reward: { title: 'Hız Tanrısı', item: 'Hız Potu' },
        icon: '⚡',
        hidden: true
    }
};

// Export all data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        STORY_CHAPTERS,
        NPCS,
        QUESTS,
        WORLD_LORE,
        DIALOGUE_TREES,
        ACHIEVEMENTS
    };
}
