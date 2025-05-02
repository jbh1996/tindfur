const mongoose = require('mongoose');

// Pet Schema
const petSchema = new mongoose.Schema({

  name: {type: String, required: true,},


  animalType: {
    type: String,
    enum: ['dog', 'cat', 'other'],
    required: true,
  },

  breed: {type: String, required: true,},

  disposition: {
    type: [String],
    enum: [
      'Good with other animals',
      'Good with children',
      'Animal must be leashed at all times'
    ],
    default: []

  },
  availability: {
    type: String,
    enum: ['Not Available', 'Available', 'Pending', 'Adopted'],
    required: true
  },

  picture: { type: String }, 
  description: { type: String },
  news: { type: String },
  
  // To track which user (Shelter) created the profile
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  date: { type: Date, default: Date.now }
});


//Filter and Retrieve pet profile 
petSchema.statics.findPets = function(filter) {
  return this.find(filter).exec();
};


module.exports = mongoose.model('Pet', petSchema);
