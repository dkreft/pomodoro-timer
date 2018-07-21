import { combineReducers } from 'redux'

import ClockReducer from './clock-reducer'
import TaskReducer from './task-reducer'
import WorkflowReducer from './workflow-reducer'

export default combineReducers({
  clock: ClockReducer,
  tasks: TaskReducer,
  workflow: WorkflowReducer,
})
