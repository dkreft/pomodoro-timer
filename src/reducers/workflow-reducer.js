import { mapReducers } from 'redux-map-reducers'

import {
  startTask,
} from '../actions/workflow-actions'

const INITIAL_STATE = {
  currentTaskIdx: null,
}

export default mapReducers({
//  [startTask]: _startTask,
}, INITIAL_STATE)


function _startTask(state, { payload }) {
  const { currentTaskIdx = 0 } = payload

  return {
    ...state,
    currentTaskIdx,
  }
}
