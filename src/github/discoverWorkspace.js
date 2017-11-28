const R = require('ramda')
const pathCheckers = require('./pathCheckers')

const isConnectionFolderContent = R.compose(
  pathCheckers.isConnectionsFolder,
  R.prop('path')
)

async function discoverWorkspace (explore) {
  let workspaceDiscoverOptions
  const root = await explore('/')

  const connectionFolder = R.find(isConnectionFolderContent, root)
  const connectionFolderPath = R.prop('path', connectionFolder)

  if (connectionFolder) {
    workspaceDiscoverOptions = {
      connections: explore(connectionFolderPath),
      looks: Promise.resolve([]),
      models: Promise.resolve([])
    }
    return workspaceDiscoverOptions
  }
}
module.exports = {
  discoverWorkspace: discoverWorkspace
}
