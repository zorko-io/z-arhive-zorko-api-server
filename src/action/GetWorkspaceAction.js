module.exports = {
  async execute ({tenant, repositoryName}, repositoryProvider) {
    let workspace = null
    try {
      workspace = await repositoryProvider.loadWorkspace(tenant, repositoryName)
    } catch (err) {
      console.error(err)
    }
    return workspace
  }
}
