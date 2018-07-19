import { mapReducers } from 'redux-map-reducers'

import {
  decrementClock,
  resetClock,
  startClock,
  stopClock,
} from '../actions/clock-actions'

const INITIAL_STATE = {
  minutes: 25,
  seconds: 0,
  isRunning: false,
}

export default mapReducers({
  [decrementClock]: _decrementClock,
  [resetClock]: _resetClock,
  [startClock]: _startClock,
  [stopClock]: _stopClock,
}, INITIAL_STATE)


function _resetClock(state, { payload }) {
  return {
    ...INITIAL_STATE,
  }
}

function _startClock(state, { payload }) {
  return {
    ...state,
    isRunning: true,
  }
}

function _stopClock(state, { payload }) {
  return {
    ...state,
    isRunning: false,
  }
}

function _decrementClock(state, { payload }) {
  if ( state.minutes === 0 && state.seconds === 0 ) {
    return _stopClock(...arguments)
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
