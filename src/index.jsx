import React from 'react'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { createStore } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import Reducers from './reducers'

import PomodoroApp from './components/pomodoro-app'

const store = createStore(Reducers, devToolsEnhancer())

window.store = store

render(
  <Provider store={ store }>
    <PomodoroApp/>
  </Provider>,
  document.getElementById('root'),
)
