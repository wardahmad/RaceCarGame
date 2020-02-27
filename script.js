const speedDash = document.querySelector(".speedDash");
const scoreDash = document.querySelector(".scoreDash");
const lifeDash = document.querySelector(".lifeDash");
const container = document.getElementById("container");
const btnStart = document.querySelector(".btnStart");

btnStart.addEventListener("click", startGame);
document.addEventListener("keydown", pressKeyOn);
document.addEventListener("keyup", pressKeyOff);

//Game Variable
//let animationGame = requestAnimationFrame(playGame);
let animationGame;
let gamePlay = false;
let player;
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

function startGame() {
  console.log(gamePlay);
  btnStart.style.display = "none";
  var div = document.createElement("div");
  div.setAttribute("class", "playerCar");
  div.x = 250;
  div.y = 500;
  container.appendChild(div);
  gamePlay = true;
  animationGame = requestAnimationFrame(playGame);
  player = {
    speed: 1,
    lives: 3,
    gameScore: 0,
    carstoPass: 10,
    score: 0,
    roadwidth: 250
  };
  startBoard();
}

function startBoard(){
  for (let x = 0; x < 13; x++){
    let div = document.createElement('div');
    div.setAttribute('class','road');
    div.style.top = (x*50)+'px';
    div.style.width = player.roadwidth + 'px';
    container.appendChild(div);
  }
}

function pressKeyOn() {}

function pressKeyOff() {}

function updateDash() {
  console.log(player);
  scoreDash.innerHTML = player.score;
  lifeDash.innerHTML = player.lives;
  speedDash.innerHTML = player.speed;
}

function playGame() {
  if (gamePlay) {
    //console.log("Game in play");
    updateDash();
  }
  animationGame = requestAnimationFrame(playGame);
}
