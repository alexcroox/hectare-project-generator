const Log = require('./model')

class Logger {
  error(message, error) {
    console.error(message, error)

    this.dbSave('API error', error, message)

    if (!process.env.IS_OFFLINE) {
      const Sentry = require('@sentry/node')
      Sentry.captureException(error)
    }
  }

  debug(message, data) {
    if (!data) {
      console.log(message)
    } else {
      console.log(message, data)
    }
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
