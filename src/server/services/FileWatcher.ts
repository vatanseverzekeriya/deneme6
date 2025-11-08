import chokidar, { FSWatcher } from 'chokidar';
import { WebSocketManager } from './WebSocketManager';

export class FileWatcher {
  private watcher: FSWatcher | null = null;
  private wsManager: WebSocketManager;

  constructor(wsManager: WebSocketManager) {
    this.wsManager = wsManager;
  }

  public watch(paths: string[]): void {
    this.watcher = chokidar.watch(paths, {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
      ignoreInitial: true,
    });

    this.watcher.on('change', (filePath: string) => {
      console.info(`📝 File changed: ${filePath}`);
      this.wsManager.broadcast('reload');
    });

    this.watcher.on('add', (filePath: string) => {
      console.info(`📝 File added: ${filePath}`);
      this.wsManager.broadcast('reload');
    });

    this.watcher.on('unlink', (filePath: string) => {
      console.info(`📝 File removed: ${filePath}`);
      this.wsManager.broadcast('reload');
    });

    this.watcher.on('error', (error: Error) => {
      console.error('File watcher error:', error);
    });

    console.info('👀 File watcher initialized');
  }

  public close(): void {
    if (this.watcher) {
      this.watcher.close();
      console.info('👋 File watcher closed');
    }
  }
}
