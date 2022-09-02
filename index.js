import { buildBoardMarkup } from './modules/build-board-markup.mjs'
import { log } from './modules/log.mjs'

buildBoardMarkup()

const events = JSON.parse(log);
events.forEach(event => {
    playEvent(event)
})

function playEvent(event) {
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

function setCellValue(cellId, cellValue) {
    const cellDiv = document.getElementById(cellId)
    cellDiv.classList.add('solved')

    const cellValueDiv = document.getElementById(`${cellId}v`)
    cellValueDiv.innerText = cellValue
}