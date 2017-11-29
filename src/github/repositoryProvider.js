const R = require('ramda')
const axios = require('axios')
const config = require('../config')
const isWorkspaceContent = require('./isWorkspaceContent').isWorkspaceContent
const dataOnlyResponse = require('./util/dataOnlyRespose').dataOnlyResponse
const exploreByPath = require('./exploreByPath').exploreByPath
const fetchWorkspace = require('./fetchWorkspace').fetchWorkspace

module.exports = {
  repositoryProvider: (
    contentApiUrlTemplate = config.repository.github.contenApiUrl,
    request = axios
  ) => {
    const curryExplore = R.curry(exploreByPath)
    const exploreGithubRepo = curryExplore(
      R.__,
      dataOnlyResponse(request),
      isWorkspaceContent
    )
    const downloadByUrl = R.compose(
      dataOnlyResponse(request),
      R.prop('download_url')
    )
    return {
      async loadWorkspace (tenantId, repoName) {
        const baseUrL = contentApiUrlTemplate
          .replace(':tenant', tenantId)
          .replace(':repoName', repoName)

        const explore = exploreGithubRepo(baseUrL)
        const workspace = await fetchWorkspace(explore, downloadByUrl)

        return workspace
      }
    }
  }
}
