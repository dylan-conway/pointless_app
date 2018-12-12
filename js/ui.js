(function(){
	function UI(){
		// this.healthBar = new HealthBar();
		this.gunBar = new GunBar();
		// this.statsBar = new StatsBar();
		this.scoreBar = new ScoreBar();
		this.numberImage = new Image();
		this.minimap = new Minimap();
	}

	UI.prototype = {
		draw: function(){
			// this.healthBar.draw();
			// this.gunBar.draw();
			// this.statsBar.draw();

			c.ctx.fillStyle = 'black';
			c.ctx.fillRect(14, 14, 204, 2);
			c.ctx.fillRect(14, 16, 2, 16);
			c.ctx.fillRect(14, 32, 204, 2);
			c.ctx.fillRect(216, 16, 2, 16);

			c.ctx.fillStyle = 'rgba(255, 255, 255, .5)';
			c.ctx.fillRect(16, 16, 200, 16);
			c.ctx.fillStyle = 'red';
			c.ctx.fillRect(16, 16, game.player.health / game.player.maxHealth * 200, 16);

			this.numberImage.onload = this.scoreBar.draw();
			this.numberImage.src = 'images/number.png';

			this.minimap.draw();

			this.gunBar.draw();
		}
	}

	function ScoreBar(){
		this.score;
		this.scoreString;
		this.slots = [];
	}

	ScoreBar.prototype = {
		draw: function(){
			this.update();

			for(let slot of this.slots){
				slot.draw();
			}
		},

		update: function(){
			this.slots = [];
			this.score = game.killCount;
			this.scoreString = this.score.toString();
			for(let i = 0; i < this.scoreString.length; i ++){
				this.slots.push(new ScoreBarSlot(i, this.scoreString[i]));
			}
		}
	}

	function ScoreBarSlot(drawX, sx){
		this.drawX = drawX;
		this.sx = parseInt(sx);
	}

	ScoreBarSlot.prototype = {
		draw: function(){
			drawAnimationSprite(game.ui.numberImage, this.sx * 64, 0, 64, 64, 16 + (this.drawX * 32), 32, 64, 64);
		}
	}

	function Minimap(){
		this.drawX = Math.floor(innerWidth - (256));
		this.drawY = 16;
		this.width = 240;
		this.height = 135;
	}

	Minimap.prototype = {
		draw: function(){
			c.ctx.fillStyle = 'rgba(255, 255, 255, .5)';
			c.ctx.fillRect(this.drawX, this.drawY, this.width, this.height);
			c.ctx.fillStyle = 'black';
			c.ctx.fillRect(this.drawX - 2, this.drawY - 2, this.width + 4, 2);
			c.ctx.fillRect(this.drawX - 2, this.drawY, 2, this.height);
			c.ctx.fillRect(this.drawX - 2, this.drawY + this.height, this.width + 4, 2);
			c.ctx.fillRect(this.drawX + this.width, this.drawY, 2, this.height);

			this.drawMapMarkers();
		},

		drawMapMarkers: function(){
			for(let enemy of game.objects.enemies){
				if(!enemy.dead){
					let x = Math.floor((enemy.c[0] / game.map.width) * this.width) + 1;
					let y = Math.floor((enemy.c[1] / game.map.height) * this.height) + 1;

					c.ctx.fillStyle = 'black';
					c.ctx.fillRect(this.drawX + x, this.drawY + y, 2, 2);	
				}
			}

			let x = Math.floor((game.player.c[0] / game.map.width) * this.width) + 1;
			let y = Math.floor((game.player.c[1] / game.map.height) * this.height) + 1;
			c.ctx.fillStyle = 'red';
			c.ctx.fillRect(this.drawX + x - 2, this.drawY + y - 2, 4, 4);
		},
	}

	function GunBar(){
		this.icon = new Image();
		this.drawX = Math.floor(innerWidth - 116);
		this.drawY = Math.floor(innerHeight - 48);
		this.width = 100;
		this.height = 32;
	}

	GunBar.prototype = {
		draw: function(){
			// c.ctx.fillStyle = 'rgba(255, 255, 255, .5)';
			// c.ctx.fillRect(this.drawX, this.drawY, this.width, this.height);
			this.icon.onload = drawSprite(this.icon, this.drawX - 40, this.drawY);
			this.icon.src = 'images/bulletIcon.png';
			c.ctx.fillStyle = 'black';
			c.ctx.fillRect(this.drawX - 2, this.drawY - 2, this.width + 4, 2);
			c.ctx.fillRect(this.drawX - 2, this.drawY, 2, this.height);
			c.ctx.fillRect(this.drawX - 2, this.drawY + this.height, this.width + 4, 2);
			c.ctx.fillRect(this.drawX + this.width, this.drawY, 2, this.height);

			let width = (game.player.shootTimeCounter / game.player.shootRate) * this.width;
			c.ctx.fillStyle = 'rgba(255, 255, 255, .5)';
			c.ctx.fillRect(this.drawX, this.drawY, width, this.height);
		}
	}

	window.UI = UI;
	window.ScoreBar = ScoreBar;
	window.ScoreBarSlot = ScoreBarSlot;
	window.Minimap = Minimap;
	window.GunBar = GunBar;
})();