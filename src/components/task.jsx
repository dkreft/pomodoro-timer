import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

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

  onCompleteClick = (e) => {
    e.stopPropagation()

    this.props.handleTaskCompleted()
  }

  render() {
    const { name, status } = this.props

    // TODO: Replace all this with a css module
    const style = {
      display: 'flex',
    }

    if ( status === 'inProgress' ) {
      style.fontWeight = 'bold'
    } else if ( status === 'complete' ) {
      style.textDecoration = 'line-through'
      style.color = '#0a0'
    }

    return (
      <div style={ style }>
        <div className="name">{ name }</div>
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
    <div className="complete">
      <button onClick={ this.onCompleteClick }>Complete Task</button>
    </div>
  )
}
