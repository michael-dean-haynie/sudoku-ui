import { buildBoardMarkup } from './modules/build-board-markup.js'
import { log } from './modules/log.js'
import { context } from './modules/initialize-context.js'
import { eventHandlers } from './modules/event-handlers/event-handlers.js'

const events = JSON.parse(log)
let cursor = -1
let rewindPausePlay = 'pause'
let rewindPlayIntervalId
let rewindPlayInterval = 100

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

function stepForward() {
    if(cursor !== events.length -1) {
        cursor++
        applyEvent(events[cursor], context)
    }
    if(cursor === events.length -1) {
        pause()
    }
    updateButtons()
}

function stepBackward() {
    if(cursor !== -1) {
        revertEvent(events[cursor])
        cursor--
    }
    if(cursor === -1) {
        pause()
    }
    updateButtons()
}

function rewind() {
    rewindPausePlay = 'rewind'
    rewindPlayIntervalId = setInterval(stepBackward, rewindPlayInterval)
    stepBackward() // start first one immediately
}

function pause() {
    rewindPausePlay = 'pause';
    if(rewindPlayIntervalId) {
        clearInterval(rewindPlayIntervalId);
        rewindPlayIntervalId = null;
        updateButtons()
    }
}

function play() {
    rewindPausePlay = 'play'
    rewindPlayIntervalId = setInterval(stepForward, rewindPlayInterval)
    stepForward() // start first one immediately
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

}

function bindButtons() {
    document.getElementById('stepForward').onclick = stepForward
    document.getElementById('stepBackward').onclick = stepBackward
    document.getElementById('rewind').onclick = rewind
    document.getElementById('pause').onclick = pause
    document.getElementById('play').onclick = play
    updateButtons();
}
