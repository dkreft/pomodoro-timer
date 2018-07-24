import {
  React,
  _require,
  expect,
  shallow,
  sinon,
} from '../../react-helper'

// TODO: Use proxyquire to set up stubs for the Styles so we can test
// that logic, too. I'm just a bit short on time for that right now,
// as it involves setting up a proxy object.

const Button = _require('components/button')

describe('<Button>', () => {
  const children = 'oqiwerladskfjalsdfj'

  def('disabled', () => void 0)
  def('handleClick', () => void 0)

  subject(() => shallow(
    <Button
      disabled={ $disabled }
      handleClick={ $handleClick }
    >
      { children }
    </Button>
  ))

  it('is a <button>', () => {
    expect($subject).to.have.tagName('button')
  })

  it('renders the supplied child(ren)', () => {
    expect($subject).to.contain(children)
  })

  describe('the `disabled` prop', () => {
    subject(() => $subject.prop('disabled'))

    context('when the `disabled` prop is not provided', () => {
      def('disabled', () => void 0)

      it('is false', () => {
        expect($subject).to.be.false
      })
    })

    context('when the `disabled` prop is true', () => {
      def('disabled', () => true)

      it('is true', () => {
        expect($subject).to.be.true
      })
    })
  })

  describe('`onClick`', () => {
    def('e', () => ({
      stopPropagation: sinon.stub(),
    }))

    subject(() => $subject.prop('onClick')($e))

    context('when `handleClick` is not provided', () => {
      def('handleClick', () => void 0)

      it('invokes #stopPropagation() on the event', () => {
        $subject
        expect($e.stopPropagation).to.have.been.called
      })

      it('does not blow up', () => {
        expect($subject).to.be.undefined
      })
    })
  })
})
