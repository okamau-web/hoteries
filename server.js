if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path:'.env' });
} 
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')

  
mongoose.connect('mongodb://localhost/hoteliers', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
  }) .then(() =>console.log('You are now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err))
app.use('/', indexRouter)


app.listen(process.env.PORT || 3000)