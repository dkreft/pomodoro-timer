import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import TaskInput from './task-input'

export default class TaskList extends PureComponent {
  static propTypes = {
    handleAddTask: PropTypes.func,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      complete: PropTypes.bool,
    })),
  }

  static defaultProps = {
    tasks: [],
    handleAddTask: ({ title }) => void 0,
  }

  render() {
    return (
      <ul className="taskList">
        { renderTaskList.call(this) }
        <li>
          <TaskInput handleAddTask={ this.props.handleAddTask }/>
        </li>
      </ul>
    )
  }
}

/**
 * @this TaskList
 */
function renderTaskList() {
  return this.props.tasks.map(({ title }, i) => (
    <li key={ `task-${ i }` }>{ title }</li>
  ))
}
