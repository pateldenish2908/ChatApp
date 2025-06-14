const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  contactId: mongoose.Schema.Types.ObjectId,
  text: String,
  time: String,
  senderId: String,
  read: Boolean,
});

module.exports = mongoose.model('Message', messageSchema);
