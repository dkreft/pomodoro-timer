import PropTypes from 'prop-types'
import React, { PureComponent} from 'react'

export default class StartButton extends PureComponent {
  static propTypes = {
    handleClick: PropTypes.func,
    isRunning: PropTypes.bool,
  }

  static defaultProps = {
    handleClick: defaultHandleClick,
    isRunning: false,
  }

  onClick = (e) => {
    e.stopPropagation()

    this.props.handleClick()
  }

  render() {
    return (
      <button onClick={ this.onClick }>
        Start Work
      </button>
    )
  }
}

function defaultHandleClick() {
  console.warn('No click handler defined for StartButton')
}
