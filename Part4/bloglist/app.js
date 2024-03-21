/* eslint-disable @stylistic/js/linebreak-style */
const { MONGODB_URI_2 } =require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const middlware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
logger.info('connecting to',MONGODB_URI_2)
mongoose.connect(MONGODB_URI_2)
  .then(() => { logger.info('Connected to MONGODB') })
  .catch((error) => {
    logger.error('Failed to connect to MONGODB: ', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middlware.requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
app.use('/api/blogs', blogsRouter)
app.use('/api/users',usersRouter)

app.use(middlware.unknownEndpoint)
app.use(middlware.errorHandler)

module.exports = app

























module.exports =app