const minimatch = require('minimatch')

const satisfy = (globPattern) => {
  return (path) => {
    return minimatch(path, globPattern)
  }
}

module.exports = {
  isLooksFolder: satisfy('looks'),
  isLook: satisfy('looks/*.look.json'),

  isConnectionsFolder: satisfy('connections'),
  isConnection: satisfy('connections/*.connection.json'),

  isModelsFolder: satisfy('models'),
  isModelFolder: satisfy('models/*/'),
  isModelDoc: satisfy('models/*/*.doc.md'),
  isModelCore: satisfy('models/*/*.model.json'),
  isModelView: satisfy('models/*/*.view.json')
}
