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
    boardWidth: 1000,
    boardHeight: 1000,
    gamePieceDiameter: 100
}


const Board = ({rows}) => {
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
    const gamePieces = pieceArray.map((gamePiece) => {
        return <GamePiece color={gamePiece}></GamePiece>
    })

    return <div style={rowStyle} className="row">
        {gamePieces}
    </div>
}

const GamePiece = ({color}) => {
    const style = {
        width: config.gamePieceDiameter + 'px',
        height: config.gamePieceDiameter + 'px',
        background: color,
        flexDirection: 'center',
    }
    return <div style={style} classname="gamePiece">

    </div>
}
const arg = [
    ['red', 'black', null, 'red', null, null, null],
    ['black', 'black', 'red', 'black', 'red', null, 'black'],
    ['black', 'red', 'black', 'black', 'black', null, 'black'],
    ['black', 'red', 'red', 'red', 'black', 'red', 'red'],
    ['red', 'black', 'red', 'black', 'black', 'red', 'black'],
    ['black', 'red', 'black', 'red', 'red', 'black', 'black'],
]

ReactDOM.render(<Board rows={arg}></Board>, document.getElementById('root')); //putting 'element' inside of 'root' element.  
