import configureStore from 'redux-mock-store';

import {
  React,
  _require,
  expect,
  shallow,
} from '../../react-helper'

const {
  addTask,
  completeTask,
} = _require('actions/task-actions')

const TaskList = _require('containers/task-list')

const Task = _require('components/task')
const TaskInput = _require('components/task-input')

const mockStore = configureStore()

describe('<TaskList>', () => {
  def('store', () => mockStore($storeState))
  def('storeState', () => ({
    tasks: $tasks,
  }))
  def('tasks', () => [])

  subject(() => shallow(
    <TaskList store={ $store }/>
  ).dive())

  it('renders an ordered list', () => {
    expect($subject).to.have.tagName('ol')
  })

  it('renders an "add task" item', () => {
    expect($subject.find('.t-add-task')).to.be.present
  })

  describe('the <TaskInput>', () => {
    subject(() => $subject.find(TaskInput))

    it('is present', () => {
      expect($subject).to.be.present
    })

    describe('the `handleAddTask` property', () => {
      const payload = {
        title: 'qoealf oaihdsf alf',
      }

      subject(() => $subject.prop('handleAddTask'))

      beforeEach(() => $subject(payload))

      it(`correctly dispatches ${ addTask }`, () => {
        const actions = $store.getActions()
        expect(actions).to.eql([addTask(payload)])
      })
    })
  })

  context('when there are no tasks', () => {
    def('tasks', () => [])

    it('renders the "none found" display', () => {
      expect($subject.find('.t-none-found')).to.be.present
    })
  })

  context('when there are tasks', () => {
    def('tasks', () => [
      { title: 'owierusd', status: 'alsdkfj' },
      { title: 'kgohjtxx', status: 'oweissd' }
    ])

    it('renders the correct number of task items', () => {
      expect($subject.find('.t-task-item')).to.have.length($tasks.length)
    })

    it('does not render the "none found" display', () => {
      expect($subject.find('.t-none-found')).not.to.be.present
    })

    describe('the <Task> elements', () => {
      subject(() => $subject.find(Task))

      it('all have the corect `name`', () => {
        $subject.forEach((node, i) => {
          expect(node.prop('name')).to.equal($tasks[i].title)
        })
      })

      it('all have the correct `status`', () => {
        $subject.forEach((node, i) => {
          expect(node.prop('status')).to.equal($tasks[i].status)
        })
      })

      it('all have the correct `handleTaskCompleted`', () => {
        $subject.forEach((node, i) => {
          $store.clearActions()

          const handleTaskCompleted = node.prop('handleTaskCompleted')

          handleTaskCompleted()

          const actions = $store.getActions()

          expect(actions).to.eql([
            completeTask({ taskIdx: i }),
          ])
        })
      })
    })
  })
})
