uiClasses.factory("Shield", ['loaderSvc', function (loaderSvc) {
  function Shield(obj) {
    var shieldImg = loaderSvc.getResult("shield");
    this.shield = new createjs.Shape();
    this.shield.graphics.beginBitmapFill(shieldImg).drawRect(-shieldImg.width / 2, -shieldImg.width / 2, shieldImg.width, shieldImg.height);
    
    this.shield.x = obj.width + shieldImg.width;
    this.shield.y = obj.height - shieldImg.height;
    this.height = shieldImg.height;
    this.width = shieldImg.width;
    this.height = shieldImg.height;
    
    this.health = obj.health;
    this.hasStage = false;
  }
  Shield.prototype = {
    addToStage: function (stage) {
      stage.addChild(this.shield);
      this.hasStage = true;
    },
    removeFromStage: function (stage) {
      stage.removeChild(this.shield);
      this.hasStage = false;
    },
    isOnStage: function () {
      return this.hasStage;
    },
    getWidth: function() {
      return this.width;
    },
    getHeight: function () {
      return this.height;
    },
    getX: function () {
      return this.shield.x;
    },
    setX: function (val) {
      this.shield.x = val;
    },
    getY: function () {
      return this.shield.y;
    },
    setY: function (val) {
      this.shield.y = val;
    },
    decay: function(val) {
      var health = this.health - val;
      this.health = (health < 0) ? 0 : health;
      return this.health == 0;
    },
    move: function (x, y) {
      this.shield.x = this.shield.x + x;
      this.shield.y = this.shield.y + y;
    }
  };
  return (Shield);
}]);