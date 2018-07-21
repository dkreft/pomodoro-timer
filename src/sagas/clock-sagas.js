import {
  delay,
} from 'redux-saga'

import {
  call,
  put,
  race,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects'

import {
  decrementClock,
  startClock,
  stopClock,
  timesUp,
} from '../actions/clock-actions'

// TODO: Set this back to 1000
const CLOCK_DELAY_MS = 10 //1000

export default [
  takeEvery(`${ startClock }`, startClockSaga),
]


function* startClockSaga() {
  while ( true ) {
    yield call(delay, CLOCK_DELAY_MS)

    const isStopped = yield select(isStoppedSelector)
    if ( isStopped ) {
      break
    }

    yield put(decrementClock())

    const timeIsUp = yield select(isTimeUpSelector)

    if ( timeIsUp ) {
      yield put(timesUp())
      break
    }
  }
}

function isTimeUpSelector({ clock }) {
  return clock.timesUp
}

// TODO: Use reselect
function isStoppedSelector({ clock }) {
  return !clock.isRunning
}
