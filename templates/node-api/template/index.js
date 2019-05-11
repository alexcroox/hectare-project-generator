const serverless = require('serverless-http')
const express = require('express')
const app = express()
const log = require('./lib/logger')

// Add Sentry error reporting
const Sentry = require('@sentry/node')
Sentry.init({
  dsn: process.env.SENTRY_DSN
})

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.errorHandler())

// Let Sentry post off errors before Lambda kills the process
const sentryFlush = require('./middleware/sentry')
app.use(sentryFlush)

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
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true
})

mongoose.connection.on('error', error => {
  log.error('MongoDB error', error)
  Sentry.captureException(error)
})

// Root Routes
app.use('/weather', require('./functions/routes/weather'))

module.exports.handler = serverless(app)
