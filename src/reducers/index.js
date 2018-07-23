import { combineReducers } from 'redux'

import ClockReducer from './clock-reducer'
import TaskReducer from './task-reducer'

export default combineReducers({
  clock: ClockReducer,
  tasks: TaskReducer,
})
