import { boxes, boxesArr, board, questionDiv, x, o, statusEl } from "./variables.js";
import { toggleCurrentPlayer, moves } from "./move.js";

const historyEl = document.querySelector('#history')
const previousButton = document.querySelector('.previous');
const newGameButton = document.querySelector('.new-game');
const nextButton = document.querySelector('.next');
let counter = 0;

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
    counter = 0;
}

function showButtons() {
    historyEl.classList.add('show')
    nextButton.disabled = true;
}
let previous;
function showPreviousMove() {
    previous = moves.slice().reverse()
    nextButton.disabled = false;
    let prevArr;

    if (counter < previous.length - 1) {
        prevArr = previous[counter += 1]
    } 
    
    if (counter === previous.length - 1) {
        previousButton.disabled = true;
    }

    if (prevArr) {
        boxes.forEach((box) => {
            box.textContent = prevArr[box.dataset.boardIndex][box.dataset.index]
            if (box.textContent === '') {
                box.classList.remove('o');
                box.classList.remove('x');
            }
        })
    } 
}

function showNextMove() {
    let nextArr;
    previousButton.disabled = false;

    if (counter > 0) {
      nextArr = previous[counter -= 1];
    }

    if (counter === 0) {
        nextButton.disabled = true;
    }

    if (nextArr) {
        boxes.forEach((box) => {
            box.textContent = nextArr[box.dataset.boardIndex][box.dataset.index];
            if (box.textContent !== '') {
                box.textContent === 'X' ? box.classList.add('x') : box.classList.add('o');
             
            }
            
        })
    }
}

export function showHistory() {
    if (boxesArr.every(box => box.disabled)) {
        showButtons()
    }
    newGameButton.addEventListener('click', newGame)
}

previousButton.addEventListener('click', showPreviousMove)
nextButton.addEventListener('click', showNextMove)