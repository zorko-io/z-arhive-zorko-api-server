class Connection {
  constructor (options) {
    // TODO: validation layer might be here
    this.name = options.name
    this.title = options.title
    this.path = options.path
    this.type = 'http'
    this.properties = {
      url: 'http://example.com/data.json'
    }
  }
}

module.exports = Connection
