import { buildBoardMarkup } from './modules/build-board-markup.js'
import { log } from './modules/log.js'
import { context } from './modules/initialize-context.js'
import { eventHandlers } from './modules/event-handlers/event-handlers.js'

const events = JSON.parse(log)
let cursor = -1
let rewindPausePlay = 'pause'
let rewindPlayIntervalId
let rewindPlayInterval = 500
let intervalChangedFlag = false

buildBoardMarkup()
bindButtons()

function applyEvent(event, context) {
    event.revertActions = []
    const eventType = event.type
    eventHandlers[eventType](event, context)
}

function revertEvent(event) {
    event.revertActions.forEach(action => action());
}

function stepBackward() {
    // proceed (if not at the beginning)
    if(cursor !== -1) {
        revertEvent(events[cursor])
        cursor--

        // pause if we've reached the beginning
        if(cursor === -1) {
            pause()
        }

        // otherwise, update interval if needed
        else if (rewindPlayIntervalId && intervalChangedFlag) {
            intervalChangedFlag = false
            clearInterval(rewindPlayIntervalId)
            rewindPlayIntervalId = null
            rewind(false)
        }
    }

    // always update buttons/sliders
    updateButtons()
}

function stepForward() {
    // proceed (if not at the end)
    if(cursor !== events.length -1) {
        cursor++
        applyEvent(events[cursor], context)

        // pause if we've reached the end
        if(cursor === events.length -1) {
            pause()
        }

        // otherwise, update interval if needed
        else if (rewindPlayIntervalId && intervalChangedFlag) {
            intervalChangedFlag = false
            clearInterval(rewindPlayIntervalId)
            rewindPlayIntervalId = null
            play(false)
        }
    }

    // always update buttons/sliders
    updateButtons()
}

function rewind(startImmediately = true) {
    rewindPausePlay = 'rewind'
    rewindPlayIntervalId = setInterval(stepBackward, rewindPlayInterval)
    if (startImmediately) {
        stepBackward() // start first one immediately
    }
}

function pause() {
    rewindPausePlay = 'pause';
    if(rewindPlayIntervalId) {
        clearInterval(rewindPlayIntervalId);
        rewindPlayIntervalId = null;
        updateButtons()
    }
}

function play(startImmediately = true) {
    rewindPausePlay = 'play'
    rewindPlayIntervalId = setInterval(stepForward, rewindPlayInterval)
    if (startImmediately) {
        stepForward() // start first one immediately
    }
}

function updatePlaySpeed(event) {
    rewindPlayInterval = 1000 - parseInt(event.target.value);
    if(rewindPlayIntervalId) {
        intervalChangedFlag = true

    }
}

function handleScrubEvent(event) {
    const scrubTo = parseInt(event.target.value)
    console.log('handling scrub event', { event, value: scrubTo })
    if(scrubTo !== cursor) {
        scrub(scrubTo)
    }
}

function scrub(scrubTo) {
    while(cursor !== scrubTo) {
        console.log('scrubbing:', { scrubTo, cursor })
        if (scrubTo < cursor) {
            stepBackward()
        } else if (cursor < scrubTo) {
            stepForward()
        }
    }
}

function updateButtons() {
    // Update "Step Backward" button
    if (cursor === -1 || rewindPausePlay !== 'pause') {
        document.getElementById('stepBackward').setAttribute('disabled', 'true')
    } else {
        document.getElementById('stepBackward').removeAttribute('disabled')
    }

    // Update "Step Forward" button
    if (cursor === (events.length - 1) || rewindPausePlay !== 'pause') {
        document.getElementById('stepForward').setAttribute('disabled', 'true')
    } else {
        document.getElementById('stepForward').removeAttribute('disabled')
    }

    // Update "Rewind" button
    if(rewindPausePlay !== 'pause' || cursor === -1) {
        document.getElementById('rewind').setAttribute('disabled', 'true')
    } else {
        document.getElementById('rewind').removeAttribute('disabled')
    }

    // update "Pause" button
    if(rewindPausePlay === 'pause') {
        document.getElementById('pause').setAttribute('disabled', 'true')
    } else {
        document.getElementById('pause').removeAttribute('disabled')
    }

    // update "Play" button
    if(rewindPausePlay !== 'pause' || cursor === (events.length -1)) {
        document.getElementById('play').setAttribute('disabled', 'true')
    } else {
        document.getElementById('play').removeAttribute('disabled')
    }

    // update scrub range input
    if(rewindPausePlay !== 'pause') {
        document.getElementById('scrub').setAttribute('disabled', 'true')
    } else {
        document.getElementById('scrub').removeAttribute('disabled')
    }
    document.getElementById('scrub').value = cursor
}

function bindButtons() {
    document.getElementById('stepForward').onclick = stepForward
    document.getElementById('stepBackward').onclick = stepBackward
    document.getElementById('rewind').onclick = rewind
    document.getElementById('pause').onclick = pause
    document.getElementById('play').onclick = play
    updateButtons();

    // also bind/initialize range inputs (sliders)
    document.getElementById('playSpeed').oninput = updatePlaySpeed

    document.getElementById('scrub').setAttribute('max', (events.length - 1).toString())
    document.getElementById('scrub').oninput = handleScrubEvent
}
