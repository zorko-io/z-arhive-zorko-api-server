const {
  LOOK,
  LOOKS,
  CONNECTION,
  CONNECTIONS,
  MODEL,
  MODELS,
  MODEL_DOC,
  MODEL_CORE,
  MODEL_VIEW
} = require('./resouceTypes')

module.exports = {
  [LOOK]: 'looks/*.look.json',
  [LOOKS]: 'looks',
  [CONNECTION]: 'connections/*.connection.json',
  [CONNECTIONS]: 'connections',
  [MODEL]: 'models/*/',
  [MODELS]: 'models',
  [MODEL_DOC]: 'models/*/*.doc.md',
  [MODEL_CORE]: 'models/*/*.model.json',
  [MODEL_VIEW]: 'models/*/*.view.json'
}
