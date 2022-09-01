const ROWS = 9;
const COLS = 9;

console.log('hello world')
buildBoardMarkup()

function buildBoardMarkup() {
    const boardDiv = document.getElementById('board')
    console.log(boardDiv)

    for(let row = 0; row < ROWS; row++) {
        for(let col = 0; col < COLS; col++) {
            const cellDiv = document.createElement('cell');
            cellDiv.id = `c${row}${col}`
            boardDiv.appendChild(cellDiv)
        }
    }
}