const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    name: { type: String },
    picture: { type: String },
    news: { type: String, enum: ['New Pet Profile', 'Updated Profile'], required: true },
  }, {
    timestamps: true 
  });
  

module.exports = mongoose.model('NewsItem', newsSchema);