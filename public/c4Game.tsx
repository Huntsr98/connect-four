// HW  create a grid in the dom in JS
// create a function that takes an arguement
// that argument is an array of arrays
// each subarray has n strings or null
// each string is either the word "Red" or "Black"
//  each subarray will be a column, a column of divs in the dom
// each div will have the background color of red or black or none (in the case of a null)

import * as React from 'react';
import * as stateFunctions from '../src/state'
import ReactDOM from 'react-dom';
import { ServerState } from '../types';
import axios from 'axios'


//this is temporary stub
stateFunctions.makeAMove(stateFunctions.state.gameId, stateFunctions.state.moves[0].x, stateFunctions.state.moves[0].y, stateFunctions.state.myColor)

const config = {
    boardWidth: 750,
    boardHeight: 750,
    gamePieceDiameter: 75,
    boarderRadius: 100
}


const Board = ({ columns }) => {
    const boardStyle = {
        width: config.boardWidth + 'px',
        height: config.boardHeight + 'px',
        display: 'flex'
    }
    const columnWidth = config.boardWidth/columns.length
    const Columns = columns.map((column, index) => {
        return <Column pieceArray={column} whichColumn={index} columnWidth={columnWidth}></Column>
    })
    return <div style={boardStyle} className="board">
        {Columns}
    </div>
}
const Column = ({ pieceArray, whichColumn, columnWidth }) => {
    const columnStyle = {
        width: columnWidth + 'px',
        display: 'align-items',
        flexDirection: 'right'
    }

    // 1. What type is clickChoice?  A function
    // 2. When do you want the desired event to happen? What should trigger it?  when a user clicks a gamepiece.
    // 3. When the event is triggered, what exactly do you want to happen? makeAMove should fire with the users choice as the input

    const gamePieces = pieceArray.map((gamePiece) => {
        return  <GamePiece color={gamePiece} ></GamePiece> 
        // I want to see if "whichPiece" = the piece that was clicked.  If it is, the I want "makeAMove" 
        // to be called, feeding it with the piece that was clicked


    })
    
    const clickChoice = () => {
        // do I need the const key or IF statement?
        // if (key === clickChoice) {
            // let choice = key
            stateFunctions.makeAMove(whichColumn)
        // }
    }
    return <div style={columnStyle} className="column" onClick={clickChoice} >
        {gamePieces}
    </div>
}

const GamePiece = ({ color }) => {
    const gamePieceStyle = {
        width: config.gamePieceDiameter + 'px',
        height: config.gamePieceDiameter + 'px',
        background: color,
        flexDirection: 'center',
        borderRadius: config.boarderRadius + 'px'
    }

    return <div style={gamePieceStyle} className="gamePiece" >
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

// HW 2/18
// when the user clicks on a column of the board, we want makeAMove to fire with the appropriate arguements 
// hint:  when creating the divs, some will get "on click" events 
// search how to add ON CLICK to a div, specifically a gamepiece?
//

const View = () => {
    const viewStyle = {}
    return <div style={viewStyle}>
        <button onClick={startGame}>Start</button>
        <Board columns={arg}></Board>
    </div>
}

const startGame = async () => {
    // call to API
    const response = await axios.post('http://localhost:3000/reset')
    // load response into local state
    debugger
    console.log(response.data.message)
    stateFunctions.updateState({
        type: "reset", 
        payload: response.data.state
    })

}
ReactDOM.render(<View></View>, document.getElementById('root')); //putting 'element' inside of 'root' element.  

