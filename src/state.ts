import React, { Component } from 'react',
import axios from 'axios';

const intialState: State = {
    gameId: 0,
    myColor: 'red',
    myTurn: false,
    moves: []
}

type State = {
    gameId: number
    myColor: 'red' | 'black'
    myTurn: boolean
    moves: []
}

const checkIn = (state: State) => {
    // uses axios to post {gameId: number, color: 'red' | black'} to the server's /check-in endpoint
    axios.post('/check-in', (req, res) => {
        res.send(state.gameId, state.myColor)
    })

}

const makeAMove = ({gameId, x, y, color}, myTurn) => {
    // if (myTurn === false) {
       
    //     //    do nothing?
    // }
    if (myTurn === true) {
        axios.post('/make-a-move', (req, res) => {
            // if myTurn = true, use the axios npm package to send {x, y, color} to /make-a-move endpoint
            // or is this in the bigger scope, and myTurn if statements are inside?
            res.send({ x, y, color })
        })
        
    } 
    }
    // starts a setInterval, in which checkIn is called.
    setInterval(checkIn, 3000)
}

const reset = () => {
    // resets state to initial state
}