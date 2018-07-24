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
  timesUp,
} from '../actions/clock-actions'

// Time warped to make demo'ing less painful
const CLOCK_DELAY_MS = 1000 / 60

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

// TODO: Use reselect (maybe...might not be worth it here)
function isStoppedSelector({ clock }) {
  return !clock.isRunning
}
