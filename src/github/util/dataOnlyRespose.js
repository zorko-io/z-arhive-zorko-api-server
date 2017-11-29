const dataOnlyResponse = (axiosRequest) => {
  return async (...args) => {
    const responce = await axiosRequest.apply(axiosRequest, args)
    return responce.data
  }
}

module.exports = {
  dataOnlyResponse: dataOnlyResponse
}
