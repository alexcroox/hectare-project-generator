const Sentry = require('@sentry/node')

class Logger {
  error(error, message) {
    console.error(error)
    if (message) console.error(message)
    Sentry.captureException(error)
  }

  debug(data, message) {
    console.log(data)
    if (message) console.error(message)
  }
}

module.exports = new Logger()
