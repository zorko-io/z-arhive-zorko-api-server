const minimatch = require('minimatch')

module.exports = {
  matchGlob: (globPattern, string) => {
    let result
    try {
      result = minimatch(string, globPattern)
    } catch (e) {
      result = false
    }
    return result
  }
}
