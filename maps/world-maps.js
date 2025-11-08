// World Maps System - Tiled Map Editor Integration
// Each map contains unique mobs, bosses, NPCs, and secret areas

// Map definitions with Tiled-compatible structure
const WORLD_MAPS = {
    forest: {
        id: 'forest',
        name: 'Yeşil Orman',
        levelRange: [1, 15],
        description: 'Yeni maceracılar için güvenli bir başlangıç bölgesi',
        backgroundColor: '#2d5016',
        tileSize: 32,
        width: 100,
        height: 100,

        // Tileset data
        tiles: {
            grass: { color: '#4a7c2f', pattern: '🌿' },
            tree: { color: '#1a4d0f', pattern: '🌲', collision: true },
            water: { color: '#4a90e2', pattern: '💧', collision: true },
            path: { color: '#8b7355', pattern: '.' },
            stone: { color: '#888888', pattern: '🪨', collision: true }
        },

        // Spawn zones
        playerSpawn: { x: 50, y: 50 },

        // NPCs
        npcs: [
            {
                name: 'Köy Reisi',
                icon: '🧙',
                x: 45,
                y: 48,
                dialogue: [
                    'Hoş geldin genç savaşçı!',
                    'Ormanda kurt sürüleri dolaşıyor.',
                    'Dikkatli ol ve güçlen!'
                ],
                quests: [
                    {
                        id: 'forest_wolves',
                        name: '10 Kurt Av',
                        description: 'Köyü tehdit eden kurtları yen',
                        reward: { xp: 500, gold: 100 },
                        objective: { type: 'kill', target: 'Kurt', count: 10 }
                    }
                ]
            },
            {
                name: 'Silah Tüccarı',
                icon: '⚔️',
                x: 47,
                y: 48,
                type: 'merchant',
                items: [
                    { name: 'Tahta Kılıç', damage: 5, price: 50, icon: '⚔️' },
                    { name: 'Deri Zırh', defense: 3, price: 75, icon: '🛡️' },
                    { name: 'Can İksiri', heal: 50, price: 25, icon: '❤️' }
                ]
            },
            {
                name: 'Yaşlı Keşiş',
                icon: '🧘',
                x: 52,
                y: 52,
                dialogue: [
                    'Gizli bir mağara duydum...',
                    'Kuzeybatıda, büyük kayaların arkasında...',
                    'Ama dikkatli ol, tehlikeli yaratıklar var!'
                ]
            }
        ],

        // Unique mobs
        mobs: [
            {
                type: 'Kurt',
                icon: '🐺',
                hp: 40,
                damage: 6,
                defense: 2,
                xp: 20,
                gold: 8,
                speed: 1.8,
                spawnChance: 0.4,
                abilities: ['Hızlı Saldırı']
            },
            {
                type: 'Yabani Ayı',
                icon: '🐻',
                hp: 80,
                damage: 12,
                defense: 5,
                xp: 35,
                gold: 15,
                speed: 1.2,
                spawnChance: 0.25,
                abilities: ['Pençe Darbesi']
            },
            {
                type: 'Zehirli Örümcek',
                icon: '🕷️',
                hp: 30,
                damage: 8,
                defense: 1,
                xp: 25,
                gold: 10,
                speed: 2.0,
                spawnChance: 0.2,
                abilities: ['Zehir'],
                poisonDamage: 2,
                poisonDuration: 5000
            },
            {
                type: 'Goblin Avcı',
                icon: '👺',
                hp: 50,
                damage: 10,
                defense: 3,
                xp: 30,
                gold: 12,
                speed: 1.5,
                spawnChance: 0.15,
                abilities: ['Ok Atışı'],
                ranged: true,
                range: 150
            }
        ],

        // Mini-boss
        miniBoss: {
            type: 'Alfa Kurt',
            icon: '🐺',
            scale: 1.5,
            hp: 300,
            damage: 20,
            defense: 8,
            xp: 200,
            gold: 100,
            speed: 1.3,
            spawnLocation: { x: 75, y: 25 },
            abilities: ['Kurt Çağırma', 'Kudurmuş Saldırı'],
            drops: [
                { name: 'Kurt Postu', icon: '🧥', rarity: 'uncommon', defense: 8 },
                { name: 'Alfa Dişi', icon: '🦷', rarity: 'rare', damage: 12 }
            ]
        },

        // Major boss
        boss: {
            type: 'Orman Tırmanı',
            icon: '👹',
            scale: 2.0,
            hp: 800,
            damage: 35,
            defense: 15,
            xp: 500,
            gold: 300,
            speed: 0.9,
            spawnLocation: { x: 20, y: 20 },
            abilities: ['Ağaç Çağırma', 'Toprak Darbesi', 'Öfke'],
            phases: [
                { hpThreshold: 0.7, ability: 'Minyon Çağırma' },
                { hpThreshold: 0.3, ability: 'Berserk Mod' }
            ],
            drops: [
                { name: 'Tiran Tacı', icon: '👑', rarity: 'epic', defense: 20, hp: 50 },
                { name: 'Doğa Berekeті', icon: '💎', rarity: 'legendary', special: 'HP Regen +5' }
            ]
        },

        // Secret area
        secretArea: {
            name: 'Gizli Mağara',
            entrance: { x: 15, y: 15 },
            requiredLevel: 8,
            description: 'Antik hazinelerle dolu gizemli bir mağara',
            mobs: [
                { type: 'Mağara Yarası', icon: '🦇', hp: 25, damage: 7, xp: 15, gold: 8, speed: 2.2 }
            ],
            treasure: {
                guaranteed: [
                    { name: 'Antik Altın', icon: '💰', value: 500 },
                    { name: 'Güç İksiri', icon: '⚗️', effect: 'damage', value: 10, duration: 300000 }
                ],
                rare: [
                    { name: 'Gizemli Anahtar', icon: '🔑', rarity: 'rare', use: 'Özel kapıları açar' }
                ]
            }
        }
    },

    desert: {
        id: 'desert',
        name: 'Kızgın Çöl',
        levelRange: [16, 30],
        description: 'Sıcak kumlar ve tehlikeli yaratıklar',
        backgroundColor: '#e8c468',
        tileSize: 32,
        width: 120,
        height: 120,

        tiles: {
            sand: { color: '#e8c468', pattern: '.' },
            dune: { color: '#d4a74f', pattern: '~' },
            rock: { color: '#8b7355', pattern: '🪨', collision: true },
            cactus: { color: '#4a7c2f', pattern: '🌵', collision: true },
            oasis: { color: '#4a90e2', pattern: '💧' }
        },

        playerSpawn: { x: 60, y: 100 },

        npcs: [
            {
                name: 'Çöl Göçebesi',
                icon: '🧕',
                x: 58,
                y: 98,
                dialogue: [
                    'Çölde hayatta kalmak zor...',
                    'Su bul, gölgede kal.',
                    'Akreplere dikkat et!'
                ]
            },
            {
                name: 'Antik Tüccar',
                icon: '🧞',
                x: 62,
                y: 98,
                type: 'merchant',
                items: [
                    { name: 'Çöl Kılıcı', damage: 18, price: 400, icon: '🗡️' },
                    { name: 'Kum Zırhı', defense: 12, price: 500, icon: '🛡️' },
                    { name: 'Soğuk Su', heal: 80, price: 50, icon: '🧊' }
                ]
            },
            {
                name: 'Piramit Bekçisi',
                icon: '🗿',
                x: 30,
                y: 30,
                dialogue: [
                    'Piramitler lanetli...',
                    'Mumyalar uyanıyor...',
                    'Hazineye giden yol ölümcül!'
                ],
                quests: [
                    {
                        id: 'desert_pyramid',
                        name: 'Piramit Laneti',
                        description: 'Mumya Lordunu yen',
                        reward: { xp: 2000, gold: 1000, item: { name: 'Firavun Mührü', icon: '💍' } },
                        objective: { type: 'kill', target: 'Mumya Lord', count: 1 }
                    }
                ]
            }
        ],

        mobs: [
            {
                type: 'Akrep',
                icon: '🦂',
                hp: 90,
                damage: 18,
                defense: 6,
                xp: 50,
                gold: 25,
                speed: 1.6,
                spawnChance: 0.35,
                abilities: ['Zehirli İğne'],
                poisonDamage: 5,
                poisonDuration: 8000
            },
            {
                type: 'Çöl Solucanı',
                icon: '🐛',
                hp: 150,
                damage: 25,
                defense: 4,
                xp: 70,
                gold: 40,
                speed: 0.8,
                spawnChance: 0.2,
                abilities: ['Yer Altı Dalışı', 'Kum Fırtınası']
            },
            {
                type: 'Mumya',
                icon: '🧟',
                hp: 120,
                damage: 22,
                defense: 10,
                xp: 65,
                gold: 35,
                speed: 1.0,
                spawnChance: 0.25,
                abilities: ['Lanet', 'Undead']
            },
            {
                type: 'Çöl Haydut',
                icon: '🏴‍☠️',
                hp: 110,
                damage: 28,
                defense: 8,
                xp: 60,
                gold: 50,
                speed: 1.5,
                spawnChance: 0.2,
                abilities: ['Hızlı Saldırı', 'Altın Çalma']
            }
        ],

        miniBoss: {
            type: 'Dev Akrep',
            icon: '🦂',
            scale: 1.8,
            hp: 600,
            damage: 40,
            defense: 15,
            xp: 400,
            gold: 250,
            speed: 1.2,
            spawnLocation: { x: 90, y: 30 },
            abilities: ['Zehir Püskürtme', 'Zırh Kırma'],
            drops: [
                { name: 'Akrep Zırhı', icon: '🦂', rarity: 'rare', defense: 18, poisonResist: 50 },
                { name: 'Zehir İğnesi', icon: '💉', rarity: 'uncommon', damage: 20, poison: true }
            ]
        },

        boss: {
            type: 'Mumya Lord',
            icon: '👑',
            scale: 2.2,
            hp: 1500,
            damage: 60,
            defense: 25,
            xp: 1000,
            gold: 800,
            speed: 0.7,
            spawnLocation: { x: 30, y: 30 },
            abilities: ['Mumya Ordusu', 'Antik Lanet', 'Güneş Işını', 'Ruh Emme'],
            phases: [
                { hpThreshold: 0.75, ability: 'Muhafız Çağırma' },
                { hpThreshold: 0.5, ability: 'Kum Fırtınası' },
                { hpThreshold: 0.25, ability: 'Firavun Gazabı' }
            ],
            drops: [
                { name: 'Firavun Asası', icon: '🔱', rarity: 'legendary', damage: 45, mp: 100 },
                { name: 'Ölümsüzlük Tılsımı', icon: '☥', rarity: 'epic', special: 'Ölünce 1 HP ile yaşa' }
            ]
        },

        secretArea: {
            name: 'Antik Piramit',
            entrance: { x: 25, y: 25 },
            requiredLevel: 22,
            description: 'Unutulmuş hazinelerle dolu eski bir piramit',
            mobs: [
                { type: 'Antik Muhafız', icon: '🗿', hp: 180, damage: 35, xp: 80, gold: 60, speed: 0.9 }
            ],
            treasure: {
                guaranteed: [
                    { name: 'Firavun Altını', icon: '💰', value: 2000 },
                    { name: 'Antik Parşömen', icon: '📜', special: 'Yeni skill öğren' }
                ],
                rare: [
                    { name: 'Osiris\'in Berekeті', icon: '💎', rarity: 'legendary', allStats: 15 }
                ]
            }
        }
    },

    iceMountain: {
        id: 'iceMountain',
        name: 'Buz Dağları',
        levelRange: [31, 45],
        description: 'Dondurucu soğuk ve buzdan canavarlar',
        backgroundColor: '#a8d8ea',
        tileSize: 32,
        width: 140,
        height: 140,

        tiles: {
            snow: { color: '#ffffff', pattern: '❄️' },
            ice: { color: '#a8d8ea', pattern: '🧊', slippery: true },
            rock: { color: '#555555', pattern: '🪨', collision: true },
            frozenTree: { color: '#cceeff', pattern: '🌲', collision: true },
            cave: { color: '#333333', pattern: '⛰️' }
        },

        playerSpawn: { x: 70, y: 120 },

        npcs: [
            {
                name: 'Kuzey Şövalyesi',
                icon: '🛡️',
                x: 68,
                y: 118,
                dialogue: [
                    'Dağlar tehlikeli...',
                    'Buz Devleri her yerde!',
                    'Sıcak tut kendini!'
                ]
            },
            {
                name: 'Buzul Tüccarı',
                icon: '🧊',
                x: 72,
                y: 118,
                type: 'merchant',
                items: [
                    { name: 'Buz Kılıcı', damage: 35, price: 1200, icon: '🗡️', freeze: true },
                    { name: 'Kar Zırhı', defense: 25, price: 1500, icon: '🛡️', coldResist: 50 },
                    { name: 'Sıcak Çorba', heal: 150, price: 100, icon: '🍲' }
                ]
            },
            {
                name: 'Yeti Avcısı',
                icon: '🏹',
                x: 40,
                y: 40,
                dialogue: [
                    'Yeti Kralı efsane!',
                    'Mağaranın derinliklerinde yaşar...',
                    'Kimse canlı dönmedi!'
                ],
                quests: [
                    {
                        id: 'ice_yeti',
                        name: 'Yeti Avı',
                        description: 'Yeti Kralını yen ve postunu getir',
                        reward: { xp: 5000, gold: 3000, item: { name: 'Yeti Postu', icon: '🧥' } },
                        objective: { type: 'kill', target: 'Yeti Kralı', count: 1 }
                    }
                ]
            }
        ],

        mobs: [
            {
                type: 'Buz Kurt',
                icon: '🐺',
                hp: 180,
                damage: 32,
                defense: 12,
                xp: 90,
                gold: 60,
                speed: 2.0,
                spawnChance: 0.3,
                abilities: ['Buz Nefesi'],
                freezeChance: 0.2
            },
            {
                type: 'Kar Golem',
                icon: '⛄',
                hp: 280,
                damage: 40,
                defense: 20,
                xp: 120,
                gold: 80,
                speed: 0.7,
                spawnChance: 0.25,
                abilities: ['Kar Fırtınası', 'Buz Zırh']
            },
            {
                type: 'Buzul Cüce',
                icon: '🧙',
                hp: 150,
                damage: 45,
                defense: 10,
                xp: 110,
                gold: 90,
                speed: 1.3,
                spawnChance: 0.2,
                abilities: ['Buz Büyüsü'],
                ranged: true,
                range: 200
            },
            {
                type: 'Donmuş Troll',
                icon: '🧟',
                hp: 250,
                damage: 50,
                defense: 18,
                xp: 130,
                gold: 100,
                speed: 0.9,
                spawnChance: 0.25,
                abilities: ['Donma', 'Güçlü Vuruş']
            }
        ],

        miniBoss: {
            type: 'Buz Devi',
            icon: '🧊',
            scale: 2.0,
            hp: 1200,
            damage: 70,
            defense: 30,
            xp: 800,
            gold: 500,
            speed: 0.8,
            spawnLocation: { x: 100, y: 50 },
            abilities: ['Çığ', 'Buz Hapsi', 'Dondurucu Bakış'],
            drops: [
                { name: 'Dev Kalbi', icon: '💙', rarity: 'epic', hp: 100, defense: 20 },
                { name: 'Buzul Kristali', icon: '💎', rarity: 'rare', mp: 50, freezeDamage: 30 }
            ]
        },

        boss: {
            type: 'Yeti Kralı',
            icon: '🦍',
            scale: 2.5,
            hp: 3000,
            damage: 100,
            defense: 40,
            xp: 2500,
            gold: 2000,
            speed: 1.0,
            spawnLocation: { x: 40, y: 40 },
            abilities: ['Kral Kükreyişi', 'Buz Çağı', 'Gökyüzü Yıkılması', 'Kar Fırtınası'],
            phases: [
                { hpThreshold: 0.75, ability: 'Yeti Çağırma' },
                { hpThreshold: 0.5, ability: 'Donmuş Zırh' },
                { hpThreshold: 0.25, ability: 'Öfke Modu - Tüm Buzlar Erimeye Başlar' }
            ],
            drops: [
                { name: 'Yeti Tacı', icon: '👑', rarity: 'legendary', hp: 150, defense: 40, coldImmune: true },
                { name: 'Sonsuz Kış Asası', icon: '🔱', rarity: 'legendary', damage: 70, freezeAll: true }
            ]
        },

        secretArea: {
            name: 'Kristal Mağarası',
            entrance: { x: 20, y: 20 },
            requiredLevel: 38,
            description: 'Parlak kristallerle dolu gizemli buzul mağarası',
            mobs: [
                { type: 'Kristal Örümcek', icon: '🕷️', hp: 200, damage: 55, xp: 140, gold: 110, speed: 1.8 }
            ],
            treasure: {
                guaranteed: [
                    { name: 'Buzul Hazinesi', icon: '💰', value: 5000 },
                    { name: 'Kristal Kılıç', icon: '⚔️', rarity: 'epic', damage: 50, critChance: 25 }
                ],
                rare: [
                    { name: 'Donmuş Zaman Kristali', icon: '💎', rarity: 'legendary', special: 'Zamanı yavaşlat' }
                ]
            }
        }
    },

    lavaCave: {
        id: 'lavaCave',
        name: 'Lav Mağarası',
        levelRange: [46, 60],
        description: 'Cehennem ateşi ve lav canavarları',
        backgroundColor: '#8b0000',
        tileSize: 32,
        width: 160,
        height: 160,

        tiles: {
            stone: { color: '#2b2b2b', pattern: '.' },
            lava: { color: '#ff4500', pattern: '🔥', damage: 10 },
            obsidian: { color: '#0f0f0f', pattern: '⬛', collision: true },
            fire: { color: '#ff6600', pattern: '🔥' },
            sulfur: { color: '#ffff00', pattern: '💨' }
        },

        playerSpawn: { x: 80, y: 140 },

        npcs: [
            {
                name: 'Ateş Şamani',
                icon: '🔥',
                x: 78,
                y: 138,
                dialogue: [
                    'Lav her yerde...',
                    'Ateş İmparatorluğu tehlikeli!',
                    'Yanma direncin yeterli mi?'
                ]
            },
            {
                name: 'Cehennem Demircisi',
                icon: '⚒️',
                x: 82,
                y: 138,
                type: 'merchant',
                items: [
                    { name: 'Lav Kılıcı', damage: 55, price: 3000, icon: '🗡️', burn: true },
                    { name: 'Ateş Zırhı', defense: 45, price: 4000, icon: '🛡️', fireResist: 80 },
                    { name: 'Ateş Direnci İksiri', price: 500, icon: '🧪', fireImmune: 60000 }
                ]
            },
            {
                name: 'Ejderha Avcısı',
                icon: '🐉',
                x: 40,
                y: 40,
                dialogue: [
                    'Kızıl Ejderha efsanevi!',
                    'Tam mağaranın merkezinde...',
                    'Sadece en güçlüler hayatta kalır!'
                ],
                quests: [
                    {
                        id: 'lava_dragon',
                        name: 'Ejderha Avı',
                        description: 'Kızıl Ejderhayı yen',
                        reward: { xp: 10000, gold: 8000, item: { name: 'Ejderha Kalbi', icon: '❤️' } },
                        objective: { type: 'kill', target: 'Kızıl Ejderha', count: 1 }
                    }
                ]
            }
        ],

        mobs: [
            {
                type: 'Ateş Elemental',
                icon: '🔥',
                hp: 300,
                damage: 60,
                defense: 20,
                xp: 180,
                gold: 140,
                speed: 1.5,
                spawnChance: 0.3,
                abilities: ['Ateş Topu'],
                burnDamage: 10,
                burnDuration: 5000
            },
            {
                type: 'Lav Canavarı',
                icon: '👹',
                hp: 450,
                damage: 75,
                defense: 25,
                xp: 220,
                gold: 180,
                speed: 1.0,
                spawnChance: 0.25,
                abilities: ['Lav Püskürtme', 'Eritme']
            },
            {
                type: 'Kızgın Golem',
                icon: '🗿',
                hp: 550,
                damage: 80,
                defense: 40,
                xp: 240,
                gold: 200,
                speed: 0.7,
                spawnChance: 0.2,
                abilities: ['Sarsıntı', 'Taş Zırh']
            },
            {
                type: 'Cehennem Köpeği',
                icon: '🐕',
                hp: 350,
                damage: 70,
                defense: 15,
                xp: 200,
                gold: 160,
                speed: 2.2,
                spawnChance: 0.25,
                abilities: ['Ateş Nefesi', 'Sürü Saldırısı']
            }
        ],

        miniBoss: {
            type: 'Magma Titan',
            icon: '🔥',
            scale: 2.3,
            hp: 2500,
            damage: 120,
            defense: 50,
            xp: 1500,
            gold: 1200,
            speed: 0.6,
            spawnLocation: { x: 120, y: 60 },
            abilities: ['Lav Patlaması', 'Magma Dalgası', 'Ateş Kalkanı'],
            drops: [
                { name: 'Titan Kalbi', icon: '❤️', rarity: 'epic', hp: 200, fireResist: 100 },
                { name: 'Magma Kristali', icon: '💎', rarity: 'rare', damage: 40, burn: true }
            ]
        },

        boss: {
            type: 'Kızıl Ejderha',
            icon: '🐉',
            scale: 3.0,
            hp: 6000,
            damage: 180,
            defense: 60,
            xp: 6000,
            gold: 5000,
            speed: 1.2,
            spawnLocation: { x: 40, y: 40 },
            abilities: ['Ejderha Nefesi', 'Lav Yağmuru', 'Kuyruk Darbesi', 'Uçuş Saldırısı', 'Cehennem Ateşi'],
            phases: [
                { hpThreshold: 0.75, ability: 'Ateş Duvarı' },
                { hpThreshold: 0.5, ability: 'Hava Saldırısı - Uçuş Başlar' },
                { hpThreshold: 0.25, ability: 'Kıyamet Modu - Tüm Arena Lavla Dolar' }
            ],
            drops: [
                { name: 'Ejderha Taçı', icon: '👑', rarity: 'legendary', allStats: 50, fireImmune: true },
                { name: 'Kızıl Kanatlar', icon: '🦋', rarity: 'legendary', special: 'Uçma yeteneği', speed: 3 },
                { name: 'Ejderha Kalbi', icon: '❤️', rarity: 'mythic', hp: 500, mp: 300, allDamage: 100 }
            ]
        },

        secretArea: {
            name: 'Obsidyen Tapınağı',
            entrance: { x: 20, y: 20 },
            requiredLevel: 52,
            description: 'Eski ateş tanrılarına ait tapınak',
            mobs: [
                { type: 'Ateş Rahibi', icon: '🧙', hp: 400, damage: 90, xp: 260, gold: 220, speed: 1.2 }
            ],
            treasure: {
                guaranteed: [
                    { name: 'Cehennem Hazinesi', icon: '💰', value: 10000 },
                    { name: 'Ateş Tanrısı Asası', icon: '🔱', rarity: 'legendary', damage: 100, fireMastery: true }
                ],
                rare: [
                    { name: 'Phoenix Tüyü', icon: '🦜', rarity: 'mythic', special: 'Ölümden dön (1 kez)' }
                ]
            }
        }
    },

    darkCastle: {
        id: 'darkCastle',
        name: 'Karanlık Kale',
        levelRange: [61, 100],
        description: 'Karanlık lordu ve ordularının kalesi',
        backgroundColor: '#0f0f0f',
        tileSize: 32,
        width: 200,
        height: 200,

        tiles: {
            stone: { color: '#1a1a1a', pattern: '⬛' },
            wall: { color: '#0a0a0a', pattern: '🧱', collision: true },
            darkness: { color: '#000000', pattern: '🌑', visionReduction: 50 },
            blood: { color: '#8b0000', pattern: '🩸' },
            bones: { color: '#f5f5dc', pattern: '🦴' }
        },

        playerSpawn: { x: 100, y: 180 },

        npcs: [
            {
                name: 'Direniş Lideri',
                icon: '⚔️',
                x: 98,
                y: 178,
                dialogue: [
                    'Karanlık Lord çok güçlü!',
                    'Tüm kaleyi ele geçirdi...',
                    'Sen son umudumuzun!'
                ]
            },
            {
                name: 'Gölge Tüccarı',
                icon: '🎭',
                x: 102,
                y: 178,
                type: 'merchant',
                items: [
                    { name: 'Gölge Kılıcı', damage: 100, price: 10000, icon: '🗡️', lifesteal: 0.2 },
                    { name: 'Karanlık Zırh', defense: 80, price: 15000, icon: '🛡️', darkResist: 100 },
                    { name: 'Melek Gözyaşı', heal: 500, price: 2000, icon: '💧' }
                ]
            },
            {
                name: 'Eski Kahraman',
                icon: '🦸',
                x: 50,
                y: 50,
                dialogue: [
                    'Ben de zamanında denedim...',
                    'Ama yenildim...',
                    'Karanlık Lord ölümsüz görünüyor!',
                    'Belki de Kutsal Kılıç...'
                ],
                quests: [
                    {
                        id: 'dark_lord',
                        name: 'Karanlığı Yen',
                        description: 'Karanlık Lordu yen ve dünyayı kurtar',
                        reward: { xp: 50000, gold: 50000, item: { name: 'Kahraman Tacı', icon: '👑' } },
                        objective: { type: 'kill', target: 'Karanlık Lord', count: 1 }
                    }
                ]
            }
        ],

        mobs: [
            {
                type: 'Karanlık Şövalye',
                icon: '⚔️',
                hp: 600,
                damage: 110,
                defense: 50,
                xp: 400,
                gold: 300,
                speed: 1.3,
                spawnChance: 0.25,
                abilities: ['Kara Kılıç', 'Zırh Kırma']
            },
            {
                type: 'Vampir',
                icon: '🧛',
                hp: 500,
                damage: 100,
                defense: 30,
                xp: 380,
                gold: 280,
                speed: 2.0,
                spawnChance: 0.2,
                abilities: ['Kan Emme', 'Yarasa Formu'],
                lifesteal: 0.5
            },
            {
                type: 'Lich',
                icon: '💀',
                hp: 450,
                damage: 130,
                defense: 25,
                xp: 420,
                gold: 320,
                speed: 1.0,
                spawnChance: 0.2,
                abilities: ['Ölü Çağırma', 'Karanlık Büyü'],
                ranged: true,
                range: 250
            },
            {
                type: 'Gölge Suikastçi',
                icon: '🥷',
                hp: 400,
                damage: 150,
                defense: 20,
                xp: 440,
                gold: 340,
                speed: 2.5,
                spawnChance: 0.15,
                abilities: ['Gölgeden Saldırı', 'Kritik Vuruş'],
                critChance: 0.5
            },
            {
                type: 'Cehennem Bekçisi',
                icon: '👹',
                hp: 800,
                damage: 120,
                defense: 60,
                xp: 460,
                gold: 360,
                speed: 0.9,
                spawnChance: 0.2,
                abilities: ['Şeytan Darbesi', 'Korku Çığlığı']
            }
        ],

        miniBoss: {
            type: 'Ölüm Şövalyesi',
            icon: '💀',
            scale: 2.5,
            hp: 5000,
            damage: 200,
            defense: 80,
            xp: 3000,
            gold: 2500,
            speed: 1.1,
            spawnLocation: { x: 150, y: 100 },
            abilities: ['Ölüm Dokunuşu', 'Ruh Hasadı', 'Karanlık Dalga'],
            drops: [
                { name: 'Ölüm Kılıcı', icon: '⚔️', rarity: 'legendary', damage: 120, lifesteal: 0.3 },
                { name: 'Şövalye Zırhı', icon: '🛡️', rarity: 'epic', defense: 100, hp: 300 }
            ]
        },

        boss: {
            type: 'Karanlık Lord',
            icon: '👑',
            scale: 3.5,
            hp: 15000,
            damage: 300,
            defense: 100,
            xp: 20000,
            gold: 20000,
            speed: 1.5,
            spawnLocation: { x: 100, y: 20 },
            abilities: [
                'Karanlık Patlama',
                'Ruh Zincirleri',
                'Gölge Ordusu',
                'Kıyamet Işını',
                'Zaman Durdurma',
                'Karanlık Portal'
            ],
            phases: [
                { hpThreshold: 0.90, ability: 'Karanlık Kalkan Aktif' },
                { hpThreshold: 0.75, ability: 'Şövalye Ordusu Çağır' },
                { hpThreshold: 0.50, ability: 'Şeytan Formu - İkinci Faz' },
                { hpThreshold: 0.25, ability: 'Son Çare - Tüm Güç Serbest' },
                { hpThreshold: 0.10, ability: 'Kıyamet - Arena Yıkılıyor' }
            ],
            drops: [
                { name: 'Karanlık Taç', icon: '👑', rarity: 'mythic', allStats: 100, special: 'Karanlık güçler' },
                { name: 'Lord\'un Kılıcı', icon: '⚔️', rarity: 'mythic', damage: 200, allAbilities: true },
                { name: 'Ebedi Yaşam Mührü', icon: '💍', rarity: 'mythic', immortality: true },
                { name: 'Evrensel Kristal', icon: '💎', rarity: 'mythic', special: 'Tüm yetenekleri al' }
            ]
        },

        secretArea: {
            name: 'Yasaklı Kütüphane',
            entrance: { x: 30, y: 30 },
            requiredLevel: 70,
            description: 'Karanlık büyülerle dolu yasaklanmış kütüphane',
            mobs: [
                { type: 'Lanetli Büyücü', icon: '🧙', hp: 700, damage: 180, xp: 500, gold: 400, speed: 1.1 }
            ],
            treasure: {
                guaranteed: [
                    { name: 'Sonsuz Hazine', icon: '💰', value: 50000 },
                    { name: 'Yasaklı Kitap', icon: '📖', rarity: 'mythic', learnAllSpells: true }
                ],
                rare: [
                    { name: 'Tanrı Kılıcı', icon: '⚔️', rarity: 'mythic', damage: 300, godMode: true },
                    { name: 'Sonsuzluk Taşı', icon: '💎', rarity: 'mythic', special: 'Ölümsüzlük' }
                ]
            }
        }
    }
};

// Tiled Map Loader - Loads JSON exports from Tiled Map Editor
class TiledMapLoader {
    constructor(game) {
        this.game = game;
        this.currentMap = null;
        this.tileCache = new Map();
    }

    // Load map from Tiled JSON export or internal definition
    loadMap(mapId) {
        const mapData = WORLD_MAPS[mapId];
        if (!mapData) {
            console.error('Map not found:', mapId);
            return false;
        }

        this.currentMap = mapData;
        this.generateTileMap();
        this.spawnMapEntities();

        return true;
    }

    // Generate tile-based map
    generateTileMap() {
        const map = this.currentMap;
        const tiles = [];

        // Generate procedural tile layout
        for (let y = 0; y < map.height; y++) {
            tiles[y] = [];
            for (let x = 0; x < map.width; x++) {
                tiles[y][x] = this.selectTile(x, y, map);
            }
        }

        this.currentMap.tileMap = tiles;
    }

    // Procedural tile selection based on map type
    selectTile(x, y, map) {
        const tileTypes = Object.keys(map.tiles);

        // Edge detection for walls/obstacles
        const isEdge = x === 0 || y === 0 || x === map.width - 1 || y === map.height - 1;

        // Different logic per map
        switch(map.id) {
            case 'forest':
                if (Math.random() < 0.1) return 'tree';
                if (Math.random() < 0.05) return 'stone';
                if (Math.random() < 0.03) return 'water';
                return 'grass';

            case 'desert':
                if (Math.random() < 0.08) return 'cactus';
                if (Math.random() < 0.05) return 'rock';
                if (Math.random() < 0.02) return 'oasis';
                return Math.random() < 0.3 ? 'dune' : 'sand';

            case 'iceMountain':
                if (isEdge || Math.random() < 0.15) return 'rock';
                if (Math.random() < 0.1) return 'frozenTree';
                if (Math.random() < 0.2) return 'ice';
                return 'snow';

            case 'lavaCave':
                if (isEdge || Math.random() < 0.2) return 'obsidian';
                if (Math.random() < 0.15) return 'lava';
                if (Math.random() < 0.05) return 'fire';
                return 'stone';

            case 'darkCastle':
                if (isEdge || Math.random() < 0.25) return 'wall';
                if (Math.random() < 0.1) return 'blood';
                if (Math.random() < 0.05) return 'bones';
                if (Math.random() < 0.3) return 'darkness';
                return 'stone';

            default:
                return tileTypes[0];
        }
    }

    // Spawn NPCs, mobs, bosses
    spawnMapEntities() {
        const map = this.currentMap;

        // Clear existing entities
        this.game.npcs = [];
        this.game.bosses = [];

        // Spawn NPCs
        map.npcs.forEach(npcData => {
            const npc = {
                ...npcData,
                x: npcData.x * map.tileSize,
                y: npcData.y * map.tileSize,
                size: 30
            };
            this.game.npcs.push(npc);
        });

        // Spawn mini-boss
        if (map.miniBoss) {
            const boss = {
                ...map.miniBoss,
                x: map.miniBoss.spawnLocation.x * map.tileSize,
                y: map.miniBoss.spawnLocation.y * map.tileSize,
                size: 40 * map.miniBoss.scale,
                maxHP: map.miniBoss.hp,
                isBoss: true,
                isMiniBoss: true
            };
            this.game.bosses.push(boss);
        }

        // Spawn major boss
        if (map.boss) {
            const boss = {
                ...map.boss,
                x: map.boss.spawnLocation.x * map.tileSize,
                y: map.boss.spawnLocation.y * map.tileSize,
                size: 50 * map.boss.scale,
                maxHP: map.boss.hp,
                isBoss: true,
                isMajorBoss: true,
                currentPhase: 0
            };
            this.game.bosses.push(boss);
        }

        // Secret area entrance
        if (map.secretArea) {
            this.game.secretAreaEntrance = {
                ...map.secretArea.entrance,
                x: map.secretArea.entrance.x * map.tileSize,
                y: map.secretArea.entrance.y * map.tileSize,
                size: 40,
                icon: '🚪',
                name: map.secretArea.name,
                requiredLevel: map.secretArea.requiredLevel
            };
        }
    }

    // Get current map data
    getCurrentMap() {
        return this.currentMap;
    }

    // Check if position is walkable
    isWalkable(x, y) {
        if (!this.currentMap || !this.currentMap.tileMap) return true;

        const tileX = Math.floor(x / this.currentMap.tileSize);
        const tileY = Math.floor(y / this.currentMap.tileSize);

        if (tileX < 0 || tileY < 0 ||
            tileX >= this.currentMap.width ||
            tileY >= this.currentMap.height) {
            return false;
        }

        const tileName = this.currentMap.tileMap[tileY][tileX];
        const tile = this.currentMap.tiles[tileName];

        return !tile.collision;
    }

    // Get tile at position
    getTileAt(x, y) {
        if (!this.currentMap || !this.currentMap.tileMap) return null;

        const tileX = Math.floor(x / this.currentMap.tileSize);
        const tileY = Math.floor(y / this.currentMap.tileSize);

        if (tileX < 0 || tileY < 0 ||
            tileX >= this.currentMap.width ||
            tileY >= this.currentMap.height) {
            return null;
        }

        const tileName = this.currentMap.tileMap[tileY][tileX];
        return this.currentMap.tiles[tileName];
    }
}

// Export for use in main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WORLD_MAPS, TiledMapLoader };
}
