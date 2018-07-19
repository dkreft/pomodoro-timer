import React from 'react'
import { createStore } from 'redux'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import Reducers from './reducers'

import PomodoroApp from './components/pomodoro-app'

const store = createStore(Reducers,
                          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

window.store = store

render(
  <Provider store={ store }>
    <PomodoroApp/>
  </Provider>,
  document.getElementById('root'),
)
