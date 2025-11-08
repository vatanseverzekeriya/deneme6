import { Request, Response } from 'express';
import { WebSocketManager } from '../services/WebSocketManager';

export class DashboardController {
  private localIP: string;
  private port: number;
  private wsManager: WebSocketManager;

  constructor(localIP: string, port: number, wsManager: WebSocketManager) {
    this.localIP = localIP;
    this.port = port;
    this.wsManager = wsManager;
  }

  public getDashboard(_req: Request, res: Response): void {
    const gameUrl = `http://${this.localIP}:${this.port}/game.html`;
    const rpgUrl = `http://${this.localIP}:${this.port}/metin2-style.html`;

    res.send(`
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mobile Game Preview Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .header {
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            margin-bottom: 30px;
            text-align: center;
        }
        h1 { color: #333; margin-bottom: 10px; font-size: 32px; }
        .subtitle { color: #666; font-size: 16px; }
        .status {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #4ade80;
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: bold;
            margin-top: 15px;
            animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
        .content { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .card {
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }
        .card h2 {
            color: #333;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        #qrcode {
            display: flex;
            justify-content: center;
            margin: 20px 0;
            padding: 20px;
            background: white;
            border-radius: 10px;
        }
        .info-item {
            background: #f8f9fa;
            padding: 15px;
            margin: 10px 0;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }
        .info-label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
        .info-value {
            color: #333;
            word-break: break-all;
            font-family: 'Courier New', monospace;
        }
        .btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: all 0.3s;
            width: 100%;
            margin-top: 10px;
        }
        .btn:hover {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        .connections {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 10px;
            margin-top: 15px;
        }
        .connections-count { font-size: 24px; font-weight: bold; color: #667eea; }
        .preview-frame {
            width: 100%;
            height: 600px;
            border: none;
            border-radius: 10px;
            background: white;
        }
        .device-frame {
            background: #333;
            padding: 15px;
            border-radius: 20px;
            margin-top: 20px;
        }
        .game-selector {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }
        .game-option {
            background: rgba(102, 126, 234, 0.1);
            border: 2px solid rgba(102, 126, 234, 0.3);
            border-radius: 10px;
            padding: 20px;
            cursor: pointer;
            text-align: center;
            transition: all 0.3s;
        }
        .game-option:hover {
            border-color: #667eea;
            background: rgba(102, 126, 234, 0.2);
            transform: translateY(-2px);
        }
        .game-option.active {
            border-color: #667eea;
            background: rgba(102, 126, 234, 0.3);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        .game-icon { font-size: 48px; margin-bottom: 10px; }
        .game-title { font-weight: bold; color: #333; margin-bottom: 5px; }
        .game-desc { font-size: 12px; color: #666; }
        @media (max-width: 768px) {
            .content { grid-template-columns: 1fr; }
            .game-selector { grid-template-columns: 1fr; }
            h1 { font-size: 24px; }
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎮 Mobile Game Preview Dashboard</h1>
            <p class="subtitle">Test your games in real-time on mobile devices</p>
            <div class="status">
                <span>🔴</span>
                <span>Live</span>
            </div>
            <div class="connections">
                <span>👥 Connected Devices:</span>
                <span class="connections-count" id="connectionCount">0</span>
            </div>
        </div>

        <div class="content">
            <div class="card">
                <h2>🎮 Select Game</h2>
                <div class="game-selector">
                    <div class="game-option active" onclick="selectGame('game')">
                        <div class="game-icon">🎯</div>
                        <div class="game-title">Simple Game</div>
                        <div class="game-desc">Dodge obstacles</div>
                    </div>
                    <div class="game-option" onclick="selectGame('rpg')">
                        <div class="game-icon">⚔️</div>
                        <div class="game-title">RPG Game</div>
                        <div class="game-desc">Metin2-style RPG</div>
                    </div>
                </div>

                <h2>📱 QR Code</h2>
                <div id="qrcode"></div>

                <div class="info-item">
                    <div class="info-label">📍 Game URL:</div>
                    <div class="info-value" id="gameUrlText">${gameUrl}</div>
                </div>

                <button class="btn" onclick="copyUrl()">📋 Copy URL</button>
            </div>

            <div class="card">
                <h2>🖥️ PC Preview</h2>
                <div class="device-frame">
                    <iframe src="/game.html" class="preview-frame" id="previewFrame"></iframe>
                </div>
                <button class="btn" onclick="openInNewTab()">🚀 Open in New Tab</button>
            </div>
        </div>
    </div>

    <script>
        const games = { game: '${gameUrl}', rpg: '${rpgUrl}' };
        let currentGame = 'game';

        updateQRCode(games.game);

        function updateQRCode(url) {
            const qrcodeDiv = document.getElementById('qrcode');
            qrcodeDiv.innerHTML = '';
            QRCode.toCanvas(url, { width: 250, margin: 2 }, (error, canvas) => {
                if (error) console.error(error);
                qrcodeDiv.appendChild(canvas);
            });
        }

        function selectGame(gameType) {
            currentGame = gameType;
            const url = games[gameType];
            document.querySelectorAll('.game-option').forEach(opt => opt.classList.remove('active'));
            event.target.closest('.game-option').classList.add('active');
            document.getElementById('gameUrlText').textContent = url;
            updateQRCode(url);
            document.getElementById('previewFrame').src = url.replace('http://${this.localIP}:${this.port}', '');
        }

        function copyUrl() {
            navigator.clipboard.writeText(games[currentGame]).then(() => alert('✅ URL copied!'));
        }

        function openInNewTab() {
            window.open(games[currentGame].replace('http://${this.localIP}:${this.port}', ''), '_blank');
        }

        const ws = new WebSocket('ws://' + window.location.host);
        ws.onmessage = (event) => {
            if (event.data === 'reload') location.reload();
        };

        setInterval(() => {
            fetch('/api/connections')
                .then(r => r.json())
                .then(data => document.getElementById('connectionCount').textContent = data.count);
        }, 2000);
    </script>
</body>
</html>
    `);
  }

  public getConnections(_req: Request, res: Response): void {
    res.json({ count: this.wsManager.getClientCount() });
  }
}
