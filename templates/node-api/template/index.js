const serverless = require('serverless-http')
const express = require('express')
const app = express()

// Allow us to use aliases for our imports, e.g require('@/lib/...')
require('module-alias/register')

// Add Sentry error reporting
if (!process.env.IS_OFFLINE) {
  const Sentry = require('@sentry/node')
  Sentry.init({
    dsn: process.env.SENTRY_DSN
  })

  app.use(Sentry.Handlers.requestHandler())
  app.use(Sentry.Handlers.errorHandler())

  // Let Sentry post off errors before Lambda kills the process
  const sentryFlush = require('./middleware/sentry')
  app.use(sentryFlush)
}

// Add CORS support for our browser calls
const cors = require('cors')
app.use(cors())

// Add logging of each request
const morgan = require('morgan')
app.use(morgan('tiny'))

// Convert body of requests to json
const bodyParser = require('body-parser')
app.use(bodyParser.json({ strict: false }))

// Easily extract the bearer token from headers
const bearerToken = require('express-bearer-token')
app.use(bearerToken())

// Connect to our db
require('./lib/mongo')

// Root Routes
app.use('/v1/weather', require('./routes/v1/weather'))
app.use('/v1/punk-beers', require('./routes/v1/punk'))

module.exports.handler = serverless(app)
