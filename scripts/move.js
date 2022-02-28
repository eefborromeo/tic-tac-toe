import { boxes, x, o, board, statusEl } from './variables.js';
import { checkHorizontalWin, checkVerticalWin, checkDiagonalWin, checkWin } from './win.js';
import { addScore } from './score.js'

let currentPlayer = x;

function addMove() {
    currentPlayer = currentPlayer === x.name ? o.name : x.name;
    board[this.dataset.boardIndex].splice(this.dataset.index, 1, currentPlayer);
    currentPlayer === x.name ? this.classList.add('x') : this.classList.add('o');
    this.textContent = board[this.dataset.boardIndex][this.dataset.index];
    this.disabled = true;
    statusEl.textContent = `${currentPlayer === x.name ? o.name : x.name}'s turn`;
    checkHorizontalWin();
    checkVerticalWin();
    checkDiagonalWin();
    checkWin();
    addScore();
}

export function addChars() {
    boxes.forEach(box => {
        box.addEventListener('click', addMove);
    })
}