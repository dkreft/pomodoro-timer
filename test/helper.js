import path from 'path'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

export { expect } from 'chai'
export { default as sinon } from 'sinon'

chai.use(sinonChai)
chai.use(chaiEnzyme())

export { chai }

def('sandbox', () => sinon.createSandbox())

afterEach(() => $sandbox.restore())

export function _proxyquire(modPath, config) {
  const fullPath = makeIncludePath(modPath)

  const mod = proxyquire(fullPath, config)

  return ( mod.default ) ? mod.default : mod
}

export function _require(modPath) {
  const fullPath = makeIncludePath(modPath)

  const mod = require(fullPath)

  return ( mod.default ) ? mod.default : mod
}

function makeIncludePath(modPath) {
  return path.join('../src', modPath)
}
