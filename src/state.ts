import React, { Component } from 'react';
import axios from 'axios';
import { ServerState, Move, ClientNumber, JoinResponse, BrowserState, GameState } from '../types/index'
import { STATUS_CODES } from 'http';


export let state: BrowserState

export const getState = (): BrowserState => state

export const updateState = ({ type, payload }: { type: string, payload: BrowserState }) => {
    if (type === "join") {
        state = payload
        state.userId = payload.userId
    }
    console.log(state)
    return state
}

type Color = 'red' | 'black'

type State = {
    gameId: number
    userId: string | null
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


export const makeAMove = async (columnNumber: number) => {
    const myTurn = isItMyTurn(state)
    if (myTurn === true) {
        const responsePromise = axios.post('http://localhost:3000/make-a-move', { columnNumber, userId: state.userId, gameId: state.gameId })

        // response looks like 
        //{
        //     message: 'okay :)',
        //     moves: state.moves
        // }
        debugger
        const { data } = await responsePromise
    // TASK: updateSTate with data.state and cause a rerender

        // starts a setInterval, in which checkIn is called.
        debugger
        timer = setInterval(() => {
            checkIn(state.gameId, state.myColor)
        }, 3000)
        state.columns = data.columns
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

// {
//     userId: UserId,
//     myColor: PieceColor
//     columns: [Column, Column, Column, Column, Column, Column, Column],
//     boardDimension: {
//         x: number,
//         y: number
//     },
//     whoseTurn: PieceColor,
//     gameId: number,
//     client: ClientNumber,
// }


const isItMyTurn = (state: BrowserState): boolean => {
    return (state.whoseTurn === state.myColor)
}

export const startGame = async () => {
    const userId = localStorage.getItem('userId')
    // call to API
    // our response will look like: { data: BrowserState }
    let url: string
    if (!userId) {
        url = `http://localhost:3000/join`
    }
    else {
        url = `http://localhost:3000/join?userId=${userId}`
    }
    const response: JoinResponse = await axios.get(url)
    // saves userId on local storage, which we got from response.data
    localStorage.setItem('userId', response.data.userId)
    // load response into local state
    debugger
    console.log(response.data)
    updateState({
        type: "join",
        payload: response.data
    })

}