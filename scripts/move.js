import { boxes, boxesArr, x, o, board, statusEl } from './variables.js';
import { checkHorizontalWin, checkVerticalWin, checkDiagonalWin, checkWin } from './win.js';
import { addScore } from './score.js';
import { showHistory } from './history.js'

export let currentPlayer = x;

let moves = [];

export function toggleCurrentPlayer() {
    return currentPlayer = currentPlayer === x.name ? o.name : x.name;
}

function addMove() {
    toggleCurrentPlayer();
    board[this.dataset.boardIndex].splice(this.dataset.index, 1, currentPlayer);

    currentPlayer === x.name ? 
        (this.textContent = x.name, this.classList.add('x')) : 
        (this.textContent = o.name, this.classList.add('o'));

    this.disabled = true;
    statusEl.textContent = `${currentPlayer === x.name ? o.name : x.name}'s turn`;
    checkHorizontalWin();
    checkVerticalWin();
    checkDiagonalWin();
    checkWin();
    addScore();
    showHistory();
}

export function addChars() {
    boxes.forEach(box => {
        box.addEventListener('click', addMove);
    })
}