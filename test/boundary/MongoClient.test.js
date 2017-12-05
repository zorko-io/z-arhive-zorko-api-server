import test from 'ava'
import { MongoClient } from 'mongodb'
import config from '../../src/config'

const url = config.db.url
const connectByUrl = async (url) => MongoClient.connect(url)

const insertDocument = async (db) => {
  const collection = db.collection('documents')
  return collection.insertMany([{a: 1}, {a: 2}, {a: 3}])
}
const updateDocument = async (db) => {
  const collection = db.collection('documents')
  return collection.updateOne({a: 2}, {$set: {b: 1}})
}
const deleteDocument = async (db, doc = {a: 3}) => {
  const collection = db.collection('documents')
  return collection.deleteOne(doc)
}
const findAll = async (db) => {
  const collection = db.collection('documents')
  return collection.find({}).toArray()
}

test.serial('should connect to db', async t => {
  const Db = await connectByUrl(url)

  Db.close()

  t.truthy(Db)
})

test.serial('should fail connection', async t => {
  const url = 'blblblbllblblb'
  t.plan(1)

  try {
    await connectByUrl(url)
  } catch (err) {
    t.truthy(err)
  }
})

test.serial('inserting document', async t => {
  const Db = await connectByUrl(url)

  const {result, ops} = await insertDocument(Db)

  Db.close()

  t.is(result.n, 3)
  t.is(ops.length, 3)
})

test.serial('update document', async t => {
  const Db = await connectByUrl(url)

  const {result} = await updateDocument(Db)

  t.is(result.n, 1)
})

test.serial('delete documents', async t => {
  const Db = await connectByUrl(url)

  const {result} = await deleteDocument(Db)

  t.is(result.n, 1)
})

test.serial('find all documents', async t => {
  const Db = await connectByUrl(url)

  const docs = await findAll(Db)

  t.true(docs.length > 0)
})

test.serial('delete all documents', async t => {
  const Db = await connectByUrl(url)

  let docs = await findAll(Db)

  for (let doc of docs) {
    await deleteDocument(Db, doc)
  }

  docs = await findAll(Db)

  t.deepEqual(docs, [])
})

