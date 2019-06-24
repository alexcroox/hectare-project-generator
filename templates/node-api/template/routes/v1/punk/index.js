const router = require('express').Router()

// Add your GET/POST etc routes here
router.get('/', require('./controllers/get-beers'))
//router.post('/', require('./controllers/post-beers'))

module.exports = router
