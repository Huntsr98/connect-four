import * as express from 'express'
import * as bodyParser from 'body-parser'
import { BrowserState, Move, ServerState, UserId } from '../types'
import * as cors from 'cors'
import { v4 as uuidv4 } from 'uuid';
import { isPartiallyEmittedExpression } from 'typescript';
import { Server } from 'http';
// import { updateState } from '../src/state';
const app = express()
const port = 3000
const logging = true
type Logger = (...args: any[]) => void
const logger: Logger = function (...args) {
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

const stateFactory = (userId: string) => {

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
        }
    }
    return initialState
}

const convertStatetoBrowserState = (userId, myColor, state) => {
    const { players, ...remainingState } = state
    // explode out the contents of remainingState and capture them in a new object
    // we're separating state into an object with the components players, and remainingstate so that we dont' have to have 
    // players in BrowserState
    // AKA we're taking players out of state
    const browserState: BrowserState = { userId, myColor, ...remainingState }
    return browserState
}

app.get<any, any, any, { userId?: string | undefined }>('/join', (request, response) => {
    logger(request.query)
    // the query is: userId=${userId}
    const userId = request.query.userId || uuidv4()
    state = state || stateFactory(userId)
    let myColor

    //START HERE: Why do you have to click Start in order to update the
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

type X<whatever> = {
    name: string;
    hobby: whatever;
}

type Y = X<'fishing'>

const oldMan: X<'polo'> = {
    name: 'Sven',
    hobby: 'polo'
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


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

    if (myColor === state.whoseTurn) {
        const column = state.columns[columnNumber]
        column.push(myColor)
        logger(state)
        switchWhoseTurn()

        //convert serverstate to browserstate

        const { players, ...remainingState } = state
        const browserState: BrowserState = { 
            userId: userId, 
            myColor: myColor, 
            ...remainingState 
        }

        res.send({
            message: 'okay :)',
            state: browserState
        })
    } else {
        res.send({
            message: 'Not your turn'
        })

    }
})

const switchWhoseTurn = () => {
    if (state.whoseTurn === 'black') {
        state.whoseTurn = 'red'
    } else {
        state.whoseTurn = 'black'
    }
}

app.post('/get-state', (request, response) => {
    response.send({
        message: 'okay :)',
        state: convertStatetoBrowserState(request.body.userId, request.body.myColor, state)
    })
})


app.listen(port, () => {
    logger(`Example app listening on port ${port}!`)
});
