const mongoose = require('mongoose')
const log = require('@lib/logger')

mongoose.connect(process.env.DB_HOST, {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  pass: process.env.DB_PASSWORD,
  useNewUrlParser: true
})

mongoose.connection.on('error', error => {
  log.error('ERROR: MONGO - ', error)
})
