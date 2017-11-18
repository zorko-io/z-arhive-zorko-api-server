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
  t.context.looksInput = readJSON(
    './test/github/__data__/github-content-looks.in.json'
  )
  t.context.looksOut = readJSON(
    './test/github/__data__/github-content-looks.out.json'
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

test('discover all looks', async t => {
  const result = github.discoverLooks(
    t.context.looksInput
  )

  t.deepEqual(result,
    t.context.looksOut
  )
})
