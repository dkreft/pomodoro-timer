import { mapReducers } from 'redux-map-reducers'

import {
  addTask,
} from '../actions/task-actions'

const INITIAL_STATE = []

export default mapReducers({
  [addTask]: _addTask,
}, INITIAL_STATE)


function _addTask(state, { payload }) {
  // TODO: add an ID?
  return state.concat({
    title: payload.title,
    complete: false,
  })
}
