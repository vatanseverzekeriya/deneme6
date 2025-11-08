import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private obstacles!: Phaser.GameObjects.Group;
  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private gameSpeed: number = 200;

  constructor() {
    super({ key: 'MainScene' });
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // Create player
    this.player = this.add.rectangle(width / 2, height - 50, 50, 50, 0x00ff88);
    this.physics.add.existing(this.player);
    (this.player.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

    // Create obstacles group
    this.obstacles = this.physics.add.group();

    // Score
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '24px',
      color: '#ffffff',
    });

    // Input
    this.cursors = this.input.keyboard!.createCursorKeys();

    // Touch controls
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
      if (pointer.x < width / 2) {
        playerBody.setVelocityX(-300);
      } else {
        playerBody.setVelocityX(300);
      }
    });

    this.input.on('pointerup', () => {
      const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
      playerBody.setVelocityX(0);
    });

    // Spawn obstacles
    this.time.addEvent({
      delay: 1500,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
    });

    // Collision
    this.physics.add.overlap(
      this.player,
      this.obstacles,
      this.gameOver as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );
  }

  update(): void {
    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;

    // Keyboard movement
    if (this.cursors.left.isDown) {
      playerBody.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      playerBody.setVelocityX(300);
    } else if (!this.input.activePointer.isDown) {
      playerBody.setVelocityX(0);
    }

    // Update obstacles
    this.obstacles.children.entries.forEach((obstacle) => {
      const obs = obstacle as Phaser.GameObjects.Rectangle;
      if (obs.y > this.cameras.main.height) {
        obs.destroy();
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        // Increase difficulty
        if (this.score % 100 === 0) {
          this.gameSpeed += 20;
        }
      }
    });
  }

  private spawnObstacle(): void {
    const { width } = this.cameras.main;
    const x = Phaser.Math.Between(50, width - 50);
    const obstacle = this.add.rectangle(x, -50, 50, 50, 0xff4444);
    this.physics.add.existing(obstacle);
    this.obstacles.add(obstacle);

    const obstacleBody = obstacle.body as Phaser.Physics.Arcade.Body;
    obstacleBody.setVelocityY(this.gameSpeed);
  }

  private gameOver(): void {
    this.physics.pause();
    this.add
      .text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Game Over!', {
        fontSize: '48px',
        color: '#ff4444',
      })
      .setOrigin(0.5);

    this.time.delayedCall(2000, () => {
      this.scene.start('MenuScene');
      this.score = 0;
      this.gameSpeed = 200;
    });
  }
}
