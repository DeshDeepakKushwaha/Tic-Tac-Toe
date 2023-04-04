const X_CLASS = "x";
let O_CLASS = "o";
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageText = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessageElement = document.getElementById("winning-message");
const restartBtn = document.getElementById("restartButton");
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let oTurn;

restartBtn.addEventListener("click", startGame);

function startGame() {
  oTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });

  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

startGame();

function handleClick(e) {
  //Place Mark
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;

  placeMark(cell, currentClass);

  //Check For Win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    //Switch Turns
    swapTurns();

    setBoardHoverClass();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapTurns() {
  oTurn = !oTurn;
}
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);

  if (oTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}
function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = "Game Has Been Draw";
  } else {
    winningMessageText.innerText = `${oTurn ? "O" : "X"} Has Won 🏆!`;
  }
  winningMessageElement.classList.add("show");
}
function checkWin(currentClass) {
  return WINNING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
