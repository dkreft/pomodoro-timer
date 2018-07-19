import namespacedActions from 'redux-namespaced-actions'

const { createAction } = namespacedActions('clock')

export const decrementClock = createAction('DECREMENT')

export const resetClock = createAction('RESET')
