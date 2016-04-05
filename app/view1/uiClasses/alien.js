uiClasses.factory("Alien", ['loaderSvc', 'Projectile', function (loaderSvc, Projectile) {
  function Alien(obj) {
/*    if (obj.characterAssetName != 'alien4') {
      var spriteSheet = new createjs.SpriteSheet({
        framerate: 30, // edit the values
        images: [loaderSvc.getResult(obj.characterAssetName)],
        frames: {regX: 15, regY: 15, width: 30, height: 30, spacing: 32, count: 2},
        animations: {
          move: [0, 1]
        }
      });

      this.alien = new createjs.Sprite(spriteSheet, "move");
    } else {
      var alienImg = loaderSvc.getResult('alien4');
      this.alien = new createjs.Shape();
      this.alien.graphics.beginBitmapFill(alienImg).drawRect(0, 0, alienImg.width, alienImg.height);
    }*/
    var alienImg = loaderSvc.getResult('shield');
    this.alien = new createjs.Shape();
    this.alien.graphics.beginBitmapFill(alienImg).drawRect(-alienImg.width / 2, -alienImg.height / 2, alienImg.width, alienImg.height);
    this.alien.y = obj.y;
    this.width = alienImg.width;
    this.height = alienImg.height;

    this.projectile = new Projectile({obj});
    this.health = obj.health;
    this.maxHealth = obj.health;
    this.hasStage = false;
  }

  Alien.prototype = {
    addToStage: function (stage) {
      stage.addChild(this.alien);
      this.hasStage = true;
    },
    removeFromStage: function (stage) {
      stage.removeChild(this.alien);
      this.hasStage = false;
    },
    isOnStage: function () {
      return this.hasStage;
    },
    getWidth: function () {
      return this.width;
    },
    getHeight: function () {
      return this.height;
    },
    getHealth: function () {
      return this.health;
    },
    getMaxHealth: function () {
      return this.maxHealth;
    },
    getX: function () {
      return this.alien.x;
    },
    setX: function (val) {
      this.alien.x =  val;
    },
    getY: function () {
      return this.alien.y;
    },
    setY: function (val) {
      this.alien.y = val;
    },
    decay: function (val) {
      var health = this.health - val;
      this.health = (health < 0) ? 0 : health;
      return this.health == 0;
    },
    move: function (direction) {
      this.alien.x += direction * 10;
    },
    playAnimation: function (animation) {
      this.alien.gotoAndPlay(animation);
    }
  };
  return (Alien);
}]);