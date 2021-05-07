import * as express from 'express'
import * as bodyParser from 'body-parser'
import { BrowserState, Move, ServerState } from '../types'
import * as cors from 'cors'
import { v4 as uuidv4 } from 'uuid';
const app = express()
const port = 3000
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

app.get<any, any, any, { userId?: string | undefined }>('/join', (request, response) => {
    console.log(request.query)
    // the query is: userId=${userId}
    const userId = request.query.userId || uuidv4()
    state = state || stateFactory(userId)
    let myColor
    if (!state.players.red) {
        state.players.red = userId
        myColor = 'red'
    } else {
        state.players.black = userId
        myColor = 'black'
    }
    // destructing -- pulling players property out of state
    // ...remainingState is the rest of the state
    // we only send remainingState because otherwise, security issues if user has access to opponent's userId
    const { players, ...remainingState } = state
    // explode out the contents of remainingState and capture them in a new object
    // we're separating state into an object with the components players, and remainingstate so that we dont' have to have 
    // players in BrowserState
    // AKA we're taking players out of state
    const browserState: BrowserState = {  userId, myColor, ...remainingState}
    console.log(browserState)
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


app.post('/make-a-move', (req, res) => {
    const move: Move = req.body
    const { columnNumber, userId, gameId} = move
// HW: START HERE
    // determine whose turn it is
    // if it's your turn, 
    // push the relevant data (color, columns) from the move you made into state
    // 
    console.log('made it')
    if (move.color === state.whoseTurn) {
        state.columns[move.x].push(move.color)
        // reassign  x and color so that it matches the components {columnNumber, userId, gameId}
        console.log(state)
        switchWhoseTurn()
        res.send({
            message: 'okay :)',
            state
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

app.get('/get-state', (request, response) => {
    response.send({
        message: 'okay :)',
        state
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
