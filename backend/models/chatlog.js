const mongoose = require('./index');


// User Schema
const chatLogSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shelterID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  petID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  }
});


module.exports = mongoose.model('ChatLog', chatLogSchema);