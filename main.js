
//캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);

let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameOverImage;

//우주선 좌표
let spaceshipX = canvas.width/2-30
let spaceshipY = canvas.height-60

let bulletList = [];// 총알 저장 배열

function Bullet() {
    this.x=0;
    this.y=0;
    this.init=function(){
        this.x = spaceshipX + 8.5;
        this.y = spaceshipY;
        
        bulletList.push(this);
    };

    this.update = function(){
        this.y -= 7;
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
        bulletList[i].update();
    }
}


function render() {
    ctx.drawImage(backgroundImage, 0, 0,canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY);
    
    for(let i=0; i< bulletList.length;i++){
        ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
}

function main() {
    update();
    render();
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();

