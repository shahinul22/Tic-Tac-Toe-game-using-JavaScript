const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(event) {
  const cellIndex = event.target.getAttribute('data-index');

  if (boardState[cellIndex] !== '' || !gameActive) {
    return;
  }

  updateCell(event.target, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
  } else if (!boardState.includes('')) {
    statusText.textContent = 'Draw!';
    gameActive = false;
  } else {
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
  currentPlayer = 'X';
  boardState = ['', '', '', '', '', '', '', '', ''];
  statusText.textContent = "Player X's Turn";
  cells.forEach(cell => {
    cell.textContent = '';
  });
  gameActive = true;
}
