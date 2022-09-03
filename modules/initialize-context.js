let context = {}

// initialize cell metrics
for(let row = 0; row < 9; row++) {
    for(let col = 0; col < 9; col++) {
        const cellId = `${row}${col}`
        context[cellId] = {
            valueReads: 0,
            notesReads: 0,
            coordinatesReads: 0
        }
    }
}

export { context }