import test from 'ava'
import {explore} from './explore'

test('explore path', async t => {
  const request = async () => ({data: [1, 2, 3]})
  const list = await explore(request, '/')
  t.deepEqual(list, [1, 2, 3])
})
