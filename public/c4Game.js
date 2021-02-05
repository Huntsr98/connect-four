// HW  create a grid in the dom in JS
// create a function that takes an arguement
// that argument is an array of arrays
// each subarray has n strings or null
// each string is either the word "Red" or "Black"
//  each subarray will be a row, a row of divs in the dom
// each div will have the background color of red or black or none (in the case of a null)

import * as stateFunctions from '../src/state'


//this is temporary stub
stateFunctions.makeAMove(stateFunctions.state.gameId, stateFunctions.state.moves[0].x, stateFunctions.state.moves[0].y, stateFunctions.state.myColor)

const config = {
    rowHeight: 300,
    rowWidth: 300,
    boardWidth: 1000,
    boardHeight: 1000,
}


const connectFour = (arg) => {
    const board = document.createElement('div');
    board.style.width = config.boardWidth + 'px';
    board.style.height = config.boardHeight + 'px';
    board.className = 'board'
    document.body.appendChild(board)

    arg.forEach(rowArray => {

        const row = document.createElement('div');
        row.style.width = '100%'
        row.style.display = 'align-items'
        row.className = 'row'
        board.appendChild(row)
        const gamePieceDiameter = 100 / rowArray.length
        rowArray.forEach(color => {
            const gamePiece = document.createElement('div');
            gamePiece.style.width = gamePieceDiameter + 'px';
            gamePiece.style.height = gamePieceDiameter + 'px';
            gamePiece.style.background = color
            gamePiece.style.flexDirection = 'center'
            gamePiece.className = 'gamePiece'
            row.appendChild(gamePiece)
        })
    });
}
const arg = [
    ['red', 'black', null, 'red', null, null, null],
    ['black', 'black', 'red', 'black', 'red', null, 'black'],
    ['black', 'red', 'black', 'black', 'black', null, 'black'],
    ['black', 'red', 'red', 'red', 'black', 'red', 'red'],
    ['red', 'black', 'red', 'black', 'black', 'red', 'black'],
    ['black', 'red', 'black', 'red', 'red', 'black', 'black'],
]

connectFour(arg)