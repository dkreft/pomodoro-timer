import { all, take } from 'redux-saga/effects'

import ClockSagas from './clock-sagas'

export default function* RootSaga() {
  yield all([
    take('test', () => console.log('fooooo')),
    ...ClockSagas,
  ])
}
