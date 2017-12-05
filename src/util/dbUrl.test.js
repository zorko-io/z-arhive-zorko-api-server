import test from 'ava'
import {dbUrl, dbUrlByName} from './dbUrl'

test('generate dbUrl from params', async t => {
  const url = dbUrl('dbprotocol://localhost:4444/', 'dbName', '?come=thing')
  t.is(url, 'dbprotocol://localhost:4444/dbName?come=thing')
})

test('generate default db url by db name', async t => {
  const url = dbUrlByName('dbName')
  t.truthy(url.indexOf('dbName') !== -1)
})
