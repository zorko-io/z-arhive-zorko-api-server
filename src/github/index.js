const axios = require('axios')
const config = require('../config')
const explore = require('./explore').explore
const R = require('ramda')

function trace (...args) {
  debugger
  console.log(JSON.stringify(args, null, 2))
}

function error (e) {
  console.error(e)
}

const requestConfig = {
  baseURL: config.repository.github.contenApiUrl
}
const request = axios.create(requestConfig)
const exploreContent = R.partial(explore, [request])

// async function testAsync (bar) {
//   return [1, 2, 3, bar]
// }

// const curryTestAsync = R.partial(testAsync, ['123'])

// const result = curryTestAsync()
const result = exploreContent('/connections/')
result.then(trace, error)
