export function cellInspected(event, context) {
    console.log('handling cell-inspected')

    const cellDiv = document.getElementById(`c${event.cell}`)
    const otherInspectedCells = document.querySelectorAll('.inspected-cell');

    // setup revert
    event.revertActions.push(() => {
        otherInspectedCells.forEach(cellDiv => {
            cellDiv.classList.add('inspected-cell')
        })
        cellDiv.classList.remove('inspected-cell')
    })

    // take action

    otherInspectedCells.forEach(cellDiv => {
        cellDiv.classList.remove('inspected-cell')
    })
    cellDiv.classList.add('inspected-cell');
}