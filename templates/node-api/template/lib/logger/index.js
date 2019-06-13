const Sentry = require('@sentry/node')
const Log = require('./model')

class Logger {
  error(error, message = null) {
    console.error(error)

    if (message) {
      console.error(message)
    }

    this.dbSave('API error', error, message)
    Sentry.captureException(error)
  }

  debug(data, message) {
    console.log(data)
    if (message) console.error(message)
  }

  // Save log to the database
  async dbSave(type, data, message) {
    const log = new Log({
      type,
      data,
      message
    })

    await log.save()
  }
}

module.exports = new Logger()
