import { x, o, tie, addTie } from './variables.js'
import { checkHorizontalWin, checkVerticalWin, checkDiagonalWin, checkWin } from "./win.js";

export const xScore = document.querySelector('[data-x-score]');
export const oScore = document.querySelector('[data-o-score]');
export const tieEl = document.querySelectorAll('[data-tie]');

function updateScore(winner) {
    if (winner !== 'Tie') {
        winner === x.name ? x.score += 1 : o.score += 1;
        xScore.textContent = x.score;
        oScore.textContent = o.score;
    } else {
        addTie(1);
        tieEl.forEach(p => {
            p.textContent = tie;
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