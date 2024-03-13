/* eslint-disable @stylistic/js/linebreak-style */
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
// eslint-disable-next-line @stylistic/js/linebreak-style

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
  // eslint-disable-next-line no-unused-vars
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{5,15}/.test(v)
      },
      message:props => `${props.value} is not a valid phone number!`
    },
    required:true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})

module.exports = mongoose.model('Person',personSchema)