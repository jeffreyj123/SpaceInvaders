uiClasses.factory("Background", ['loaderSvc', function (loaderSvc) {
  function Background(obj) {
    this.background = new createjs.Shape();
    this.background.graphics.beginBitmapFill(loaderSvc.getResult("background")).drawRect(0, 0, obj.width, obj.height);
  }
 
  Background.prototype = {
    addToStage: function (stage) {
      stage.addChild(this.background);
    },
    removeFromStage: function (stage) {
      stage.removeChild(this.background);
    }
  };

  return (Background);
}]);