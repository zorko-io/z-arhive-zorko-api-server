const R = require('ramda')
const pathCheckers = require('./pathCheckers')

const isConnectionFolderContent = R.compose(
  pathCheckers.isConnectionsFolder,
  R.prop('path')
)

async function fetchWorkspace (explore, downloadByUrl) {
  const result = {
    connections: [],
    looks: [],
    models: []
  }
  const root = await explore('/')

  const connectionFolder = R.find(isConnectionFolderContent, root)

  if (connectionFolder) {
    const connectionFolderPath = R.prop('path', connectionFolder)
    const connectionContents = await explore(connectionFolderPath)
    if (!R.isEmpty(connectionContents)) {
      const connectionDowloads = await Promise.all(
        R.map(downloadByUrl, connectionContents)
      )

      console.log(JSON.stringify(connectionDowloads, null, 2))
      result.connections = connectionDowloads
    }
  }
  return result
}

module.exports = {
  fetchWorkspace: fetchWorkspace
}
