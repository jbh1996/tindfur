const mongoose = require('./index'); // or 'mongoose' if you prefer

const shelterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }]
});

const Shelter = mongoose.model('Shelter', shelterSchema);

module.exports = { Shelter };

