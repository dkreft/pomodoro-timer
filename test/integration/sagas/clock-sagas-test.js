import {
  delay,
} from 'redux-saga'

import {
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects'

import {
  expect,
} from '../../helper'

import {
  decrementClock,
  startClock,
  timesUp,
} from 'actions/clock-actions'

import ClockSagas, {
  isStoppedSelector,
  isTimeUpSelector,
  startClockSaga,
} from 'sagas/clock-sagas'

// This is not my favorite way to handle testing a saga that exports
// an array of effects, but it's the best I've got right now:
// https://stackoverflow.com/questions/52636723

describe('ClockSagas', () => {
  describe('the exported saga', () => {
    subject(wrapper())

    it('takes every startclock', () => {
      expect($subject.next().value).to.eql(call(takeEvery, `${ startClock }`, startClockSaga))
    })
  })

  describe('startClockSaga()', () => {
    subject(startClockSaga())

    it('invokes a delay', () => {
      expect($subject.next().value)
        .to.eql(call(delay, 1000 / 60))
    })

    it('selects the `isStoppedSelector`', () => {
      expect($subject.next().value)
        .to.eql(select(isStoppedSelector))
    })

    context('when `isStoppedSelector` returns a falsy value', () => {
      def('isStopped', () => false)

      it('decrements the clock', () => {
        expect($subject.next($isStopped).value)
          .to.eql(put(decrementClock()))
      })

      it('selects `isTimeUpSelector()', () => {
        expect($subject.next().value)
          .to.eql(select(isTimeUpSelector))
      })

      context('when `isTimeUpSelector` returns a truthy value', () => {
        def('isTimeUp', () => 'woierue')

        it('puts timesUp()', () => {
          expect($subject.next($isTimeUp).value)
            .to.eql(put(timesUp()))
        })
      })

      // TODO: I think I've officially
      // run into the difficulty of testing sagas in this fashion. I can't
      // reset the generator to test the alternate case, so I need to find
      // another way to do this.
      context.skip('when `isTimeUpSelector` returns a falsy value', () => {
        def('isTimeUp', () => '')

        it('invokes a delay', () => {
          expect($subject.next($isTimeUp).value)
            .to.eql(call(delay, 1000 / 60))
        })
      })
    })

    context('when `isStoppedSelector` returns a truthy value', () => {
      def('isStopped', () => 'alsdkfj')

      it('stops the clock', () => {
        expect($subject.next($isStopped).value).to.be.undefined
      })
    })
  })
})

function* wrapper() {
  yield* ClockSagas
}