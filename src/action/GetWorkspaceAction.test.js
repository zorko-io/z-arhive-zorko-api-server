import test from 'ava'
import GetWorkspaceAction from './GetWorkspaceAction'

test('bar', async t => {
  const repositoryProvider = {
    loadWorkspace: async () => 'workspace'
  }

  const bar = GetWorkspaceAction.execute({
    tenant: 'joe',
    repositoryName: 'joe-repo'
  },
  repositoryProvider
  )

  t.deepEqual(await bar, 'workspace')
})
