import test from 'ava'
import {readJSON} from '../../src/util/readJSON'
import * as github from '../../src/github/utils'

test.beforeEach(t => {
  t.context.githubContentInput = readJSON(
    './test/github/__data__/github-content.in.json'
  )
  t.context.githubContentOutput = readJSON(
    './test/github/__data__/github-content.out.json'
  )
})

test('Parse root content of repo', async t => {
  const result = github.discoverWorkspaceTopLevelResources(
    t.context.githubContentInput
  )

  t.deepEqual(result,
    t.context.githubContentOutput
  )
})
