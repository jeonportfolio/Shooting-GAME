
//캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);

let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameOverImage;
let gameOver=false; //true이면 게임이 끝남 
let score=0;


//우주선 좌표
let spaceshipX = canvas.width/2-30;
let spaceshipY = canvas.height-60;

let bulletList = [];// 총알 저장 배열


function Bullet() {
    this.x=0;
    this.y=0;
    this.alive=true; //ture면 총알이 보임 
    this.init=function(){
        this.x = spaceshipX + 8.5;
        this.y = spaceshipY;
        
        bulletList.push(this);
    };

    this.update = function(){
        this.y -= 7;
    };

    this.checkHit = function(){
        
        for(let i = 0; i < enemyList.length; i++){
            if (this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x + 64) {
                score++;
                this.alive = false;
                enemyList.splice(i, 1);
            }
        }
    };
}

function generateRamdomValue(min,max){
    let randomNum = Math.floor(Math.random()*(max-min+1))+min;
    return randomNum;

}

let enemyList = [];

function Enemy (){
    this.x = 0;
    this.y = 20;
    this.init = function(){
        this.y = 20
        this.x = generateRamdomValue(0,canvas.width-62) //캔버스 넓이에서 우주선 가로길이 뺀다.
        enemyList.push(this)
    };
    this.update=function(){
        this.y += 5

        if(this.y >= canvas.height - 62){
            gameOver = true;
            console.log("게임오바")
        } 
    }
}

function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src="images/background.png";

    spaceshipImage = new Image();
    spaceshipImage.src="images/spaceship.png";

    bulletImage = new Image();
    bulletImage.src="images/bullet.png";

    enemyImage = new Image();
    enemyImage.src="images/enemy.png";

    gameOverImage = new Image();
    gameOverImage.src="images/gameover.png";

}


// 키보드의 입출력 값 변경 
let keysDown = {};

//키를 눌렀을때 
function setupKeyboardListener (){
    document.addEventListener("keydown", function(event){
        keysDown[event.keyCode] = true;
       
    });
//키를 안눌렀을때
    document.addEventListener("keyup", function(event){
        delete keysDown[event.keyCode];
       
        if(event.keyCode == 32) {
            createBullet();
        }
    });
}

// 총알 생성
function createBullet() {
    let b = new Bullet();
    b.init();
    console.log("총알리스트", bulletList)
}

// 적군 생성
function createEnemy() {
    const interval = setInterval(function(){
        let e = new Enemy();
        e.init();
    },600)
}




//우주선의 위치 변경 

function update() {
    //오른쪽 
    if(39 in keysDown){
        spaceshipX +=5;
    }

    //왼쪽
    if(37 in keysDown){
        spaceshipX -=5;
    }

    if(spaceshipX <= 0){
        spaceshipX=0;
    }
    if(spaceshipX >= canvas.width - 60){
        spaceshipX= canvas.width -60;
    }

    //총알의 y좌표 업데이트 

    for(let i=0;i<bulletList.length;i++){
         if(bulletList[i].alive){
            bulletList[i].update();
            bulletList[i].checkHit();
         }   
            
    }   
      

    //적군 위치 변경 
    for(let i=0; i<enemyList.length; i++){
        enemyList[i].update();
    }
}


function render() {
    ctx.drawImage(backgroundImage, 0, 0,canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY);
    ctx.fillText(`score:${score}`,20,20);
    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    
    //살아있는 총알만 보여주기
    for(let i=0; i< bulletList.length;i++){
        if(bulletList[i].alive){
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
        }
        
    }

    for(let i=0; i< enemyList.length;i++){
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
    }
}

function main() {
    if(!gameOver){
        update();
        render();
        requestAnimationFrame(main);
    }else{
        ctx.drawImage(gameOverImage,10,100, 380, 380);
    }
}

loadImage();
setupKeyboardListener();
createEnemy();
main();

