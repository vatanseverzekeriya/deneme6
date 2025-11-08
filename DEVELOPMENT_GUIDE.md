# 🛠️ Geliştirme Rehberi

Bu dosya, RPG oyununu geliştirirken kullanılacak pratik bilgileri içerir.

---

## 🚀 Hızlı Başlangıç

### Yeni Bir Özellik Eklemek İçin

1. **Roadmap'i Kontrol Et**
   ```
   RPG_DEVELOPMENT_ROADMAP.md dosyasını aç
   Hangi özelliği ekleyeceğine karar ver
   ```

2. **Yeni Bir Sohbet Başlat**
   ```
   Claude'a şunu söyle: "Oyunu geliştir - [Özellik Adı] ekle"
   Örnek: "Oyunu geliştir - Quest sistemi ekle"
   ```

3. **Otomatik İşleyiş**
   ```
   Claude otomatik olarak:
   - RPG_DEVELOPMENT_ROADMAP.md dosyasını okur
   - Mevcut durumu analiz eder
   - Özelliği implement eder
   - Roadmap'i günceller
   - VERSION_HISTORY.md'yi günceller
   - Commit & push yapar
   ```

---

## 📁 Proje Yapısı

```
deneme6/
├── metin2-style.html         # Ana HTML dosyası (UI)
├── rpg-game.js                # Ana oyun logic
├── RPG_DEVELOPMENT_ROADMAP.md # Ana geliştirme planı ⭐
├── VERSION_HISTORY.md         # Versiyon takibi
├── DEVELOPMENT_GUIDE.md       # Bu dosya
│
├── systems/                   # Gelecekte eklenecek sistemler
│   ├── quest-system.js
│   ├── skill-tree.js
│   ├── inventory-extended.js
│   └── ...
│
├── data/                      # Oyun datası
│   ├── quests.json
│   ├── items.json
│   ├── skills.json
│   └── ...
│
└── assets/                    # Grafikler, sesler, vb.
    ├── images/
    ├── sounds/
    └── music/
```

---

## 🎯 Öncelikli Özellikler

Şu özellikleri sırayla eklemeniz önerilir:

### 1. Quest Sistemi (v0.2.0)
**Komut:** "Quest sistemi ekle"
- NPC sistemi
- Quest log UI
- Quest takip
- Reward sistemi

### 2. Genişletilmiş Envanter (v0.2.0)
**Komut:** "Envanter sistemini genişlet"
- 50 slotluk envanter
- Storage/bank
- Auto-sort
- Filter

### 3. Item Rarity (v0.2.0)
**Komut:** "Item rarity sistemi ekle"
- 6 farklı rarity
- Renk kodları
- Drop rate ayarları
- Visual effects

### 4. Skill Tree (v0.2.0)
**Komut:** "Skill tree sistemi ekle"
- 3 skill tree her sınıf
- Skill point sistemi
- Passive skills
- Ultimate skills

### 5. Mini Harita (v0.2.0)
**Komut:** "Mini harita ekle"
- Real-time tracking
- Quest markers
- Fog of war

---

## 💡 Örnek Komutlar

### Genel Geliştirme
```
"Oyunu geliştir"
"Sonraki özelliği ekle"
"Roadmap'i göster"
"Mevcut durumu analiz et"
```

### Özel Özellik Ekleme
```
"Quest sistemi ekle"
"Skill tree ekle"
"PvP arena sistemi ekle"
"Guild sistemi ekle"
"Battle pass ekle"
```

### Sistem Geliştirmeleri
```
"Savaş sistemini geliştir"
"AI sistemini iyileştir"
"Performance optimizasyonu yap"
"Mobile kontrollerini iyileştir"
```

### Test & Debug
```
"Oyunu test et"
"Bug'ları düzelt"
"Balance ayarları yap"
"Performance test yap"
```

---

## 📋 Geliştirme Workflow

### Adım 1: Planlama
```
1. RPG_DEVELOPMENT_ROADMAP.md'yi oku
2. Hangi phase'desin belirle (Phase 1-5)
3. O phase'deki özellikleri kontrol et
4. Bir özellik seç
```

### Adım 2: Implement
```
1. Claude'a özellik adını söyle
2. Claude kodu yazar
3. Claude test eder
4. Claude commit yapar
```

### Adım 3: Test
```
1. Oyunu çalıştır (metin2-style.html)
2. Yeni özelliği test et
3. Bug varsa Claude'a bildir
4. Düzeltmeleri yap
```

### Adım 4: Dokümantasyon
```
1. Claude otomatik olarak roadmap'i günceller
2. VERSION_HISTORY.md'yi günceller
3. Gerekirse ek not ekle
```

### Adım 5: Push
```
1. Claude otomatik commit yapar
2. Branch'e push eder
3. PR oluşturulabilir (isteğe bağlı)
```

---

## 🔧 Teknik Detaylar

### Dosya Ekleme Kuralları

**Yeni Sistem Eklerken:**
```javascript
// systems/new-system.js

class NewSystem {
    constructor(game) {
        this.game = game;
        this.init();
    }

    init() {
        // Initialization
    }

    update() {
        // Game loop update
    }

    draw() {
        // Render
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NewSystem;
}
```

**HTML'e Dahil Etme:**
```html
<script src="systems/new-system.js"></script>
```

**Ana Oyuna Entegre Etme:**
```javascript
// rpg-game.js içinde
class Game {
    constructor() {
        // ...
        this.newSystem = new NewSystem(this);
    }

    update() {
        // ...
        this.newSystem.update();
    }

    draw() {
        // ...
        this.newSystem.draw();
    }
}
```

### Data Dosyaları

**JSON Format:**
```json
{
  "quests": [
    {
      "id": 1,
      "title": "Quest Adı",
      "description": "Açıklama",
      "level_requirement": 1,
      "objectives": [
        { "type": "kill", "target": "Kurt", "count": 5 }
      ],
      "rewards": {
        "xp": 100,
        "gold": 50,
        "items": ["item_id"]
      }
    }
  ]
}
```

### Config Dosyası

**game-config.js oluşturulabilir:**
```javascript
const CONFIG = {
    GAME_VERSION: '0.1.0',
    DEBUG_MODE: true,

    PLAYER: {
        BASE_SPEED: 3,
        BASE_HP_REGEN: 0,
        BASE_MP_REGEN: 0.1
    },

    BALANCE: {
        XP_MULTIPLIER: 1.0,
        GOLD_MULTIPLIER: 1.0,
        DROP_RATE: 0.4
    },

    UI: {
        SHOW_FPS: true,
        SHOW_DEBUG_INFO: false,
        DAMAGE_NUMBERS: true
    }
};
```

---

## 🎨 UI/UX Standartları

### Renk Paleti
```css
/* Rarity Colors */
--common: #ffffff;      /* Beyaz */
--uncommon: #1eff00;    /* Yeşil */
--rare: #0070dd;        /* Mavi */
--epic: #a335ee;        /* Mor */
--legendary: #ff8000;   /* Turuncu */
--mythic: #e60000;      /* Kırmızı */

/* UI Colors */
--primary: #ffd700;     /* Altın */
--background: #0a0e27;  /* Koyu mavi */
--panel: rgba(0,0,0,0.8);
--border: rgba(255,255,255,0.3);

/* Status Colors */
--hp: #ff4444;
--mp: #4444ff;
--xp: #44ff44;
```

### Font Boyutları
```css
--text-xs: 10px;
--text-sm: 12px;
--text-md: 14px;
--text-lg: 18px;
--text-xl: 24px;
--text-2xl: 32px;
```

---

## 🧪 Test Checklist

Her yeni özellik için:

### Functionality Test
- [ ] Özellik beklendiği gibi çalışıyor mu?
- [ ] Tüm edge case'ler handle ediliyor mu?
- [ ] Error handling var mı?

### UI Test
- [ ] Mobilde düzgün görünüyor mu?
- [ ] Desktop'ta düzgün görünüyor mu?
- [ ] Touch friendly mi?

### Performance Test
- [ ] FPS 60'ın altına düşüyor mu?
- [ ] Memory leak var mı?
- [ ] Loading süreleri kabul edilebilir mi?

### Integration Test
- [ ] Diğer sistemlerle uyumlu mu?
- [ ] Mevcut özellikleri bozmuyor mu?
- [ ] Save/load ile uyumlu mu?

---

## 📊 Performans Hedefleri

- **FPS:** 60 FPS (minimum 30 FPS mobilde)
- **Loading Time:** < 3 saniye
- **Memory Usage:** < 200MB
- **Bundle Size:** < 2MB

---

## 🐛 Debug Araçları

### Console Komutları (Gelecekte eklenecek)
```javascript
// Game instance'a erişim
game.player.level = 50;
game.player.gold = 99999;
game.player.addItem('legendary_sword');

// Test komutları
game.spawnMob('Ejderha');
game.completeQuest(quest_id);
game.unlockAllSkills();
```

---

## 💾 Save/Load Sistemi (v0.3.0'da eklenecek)

### LocalStorage Format
```javascript
{
  "version": "0.3.0",
  "player": {
    "class": "warrior",
    "level": 25,
    "xp": 1500,
    "stats": {...},
    "inventory": [...],
    "equipment": {...},
    "skills": {...}
  },
  "progress": {
    "quests_completed": [...],
    "achievements": [...],
    "discovered_zones": [...]
  },
  "settings": {
    "graphics": "high",
    "audio": {...}
  }
}
```

---

## 🔄 Git Workflow

### Branch Yapısı
```
main                    # Stable releases
  └── claude/...        # Development branches
```

### Commit Mesaj Formatı
```
feat: Quest sistemi eklendi
fix: Envanter bug'ı düzeltildi
improve: Savaş sistemi iyileştirildi
refactor: Kod yapısı yeniden düzenlendi
docs: Dokümantasyon güncellendi
test: Test coverage artırıldı
```

---

## 📞 Yardım & Destek

### Claude'a Sorular
```
"Nasıl [özellik] eklerim?"
"[Sistem] nasıl çalışıyor?"
"[Bug] nasıl düzeltilir?"
"Performance nasıl iyileştirilir?"
```

### Dokümantasyon
1. RPG_DEVELOPMENT_ROADMAP.md - Ana plan
2. VERSION_HISTORY.md - Versiyon geçmişi
3. DEVELOPMENT_GUIDE.md - Bu dosya

---

## 🎯 Sonraki Adımlar

**Şimdi yapılacaklar:**

1. ✅ Roadmap oluşturuldu
2. ✅ Version history oluşturuldu
3. ✅ Development guide oluşturuldu
4. ⏳ İlk özellik ekleme

**İlk özellik için:**
```
"Quest sistemi ekle"
```

veya

```
"Oyunu geliştir - öncelikli özellikleri sırayla ekle"
```

---

**Son Güncelleme:** 2025-11-08
**Durum:** Hazır ✅
