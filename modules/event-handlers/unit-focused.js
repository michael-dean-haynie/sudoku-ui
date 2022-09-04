export function unitFocused(event, context) {
    console.log('handling unit-focused')

    const { unit } = event;
    const [ unitType, unitNumber ] = unit;
    const cellDivs = [];

    // unit is a row
    if (unitType === 'r') {
       for(let i = 0; i < 9; i++) {
           cellDivs.push(document.getElementById(`c${unitNumber}${i}`))
       }
    }

    // unit is a column
    else if (unitType === 'c') {
        for(let i = 0; i < 9; i++) {
            cellDivs.push(document.getElementById(`c${i}${unitNumber}`))
        }
    }

    // unit is a block
    else if (unitType === 'b') {
        const startRow = Math.floor(unitNumber/3) * 3
        const startCol = (unitNumber % 3) * 3
        for(let row = startRow; row < startRow + 3; row++) {
            for(let col = startCol; col < startCol + 3; col++) {
                cellDivs.push(document.getElementById(`c${row}${col}`))
            }
        }
    }

    event.revertActions.push(() => {
        cellDivs.forEach(cellDiv => {
            cellDiv.classList.remove('focused-unit')
        })
    })

    cellDivs.forEach(cellDiv => {
        cellDiv.classList.add('focused-unit')
    })


}