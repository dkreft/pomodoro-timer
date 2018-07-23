import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import Styles from '../styles/button'

export default class Button extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    handleClick: PropTypes.func,
  }

  static defaultProps = {
    disabled: false,
    handleClick: () => void 0,
  }

  onClick = (e) => {
    e.stopPropagation()

    this.props.handleClick()
  }

  render() {
    const classNames = [
      Styles.root,
      this.props.className,
    ]

    if ( this.props.disabled ) {
      classNames.push(Styles.disabled)
    }

    return (
      <button
        className={ classNames.join(' ') }
        disabled={ this.props.disabled }
        onClick={ this.onClick }
      >
        { this.props.children }
      </button>
    )
  }
}
