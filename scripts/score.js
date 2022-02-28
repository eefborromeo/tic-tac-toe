import { x, o } from './variables.js'
import { checkHorizontalWin, checkVerticalWin, checkDiagonalWin } from "./win.js";

const xScore = document.querySelector('[data-x-score]');
const oScore = document.querySelector('[data-o-score]');

function updateScore(winner) {
    winner === x.name ? x.score += 1 : o.score += 1;
    xScore.textContent = x.score;
    oScore.textContent = o.score;
}

export function addScore() {
    if (checkHorizontalWin()) {
        updateScore(checkHorizontalWin())
    } else if (checkVerticalWin()) {
        updateScore(checkVerticalWin())
    } else if (checkDiagonalWin()) {
        updateScore(checkDiagonalWin())
    }
}