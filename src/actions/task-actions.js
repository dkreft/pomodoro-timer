import namespacedActions from 'redux-namespaced-actions'

const { createAction } = namespacedActions('task')

export const addTask = createAction('ADD')
