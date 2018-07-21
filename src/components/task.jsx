import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Task extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    handleTimerToggle: PropTypes.func,
    handleTaskCompleted: PropTypes.func,
  }

  static defaultProps = {
    handleTaskCompleted: () => void 0,
  }

  onCompleteClick = (e) => {
    e.stopPropagation()

    this.props.handleTaskCompleted()
  }

  render() {
    const { name, isComplete } = this.props

    const style = {
      display: 'flex',
    }

    return (
      <div style={ style }>
        <div className="name">{ name }</div>
        { renderCompleteButton.call(this, { isComplete }) }
      </div>
    )
  }
}

function renderCompleteButton({ isComplete }) {
  if ( isComplete ) {
    return null
  }

  return (
    <div className="complete">
      <button onClick={ this.onCompleteClick }>Complete Task</button>
    </div>
  )
}
