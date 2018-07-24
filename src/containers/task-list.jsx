import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import {
  addTask,
  completeTask,
} from '../actions/task-actions'

import TaskInput from '../components/task-input'
import Task from '../components/task'

import Styles from '../styles/task-list'

function TaskList({ tasks, dispatchAddTask, dispatchCompleteTask }) {
  return (
    <ol className={ Styles.root }>
      { renderTaskList(tasks, dispatchCompleteTask) }
      <li className={ `${ Styles.inputItem } t-add-task` }>
        <TaskInput handleAddTask={ dispatchAddTask }/>
      </li>
    </ol>
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
  if ( !tasks.length ) {
    return (
      <li className={ `${ Styles.noneFound } t-none-found` }>
        Nothing to do. Add some tasks:
      </li>
    )
  }

  return tasks.map(({ status, title }, i) => (
    <li className={ `${ Styles.taskItem } t-task-item` } key={ `task-${ i }` }>
      <Task
        name={ title }
        handleTaskCompleted={ dispatchCompleteTask.bind(null, { taskIdx: i }) }
        status={ status }
      />
    </li>
  ))
}
