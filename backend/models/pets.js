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

  age: { type: Number },

  gender: {
    type: String,
    enum: ['M', 'F']
    
  },


  disposition: {
    type: [String],
    enum: [
      'Good with Other Animals',
      'Good with Kids',
      'Apartment OK',
      'Must Be on Leash',
      'House Trained',
      'Needs Fenced Yard'
    ],
    default: []

  },
  availability: {
    type: String,
    enum: ['Not Available', 'Available', 'Pending', 'Adopted'],
    required: true
  },

  personality: {
    type: [String],
    enum: ['Calm', 'Cuddly', 'Active', 'Smart', 'Friendly', 'Obedient','Gentle', 'Shy'], 
    default: []
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
  let query = this.find(filter);
  return query.exec();
};


//Update pet profile
petSchema.statics.updateProfile = async function(id, updateData) {
  
  //Find profile by ID
  const profile = await this.findById(id);
  
  if (!profile) {
    throw new Error('No Profile Found. Please Try Again'); 
  }

  // If found update pet profile
  Object.keys(updateData).forEach(key => {
    if (updateData[key] !== undefined) {
      profile[key] = updateData[key];
    }
  });

  // Save the update
  await profile.save();
  return profile;
};


//Delete Pet Profile
petSchema.statics.removeProfile = async function(id) {
  
  // Find profile by ID
  const profile = await this.findById(id);

  if (!profile) {
    throw new Error('No Profile Found');
  }

  //Delete Profile
  await this.deleteOne({ _id: id });
  return profile;
};



module.exports = mongoose.model('Pet', petSchema);
