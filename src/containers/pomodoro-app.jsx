import React from 'react'
import { connect } from 'react-redux'

import {
  startWork,
} from '../actions/workflow-actions'

import {
  hasUnclaimedTaskSelector,
} from '../selectors/task-selectors'

import TaskList from './task-list'

import CountdownTimer from '../components/countdown-timer'
import StartButton from '../components/start-button'

import Styles from '../styles/pomodoro-app'

function PomodoroApp(props) {
  return (
    <div className={ Styles.main }>
      <h1>Pomodoro Timer</h1>

      <div className={ Styles.clock }>
        <CountdownTimer
          minutes={ props.minutes }
          seconds={ props.seconds }
        />
      </div>
      <div className={ Styles.middle }>
        <StartButton
          handleClick={ props.dispatchStartWork }
          isRunning={ props.isRunning }
          isEnabled={ props.canStartWork }
        />
      </div>
      <div className={ Styles.tasks }>
        <h2>Tasks</h2>
        <TaskList/>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  const { clock, tasks } = state

  const canStartWork = !clock.isRunning && hasUnclaimedTaskSelector(state)

  return {
    canStartWork,
    isRunning: clock.isRunning,
    minutes: clock.minutes,
    seconds: clock.seconds,

    tasks,
  }
}

function mapDispatchToProps(dispatch, state) {
  return {
    dispatchStartWork: () => dispatch(startWork()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroApp)
