import { buildBoardMarkup } from './modules/build-board-markup.js'
import { log } from './modules/log.js'
import { context } from './modules/initialize-context.js'
import { eventHandlers } from './modules/event-handlers/event-handlers.js'

const events = JSON.parse(log)
let cursor = -1;

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
    cursor++
    applyEvent(events[cursor], context)
    updateButtons()
}

function stepBackward() {
    revertEvent(events[cursor])
    cursor--
    updateButtons()
}

function updateButtons() {
    // Update "Step Backward" button
    if (cursor === -1) {
        document.getElementById('stepBackward').setAttribute('disabled', 'true')
    } else {
        document.getElementById('stepBackward').removeAttribute('disabled')
    }

    // Update "Step Forward" button
    if (cursor === (events.length - 1)) {
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
