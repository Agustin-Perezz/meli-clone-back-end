const express = require("express");
const morgan = require("morgan");
const cors = require('cors');

const indexRouter = require('./src/api/routes/index');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3005;

app.use( morgan('dev') );
app.use( express.json() );

app.use( '/api', indexRouter );

app.get( '/', (req,res) => res.send('Test meli-api.'));

app.listen( PORT, () => {
  console.log(`App on port ${ PORT }`);
})

module.exports = app;
