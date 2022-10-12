const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const PORT = 3000
const Restaurant = require('./models/restaurant.js') //Import restaurant model
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
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//Set static file
app.use(express.static('public'))
//Routes
//Get all restaurants
app.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .sort({ '_id': 'asc' })
    .then(restaurants => { res.render('index', { restaurants }) })
    .catch(error => console.log(error))
})
//Show restaurant detail
app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => { res.render('show', { restaurant }) })
    .catch(error => console.log(error))

})
//Delete restaurant
app.delete('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .then(restaurant => { restaurant.remove() })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => console.log(error))
})
//Search for restaurants
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  //Search in mongodb for restaurant name
  Restaurant.find({ name: { $regex: keyword, $options: 'i' } })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))
})






app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`);
})