const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const routes = require('./routes/routes.js')

const app = express();
//if it doesn't work uncomment 
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('dotenv').config();

const port = process.env.PORT ||5000

app.use('/', routes)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser:true,
  useUnifiedTopology: true,
  useFindAndModify: false})
    .then(() => app.listen(port, () => console.log(`Connected to database and listening on port: ${port}`)))
    .catch((err) => console.log(err))

