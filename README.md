# 🎮 Mobile Game Preview Tool

Professional preview tool for testing PC games on mobile devices in real-time, built with TypeScript, Express.js, and Phaser 3.

## ✨ Features

- 🔴 **Live Reload**: Edit your files, changes instantly reflect on all devices
- 📱 **QR Code Support**: Quickly connect with your mobile device by scanning QR code
- 🎯 **Responsive Design**: Your game automatically adapts to all screen sizes
- 🎮 **Mobile Controls**: Perfect gaming experience on mobile with touch controls
- 📊 **Dashboard**: Track connected devices and preview games
- ⚡ **WebSocket**: Real-time communication and fast updates
- 🔷 **TypeScript**: Full type safety and modern development experience
- 🎨 **Asset Pipeline**: Automated sprite sheet generation
- 🧩 **Modular Architecture**: Clean, maintainable codebase
- ⚙️ **Phaser 3**: Professional game engine integration

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Git

### 1. Install Dependencies

```bash
npm install
```

### 2. Development Mode

```bash
npm run dev
```

This starts the server with hot reload and TypeScript compilation.

### 3. Production Build

```bash
npm run build
npm start
```

### 4. Open Dashboard

Open in your browser:
```
http://localhost:3000/dashboard
```

## 📱 Mobil Cihazda Test Etme

### Yöntem 1: QR Kod ile
1. Dashboard'daki QR kodu mobil cihazınızla okutun
2. Oyun otomatik olarak açılacaktır

### Yöntem 2: Manuel URL
1. Dashboard'dan URL'yi kopyalayın
2. Mobil tarayıcınızda açın

**ÖNEMLİ:** Bilgisayar ve mobil cihazınız aynı Wi-Fi ağında olmalıdır!

## 🎮 Oyun Özellikleri

### Kontroller

**PC'de:**
- ⬅️ Sol Ok / A tuşu: Sola hareket
- ➡️ Sağ Ok / D tuşu: Sağa hareket
- Fare: Duraklatma ve yeni oyun butonları

**Mobilde:**
- 👆 Dokunmatik: Ekrana dokunup kaydırarak hareket edin
- 🔘 Alt kısımdaki ok butonları ile kontrol
- Butonlar: Duraklatma ve yeni oyun

### Oyun Mekaniği

- Düşen engellerden kaçın
- Her kaçırdığınız engel için +10 puan kazanın
- Engele çarparsanız oyun biter
- Skorunuzu yükseltin!

## 🛠️ Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run lint` | Check code for errors |
| `npm run lint:fix` | Fix linting errors automatically |
| `npm run format` | Format code with Prettier |
| `npm run sprites` | Generate sprite sheet from assets |

### Project Structure

```
deneme6/
├── src/                      # Source code
│   ├── server/              # Server-side TypeScript
│   │   ├── index.ts         # Server entry point
│   │   ├── controllers/     # Route controllers
│   │   └── services/        # Business logic
│   ├── game/                # Game client code
│   │   ├── index.ts         # Game entry point
│   │   └── scenes/          # Phaser scenes
│   └── shared/              # Shared types
│       └── types.ts         # TypeScript definitions
├── public/                  # Static files
│   ├── js/                  # Compiled game code
│   ├── css/                 # Stylesheets
│   └── images/              # Images & sprites
├── assets/                  # Source assets
│   ├── sprites/             # Sprites for sheet generation
│   ├── sounds/              # Audio files
│   └── fonts/               # Custom fonts
├── docs/                    # Documentation
│   ├── DEVELOPER_GUIDE.md   # Development guide
│   ├── GIT_STRATEGY.md      # Git workflow
│   ├── API.md               # API documentation
│   └── ARCHITECTURE.md      # System architecture
├── dist/                    # Compiled TypeScript
├── tsconfig.json           # TypeScript config
├── webpack.config.js       # Webpack config
└── package.json           # Dependencies
```

### Live Reload

When you edit any `.html`, `.js`, `.ts`, or `.css` file:
1. Server automatically detects the change
2. Sends signal to all connected devices
3. Pages automatically reload

### Creating New Features

**Server-side:**
```typescript
// src/server/controllers/MyController.ts
export class MyController {
  public myRoute(req: Request, res: Response): void {
    res.json({ message: 'Hello World' });
  }
}
```

**Game scene:**
```typescript
// src/game/scenes/MyScene.ts
import Phaser from 'phaser';

export class MyScene extends Phaser.Scene {
  create(): void {
    // Your game logic
  }
}
```

## 🔧 Configuration

### Change Port

To use a different port:

```bash
PORT=8080 npm start
```

### Network Settings

The server automatically detects your local IP address. To manually change it, edit the `getLocalIP()` function in `src/server/index.ts`.

### TypeScript Configuration

TypeScript settings are in `tsconfig.json`. Key options:
- Strict mode enabled
- ES2020 target
- Path aliases (`@/`, `@server/`, `@game/`, `@shared/`)

### ESLint & Prettier

Code quality tools are configured in:
- `.eslintrc.json` - Linting rules
- `.prettierrc` - Code formatting

## 📊 Dashboard Özellikleri

Dashboard şunları sağlar:

- 📱 **QR Kod**: Hızlı mobil erişim
- 🖥️ **PC Önizleme**: Tarayıcıda doğrudan test
- 👥 **Bağlantı Sayacı**: Kaç cihaz bağlı görün
- 📋 **URL Kopyalama**: Tek tıkla URL paylaşımı
- 📖 **Kullanım Talimatları**: Adım adım rehber

## 🐛 Sorun Giderme

### Mobil Cihazdan Bağlanamıyorum

1. ✅ Her iki cihaz da aynı Wi-Fi ağında mı?
2. ✅ Güvenlik duvarı bağlantıyı engelliyor mu?
3. ✅ Doğru IP adresini mi kullanıyorsunuz?

### Değişiklikler Yansımıyor

1. ✅ Sunucu çalışıyor mu?
2. ✅ Dosya doğru konumda mı?
3. ✅ Konsolu kontrol edin, hata var mı?

### WebSocket Bağlantı Hatası

1. ✅ Port 3000 başka bir uygulama tarafından kullanılıyor mu?
2. ✅ Tarayıcı WebSocket'i destekliyor mu?

## 🚀 Advanced

### Adding a New Game

Create a new Phaser scene:

```typescript
// src/game/scenes/MyGameScene.ts
import Phaser from 'phaser';

export class MyGameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MyGameScene' });
  }

  create(): void {
    // Your game logic
  }
}
```

Register in `src/game/index.ts`:

```typescript
const config: Phaser.Types.Core.GameConfig = {
  scenes: [MenuScene, MainScene, MyGameScene]
};
```

### Asset Pipeline

Place sprites in `assets/sprites/`:
```
assets/sprites/
├── player.png
├── enemy1.png
└── coin.png
```

Generate sprite sheet:
```bash
npm run sprites
```

Output:
- `public/images/spritesheet.png`
- `src/game/styles/sprites.css`

### Performance Optimization

**Server:**
- Enable compression
- Use caching for static files
- Minimize WebSocket broadcasts

**Game:**
- Use object pooling
- Optimize sprite sizes
- Use sprite sheets
- Enable Phaser physics only when needed

## 📚 Documentation

- [Developer Guide](docs/DEVELOPER_GUIDE.md) - Complete development guide
- [Git Strategy](docs/GIT_STRATEGY.md) - Branching and commit workflow
- [API Documentation](docs/API.md) - REST and WebSocket API
- [Architecture](docs/ARCHITECTURE.md) - System design and architecture

## 🧪 Technology Stack

- **Language:** TypeScript
- **Server:** Node.js + Express
- **Game Engine:** Phaser 3
- **WebSocket:** ws library
- **Build Tools:** TypeScript Compiler, Webpack
- **Code Quality:** ESLint, Prettier
- **Asset Pipeline:** webpack-spritesmith

## 📝 License

MIT License - Use as you wish!

## 🤝 Contributing

Contributions and suggestions are welcome! Please follow the [Git Strategy](docs/GIT_STRATEGY.md) guide.

## 💡 İpuçları

1. **Performans**: Mobilde 60 FPS için canvas boyutunu optimize edin
2. **Battery**: Oyun döngüsünde gereksiz hesaplamalardan kaçının
3. **UX**: Touch kontrollerini büyük ve kolay erişilebilir yapın
4. **Test**: Farklı ekran boyutlarında test edin

## 📞 Destek

Sorun yaşıyorsanız:
1. README'yi tekrar okuyun
2. Konsol hatalarını kontrol edin
3. Issue açın veya soru sorun

---

**Keyifli oyunlar! 🎮**
