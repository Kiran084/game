
cc.Class({
  extends: cc.Component,

  properties: {
    player: {
      default: null,
      type: cc.Node,
    },
    starPrefab: {
      default: null,
      type: cc.Prefab,
    },
    maxStartDuration: 0,
    minStartDuration: 0,
    ground: {
      default: null,
      type: cc.Node,
    },
    scoreDisplay: {
      default: null,
      type: cc.Label,
    },
    scoreAudio: {
      default: null,
      type: cc.AudioClip,
    },
  },

  onLoad: function () {
    this.groundY = this.ground.y + this.ground.height / 2;
    this.timer = 0;
    this.startDuration = 0;
    this.spawnNewStar();
    this.score = 0;
  },

  spawnNewStar: function () {
    var newStar = cc.instantiate(this.starPrefab);
    this.node.addChild(newStar);
    newStar.setPosition(this.getNewStarPosition());

    // Set the game reference on the star component
    var starComponent = newStar.getComponent("Star");
    if (starComponent) {
      starComponent.game = this;
    } else {
      console.error("Star component not found on the star prefab.");
    }
    this.startDuration =
      this.minStartDuration +
      Math.random() * (this.maxStartDuration - this.minStartDuration);
    this.timer = 0;
  },

  getNewStarPosition: function () {
    var randX = 0;
    var randY =
      this.groundY +
      Math.random() * this.player.getComponent("Player").jumpHeight +
      50;

    var maxX = this.node.width / 2;

    randX = (Math.random() - 0.5) * 2 * maxX;

    return cc.v2(randX, randY);
  },

  update: function (dt) {
    if (this.timer > this.startDuration) {
      this.gameOver();
      return;
    }
    this.timer += dt;
  },

  gainScore: function () {
    this.score += 1;
    this.scoreDisplay.string = "Score: " + this.score;
    cc.audioEngine.playEffect(this.scoreAudio, false);
  },

  gameOver: function () {
    if (this.player && this.player.stopAllActions) {
      this.player.stopAllActions(); // Correct method name
    } else {
      console.error(
        "Player node is either not defined or does not have the stopAllActions method."
      );
    }
    cc.director.loadScene("game");
  },
});
