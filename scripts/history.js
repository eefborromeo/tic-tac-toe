import { boxes, boxesArr, board, x, o, statusEl } from "./variables.js";
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
        box.disabled = false;
    })
    board.forEach(row => row.fill(''))
    toggleCurrentPlayer();
    statusEl.textContent = `${toggleCurrentPlayer() === x.name ? o.name : x.name}'s turn`;
    historyEl.classList.remove('show');
    moves.length = 0;
}

function showButtons() {
    historyEl.classList.add('show')
}

function showPreviousMove() {
    const previous = moves.slice().reverse()
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

export function showHistory() {
    if (boxesArr.every(box => box.disabled)) {
        showButtons()
    }
    newGameButton.addEventListener('click', newGame)
}

previousButton.addEventListener('click', showPreviousMove)