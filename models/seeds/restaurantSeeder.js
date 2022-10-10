const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js') //Import restaurant model
const restaurantSeedData = require('../../restaurant.json')
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongo connect error!')
})
db.once('open', () => {
  for (const data of restaurantSeedData.results) {
    Restaurant.create({
      name: data.name,
      name_en: data.name_en,
      category: data.category,
      image: data.image,
      location: data.location,
      phone: data.phone,
      google_map: data.google_map,
      rating: data.rating,
      description: data.description,
    })
  }
  console.log('Import seed data sucessfully!')
})