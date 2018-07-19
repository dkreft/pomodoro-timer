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

    this.props.handleClick({
      action: ( this.props.isRunning ) ? 'stop' : 'start'
    })
  }

  render() {
    const content = ( this.props.isRunning ) ? 'Stop' : 'Start'

    return (
      <button onClick={ this.onClick }>
        { content }
      </button>
    )
  }
}

function defaultHandleClick() {
  console.warn('No click handler defined for StartButton')
}
