const express = require('express')
const GetWorkspaceAction = require('../action/GetWorkspaceAction')

module.exports = (
  expres = express
) => {
  const router = express.Router()

  const getWorspaceByRepoUri = async (request, response, next) => {
    const result = await GetWorkspaceAction.execute({
      params: request.params
    })
    response.send(result)
  }

  router.get('/api/workspaces/:tenant/:repositoryName', getWorspaceByRepoUri)

  return router
}
