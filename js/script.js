var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

var cw = canvas.width;
var ch = canvas.height;

var ballSize = 20; // wielkość naszej piłki
let ballX = cw / 2 - ballSize / 2 //od 490 do 510px
let ballY = ch / 2 - ballSize / 2 // od 240 do 260px

//Rakietki
var paddelHeight = 100;
var paddelWidth = 20;

var playerX = 70;
var aiX = 910;

let playerY = 200;
let aiY = 200;

var lineWidth = 6;
var lineHeight = 16;

let ballSpeedX = 2;
let ballSpeedY = 2; 

function ai() {
      ctx.fillStyle = '#7FFF00'; //kolor
      ctx.fillRect(aiX, aiY, paddelWidth, paddelHeight); 
}

function player() {
      ctx.fillStyle = 'yellow'; //kolor
      ctx.fillRect(playerX, playerY, paddelWidth, paddelHeight); 
}

function ball() {

	ctx.fillStyle = '#fff';
	ctx.fillRect(ballX, ballY, ballSize, ballSize);

	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if (ballY <= 0 || ballY + ballSize >= ch) {
		ballSpeedY = -ballSpeedY;
		speedUp();
	}

	if (ballX <=0 || ballX + ballSize >= cw)
		ballSpeedX = -ballSpeedX;
}

function table() {
	//Stół
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, cw, ch);
	//Linie na środku
	for (let linePosition = 20; linePosition < ch; linePosition += 30) {
		ctx.fillStyle = "gray"
		ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight)
	}
}

topCanvas = canvas.offsetTop;
console.log(topCanvas)

function playerPosition(e) {
	//console.log("pozycja myszy to " + (e.clientY - topCanvas))
	playerY = e.clientY - topCanvas - paddelHeight / 2;

	if (playerY >= ch - paddelHeight) {
		playerY = ch - paddelHeight
	}
	//gdy rakietka wjedzie poza canvas
	if (playerY <= 0) {
		playerY = 0;
	}

	//aiY = playerY;
}

function speedUp() {
	//console.log(ballSpeedX + ", " + ballSpeedY);
	// Prędkość X
	if (ballSpeedX > 0 && ballSpeedX < 16) {
		ballSpeedX += .4;
	}
	else if (ballSpeedX < 0 && ballSpeedX < -16) {
		ballSpeedX -= .4;
	}
	// Prędkość Y
	if (ballSpeedY > 0 && ballSpeedY < 16) {
		ballSpeedY += .3;
	}
	else if (ballSpeedY < 0 && ballSpeedY < -16) {
		ballSpeedY -= .3;
	}
}

//SZTUCZNA INTELIGENCJA
function aiPosition() {

	var middlePaddel = aiY + paddelHeight / 2;
	var middleBall = ballY + ballSize / 2;

	if (ballX > 500) {
		if (middlePaddel - middleBall > 200) {
			//console.log(">+200");
			aiY -= 24;
		}
		else if (middlePaddel - middleBall > 50) {
			//console.log("+50-200");
			aiY -= 10;
		}
		else if (middlePaddel - middleBall < - 200) {
			//console.log("<-200");
			aiY += 24;
		}
		else if (middlePaddel - middleBall < -50) {
			//console.log("+50-(200)");
			aiY += 10;
		}
	}

	else if (ballX <= 500 && ballX > 150) {

		if (middlePaddel - middleBall > 100) {
			aiY -= 3
		}

		else if (middlePaddel - middleBall < -100) {
			aiY +=3
		}
	}
}


canvas.addEventListener("mousemove", playerPosition)

function game() {

	table()
	ball()
	player()
	ai()
	aiPosition()

}

setInterval(game, 1000 / 60)