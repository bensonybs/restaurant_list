const express = require('express') 
const restaurants = require('./modules/restaurants')
const home = require('./modules/home')
const router = express.Router()

router.use('/', home)
router.use('/restaurants', restaurants)

module.exports = router