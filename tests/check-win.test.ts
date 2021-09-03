import { checkForFour, getWinningColor } from "../server/check-win"

// fixtures
let boardAcross = [
    ['red',],
    ['black'],
    ['black', 'red'],
    [],
    ['red', 'black', 'red'],
    ['black', 'black'],
    []
];
let boardDown = [
    ['red',],
    ['black'],
    ['black', 'red'],
    ['black', 'black', 'black', 'black'],
    ['red', 'black', 'red'],
    ['black', 'black', 'red', 'black', 'red'],
    []
];
let boardDiagonalR = [
    ['red', 'black'],
    ['black', 'red'],
    ['black', 'black', 'red'],
    ['red', 'red', 'black', 'red'],
    ['red', 'black', 'red', 'black'],
    ['black', 'black'],
    []
];
let boardDiagonalL = [
    ['red',],
    ['black'],
    ['black', 'red', 'black', 'black'],
    ['red', 'red', 'black', 'red'],
    ['red', 'black', 'red'],
    ['black', 'black'],
    []
];
let boardNoWin = [
    ['red',],
    ['black'],
    ['black', 'red'],
    [],
    ['red', 'black', 'red'],
    ['black', 'black'],
    []
];


// pass
describe('checkForFour', () => {
    it('should find four in a row', () => {
        const result = checkForFour(boardDown[3])
        expect(result).toEqual('black')
    })
    it('should not find four in a row', () => {
        const result = checkForFour(boardDown[5])
        expect(result).toEqual(null)
    })
})


describe('getWinningColor', () => { 
    it('should find a winning diagonal', () => {
        const result = getWinningColor(boardDiagonalR,3)
        // put inputs in for getWinningColor to make it pass the test
        expect(result).toEqual('red')
    })
    it('should find a winning diagonal', () => {
        const result = getWinningColor(boardDiagonalL,2)
        // put inputs in for getWinningColor to make it pass the test
        expect(result).toEqual('black')
    })
    it('should find a winning across', () => {
        const result = getWinningColor(boardAcross, 1)
        expect(result).toEqual(null)
    })
    it('should find a winning down', () => {
        const result = getWinningColor(boardDown, 3)
        expect(result).toEqual('black')
    })
    it('should not find a winner', () => {
        const result = getWinningColor(boardNoWin, 0)
        expect(result).toEqual(null)
    })
})

//fix the tests, make them all pass. 


