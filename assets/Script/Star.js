
cc.Class({
  extends: cc.Component,

  properties: {
    pickRadius: 0,
    game: {
      default: null,
      type: cc.Component,
    },
  },

  getPlayerDistance: function () {
    

    var playerComponent = this.game.player.getComponent("Player");
    

    var playerPos = this.game.player.getPosition();
    var dist = this.node.position.sub(playerPos).mag();
    return dist;
  },

  onPicked: function () {
    if (this.game) {
      this.game.spawnNewStar();
      this.game.gainScore();
      this.node.destroy();
    } else {
      console.error("Game reference is missing.");
    }
  },

  update(dt) {
    if (this.getPlayerDistance() < this.pickRadius) {
      this.onPicked();
      return;
    }
    var opacityRatio = 1 - this.game.timer / this.game.startDuration;
    var minOpacity = 50;
    this.node.opacity =
      minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
  },
});
