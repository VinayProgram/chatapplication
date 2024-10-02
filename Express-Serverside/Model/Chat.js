const mongoose = require('mongoose');

const chatschema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true }
})

module.exports = mongoose.model('chats', chatschema)