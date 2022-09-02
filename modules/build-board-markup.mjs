const ROWS = 9;
const COLS = 9;
const BLOCKS = 9;
const NOTES = 9;

export function buildBoardMarkup() {
    const boardDiv = document.getElementById('board')

    for(let block = 0; block < BLOCKS; block++) {
        const blockDiv = document.createElement('div')
        blockDiv.id = `b${block}`
        blockDiv.classList.add('block')
        boardDiv.appendChild(blockDiv)
    }

    for(let row = 0; row < ROWS; row++) {
        for(let col = 0; col < COLS; col++) {
            const cellDiv = document.createElement('div')
            cellDiv.id = `c${row}${col}`
            cellDiv.classList.add('cell')
            const blockDiv = document.getElementById(getBlockIdFromCellId(cellDiv.id))
            blockDiv.appendChild(cellDiv)

            for(let note = 1; note <= NOTES; note++) {
                const noteDiv = document.createElement('div')
                noteDiv.id = `${cellDiv.id}n${note}`
                noteDiv.classList.add('note')
                noteDiv.innerText = note
                cellDiv.appendChild(noteDiv)


                // TODO: remove
                // if (cellDiv.id === 'c62' && note < 4) {
                //     noteDiv.classList.add('eliminated')
                // }
            }

            const valueDiv = document.createElement('div')
            valueDiv.id=`${cellDiv.id}v`
            valueDiv.classList.add('value')
            valueDiv.innerText = 0
            cellDiv.appendChild(valueDiv)


            // TODO: remove
            // if(cellDiv.id === 'c45') {
            //     cellDiv.classList.add('solved')
            // }
        }
    }
}

function getBlockIdFromCellId(cellId) {
    const cellRow = parseInt(cellId[1])
    const cellCol = parseInt(cellId[2])
    
    const block = 
        (Math.floor(cellRow/3) * 3) + 
        Math.floor(cellCol/3)
    
    return `b${block}`
}