import test from 'ava'
import {
  fetchWorkspace
} from './fetchWorkspace'

test('should return undefined if empty exploration', async t => {
  const explore = (path) => []
  const downloadByUrl = () => {}

  const result = await fetchWorkspace(explore, downloadByUrl)

  t.falsy(result)
})
