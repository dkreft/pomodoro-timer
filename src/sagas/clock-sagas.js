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
} from 'actions/clock-actions'

// Time warped to make demo'ing less painful
const CLOCK_DELAY_MS = 1000 / 60


export default [
  call(takeEvery, `${ startClock }`, startClockSaga),
]

/**
 * @private
 *
 * NOTE: Only exported to facilitate testing
 */
export function* startClockSaga() {
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

/**
 * @private
 *
 * NOTE: Only exported to facilitate testing
 */
// TODO: Use reselect
export function isTimeUpSelector({ clock }) {
  return clock.timesUp
}

/**
 * @private
 *
 * NOTE: Only exported to facilitate testing
 */
// TODO: Use reselect
export function isStoppedSelector({ clock }) {
  return !clock.isRunning
}
