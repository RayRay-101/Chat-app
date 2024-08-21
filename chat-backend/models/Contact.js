const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    
  },
  lastMessage: {
    type: String,
  },
  lastMessageTime: Date,
});

module.exports = mongoose.model('Contact', ContactSchema);
