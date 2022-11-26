module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('Succes login')
      return next()
    }
    console.log('Not authenticated')
    res.redirect('/users/login')
  }
}