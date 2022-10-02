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








app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`);
})