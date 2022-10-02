const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = 3000
const restaurantList = require('./restaurant.json')
//Set view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//Set static file
app.use(express.static('public'))

//Routes
app.get('/', (req, res) => {
  const restaurants = restaurantList.results
  res.render('index', { restaurants: restaurants })
})
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  // Check validity of query
  res.render('show', { restaurant: restaurant })
})







app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`);
})