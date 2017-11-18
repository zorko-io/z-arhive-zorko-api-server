const R = require('ramda')

const isDir = R.propEq('type', 'dir')

const areConnectionsAvailable = R.propEq('name', 'connections')
const areLooksAvailable = R.propEq('name', 'looks')
const areModelsAvaulable = R.propEq('name', 'models')
const isConnectionsDir = R.allPass([isDir, areConnectionsAvailable])
const isLooksDir = R.allPass([isDir, areLooksAvailable])
const isModelsDir = R.allPass([isDir, areModelsAvaulable])

const filterConnections = R.filter(isConnectionsDir)
const filterLooks = R.filter(isLooksDir)
const filterModels = R.filter(isModelsDir)

const urlPropFromHead = R.compose(R.prop('url'), R.head)

const connectionsToUrl = R.compose(urlPropFromHead, filterConnections)
const looksToUrl = R.compose(urlPropFromHead, filterLooks)
const modelsToUrl = R.compose(urlPropFromHead, filterModels)

const discoverWorkspaceTopLevelResources = (contents) => ({
  connections: connectionsToUrl(contents),
  looks: looksToUrl(contents),
  models: modelsToUrl(contents)
})
module.exports = {
  discoverWorkspaceTopLevelResources
}
