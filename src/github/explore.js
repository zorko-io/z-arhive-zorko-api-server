module.exports = {
  explore: async (request, path) => {
    const response = await request(path)
    return response.data
  }
}
