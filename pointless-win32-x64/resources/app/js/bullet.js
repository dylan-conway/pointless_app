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
		// this.speed = 5;
		this.speed = 10;
		this.width = 10;
		this.height = 10;
		this.damage = 10;
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
					game.objects.addParticle(new BulletParticle(this.drawX, this.drawY, this.c[0], this.c[1], 'slateblue'));
					game.objects.addParticle(new BulletParticle(this.drawX, this.drawY, this.c[0], this.c[1], 'slateblue'))
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

			this.drawX = (this.playerDrawX + game.player.width / 3) + (this.vx * 1);
			this.drawY = (this.playerDrawY + game.player.height / 3) + (this.vy * 1);

			this.c[0] = (this.playerMapX + game.player.width / 3) + (this.vx * 1);
			this.c[1] = (this.playerMapY + game.player.height / 3) + (this.vy * 1);

			this.originX = this.drawX += this.vx;
			this.originY = this.drawY += this.vy;
		},

		delete: function(self){
			let index = game.objects.bullets.indexOf(self);
			game.objects.bullets.splice(index, 1);
		}
	}

	window.Bullet = Bullet;
})();