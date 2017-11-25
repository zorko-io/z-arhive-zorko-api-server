const R = require('ramda')

module.exports = {
  exploreByPath: (baseUrl, request, isWorkspaceContent) => {
    const requestByPath = R.partial(
      (baseUrl, path) => (request(baseUrl + path)),
      [baseUrl]
    )
    const exploreGitHubContent = R.composeP(
      R.filter(isWorkspaceContent),
      requestByPath
    )

    return exploreGitHubContent
  }
}
