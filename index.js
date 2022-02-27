const boxes = document.querySelectorAll('.box');
const statusEl = document.querySelector('#status p');

class Player {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }
}

let x = new Player('X', 0);
let o = new Player('O', 0)

let currentPlayer = x.name;

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]

function updatesPlayerStatus() {
   statusEl.textContent = `${currentPlayer === x.name ? o.name : x.name}'s turn`;
   const boxesArr = Array.prototype.slice.call(boxes)
    if (boxesArr.every(box => box.disabled)) {
        statusEl.textContent = `Game Over`;
    }
}

function addMove() {
    currentPlayer = currentPlayer === x.name ? o.name : x.name;
    board[this.dataset.boardIndex].splice(this.dataset.index, 1, currentPlayer);
    currentPlayer === x.name ? this.classList.add('x') : this.classList.add('o')
    this.textContent = board[this.dataset.boardIndex][this.dataset.index];
    this.disabled = true;
    updatesPlayerStatus();
}

boxes.forEach(box => {
    box.addEventListener('click', addMove)
})
