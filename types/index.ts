
export type PieceColor = 'red' | 'black'

export type ServerState = {
    moves: Move[], 
    scores: {
        client1: number,
        client2: number
    },
    boardDimension: {
        x: number,
        y: number
    },
    whoseTurn: PieceColor,
    gameId: number
}

export interface Move {
    color: PieceColor,
    x: number,
    y: number
}


// import { types } from "util";

// type pieceColor = 'red' | 'black'
// type state = {
//     gameId: number,
//     moves: [],
//     whoseTrun: 'red' | 'black'
// };

// type initialState = {
//     gameId: number,
//     moves: [],
//     whoseTurn: 'red'
// };

// app.post('/make-a-move', (gameId, x, y, color) => {

// })
// // Confirm that the gameId matches that of the current state, and respond to the client with an error if not.
// // push the following object into the cache array: { x, y, color }
// // Change the whoseTurn parameter to the opposite color as was sent in.
// // Respond to the browser with the entire state object.

// app.get('/get-state', (req, res) => {

// })
// // When hit, responds with the current state.



// app.post('/reset', (req, res) => {
//     state = initialState
//     state.gameId = Math.random()
    
// })
// // Resets state to its initial state.
// // Randomly generates a new gameId on state
// // Responds to browser with new state


// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })
