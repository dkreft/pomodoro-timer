import React from 'react'
import { connect } from 'react-redux'

import {
  startClock,
  stopClock,
} from '../actions/clock-actions'

import {
  addTask,
} from '../actions/task-actions'

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
          handleClick={ props.toggleClock }
          isRunning={ props.isRunning }
        />
      </div>
      <div className="tasks">
        <TaskList
          handleAddTask={ props.addTask }
          tasks={ props.tasks }
        />
      </div>
    </div>
  )
}

function mapStateToProps({ clock, tasks }) {
  return {
    isRunning: clock.isRunning,
    minutes: clock.minutes,
    seconds: clock.seconds,

    tasks,
  }
}

function mapDispatchToProps(dispatch, state) {
  return {
    addTask: ({ title }) => {
      dispatch(addTask({ title }))
    },

    toggleClock: ({ action }) => {
      const event = ( action === 'start' ) ? startClock : stopClock
      dispatch(event())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroApp)
