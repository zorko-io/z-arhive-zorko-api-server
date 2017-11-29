const R = require('ramda')

const joinGlobs = R.join(',')
const wrapInBrakets = (joinedGlob) => `{${joinedGlob}}`

module.exports = {
  mergeGlobs: R.compose(wrapInBrakets, joinGlobs)
}
