import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from './button'

import Styles from '../styles/task'

// TODO: Add the ability to remove an unstarted, uncompleted task
export default class Task extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    isComplete: PropTypes.bool,

    handleTimerToggle: PropTypes.func,
    handleTaskCompleted: PropTypes.func,
  }

  static defaultProps = {
    handleTaskCompleted: () => void 0,
    isComplete: false,
  }

  render() {
    const { name, status } = this.props

    const classNames = [Styles.root]

    if ( status === 'inProgress' ) {
      classNames.push(Styles.inProgress)
    } else if ( status === 'complete' ) {
      classNames.push(Styles.complete)
    }

    return (
      <div className={ classNames.join(' ') }>
        <div className={ Styles.name }>
          { name }
        </div>
        { renderCompleteButton.call(this, { status }) }
      </div>
    )
  }
}

function renderCompleteButton({ status }) {
  if ( status !== 'inProgress' ) {
    return null
  }

  return (
    <div className={ Styles.complete }>
      <Button
        className={ Styles.completeButton }
        handleClick={ this.props.handleTaskCompleted }
      >
        Complete Task
      </Button>
    </div>
  )
}
