const R = require('ramda')

const isDir = R.propEq('type', 'dir')
const isFile = R.propEq('type', 'file')

const mapToNameUrl = R.map((content) => ({
  [content.name]: content.url
}))

const isConnectonsContainerName = R.propEq('name', 'connections')
const isLooksContainerName = R.propEq('name', 'looks')
const isModelsContainerName = R.propEq('name', 'models')

const isTopLevelContainerName = R.anyPass([
  isConnectonsContainerName,
  isLooksContainerName,
  isModelsContainerName
])

const isTopLevelContainer = R.allPass([
  isDir,
  isTopLevelContainerName
])

const isLookName = R.compose(
  R.match(/.*\.look\.json$/),
  R.prop('name')
)

const isLookFile = R.allPass([isFile, isLookName])

const discoverWorkspaceTopLevelResources = R.compose(
  mapToNameUrl,
  R.filter(isTopLevelContainer)
)

const discoverLooks = R.compose(
  mapToNameUrl,
  R.filter(isLookFile)
)

module.exports = {
  discoverWorkspaceTopLevelResources,
  discoverLooks
}
