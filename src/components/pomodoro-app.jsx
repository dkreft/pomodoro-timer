import React from 'react'
import { connect } from 'react-redux'

import {
  startClock,
  stopClock,
} from '../actions/clock-actions'

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
          handleClick={ props.toggleClock }
          isRunning={ props.isRunning }
        />
      </div>
      <div className="tasks">
        tasks
      </div>
    </div>
  )
}

function mapStateToProps({ clock }) {
  return {
    isRunning: clock.isRunning,
    minutes: clock.minutes,
    seconds: clock.seconds,
  }
}

function mapDispatchToProps(dispatch, state) {
  return {
    toggleClock: ({ action }) => {
      const event = ( action === 'start' ) ? startClock : stopClock
      dispatch(event())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroApp)
