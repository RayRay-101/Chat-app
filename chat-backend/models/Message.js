const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    content: String,
    sender: String,
    receiver: String,
    timestamp: { type: Date, default: Date.now }, 
})


const Message = mongoose.model('Message', MessageSchema)

module.exports = Message