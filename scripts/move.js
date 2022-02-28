import { boxes, x, o, board, statusEl } from './variables.js';
import { checkHorizontalWin, checkVerticalWin, checkDiagonalWin, checkWin } from './win.js'

let currentPlayer = x;

function addMove() {
    currentPlayer = currentPlayer === x ? o : x;
    board[this.dataset.boardIndex].splice(this.dataset.index, 1, currentPlayer);
    currentPlayer === x ? this.classList.add('x') : this.classList.add('o');
    this.textContent = board[this.dataset.boardIndex][this.dataset.index];
    this.disabled = true;
    statusEl.textContent = `${currentPlayer === x ? o : x}'s turn`;
    checkHorizontalWin();
    checkVerticalWin();
    checkDiagonalWin();
    checkWin();
}

export function addChars() {
    boxes.forEach(box => {
        box.addEventListener('click', addMove);
    })
}