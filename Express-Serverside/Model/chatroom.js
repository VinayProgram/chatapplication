const mongoose = require('mongoose')

const chatroom = new mongoose.Schema({
  chatroomname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  message: {
    type: [
      content = {},
      sender = {},
      timestamp = {
        type: Date,
        default: Date.now
      }
    ],
    required: true
  }
});

module.exports = mongoose.model('chatRoom', chatroom)
