import test from 'ava'
import {
  exploreByPath
} from './exploreByPath'

test('should concat url and return data', async t => {
  const explore = await exploreByPath(
    'http://example.com',
    async (url) => ([url]),
    () => true
  )

  const result = await explore('/blabla')
  t.deepEqual(result, ['http://example.com/blabla'])
})

test('should return empty array', async t => {
  const explore = await exploreByPath(
    'http://example.com',
    async (url) => ([url]),
    () => false
  )

  const result = await explore('/blabla')
  t.deepEqual(result, [])
})
