import { boxes, x, o, board, statusEl, questionDiv } from './variables.js';
import { checkHorizontalWin, checkVerticalWin, checkDiagonalWin, checkWin } from './win.js';
import { addScore } from './score.js';
import { showHistory } from './history.js'

const playerChoice = document.querySelectorAll('[data-player-name]');

export let currentPlayer;

export let moves = [];

export function toggleCurrentPlayer() {
    return currentPlayer = currentPlayer === x.name ? o.name : x.name;
}

function addMove() {
    currentPlayer === x.name ? 
    (this.textContent = x.name, this.classList.add('x'), board[this.dataset.boardIndex][this.dataset.index] = currentPlayer) : 
    (this.textContent = o.name, this.classList.add('o'), board[this.dataset.boardIndex][this.dataset.index] = currentPlayer);
    toggleCurrentPlayer();
    statusEl.textContent = `${currentPlayer}'s turn`;
    this.disabled = true;
    checkHorizontalWin();
    checkVerticalWin();
    checkDiagonalWin();
    checkWin();
    addScore();
    showHistory();
    moves.push(JSON.parse(JSON.stringify(board)))
}

function addCurrentPlayer() {
    boxes.forEach(button => button.disabled = false)
    currentPlayer = this.dataset.playerName
    questionDiv.classList.add('hide');
    statusEl.classList.remove('hide');
    statusEl.textContent = `${currentPlayer}'s turn`;
}

playerChoice.forEach(player => {
    player.addEventListener('click', addCurrentPlayer)
})

export function addChars() {
    boxes.forEach(box => {
        box.addEventListener('click', addMove);
    })
}