import Phaser from "phaser";

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";
import SceneKeys from "../consts/SceneKeys";

enum MouseState {
  Running,
  Killed,
  Dead,
}

export default class RocketMouse extends Phaser.GameObjects.Container {
  private mouse!: Phaser.GameObjects.Sprite;
  private flames!: Phaser.GameObjects.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private mouseState = MouseState.Running;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.mouse = scene.add
      .sprite(0, 0, TextureKeys.RocketMouse)
      .setOrigin(0.5, 1)
      .play(AnimationKeys.RocketMouseRun);

    this.flames = scene.add
      .sprite(-63, -15, TextureKeys.RocketMouse)
      .play(AnimationKeys.RocketFlamesOn);

    this.cursors = scene.input.keyboard.createCursorKeys();

    this.enableJetpack(false);

    this.add(this.flames);
    this.add(this.mouse);

    scene.physics.add.existing(this);

    const body = <Phaser.Physics.Arcade.Body>this.body;
    body.setSize(this.mouse.width * 0.5, this.mouse.height * 0.7);
    body.setOffset(this.mouse.width * -0.3, -this.mouse.height + 15);
  }

  enableJetpack(enabled: boolean) {
    this.flames.setVisible(enabled);
  }

  preUpdate() {
    const body = <Phaser.Physics.Arcade.Body>this.body;

    switch (this.mouseState) {
      case MouseState.Running: {
        if (this.cursors.space?.isDown) {
          body.setAccelerationY(-600);
          this.enableJetpack(true);
          this.mouse.play(AnimationKeys.RocketMouseFly, true);
        } else {
          body.setAccelerationY(0);
          this.enableJetpack(false);
        }

        if (body.blocked.down) {
          this.mouse.play(AnimationKeys.RocketMouseRun, true);
        } else if (body.velocity.y > 0) {
          this.mouse.play(AnimationKeys.RocketMouseFall, true);
        }
        break;
      }

      case MouseState.Killed: {
        body.velocity.x *= 0.99;
        if (body.velocity.x <= 5) {
          this.mouseState = MouseState.Dead;
        }
        break;
      }

      case MouseState.Dead: {
        body.setVelocity(0, 0);
        this.scene.events.emit("dead", 1);
        break;
      }
    }
  }

  kill() {
    if (this.mouseState !== MouseState.Running) return;
    this.mouseState = MouseState.Killed;

    this.mouse.play(AnimationKeys.RocketMouseDead);

    const body = <Phaser.Physics.Arcade.Body>this.body;
    body.setAccelerationY(0);
    body.setVelocity(1000, 0);
    this.enableJetpack(false);
  }
}
