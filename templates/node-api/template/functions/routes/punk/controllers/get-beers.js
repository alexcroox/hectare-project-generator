const punkApi = require('../../../../lib/api/punk.api')
const parseAxiosError = require('../../../../lib/api/parse-axios-error')
const log = require('../../../../lib/logger')

const getBeers = async (request, response) => {
  try {
    let data = request.params

    log.debug('Calling punk API for beers')

    let apiResponseData

    try {
      let apiResponse = await punkApi.request({
        method: 'GET',
        url: '/beers'
      })

      apiResponseData = apiResponse.data
    } catch (error) {
      log.error('API error', parseAxiosError(error))
      return response.status(500).json({
        status: 'error',
        message: 'Failed to call punk API',
        debug: process.env.IS_OFFLINE ? parseAxiosError(error) : undefined
      })
    }

    log.debug('Punk API response', apiResponseData)

    return response.status(200).json({
      status: 'success',
      message: 'Beers',
      data: apiResponseData
    })
  } catch (error) {
    log.error(error)

    return response.status(500).json({
      status: 'error',
      message: 'Failed to fetch beers',
      debug: process.env.IS_OFFLINE ? error : undefined
    })
  }
}

module.exports = getBeers
