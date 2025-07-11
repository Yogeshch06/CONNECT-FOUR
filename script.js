const ROWS = 6;
const COLS = 7;
let currentPlayer = 'red';
let board = [];

const boardEl = document.getElementById('board');
const messageEl = document.getElementById('message');

function createBoard() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  boardEl.innerHTML = '';
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener('click', handleClick);
      boardEl.appendChild(cell);
    }
  }
}

function handleClick(e) {
  const col = +e.target.dataset.col;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (!board[r][col]) {
      board[r][col] = currentPlayer;
      const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${col}"]`);
      cell.classList.add(currentPlayer);
      if (checkWin(r, col)) {
        messageEl.textContent = `${currentPlayer.toUpperCase()} wins!`;
        boardEl.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleClick));
      } else {
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
      }
      break;
    }
  }
}

function checkWin(row, col) {
  const directions = [
    [[0, 1], [0, -1]],   // horizontal
    [[1, 0], [-1, 0]],   // vertical
    [[1, 1], [-1, -1]],  // diagonal \
    [[1, -1], [-1, 1]]   // diagonal /
  ];
  return directions.some(direction => {
    let count = 1;
    for (const [dr, dc] of direction) {
      let r = row + dr;
      let c = col + dc;
      while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
        count++;
        r += dr;
        c += dc;
      }
    }
    return count >= 4;
  });
}

createBoard();
