const axios = require('axios')

const weatherApi = axios.create({
  baseURL: process.env.WEATHER_API_BASE_URL,
  headers: {
    Accept: 'application/json'
  },
  params: {
    appid: process.env.WEATHER_API_KEY
  }
})

module.exports = weatherApi
