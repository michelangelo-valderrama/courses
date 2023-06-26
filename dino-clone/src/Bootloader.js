class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        console.log('Bootloader');
        this.load.setPath('./assets/sprites/');

        this.load.spritesheet('player', 'player.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.on('complete', () => {
            this.scene.start('GameScene');
        });
    }

    /* create() {
        
    } */
}
export default Bootloader;