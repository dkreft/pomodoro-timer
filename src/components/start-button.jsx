import PropTypes from 'prop-types'
import React, { PureComponent} from 'react'

export default class StartButton extends PureComponent {
  onClick = (e) => {
    e.stopPropagation()

    this.props.handleClick()
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

StartButton.propTypes = {
  handleClick: PropTypes.func,
  isRunning: PropTypes.bool,
}

StartButton.defaultProps = {
  handleClick: defaultHandleClick,
  isRunning: false,
}
