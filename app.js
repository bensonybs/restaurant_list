const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const routes = require('./routes')
const app = express()
const PORT = 3000

//Set mongoose
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongo connect error!')
})
db.once('open', () => {
  console.log('mongo connected!')
})
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