const express = require('express')
const router = express.Router()
const User = require('../../models/user.js')
const passport = require('passport')

// GET: Regitster Page
// POST: Register New User
router.route('/register')
  .get((req, res, next) => {
    res.render('register')
  })
  .post((req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    //Check user existence
    User.findOne({ email }).then(user => {
      if (user) {
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return User.create({ name, email, password })
          .then(() => { res.redirect('/') })
          .catch(err => console.log(err))
      }
    }
    ).catch(err => console.log(err))
  })
// GET: Login page
// POST: User login
router.route('/login')
  .get((req, res, next) => {
    res.render('login')
  })
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  }))
// GET:
router.route('logout')
  .get((req, res, next) => {

  })

module.exports = router
