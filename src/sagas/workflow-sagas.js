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
  resetClock,
  startClock,
  stopClock,
  timesUp,
} from '../actions/clock-actions'

import {
  startWork,
} from '../actions/workflow-actions'

const TASK_TIME = {
  minutes: 25,
  seconds: 0,
}

// Spec calls for 3 - 5 minutes
const SHORT_BREAK_TIME = {
  minutes: 4,
  seconds: 0,
}

// Spec calls for 15 - 30 minutes
const LONG_BREAK_TIME = {
  minutes: 20,
  seconds: 0,
}

export default [
  takeEvery(`${ startWork }`, startTaskSaga)
]

function* startTaskSaga() {
  let prevTaskIdx

  while ( true ) {
    const currentTaskIdx = yield select(nextTaskSelector)

    if ( currentTaskIdx == null || prevTaskIdx === currentTaskIdx ) {
      console.log('No more tasks left to tackle')
      break
    }

    prevTaskIdx = currentTaskIdx

    yield restartClockAndWaitForTimesUp(TASK_TIME)

    const isLast = yield isLastTask(currentTaskIdx)
    if ( isLast ) {
      console.log('LAST TASK')
      break
    }

    const taskNumber = currentTaskIdx + 1
    const breakTime = ( taskNumber % 4 === 0 ) ? LONG_BREAK_TIME : SHORT_BREAK_TIME

    yield restartClockAndWaitForTimesUp(breakTime)
  }
}

function* restartClockAndWaitForTimesUp(time) {
  yield put(resetClock(time))
  yield put(startClock())
  
  yield take(`${ timesUp }`)
}

function* isLastTask(currentTaskIdx) {
  const lastTaskIdx = yield select(lastTaskIdxSelector)

  return lastTaskIdx === currentTaskIdx
}

function lastTaskIdxSelector({ tasks }) {
  return ( tasks.length ) ? tasks.length - 1 : void 0
}

function nextTaskSelector({ tasks }) {
  if ( !tasks.length ) {
    return
  }

  return tasks.findIndex((task) => !task.complete)
}
