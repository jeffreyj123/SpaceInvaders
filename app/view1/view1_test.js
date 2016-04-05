'use strict';

describe('myApp.view1 module', function() {

  beforeEach(module('myApp.view1'));

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('View1Ctrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});

/*describe('myApp.services module', function() {

	beforeEach(module('myApp.services'));

	describe('loaderSvc', function() {

		var loaderSvc;

		beforeEach(inject(function() {
			var $injector = angular.injector(['myApp.services']);
			loaderSvc = $injector.get('loaderSvc');
		}));

		it('should preload objects', function() {
			var output = ;
			expect(output).toEqual();
		});
	});
});*/

describe('myApp.uiClasses module', function() {

	beforeEach(module('myApp.uiClasses'));

	describe('character', function() {

		var Character, fighter;

		beforeEach(inject(function() {
			var $injector = angular.injector(['myApp.uiClasses']);
			Character = $injector.get('Character');
			fighter = new Character({width: 100, height: 100, health: 3, lives: 3, damage: 1});
		}));

		it('should decay health and lives', function() {
			expect(fighter.projectile.getDamage()).toEqual(1);
			expect(fighter.decay(4)).toEqual(false);
			expect(fighter.getHealth()).toEqual(2);
			expect(fighter.getLives()).toEqual(2);
		});
	});

	describe('alien', function() {

		var alien;

		beforeEach(inject(function() {
			var $injector = angular.injector(['myApp.uiClasses']);
			alien = new $injector.get('Alien')({characterAssetName: 'alien1', y: 34, health: 3, damage: 1});
		}));

		it('should decay health', function() {
			expect(alien.decay(1)).toEqual(false);
			expect(alien.getHeath()).toEqual(2);
			expect(alient.decay(3)).toEqual(true);
			expect(alien.getHeath()).toEqual(0);
		});
	});

	describe('projectile', function() {

		var projectile;

		beforeEach(inject(function() {
			var $injector = angular.injector(['myApp.uiClasses']);
			projectile = new $injector.get('Projectile')({width: 100, height: 100, damage: 2});
		}));

		it('should fire projectile', function() {
			expect(projectile.getFired()).toEqual(false);

			projectile.fire(100, 100);

			expect(projectile.getFired()).toEqual(false);
		});
	});

	describe('shield', function() {

		var shield;

		beforeEach(inject(function() {
			var $injector = angular.injector(['myApp.uiClasses']);
			shield = new $injector.get('Shield')({width: 100, height: 100, health: 4});
		}));

		it('should decay health', function() {
			expect(shield.decay(1)).toEqual(false);
			expect(shield.getHealth()).toEqual(3);
		});
	});
});

/*describe('myApp.directives', function() {

	beforeEach(module('myApp.directives'));

	describe('myApp.spriteSheet', function() {

	});
});*/