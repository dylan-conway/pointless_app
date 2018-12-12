(function(){
	function Wall(c0, c1, width, height, color){
		this.c = [c0, c1];
		this.width = width;
		this.height = height;
		this.color = color;

		this.drawX;
		this.drawY;
		this.init();
	}

	Wall.prototype = {
		init: function(){
			this.drawX = game.player.drawX + (this.c[0] - game.player.c[0]);
			this.drawY = game.player.drawY + (this.c[1] - game.player.c[1]);
		},

		draw: function(){
			c.ctx.fillStyle = this.color;
			c.ctx.fillRect(this.drawX, this.drawY, this.width, this.height);
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
		}
	}

	window.Wall = Wall;
})();