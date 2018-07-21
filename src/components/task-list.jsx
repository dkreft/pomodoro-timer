import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import TaskInput from './task-input'
import Task from './task'

// TODO: Convert this to a container
export default class TaskList extends PureComponent {
  static propTypes = {
    handleAddTask: PropTypes.func,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      status: PropTypes.string,
      title: PropTypes.string,
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
  return this.props.tasks.map(({ status, title }, i) => (
    <li key={ `task-${ i }` }>
      <Task
        name={ title }
        handleTimerToggle={ handleTimerToggle }
        handleTaskCompleted={ handleTaskCompleted.bind(null, { taskIdx: i }) }
        status={ status }
      />
    </li>
  ))
}

function handleTimerToggle() {
  console.log('TODO: fire off timer toggle action')
}

function handleTaskCompleted({ taskIdx }) {
  console.log('TODO: fire off task complete for %o', taskIdx)
}
