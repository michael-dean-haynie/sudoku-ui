import { buildBoardMarkup } from './modules/build-board-markup.mjs'
import { log } from './modules/log.mjs'

const events = JSON.parse(log);
const revertActions = [];
let eventsCursor = -1;

buildBoardMarkup()
bindButtons()

function applyEventById(eventId) {
    revertActions[eventId] = []
    const { hints } = events[eventId]
    for(let hintIdx = 0; hintIdx < hints.length; hintIdx++) {
        const hint = hints[hintIdx]
        if (hint !== "0") {
            const rowId = Math.floor(hintIdx/9)
            const colId = hintIdx % 9
            const cellId = `c${rowId}${colId}`
            setCellValue(eventId, cellId, hint)
        }
    }
}

function revertEventById(eventId) {
    revertActions[eventId].forEach(action => action());
}

function setCellValue(eventId, cellId, cellValue) {
    const cellDiv = document.getElementById(cellId)
    revertActions[eventId].push(() => cellDiv.classList.remove('solved'))
    cellDiv.classList.add('solved')

    const cellValueDiv = document.getElementById(`${cellId}v`)
    const oldCellValue = cellValueDiv.innerText;
    revertActions[eventId].push(() => cellValueDiv.innerText = oldCellValue )
    cellValueDiv.innerText = cellValue
}

function stepForward() {
    eventsCursor++
    applyEventById(eventsCursor)
    updateButtons()
}

function stepBackward() {
    revertEventById(eventsCursor)
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
