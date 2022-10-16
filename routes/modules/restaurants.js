const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js') //Import restaurant model

//Create new restaurant
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/', (req, res) => {
  //Delete property of restaurant object with empty input value
  for (let prop in req.body) {
    if (req.body[prop] === '') {
      delete req.body[prop]
    }
  }
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//Show restaurant detail
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => { res.render('show', { restaurant }) })
    .catch(error => console.log(error))
  })
//Update restaurant
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', {restaurant}))
    .catch(error => console.log(error))
})
router.post('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .then(restaurant => {
      for (let prop in req.body) {
        restaurant[prop] = req.body[prop]
      }
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
//Delete restaurant
router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .then(restaurant => { return restaurant.remove() })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => console.log(error))
})


module.exports = router