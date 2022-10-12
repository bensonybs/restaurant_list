const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: { type: String, require: true },
  name_en: { type: String, require: false },
  category: { type: String, require: false },
  image: { type: String, require: false, default: 'https://cdn-icons-png.flaticon.com/512/1996/1996055.png' },
  location: { type: String, require: false },
  phone: { type: String, require: false },
  google_map: { type: String, require: false, default: 'https://www.google.com.tw/maps' },
  rating: { type: Number, require: false, default: 0 },
  description: { type: String, require: false },
})

module.exports = mongoose.model('Restaurant', restaurantSchema)