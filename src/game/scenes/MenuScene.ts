import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // Title
    this.add
      .text(width / 2, height / 3, 'Mobile Game', {
        fontSize: '48px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Start button
    const startButton = this.add
      .text(width / 2, height / 2, 'Start Game', {
        fontSize: '32px',
        color: '#00ff88',
        backgroundColor: '#333',
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    startButton.on('pointerdown', () => {
      this.scene.start('MainScene');
    });

    startButton.on('pointerover', () => {
      startButton.setStyle({ backgroundColor: '#555' });
    });

    startButton.on('pointerout', () => {
      startButton.setStyle({ backgroundColor: '#333' });
    });

    // Instructions
    this.add
      .text(width / 2, height * 0.7, 'Use arrow keys or touch to move', {
        fontSize: '16px',
        color: '#888',
      })
      .setOrigin(0.5);
  }
}
