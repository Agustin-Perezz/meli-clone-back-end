const express = require("express");
const morgan = require("morgan");
const cors = require('cors');

const indexRouter = require('./src/api/routes/index');

// require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3080;

const whiteList = [ 'http://localhost:3000', 'http://localhost:3000', 'https://meli-backend-api.herokuapp.com/' ];

app.use( cors({ origin: whiteList }))
app.use( morgan('dev') );
app.use( express.json() );

app.get( '/', (req,res) => res.send('Test meli-api.'));

app.use( '/api', indexRouter );

app.listen( PORT, () => {
  console.log(`App on port ${ PORT }`);
})

module.exports = app;
