/* eslint-disable @stylistic/js/linebreak-style */
const app = require('./app')
const { info } = require('./utils/logger')
const { PORT } = require('./utils/config')


app.listen(PORT, () => {
  info(`server running on PORT ${PORT}`)
})