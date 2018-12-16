
let c = {canvas: undefined, ctx: undefined};
let mouse = {x: undefined, y: undefined, vx: undefined, vy: undefined};
let game, cursor;

window.onload = () => {
	c.canvas = document.getElementById('canvas');
	c.ctx = c.canvas.getContext('2d');

	let dpr = window.devicePixelRatio || 1;
	// let rect = c.canvas.getBoundingClientRect();

	// c.canvas.style.width = window.innerWidth;
	// c.canvas.style.height = window.innerHeight;
	let w = 1920;
	let h = 1080;
	window.innerWidth = w;
	window.innerHeight = h;
	// console.log(w, h, innerWidth, innerHeight, dpr);
	c.canvas.width = w * dpr / 2;
	c.canvas.height = h * dpr / 2;
	c.canvas.style.width = w + 'px';
	c.canvas.style.height = h + 'px';
	
	// c.ctx.scale(dpr, dpr);

	
	// c.canvas.width = innerWidth;
	// c.canvas.height = innerHeight;

	c.ctx.fillStyle = 'black';
	c.ctx.fillRect(30, 30, 30, 30);

	game = new Game();
	cursor = new Cursor();

	window.addEventListener('keydown', function(event){Key.onKeyDown(event);}, false);
	window.addEventListener('keyup', function(event){Key.onKeyUp(event);}, false);
	window.addEventListener('mousemove', function(e){
		if(game.state === 'mainmenu'){
			if(mouse.x == undefined && mouse.y == undefined){
				mouse.x = e.x * 1.25;
				mouse.y = e.y * 1.25;
			}else{
				mouse.vx = e.x * 1.25 - mouse.x;
				mouse.vy = e.y * 1.25 - mouse.y;
				mouse.x = e.x * 1.25;
				mouse.y = e.y * 1.25;
			}
		}else if(game.state === 'main'){
			if(mouse.x == undefined && mouse.y == undefined){
				mouse.x = e.x * 1.25;
				mouse.y = e.y * 1.25;
			}else{
				mouse.vx = e.x * 1.25 - mouse.x;
				mouse.vy = e.y * 1.25 - mouse.y;
				mouse.x = e.x * 1.25;
				mouse.y = e.y * 1.25;
			}
			game.player.checkDirection(mouse.x, mouse.y);
		}else if(game.state === 'end'){
			if(mouse.x == undefined && mouse.y == undefined){
				mouse.x = e.x * 1.25;
				mouse.y = e.y * 1.25;
			}else{
				mouse.vx = e.x * 1.25 - mouse.x;
				mouse.vy = e.y * 1.25 - mouse.y;
				mouse.x = e.x * 1.25;
				mouse.y = e.y * 1.25;
			}
		}
	});
	window.addEventListener('mouseup', function(event){
		if(event.button === 0){
			if(game.state === 'main'){
				game.player.shoot('bullet', mouse.x, mouse.y);
			}else if(game.state === 'mainmenu'){
				if(mouse.x > 269 && mouse.x < 1446 && mouse.y > 214 && mouse.y < 448){
					game.startGame();
				}
			}else if(game.state === 'end'){
				if(mouse.x >= 0 && mouse.x < 50 && mouse.y >= 0 && mouse.y < 50){
					game.startGame();
				}
			}
		}else if(event.button === 2){
			if(game.state === 'main'){
				game.player.shoot('missle', mouse.x, mouse.y);
			}
		}
		
	});


	gameLoop();
}

function gameLoop(){
	loop(gameLoop);
	c.ctx.clearRect(0, 0, c.canvas.width, c.canvas.height);

	game.draw();
	cursor.draw();
}

function Game(){
	this.mainmenuImage = new Image();

	this.map;
	this.player;
	this.objects;
	this.ui;
	this.killCount;

	this.endmenuImage = new Image();


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

			if(this.player.dead){
				this.endGame();
			}

			if(Key.isDown(Key.ONE)){console.log(innerWidth, innerHeight);};
		}else if(this.state === 'mainmenu'){
			// c.ctx.font = 'bold 50px serif';
			// c.ctx.fillText('press enter to start', 10, c.canvas.height / 3);

			this.mainmenuImage.onload = drawSprite(this.mainmenuImage, 0, 0);
			this.mainmenuImage.src = 'images/mainmenuimage2.png'
		}else if(this.state === 'end'){
			c.ctx.fillStyle = 'red';
			c.ctx.fillRect(0, 0, 50, 50);

			this.endmenuImage.onload = drawSprite(this.endmenuImage, 0, 0);
			this.endmenuImage.src = 'images/endmenuimage.png';
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
		for(let i = 0; i < 50; i ++){
			this.objects.addEnemy(new BadSlime(getRandomInt(1, game.map.width - 17), getRandomInt(1, 400), 1));
			this.objects.addEnemy(new BadSlime(getRandomInt(1, game.map.width - 17), getRandomInt(game.map.height - 400, game.map.height - 17), 1));
		}
		for(let i = 0; i < 50; i ++){
			this.objects.addEnemy(new BadSlime(getRandomInt(1, game.map.width - 33), getRandomInt(1, game.map.height - 33), 2));
		}
		for(let i = 0; i < 50; i ++){
			this.objects.addEnemy(new BadSlime(getRandomInt(1, game.map.width - 33), getRandomInt(1, game.map.height - 33), 3));
		}
		for(let i = 0; i < 10; i ++){
			this.objects.addEnemy(new BadSlime(getRandomInt(1, game.map.width - 65), getRandomInt(1, game.map.height - 65), 4));
		}
		for(let i = 0; i < 2; i ++){
			this.objects.addEnemy(new BadSlime(getRandomInt(1, game.map.width - 129), getRandomInt(1, game.map.height - 129), 5));
		}
		for(let i = 0; i < 10; i ++){
			this.objects.addFriend(new GoodSlime(getRandomInt(1, game.map.width - 33), getRandomInt(1, game.map.height - 33), 1));
		}

		// this.objects.addWall(new Wall(1600, 0, 10, 2000, 'red'));
	},

	endGame: function(){
		this.state = 'end';
		this.objects = undefined;
		this.player = undefined;
		this.ui = undefined;
		this.map = undefined;
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

		this.player.moveUp(speed);
		this.map.moveUp(-speed);
		this.objects.moveUp(-speed);
	},

	moveRight: function(speed){
		this.player.c[0] += speed;

		this.player.moveRight(speed);
		this.map.moveRight(-speed);
		this.objects.moveRight(-speed);
	},

	moveDown: function(speed){
		this.player.c[1] += speed;

		this.player.moveDown(speed);
		this.map.moveDown(-speed);
		this.objects.moveDown(-speed);
	},

	moveLeft: function(speed){
		this.player.c[0] -= speed;
		
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
	SPACE: 32,
	ESC: 27,

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
