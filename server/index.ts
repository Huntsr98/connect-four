import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as config from './config'
import { MakeAMoveRequest, State } from '../types'

const express = require('express')
const app = express()
const port = 3000
let cache = ['hello']
const myDB = {}

const state: State = {
    moves: [],
    scores: {
        client1: 0,
        client2: 0
    },
    boardDimension: {
        x: 7,
        y: 6
    },
    whoseTurn: 'red'
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.post('/make-a-move', (req, res) => {
    const move: MakeAMoveRequest = req.body
    state.moves.push(move)
    console.log(state)
    res.send({
        message: 'okay :)',
        moves: state.moves
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
