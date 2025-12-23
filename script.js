console.log("Tic Tac Toe Loaded");

const ting = new Audio("ting.mp3");
const winSound = new Audio("music.mp3");

let turn = "X";
let gameOver = false;

const info = document.querySelector(".info");
const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset");
const gif = document.querySelector(".gifBox img");

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function changeTurn(){
  return turn === "X" ? "O" : "X";
}

function drawWinningLine(a, b, c){
  const board = document.getElementById("board");
  const line = document.getElementById("line");

  const rect1 = boxes[a].getBoundingClientRect();
  const rect3 = boxes[c].getBoundingClientRect();
  const boardRect = board.getBoundingClientRect();

  const x1 = rect1.left + rect1.width/2 - boardRect.left;
  const y1 = rect1.top + rect1.height/2 - boardRect.top;
  const x2 = rect3.left + rect3.width/2 - boardRect.left;
  const y2 = rect3.top + rect3.height/2 - boardRect.top;

  const length = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

  line.style.width = `${length}px`;
  line.style.left = `${x1}px`;
  line.style.top = `${y1}px`;
  line.style.transform = `rotate(${angle}deg)`;
  line.style.display = "block";
}

function checkWin(){
  const texts = document.querySelectorAll(".boxtext");

  winPatterns.forEach(pattern => {
    const [a,b,c] = pattern;

    if(
      texts[a].innerText &&
      texts[a].innerText === texts[b].innerText &&
      texts[a].innerText === texts[c].innerText
    ){
      info.innerText = `${texts[a].innerText} Won`;
      gameOver = true;

      winSound.currentTime = 0;
      winSound.play();

      gif.style.display = "block";
      drawWinningLine(a,b,c);
    }
  });
}

boxes.forEach(box => {
  box.addEventListener("click", () => {
    const text = box.querySelector(".boxtext");
    if(text.innerText === "" && !gameOver){
      text.innerText = turn;
      ting.play();
      checkWin();
      if(!gameOver){
        turn = changeTurn();
        info.innerText = `Turn for ${turn}`;
      }
    }
  });
});

resetBtn.addEventListener("click", () => {
  document.querySelectorAll(".boxtext").forEach(t => t.innerText = "");
  turn = "X";
  gameOver = false;
  info.innerText = "Turn for X";

  document.getElementById("line").style.display = "none";
  gif.style.display = "none";

  winSound.pause();
  winSound.currentTime = 0;
});
