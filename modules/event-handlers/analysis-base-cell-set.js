export function analysisBaseCellSet(event, context) {
    console.log('handling analysisBaseCellSet')

    const cellDiv = document.getElementById(`c${event.cell}`)

    event.revertActions.push(() => {
        cellDiv.classList.remove('analysis-base-cell')
    })

    cellDiv.classList.add('analysis-base-cell');
}