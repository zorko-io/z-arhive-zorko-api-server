import test from 'ava'
import {mergeGlobs} from './mergeGlobs'

test('merge globs', async t => {
  const globs = ['folder/', 'baz/*.js', 'foo/']

  t.deepEqual(mergeGlobs(globs), '{folder/,baz/*.js,foo/}')
})

test('merge globs null', async t => {
  const globs = []

  t.deepEqual(mergeGlobs(globs), '{}')
})
