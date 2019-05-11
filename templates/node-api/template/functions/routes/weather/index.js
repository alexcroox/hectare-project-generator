const router = require('express').Router()

// Add your GET/POST etc routes here
router.get('/:location', require('./controllers/get-location'))

module.exports = router
