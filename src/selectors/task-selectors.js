import { createSelector } from 'reselect'

export const hasUnclaimedTaskSelector = createSelector(tasksSelector, (tasks) => {
  return Boolean(selectNextTask(tasks))
})

export const nextTaskSelector = createSelector(tasksSelector, selectNextTask)

export function tasksSelector(state) {
  return state.tasks || []
}

function selectNextTask(tasks) {
  const idx = tasks.findIndex((task) => task.status !== 'complete' )

  if ( idx < 0 ) {
    return
  }

  return tasks[idx]
}
