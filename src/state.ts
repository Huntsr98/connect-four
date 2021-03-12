import React, { Component } from 'react';
import axios from 'axios';
import { ServerState, Move } from '../types/index'

export let state: State = {
    gameId: 0,
    myColor: 'red',
    myTurn: true,
    moves: [
            {
                color: 'red',
                x: 3,
            }
    ]
}

export const updateState = ({type, payload}) => {
    if (type === "reset") {
        state = payload
    }
    console.log(state)
    return state
}

type Color = 'red' | 'black'

type State = {
    gameId: number
    myColor: Color
    myTurn: boolean
    moves: Move[]
}

let timer
const axiosMock = (): ServerState => {
    return {
        moves: [], 
        scores: {
            client1: 0,
            client2: 0
        },
        boardDimension: {
            x: 7,
            y: 8
        },
        whoseTurn: 'red',
        gameId: 1
    }
}
export const checkIn = async (gameId: number, myColor: Color) => {
    // uses axios to post {gameId: number, color: 'red' | black'} to the server's /check-in endpoint
    // const currentState: ServerState = await axios.post('http://localhost:3000/check-in', { gameId, myColor })
    const currentState: ServerState = await axiosMock()
    if (currentState.whoseTurn === state.myColor) {
        state.myTurn = true
        clearInterval(timer)
        alert('It\'s my turn!')
    }
}


export const makeAMove = (columnNumber: number) => {
    if (state.myTurn === true) {
        axios.post('http://localhost:3000/make-a-move', { columnNumber, color: state.myColor, gameId: state.gameId })  // we need to add in
    }
    // starts a setInterval, in which checkIn is called.
    timer = setInterval(() => {
        checkIn(state.gameId, state.myColor)
    }, 3000)
}


export const reset = (state) => {
    // resets state to initial state
    state = {
        gameId: 0,
        myColor: 'red',
        myTurn: false,
        moves: []
    }
    return state
}
