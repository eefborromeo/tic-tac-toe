import { boxes, boxesArr, board, questionDiv, x, o, statusEl, updateBoard, state, moveHistory } from "./variables.js";
import { checkHorizontalWin, checkVerticalWin, checkDiagonalWin, checkWin } from "./win.js";
import { moves, presentMove, updateMove,  currentPlayer, toggleCurrentPlayer, showBoard } from "./move.js";

const historyEl = document.querySelector('#history')
export const previousButton = document.querySelector('.previous');
export const nextButton = document.querySelector('.next');
const newGameButton = document.querySelector('.new-game');

export let counter = 0;
export let previous;

function newGame() {
    moves.length = 0;
    state.present.length = 0;
    state.past.length = 0;
    state.future.length = 0;
    boxes.forEach(box => {
        box.textContent = '';
        box.classList.remove('x', 'o');
    })
    board.forEach(row => row.fill(''))
    questionDiv.classList.remove('hide');
    statusEl.textContent = '';
    historyEl.classList.remove('show');
    previousButton.disabled = false;
    moveHistory.textContent = '';
}

function showButtons() {
    historyEl.classList.add('show')
    nextButton.disabled = true;
}

export function updatePrevious(val) {
    previous = val;
}

export function resetCounter() {
    counter = 0;
}

function showPreviousMove() {
    counter++;
    if (moves.length < 2) return;
        moves.shift();
        state.future.push(state.present.pop());
        state.present.push(JSON.parse(JSON.stringify(state.past.shift())));
        updateBoard(JSON.parse(JSON.stringify(state.present[0])))
        showBoard();
        nextButton.disabled = false;

    if (moves.length <= 1) {
        previousButton.disabled = true;
    }
    
    const emptyBoxes = [];
    boxes.forEach((box) => {
        if (box.textContent === '') {
            emptyBoxes.push(box);
        }
    })
    emptyBoxes.forEach(empty => empty.disabled = false)
    toggleCurrentPlayer();
    statusEl.textContent = `${currentPlayer}'s turn`;
}

function showNextMove() {
    moves.unshift(JSON.parse(JSON.stringify(state.present)));
    state.past.unshift(state.present.pop());
    state.present.push(JSON.parse(JSON.stringify(state.future.pop())))
    updateBoard(JSON.parse(JSON.stringify(state.present[0])))
    showBoard();
    
    if (state.future.length === 0) {
        nextButton.disabled = true;
        previousButton.disabled = false;
        const emptyBoxes = [];
        boxes.forEach((box) => {
            if (box.textContent === '') {
                emptyBoxes.push(box);
            }
        })
        emptyBoxes.forEach(empty => empty.disabled = false)
    }
}

export function showHistory() {
        showButtons()
    newGameButton.addEventListener('click', newGame)
}

previousButton.addEventListener('click', showPreviousMove)
nextButton.addEventListener('click', showNextMove)