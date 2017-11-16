module.exports = {
  async execute (context) {
    return {
      currentScope: 'uuid-1',
      tenant: context.tenant,
      repositoryName: context
    }
  }
}
