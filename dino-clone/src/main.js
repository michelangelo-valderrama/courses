import GameScene from './scenes/GameScene.js';
import Bootloader from './Bootloader.js';

const config = {
    title: "dino-clone",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 600,
        height: 300,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: "#fff",
    pixelArt: true,
    physics: {
        default: "arcade",
        "arcade": {
            debug: true,
            gravity: {
                y: 2500
            }
        }
    },
    scene: [Bootloader, GameScene]
};

new Phaser.Game(config);