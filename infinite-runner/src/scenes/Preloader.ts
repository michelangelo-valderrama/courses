import Phaser from "phaser";

import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }
  preload() {
    this.load.image(TextureKeys.Background, "public/house/bg_repeat_340x640.png");
    this.load.atlas(
      TextureKeys.RocketMouse,
      "public/characters/rocket-mouse.png",
      "public/characters/rocket-mouse.json"
    );
  }
  create() {
    this.anims.create({
      key: AnimationKeys.RocketMouse,
      frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 4,
        prefix: "rocketmouse_run",
        zeroPad: 2,
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.start(SceneKeys.Game);
  }
}
