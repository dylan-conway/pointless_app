(function(){
    function GoodSlime(mapX, mapY, level){
		this.c = [mapX, mapY];
		this.level = level;
		this.drawX = game.player.drawX + (this.c[0] - game.player.c[0]);
		this.drawY = game.player.drawY + (this.c[1] - game.player.c[1]);
		this.dead = false;
		this.exploding = false;
		this.visible = true;
		this.sprite = new Image();
		this.following = false;

		this.speed;
		this.vx;
		this.vy;
		this.width;
		this.height;
		this.maxHealth;
		this.health;
		this.healing;
		this.attractionRange;
		this.follows;
		this.src;
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

	GoodSlime.prototype = {
		init: function(){
			if(this.level === 1){
				this.speed = 5;
				this.width = 32;
				this.height = 32;
				this.maxHealth = 50;
				this.health = this.maxHealth;
				this.healing = 30;
				this.attractionRange = 200;
				this.follows = false;
				this.src = 'images/goodslimelevelone.png';
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
				this.sprite.onload = drawAnimationSprite(this.sprite, this.sx, this.sy,
														 this.sWidth, this.sHeight,
														 this.drawX, this.drawY,
														 this.dWidth, this.dHeight);

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

			// check map boundaries
			if(this.c[0] < 0 || this.c[0] + this.width > game.map.width){
				this.vx = -this.vx;
			}
			if(this.c[1] < 0 || this.c[1] + this.height > game.map.height){
				this.vy = -this.vy;
			}

			// check collision with player
			if(!this.dead){
				if(this.c[0] < game.player.c[0] + game.player.width &&
				   this.c[0] + this.width > game.player.c[0] &&
				   this.c[1] < game.player.c[1] + game.player.height &&
				   this.c[1] + this.height > game.player.c[1]){
					this.healPlayer();
				}
			}

			// move x-axis
			this.drawX += this.vx;
			this.c[0] += this.vx;

			// check collision of x-cords with walls
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

			// move on y-axis
			this.drawY += this.vy;
			this.c[1] += this.vy;

			// check collision for y-cords with walls
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
					this.vx = Math.cos(angle) * this.speed;
					this.vy = Math.sin(angle) * this.speed;
				}else if(this.c[0] < game.player.c[0] && this.c[1] > game.player.c[1]){
					this.vx = Math.cos(angle) * -this.speed;
					this.vy = Math.sin(angle) * this.speed;
				}else if(this.c[0] < game.player.c[0] && this.c[1] < game.player.c[1]){
					this.vx = Math.cos(angle) * -this.speed;
					this.vy = Math.sin(angle) * -this.speed;
				}else if(this.c[0] > game.player.c[0] && this.c[1] < game.player.c[1]){
					this.vx = Math.cos(angle) * this.speed;
					this.vy = Math.sin(angle) * -this.speed;
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
				for(let i = 0; i < 5; i ++){
					game.objects.addParticle(new Particle(this.drawX + this.width / 2, this.drawY + this.height / 2,
														  this.c[0] + this.width / 2, this.c[1] + this.height / 2,
														  'purple'));
					game.objects.addParticle(new Particle(this.drawX + this.width / 2, this.drawY + this.height / 2,
					  									  this.c[0] + this.width / 2, this.c[1] + this.height / 2,
														  'pink'));
				}
			}
		},

		healPlayer: function(){
			this.exploding = true;
			this.dead = true;
			game.objects.addParticle(new Particle(this.drawX + this.width / 2, this.drawY + this.height / 2,
												  this.c[0] + this.width / 2, this.c[1] + this.height / 2,
				                                  'yellow'));
			game.objects.addParticle(new Particle(this.drawX + this.width / 2, this.drawY + this.height / 2,
			                                	  this.c[0] + this.width / 2, this.c[1] + this.height / 2,
				                                  'orange'));
            game.player.heal(this.healing);
		},
    }
    
    window.GoodSlime = GoodSlime;
})();