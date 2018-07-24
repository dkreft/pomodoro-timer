import PropTypes from 'prop-types'
import React from 'react'
import leftPad from 'left-pad'

import Styles from '../styles/countdown-timer'

export default function CountdownTimer({ minutes, seconds }) {
  const paddedMinutes = leftPad(minutes, 2, '0')
  const paddedSeconds = leftPad(seconds, 2, '0')

  return (
    <div className={ Styles.root }>
      <div className={ `${ Styles.minutes } t-minutes` }>
        { paddedMinutes }
      </div>
      <div className="t-seconds">
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
