angular.module('myApp.directives', [])
	.directive('spriteSheet', ['loaderSvc', 'Background', 'Alien', 'Shield', 'Projectile', 'Character', function(loaderSvc, Background, Alien, Shield, Projectile, Character) {
		"use strict";
		return {
			restrict: 'EAC',
			replace: true,
			scope: {
				width: "=width",
				height: "=height",
				score: "=score",
				lifesCount: "=lifesCount"
			},
			template : "<canvas></canvas>",
			link: function(scope, element, attribute) {
				var w, h, loader, manifest, background, fighter, aliens, bonusAlien, shields, runningSoundInstance, status;
				var checkBounds = true, moveObstacle = true;
				var alienCols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
				var direction = 1, timeUpperBound = 1000;

				drawGame();

				function drawGame() {
					// drawing the game canvas from scratch here
					// in future we can pass stages as param and load index from arrays of background elements
					if (scope.stage) {
						scope.stage.autoClear = true;
						scope.stage.removeAllChildren();
						scope.stage.update();
					} else {
						scope.stage = new createjs.Stage(element[0]);
					}
					element[0].width = scope.width;
					element[0].height = scope.height;
					w = scope.width;
					h = scope.height;
					loaderSvc.getLoader().addEventListener("complete", handleComplete);
					loaderSvc.loadAssets();
				}

				function handleComplete() {
/*					background = new Background({width: w, height: h});
					background.addToStage(scope.stage);*/

					fighter = new Character({characterAssetName: 'fighter', width: w, height: h, y: 34, health: 1, lives: 3})
					fighter.addToStage(scope.stage);

					shields = [];
					for (var index = 0; index < 5; index++) {
						var shield = new Shield({width: w, height: h, health: 4});
						shield.addToStage(scope.stage);
						shield.setX(index * 90 + 50);
						shield.setY(h - 100);
						shields.push(shield);
					}

					aliens = [];
					for (var row = 0; row < 5; row++) {
						var alienRow = [], assetName;
						if (row == 0) {
							assetName = "alien1";
						} else if (row < 2) {
							assetName = "alien2";
						} else {
							assetName = "alien3";
						}
						for (var col = 0; col < 4; col++) {
							var newAlien = new Alien({characterAssetName: assetName, width: w, height: h, y: row * 30 + 50, health: 1});
							newAlien.addToStage(scope.stage);
							newAlien.setX(80 * col + 80);
							newAlien.setY(80 * row + 80);
							alienRow.push(newAlien);
						}
						aliens.push(alienRow);
					}
/*
					bonusAlien = new Alien({characterAssetName: "alien4", width: w, height: h, y: 20, health: 1});
*/
/*					scope.stage.addEventListener("stagemousedown", handleJumpStart);*/

					createjs.Ticker.timingMode = createjs.Ticker.RAF;
					createjs.Ticker.addEventListener("tick", tick);

					runningSoundInstance = createjs.Sound.play("runningSound", {loop: -1});

					scope.status = "running";
					window.onkeydown = keydown;
					scope.score = 0;
					scope.lifesCount = fighter.getLives();
					scope.$apply();
		    }

        function keydown(event) {
        	if (event.keyCode == 39) { // right
        		if (fighter.getX() + fighter.getWidth() / 2 + 5 <= w) {
        			fighter.move(5);
        		}
        	}
        	if (event.keyCode == 37) { // left
        		if (fighter.getX() - fighter.getWidth() / 2 - 5 >= 0) {
        			fighter.move(-5);
        		}
        	}
        	if (event.keyCode == 32) { // spacebar
        		fireProjectile();
        	}
        }

				function pauseGame() {
					createjs.Ticker.removeEventListener("tick", tick);
		        scope.status = "paused";
				}

				function fireProjectile() {
					if (!fighter.projectile.getFired()) {
						fighter.projectile.fire(fighter.getX(), fighter.getY());
						fighter.projectile.addToStage(scope.stage);
					}
				}

				function fireAlienProjectile(exclude) {
					var col = Math.floor(Math.random() * 11);
					while (exclude.indexOf(col)) {
						col += 1;
						col %= 11;
					}

					for (var row = 4; row >= 0; row--) {
						var alien = aliens[row][col];
						if (alien.getHealth() > 0) {
							alien.projectile.fire(alien.getX(), alien.getY() - alien.getHeight() / 2); // finish
							alienProjectile = alien.projectile;
							return;
						}
					}
					exclude.push(col);
					fireAlienProjectile(exclude);
				}

				function tick(event) {
					var deltaS = event.delta / 1000;
					var deltaY = 300 * deltaS;
					var calcDirect;

/*					if (createjs.Ticker.getTime() > timeUpperBound) {
						timeUpperBound = createjs.Ticket.getTime() + 1000;
						moveAliens();
					}

					if (alienProjectile.getFired()) {
						alienProjectile.move(deltaY);
						for (var shield of shields) {
							if (calcCollisionRect(alienProjectile, shield)) {
								shield.decay(alienProjectile.getDamage());
								alienProjectile.setFired(false);
								alienProjectile.removeFromStage();
							}
						}

						if (calcCollisionRect(alienProjectile, fighter)) {
							fighter.decay(alienProjectile.getDamage());
							scope.lifesCount = fighter.getLives();
							scope.$apply();
						}

						if (alienProjectile.getY() < 0) {
							alienProjectile.setFired(false);
						}
					}
*/
					if (fighter.projectile.getFired()) {
						fighter.projectile.move(-deltaY);
						if (fighter.projectile.getY() < 0) {
							fighter.projectile.setFired(false);
						}

						for (var shield of shields) {
							if (shield.isOnStage() && calcCollisionRect(fighter.projectile, shield)) {
								if (shield.decay(1)) {
									shield.removeFromStage(scope.stage);
								}
								fighter.projectile.removeFromStage(scope.stage);
								fighter.projectile.setFired(false);
							}
						}

						for (var row of aliens) {
							for (var alien of row) {
								if (alien.isOnStage() && calcCollisionRect(fighter.projectile, alien)) {
									/*calcDirect = true;*/
									alien.removeFromStage(scope.stage);
									fighter.projectile.removeFromStage(scope.stage);
									fighter.projectile.setFired(false);

									scope.score += 100;
									scope.$apply();
								}
							}
						}
					}
/*
					position += direction * 10;

					if (calcDirect || position < 0 || position > 400) {
						calcDirect = false;
						calcDirection();
					}*/

					scope.stage.update(event);
				}

				function calcDirection() {
					var directionBound, alien = null, position;
					if (alienCols.length > 1) {
						var width = alienCols[alienCols.length - 1] - alienCols[0];
						width *= 30;
						if (direction > 0) {
							directionBound = alienCols[alienCols.length - 1];
						} else {
							directionBound = alienCols[0];
						}
						for (var row = 0; row < 5; row++) {
							alien = aliens[row][alienCols[alienCols.length - 1]];
							if (alien.isOnStage()) {
								position = alien.getX() + direction * alien.getWidth() / 2;
								position += alien.getMovement();
								break;
							} else {
								alien = null;
							}
						}
						if (alien == null) {
							alienCols.splice(directionBound, 1);
							moveAliens();
						}
					} else {
						for (var row = 0; row < 5; row++) {
							alien = aliens[row][alienCols[0]];
							if (alien.isOnStage()) {
								position = alien.getX() + direction * alien.getWidth() / 2;
								position += alient.getMovement();
								break;
							}
						}
					}

					if (direction > 0 && position > 400) {
						direction = -1;
					} else if (direction < 0 && position < 0) {
						direction = 1;
					}
				}

				function moveAliens() {
					for (var row of aliens) {
						for (var alien of row) {
							if (alien.isOnStage()) {
								alien.move(direction);
							}
						}
					}
				}

				// calcCollision for obj1, obj2
				function calcCollisionRect(obj1, obj2) {
					var halfWidth1 = obj1.getWidth() / 2;
					var halfHeight1 = obj1.getHeight() / 2;
					var halfWidth2 = obj2.getWidth() / 2;
					var halfHeight2 = obj2.getHeight() / 2;

					var XLBound1 = obj1.getX() - halfWidth1;
					var XUBound1 = obj1.getX() + halfWidth1;
					var YLBound1 = obj1.getY() - halfHeight1;
					var YUBound1 = obj1.getY() + halfHeight1;

					var XLBound2 = obj2.getX() - halfWidth2;
					var XUBound2 = obj2.getX() + halfWidth2;
					var YLBound2 = obj2.getY() - halfHeight2;
					var YUBound2 = obj2.getY() + halfHeight2;

					return (XUBound1 > XLBound2 && XLBound1 < XUBound2) &&
						(YUBound1 > YLBound2 && YLBound1 < YUBound2);
				}
			}
		}
	}]);