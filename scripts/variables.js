export const boxes = document.querySelectorAll('.box');
export const boxesArr = Array.from(boxes);
export const questionDiv = document.querySelector('.question');
export const statusEl = document.querySelector('#status > p');
export const moveHistory = document.querySelector('#moves > ol');

export const x = {
    name: 'X', 
    score: 0,
};
export const o = {
    name: 'O', 
    score: 0,
};

export let tie = 0;

export let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]

export const state = {
    past: [],
    present: [],
    future: []
}

export function addTie(val) {
    tie += val;
}

export function minusTie(val) {
    tie -= val;
}

export function updateBoard(val) {
    board = val;
}