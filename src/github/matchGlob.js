const minimatch = require('minimatch')

module.exports = {
  matchGlob: (globPattern, string) => (minimatch(string, globPattern))
}
