export function progressFocusCleared(event, context) {
    console.log('handling progress-focus-cleared')

    // progressed-value
    const progressedValues = document.querySelectorAll('.progressed-value')
    event.revertActions.push(() => {
        progressedValues.forEach(pvDiv => {
            pvDiv.classList.add('progressed-value')
        })
    })

    progressedValues.forEach(pvDiv => {
        pvDiv.classList.remove('progressed-value')
    })


    // progressed-note
    const progressedNotes = document.querySelectorAll('.progressed-note')
    event.revertActions.push(() => {
        progressedNotes.forEach(pnDiv => {
            pnDiv.classList.add('progressed-note')
        })
    })

    progressedNotes.forEach(pnDiv => {
        pnDiv.classList.remove('progressed-note')
    })


    // contributing-cell
    const contributingCells = document.querySelectorAll('.contributing-cell')
    event.revertActions.push(() => {
        contributingCells.forEach(ccDiv => {
            ccDiv.classList.add('contributing-cell')
        })
    })

    contributingCells.forEach(ccDiv => {
        ccDiv.classList.remove('contributing-cell')
    })


    // contributing-value
    const contributingValues = document.querySelectorAll('.contributing-value')
    event.revertActions.push(() => {
        contributingValues.forEach(cvDiv => {
            cvDiv.classList.add('contributing-value')
        })
    })

    contributingValues.forEach(cvDiv => {
        cvDiv.classList.remove('contributing-value')
    })
}