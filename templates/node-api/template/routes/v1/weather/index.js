const router = require('express').Router()

// Add your GET/POST etc routes here
router.get('/:location', require('./controllers/get-location'))
//router.post('/:location', require('./controllers/post-location'))

module.exports = router
