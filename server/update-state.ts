import { logger } from "."
import { BrowserState, PieceColor, ServerState, UserId } from "../types"


export const stateFactory = (userId: UserId) => {

    const initialState: ServerState = {
        columns: [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ],
        boardDimension: {
            x: 7,
            y: 6
        },
        whoseTurn: 'red',
        gameId: 0,
        client: 1,
        players: {
            red: userId,
            black: null,
        },
        winner: null,
    }
    return initialState
}

let state: ServerState

// enum crosses the boundary of type and object
export enum Action {
    winner = 'winner',
    start = 'start'
} 

type UpdateStateWinner =  {action: Action.winner, payload: PieceColor} 
type UpdateStateStart = {action: Action.start, payload: UserId}
type UpdateStateArgs = UpdateStateWinner | UpdateStateStart
type UpdateState = (arg: UpdateStateArgs) => ServerState 

export const updateState: UpdateState = (args) => {

    switch (args.action) {
        case Action.winner:
            state = {
                ...state, 
                winner: args.payload
            } 
            break
        case Action.start:
            state = state || stateFactory(args.payload)
            break
    }
    return state
}

const getState = () => {
    // app.post('/get-state', (request, response) => {
    //     response.send({
    //         message: 'okay :)',
    //         state: convertStatetoBrowserState(request.body.userId, request.body.myColor, state)
    //     })
    // }) ???
}

export const addMoveToColumn = (myColor, columnNumber) => {
    const column = state.columns[columnNumber]
    column.push(myColor)
    logger(state)
}

export const convertStatetoBrowserState = (userId, myColor, state) => {
    const { players, ...remainingState } = state
    // explode out the contents of remainingState and capture them in a new object
    // we're separating state into an object with the components players, and remainingstate so that we dont' have to have 
    // players in BrowserState
    // AKA we're taking players out of state
    const browserState: BrowserState = { userId, myColor, ...remainingState }
    return browserState
}

export const switchWhoseTurn = () => {
    if (state.whoseTurn === 'black') {
        state.whoseTurn = 'red'
    } else {
        state.whoseTurn = 'black'
    }
}