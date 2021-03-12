


// after receiving the player move server-side, should do the following:
//  • Check to see if new move created at least 4 in a row (won game)
//      • check all groupings adjacent to the new-move-piece to see if player color appears in a row of 4
//  • If move resulted in win, return locations of winning adjacent pieces (ideally could be more than 4, but 4 is sufficient) so they can he highlighted client-side
//  • If not, then allow other player to make move (allow them to ping server to see it's their turn)


// Questions
//  1. Should this be done on the server or client? (cheaper to do on client, cleaner to do on the server since that's where we're maintaining state) - opting for server
//  2. Do we need to highlight winning adjacent pieces? Should we highlight all pieces if it's more than 4 in a row? - might be easiest to highlight entire row / column / diagonal
//  3. Decided not to just list all winning combos and check against that because that seemed inefficient, but was that a mistake?






//stubs for testing
let board = [
    ['red',],
    ['black'],
    ['black', 'red'],
    [],
    ['red', 'black', 'red'],
    ['black', 'black'],
    []
];

const movedPieceColor = 'red';
const winningArray = [movedPieceColor, movedPieceColor, movedPieceColor, movedPieceColor];
const moveColumn = 5;
const moveRow = 2;
let fourInARow = false;


// check vertical: only need to check below the piece on the column.

var vertical = columns[moveColumn].slice(-0, 4);
// should pull top four colors in column
//questions - how do you get each column to be a "column"
if (vertical == winningArray) {
    fourInARow = true
};



// check horizontal: create array for the row on which piece was placed and look for 4 in a row. Make sure blanks are accounted for
var horizontal = [columns[0][moveRow], columns[1][moveRow], columns[2][moveRow], columns[3][moveRow], columns[4][moveRow], columns[5][moveRow]]

// need to check if ordered array is found in another array... having trouble

// check diagonal: need to do 2x to check both slants. Make sure blanks and off-the-board are accounted for

var rightDiagonal = [];
var i;
for (i = 0; i < 7; i++) {
    rightDiagonal.push(columns[i][moveRow - (moveColumn - i)]);
}

var leftDiagonal = [];
var i;
for (i = 0; i < 7; i++) {
    leftDiagonal.push(columns[i][moveRow + (moveColumn - i)]);
}

// need to check if ordered array is found in another array... having trouble (same as above)