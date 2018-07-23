import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import Styles from '../styles/task-input'

export default class TaskInput extends PureComponent {
  static propTypes = {
    handleAddTask: PropTypes.func,
  }

  static defaultProps = {
    handleAddTask: ({ title }) => void 0,
  }

  constructor() {
    super(...arguments)

    this.inputRef = React.createRef()
  }

  onKeyPress = (e) => {
    e.stopPropagation()

    if ( e.key === 'Enter' ) {
      this.props.handleAddTask({
        title: e.target.value,
      })

      // This is a little janky, but it's a whole lot simpler than
      // doing a controlled component and trying to handle things like
      // backspace/delete properly.
      this.inputRef.current.value = ''

      return
    }
  }

  render() {
    return (
      <div className={ Styles.root }>
        <label className={ Styles.label }>
          Add a task:
        </label>
        <input
          type="text"
          className={ Styles.input }
          ref={ this.inputRef }
          onKeyPress={ this.onKeyPress }
        />
      </div>
    )
  }
}
