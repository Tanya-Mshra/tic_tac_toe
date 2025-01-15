// Load sound files
const clickSound = new Audio("click-234708.mp3");
const winSound = new Audio("win-176035.mp3");
const drawSound = new Audio("knife-draw-48223.mp3");
const restartSound = new Audio("game-start-6104.mp3");

const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("game-board");
const winnerMessage = document.getElementById("winner-message");
const winnerText = document.getElementById("winner-text");
const restartButton = document.getElementById("restart-button");

let currentPlayer = "X";
let gameActive = true;
const boardState = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (!gameActive || boardState[cellIndex]) return;

  // Play click sound
  clickSound.play();

  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWin(currentPlayer)) {
    // Play win sound
    winSound.play();
    endGame(`${currentPlayer} wins!`);
  } else if (boardState.every(cell => cell)) {
    // Play draw sound
    drawSound.play();
    endGame("It's a draw!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWin(player) {
  return winningCombinations.some(combination =>
    combination.every(index => boardState[index] === player)
  );
}

function endGame(message) {
  gameActive = false;
  winnerText.textContent = message;
  winnerMessage.classList.remove("hide");
}

function restartGame() {
  // Play restart sound
  restartSound.play();

  currentPlayer = "X";
  gameActive = true;
  boardState.fill(null);

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });

  winnerMessage.classList.add("hide");
}

// Event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
