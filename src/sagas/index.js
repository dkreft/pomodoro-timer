import { all, take } from 'redux-saga/effects'

import ClockSagas from './clock-sagas'
import WorkflowSagas from './workflow-sagas'
import SoundSagas from './sound-sagas'

export default function* RootSaga() {
  yield all([
    ...ClockSagas,
    ...SoundSagas,
    ...WorkflowSagas,
  ])
}
