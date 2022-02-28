export const boxes = document.querySelectorAll('.box');
export const statusEl = document.querySelector('#status p');
export const x = {
    name: 'X', 
    score: 0,
};
export const o = {
    name: 'O', 
    score: 0
};


export let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]