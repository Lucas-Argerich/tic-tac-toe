let deployedMenu = true;

const cells = [false, false, false, false, false, false, false, false, false];
const cell = document.querySelectorAll(".cell");

let playerOne = "Player 1";
let playerOneImage = "<img src='./assets/cross.svg' />";
let playerOneScore = 0;

let playerTwo = "Player 2";
let playerTwoImage = "<img src='./assets/circle.svg' />";
let playerTwoScore = 0;

let activePlayer = undefined;

let gameFinished = false;

function toggleMenu() {
  document.getElementById("menu").style.transform = deployedMenu
    ? "translateY(-150%)"
    : "translateY(0)";
  let img = document.createElement("img");
  img.src = "./assets/wave.svg";
  img.id = "wave";
  deployedMenu
    ? document.getElementById("menu").appendChild(img)
    : document
        .getElementById("menu")
        .removeChild(document.getElementById("menu").lastChild);

  deployedMenu = !deployedMenu;
}

function updatePlayerNames() {
  document.getElementById("playerOne").innerHTML = playerOne;
  document.getElementById("playerTwo").innerHTML = playerTwo;
}

function changePlayerNames() {
  playerOne = document.getElementById("playerOneInput").value || "Player 1";
  playerTwo = document.getElementById("playerTwoInput").value || "Player 2";
}

function changeActivePlayer() {
  if (activePlayer === playerOne) {
    activePlayer = playerTwo;
  } else {
    activePlayer = playerOne;
  }
  document.getElementById("playerTurn").innerHTML = activePlayer;
}

function checkCell(index) {
  if (!gameFinished && typeof cells[index] === "boolean") {
    cells[index] = activePlayer;
    document
      .getElementById(`cell${index + 1}`)
      .getElementsByClassName("cellContent")[0].innerHTML =
      activePlayer === playerOne ? playerOneImage : playerTwoImage;
    checkWin();
    !gameFinished && changeActivePlayer();
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
  document.getElementById("resultMessageContainer").style.transform =
    "scale(1)";
  gameFinished = true;
  document.getElementById("playAgain").classList.add("active");
}

function onDraw() {
  document.getElementById("resultMessage").innerHTML = "Draw!";
  document.getElementById("resultMessageContainer").style.transform =
    "scale(1)";
  gameFinished = true;
  document.getElementById("playAgain").classList.add("active");
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
    onDraw();
  }
}

function initializeGame() {
  activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  document.getElementById("playerTurn").innerHTML = activePlayer;
  gameFinished = false;

  cells.fill(false);
  cell.forEach(function (cell) {
    cell.getElementsByClassName("cellContent")[0].innerHTML = "";
  });
  document.getElementById("resultMessageContainer").style.transform =
    "scale(0)";
  document.getElementById("playAgain").classList.remove("active");

  cell.forEach(function (cell) {
    cell.addEventListener("click", function (e) {
      const index = e.target.id[4] - 1;
      checkCell(index);
    });
  });
}

document.getElementById("start-button").addEventListener("click", () => {
  changePlayerNames();
  updatePlayerNames();
  restartScore();
  initializeGame();
  toggleMenu();
});
document.getElementById("restartScore").addEventListener("click", restartScore);
document.getElementById("playAgain").addEventListener("click", initializeGame);
document.getElementById("backToMenu").addEventListener("click", toggleMenu);
