(function(){
	function Cursor(){
		this.drawX = mouse.x;
		this.drawY = mouse.y;
		this.width = 24;
		this.height = 24;
		this.sprite = new Image();
	}

	Cursor.prototype = {
		draw: function(){
			this.update();

			this.sprite.onload = drawSprite(this.sprite, this.drawX - (this.width / 2), this.drawY - (this.height / 2));
			this.sprite.src = 'images/cursor.png';
		},

		update: function(){
			this.drawX = mouse.x;
			this.drawY = mouse.y;
			// if(game.state === 'main'){
			// 	game.moveRight(mouse.vx / 10);
			// 	game.moveDown(mouse.vy / 10);	
			// }
		}
	}

	window.Cursor = Cursor;
})();