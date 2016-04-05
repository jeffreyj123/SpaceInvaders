uiClasses.factory("Character", ['loaderSvc', 'Projectile', function (loaderSvc, Projectile) {
  function Character(obj) {
    var characterImg = loaderSvc.getResult("fighter");
    this.character = new createjs.Shape();
    this.character.graphics.beginBitmapFill(characterImg).drawRect(-characterImg.width / 2, -characterImg.height / 2, characterImg.width, characterImg.height);
    
    this.character.x = characterImg.width;
    this.character.y = obj.height - characterImg.height / 2;
    this.width = characterImg.width;
    this.height = characterImg.height;

    this.projectile = new Projectile(obj);
    this.health = obj.health;
    this.maxHealth = obj.health;
    this.lives = obj.lives;
  }
  Character.prototype = {
    addToStage: function (stage) {
      stage.addChild(this.character);
    },
    removeFromStage: function (stage) {
      stage.removeChild(this.character);
    },
    getWidth: function() {
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
    getLives: function () {
      return this.lives;
    },
    getX: function () {
      return this.character.x;
    },
    setX: function (val) {
      this.character.x = val;
    },
    getY: function () {
      return this.character.y;
    },
    setY: function (val) {
      this.character.y = val;
    },
    decay: function(val) {
      this.lives -= Math.floor(val / this.maxHealth);
      if (this.lives > 0) {
        this.health = (val - this.health) % maxHealth;
      } else {
        this.health = this.lives = 0;
      }
      
      return this.lives == 0;
    },
    move: function (x) {
      this.character.x = this.character.x + x;
    }
  };
  return (Character);
}]);