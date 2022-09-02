import { buildBoardMarkup } from './modules/build-board-markup.mjs'
import { log } from './modules/log.mjs'

const events = JSON.parse(log);
let eventsCursor = -1;

buildBoardMarkup()
bindButtons()

function applyEvent(event) {
    const { hints } = event
    for(let hintIdx = 0; hintIdx < hints.length; hintIdx++) {
        const hint = hints[hintIdx]
        if (hint !== "0") {
            const rowId = Math.floor(hintIdx/9)
            const colId = hintIdx % 9
            const cellId = `c${rowId}${colId}`
            setCellValue(cellId, hint);
        }
    }
}

function revertEvent(event) {
    //pu@ while I'm applying an event, build up an array of revert functions/params to call to revert
}

function setCellValue(cellId, cellValue) {
    const cellDiv = document.getElementById(cellId)
    cellDiv.classList.add('solved')

    const cellValueDiv = document.getElementById(`${cellId}v`)
    cellValueDiv.innerText = cellValue
}

function stepForward() {
    eventsCursor++
    applyEvent(events[eventsCursor])
    updateButtons()
}

function stepBackward() {
    revertEvent(events[eventsCursor])
    eventsCursor--
    updateButtons()
}

function updateButtons() {
    // Update "Step Backward" button
    if (eventsCursor === -1) {
        document.getElementById('stepBackward').setAttribute('disabled', 'true')
    } else {
        document.getElementById('stepBackward').removeAttribute('disabled')
    }

    // Update "Step Forward" button
    if (eventsCursor === (events.length - 1)) {
        document.getElementById('stepForward').setAttribute('disabled', 'true')
    } else {
        document.getElementById('stepForward').removeAttribute('disabled')
    }
}

function bindButtons() {
    document.getElementById('stepForward').onclick = stepForward
    document.getElementById('stepBackward').onclick = stepBackward
    updateButtons();
}
