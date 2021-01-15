
export type pieceColor = 'red' | 'black'

export type State = {
    moves: MakeAMoveRequest[], 
    scores: {
        client1: number,
        client2: number
    },
    boardDimension: {
        x: number,
        y: number
    },
    whoseTurn: pieceColor
}

export interface MakeAMoveRequest {
    color: pieceColor,
    x: number,
    y: number
}