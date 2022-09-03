export function setCellValue(event, cellId, cellValue) {
    const cellDiv = document.getElementById(cellId)
    event.revertActions.push(() => cellDiv.classList.remove('solved'))
    cellDiv.classList.add('solved')

    const cellValueDiv = document.getElementById(`${cellId}v`)
    const oldCellValue = cellValueDiv.innerText;
    event.revertActions.push(() => cellValueDiv.innerText = oldCellValue )
    cellValueDiv.innerText = cellValue
}
