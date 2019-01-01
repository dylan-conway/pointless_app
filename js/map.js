(function(){
	function GameMap(){
		this.drawX;
		this.drawY;
		this.camX;
		this.camY;
		this.camWidth;
		this.camHeight;
		this.cc = [];
		this.width = 1920 * 2;
		this.height = 1080 * 2;
		this.sprite = new Image();
	}

	GameMap.prototype = {
		draw: function(){
			this.sprite.onload = drawSprite(this.sprite, this.drawX - this.camX, this.drawY - this.camY);
			this.sprite.src = 'images/rewoven4.png';
		},

		moveUp: function(speed){
			this.drawY -= speed;
			this.cc[1] += speed;
		},

		moveRight: function(speed){
			this.drawX += speed;
			this.cc[0] -= speed;
		},

		moveDown: function(speed){
			this.drawY += speed;
			this.cc[1] -= speed;
		},

		moveLeft: function(speed){
			this.drawX -= speed;
			this.cc[0] += speed;
		}
	}

	window.GameMap = GameMap;
})();