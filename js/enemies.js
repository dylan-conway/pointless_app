
(function(){
	function BadSlime(mapX, mapY, level){
		this.level = level;
		this.c = [mapX, mapY];
		this.drawX = game.player.drawX + (this.c[0] - game.player.c[0]);
		this.drawY = game.player.drawY + (this.c[1] - game.player.c[1]);
		this.dead = false;
		this.exploding = false;
		this.visible = true;
		this.sprite = new Image();
		this.icon = new Image();
		this.following = false;

		this.speed;
		this.vx;
		this.vy;
		this.width;
		this.height;
		this.maxHealth;
		this.health;
		this.damage;
		this.attractionRange;
		this.follows;
		this.src;
		this.srcIcon;
		this.sx;
		this.sy;
		this.sWidth;
		this.sHeight;
		this.dWidth;
		this.dHeight;
		this.drawCounter;
		this.animationRate;
		this.init();
	}

	BadSlime.prototype = {
		init: function(){
			if(this.level === 1){
				this.speed = 2;
				this.width = 16;
				this.height = 16;
				this.maxHealth = 10;
				this.health = this.maxHealth;
				this.damage = 5;
				this.attractionRange = 75;
				this.follows = false;
				this.src = 'images/sluglevelone.png';
				this.srcIcon = 'images/slugleveloneicon.png';
				this.sx = getRandomInt(0, 3) * this.width;
				this.sy = 0;
				this.sWidth = this.width;
				this.sHeight = this.height;
				this.dWidth = this.width;
				this.dHeight = this.height;
				this.drawCounter = 0;
				this.animationRate = 5;
			}else if(this.level === 2){
				this.speed = 3;
				this.width = 32;
				this.height = 32;
				this.maxHealth = 30;
				this.health = this.maxHealth;
				this.damage = 20;
				this.attractionRange = 250;
				this.follows = true;
				this.src = 'images/slugleveltwo.png';
				this.srcIcon = 'images/slugleveltwoicon.png';
				this.sx = getRandomInt(0, 3) * this.width;
				this.sy = 0;
				this.sWidth = this.width;
				this.sHeight = this.height;
				this.dWidth = this.width;
				this.dHeight = this.height;
				this.drawCounter = 0;
				this.animationRate = 5;
			}else if(this.level === 3){
				this.speed = 4;
				this.width = 32;
				this.height = 32;
				this.maxHealth = 40;
				this.health = this.maxHealth;
				this.damage = 15;
				this.attractionRange = 150;
				this.follows = true;
				this.src = 'images/sluglevelthree.png';
				this.srcIcon = 'images/sluglevelthreeicon.png';
				this.sx = getRandomInt(0, 3) * this.width;
				this.sy = 0;
				this.sWidth = this.width;
				this.sHeight = this.height;
				this.dWidth = this.width;
				this.dHeight = this.height;
				this.drawCounter = 0;
				this.animationRate = 5;
			}else if(this.level === 4){
				this.speed = 1.2;
				this.width = 64;
				this.height = 64;
				this.maxHealth = 150;
				this.health = this.maxHealth;
				this.damage = 40;
				this.attractionRange = 600;
				this.follows = true;
				this.src = 'images/sluglevelfour.png';
				this.srcIcon = 'images/sluglevelfouricon.png';
				this.sx = getRandomInt(0, 3) * this.width;
				this.sy = 0;
				this.sWidth = this.width;
				this.sHeight = this.height;
				this.dWidth = this.width;
				this.dHeight = this.height;
				this.drawCounter = 0;
				this.animationRate = 5;
			}else if(this.level === 5){
				this.speed = 1;
				this.width = 128;
				this.height = 128;
				this.maxHealth = 400;
				this.health = this.maxHealth;
				this.damage = 80;
				this.attractionRange = 1000;
				this.follows = true;
				this.src = 'images/sluglevelfive.png';
				this.srcIcon = 'images/sluglevelfiveicon.png';
				this.sx = getRandomInt(0, 3) * this.width;
				this.sy = 0;
				this.sWidth = this.width;
				this.sHeight = this.height;
				this.dWidth = this.width;
				this.dHeight = this.height;
				this.drawCounter = 0;
				this.animationRate = 5;
			}
			this.vx = Math.random() * getRandomInt(-this.speed, this.speed);
			this.vy = Math.random() * getRandomInt(-this.speed, this.speed);
		},

		draw: function(){
			if(this.dead){
				this.visible = false;
			}else{
				this.update();
			}

			if(this.visible){
				this.sprite.onload = drawAnimationSprite(this.sprite, this.sx, this.sy, this.sWidth, this.sHeight, this.drawX, this.drawY, this.dWidth, this.dHeight);
				// if(this.level === 1){
				// 	this.sprite.src = 'images/slug.png';
				// }else if(this.level === 2){
				// 	this.sprite.src = 'images/slugleveltwo.png';
				// }else if(this.level === 3){
				// 	this.sprite.src = 'images/sluglevelthree.png';
				// }
				this.sprite.src = this.src;

				this.drawCounter ++;
				if(this.drawCounter === this.animationRate){
					this.drawCounter = 0;
					if(this.sx === this.width * 3){
						this.sx = 0;
					}else{
						this.sx += this.width;
					}
				}
			}
		},

		update: function(){
			this.calcVelocity();

			if(this.c[0] < 0 || this.c[0] + this.width > game.map.width){
				this.vx = -this.vx;
			}
			if(this.c[1] < 0 || this.c[1] + this.height > game.map.height){
				this.vy = -this.vy;
			}
			// if(this.c[0] < game.player.c[0] + game.player.width &&
			//    this.c[0] + this.width > game.player.c[0] &&
			//    Math.abs(this.c[1] - game.player.c[1]) < 32){
			// 	this.vx = -this.vx;
			// }
			// if(this.c[1] < game.player.c[1] + game.player.height &&
			//    this.c[1] + this.height > game.player.c[1] &&
			//    Math.abs(this.c[0] - game.player.c[0]) < 32){
			// 	this.vy = - this.vy;
			// }

			if(!this.dead){
				if(this.c[0] < game.player.c[0] + game.player.width &&
			       this.c[0] + this.width > game.player.c[0] &&
			       this.c[1] < game.player.c[1] + game.player.height &&
			       this.c[1] + this.height > game.player.c[1]){
					this.explode();
				}
			}

			this.drawX += this.vx;
			this.c[0] += this.vx;

			for(let wall of game.objects.walls){
				if(this.c[0] + this.width > wall.c[0] && this.c[0] < wall.c[0] + wall.width &&
				   this.c[1] + this.height > wall.c[1] && this.c[1] < wall.c[1] + wall.height){
					if(this.vx > 0){
						if(this.following){
							this.drawX -= (this.c[0] + this.width) - wall.c[0];
							this.c[0] -= (this.c[0] + this.width) - wall.c[0];
						}else{
							this.vx = -this.vx;
						}
					}else if(this.vx < 0){
						if(this.following){
							this.drawX += (wall.c[0] + wall.width) - this.c[0];
							this.c[0] += (wall.c[0] + wall.width) - this.c[0];
						}else{
							this.vx = -this.vx;
						}
					}
				}
			}

			this.drawY += this.vy;
			this.c[1] += this.vy;

			for(let wall of game.objects.walls){
				if(this.c[0] + this.width > wall.c[0] && this.c[0] < wall.c[0] + wall.width &&
				   this.c[1] + this.height > wall.c[1] && this.c[1] < wall.c[1] + wall.height){
					if(this.vy > 0){
						if(this.following){
							this.drawY -= (this.c[1] + this.height) - wall.c[1];
							this.c[1] -= (this.c[1] + this.height) - wall.c[1];
						}else{
							this.vy = -this.vy;
						}
					}else if(this.vy < 0){
						if(this.following){
							this.drawY += (wall.c[1] + wall.height) - this.c[1];
							this.c[1] += (wall.c[1] + wall.height) - this.c[1];
						}else{
							this.vy = -this.vy;
						}
					}
				}
			}
		},

		calcVelocity: function(){
			if(this.c[0] + this.width > game.player.c[0] - this.attractionRange &&
			   this.c[0] < game.player.c[0] + game.player.width + this.attractionRange &&
			   this.c[1] + this.height > game.player.c[1] - this.attractionRange &&
			   this.c[1] < game.player.c[1] + game.player.height + this.attractionRange){
		
				this.following = true;
				let adjecent = Math.abs(game.player.c[0] - this.c[0]);
				let opposite = Math.abs(game.player.c[1] - this.c[1]);
				let angle = Math.atan(opposite / adjecent);
				// console.log(adjecent, opposite, angle);

				if(this.c[0] > game.player.c[0] && this.c[1] > game.player.c[1]){
					this.vx = Math.cos(angle) * -this.speed;
					this.vy = Math.sin(angle) * -this.speed;
				}else if(this.c[0] < game.player.c[0] && this.c[1] > game.player.c[1]){
					this.vx = Math.cos(angle) * this.speed;
					this.vy = Math.sin(angle) * -this.speed;
				}else if(this.c[0] < game.player.c[0] && this.c[1] < game.player.c[1]){
					this.vx = Math.cos(angle) * this.speed;
					this.vy = Math.sin(angle) * this.speed;
				}else if(this.c[0] > game.player.c[0] && this.c[1] < game.player.c[1]){
					this.vx = Math.cos(angle) * -this.speed;
					this.vy = Math.sin(angle) * this.speed;
				}		
			}else if(this.following){
				if(this.follows){
					this.vx = Math.random() * getRandomInt(-this.speed, this.speed);
					this.vy = Math.random() * getRandomInt(-this.speed, this.speed);
					this.following = false;
				}
			}
		},

		checkVisibility: function(){
			if(this.c[0] + this.width > game.map.cc[0] &&
			   this.c[0] < game.map.cc[0] + game.map.camWidth &&
			   this.c[1] + this.height > game.map.cc[1] &&
			   this.c[1] < game.map.cc[1] + game.map.camHeight){
				this.visible = true;
			}else{
				this.visible = false;
			}
		},

		takeDamage: function(damage){
			this.health -= damage;
			if(this.health <= 0){
				this.dead = true;
				game.killCount ++;
				for(let i = 0; i < 5; i ++){
			    	// game.objects.addParticle(new Particle(this.drawX + this.width / 2, this.drawY + this.height / 2,
								// 			              this.c[0] + this.width / 2, this.c[1] + this.height / 2,
								// 			              'red'));
					game.objects.addParticle(new Particle(this.drawX + this.width / 2, this.drawY + this.height / 2,
												          this.c[0] + this.width / 2, this.c[1] + this.height / 2,
												          'orange'));
			    }
			}
		},

		explode: function(){
			this.exploding = true;
			this.dead = true;
			game.killCount ++;
			game.objects.addParticle(new Particle(this.drawX + this.width / 2, this.drawY + this.height / 2,
									              this.c[0] + this.width / 2, this.c[1] + this.height / 2,
									              'yellow'));
			game.objects.addParticle(new Particle(this.drawX + this.width / 2, this.drawY + this.height / 2,
										          this.c[0] + this.width / 2, this.c[1] + this.height / 2,
										          'orange'));
			game.player.takeDamage(this.damage);
		}
	}

	window.BadSlime = BadSlime;
})();