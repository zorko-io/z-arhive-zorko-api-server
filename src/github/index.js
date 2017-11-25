const axios = require('axios')
const config = require('../config')
const explore = require('./explore').explore
const R = require('ramda')
const isWorkspaceContent = require('./isWorkspaceContent').isWorkspaceContent
const pathCheckers = require('./pathCheckers')

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

const exploreGitHubContent = R.composeP(
  R.filter(isWorkspaceContent),
  R.partial(explore, [request])
)

const downloadRequest = axios.create()
const downloadContent = (axiosRequest) => {
  return async (...args) => {
    const responce = await axiosRequest.apply(axiosRequest, args)
    return responce.data
  }
}
const download = downloadContent(downloadRequest)

// async function testAsync (bar) {
//   return [1, 2, 3, bar]
// }

// const curryTestAsync = R.partial(testAsync, ['123'])

// const result = curryTestAsync()
// const result = exploreGitHubContent('/models/cars')

const isConnectionFolderContent = R.compose(
  pathCheckers.isConnectionsFolder,
  R.prop('path')
)

async function loadWorkspace (explore, download) {
  const result = {
    connections: [],
    looks: [],
    models: []
  }
  debugger
  const root = await explore('/')

  const connectionFolder = R.find(isConnectionFolderContent, root)

  if (connectionFolder) {
    const connectionFolderPath = R.prop('path', connectionFolder)
    const connectionContents = await explore(connectionFolderPath)
    if (!R.isEmpty(connectionContents)) {
      const downloadByUrl = R.compose(download, R.prop('download_url'))
      const connectionDowloads = await Promise.all(
        R.map(downloadByUrl, connectionContents)
      )
      console.log(JSON.stringify(connectionDowloads, null, 2))
      result.connections = connectionDowloads
    }
  }
  return result
}

const result = loadWorkspace(exploreGitHubContent, download)

result.then(trace, error)
