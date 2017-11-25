const express = require('express')
const config = require('../config')

const axios = require('axios')
const GetWorkspaceAction = require('../action/GetWorkspaceAction')
const githubRepositoryProvider = require(
  '../github/repositoryProvider'
).repositoryProvider

module.exports = (
  expres = express
) => {
  const router = express.Router()

  const repositoryProvider = githubRepositoryProvider(
    config.repository.github.contenApiUrl,
    axios
  )

  const getWorspaceByRepoUri = async (request, response, next) => {
    const result = await GetWorkspaceAction.execute(
      request.params,
      repositoryProvider
    )
    response.send(result)
  }

  router.get('/api/workspaces/:tenant/:repositoryName', getWorspaceByRepoUri)

  return router
}
