const punkApi = require('@lib/api/punk.api')
const parseAxiosError = require('@lib/api/parse-axios-error')
const log = require('@hectare/service-log')

const getBeers = async (request, response) => {
  let data = request.params

  log.debug('Calling punk API for beers')

  let apiResponse = await punkApi
    .request({
      method: 'GET',
      url: '/beers'
    })
    .catch(error => {
      log.error('API error', parseAxiosError(error))
      return response.status(500).json({
        status: 'error',
        message: 'Failed to call punk API',
        debug: process.env.IS_OFFLINE ? parseAxiosError(error) : undefined
      })
    })

  let apiResponseData = apiResponse.data

  log.debug('Punk API response', apiResponseData)

  return response.status(200).json({
    status: 'success',
    message: 'Beers',
    data: apiResponseData
  })
}

module.exports = getBeers
