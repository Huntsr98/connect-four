import React, { Component } from 'react';
import axios from 'axios';
import { ServerState, Move } from '../types/index'

export const state: State = {
    gameId: 0,
    myColor: 'black',
    myTurn: true,
    moves: [
        {
            color: 'red',
            x: 3,
            y: 0
        }
    ]
}

type Color = 'red' | 'black'

type State = {
    gameId: number
    myColor: Color
    myTurn: boolean
    moves: Move[]
}

let timer
// const axiosMock = (): ServerState => {
//     return {
//         moves: [],
//         scores: {
//             client1: 0,
//             client2: 0
//         },
//         boardDimension: {
//             x: 7,
//             y: 8
//         },
//         whoseTurn: 'red',
//         gameId: 1
//     }
// }
export const checkIn = (gameId: number, myColor: Color) => {
    // uses axios to post {gameId: number, color: 'red' | black'} to the server's /check-in endpoint
    // const currentState: ServerState = await axios.post('http://localhost:3000/check-in', { gameId, myColor })
    
    // HW: replace axiosMock() with a real call to the server for state
    // use /check-in
    // deal with the promise that axios.post returns, which will trigger state.myTurn = true
    const currentState: ServerState = axiosMock()
    if (currentState.whoseTurn === state.myColor) {
        state.myTurn = true
        clearInterval(timer)
        alert('It\'s my turn!')

    }
}


export const makeAMove = (gameId: number, x: number, y: number, color: Color) => {
    if (state.myTurn === true) {
        const responsePromise = axios.post('http://localhost:3000/make-a-move', { x, y, color })
        
        // response looks like 
        //{
        //     message: 'okay :)',
        //     moves: state.moves
        // }
        debugger
        responsePromise.then(({data}) => {
            // starts a setInterval, in which checkIn is called.
            debugger
            timer = setInterval(() => {
                checkIn(state.gameId, state.myColor)
            }, 3000)
            state.moves = data.moves
        })
    }

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
