const passport = require('passport')
const User = require('../models/user')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

module.exports = app => {
  // Initialize passport.js
  app.use(passport.initialize())
  app.use(passport.session())
  // Set local strategy
  passport.use(
    new localStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            // done(error, user info[trusy], failure message)
            return done(null, false, { message: 'The email is not registered!' })
          }
          return bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
              return done(null, false, { message: 'Email or password incorrect.' })
            }
            return done(null, user)
          })
        })
        .catch(err => done(err, false))
    })
  )
  // Set serialize and deserialize, See https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
  // And https://www.youtube.com/watch?v=wbylpKRkOD0
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}