import { boxes, boxesArr, board, x, o, statusEl } from "./variables.js";
import { toggleCurrentPlayer } from "./move.js";

const historyEl = document.querySelector('#history')
const previousButton = document.querySelector('.previous');
const newGameButton = document.querySelector('.new-game');
const nextButton = document.querySelector('.next');

let boardHistory;

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
}

function showButtons() {
    historyEl.classList.add('show')
    console.log(board)
}

export function showHistory() {
    if (boxesArr.every(box => box.disabled)) {
        showButtons()
    }
    newGameButton.addEventListener('click', newGame)
}