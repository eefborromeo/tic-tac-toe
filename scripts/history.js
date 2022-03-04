import { boxes, boxesArr, board, questionDiv, x, o, statusEl, updateBoard, state } from "./variables.js";
import { checkHorizontalWin, checkVerticalWin, checkDiagonalWin, checkWin } from "./win.js";
import { moves, moveHistory, presentMove, updateMove,  currentPlayer, toggleCurrentPlayer, showBoard } from "./move.js";

const historyEl = document.querySelector('#history')
const previousButton = document.querySelector('.previous');
const newGameButton = document.querySelector('.new-game');
const nextButton = document.querySelector('.next');

export let counter = 0;
export let previous;
let present = board;

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
    // counter++;
    // if (counter < moves.length) {
        // state.past = moves.slice().splice(counter),
        moves.shift();
        state.future.push(state.present.pop());
        state.present.push(JSON.parse(JSON.stringify(state.past.shift())));
        console.log('present', state.present[0])
        updateBoard(state.present[0])
        // console.log(state)
        showBoard();
        nextButton.disabled = false;
    // }
    // if (counter === moves.length) {
    //     previousButton.disabled = true;
    // }
    
    const emptyBoxes = [];
    boxes.forEach((box) => {
        if (box.textContent === '') {
            emptyBoxes.push(box);
        }
    })
    emptyBoxes.forEach(empty => empty.disabled = false)
    toggleCurrentPlayer();
    statusEl.textContent = `${currentPlayer}'s turn`;
    
    // state.future = state.past.shift();
    // if (counter <= state.past.length) {
        // updateBoard(state.present);
    //     

    // }
}

function showNextMove() {
    counter--;
    if(counter >= 0) {
        state.past = moves.slice().splice(counter),
        state.future = moves.slice().splice(0, counter);
        state.present = moves[counter];
       updateBoard(state.present);
       showBoard();
       previousButton.disabled = false;
    }

    if (counter === 0) {
        nextButton.disabled = true;
    }
}

export function showHistory() {
        showButtons()
    newGameButton.addEventListener('click', newGame)
}

previousButton.addEventListener('click', showPreviousMove)
nextButton.addEventListener('click', showNextMove)