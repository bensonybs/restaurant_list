const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = 3000
//Set view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')











app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`);
})