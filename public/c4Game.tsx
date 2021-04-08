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

const config = {
    boardWidth: '100%',
    boarderRadius: 100,
    baseUnit: 50
}

const fillerUp = (columns) => {
    const newColumns = columns.map(column => {
        const newColumn = [...column]
        // <= is less than or equal to
        while (newColumn.length < 6) {
            newColumn.push(null)
        }
        return newColumn
    });
    return newColumns
}

const Board = ({ columns }) => {
    
    const boardStyle = {
        width: config.boardWidth,
        height: (config.baseUnit * 6) + 'px',
        maxWidth: (config.baseUnit * 7) + 'px',
        display: 'flex',
        border: '1px black solid'
    } 
    const filledColumns = fillerUp(columns)
    const Columns = filledColumns.map((column, index) => {
        return <Column pieceArray={column} whichColumn={index} ></Column>
    })
    return <div style={boardStyle}>
        {Columns}
    </div>
}
const Column = ({ pieceArray, whichColumn }) => {
    const columnStyle = {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    }

    // 1. What type is clickChoice?  A function
    // 2. When do you want the desired event to happen? What should trigger it?  when a user clicks a gamepiece.
    // 3. When the event is triggered, what exactly do you want to happen? makeAMove should fire with the users choice as the input

    const GamePieces = pieceArray.map((gamePiece) => {
        return <GamePiece color={gamePiece} ></GamePiece>
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
    return <div style={columnStyle} onClick={clickChoice} >
        {GamePieces}
    </div>
}

const GamePiece = ({ color }) => {
    const gamePieceStyle = {
        width: config.baseUnit + 'px',
        background: color,
        borderRadius: config.boarderRadius + 'px',
        flex: 1
    }

    return <div style={gamePieceStyle}>
    </div>


}
const arg = [
    ['red',],
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
    const response = await axios.post('http://localhost:3000/enterGame')
    // load response into local state
    debugger
    console.log(response.data)
    stateFunctions.updateState({
        type: "reset",
        payload: response.data
    })

}
ReactDOM.render(<View></View>, document.getElementById('root')); //putting 'element' inside of 'root' element.  

