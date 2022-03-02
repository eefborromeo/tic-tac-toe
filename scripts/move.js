import { boxes, x, o, board, statusEl } from './variables.js';
import { checkHorizontalWin, checkVerticalWin, checkDiagonalWin, checkWin } from './win.js';
import { addScore } from './score.js';
import { showHistory } from './history.js'

export let currentPlayer = x;

export let moves = [];

export function toggleCurrentPlayer() {
    return currentPlayer = currentPlayer === x.name ? o.name : x.name;
}

function addMove() {
    toggleCurrentPlayer();

    currentPlayer === x.name ? 
        (this.textContent = x.name, this.classList.add('x'), board[this.dataset.boardIndex][this.dataset.index] = currentPlayer) : 
        (this.textContent = o.name, this.classList.add('o'), board[this.dataset.boardIndex][this.dataset.index] = currentPlayer);

    this.disabled = true;
    statusEl.textContent = `${currentPlayer === x.name ? o.name : x.name}'s turn`;
    checkHorizontalWin();
    checkVerticalWin();
    checkDiagonalWin();
    checkWin();
    addScore();
    showHistory();
    moves.push(JSON.parse(JSON.stringify(board)))
}

export function addChars() {
    boxes.forEach(box => {
        box.addEventListener('click', addMove);
    })
}