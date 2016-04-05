//app/view1/services/loaderSvc.js
myServices.service('loaderSvc', function () {
  var manifest = [ 
/*    {src: "fighter.png", id: "fighter"},*/
    {src: "obstacle.png", id: "fighter"},
/*    {src: "background.png", id: "background"},*/
    {src: "obstacle.png", id: "shield"},
/*    {src: "shield.png", id: "shield"},*/
/*    {src: "spritesheet_alien1.png", id: "alien1"},
    {src: "spritesheet_alien2.png", id: "alien2"},
    {src: "spritesheet_alien3.png", id: "alien3"},
    {src: "alien4.png", id: "alien4"},*/
    {src: "obstacle.png", id: "alien1"},
    {src: "obstacle.png", id: "alien2"},
    {src: "obstacle.png", id: "alien3"},
    {src: "obstacle.png", id: "alien4"},
    {src: "projectile.png", id: "projectile"},
  ];
  loader = new createjs.LoadQueue(true);

  createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
  loader.installPlugin(createjs.Sound);

  this.getResult = function(asset) {
  	return loader.getResult(asset);
  };
  this.getLoader = function() {
  	return loader;
  };
  this.loadAssets = function() {
  	loader.loadManifest(manifest, true, "/app/assets/");
  };
});