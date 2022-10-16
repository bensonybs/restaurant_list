const Restaurant = require('../restaurant.js') //Import restaurant model
const restaurantSeedData = require('../../restaurant.json')
const db = require('../../config/mongoose.js')

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