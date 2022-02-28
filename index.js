const boxes = document.querySelectorAll('.box');
const statusEl = document.querySelector('#status p');

class Player {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }
}

let x = new Player('X', 0);
let o = new Player('O', 0);

let currentPlayer = x.name;

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]

function updatesPlayerStatus() {
   statusEl.textContent = `${currentPlayer === x.name ? o.name : x.name}'s turn`;
}

function addMove() {
    currentPlayer = currentPlayer === x.name ? o.name : x.name;
    board[this.dataset.boardIndex].splice(this.dataset.index, 1, currentPlayer);
    currentPlayer === x.name ? this.classList.add('x') : this.classList.add('o');
    this.textContent = board[this.dataset.boardIndex][this.dataset.index];
    this.disabled = true;
    updatesPlayerStatus();
    checkWin();
}

function disableBoard() {
    boxes.forEach(box => box.disabled = 'true');
}

function checkWin() {
    // HORIZONTAL WIN
    const row1 = board[0];
    const row2 = board[1];
    const row3 = board[2];

    const row1Check = row1.every(char => char === row1[0] && char !== '');
    const row2Check = row2.every(char => char === row2[0] && char !== '');
    const row3Check = row3.every(char => char === row3[0] && char !== '');
    
    if (row1Check && !row2Check && !row3Check) {
        statusEl.textContent = `Game Over. ${row1[0]} wins!`;
        disableBoard();
    } else if (!row1Check && row2Check && !row3Check) {
        statusEl.textContent = `Game Over. ${row2[0]} wins!`;
        disableBoard();
    } else if (!row1Check && !row2Check && row3Check) {
        statusEl.textContent = `Game Over. ${row3[0]} wins!`;
        disableBoard();
    } 
            
    // VERTICAL WIN
    const col1 = board.map(row => row[0]);
    const col2 = board.map(row => row[1]);
    const col3 = board.map(row => row[2]);

    const col1Check = col1.every(char => char === col1[0] && char !== '');
    const col2Check = col2.every(char => char === col2[0] && char !== '');
    const col3Check = col3.every(char => char === col3[0] && char !== '');

    if (col1Check && !col2Check && !col3Check) {
        statusEl.textContent = `Game Over. ${col1[0]} wins!`;
        disableBoard();
    } else if (!col1Check && col2Check && !col3Check) {
        statusEl.textContent = `Game Over. ${col2[0]} wins!`;
        disableBoard();
    } else if (!col1Check && !col2Check && col3Check) {
        statusEl.textContent = `Game Over. ${col3[0]} wins!`;
        disableBoard();
    }

    // DIAGONAL WIN
    const leftRight = board.map((row, index) => row[index]);
    const leftRightCheck = leftRight.every(char => char === leftRight[0] && char !== '');
    const rightLeft = board.map((row, index) => row.reverse()[index]);
    const rightLeftCheck = rightLeft.every(char => char === rightLeft[0] && char !== '');

    if (leftRightCheck || rightLeftCheck) {
        statusEl.textContent = `Game Over. ${leftRightCheck ?leftRight[0] : rightLeft[0]} wins!`;
        disableBoard();
    }
}
            
boxes.forEach(box => {
    box.addEventListener('click', addMove);
})

