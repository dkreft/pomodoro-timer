import React from 'react'
import { devToolsEnhancer } from 'redux-devtools-extension'
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux'
import ReduxSaga from 'redux-saga'

import { render } from 'react-dom'
import { Provider } from 'react-redux'

import Reducers from './reducers'

import Sagas from './sagas'

import PomodoroApp from './components/pomodoro-app'


const sagaMiddleware = ReduxSaga()

const store = createStore(Reducers,
                          compose(applyMiddleware(sagaMiddleware),
                                  devToolsEnhancer()))
sagaMiddleware.run(Sagas)

window.store = store

render(
  <Provider store={ store }>
    <PomodoroApp/>
  </Provider>,
  document.getElementById('root'),
)
