import deepFreeze from 'deep-freeze'

import {
  _require,
  expect,
} from '../../helper'

const {
  addTask,
  completeTask,
  startTask
} = _require('actions/task-actions')

const TaskReducer = _require('reducers/task-reducer')

describe('TaskReducer', () => {
  def('tasks', () => void 0)
  def('action', () => ({
    type: `${ $type }`,
    payload: $payload,
  }))
  def('type', () => void 0)
  def('payload', () => void 0)

  subject(() => {
    // deepFreeze makes guarantees that are reducers are pure without
    // having to resort to heavy-handed techniques like using
    // ImmutableJS throughout the application, which makes things kind
    // messy.
    const state = ( $tasks ) ? deepFreeze($tasks) : void 0
    return TaskReducer(state, $action)
  })

  context('when the type is bogus', () => {
    def('type', () => 'LSDKFLSDJOWIFH')

    it('returns the default state', () => {
      expect($subject).to.eql([])
    })
  })

  context(`when the type is ${ addTask }`, () => {
    const title = 'laowa sllakjsflasfj adsfwe'

    def('type', () => addTask)
    def('payload', () => ({
      title,
    }))

    context('when there are no preexisting tasks', () => {
      def('tasks', () => [])

      it('adds a task with the correct attributes', () => {
        expect($subject).to.eql([
          {
            idx: 0,
            isLastTask: true,
            status: void 0,
            title,
          }
        ])
      })
    })

    context('when there is a preexisting task', () => {
      def('tasks', () => [
        {
          idx: 0,
          isLastTask: false,
          status: void 0,
          title: `${ title } zero`,
        },
        {
          idx: 1,
          isLastTask: true,
          status: void 0,
          title: `${ title } one`,
        }
      ])
      def('payload', () => ({
        title: 'zzzzzziweirworei',
      }))

      it('sets `isLastTask` on the previous task to false', () => {
        const prevIdx = $tasks.length - 1
        const prevTask = $tasks[prevIdx]

        expect($subject[prevIdx]).to.eql({
          ...prevTask,
          isLastTask: false,
        })
      })

      it('adds a task with the correct attributes', () => {
        const tasks = $subject
        const lastTaskIdx = tasks.length - 1

        expect($subject[lastTaskIdx]).to.eql({
          idx: lastTaskIdx,
          isLastTask: true,
          status: void 0,
          title: $payload.title,
        })
      })
    })
  })

  context(`when type is ${ completeTask }`, () => {
    def('type', () => completeTask)
    def('payload', () => ({
      taskIdx: $taskIdx,
    }))
    def('taskIdx', () => void 0)
    def('tasks', () => [
      { status: 'complete' },
      { status: 'foo' },
    ])

    testSetTaskStatus('complete')
  })

  context(`when type is ${ startTask }`, () => {
    def('type', () => startTask)
    def('payload', () => ({
      taskIdx: $taskIdx,
    }))
    def('taskIdx', () => void 0)
    def('tasks', () => [
      { status: 'complete' },
      { status: 'foo' },
    ])

    testSetTaskStatus('inProgress')
  })
})

function testSetTaskStatus(status) {
  context('when the taskIdx is > number of tasks', () => {
    def('taskIdx', () => $tasks.length + 1)

    it('returns the state', () => {
      expect($subject).to.equal($tasks)
    })
  })

  context('when the task status is "complete"', () => {
    def('taskIdx', () => $tasks.findIndex((t) => t.status === 'complete'))

    it('returns the state', () => {
      expect($subject).to.equal($tasks)
    })
  })

  context('when the task status is anything else', () => {
    def('taskIdx', () => $tasks.findIndex((t) => t.status === 'foo'))

    it(`sets that task status to "${ status }"`, () => {
      const task = $subject[$taskIdx]

      expect(task).to.eql({
        ...$tasks[$taskIdx],
        status,
      })
    })
  })
}
