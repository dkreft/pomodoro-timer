import PropTypes from 'prop-types'
import React from 'react'
import leftPad from 'left-pad'

export default function CountdownTimer({ minutes, seconds }) {
  const paddedMinutes = leftPad(minutes, 2, '0')
  const paddedSeconds = leftPad(seconds, 2, '0')

  return (
    <div>
      <div className="minutes">
        { paddedMinutes }
      </div>
      <div className="seconds">
        { paddedSeconds }
      </div>
    </div>
  )
}

CountdownTimer.propTypes = {
  minutes: PropTypes.number,
  seconds: PropTypes.number,
}

CountdownTimer.defaultProps = {
  minutes: 0,
  seconds: 0,
}
