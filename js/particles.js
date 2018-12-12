(function(){
	function Particle(drawX, drawY, c0, c1, color){
		this.drawX = drawX;
		this.drawY = drawY;
		this.c = [c0, c1];
		this.width = 8;
		this.height = 8;
		this.vx = getRandomNum(-2, 2);
		this.vy = getRandomNum(-2, 2);
		this.color = color;
		this.visible = true;
	}

	Particle.prototype = {
		draw: function(){
			this.update();

			if(this.visible){
				c.ctx.fillStyle = this.color;
			    c.ctx.fillRect(this.drawX, this.drawY, this.width, this.height);	
			}
		},

		update: function(){
			this.width -= .2;
			this.height -= .2;
			this.drawX += .1;
			this.drawY += .1;
			this.c[0] += .1;
			this.c[1] += .1;
			if(this.width <= 0 || this.height <= 0){
				this.delete(this);
			}
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

		delete: function(self){
			let index = game.objects.particles.indexOf(self);
			game.objects.particles.splice(index, 1);
		}
	}

	function BulletParticle(drawX, drawY, c0, c1, color){
		this.drawX = drawX;
		this.drawY = drawY;
		this.c = [c0, c1];
		this.color = color;
		this.width = 6;
		this.height = 6;
		this.vx = getRandomNum(-1, .5);
		this.vy = getRandomNum(-1, .5);
		this.deleteCounter = getRandomInt(25, 100);
		this.counter = 0;
		this.visible = true;
	}

	BulletParticle.prototype = {
		draw: function(){
			this.update();
			if(this.visible){
				c.ctx.fillStyle = this.color;
				c.ctx.fillRect(this.drawX, this.drawY, this.width, this.height);
			}
		},

		update: function(){
			this.width -= .1;
			this.height -= .1;
			this.drawX -= .05;
			this.drawY -= .05;
			this.c[0] -= .05;
			this.c[1] -= .05;
			if(this.width <= 0 || this.height <= 0){
				this.delete(this);
			}
			this.drawX += this.vx;
			this.drawY += this.vy;
			this.c[0] += this.vx;
			this.c[1] + this.vy;
			// this.counter ++;
			// if(this.counter === this.deleteCounter){
			// 	this.delete(this);
			// }
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

		delete: function(self){
			let index = game.objects.particles.indexOf(self);
			game.objects.particles.splice(index, 1);
		}
	}

	window.Particle = Particle;
	window.BulletParticle = BulletParticle;
})();