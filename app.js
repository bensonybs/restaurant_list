const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport.js')
const routes = require('./routes')
const app = express()
const PORT = 3000

// Set mongoose
require('./config/mongoose.js')
// Set method override
app.use(methodOverride('_method'))
// Set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// Set session
app.use(session({
  secret: 'RestaurantSecret',
  resave: false, //強制將session更新到session store內，參考 https://www.npmjs.com/package/express-session#resave
  saveUninitialized: true //強制將未初始化的session存回store內，參考 https://www.npmjs.com/package/express-session#saveuninitialized
}))
// Set passport
usePassport(app)
// Set body parser
app.use(express.urlencoded({ extended: true }))
// Set static file
app.use(express.static('public'))
// Set locals middleware
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
// Set routes
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`);
})