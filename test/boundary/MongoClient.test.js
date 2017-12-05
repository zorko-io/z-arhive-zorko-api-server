import test from 'ava'
import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/boundary_test_to_drop'
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

const dropDatabase = async (db) => {
  return db.dropDatabase()
}

test.beforeEach(async t => {
  t.context.Db = await connectByUrl(url)
})

test.afterEach(async t => {
  t.context.Db.close()
})

test.serial('inserting document', async t => {
  const Db = t.context.Db

  const {result, ops} = await insertDocument(Db)

  t.is(result.n, 3)
  t.is(ops.length, 3)
})

test.serial('update document', async t => {
  const Db = t.context.Db

  const {result} = await updateDocument(Db)

  t.is(result.n, 1)
})

test.serial('delete documents', async t => {
  const Db = t.context.Db

  const {result} = await deleteDocument(Db)

  t.is(result.n, 1)
})

test.serial('find all documents', async t => {
  const Db = t.context.Db

  const docs = await findAll(Db)

  t.true(docs.length > 0)
})

test.serial('delete all documents', async t => {
  const Db = t.context.Db

  let docs = await findAll(Db)

  for (let doc of docs) {
    await deleteDocument(Db, doc)
  }

  docs = await findAll(Db)

  t.deepEqual(docs, [])
})

test.serial('clean up database',async t => {
  const Db = t.context.Db
  await dropDatabase(Db)
  t.pass()
})
