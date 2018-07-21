import React from 'react'
import { connect } from 'react-redux'

import {
  addTask,
} from '../actions/task-actions'

import {
  startWork,
} from '../actions/workflow-actions'

import CountdownTimer from './countdown-timer'
import StartButton from './start-button'
import TaskList from './task-list'

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
        <TaskList
          handleAddTask={ props.dispatchAddTask }
          tasks={ props.tasks }
        />
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
    dispatchAddTask: ({ title }) => dispatch(addTask({ title })),
    dispatchStartWork: () => dispatch(startWork()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroApp)
