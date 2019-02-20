//Pobranie obiektów z planszy
let ball   = document.querySelector('.ball');
let checkpoint = document.querySelector('.checkpoint');
let hole1 = document.querySelector('.hole1');
let hole2 = document.querySelector('.hole2');
let hole3 = document.querySelector('.hole3');
let container = document.querySelector('.container');
let start = document.querySelector('.start');
let info = document.querySelector('.info');

let maxX = container.clientWidth  - ball.clientWidth;
let maxY = container.clientHeight - ball.clientHeight;

//Funkcja mechaniki gry wywoływana gdy ruszamy urządzeniem
window.addEventListener('deviceorientation', DeviceOrientation);

//Funkcja mechaniki gry
function DeviceOrientation(event) {
  let x = event.beta;  
  let y = event.gamma; 

  if (x >  90) { 
      x =  90
    };
  if (x < -90) { 
      x = -90
    };

  x += 90;
  y += 90;
  
//Pozycja początkowa
  ball.style.top  = (maxX*x/180 - 10) + "px";
  ball.style.left = (maxY*y/180 - 10) + "px";

  checkpoint.style.top  = (10) + "px";
  checkpoint.style.left = (220) + "px";

  hole1.style.top  = (100) + "px";
  hole1.style.left = (220) + "px";

  hole2.style.top  = (200) + "px";
  hole2.style.left = (280) + "px";

  hole3.style.top  = (270) + "px";
  hole3.style.left = (150) + "px";
  
  let BallPositionTop = parseInt(ball.style.top);
  let BallPositionLeft = parseInt(ball.style.left);

  let CheckpointPositionTop = parseInt(checkpoint.style.top);
  let CheckpointPositionLeft = parseInt(checkpoint.style.left);
//Wygrana
  if (BallPositionTop > CheckpointPositionTop - 20 && BallPositionTop < CheckpointPositionTop + 20 && BallPositionLeft > CheckpointPositionLeft -20 && BallPositionLeft < CheckpointPositionLeft + 20 )
  {
    info.innerHTML = "Wygrałeś!"
    ball.style.visibility  = "hidden";
    info.style.background = "rgba(11, 160, 23, 0.507)";
    checkpoint.style.visibility  = "hidden";
    hole1.style.visibility  = "hidden";
    hole2.style.visibility  = "hidden";
    hole3.style.visibility  = "hidden";
    info.style.visibility  = "visible";
  }

  let Hole1PositionTop = parseInt(hole1.style.top);
  let Hole1PositionLeft = parseInt(hole1.style.left);
  let Hole2PositionTop = parseInt(hole2.style.top);
  let Hole2PositionLeft = parseInt(hole2.style.left);
  let Hole3PositionTop = parseInt(hole3.style.top);
  let Hole3PositionLeft = parseInt(hole3.style.left);
  //Przegrana
  if (BallPositionTop > Hole1PositionTop - 20 && BallPositionTop < Hole1PositionTop + 20 && BallPositionLeft > Hole1PositionLeft -20 && BallPositionLeft < Hole1PositionLeft + 20 || BallPositionTop > Hole2PositionTop - 20 && BallPositionTop < Hole2PositionTop + 20 && BallPositionLeft > Hole2PositionLeft -20 && BallPositionLeft < Hole2PositionLeft + 20 
  || BallPositionTop > Hole3PositionTop - 20 && BallPositionTop < Hole3PositionTop + 20 && BallPositionLeft > Hole3PositionLeft -20 && BallPositionLeft < Hole3PositionLeft + 20 )
  {
    info.innerHTML = "Przegrałeś!"
    info.style.background = "rgba(160, 11, 11, 0.507)"
    info.style.visibility  = "visible";
    ball.style.visibility  = "hidden";
    checkpoint.style.visibility  = "hidden";
    hole1.style.visibility  = "hidden";
    hole2.style.visibility  = "hidden";
    hole3.style.visibility  = "hidden";
  }
};

//Przycisk START
start.addEventListener('click', StartGame);

//Funkcja przycisku START
function StartGame() {
  ball.style.top  = (410) + "px";
  ball.style.left = (220) + "px";

  ball.style.visibility  = "visible";
  checkpoint.style.visibility  = "visible";
  hole1.style.visibility  = "visible";
  hole2.style.visibility  = "visible";
  hole3.style.visibility  = "visible";
  info.innerHTML = ""
  info.style.visibility  = "hidden";
};
