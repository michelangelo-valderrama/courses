import Phaser from "phaser";

import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Game extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Game);
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .tileSprite(0, 0, width, height, TextureKeys.Background)
      .setOrigin(0);

    const mouse = this.physics.add
      .sprite(
        width * 0.5,
        height * 0.5,
        TextureKeys.RocketMouse,
        "rocketmouse_fly01.png"
      )
      .play(AnimationKeys.RocketMouse);
    
    const body = <Phaser.Physics.Arcade.Body>mouse.body;
    body.setCollideWorldBounds(true);

    this.physics.world.bounds.bottom = height - 30;
  }
}
