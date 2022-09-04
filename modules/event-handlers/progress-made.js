export function progressMade(event, context) {
    console.log('handling progressMade');

    event.progressedCells.forEach(pCell => {
        // update/style value
        if(pCell.valueProgressed !== 0) {
            const cellDiv = document.getElementById(`c${pCell.id}`)
            const valueDiv = document.getElementById(`c${pCell.id}v`)
            event.revertActions.push(() => {
                cellDiv.classList.remove('solved')
                valueDiv.classList.remove('progressed-value')
            })

            cellDiv.classList.add('solved')
            valueDiv.classList.add('progressed-value')
        }

        // update/style notes
        pCell.notesProgressed.forEach(pNote => {
            const noteDiv = document.getElementById(`c${pCell.id}n${pNote}`)
            event.revertActions.push(() => {
                noteDiv.classList.remove('eliminated')
                noteDiv.classList.remove('progressed-note')
            })

            noteDiv.classList.add('eliminated')
            noteDiv.classList.add('progressed-note')
        })
    })
}