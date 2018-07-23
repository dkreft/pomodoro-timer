/**
 * Defines the pomodoro workflow and dispatches events that manipulate
 * the clock and task list
 */

import {
  put,
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

import {
  nextTaskSelector,
  tasksSelector,
} from '../selectors/task-selectors'


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
  while ( true ) {
    const currentTask = yield select(nextTaskSelector)

    if ( !currentTask ) {
      // TODO: Dispatch error() with a message, display in UI
      console.log('No more tasks left')
      return yield put(noMoreTasks())
    }

    yield put(startTask({
      taskIdx: currentTask.idx,
    }))

    yield restartClockAndWaitForTimesUp(TASK_TIME)

    // Tasks may have been added whilst the clock was running, or the
    // status may have been updated...so we have to refetch the
    // current task from the store.
    const updatedTask = yield reselectTaskByIdx(currentTask.idx)
    if ( updatedTask.status === 'complete' ) {
      if ( updatedTask.isLastTask ) {
        return yield put(noMoreTasks())
      }
    } else {
      // TODO: Dispatch error() with a message, display in UI
      console.log('This task was not completed in time')
      return yield put(error())
    }

    yield takeBreak(currentTask.idx)
  }
}

function* reselectTaskByIdx(idx) {
  const tasks = yield select(tasksSelector)

  return tasks[idx]
}

function* takeBreak(taskIdx) {
  const taskNumber = taskIdx + 1
  const isLongBreak = ( taskNumber % 4 === 0 )
  const breakTime = ( isLongBreak ) ? LONG_BREAK_TIME : SHORT_BREAK_TIME

  if ( isLongBreak ) {
    yield put(startLongBreak())
  } else {
    yield put(startShortBreak())
  }

  yield restartClockAndWaitForTimesUp(breakTime)

  yield put(endBreak())
}

function* restartClockAndWaitForTimesUp(time) {
  yield put(resetClock(time))

  yield put(startClock())

  yield take(`${ timesUp }`)
}
