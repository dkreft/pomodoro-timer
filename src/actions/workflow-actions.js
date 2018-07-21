import namespacedActions from 'redux-namespaced-actions'

const { createAction } = namespacedActions('workflow')

export const startWork = createAction('START_WORK')
export const pauseWork = createAction('PAUSE_WORK')

export const endBreak = createAction('END_BREAK')
export const error = createAction('ERROR')
export const noMoreTasks = createAction('NO_MORE_TASKS')
export const startLongBreak = createAction('START_LONG_BREAK')
export const startShortBreak = createAction('START_SHORT_BREAK')
