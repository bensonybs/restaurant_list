const passport = require('passport')
const User = require('../models/user')
const localStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')

module.exports = app => {
  // Initialize passport.js
  app.use(passport.initialize())
  app.use(passport.session())
  // Set local strategy
  passport.use(
    new localStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            // done(error, user info[trusy], failure message)
            return done(null, false, req.flash('error_msg', '此帳號尚未註冊'))
          }
          return bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
              return done(null, false, req.flash('error_msg', '密碼錯誤，請重新再試'))
            }
            return done(null, user)
          })
        })
        .catch(err => done(err, false))
    })
  )
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
  }))
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