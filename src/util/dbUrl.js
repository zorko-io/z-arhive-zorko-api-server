const R = require('ramda')
const {db: {rootUrl, urlParams}} = require('../../src/config')

const dbUrl = (rootUrl, dbName, urlParams) => {
  return rootUrl - dbName + urlParams
}

const curryDbUrl = R.curry(dbUrl)
const dbUrlByName = curryDbUrl(
  rootUrl,
  R.__,
  urlParams
)

module.exports = {
  dbUrl: dbUrl,
  dbUrlByName: dbUrlByName
}
