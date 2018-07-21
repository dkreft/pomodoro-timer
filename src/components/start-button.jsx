import PropTypes from 'prop-types'
import React, { PureComponent} from 'react'

export default class StartButton extends PureComponent {
  static propTypes = {
    handleClick: PropTypes.func,
    isRunning: PropTypes.bool,
    isEnabled: PropTypes.bool,
  }

  static defaultProps = {
    handleClick: defaultHandleClick,
    isRunning: false,
    isEnabled: false,
  }

  onClick = (e) => {
    e.stopPropagation()

    this.props.handleClick()
  }

  render() {
    const disabled = !this.props.isEnabled

    return (
      <button onClick={ this.onClick } disabled={ disabled }>
        Start Work
      </button>
    )
  }
}

function defaultHandleClick() {
  console.warn('No click handler defined for StartButton')
}
