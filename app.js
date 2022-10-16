const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
const app = express()
const PORT = 3000

//Set mongoose
require('./config/mongoose.js')
//Set method override
app.use(methodOverride('_method'))
//Set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
//Set body parser
app.use(express.urlencoded({ extended: true }))
//Set static file
app.use(express.static('public'))
//Set routes
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`);
})