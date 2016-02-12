var bulletsArr = [];

var enemyArr = [];

var score = 0;
var life = 3;

function Hero() {
    this.x = 0;
    this.y = 0;
}

function Enemy() {
    this.x = 1000;
    this.y = getRandomInt(10, 400);
}

function Bullet(){
	this.x = 0;
	this.y = 0;;    
}


setInterval(function(){ 
    var asd = new Enemy;
    asd.x
    asd.y
    enemyArr.push(new Enemy);
 }, 800);



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//image
var imageRepository = new function() {
	// Define images
	this.background = new Image();
	this.hero = new Image();
	this.bullets = new Image();
	this.enemy = new Image();

	// Set images src
	this.background.src = "img/background.png";
	this.hero.src = "img/bird-normal.png";
	this.bullets.src = "img/bullet.png";
	this.enemy.src="img/enemy.png";
}

var x = 0;
var bgCanvas = document.getElementById('background');
var rightKey, leftKey, downKey, upKey;

var heroX = 0;
var heroY = bgCanvas.height / 2;

function animate() {
	requestAnimFrame( animate );

// backg
	
	bgCanvas.getContext('2d').clearRect(0, 0, bgCanvas.width, bgCanvas.height);

//backg move

	x -= 1;
	if(x < -bgCanvas.width)
		x = 0;

		bgCanvas.getContext('2d').drawImage(imageRepository.background, x, 0, bgCanvas.width, bgCanvas.height);
		bgCanvas.getContext('2d').drawImage(imageRepository.background, x + bgCanvas.width, 0, bgCanvas.width, bgCanvas.height);

//hero
	bgCanvas.getContext('2d').drawImage(imageRepository.hero, heroX , heroY ,bgCanvas.width / 10,bgCanvas.height / 10);

//enemy
    for (var i = 0; i < enemyArr.length; i++) {
        bgCanvas.getContext('2d').drawImage(imageRepository.enemy , enemyArr[i].x, enemyArr[i].y , bgCanvas.width / 15 , bgCanvas.height / 6 );
        enemyArr[i].x -= 5;
    };

// bullets fire
	for (var i = 0; i < bulletsArr.length; i++) {
		bgCanvas.getContext('2d').drawImage(imageRepository.bullets , bulletsArr[i].x , bulletsArr[i].y , bgCanvas.width / 50 , bgCanvas.height / 50);
		bulletsArr[i].x += 5;
	};
    
// hero move
	if (rightKey && heroX + 136 < 1000) heroX += 7;
	else if (leftKey && heroX > 0) heroX -= 7;
	if (upKey && heroY > 0) heroY -= 7;
	else if (downKey && heroY + 93 < 500) heroY += 7;
    
// enemy die
	
    for (var i = 0; i < bulletsArr.length; i++) {
        for (var j = 0; j < enemyArr.length; j++) {
            var bullet = bulletsArr[i];
            var enemy = enemyArr[j];
            if (bullet.x > enemy.x && bullet.x < enemy.x + 47 && bullet.y > enemy.y && bullet.y < enemy.y + 59) {
                enemyArr.splice(j, 1);
				j--;
                bulletsArr.splice(i, 1);
                i--;
                
                score += 10;
                break;
            }
        }
    }
    
    for (var i = 0 ; i < enemyArr.length; i++) {
        if (enemyArr[i].x < 0) {
            enemyArr.splice(i, 1);
            i--;
            score -= 20;
            life -= 1;
        }
    }
     
//score	 
    document.querySelector('#score span').innerText = score;
//life
    document.querySelector('#life span').innerText = life;
};

function keyDown(e) {
	if (e.keyCode == 39) rightKey = true;
	else if (e.keyCode == 37) leftKey = true;
	if (e.keyCode == 38) upKey = true;
	else if (e.keyCode == 40) downKey = true;
}

function keyUp(e) {
	if (e.keyCode == 39) rightKey = false;
	else if (e.keyCode == 37) leftKey = false;
	if (e.keyCode == 38) upKey = false;
	else if (e.keyCode == 40) downKey = false;
    if (e.keyCode == 32) {
		var bullet = new Bullet();
		bullet.x = heroX + bgCanvas.width / 10 ;
		bullet.y = heroY + (bgCanvas.height / 10)/2;
		bulletsArr.push(bullet);
	};
}

document.addEventListener('keydown', keyDown, false);
document.addEventListener('keyup', keyUp, false);

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function( callback, element){
				window.setTimeout(callback, 1000 / 60);
			};
})();