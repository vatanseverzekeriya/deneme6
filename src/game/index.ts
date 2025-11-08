import Phaser from 'phaser';
import { MainScene } from './scenes/MainScene';
import { MenuScene } from './scenes/MenuScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game-container',
  backgroundColor: '#1a1a2e',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: false,
    },
  },
  scene: [MenuScene, MainScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

// Create game instance when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  new Phaser.Game(config);
});

// Handle window resize
window.addEventListener('resize', () => {
  const game = document.querySelector('canvas');
  if (game) {
    game.style.width = '100%';
    game.style.height = '100%';
  }
});
