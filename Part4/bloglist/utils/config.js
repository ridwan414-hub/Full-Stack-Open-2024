/* eslint-disable @stylistic/js/linebreak-style */
require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URI_2 = process.env.MONGODB_URI_2

module.exports = {
  MONGODB_URI,
  MONGODB_URI_2,
  PORT
}