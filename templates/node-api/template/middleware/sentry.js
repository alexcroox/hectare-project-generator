const Sentry = require('@sentry/node')

// Let Sentry post off errors before Lambda kills the process
const sentryFlush = async (req, res, next) => {
  const _end = res.end

  res.end = async function end(chunk, encoding) {
    await Sentry.flush()
    return _end.call(this, chunk, encoding)
  }

  next()
}

module.exports = sentryFlush
