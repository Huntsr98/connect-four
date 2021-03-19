import React, { Component } from 'react';
import axios from 'axios';
import { ServerState, Move, ClientNumber, } from '../types/index'
import { STATUS_CODES } from 'http';


export let state: State = {
    gameId: 0,
    client: 1,
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

export const updateState = ({ type, payload }) => {
    if (type === "reset") {
        state = payload
    }
    console.log(state)
    return state
}

type Color = 'red' | 'black'

type State = {
    gameId: number
    client: ClientNumber
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
//         boardDimension:  {
//             x: 7,
//             y: 8
//         },
//         whoseTurn: 'red',
//         gameId: 1
//     }
// }

const userId = localStorage.getItem('userId')
const myColorPromise = axios.get(`http://localhost:3000/enterGame?userId=${userId}`)
myColorPromise.then((response) => {
    state.client = response.data
    console.log(response.data)
    //somehow export and connect this with view in c4Game.tsx???
})


export const checkIn = (gameId: number, myColor: Color) => {
    // uses axios to post {gameId: number, color: 'red' | black'} to the server's /check-in endpoint
    // const currentState: ServerState = await axios.post('http://localhost:3000/check-in', { gameId, myColor })

    // HW: replace axiosMock() with a real call to the server for state
    // deal with the promise that axios.post returns, which will trigger state.myTurn = true


    // askForState is a promise
    // a promise is a mechanism for handling asynchronisity, aka something that we don't know when it's going to finish
    const askForState = axios.get('http://localhost:3000/get-state')
    // you use the .then in order to prevent moving on before we have the results from the Promise
    askForState.then((response) => {
        const currentState: ServerState = response.data.state
        if (currentState.whoseTurn === state.myColor) {
            state.myTurn = true
            clearInterval(timer)
            alert('It\'s my turn!')

        }

    })
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
        responsePromise.then(({ data }) => {
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
