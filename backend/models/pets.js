const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    species: { type: String, enum: ['dog', 'cat', 'rabbit', 'other'], required: true },
    breed: { type: String },

    shelterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shelter', required: true } // Refers to Shelter
});

module.exports = mongoose.model('Pet', petSchema);

