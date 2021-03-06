import { mapReducers } from 'redux-map-reducers'

import {
  decrementClock,
  resetClock,
  startClock,
  stopClock,
} from '../actions/clock-actions'

const INITIAL_STATE = {
  minutes: 0,
  seconds: 0,
  isRunning: false,
  timesUp: false,
}

export default mapReducers({
  [decrementClock]: _decrementClock,
  [resetClock]: _resetClock,
  [startClock]: _startClock,
  [stopClock]: _stopClock,
}, INITIAL_STATE)


function _resetClock(state, { payload }) {
  const { minutes, seconds } = payload

  const newState = { ...INITIAL_STATE }

  if ( minutes != null ) {
    newState.minutes = minutes
  }

  if ( seconds != null ) {
    newState.seconds = seconds
  }

  return newState
}

function _startClock(state, { payload }) {
  return {
    ...state,
    isRunning: true,
  }
}

function _stopClock(state, { payload } = {}) {
  // TODO: Switch out the timesUp datum with a selector (reselect)?
  const { timesUp } = (payload || {})

  return {
    ...state,
    isRunning: false,
    timesUp: Boolean(timesUp),
  }
}

function _decrementClock(state, { payload }) {
  if ( state.minutes === 0 && state.seconds === 0 ) {
    return _stopClock(state, {
      payload: {
        timesUp: true,
      },
    })
  }

  // TODO: This seems kinda janky. I'm not fond of the use
  // of `let` here.
  let seconds
  let minutes
  if ( state.seconds === 0 ) {
    seconds = ( state.minutes > 0 ) ? 59 : 0
    minutes = Math.max(state.minutes - 1, 0)
  } else {
    seconds = Math.max(state.seconds - 1, 0)
    minutes = state.minutes
  }

  return {
    ...state,
    seconds,
    minutes,
  }
}
