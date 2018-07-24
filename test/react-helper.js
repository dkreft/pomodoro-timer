import { configure } from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'

configure({
  adapter: new Adapter(),
})

export * from 'enzyme'
export React from 'react'
export * from './helper'

