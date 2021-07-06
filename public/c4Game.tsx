
import * as React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { BrowserState, Move, ClientNumber, JoinResponse } from '../types/index'


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

const Board = ({ state, setState, makeAMove }) => {

    const boardStyle = {
        width: config.boardWidth,
        height: (config.baseUnit * 6) + 'px',
        maxWidth: (config.baseUnit * 7) + 'px',
        display: 'flex',
        border: '1px black solid'
    }
    const filledColumns = fillerUp(state.columns)
    const Columns = filledColumns.map((column, index) => {
        return <Column pieceArray={column} whichColumn={index} setState={setState} state={state} makeAMove={makeAMove}></Column>
    })
    return <div style={boardStyle}>
        {Columns}
    </div>
}

const Column = ({ pieceArray, whichColumn, setState, state, makeAMove }) => {
    const columnStyle = {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        border: 'solid 1px black'
    }

    // 1. What type is clickChoice?  A function
    // 2. When do you want the desired event to happen? What should trigger it?  when a user clicks a gamepiece.
    // 3. When the event is triggered, what exactly do you want to happen? makeAMove should fire with the users choice as the input

    const GamePieces = pieceArray.map((gamePiece) => {
        return <GamePiece color={gamePiece} ></GamePiece>
        // I want to see if "whichPiece" = the piece that was clicked.  If it is, the I want "makeAMove" 
        // to be called, feeding it with the piece that was clicked


    })

    const clickChoice = async () => {
        await makeAMove(whichColumn, state)
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



const View = () => {
    const [state, setState] = React.useState<BrowserState>()

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


    // How to manage two promises and get them at once
    // const fun = async () => {
    //     const requestOneP =  axios.get('xyz')
    //     const requestTwoP =  axios.get('abc')
    //     const results = await Promise.all([requestOneP, requestTwoP])
    //     return results
    // }

    const checkIn = async (gameId: number, myColor: Color) => {
        // uses axios to post {gameId: number, color: 'red' | black'} to the server's /check-in endpoint
        const askForState = axios.post('http://localhost:3000/get-state', { gameId, myColor })
        console.log(1)
        const response = await askForState
        // askForState is a promise
        // a promise is a mechanism for handling asynchronisity, aka something that we don't know when it's going to finish
        // you use the .then in order to prevent moving on before we have the results from the Promise

        const currentState: BrowserState = response.data.state

        if (isItMyTurn(currentState) === true) {
            clearInterval(timer)
            alert('It\'s my turn!')
            setState(currentState)
        }

    }



    // when you make a move it's not automatically updating for the other person

    const makeAMove = async (columnNumber: number, state: BrowserState) => {
        const myTurn = isItMyTurn(state)
        let newState
        if (myTurn === true) {
            const responsePromise = axios.post('http://localhost:3000/make-a-move', { columnNumber, userId: state.userId, gameId: state.gameId })

            // response looks like 
            //{
            //     message: 'okay :)',
            //     moves: state.moves
            // }

            const { data } = await responsePromise
            newState = data
            // starts a setInterval, in which checkIn is called.
            clearInterval(timer)
            timer = setInterval(() => {

                //START HERE: something breaking here. newState is undefined.
                checkIn(newState.gameId, newState.myColor)
            }, 3000)
            setState(data.state)
        }

        //do you also need other browser to return newState separately? 

    }



    // const reset = (state) => {
    //     // resets state to initial state
    //     state = {
    //         gameId: 0,
    //         myColor: 'red',
    //         myTurn: false,
    //         moves: []
    //     }
    //     return state
    // }

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

    const startGame = async () => {
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

        console.log(response.data)
        const newState = response.data
        if (!isItMyTurn(newState)) {
            timer = setInterval(() => {
                checkIn(newState.gameId, newState.myColor)
            }, 3000)
        }
        return newState
    }

    let Thing

    if (state) {
        Thing = <div>
            <div> color: {state.myColor} </div>
            <div> whose turn: {state.whoseTurn} </div>
            <Board state={state} setState={setState} makeAMove={makeAMove}></Board>
        </div>
    } else {
        Thing = <div></div>
    }

    const start = async () => {
        const newState = await startGame()


        setState(newState)
    }


    const viewStyle = {}
    return <div style={viewStyle}>
        <button onClick={start}>Start</button>
        {Thing}
    </div>
}


ReactDOM.render(<View></View>, document.getElementById('root')); //putting 'element' inside of 'root' element.  

