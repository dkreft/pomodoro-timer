import { combineReducers } from 'redux'

import ClockReducer from './clock-reducer'

export default combineReducers({
  clock: ClockReducer,
})
