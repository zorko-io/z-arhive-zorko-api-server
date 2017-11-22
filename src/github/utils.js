const R = require('ramda')

const isFolder = R.propEq('type', 'dir')
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
  isFolder,
  isTopLevelContainerName
])

const isLookName = R.compose(
  R.match(/.*\.look\.json$/),
  R.prop('name')
)

const isConnectionName = R.compose(
  R.match(/.*\.connection\.json$/),
  R.prop('name')
)

const isModelPath = R.compose(
  R.match(/^\/models(\/)?/),
  R.prop('path')
)
const isModelFolder = R.allPass([isFolder, isModelPath])

// const isModelDocName = R.compose(
//   R.match(/.*\.doc\.json$/),
//   R.prop('name')
// )

const isWorkspaceResourceName = R.anyPass([
  isLookName,
  isConnectionName
])
const isWorkspaceFileResource = R.allPass([
  isFile,
  isWorkspaceResourceName
])

const isAnyWorkspaceResource = R.anyPass([
  isWorkspaceFileResource,
  isModelFolder
])

const discoverWorkspaceTopLevelResources = R.compose(
  mapToNameUrl,
  R.filter(isTopLevelContainer)
)

const discoverWorkspaceResources = R.compose(
  mapToNameUrl,
  R.filter(isAnyWorkspaceResource)
)

module.exports = {
  discoverWorkspaceTopLevelResources,
  discoverWorkspaceResources
}
