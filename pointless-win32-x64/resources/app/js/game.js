
let c = {canvas: undefined, ctx: undefined};
let mouse = {x: undefined, y: undefined, vx: undefined, vy: undefined};
let game, cursor;

const times = [];
let fps = 0;

function refreshLoop(){
	window.requestAnimationFrame(() => {
		const now = performance.now();
		while(times.length > 0 && times[0] <= now - 1000){
			times.shift();
		}
		times.push(now);
		fps = times.length;
		refreshLoop();
	});
}

window.onload = () => {
	c.canvas = document.getElementById('canvas');
	c.ctx = c.canvas.getContext('2d');

	c.canvas.width = innerWidth;
	c.canvas.height = innerHeight;

	c.ctx.fillStyle = 'black';
	c.ctx.fillRect(30, 30, 30, 30);

	game = new Game();
	cursor = new Cursor();

	window.addEventListener('keydown', function(event){Key.onKeyDown(event);}, false);
	window.addEventListener('keyup', function(event){Key.onKeyUp(event);}, false);
	window.addEventListener('mousemove', function(e){
		if(game.state === 'mainmenu'){
			if(mouse.x == undefined && mouse.y == undefined){
				mouse.x = e.x;
				mouse.y = e.y;
			}else{
				mouse.vx = e.x - mouse.x;
				mouse.vy = e.y - mouse.y;
				mouse.x = e.x;
				mouse.y = e.y;
			}
		}else if(game.state === 'main'){
			if(mouse.x == undefined && mouse.y == undefined){
				mouse.x = e.x;
				mouse.y = e.y;
			}else{
				mouse.vx = e.x - mouse.x;
				mouse.vy = e.y - mouse.y;
				mouse.x = e.x;
				mouse.y = e.y;
			}
			game.player.checkDirection(mouse.x, mouse.y);
			// if(mouse.vx > 0){
			// 	game.moveLeft(-mouse.vx / 9);
			// 	game.player.drawX += -mouse.vx / 9;
			// 	game.player.c[0] += -mouse.vx / 9;
			// }else if(mouse.vx < 0){
			// 	game.moveRight(mouse.vx / 9);
			// 	game.player.drawX += -mouse.vx / 9;
			// 	game.player.c[0] += -mouse.vx / 9;
			// }
			// if(mouse.vy > 0){
			// 	game.moveUp(-mouse.vy / 7);
			// 	game.player.drawY += -mouse.vy / 7;
			// 	game.player.c[1] += -mouse.vy / 7;
			// }else if(mouse.vy < 0){
			// 	game.moveDown(mouse.vy / 7);
			// 	game.player.drawY += -mouse.vy / 7;
			// 	game.player.c[1] += -mouse.vy / 7;
			// }

			// if(mouse.vx > 0){
			// 	game.moveLeft(-mouse.vx / 2);
			// 	game.player.drawX += -mouse.vx / 2;
			// 	game.player.c[0] += -mouse.vx / 2;
			// }else if(mouse.vx < 0){
			// 	game.moveRight(mouse.vx / 2);
			// 	game.player.drawX += -mouse.vx / 2;
			// 	game.player.c[0] += -mouse.vx / 2;
			// }
			// if(mouse.vy > 0){
			// 	game.moveUp(-mouse.vy / 2);
			// 	game.player.drawY += -mouse.vy / 2;
			// 	game.player.c[1] += -mouse.vy / 2;
			// }else if(mouse.vy < 0){
			// 	game.moveDown(mouse.vy / 2);
			// 	game.player.drawY += -mouse.vy / 2;
			// 	game.player.c[1] += -mouse.vy / 2;
			// }
		}else if(game.state === 'end'){
			if(mouse.x == undefined && mouse.y == undefined){
				mouse.x = e.x;
				mouse.y = e.y;
			}else{
				mouse.vx = e.x - mouse.x;
				mouse.vy = e.y - mouse.y;
				mouse.x = e.x;
				mouse.y = e.y;
			}
		}
	});
	window.addEventListener('click', function(){
		if(game.state === 'main'){
			game.player.shoot(mouse.x, mouse.y);
		}
	});

	gameLoop();
}

function gameLoop(){
	loop(gameLoop);
	c.ctx.clearRect(0, 0, c.canvas.width, c.canvas.height);

	c.ctx.fillStyle = 'black';
	c.ctx.fillRect(innerWidth / 2, 0, 1, innerHeight);
	c.ctx.fillRect(0, innerHeight / 2, innerWidth, 1);

	// refreshLoop();

	game.draw();
	cursor.draw();

	// c.ctx.fillText(fps, 10, 100);
}

function Game(){
	this.mainmenu;

	this.map;
	this.player;
	this.objects;
	this.ui;
	this.killCount = 0;

	this.endmenu
	this.state = 'mainmenu';
}

Game.prototype = {
	draw: function(){
		if(this.state === 'main'){
			this.update();

			this.objects.collisionDetection();
			this.objects.checkVisibility();

			this.map.draw();
			this.player.draw();
			this.objects.draw();
			this.ui.draw();

			if(Key.isDown(Key.ONE)){console.log(game.ui);};
		}else if(this.state === 'mainmenu'){
			c.ctx.font = 'bold 50px serif';
			c.ctx.fillText('press enter to start', 10, c.canvas.height / 3);

			if(Key.isDown(Key.ENTER)){this.startGame();};
		}else if(this.state === 'end'){
			c.ctx.fillStyle = 'red';
			c.ctx.fillRect(0, 0, innerWidth, innerHeight);

			if(Key.isDown(Key.ENTER)){this.startGame();};
		}
	},

	startGame: function(){
		game.state = 'main';

		this.ui = new UI();

		this.killCount = 0;
		
		this.map = new GameMap();
		this.map.drawX = 0;
		this.map.drawY = 0;
		this.map.camX = Math.floor((this.map.width / 2) - (innerWidth / 2));
		this.map.camY = Math.floor((this.map.height / 2) - (innerHeight / 2));
		this.map.cc[0] = this.map.camX;
		this.map.cc[1] = this.map.camY;
		this.map.camWidth = innerWidth;
		this.map.camHeight = innerHeight;

		this.player = new Player();
		this.player.drawX = Math.floor((innerWidth / 2) - (this.player.width / 2));
		this.player.drawY = Math.floor((innerHeight / 2) - (this.player.height / 2));
		this.player.c[0] = Math.floor((this.map.width / 2) - (this.player.width / 2));
		this.player.c[1] = Math.floor((this.map.height / 2) - (this.player.height / 2));

		this.objects = new Objects();
		for(let i = 0; i < 120; i ++){
			this.objects.addEnemy(new BadSlime(getRandomInt(1, game.map.width - 33), getRandomInt(1, game.map.height - 33), 1));
		}
		for(let i = 0; i < 60; i ++){
			this.objects.addEnemy(new BadSlime(getRandomInt(1, game.map.width - 33), getRandomInt(1, game.map.height - 33), 2));
		}
		for(let i = 0; i < 20; i ++){
			this.objects.addEnemy(new BadSlime(getRandomInt(1, game.map.width - 33), getRandomInt(1, game.map.height - 33), 3));
		}
		for(let i = 0; i < 20; i ++){
			this.objects.addEnemy(new BadSlime(getRandomInt(1, game.map.width - 33), getRandomInt(1, game.map.height - 33), 4));
		}

		this.objects.addWall(new Wall(1600, 0, 10, 2000, 'red'));
	},

	endGame: function(){
		this.state = 'end';
	},

	update: function(){
		if(Key.isDown(Key.UP)){
				this.moveUp(this.player.speed);
			}
			if(Key.isDown(Key.RIGHT)){
				this.moveRight(this.player.speed);
			}
			if(Key.isDown(Key.DOWN)){
				this.moveDown(this.player.speed);
			}
			if(Key.isDown(Key.LEFT)){
				this.moveLeft(this.player.speed);
			}
	},

	moveUp: function(speed){
		this.player.c[1] -= speed;
		// if(this.player.c[1] > this.map.height - (innerHeight / 2) || this.player.c[1] < (innerHeight / 2) - 40){
		// 	this.player.moveUp(speed);
		// }else{
		// 	this.map.moveUp(-speed);
		// 	this.objects.moveUp(-speed);	
		// }

		this.player.moveUp(speed);
		this.map.moveUp(-speed);
		this.objects.moveUp(-speed);
	},

	moveRight: function(speed){
		this.player.c[0] += speed;
		// if(this.player.c[0] > this.map.width - (innerWidth / 2) || this.player.c[0] < (innerWidth / 2) - 40){
		// 	this.player.moveRight(speed);
		// }else{
		// 	this.map.moveRight(-speed);
		// 	this.objects.moveRight(-speed);
		// }

		this.player.moveRight(speed);
		this.map.moveRight(-speed);
		this.objects.moveRight(-speed);
	},

	moveDown: function(speed){
		this.player.c[1] += speed;
		// if(this.player.c[1] > this.map.height - (innerHeight / 2) || this.player.c[1] < (innerHeight / 2) - 40){
		// 	this.player.moveDown(speed);
		// }else{
		// 	this.map.moveDown(-speed);
		// 	this.objects.moveDown(-speed);			
		// }

		this.player.moveDown(speed);
		this.map.moveDown(-speed);
		this.objects.moveDown(-speed);
	},

	moveLeft: function(speed){
		this.player.c[0] -= speed;
		// if(this.player.c[0] > this.map.width - (innerWidth / 2) || this.player.c[0] < (innerWidth / 2) - 40){
		// 	this.player.moveLeft(speed);
		// }else{
		// 	this.map.moveLeft(-speed);
		// 	this.objects.moveLeft(-speed);
		// }
		
		this.player.moveLeft(speed);
		this.map.moveLeft(-speed);
		this.objects.moveLeft(-speed);
	}
}

let loop =(function(){
	return window.requestAnimationFrame       ||
		   window.webkitRequestAnimationFrame ||
		   window.mozRequestAnimationFrame    ||
		   window.oRequestAnimationFrame      ||
		   window.msRequestAnimationFrame     ||
		   function(callback){
		       window.setTimeout(callback, 1000 / 60);
		   };
})();

function drawSprite (sprite, x, y) {
	c.ctx.drawImage(sprite, x, y);
}

function drawAnimationSprite (sprite, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
	c.ctx.drawImage(sprite, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandNegToPos(num){
	let rando = Math.random() * num + 1;
	rando *= (Math.random() * 2) == 1 ? 1 : -1;
	return rando;
}

function getRandomNum(min, max){
	return (Math.random() * (max - min + 1) + min);
}

/////// INPUT
let Key = {
	_pressed: {},
	ENTER: 13,
	UP: 87,
	RIGHT: 68,
	DOWN: 83,
	LEFT: 65,
	ONE: 49,

	isDown: function(keyCode){
		return this._pressed[keyCode];
	},

	onKeyDown: function(e){
		this._pressed[e.keyCode] = true;
	},

	onKeyUp: function(e){
		delete this._pressed[e.keyCode];
	}
}
