import { x, o } from './variables.js'
import { checkHorizontalWin, checkVerticalWin, checkDiagonalWin, checkWin } from "./win.js";

const xScore = document.querySelector('[data-x-score]');
const oScore = document.querySelector('[data-o-score]');
const tieOl = document.querySelectorAll('#stats ol');

function updateScore(winner) {
    if (winner !== 'Tie') {
        winner === x.name ? x.score += 1 : o.score += 1;
        xScore.textContent = x.score;
        oScore.textContent = o.score;
    } else {
        tieOl.forEach(ol => {
            let li = document.createElement('li');
            li.innerHTML = 'Tie'
            ol.appendChild(li) 
        })
    }
}

export function addScore() {
    if (checkHorizontalWin()) {
        updateScore(checkHorizontalWin())
    } else if (checkVerticalWin()) {
        updateScore(checkVerticalWin())
    } else if (checkDiagonalWin()) {
        updateScore(checkDiagonalWin())
    } else if (checkWin()) {
        updateScore(checkWin())
    }
}