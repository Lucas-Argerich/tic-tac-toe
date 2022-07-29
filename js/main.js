const cells = [false, false, false, false, false, false, false, false, false];
const cell = document.querySelectorAll(".cell");

let playerOne = "Lucas";
let playerOneImage = "<img src='./assets/cross.svg' />";
let playerOneScore = 0;

let playerTwo = "Computer";
let playerTwoImage = "<img src='./assets/circle.svg' />";
let playerTwoScore = 0;

let activePlayer = playerOne;

let gameFinished = false;

function changeActivePlayer() {
  if (activePlayer === playerOne) {
    activePlayer = playerTwo;
  } else {
    activePlayer = playerOne;
  }
}

function updatePlayerNames() {
  document.getElementById("playerOne").innerHTML = playerOne;
  document.getElementById("playerTwo").innerHTML = playerTwo;
}

function changePlayerNames() {
  playerOne = prompt("Player One Name:");
  playerTwo = prompt("Player Two Name:");
  updatePlayerNames();
}

function checkCell(index) {
  if (!gameFinished && !cells[index]) {
    cells[index] = activePlayer;
    document
      .getElementById(`cell${index + 1}`)
      .getElementsByClassName("cellContent")[0].innerHTML =
      activePlayer === playerOne ? playerOneImage : playerTwoImage;
    checkWin();
    changeActivePlayer();
  }
}

function updateScore() {
  document.getElementById("playerOneScore").innerHTML = playerOneScore;
  document.getElementById("playerTwoScore").innerHTML = playerTwoScore;
}

function restartScore() {
  playerOneScore = 0;
  playerTwoScore = 0;
  updateScore();
}

function onWin() {
  if (activePlayer === playerOne) {
    playerOneScore++;
  } else {
    playerTwoScore++;
  } 
  updateScore();
  document.getElementById("resultMessage").innerHTML = `${activePlayer} wins!`;
  document.getElementById("resultMessage").style.transform = "scale(1)";
  gameFinished = true;
}

function onDraw() {
  document.getElementById("resultMessage").innerHTML = "Draw!";
  document.getElementById("resultMessage").style.transform = "scale(1)";
  gameFinished = true;
}

function checkWin() {
  if (
    (cells[0] === cells[1] && cells[1] === cells[2] && cells[0] !== false) ||
    (cells[3] === cells[4] && cells[4] === cells[5] && cells[3] !== false) ||
    (cells[6] === cells[7] && cells[7] === cells[8] && cells[6] !== false) ||
    (cells[0] === cells[3] && cells[3] === cells[6] && cells[0] !== false) ||
    (cells[1] === cells[4] && cells[4] === cells[7] && cells[1] !== false) ||
    (cells[2] === cells[5] && cells[5] === cells[8] && cells[2] !== false) ||
    (cells[0] === cells[4] && cells[4] === cells[8] && cells[0] !== false) ||
    (cells[2] === cells[4] && cells[4] === cells[6] && cells[2] !== false)
  ) {
    onWin();
  } else if (cells.every((cell) => cell)) {
  }
}

function restartGame() {
  cells.fill(false);
  cell.forEach(function (cell) {
    cell.getElementsByClassName("cellContent")[0].innerHTML = "";
  });
  gameFinished = false;
  document.getElementById("resultMessage").style.transform = "scale(0)";

}

cell.forEach(function (cell) {
  cell.addEventListener("click", function (e) {
    const index = e.target.id[4] - 1;
    checkCell(index);
  });
});

updatePlayerNames();
document.getElementById("restartGame").addEventListener("click", restartGame);
document.getElementById("restartScore").addEventListener("click", restartScore);
document.getElementById("changePlayerNames").addEventListener("click", changePlayerNames);
