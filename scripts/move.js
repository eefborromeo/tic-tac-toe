import { boxes, x, o, board, statusEl, state, questionDiv } from './variables.js';
import { checkWin } from './win.js';
import { addScore } from './score.js';
import { counter, previous, updatePrevious, showHistory, resetCounter } from './history.js'

const playerChoice = document.querySelectorAll('[data-player-name]');
export const moveHistory = document.querySelector('#moves > ol');

let literalMoves = [
    ['top left', 'top center', 'top right'],
    ['center left', 'center center', 'center right'],
    ['bottom left', 'bottom center', 'bottom right'],
]

export let currentPlayer;

export let moves = [];

export let presentMove;

export function toggleCurrentPlayer() {
    currentPlayer = currentPlayer === x.name ? o.name : x.name;
    statusEl.textContent = `${currentPlayer}'s turn`;
    return currentPlayer;
}

export function updateMove(val) {
    moves = val;
}

export function showBoard() {
    boxes.forEach(box => {
        box.textContent = board[box.dataset.boardIndex][box.dataset.index];
        if (box.textContent !== '') {
            box.textContent === x.name ? box.classList.add('x') : box.classList.add('o');
            box.disabled = true;
        } else if (box.textContent === '') {
            box.classList.remove('x'); 
            box.classList.remove('o');
        }
    })
}

function addMove() {
    board[this.dataset.boardIndex][this.dataset.index] = currentPlayer;
    this.disabled = true;
    if (moves.length > 0) {
        const present = state.present.pop();
        console.log('add move', present);
        state.past.unshift(JSON.parse(JSON.stringify(present)));
    }
    moves.unshift(JSON.parse(JSON.stringify(board)));
    state.present.push(JSON.parse(JSON.stringify(moves[0])));
    // state.present = moves[counter];
    // state.past.unshift(JSON.parse(JSON.stringify(state.present)));
    // state.past.unshift(JSON.parse(JSON.stringify(board)));
    // state.past = moves.slice();
    // state.present = state.past.shift();
    // add move to history
    const li = document.createElement('li');
    li.textContent = `${currentPlayer} played ${literalMoves[this.dataset.boardIndex][this.dataset.index]}`
    moveHistory.appendChild(li);
    toggleCurrentPlayer();
    checkWin();
    addScore();
    showBoard();
    // console.log('board', board);
    // console.log('moves', moves);
    // console.log('moves', moves)
    // console.log('state', state)
}

function addCurrentPlayer() {
    boxes.forEach(button => button.disabled = false)
    currentPlayer = this.dataset.playerName
    questionDiv.classList.add('hide');
    statusEl.classList.remove('hide');
    statusEl.textContent = `${currentPlayer}'s turn`;
}

// EVENTS

playerChoice.forEach(player => {
    player.addEventListener('click', addCurrentPlayer)
})

export function addChars() {
    boxes.forEach(box => {
        box.addEventListener('click', addMove);
    })
}