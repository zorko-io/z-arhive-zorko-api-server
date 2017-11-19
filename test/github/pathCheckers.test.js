import test from 'ava'
import * as pathCheckers from '../../src/github/pathCheckers'

test('check looks', async t => {
  t.true(pathCheckers.isLooksFolder('looks'))
  t.false(pathCheckers.isLooksFolder('aaaaaa'))

  t.true(pathCheckers.isLook('looks/blblblbl.look.json'))
  t.false(pathCheckers.isLook('blblblbllb/test.look.json'))
})

test('check connections', async t => {
  t.true(pathCheckers.isConnectionsFolder('connections'))
  t.false(pathCheckers.isConnectionsFolder('aaaaaa/connections'))

  t.true(pathCheckers.isConnection('connections/blblbl.connection.json'))
  t.false(pathCheckers.isConnection('connections/blblblbllb.json'))
})

test('check model path', async t => {
  t.true(pathCheckers.isModelsFolder('models'))
  t.false(pathCheckers.isModelsFolder('blblblbllb'))

  t.true(pathCheckers.isModelFolder('models/blblblbl/'))
  t.false(pathCheckers.isModelFolder('aaaaaa/models/aaaa'))

  t.true(pathCheckers.isModelCore('models/blblblbl/stuff.model.json'))
  t.false(pathCheckers.isModelCore('aaaaaa/models/aaaa/stuff.json'))

  t.true(pathCheckers.isModelDoc('models/blblblbl/stuff.doc.md'))
  t.false(pathCheckers.isModelDoc('models/blblblbl/stuff.doc.json'))

  t.true(pathCheckers.isModelCore('models/blblblbl/stuff.model.json'))
  t.false(pathCheckers.isModelCore('models/bbbb/bbbb/stuff.model.json'))
})
