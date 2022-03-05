import { boxes, x, o, tie, minusTie, board, statusEl, state, questionDiv, moveHistory } from './variables.js';
import { checkWin } from './win.js';
import { addScore, xScore, oScore, tieEl } from './score.js';
import { previousButton, nextButton, counter, previous, updatePrevious, showHistory, resetCounter } from './history.js'

const playerChoice = document.querySelectorAll('[data-player-name]');
const movesEl = document.querySelector('#moves');


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

function updateScore() {
    if (tie > 0) {
        minusTie(1);
        tieEl.forEach(p => p.textContent = tie);
    }
    if (x.score === 0) return;
    x.score = x.score - 1;
    xScore.textContent = x.score;
    if (o.score === 0) return;
    o.score = o.score - 1;
    oScore.textContent = o.score;
}


function addMove() {
    board[this.dataset.boardIndex][this.dataset.index] = currentPlayer;
    this.disabled = true;
    if (moves.length > 0) {
        const present = state.present.pop();
        state.past.unshift(JSON.parse(JSON.stringify(present)));
    }
    moves.unshift(JSON.parse(JSON.stringify(board)));
    state.present.push(JSON.parse(JSON.stringify(moves[0])));
    
    if (state.future.length > 0) {
        updateScore();
        for (let i = 0; i < counter; i++) {
            moveHistory.removeChild(moveHistory.lastChild)
        }
        resetCounter();
    }
    const li = document.createElement('li');
    li.textContent = `${currentPlayer} played ${literalMoves[this.dataset.boardIndex][this.dataset.index]}`
    moveHistory.appendChild(li);
    
    if (moves.length > 1) {
        previousButton.disabled = false;
    }
    
    state.future.length = 0;
    if (state.future.length === 0) {
        nextButton.disabled = true;
    }
    
    toggleCurrentPlayer();
    checkWin();
    addScore();
    showBoard();

    movesEl.classList.add('show');
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