import PropTypes from 'prop-types'
import React, { PureComponent} from 'react'

import Button from './button'

import Styles from '../styles/start-button'

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

  render() {
    const disabled = !this.props.isEnabled

    return (
      <Button
        className={ Styles.root }
        handleClick={ this.props.handleClick }
        disabled={ disabled }
      >
        Start Work
      </Button>
    )
  }
}

function defaultHandleClick() {
  console.warn('No click handler defined for StartButton')
}
