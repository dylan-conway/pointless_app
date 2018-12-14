(function(){
	function Player(){
		this.drawX;
		this.drawY;
		this.c = [];
		this.width = 32;
		this.height = 32;
		// this.speed = 2;
		this.speed = 4;
		this.direction = 'down';
		this.canMoveUp = true;
		this.canMoveRight = true;
		this.canMoveDown = true;
		this.canMoveLeft = true;
		this.canShoot = true;
		this.shootRate = 7;
		this.shootTimeCounter = this.shootRate;
		this.lastHit;
		this.maxHealth = 100;
		this.health = this.maxHealth;
		this.sprite = new Image();
		this.sx = 0;
		this.animationRate = 5;
		this.drawCounter = 0;
	}

	Player.prototype = {
		draw: function(){
			this.update();

			this.sprite.onload = drawAnimationSprite(this.sprite, this.sx, 0, 32, 32, this.drawX, this.drawY, 32, 32);
			this.sprite.src = 'images/badslime.png'

			this.drawCounter ++;
			if(this.drawCounter === this.animationRate){
				this.drawCounter = 0;
				if(this.sx === 96){
					this.sx = 0;
				}else{
					this.sx += this.width;
				}
			}

			if(this.shootTimeCounter < this.shootRate){
				this.shootTimeCounter ++;
			}else if(this.shootTimeCounter === this.shootRate){
				this.canShoot = true;
			}
		},

		update: function(){	
			// console.log('x: ' + this.c[0], 'y: ' + this.c[1]);
			if(this.lastHit){
				if(this.lastHit.dead){
					this.lastHit = null;
				}
			}
		},

		shoot: function(mx, my){
			if(this.canShoot){
				game.objects.addBullet(new Bullet(this.drawX, this.drawY, mx, my, this.c[0], this.c[1]));
				this.canShoot = false;
				this.shootTimeCounter = 0;
			}
		},

		takeDamage: function(damage){
			this.health -= damage;
			if(this.health <= 0){
				game.endGame();
			}
		},

		heal: function(healing){
			this.health += healing;
			if(this.health > this.maxHealth){
				this.health = this.maxHealth;
			}
		},

		moveUp: function(speed){
			// this.drawY -= speed;
			if(this.c[1] < 0){
				game.moveDown(0 - this.c[1]);
			}
			for(let wall of game.objects.walls){
				if(this.c[1] + this.height > wall.c[1] && this.c[1] < wall.c[1] + wall.height &&
				   this.c[0] + this.width > wall.c[0] && this.c[0] < wall.c[0] + wall.width){
					game.moveDown((wall.c[1] + wall.height) - this.c[1]);
				}
			}
	
			// for(let i = 0; i < game.objects.enemies.length; i ++){
			// 	if(!game.objects.enemies[i].dead){
			// 		if(this.c[1] < game.objects.enemies[i].c[1] + game.objects.enemies[i].height &&
			// 		   this.c[1] + this.height > game.objects.enemies[i].c[1] &&
			// 		   Math.abs(this.c[0] - game.objects.enemies[i].c[0]) < 32){
			// 			game.moveDown(32 - (this.c[1] - game.objects.enemies[i].c[1]));	
			// 		}
			// 	}
			// }
		},

		moveRight: function(speed){
			// this.drawX += speed;
			if(this.c[0] + this.width > game.map.width){
				game.moveLeft(this.c[0] + this.width - game.map.width);
			}
			for(let wall of game.objects.walls){
				if(this.c[1] + this.height > wall.c[1] && this.c[1] < wall.c[1] + wall.height &&
				   this.c[0] + this.width > wall.c[0] && this.c[0] < wall.c[0] + wall.width){
					game.moveLeft((this.c[0] + this.width) - wall.c[0]);
				}
			}

			// for(let i = 0; i < game.objects.enemies.length; i ++){
			// 	if(!game.objects.enemies[i].dead){
			// 		if(this.c[0] + this.width > game.objects.enemies[i].c[0] &&
			// 		   this.c[0] < game.objects.enemies[i].c[0] + game.objects.enemies[i].width &&
			// 		   Math.abs(this.c[1] - game.objects.enemies[i].c[1]) < 32){
			// 			game.moveLeft(32 + (this.c[0] - game.objects.enemies[i].c[0]));
			// 		}	
			// 	}
			// }
		},

		moveDown: function(speed){
			// this.drawY += speed;
			if(this.c[1] + this.height > game.map.height){
				game.moveUp(this.c[1] + this.height - game.map.height);
			}
			for(let wall of game.objects.walls){
				if(this.c[1] + this.height > wall.c[1] && this.c[1] < wall.c[1] + wall.height &&
				   this.c[0] + this.width > wall.c[0] && this.c[0] < wall.c[0] + wall.width){
					game.moveUp((this.c[1] + this.height) - wall.c[1]);
				}
			}

			// for(let i = 0; i < game.objects.enemies.length; i ++){
			// 	if(!game.objects.enemies[i].dead){
			// 		if(this.c[1] + this.height > game.objects.enemies[i].c[1] &&
			// 		   this.c[1] < game.objects.enemies[i].c[1] + game.objects.enemies[i].height &&
			// 		   Math.abs(this.c[0] - game.objects.enemies[i].c[0]) < 32){
			// 			game.moveUp(32 + (this.c[1] - game.objects.enemies[i].c[1]));
			// 		}
			// 	}
			// }
		},

		moveLeft: function(speed){
			// this.drawX -= speed;
			if(this.c[0] < 0){
				game.moveRight(0 - this.c[0]);
			}
			for(let wall of game.objects.walls){
				if(this.c[1] + this.height > wall.c[1] && this.c[1] < wall.c[1] + wall.height &&
				   this.c[0] + this.width > wall.c[0] && this.c[0] < wall.c[0] + wall.width){
					game.moveRight((wall.c[0] + wall.width) - this.c[0]);
				}
			}

			// for(let i = 0; i < game.objects.enemies.length; i ++){
			// 	if(!game.objects.enemies[i].dead){
			// 		if(this.c[0] < game.objects.enemies[i].c[0] + game.objects.enemies[i].width &&
			// 		   this.c[0] + this.width > game.objects.enemies[i].c[0] &&
			// 		   Math.abs(this.c[1] - game.objects.enemies[i].c[1]) < 32){
			// 			game.moveRight(32 - (this.c[0] - game.objects.enemies[i].c[0]));
			// 		}
			// 	}
			// }
		},

		checkDirection: function(mousex, mousey){
			let midx = this.drawX + this.width / 2;
			let midy = this.drawY + this.height / 2;
			if(mousex > midx && mousey > midy){
				if(mousey - midy > mousex - midx){
					this.direction = 'down'
				}else if(mousey - midy < mousex - midx){
					this.direction = 'right'
				}
			}else if(mousex < midx && mousey > midy){
				if(mousey - midy > midx - mousex){
					this.direction = 'down'
				}else if(mousey - midy < midx - mousex){
					this.direction = 'left'
				}
			}else if(mousex < midx && mousey < midy){
				if(midy - mousey > midx - mousex){
					this.direction = 'up'
				}else if(midy - mousey < midx - mousex){
					this.direction = 'left'
				}
			}else if(mousex > midx && mousey < midy){
				if(midy - mousey > mousex - midx){
					this.direction = 'up'
				}else if(midy - mousey < mousex - midx){
					this.direction = 'right'
				}
			}
		}
	}

	window.Player = Player;
})();