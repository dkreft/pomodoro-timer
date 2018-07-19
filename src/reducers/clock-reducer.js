import { mapReducers } from 'redux-map-reducers'

import {
  decrementClock,
  resetClock,
} from '../actions/clock-actions'

const INITIAL_STATE = {
  minutes: 25,
  seconds: 0,
}

export default mapReducers({
  [resetClock]: _resetClock,
  [decrementClock]: _decrementClock,
}, INITIAL_STATE)


function _resetClock(state, { payload }) {
  return {
    ...INITIAL_STATE,
  }
}

function _decrementClock(state, { payload }) {
  if ( state.minutes === 0 && state.seconds === 0 ) {
    return state
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
