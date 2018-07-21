import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import {
  addTask,
  completeTask,
} from '../actions/task-actions'

import TaskInput from '../components/task-input'
import Task from '../components/task'

function TaskList({ tasks, dispatchAddTask, dispatchCompleteTask }) {
  return (
    <ul className="taskList">
      { renderTaskList(tasks, dispatchCompleteTask) }
      <li>
        <TaskInput handleAddTask={ dispatchAddTask }/>
      </li>
    </ul>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)

function mapStateToProps({ tasks }) {
  return {
    tasks,
  }
}

function mapDispatchToProps(dispatch, state) {
  return {
    dispatchAddTask: ({ title }) => dispatch(addTask({ title })),
    dispatchCompleteTask: ({ taskIdx }) => dispatch(completeTask({ taskIdx })),
  }
}

/**
 * @this TaskList
 */
function renderTaskList(tasks, dispatchCompleteTask) {
  return tasks.map(({ status, title }, i) => (
    <li key={ `task-${ i }` }>
      <Task
        name={ title }
        handleTaskCompleted={ dispatchCompleteTask.bind(null, { taskIdx: i }) }
        status={ status }
      />
    </li>
  ))
}
