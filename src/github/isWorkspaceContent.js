const resourceTypesGlobs = require('./resouceTypesGlobs')
const matchGlob = require('./glob/matchGlob').matchGlob
const mergeGlobs = require('./glob/mergeGlobs').mergeGlobs
const R = require('ramda')

const allGlobs = Object.values(resourceTypesGlobs)
const pahtGlobPattern = mergeGlobs(allGlobs)
const matchWorkspacePath = R.partial(matchGlob, [pahtGlobPattern])

module.exports = {
  isWorkspaceContent: R.compose(matchWorkspacePath, R.prop('path'))
}
