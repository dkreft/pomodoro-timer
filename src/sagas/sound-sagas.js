import {
  takeEvery,
} from 'redux-saga/effects'

import {
  endBreak,
  error,
  noMoreTasks,
  startLongBreak,
  startShortBreak,
  startWork,
} from '../actions/workflow-actions'

import GetBackToWork from '../../media/get-back-to-work'
import StopHammertime from '../../media/stop-hammertime'
import BraveheartFreedom from '../../media/braveheart-freedom'
import ForbiddenDonut from '../../media/forbidden-donut'
import Doh from '../../media/doh'

export default [
  takeEvery(`${ endBreak }`, playSound.bind(null, GetBackToWork)),
  takeEvery(`${ startShortBreak }`, playSound.bind(null, StopHammertime)),
  takeEvery(`${ startLongBreak }`, playSound.bind(null, ForbiddenDonut)),
  takeEvery(`${ error }`, playSound.bind(null, Doh)),
  takeEvery(`${ noMoreTasks }`, playSound.bind(null, BraveheartFreedom)),
]

function playSound(file) {
  new Audio(file).play()
}
