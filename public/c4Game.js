// HW  create a grid in the dom in JS
// create a function that takes an arguement
// that argument is an array of arrays
// each subarray has n strings or null
// each string is either the word "Red" or "Black"
//  each subarray will be a row, a row of divs in the dom
// each div will have the background color of red or black or none (in the case of a null)

const config = {
    rowHeight: 300,
    rowWidth: 300,
    boardWidth: 1000,
    boardHeight: 1000,
}


const connectFour = (arg) => {
    const board = document.createElement('div');
    board.style.width = config.boardWidth + 'px';
    board.style.width = config.boardHeight + 'px';
    board.style.position = 'relative';
    document.body.appendChild(board)

    arg.forEach(rowArray => {

        const row = document.createElement('div');
        row.style.width = '100%'
        row.style.position = 'relative';
        board.appendChild(row)
        const gamePieceDiameter = 100 / rowArray.length
        rowArray.forEach(color => {
            const gamePiece = document.createElement('div');
            gamePiece.style.width = gamePieceDiameter + 'px';
            gamePiece.style.height = gamePieceDiameter + 'px';
            gamePiece.style.background = color
            gamePiece.style.position = 'relative';
            board.appendChild(gamePiece)
        })
    });
}
const arg = [
    ['red', 'black', null, 'red'],
    ['black', 'black', 'red', 'black'],
    ['black', null, 'black', 'black'],
    ['black', 'red', 'red', 'red'],
    ['red', 'red', 'red', 'black'],
    [null, 'red', 'red', 'black'],
]

connectFour(arg)