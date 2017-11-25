import test from 'ava'
import {dataOnlyResponse} from './dataOnlyRespose'

test('wrap in data only respose', async t => {
  const request = async () => ({data: [1, 2, 3]})
  const requestWithDataOnlyResponse = dataOnlyResponse(request)
  const list = await requestWithDataOnlyResponse()
  t.deepEqual(list, [1, 2, 3])
})
