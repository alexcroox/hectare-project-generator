const yup = require('yup')
const weatherApi = require('../../../../lib/api/weather.api')
const parseAxiosError = require('../../../../lib/api/parse-axios-error')
const log = require('../../../../lib/logger')

const validationSchema = yup.object().shape({
  location: yup.string().required()
})

const getLocation = async (request, response) => {
  try {
    let data = request.params

    try {
      await validationSchema.validate(data)
    } catch (validationError) {
      log.debug(validationError.errors)

      return response.status(400).json({
        status: 'error',
        message: validationError.errors
      })
    }

    log.debug('Calling weather API for location:', data.location)

    try {
      let apiResponse = await weatherApi.request({
        method: 'GET',
        url: `/weather/?query=${data.location}`
      })

      apiResponseData = apiResponse.data
    } catch (error) {
      log.error('API error', parseAxiosError(error))
      return response.status(500).json({
        status: 'error',
        message: 'Failed to call weather API',
        debug: process.env.IS_OFFLINE ? parseAxiosError(error) : undefined
      })
    }

    log.debug('Weather response', apiResponseData)

    if (apiResponseData.id === undefined) {
      throw 'loadId missing from API response'
    }

    return response.status(200).json({
      status: 'success',
      message: 'Load successfully created',
      data
    })
  } catch (error) {
    log.error(error)

    return response.status(500).json({
      status: 'error',
      message: 'Failed to fetch weather',
      debug: process.env.IS_OFFLINE ? error : undefined
    })
  }
}

module.exports = getLocation
