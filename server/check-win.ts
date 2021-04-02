


// after receiving the player move server-side, should do the following:
// • Check to see if new move created at least 4 in a row (won game)
// • check all groupings adjacent to the new-move-piece to see if player color appears in a row of 4
// • If move resulted in win, return locations of winning adjacent pieces (ideally could be more than 4, but 4 is sufficient) so they can he highlighted client-side
// • If not, then allow other player to make move (allow them to ping server to see it's their turn)
// • After move is made and server-side state is updated, this algorithm should be run to check for the win
// • move color, and position (column, row) need to be passed into this algorithm

import { resourceLimits } from "worker_threads";


// Questions
//  1. Should this be done on the server or client? (cheaper to do on client, cleaner to do on the server since that's where we're maintaining state) - opting for server
//  2. Do we need to highlight winning adjacent pieces? Should we highlight all pieces if it's more than 4 in a row? - might be easiest to highlight entire row / column / diagonal
//  3. Decided not to just list all winning combos and check against that because that seemed inefficient, but was that a mistake?


//mock for testing
let board = [
    ['red',],
    ['black'],
    ['black', 'red'],
    [],
    ['red', 'black', 'red'],
    ['black', 'black'],
    []
];

// types (should these all be moved to '../types/index.ts' ?)

export type FourInARow = 'verticalWin' | 'horizontalWin' | 'diagonalInclineWin' | 'diagonalDeclineWin' | null

const checkForFour = (arr: Array<string>) => {
    const result = arr.reduce((accumulator, color) => {
        if (color && accumulator.color === color) {
            accumulator.consecutive++
            if (accumulator.consecutive > 3) {
                accumulator.winner = color
            }
        } else {
            accumulator.color = color
            accumulator.consecutive = 1
        }
        return accumulator
    }, {
        color: null,
        consecutive: 0,
        winner: null
    })
    return result.winner
}





export const getWinningColor = (board, moveRow, moveColumn) => {
    // check horizontal: create array for the row on which piece was placed and look for 4 in a row. Make sure blanks are accounted for
    const horizontal = [board[0][moveRow], board[1][moveRow], board[2][moveRow], board[3][moveRow], board[4][moveRow], board[5][moveRow]]
    const vertical = board[moveColumn].slice(-4);

    const bottomDiagonal = []
    const topDiagonal = []


    const startingColumn = moveColumn - 3
    const bottomRow = moveRow - 3
    const topRow = moveRow + 3
    for (let i = 0; i < 7; i++) {
        const currentColumn = startingColumn + i
        const currentRow = bottomRow + i
        if (
            currentColumn > -1 &&
            currentColumn < 8 &&
            currentRow > -1 &&
            currentRow < 7
        ) {
            bottomDiagonal.push(board[currentColumn][currentRow]);
        }
    }


    for (let i = 0; i < 7; i++) {
        const currentColumn = startingColumn + i
        const currentRow = topRow - i
        if (
            currentColumn > -1 &&
            currentColumn < 8 &&
            currentRow > -1 &&
            currentRow < 7
        ) {
            topDiagonal.push(board[currentColumn][currentRow]);
        }
    }

    let winner = checkForFour(topDiagonal)
    if (!winner) {
        winner = checkForFour(bottomDiagonal)
    }
    if (!winner) {
        winner = checkForFour(vertical)
    }
    if (!winner) {
        winner = checkForFour(horizontal)
    }
    return winner
}