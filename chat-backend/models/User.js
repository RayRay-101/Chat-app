const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  picture: String,
})

const User = mongoose.model('User', userSchema) 

module.exports = User