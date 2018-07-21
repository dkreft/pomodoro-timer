import React from 'react'
import { connect } from 'react-redux'

import {
  startWork,
} from '../actions/workflow-actions'

import TaskList from '../containers/task-list'

import CountdownTimer from './countdown-timer'
import StartButton from './start-button'

function PomodoroApp(props) {
  return (
    <div className="main">
      <div className="clock">
        <CountdownTimer
          minutes={ props.minutes }
          seconds={ props.seconds }
        />
        <StartButton
          handleClick={ props.dispatchStartWork }
          isRunning={ props.isRunning }
          isEnabled={ props.canStartWork }
        />
      </div>
      <div className="tasks">
        <TaskList/>
      </div>
    </div>
  )
}

function mapStateToProps({ clock, tasks }) {
  const canStartWork = Boolean(tasks.length) && !clock.isRunning

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
