
class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'});
    }

    /* init() {
        console.log('Scene: GameScene');
    } */

    create() {
    
        // Sprites
        this.player = this.physics.add.sprite(150, 300, 'player');
        this.player.setScale(3).setCollideWorldBounds().setOrigin(1, 1);

        // Animations        
        this.anims.create({
            key: 'player_idle',
            frames: this.anims.generateFrameNumbers('player', {start:0, end:1}),
            frameRate: 3,
            repeat: -1
        })
        this.anims.create({
            key: 'player_run',
            frames: this.anims.generateFrameNumbers('player', {start:2, end:5}),
            frameRate: 5,
            repeat: -1
        });

        // Cursor
        this.cursor = this.input.keyboard.createCursorKeys();
    }

    update(time, delta) {

        this.movePlayer();

    }

    movePlayer() {
        this.UP = this.cursor.space;
        this.DOWN = this.cursor.shift;

        // Player jump
        if (this.UP.isDown && this.player.body.onFloor() && !this.DOWN.isDown) {
            this.player.body.setVelocityY(-900);
        }
        // Player shift
        if (this.DOWN.isDown) {
            this.player.setTexture('player', 6);
            this.player.body.setVelocityY(700);
        }
        // Player run & jump anims
        if (this.player.body.deltaAbsY() > 0) {
            this.player.anims.stop();
            this.player.setTexture('player', 7);
        } else {
            !this.DOWN.isDown ? this.player.body.setSize(8, 24).setOffset(12, 8) : this.player.body.setSize(8, 14).setOffset(12, 18);
            this.player.play('player_run', true);
        }
    }

}
export default GameScene;