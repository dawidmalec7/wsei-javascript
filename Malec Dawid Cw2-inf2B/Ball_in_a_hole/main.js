//Pobranie obiektów z planszy
let ball   = document.querySelector('.ball');
let checkpoint = document.querySelector('.checkpoint');
let holes = document.querySelectorAll('.hole');
let container = document.querySelector('.container');
let start = document.querySelector('.start');
let info = document.querySelector('.info');

let isLose = false;

let maxX = container.clientWidth  - ball.clientWidth;
let maxY = container.clientHeight - ball.clientHeight;

// Listener
window.addEventListener('deviceorientation', game);

//Mechanika gry
function game(e) {
  let x = e.beta;  
  let y = e.gamma; 

  if (x >  90) x =  90
  if (x < -90) x = -90

  x += 90;
  y += 90;
  
  //Nadanie pozycji pilki
  ball.style.top  = (maxX*x/180 - 10) + "px";
  ball.style.left = (maxY*y/180 - 10) + "px";

  let ball_pos = {
    top: ball.offsetTop,
    left: ball.offsetLeft
  }
  let checkpoint_pos = {
    top: checkpoint.offsetTop,
    left: checkpoint.offsetLeft
  }

//Wygrana
  if (ball_pos.top > checkpoint_pos.top - 20 
      && ball_pos.top < checkpoint_pos.top + 20 
      && ball_pos.left > checkpoint_pos.left -20 
      && ball_pos.left < checkpoint_pos.left + 20 )
  {
    manageInfo("Wygrałeś!", "green", "visible");
    switchVisibility(false);
  }
  //Przegrana
  isLose = checkLose(ball_pos, holes);

  if(isLose)
  {
    manageInfo("Przegrałeś", "red", "visible");
    switchVisibility(false);
   
  }
};

/*
* Zarządza informacjami
*/
function manageInfo(text, bg, visible){
    info.innerHTML = text
    info.style.background = bg;
    info.style.visibility  = visible;
}

/*
* Zarządza wlasciwoscia visibility elementow
*/
function switchVisibility(isVisible){
  visible = isVisible ? 'visible' : 'hidden';
  ball.style.visibility  = visible;
  checkpoint.style.visibility  = visible;
  holes.forEach((hole) =>{
    hole.style.visibility = visible
  })
}
/* 
* Sprawdza czy przegrales
*/
function checkLose(ball, holes){
  for(let i = 0; i < holes.length; i++){
      let hole = {
        top: holes[i].offsetTop,
        left: holes[i].offsetLeft
      }
      if (  ball.top > hole.top - 20 
          && ball.top < hole.top + 20 
          && ball.left > hole.left - 20 
          && ball.left < hole.left + 20){
          return true;
          break;
     }
  }
  return false;
}

//Przycisk START
start.addEventListener('click', StartGame);

//Funkcja przycisku START
function StartGame() {
  ball.style.top  = (410) + "px";
  ball.style.left = (220) + "px";

  info.style.visibility  = "hidden";
  switchVisibility(true);
};
