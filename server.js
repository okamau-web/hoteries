if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path:'.env' });
} 
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')

const  recruiterRouter = require('./routes/recruiters')


 const link = require('./p')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use( bodyParser.urlencoded({limit:'10mb', extended:false}))
const mongoose = require('mongoose')

  
mongoose.connect( link, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
  }) .then(() =>console.log(' connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err))


  app.use('/', indexRouter)

  app.use('/recruiters', recruiterRouter)

app.listen(process.env.PORT || 3000)