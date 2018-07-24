import proxyquire from 'proxyquire'

import {
  React,
  _proxyquire,
  _require,
  expect,
  shallow,
  sinon,
} from '../../react-helper'

// TODO: Use proxyquire to set up stubs for the Styles so we can test
// that logic, too. I'm just a bit short on time for that right now,
// as it involves setting up a proxy object.

const CountdownTimer = _proxyquire('components/countdown-timer', {
  'left-pad': fakeLeftPad,
})

describe('<CountdownTimer>', () => {
  def('minutes', () => void 0)
  def('seconds', () => void 0)

  subject('comp', () => shallow(
    <CountdownTimer
      minutes={ $minutes }
      seconds={ $seconds }
    />
  ))

  describe('the minutes display', () => {
    subject(() => $subject.find('.t-minutes'))

    context('when `minutes` is undefined', () => {
      def('minutes', () => void 0)

      it('contains the result of calling leftPad() with 0', () => {
        expect($subject).to.contain(fakeLeftPad(0, 2, '0'))
      })
    })

    context('when `minutes` is provided', () => {
      def('minutes', () => 5)

      it('contains the result of calling leftPad()', () => {
        expect($subject).to.contain(fakeLeftPad($minutes, 2, '0'))
      })
    })
  })

  describe('the seconds display', () => {
    subject(() => $subject.find('.t-seconds'))

    context('when `seconds` is undefined', () => {
      def('seconds', () => void 0)

      it('contains the result of calling leftPad() with 0', () => {
        expect($subject).to.contain(fakeLeftPad(0, 2, '0'))
      })
    })

    context('when `seconds` is provided', () => {
      def('seconds', () => 5)

      it('contains the result of calling leftPad()', () => {
        expect($subject).to.contain(fakeLeftPad($seconds, 2, '0'))
      })
    })
  })
})

function fakeLeftPad(...args) {
  return `leftPad(${ JSON.stringify(args) }`
}
