(function(){
	function Objects(){
		this.bullets = [];
		this.enemies = [];
		this.particles = [];
		this.walls = [];
	}

	Objects.prototype = {
		addBullet: function(bullet){
			this.bullets.push(bullet);
		},

		addEnemy: function(enemy){
			this.enemies.push(enemy);
		},

		addParticle: function(particle){
			this.particles.push(particle);
		},

		addWall: function(wall){
			this.walls.push(wall);
		},

		draw: function(){
			for(let wall of this.walls){
				wall.draw();
			}
			for(let enemy of this.enemies){
				enemy.draw();
			}
			for(let bullet of this.bullets){
				bullet.draw();
			}
			for(let particle of this.particles){
				particle.draw();
			}
		},

		checkVisibility: function(){
			for(let wall of this.walls){
				wall.checkVisibility();
			}
			for(let enemy of this.enemies){
				enemy.checkVisibility();
			}
			for(let bullet of this.bullets){
				bullet.checkVisibility();
			}
			for(let particle of this.particles){
				particle.checkVisibility();
			}
		},

		collisionDetection: function(){
			for(let bullet of this.bullets){
				for(let enemy of this.enemies){
					if(!bullet.used && !enemy.dead){
						if(bullet.c[0] + bullet.width > enemy.c[0] && bullet.c[0] < enemy.c[0] + enemy.width &&
						   bullet.c[1] + bullet.height > enemy.c[1] && bullet.c[1] < enemy.c[1] + enemy.height){
							enemy.takeDamage(bullet.damage);
							bullet.used = true;
							game.player.lastHitEnemy = enemy;
						    let x = bullet.drawX;
						    let y = bullet.drawY;
						    let c0 = bullet.c[0];
						    let c1 = bullet.c[1];
						    for(let i = 0; i < 5; i ++){
						    	this.addParticle(new Particle(x, y, c0, c1, 'red'));
						    	// this.addParticle(new Particle(x, y, c0, c1, 'orange'));
						    }
						}
					}
				}
			}
		},

		moveUp: function(speed){
			for(let wall of this.walls){
				wall.drawY -= speed;
			}
			for(let i = 0; i < this.bullets.length; i ++){
				this.bullets[i].drawY -= speed;
			}
			for(let i = 0; i < this.enemies.length; i ++){
				this.enemies[i].drawY -= speed;
			}
			for(let i = 0; i < this.particles.length; i ++){
				this.particles[i].drawY -= speed;
			}
		},

		moveRight: function(speed){
			for (let wall of this.walls){
				wall.drawX += speed;
			}
			for(let i = 0; i < this.bullets.length; i ++){
				this.bullets[i].drawX += speed;
			}
			for(let i = 0; i < this.enemies.length; i ++){
				this.enemies[i].drawX += speed;
			}
			for(let i = 0; i < this.particles.length; i ++){
				this.particles[i].drawX += speed;
			}
		},

		moveDown: function(speed){
			for(let wall of this.walls){
				wall.drawY += speed;
			}
			for(let i = 0; i < this.bullets.length; i ++){
				this.bullets[i].drawY += speed;
			}
			for(let i = 0; i < this.enemies.length; i ++){
				this.enemies[i].drawY += speed;
			}
			for(let i = 0; i < this.particles.length; i ++){
				this.particles[i].drawY += speed;
			}
		},

		moveLeft: function(speed){
			for(let wall of this.walls){
				wall.drawX -= speed;
			}
			for(let i = 0; i < this.bullets.length; i ++){
				this.bullets[i].drawX -= speed;
			}
			for(let i = 0; i < this.enemies.length; i ++){
				this.enemies[i].drawX -= speed;
			}
			for(let i = 0; i < this.particles.length; i ++){
				this.particles[i].drawX -= speed;
			}
		}
	}

	window.Objects = Objects;
})();