import { Server as WebSocketServer, WebSocket } from 'ws';

export class WebSocketManager {
  private clients: Set<WebSocket>;
  private wss: WebSocketServer;

  constructor(wss: WebSocketServer) {
    this.wss = wss;
    this.clients = new Set();
    this.setupWebSocket();
  }

  private setupWebSocket(): void {
    this.wss.on('connection', (ws: WebSocket) => {
      console.info('✅ New client connected');
      this.clients.add(ws);

      ws.on('close', () => {
        console.info('❌ Client disconnected');
        this.clients.delete(ws);
      });

      ws.on('error', (error: Error) => {
        console.error('WebSocket error:', error);
        this.clients.delete(ws);
      });
    });
  }

  public broadcast(message: string): void {
    console.info(`🔄 Broadcasting to ${this.clients.size} clients: ${message}`);
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  public getClientCount(): number {
    return this.clients.size;
  }
}
