const mongoose = require('mongoose');

const tempProfileSchema = new mongoose.Schema({
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TempProfile', tempProfileSchema);