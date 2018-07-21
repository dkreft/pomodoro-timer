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
  startTask,
} from '../actions/task-actions'

import {
  resetClock,
  startClock,
  stopClock,
  timesUp,
} from '../actions/clock-actions'

import {
  endBreak,
  error,
  noMoreTasks,
  startLongBreak,
  startShortBreak,
  startWork,
} from '../actions/workflow-actions'

const TASK_TIME = {
  minutes: 25,
  seconds: 0,
}

// Spec calls for 3 - 5 minutes
const SHORT_BREAK_TIME = {
  minutes: 5,
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

    if ( currentTaskIdx == null ) {
      // TODO: Pass a message along so we can display it somwehere in the UI
      console.log('No more tasks left')
      yield put(error())
      break
    }

    if ( prevTaskIdx === currentTaskIdx ) {
      console.log('The previous task was not marked complete')
      yield put(error())
      break
    }

    if ( prevTaskIdx != null ) {
      yield put(endBreak())
    }

    yield put(startTask({
      taskIdx: currentTaskIdx,
    }))

    prevTaskIdx = currentTaskIdx

    yield restartClockAndWaitForTimesUp(TASK_TIME)

    const isLast = yield isLastTask(currentTaskIdx)
    if ( isLast ) {
      yield put(noMoreTasks())
      break
    }

    const taskNumber = currentTaskIdx + 1
    const isLongBreak = ( taskNumber % 4 === 0 )
    const breakTime = ( isLongBreak ) ? LONG_BREAK_TIME : SHORT_BREAK_TIME

    if ( isLongBreak ) {
      yield put(startLongBreak())
    } else {
      yield put(startShortBreak())
    }

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

function playSound(file) {
  // TODO: This returns a promise, but it resolves when the file loads,
  // not when the file is done playing. We'd have to use a deferred object
  // and resolve it with the `onended` callback. See
  // https://stackoverflow.com/questions/30069988/how-can-i-create-a-promise-for-the-end-of-playing-sound
  //
  // We should be fine with asynchronous playback for now...it only seems
  // to be an issue when we greatly accelerate the clock or make the
  // work/reset periods too short.
  new Audio(file).play()
}

function lastTaskIdxSelector({ tasks }) {
  return ( tasks.length ) ? tasks.length - 1 : void 0
}

function nextTaskSelector({ tasks }) {
  if ( !tasks.length ) {
    return
  }

  return tasks.findIndex((task) => task.status != 'complete')
}
