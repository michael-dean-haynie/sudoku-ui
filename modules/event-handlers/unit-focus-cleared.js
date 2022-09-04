export function unitFocusCleared(event, context) {
    console.log('handling unit-focus-cleared')

    // focused unit cells
    const focusedUnitDivs = document.querySelectorAll('.focused-unit')
    event.revertActions.push(() => {
        focusedUnitDivs.forEach(div => {
            div.classList.add('focused-unit')
        })
    })

    focusedUnitDivs.forEach(div => {
        div.classList.remove('focused-unit')
    })

    // inspected cells
    const inspectedDivs = document.querySelectorAll('.inspected-cell')
    event.revertActions.push(() => {
        inspectedDivs.forEach(div => {
            div.classList.add('inspected-cell')
        })
    })

    inspectedDivs.forEach(div => {
        div.classList.remove('inspected-cell')
    })
}