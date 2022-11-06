const express = require('express')
const router = express.Router()
router.route('/register')
  .get((req, res, next) => {
    res.render('register')
  })
  .post((req, res, next) => {
    
  })
router.route('/login')
  .get((req, res, next) => {
    res.render('login')
  })
  .post((req, res, next) => {

  })
router.route('logout')
  .get((req, res, next) => {
    
  })

module.exports = router
