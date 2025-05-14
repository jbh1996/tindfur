const mongoose = require('./index');

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true, unique: true },
  userType: { type: String, enum: ['user', 'shelter'], required: true },
  chatLogID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatLog',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
