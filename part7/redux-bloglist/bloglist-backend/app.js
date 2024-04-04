const { MONGODB_URI } = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const middlware = require('./utils/middleware')


mongoose.set('strictQuery', false)
logger.info('connecting to', MONGODB_URI)
mongoose
    .connect(MONGODB_URI)
    .then(() => { logger.info('Connected to MONGODB') })
    .catch((error) => {
        logger.error('Failed to connect to MONGODB: ', error.message)
    })
app.use(cors())
app.use(express.json())
app.use(middlware.requestLogger)
app.use(middlware.tokenExtractor)

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', middlware.userExtractor, blogsRouter)


app.use(middlware.unknownEndpoint)
app.use(middlware.errorHandler)
module.exports = app