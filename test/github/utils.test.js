import test from 'ava'
import {readJSON} from '../../src/util/readJSON'
import * as github from '../../src/github/utils'

test.beforeEach(t => {
  t.context.topLevelInput = readJSON(
    './test/github/__data__/github-content-top-level.in.json'
  )
  t.context.topLevelOut = readJSON(
    './test/github/__data__/github-content-top-level.out.json'
  )
})

test('discover top level resources', async t => {
  const result = github.discoverWorkspaceTopLevelResources(
    t.context.topLevelInput
  )

  t.deepEqual(result,
    t.context.topLevelOut
  )
})
