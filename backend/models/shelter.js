const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: String,
    contactEmail: String,

    // Refers to the pets of this shelter (using ObjectId for MongoDB auto-generated IDs)
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }] // Array of references to Pet documents
});

module.exports = mongoose.model('Shelter', shelterSchema);
