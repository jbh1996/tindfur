const mongoose = require('./index'); // or require('mongoose') if not using custom index

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    species: { type: String, enum: ['dog', 'cat', 'rabbit', 'other'], required: true },
    breed: { type: String },
    shelterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // assuming shelter is a User with role='shelter'
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = { Pet };

