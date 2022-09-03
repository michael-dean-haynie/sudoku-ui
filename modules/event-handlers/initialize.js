import { setCellValue } from "../actions/set-cell-value.js";

export function initialize(event, context) {
    console.log('handling initialize event')

    const { hints } = event
    for(let hintIdx = 0; hintIdx < hints.length; hintIdx++) {
        const hint = hints[hintIdx]
        if (hint !== "0") {
            const rowId = Math.floor(hintIdx/9)
            const colId = hintIdx % 9
            const cellId = `c${rowId}${colId}`
            setCellValue(event, cellId, hint)
        }
    }
}