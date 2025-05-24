const mongoose = require('./index');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'shelter'], required: true },
  username: { type: String },
  name: { type: String },
  description: { type: String },
  dogsOwned: { type: Number, default: 0 },
  catsOwned: { type: Number, default: 0 },
  otherOwned: { type: Number, default: 0 },
  profilePic: { type: String },
  emailPrefs: {
    newPetProfiles: { type: Boolean, default: false }
  }
});

// Prevent OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
