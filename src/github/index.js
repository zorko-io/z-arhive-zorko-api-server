const axios = require('axios')
const config = require('../config')
const explore = require('./explore').explore
const resourceTypesGlobs = require('./resouceTypesGlobs')
const {matchGlob} = require('./matchGlob')
const {mergeGlobs} = require('./mergeGlobs')
const R = require('ramda')

function trace (...args) {
  debugger
  console.log(JSON.stringify(args, null, 2))
}

function error (e) {
  console.error(e)
}

const requestConfig = {
  baseURL: config.repository.github.contenApiUrl
}
const request = axios.create(requestConfig)

const allGlobs = Object.values(resourceTypesGlobs)
const pahtGlobPattern = mergeGlobs(allGlobs)
const matchWorkspacePath = R.partial(matchGlob, [pahtGlobPattern])

const isWorkspaceContent = R.compose(matchWorkspacePath, R.prop('path'))

const exploreContent = R.composeP(
  R.filter(isWorkspaceContent),
  R.partial(explore, [request])
)

// async function testAsync (bar) {
//   return [1, 2, 3, bar]
// }

// const curryTestAsync = R.partial(testAsync, ['123'])

// const result = curryTestAsync()
const result = exploreContent('/')
result.then(trace, error)
