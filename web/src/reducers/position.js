// action
const UPDATE_REMOTE_RESOLUTION = "UPDATE_REMOTE_RESOLUTION"
const UPDATE_REMOTE_MOUSE = "UPDATE_REMOTE_MOUSE"
const SCREEN_RESIZE = "SCREEN_RESIZE"

// mouse and window size calculation
export let position = {
    height: 0,
    width: 0,
    remoteWidth: 0,
    remoteHeight: 0,
    remoteMouseX: 0,
    remoteMouseY: 0,
    canvasWidth: 0,
    canvasHeight: 0,
    canvasTop: 0,
    canvasLeft: 0,
}

function updateRemoteResolutionFunc(state, width, height) {
    state.remoteWidth = width
    state.remoteHeight = height
    // recalculate canvas area and position
    screenResizeFunc(state, state.width, state.height)
}

function updateRemoteMouseFunc(state, x, y) {
    const relaX = x - state.canvasLeft
    const relaY = y - state.canvasTop
    state.remoteMouseX = (relaX * state.remoteWidth / state.canvasWidth).toFixed(0)
    state.remoteMouseY = (relaY * state.remoteHeight / state.canvasHeight).toFixed(0)
}

function screenResizeFunc(state, width, height) {
    state.height = height
    state.width = width

    // calc canvas area and position
    let w = width
    let h = height
    if (height / width < state.remoteHeight / state.remoteWidth) {
        w = (h * state.remoteWidth / state.remoteHeight).toFixed(0)
        let offset = w - width
        offset = offset < 0 ? -offset : offset
        const px = (offset / 2).toFixed(0)
        state.canvasTop = 0
        state.canvasLeft = px
    } else {
        h = (w * state.remoteHeight / state.remoteWidth).toFixed(0)
        let offset = h - height
        offset = offset < 0 ? -offset : offset
        const px = (offset / 2).toFixed(0)
        state.canvasTop = px
        state.canvasLeft = 0
    }
    state.canvasHeight = h
    state.canvasWidth = w
}

function actionFunc(type, args) {
    return { type: type, data: args }
}

export const positionCalcultion = (state = position, action) => {
    const data = action.data
    let cloneState = Object.assign({}, state, data.x, data.y)
    switch (action.type) {
        case UPDATE_REMOTE_RESOLUTION:
            updateRemoteResolutionFunc(cloneState, data.width, data.height)
            break;
        case UPDATE_REMOTE_MOUSE:
            updateRemoteMouseFunc(cloneState, data.width, data.height)
            break;
        case SCREEN_RESIZE:
            screenResizeFunc(cloneState, data.x, data.y)
            break;
        default:
            return state
    }
    return cloneState
}

export const updateRemoteResolution = args => actionFunc(UPDATE_REMOTE_RESOLUTION, args)
export const updateRemoteMouse = args => actionFunc(UPDATE_REMOTE_MOUSE, args)
export const screenResize = args => actionFunc(SCREEN_RESIZE, args)
