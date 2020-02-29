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
//console.log(keys.ArrowUp);

function startGame() {
  //console.log(gamePlay);
  btnStart.style.display = "none";
  var div = document.createElement("div");
  div.setAttribute("class", "playerCar");
  div.x = 250;
  div.y = 500; 
  container.appendChild(div);
  gamePlay = true;
  animationGame = requestAnimationFrame(playGame);
  player = {
    ele: div,
    speed: 9,
    lives: 3,
    gameScore: 0,
    carstoPass: 10,
    score: 0,
    roadwidth: 250
  };
  startBoard();
  setupBadGuys(10);
}

function setupBadGuys(num){
  for (let x = 0; x < num; x++){
    let temp = 'badGuy'+(x+1);
    let div = document.createElement('div');
    div.innerHTML = (x+1);
    div.setAttribute('class','baddy');
    div.setAttribute('id',temp);
    div.style.backgroundColor = randomColor();
    makeBad(div);
    container.appendChild(div);
  }
}

function randomColor(){
  function c(){
    let hex = Math.floor(Math.random()*256).toString(16);
    return ('0'+String(hex)).substr(-2);
  }
  return '#'+c()+c()+c();
}

function makeBad(e){
  let tempRoad = document.querySelector('.road');
  e.style.left = tempRoad.offsetLeft + Math.ceil(Math.random()*tempRoad.offsetWidth)-30+'px';
  e.style.top = Math.ceil(Math.random()* -400)+'px';
  e.speed = Math.ceil(Math.random()*17)+2;
}

function startBoard() {
  for (let x = 0; x < 13; x++) {
    let div = document.createElement("div");
    div.setAttribute("class", "road");
    div.style.top = (x * 50) + "px";
    div.style.width = player.roadwidth + "px";
    container.appendChild(div);
  }
}

function pressKeyOn(event) {
  event.preventDefault();
  //console.log(event.key)
  //console.log(keys);
  keys[event.key] = true; // === keys[ArrowUp]|| keys[ArrowDown]|| keys[ArrowLeft]|| keys[ArrowRight]
}

function pressKeyOff(event) {
  event.preventDefault();
  //console.log(keys);
  keys[event.key] = false;
  //console.log(keys)
}

function updateDash() {
  //console.log(player);
  scoreDash.innerHTML = player.score;
  lifeDash.innerHTML = player.lives;
  speedDash.innerHTML = Math.round(player.speed * 13);
}

function moveRoad() {
  let tempRoad = document.querySelectorAll(".road");
  //console.log(tempRoad);
  let previousRoad = tempRoad[0].offsetLeft; //returns the left position (in pixels) relative to the left side the offsetParent element
  //console.log("previous Road "+previousRoad)

  let previousWidth = tempRoad[0].offsetWidth; // returns the viewable width
  //console.log("previous Width"+previousWidth)

  const pSpeed = Math.floor(player.speed);
  //tempRoad.length === 13
  for (let x = 0; x < tempRoad.length; x++) {
    let num = tempRoad[x].offsetTop + pSpeed;
    //console.log(num)
    if (num > 600) {
      num = num - 650;
      let mover = previousRoad + (Math.floor(Math.random() * 6) - 3);
      let roadWidth = (Math.floor(Math.random() * 11) - 5) + previousWidth;
      if (roadWidth < 200) roadWidth = 200;
      if (roadWidth > 400) roadWidth = 400;
      if (mover < 100) mover = 100;
      if (mover > 600) mover = 600;
      tempRoad[x].style.left = mover + "px";
      tempRoad[x].style.width = roadWidth + "px";
      previousRoad = tempRoad[x].offsetLeft;
      previousWidth = tempRoad[x].width;
    }
    tempRoad[x].style.top = num + "px";
  }
  return {
    'width': previousWidth,
    'left': previousRoad
  };
}

function playGame() {
  if (gamePlay) {
    //console.log("Game in play");
    updateDash();

    ///Movement
    //moveRoad();
    let roadPara = moveRoad();
    //console.log(roadPara);
    //console.log(player.ele.y)
    //console.log(player.ele.x)
    if (keys.ArrowUp) {
      //console.log(player.ele.x);
      if (player.ele.y > 400) player.ele.y -= 1;
      player.speed = player.speed < 20 ? (player.speed + 0.05) : 20;

    }
    if (keys.ArrowDown) {
      if (player.ele.y < 500) {
        player.ele.y += 1;
      }
      player.speed = player.speed > 0 ? (player.speed - 0.2) : 0;
    }
    if (keys.ArrowRight) {
      player.ele.x += (player.speed / 4);
      //console.log(player.ele.x)
    }
    if (keys.ArrowLeft) {
      player.ele.x -= (player.speed / 4);
    }

    //check if on road
    if ((player.ele.x + 40) < roadPara.left || (player.ele.x > (roadPara.left + roadPara.width))){
      if (player.ele.y < 500) {player.ele.y += +1;}
      player.speed = player.speed > 0 ? (player.speed-0.2): 1;
      console.log('OFF Road')
    }
    ///move car
    player.ele.style.top = player.ele.y + "px";
    player.ele.style.left = player.ele.x + "px";
  }
  animationGame = requestAnimationFrame(playGame);
}
