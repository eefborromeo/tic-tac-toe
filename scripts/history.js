import { boxes, boxesArr, board, questionDiv, x, o, statusEl, updateBoard, state } from "./variables.js";
import { moves, presentMove, updateMove,  currentPlayer, toggleCurrentPlayer, showBoard } from "./move.js";

const historyEl = document.querySelector('#history')
const previousButton = document.querySelector('.previous');
const newGameButton = document.querySelector('.new-game');
const nextButton = document.querySelector('.next');
const moveHistory = document.querySelector('#moves > ol');

export let counter = 0;
export let previous;

function newGame() {
    boxes.forEach(box => {
        box.textContent = '';
        box.classList.remove('x', 'o');
    })
    board.forEach(row => row.fill(''))
    questionDiv.classList.remove('hide');
    statusEl.textContent = '';
    historyEl.classList.remove('show');
    previousButton.disabled = false;
    moves.length = 0;
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


function setCounter(val) {
    return counter = val;
}

function showPreviousMove() {
    counter++;
    if (counter < moves.length) {
        console.log(state, counter)
        state.past = moves.slice().splice(counter),
        state.future = moves.slice().splice(0, counter);
        state.present = moves[counter];
        updateBoard(state.present)
        showBoard();
        nextButton.disabled = false;
    }
    if (counter === moves.length) {
        previousButton.disabled = true;
    }

}

function showNextMove() {
    counter--;
    if(counter >= 0) {
        state.past = moves.slice().splice(counter),
        state.future = moves.slice().splice(0, counter);
        state.present = moves[counter];
       updateBoard(state.present);
       showBoard();
    }

    if (counter === 0) {
        nextButton.disabled = true;
        previousButton.disabled = false;
    }
}

export function showHistory() {
        showButtons()
    newGameButton.addEventListener('click', newGame)
}

previousButton.addEventListener('click', showPreviousMove)
nextButton.addEventListener('click', showNextMove)