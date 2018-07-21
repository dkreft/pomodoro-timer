import namespacedActions from 'redux-namespaced-actions'

const { createAction } = namespacedActions('workflow')

export const startWork = createAction('START_WORK')
