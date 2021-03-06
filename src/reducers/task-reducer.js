import { mapReducers } from 'redux-map-reducers'

import {
  addTask,
  completeTask,
  startTask,
} from '../actions/task-actions'

const INITIAL_STATE = []

export default mapReducers({
  [addTask]: _addTask,
  [completeTask]: _completeTask,
  [startTask]: _startTask,
}, INITIAL_STATE)


function _addTask(state, { payload }) {
  const newState = [ ...state ]

  if ( newState.length ) {
    const prevTask = newState.pop()
    newState.push({
      ...prevTask,
      isLastTask: false,
    })
  }

  const idx = newState.length

  return newState.concat({
    idx,
    isLastTask: true,
    status: void 0,
    title: payload.title,
  })
}

function _completeTask(state, { payload }) {
  const { taskIdx } = payload

  return setTaskStatus(state, taskIdx, 'complete')
}

function _startTask(state, { payload }) {
  const { taskIdx } = payload

  return setTaskStatus(state, taskIdx, 'inProgress')
}

function setTaskStatus(state, taskIdx, status) {
  if ( taskIdx > state.length - 1 ) {
    return state
  }

  // Once status is 'complete,' it's immutable
  const task = state[taskIdx]
  if ( task.status === 'complete' ) {
    return state
  }

  const taskClone = {
    ...task,
    status,
  }

  const newState = [ ...state ]
  newState.splice(taskIdx, 1, taskClone)

  return newState
}
