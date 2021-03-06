(function(){
	function Bullet(drawX, drawY, mx, my, c0, c1){
		this.playerDrawX = drawX;
		this.playerDrawY = drawY;
		this.playerMapX = c0;
		this.playerMapY = c1;
		this.drawX;
		this.drawY;
		this.mx = mx;
		this.my = my;
		this.originX;
		this.originY;
		this.c = [];
		// this.speed = 10;
		this.speed = 10;
		this.width = 10;
		this.height = 10;
		this.damage = 15;
		this.vx;
		this.vy;
		this.used = false;
		this.visible = true;
		this.sprite = new Image();
		this.drawCounter = 0;
		this.animationRate = 7;
		this.sx = 0;
		this.particleCounter = 3;
		this.calculateDirection();
	}

	Bullet.prototype = {
		draw: function(){
			if(this.used){
				this.visible = false;
			}else{
				this.update();
			}
			if(this.visible){
				this.particleCounter ++;
				if(this.particleCounter === 5){
					game.objects.addParticle(new BulletParticle(this.drawX, this.drawY, this.c[0], this.c[1], 'white'));
					game.objects.addParticle(new BulletParticle(this.drawX, this.drawY, this.c[0], this.c[1], 'white'));
					this.particleCounter = 0;
				}

				// c.ctx.fillStyle = 'rgba(106, 90, 205, .5)';
				// c.ctx.beginPath();
				// c.ctx.moveTo(-5 * (this.vx / this.vy) + this.originX, -5 * (this.vx / this.vy) + this.originY);
				// c.ctx.lineTo(-(this.drawX - this.originX) * (this.vy / this.vx) + this.originX, -(this.drawY - this.originY) * (this.vy / this.vx) + this.originY);
				// c.ctx.lineTo(5 * (this.vx / this.vy) + this.originX, 5 * (this.vx / this.vy) + this.originY);
				// c.ctx.closePath();
				// c.ctx.fill();

				this.sprite.onload = drawAnimationSprite(this.sprite, this.sx, 0, 10, 10, this.drawX, this.drawY, 10, 10);
				this.sprite.src = 'images/bullet.png';

				this.drawCounter ++;
				if(this.drawCounter === this.animationRate){
					this.drawCounter = 0;
					if(this.sx === 30){
						this.sx = 0;
					}else{
						this.sx += this.width;
					}
				}
			}else{

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

		update: function(){
			this.drawX += this.vx;
			this.drawY += this.vy;
			this.c[0] += this.vx;
			this.c[1] += this.vy;

			if(this.c[0] < 0 || this.c[0] + this.width > game.map.width){
				// this.delete(this);
				this.used = true;
			}
			if(this.c[1] < 0 || this.c[1] + this.height > game.map.height){
				// this.delete(this);
				this.used = true;
			}

			for(let wall of game.objects.walls){
				if(this.c[0] + this.width > wall.c[0] && this.c[0] < wall.c[0] + wall.width &&
				   this.c[1] + this.height > wall.c[1] && this.c[1] < wall.c[1] + wall.height){
					this.used = true;
				}
			}

			// console.log("X: " + this.c[0], "Y: " + this.c[1]);
		},

		calculateDirection: function(){
			let originX = this.playerDrawX + (game.player.width / 2);
			let originY = this.playerDrawY + (game.player.height / 2);
			let adjecent = Math.abs(this.mx - originX);
			let opposite = Math.abs(this.my - originY);
			let angle = Math.atan(opposite / adjecent);
			// console.log(adjecent, opposite, angle);

			if(originX > this.mx && originY > this.my){
				this.vx = Math.cos(angle) * -this.speed;
				this.vy = Math.sin(angle) * -this.speed;
			}else if(originX < this.mx && originY > this.my){
				this.vx = Math.cos(angle) * this.speed;
				this.vy = Math.sin(angle) * -this.speed;
			}else if(originX < this.mx && originY < this.my){
				this.vx = Math.cos(angle) * this.speed;
				this.vy = Math.sin(angle) * this.speed;
			}else if(originX > this.mx && originY < this.my){
				this.vx = Math.cos(angle) * -this.speed;
				this.vy = Math.sin(angle) * this.speed;
			}

			this.drawX = (this.playerDrawX + game.player.width / 3) + (this.vx * .1);
			this.drawY = (this.playerDrawY + game.player.height / 3) + (this.vy * .1);

			this.c[0] = (this.playerMapX + game.player.width / 3) + (this.vx * .1);
			this.c[1] = (this.playerMapY + game.player.height / 3) + (this.vy * .1);

			// this.originX = this.drawX += this.vx;
			// this.originY = this.drawY += this.vy;
		},

		delete: function(self){
			let index = game.objects.bullets.indexOf(self);
			game.objects.bullets.splice(index, 1);
		}
	}

	function Missle(drawX, drawY, c0, c1){
		this.drawX = drawX;
		this.drawY = drawY;
		this.c = [c0, c1];
		this.width = 10;
		this.height = 10;
		this.damage = 50;
		// this.speed = 15;
		this.speed = 8;
		this.sprite = new Image();
		this.used = false;
		this.visible = true;
		this.drawCounter = 0;
		this.animationRate = 5;
		this.sx = 0;
		this.particleCounter = 0;

		this.target = false;
		this.vx;
		this.vy;
		this.distance;
		this.minDistance = 100000;
	}

	Missle.prototype = {
		draw: function(){
			if(this.used){
				this.visible = false;
			}else{
				this.update();
			}
			if(this.visible){
				// this.particleCounter ++;
				if(this.particleCounter === 0){
					game.objects.addParticle(new BulletParticle(this.drawX, this.drawY, this.c[0], this.c[1], 'black'));
					game.objects.addParticle(new BulletParticle(this.drawX, this.drawY, this.c[0], this.c[1], 'black'));
					this.particleCounter = 0;
				}

				this.sprite.onload = drawAnimationSprite(this.sprite, this.sx, 0, 10, 10, this.drawX, this.drawY, 10, 10);
				this.sprite.src = 'images/missle.png';

				this.drawCounter ++;
				if(this.drawCounter === this.animationRate){
					this.drawCounter = 0;
					if(this.sx === 30){
						this.sx = 0;
					}else{
						this.sx += this.width;
					}
				}
			}
		},

		update: function(){

			for(let i = 0; i < game.objects.enemies.length; i ++){
				if(!game.objects.enemies[i].dead){
					let x = Math.abs((this.c[0] + this.width / 2) - game.objects.enemies[i].c[0] + game.objects.enemies[i].width / 2);
					let y = Math.abs((this.c[1] + this.height / 2) - game.objects.enemies[i].c[1] + game.objects.enemies[i].height / 2);
			
					this.distance = Math.sqrt(x ** 2 + y ** 2);
					if(this.distance < this.minDistance){
						this.minDistance = this.distance;
						this.target = game.objects.enemies[i];
					}
				}
			}

			for(let i = 0; i < game.objects.friends.length; i ++){
				if(!game.objects.friends[i].dead){
					let x = Math.abs((this.c[0] + this.width / 2) - game.objects.friends[i].c[0] + game.objects.friends[i].width / 2);
					let y = Math.abs((this.c[1] + this.height / 2) - game.objects.friends[i].c[1] + game.objects.friends[i].height / 2);
			
					this.distance = Math.sqrt(x ** 2 + y ** 2);
					if(this.distance < this.minDistance){
						this.minDistance = this.distance;
						this.target = game.objects.friends[i];
					}
				}
			}

			if(this.target && this.target.dead){
				this.target = false;
				for(let i = 0; i < game.objects.enemies.length; i ++){
					if(!game.objects.enemies[i].dead){
						let x = Math.abs((this.c[0] + this.width / 2) - game.objects.enemies[i].c[0] + game.objects.enemies[i].width / 2);
						let y = Math.abs((this.c[1] + this.height / 2) - game.objects.enemies[i].c[1] + game.objects.enemies[i].height / 2);
				
						this.distance = Math.sqrt(x ** 2 + y ** 2);
						if(this.distance < this.minDistance){
							this.minDistance = this.distance;
							this.target = game.objects.enemies[i];
						}
					}
				}
			}

			this.calcVelocity();

			this.drawX += this.vx;
			this.drawY += this.vy;
			this.c[0] += this.vx;
			this.c[1] += this.vy;
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

		calcVelocity: function(){
			if(!this.target){
				this.used = true;
			}else{
				let adjecent = Math.abs((this.target.c[0] + this.target.width / 2) - (this.c[0] + this.width / 2));
				let opposite = Math.abs((this.target.c[1] + this.target.height / 2) - (this.c[1] + this.height / 2));
				let angle = Math.atan(opposite / adjecent);

				let cx = this.c[0] + this.width / 2;
				let cy = this.c[1] + this.height / 2;
				let ecx = this.target.c[0] + this.target.width / 2;
				let ecy = this.target.c[1] + this.target.height / 2;
				if(cx > ecx && cy > ecy){
					this.vx = Math.cos(angle) * -this.speed;
					this.vy = Math.sin(angle) * -this.speed;
				}else if(cx < ecx && cy > ecy){
					this.vx = Math.cos(angle) * this.speed;
					this.vy = Math.sin(angle) * -this.speed;
				}else if(cx < ecx && cy < ecy){
					this.vx = Math.cos(angle) * this.speed;
					this.vy = Math.sin(angle) * this.speed;
				}else if(cx > ecx && cy < ecy){
					this.vx = Math.cos(angle) * -this.speed;
					this.vy = Math.sin(angle) * this.speed;
				}	
			}
		}
	}

	window.Bullet = Bullet;
	window.Missle = Missle;
})();