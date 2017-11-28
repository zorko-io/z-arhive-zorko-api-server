const R = require('ramda')
const pathCheckers = require('./pathCheckers')

const isConnectionFolderContent = R.compose(
  pathCheckers.isConnectionsFolder,
  R.prop('path')
)

async function fetchWorkspace (explore, downloadByUrl) {
  let result
  const root = await explore('/')

  const connectionFolder = R.find(isConnectionFolderContent, root)

  if (connectionFolder) {
    result = {
      connections: [],
      looks: [],
      models: []
    }

    const connectionFolderPath = R.prop('path', connectionFolder)
    const connectionContents = await explore(connectionFolderPath)
    if (!R.isEmpty(connectionContents)) {
      const connectionDowloads = await Promise.all(
        R.map(downloadByUrl, connectionContents)
      )
      result.connections = connectionDowloads
    }
  }

  return result
}

module.exports = {
  fetchWorkspace: fetchWorkspace
}
