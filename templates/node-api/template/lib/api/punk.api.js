const axios = require('axios')

const punkApi = axios.create({
  baseURL: process.env.PUNK_API_BASE_URL,
  headers: {
    Accept: 'application/json'
  }
})

module.exports = punkApi
