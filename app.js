const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = 3000
//Set view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//Set static file
app.use(express.static('public'))










app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`);
})