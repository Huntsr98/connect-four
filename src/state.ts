import React, { Component } from 'react';
import axios from 'axios';
import { updateStatement } from 'typescript';
import { ServerState } from '../types/index'

export const state: State = {
    gameId: 0,
    myColor: 'red',
    myTurn: false,
    moves: []
}

type Color = 'red' | 'black'

type State = {
    gameId: number
    myColor: Color
    myTurn: boolean
    moves: []
}

let timer

export const checkIn = async (gameId: number, myColor: Color) => {
    // uses axios to post {gameId: number, color: 'red' | black'} to the server's /check-in endpoint
    const currentState: ServerState = await axios.post('/check-in', { gameId, myColor })
    if (currentState.whoseTurn === state.myColor) {
        state.myTurn = true
        clearInterval(timer)
        alert('It\'s my turn!')
    }
}


export const makeAMove = (gameId: number, x: number, y: number, color: Color) => {
    if (state.myTurn === true) {
        axios.post('/make-a-move', { x, y, color })
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