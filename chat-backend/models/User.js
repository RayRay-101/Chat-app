const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  picture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'uploads.files',
  },
});

module.exports = mongoose.model('User', UserSchema);
