import { boxes, boxesArr, board, statusEl, o } from "./variables.js";
import { showHistory } from './history.js';

function disableBoard() {
    boxes.forEach(box => box.disabled = 'true');
}

export function checkHorizontalWin() {
    // HORIZONTAL WIN
    const row1 = board[0];
    const row2 = board[1];
    const row3 = board[2];

    const row1Check = row1.every(char => char === row1[0] && char !== '');
    const row2Check = row2.every(char => char === row2[0] && char !== '');
    const row3Check = row3.every(char => char === row3[0] && char !== '');
    
    if (row1Check && !row2Check && !row3Check) {
        statusEl.textContent = `Game Over. ${row1[0]} wins!`;
        return row1[0]
    } else if (!row1Check && row2Check && !row3Check) {
        statusEl.textContent = `Game Over. ${row2[0]} wins!`;
        return row2[0]
    } else if (!row1Check && !row2Check && row3Check) {
        statusEl.textContent = `Game Over. ${row3[0]} wins!`;
        return row3[0]
    }
}

export function checkVerticalWin() {
    // VERTICAL WIN
    const col1 = board.map(row => row[0]);
    const col2 = board.map(row => row[1]);
    const col3 = board.map(row => row[2]);
    
    const col1Check = col1.every(char => char === col1[0] && char !== '');
    const col2Check = col2.every(char => char === col2[0] && char !== '');
    const col3Check = col3.every(char => char === col3[0] && char !== '');
    
    if (col1Check && !col2Check && !col3Check) {
        statusEl.textContent = `Game Over. ${col1[0]} wins!`;
        return col1[0]
    } else if (!col1Check && col2Check && !col3Check) {
        statusEl.textContent = `Game Over. ${col2[0]} wins!`;
        return col2[0]
    } else if (!col1Check && !col2Check && col3Check) {
        statusEl.textContent = `Game Over. ${col3[0]} wins!`;
        return col3[0]
    }
}

export function checkDiagonalWin() {
    // DIAGONAL WIN
    const leftRight = board.map((row, index) => row[index]);
    const leftRightCheck = leftRight.every(char => char === leftRight[0] && char !== '');
    const reverseBoard = [...board]
    const rightLeft = reverseBoard.reverse().map((row, index) => row[index]);
    const rightLeftCheck = rightLeft.every(char => char === rightLeft[2] && char !== '');
    
    if (leftRightCheck || rightLeftCheck) {
        statusEl.textContent = `Game Over. ${leftRightCheck ? leftRight[0] : rightLeft[0]} wins!`;
        return leftRightCheck ? leftRight[0] : rightLeft[0]
    }
}

export function checkWin() {
    const noEmptyBox = boxesArr.every(box => box.disabled);
    if ((!checkHorizontalWin() || !checkVerticalWin() || !checkDiagonalWin()) && noEmptyBox) {
        statusEl.textContent = `Draw! Game Over.`;
        showHistory();
        return 'Tie';
    } else if (checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin()) {
        disableBoard();
        showHistory();
    }
}