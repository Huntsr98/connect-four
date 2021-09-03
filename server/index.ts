import * as express from 'express'
import * as bodyParser from 'body-parser'
import { BrowserState, Move, ServerState, UserId } from '../types'
import {getWinningColor} from './check-win'
import * as cors from 'cors'
import { v4 as uuidv4 } from 'uuid';
import { getLineAndCharacterOfPosition, isPartiallyEmittedExpression } from 'typescript';
import { Server } from 'http';
import { Action, addMoveToColumn, convertStatetoBrowserState, stateFactory, switchWhoseTurn, updateState } from './update-state'
// import { updateState } from '../src/state';

//HW: Any time you change state, bring it from here into update-state
//    Write the spec for: Alert the player who's checking in when a win has happened. 
//    post in slack when done

const app = express()
const port = 3000
export const logging = true
export type Logger = (...args: any[]) => void
export const logger: Logger = function (...args) {
    if (logging === true) {
        console.log(...args)
    }
}

let cache = ['hello']
const myDB = {}

const origin = `http://localhost:1234`
const corsOptions = {
    origin,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

}
app.use(cors(corsOptions))


// moved to update-state:
    // const convertStatetoBrowserState = (userId, myColor, state) => {
    //     const { players, ...remainingState } = state
    //     // explode out the contents of remainingState and capture them in a new object
    //     // we're separating state into an object with the components players, and remainingstate so that we dont' have to have 
    //     // players in BrowserState
    //     // AKA we're taking players out of state
    //     const browserState: BrowserState = { userId, myColor, ...remainingState }
    //     return browserState
    // }

// with a .get, you don't get a body. use .post to save to server
app.post('/join', (request, response) => {
    logger(request.body)
    // the query is: userId=${userId}
    const userId = request.body.userId || uuidv4()
    state = updateState({action: Action.start, payload: userId})
    let myColor

    if (state.players.red === userId) {
        myColor = 'red'
        logger('my color is red', state, request.query)
    } else {
        state.players.black = userId
        myColor = 'black'
        logger('my color is black', state, request.query)
    }
    // destructing -- pulling players property out of state
    // ...remainingState is the rest of the state
    // we only send remainingState because otherwise, security issues if user has access to opponent's userId
    const browserState = convertStatetoBrowserState(userId, myColor, state)
    logger(browserState)
    response.send(browserState)
})

let state: ServerState

// type X<whatever> = {
//     name: string;
//     hobby: whatever;
// }

// type Y = X<'fishing'>

// const oldMan: X<'polo'> = {
//     name: 'Sven',
//     hobby: 'polo'
// }

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


const idToColor = (userId: UserId, state: ServerState) => {
    if (userId === state.players.red) {
        return 'red'
    }
    if (userId === state.players.black) {
        return 'black'
    }
}

app.post('/make-a-move', (req, res) => {
    const move: Move = req.body

    const { columnNumber, userId, gameId } = move

    logger('made it')

    const myColor = idToColor(userId, state)
    
    const browserState = convertStatetoBrowserState(move.userId, myColor, state)
   
    const winner = getWinningColor(state.columns, columnNumber)

    if (myColor === state.whoseTurn) {
        
        // **** changing state here!!
        addMoveToColumn(myColor, move.columnNumber)
        
        //moved following to update-state: 
        // const column = state.columns[columnNumber]
        // column.push(myColor)
        // logger(state)
        
        if (winner) {
            updateState({action: Action.winner, payload: myColor})
        }
        // **** call Action.winner somewhere here

        switchWhoseTurn()

        //converts serverstate to browserstate
        // const { players, ...remainingState } = state
        // const browserState: BrowserState = { 
        //     userId: userId, 
        //     myColor: myColor, 
        //     ...remainingState 
        // }

        res.send({
            message: 'okay :)',
            state: browserState,
            winner
        })
        console.log({winner})
    } else {

        // can you check here if there has been a winner???
        // or do you need to get state first? 
        // and then get state.winner?

        if (winner) {
            alert('you lost')
        }

        // const { players, ...remainingState } = state
        // const browserState: BrowserState = { 
        //     userId: userId, 
        //     myColor: myColor, 
        //     ...remainingState 
        // }

        res.send({
            message: 'Not your turn',
            // you need to send state too?
            state: browserState
        })

    }
})


app.post('/get-state', (request, response) => {
    response.send({
        message: 'okay :)',
        state: convertStatetoBrowserState(request.body.userId, request.body.myColor, state)
    })
})


app.listen(port, () => {
    logger(`Example app listening on port ${port}!`)
});
