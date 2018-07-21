import { mapReducers } from 'redux-map-reducers'

import {
  addTask,
  completeTask,
} from '../actions/task-actions'

const INITIAL_STATE = []

export default mapReducers({
  [addTask]: _addTask,
  [completeTask]: _completeTask,
}, INITIAL_STATE)


function _addTask(state, { payload }) {
  // TODO: add an ID?
  return state.concat({
    title: payload.title,
    isComplete: false,
  })
}

function _completeTask(state, { payload }) {
  const { taskIdx } = payload

  const task = {
    ...state[taskIdx],
    isComplete: true,
  }

  const newState = [ ...state ]
  newState.splice(taskIdx, 1, task)

  return newState
}
