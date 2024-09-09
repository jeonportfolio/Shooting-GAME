
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

function setupKeyboardListener (){
    document.addEventListener("keydown", function(event){
        keysDown[event.keyCode] = true;
        console.log("키다운 객체",keysDown);
    });

    document.addEventListener("keyup", function(event){
        delete keysDown[event.keyCode]
        console.log("버튼 클릭후", keysDown);
    })
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
}


function render() {
    ctx.drawImage(backgroundImage, 0, 0,canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY)
}

function main() {
    update();
    render();
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();