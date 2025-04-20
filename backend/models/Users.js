const mongoose = require('./index');


// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'shelter'], required: true }
  });


// compile from the schema
const User = mongoose.model('User', userSchema);

module.exports = { User }
