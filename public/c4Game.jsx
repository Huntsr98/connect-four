// HW  create a grid in the dom in JS
// create a function that takes an arguement
// that argument is an array of arrays
// each subarray has n strings or null
// each string is either the word "Red" or "Black"
//  each subarray will be a row, a row of divs in the dom
// each div will have the background color of red or black or none (in the case of a null)

import * as stateFunctions from '../src/state'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'


//this is temporary stub
stateFunctions.makeAMove(stateFunctions.state.gameId, stateFunctions.state.moves[0].x, stateFunctions.state.moves[0].y, stateFunctions.state.myColor)

const config = {
    rowHeight: 300,
    rowWidth: 300,
    boardWidth: 750,
    boardHeight: 750,
    gamePieceDiameter: 75,
    boarderRadius: 100
}


const Board = ({ rows }) => {
    const boardStyle = {
        width: config.boardWidth + 'px',
        height: config.boardHeight + 'px'
    }
    const Rows = rows.map((row) => {
        return <Row pieceArray={row}></Row>
    })
    return <div style={boardStyle} className="board">
        {Rows}
    </div>
}
const Row = ({ pieceArray }) => {
    const rowStyle = {
        width: '100%',
        display: 'align-items'
    }

    // 1. What type is clickChoice?  A function
    // 2. When do you want the desired event to happen? What should trigger it?  when a user clicks a gamepiece.
    // 3. When the event is triggered, what exactly do you want to happen? makeAMove should fire with the users choice as the input

    const gamePieces = pieceArray.map((gamePiece, whichPiece) => {
        return <GamePiece color={gamePiece} key={whichPiece}></GamePiece> , whichPiece
        // I want to see if "whichPiece" = the piece that was clicked.  If it is, the I want "makeAMove" 
        // to be called, feeding it with the piece that was clicked


    })

    return <div style={rowStyle} className="row" >
        {gamePieces}
    </div>
}

const GamePiece = ({ color }) => {
    const style = {
        width: config.gamePieceDiameter + 'px',
        height: config.gamePieceDiameter + 'px',
        background: color,
        flexDirection: 'center',
        borderRadius: config.boarderRadius + 'px'
    }
    debugger
    const clickChoice = (gamePieces) => {
        const key = gamePieces.key

        if (key === clickChoice) {
            let choice = key
            makeAMove(choice)
        }
    }
    return <div style={style} className="gamePiece" >
    </div>
  

}
const arg = [
    ['red', ],
    ['black'],
    ['black', 'red'],
    [],
    ['red', 'black', 'red'],
    ['black', 'black'],
    []
]
const column = arg[2]
const piece = column[1]


ReactDOM.render(<Board rows={arg}></Board>, document.getElementById('root')); //putting 'element' inside of 'root' element.  
// HW 2/18
// when the user clicks on a column of the board, we want makeAMove to fire with the appropriate arguements 
// hint:  when creating the divs, some will get "on click" events 
// search how to add ON CLICK to a div, specifically a gamepiece?
//