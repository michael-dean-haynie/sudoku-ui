export function cellContributed(event, context) {
    console.log('handling cell-contributed')

    const cellDiv = document.getElementById(`c${event.cell}`)

    // highlight cell
    event.revertActions.push(() => {
        cellDiv.classList.remove('contributing-cell')
    })

    cellDiv.classList.add('contributing-cell')

    // highlight value
    if(event.valueContributed) {
        const valueDiv = document.getElementById(`c${event.cell}v`)
        event.revertActions.push(() => {
            valueDiv.classList.remove('contributing-value')
        })

        valueDiv.classList.add('contributing-value')
    }


    // highlight notes
    // TODO
}