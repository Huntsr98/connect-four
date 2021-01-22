import * as express from 'express'
import * as bodyParser from 'body-parser'
import { MakeAMoveRequest, State } from '../types'


const app = express()
const port = 3000
let cache = ['hello']
const myDB = {}

const stateFactory = () => {

    const initialState: State = {
        moves: [],
        scores: {
            client1: 0,
            client2: 0
        },
        boardDimension: {
            x: 7,
            y: 6
        },
        whoseTurn: 'red',
        gameId: 0
    }
    return initialState
}
let state = stateFactory()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.post('/make-a-move', (req, res) => {
    const move: MakeAMoveRequest = req.body
    if (move.color === state.whoseTurn) {
        state.moves.push(move)
        console.log(state)
        switchWhoseTurn()
        res.send({
            message: 'okay :)',
            moves: state.moves
        })
    } else {
        res.send({
            message: 'Not your turn'
        })
    }
})

const switchWhoseTurn = () => {
    if(state.whoseTurn === 'black'){
        state.whoseTurn = 'red'
    }else{
        state.whoseTurn = 'black'
    }
}

app.get('/get-state', (req, res) => {
    res.send({
        message: 'okay :)',
        state
    })
})

app.post('/reset', (req, res) => {
    state = stateFactory()
    state.gameId = Math.floor(Math.random() * 10 ** 12)
    res.send({
        message: 'okay :)',
        gameId: state.gameId
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
