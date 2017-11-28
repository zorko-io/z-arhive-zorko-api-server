import test from 'ava'
import sinon from 'sinon'
import {
  discoverWorkspace
} from './discoverWorkspace'

test.beforeEach(t => {
  const sandbox = sinon.sandbox.create()
  const explore = sandbox.stub()

  t.context.explore = explore
  t.context.sandbox = sandbox
})

test.afterEach(t => {
  t.context.sandbox.reset()
})

test('shouldn`t return workspace for empty repo ', async t => {
  const {explore} = t.context

  explore.withArgs('/').returns([])

  const result = await discoverWorkspace(explore)

  t.falsy(result)
})

test('should return workspace for non empty repo', async t => {
  const {explore} = t.context
  const connectionFolder = {
    name: 'fake connections folder',
    path: 'connections'
  }
  const rootContent = [connectionFolder]
  const connectionsContent = [{name: 'fake connection content'}]

  explore.withArgs('/').returns(rootContent)
  explore.withArgs('connections').returns(connectionsContent)

  const result = await discoverWorkspace(explore)

  t.truthy(result)
  t.deepEqual(await result.connections, connectionsContent)
})
