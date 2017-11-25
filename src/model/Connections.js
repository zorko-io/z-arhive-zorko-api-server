const R = require('ramda')

const findByPath = (path, array) => R.find(R.propIs('path', path), array)

class Connections {
  constructor (storage) {
    this._storage = storage
  }

  async findByPath (path) {
    return findByPath(path, this._storage)
  }
}

module.exports = Connections
