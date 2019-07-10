// Allow us to use aliases for our imports, e.g require('@/lib/...')
// The config for this lives in package.json
require('module-alias/register')

const serverless = require('serverless-http')
const express = require('express')
const app = express()

const log = require('@hectare/service-log')
log.init()

// Setup our usual express helpers and middleware
const hectareExpress = require('@hectare/service-express')
hectareExpress.init(app)

// Root Routes
app.use('/v1/weather', require('./routes/v1/weather'))
app.use('/v1/punk-beers', require('./routes/v1/punk'))

module.exports.handler = serverless(app)
