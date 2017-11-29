const R = require('ramda')
const {matchGlob} = require('./glob/matchGlob')

const match = R.curry(matchGlob)

module.exports = {
  isLooksFolder: match('looks'),
  isLook: match('looks/*.look.json'),

  isConnectionsFolder: match('connections'),
  isConnection: match('connections/*.connection.json'),

  isModelsFolder: match('models'),
  isModelFolder: match('models/*/'),
  isModelDoc: match('models/*/*.doc.md'),
  isModelCore: match('models/*/*.model.json'),
  isModelView: match('models/*/*.view.json')
}
