const github = require('octonode')

module.exports = {
  async execute (context) {
    const client = github.client()

    const content = new Promise((resolve, reject) => {
      const handleResponse = (err, status, body) => {
        if (err) {
          reject(err)
        } else {
          resolve(body)
        }
      }
      client.get(
        '/repos/zorko-io/zorko-demo-repository/contents',
        handleResponse
      )
    })

    return {
      currentScope: 'uuid-1',
      tenant: await context.tenant,
      repositoryName: context.repositoryName
    }
  }
}
