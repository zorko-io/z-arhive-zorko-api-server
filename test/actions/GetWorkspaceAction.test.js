import test from 'ava'
import GetWorkspaceAction from '../../src/action/GetWorkspaceAction'

test('bar', async t => {
  const bar = GetWorkspaceAction.execute({
    tenant: 'joe',
    repositoryName: 'joe-repo'
  })

  t.deepEqual(await bar, {
    currentScope: 'uuid-1',
    tenant: 'joe',
    repositoryName: 'joe-repo'
  })
})
