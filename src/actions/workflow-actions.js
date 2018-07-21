import namespacedActions from 'redux-namespaced-actions'

const { createAction } = namespacedActions('workflow')

export const startTask = createAction('START_TASK')
