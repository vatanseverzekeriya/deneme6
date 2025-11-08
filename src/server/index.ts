import express, { Express, Request, Response } from 'express';
import http from 'http';
import { Server as WebSocketServer } from 'ws';
import path from 'path';
import os from 'os';
import { DashboardController } from './controllers/DashboardController';
import { WebSocketManager } from './services/WebSocketManager';
import { FileWatcher } from './services/FileWatcher';

class GameServer {
  private app: Express;
  private server: http.Server;
  private wss: WebSocketServer;
  private wsManager: WebSocketManager;
  private fileWatcher: FileWatcher;
  private port: number;
  private localIP: string;

  constructor(port: number = 3000) {
    this.port = process.env.PORT ? parseInt(process.env.PORT) : port;
    this.app = express();
    this.server = http.createServer(this.app);
    this.wss = new WebSocketServer({ server: this.server });
    this.wsManager = new WebSocketManager(this.wss);
    this.fileWatcher = new FileWatcher(this.wsManager);
    this.localIP = this.getLocalIP();

    this.setupMiddleware();
    this.setupRoutes();
    this.setupFileWatcher();
  }

  private getLocalIP(): string {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      const iface = interfaces[name];
      if (iface) {
        for (const addr of iface) {
          if (addr.family === 'IPv4' && !addr.internal) {
            return addr.address;
          }
        }
      }
    }
    return 'localhost';
  }

  private setupMiddleware(): void {
    // Serve static files from public directory
    this.app.use(express.static(path.join(__dirname, '../../public')));
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    const dashboardController = new DashboardController(this.localIP, this.port, this.wsManager);

    // Redirect root to dashboard
    this.app.get('/', (_req: Request, res: Response) => {
      res.redirect('/dashboard');
    });

    // Dashboard
    this.app.get('/dashboard', dashboardController.getDashboard.bind(dashboardController));

    // API endpoints
    this.app.get('/api/connections', dashboardController.getConnections.bind(dashboardController));

    // Legacy game routes (for backward compatibility)
    this.app.get('/game.html', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../public/game.html'));
    });

    this.app.get('/metin2-style.html', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../public/metin2-style.html'));
    });
  }

  private setupFileWatcher(): void {
    const watchPaths = ['public/**/*.{html,js,css}', 'src/**/*.{ts,tsx}'];

    this.fileWatcher.watch(watchPaths);
  }

  public start(): void {
    this.server.listen(this.port, () => {
      console.info('\n' + '='.repeat(60));
      console.info('🎮 MOBILE GAME PREVIEW SERVER STARTED');
      console.info('='.repeat(60));
      console.info(`\n📱 Dashboard: http://localhost:${this.port}/dashboard`);
      console.info(`🎯 Game URL: http://localhost:${this.port}/game.html`);
      console.info(`\n🌐 Network Address: http://${this.localIP}:${this.port}`);
      console.info(`📱 Mobile: http://${this.localIP}:${this.port}/game.html`);
      console.info('\n💡 Open dashboard in your browser using the address above');
      console.info('📝 Edit files - changes will auto-reload!\n');
      console.info('='.repeat(60) + '\n');
    });

    this.setupGracefulShutdown();
  }

  private setupGracefulShutdown(): void {
    const shutdown = () => {
      console.info('⏹️  Server shutting down...');
      this.fileWatcher.close();
      this.server.close(() => {
        console.info('✅ Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  }
}

// Start server
const server = new GameServer();
server.start();
