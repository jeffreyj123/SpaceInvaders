uiClasses.factory("Projectile", ['loaderSvc', function (loaderSvc) {
  function Projectile(obj) {
    var projectileImg = loaderSvc.getResult("projectile");
    this.projectile = new createjs.Shape();
    this.projectile.graphics.beginBitmapFill(projectileImg).drawRect(-projectileImg.width / 2, -projectileImg.height / 2, projectileImg.width, projectileImg.height);
    
    this.projectile.x = obj.width + projectileImg.width;
    this.projectile.y = obj.height - projectileImg.height;

    this.width = projectileImg.width;
    this.height = projectileImg.height;
    
    this.hasFired = false;
    this.damage = obj.damage;
  }
  Projectile.prototype = {
    addToStage: function (stage) {
      stage.addChild(this.projectile);
    },
    removeFromStage: function (stage) {
      stage.removeChild(this.projectile);
    },
    getWidth: function() {
      return this.width;
    },
    getHeight: function () {
      return this.height;
    },
    getFired: function () {
      return this.hasFired;
    },
    setFired: function (bool) {
      this.hasFired = bool;
    },
    getX: function () {
      return this.projectile.x;
    },
    setX: function (val) {
      this.projectile.x = val;
    },
    getY: function () {
      return this.projectile.y;
    },
    setY: function (val) {
      this.projectile.y = val;
    },
    getDamage: function () {
      return this.damage;
    },
    fire: function (x, y) {
      this.projectile.x = x;
      this.projectile.y = y;
      this.hasFired = true;
    },
    move: function(y) {
      this.projectile.y += y;
    }
  };
  return (Projectile);
}]);