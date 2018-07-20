import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

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
      <input
        type="text"
        ref={ this.inputRef }
        onKeyPress={ this.onKeyPress }
      />
    )
  }
}
