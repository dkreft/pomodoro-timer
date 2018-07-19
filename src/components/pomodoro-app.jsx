import React from 'react'
import { connect } from 'react-redux'

import CountdownTimer from './countdown-timer'

function PomodoroApp(props) {
console.log(props)
  return (
    <div className="main">
      <div className="clock">
        <CountdownTimer
          minutes={ props.minutes }
          seconds={ props.seconds }
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
    minutes: clock.minutes,
    seconds: clock.seconds,
  }
}

export default connect(mapStateToProps)(PomodoroApp)
