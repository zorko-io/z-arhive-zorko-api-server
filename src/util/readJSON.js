const R = require('ramda')
const fs = require('fs')

const readJSON = (filename) => {
  const content = fs.readFileSync(filename)
  const jsonObject = JSON.parse(content.toString())
  return jsonObject
}

module.exports = {
  readJSON: R.memoize(readJSON)
}
