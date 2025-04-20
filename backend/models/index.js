const { User } = require('./Users');
const { Shelter } = require('./shelter');
const { Pet } = require('./pets');

module.exports = { User, Shelter, Pet };

const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to MongoDB database using Mongoose.');
    }
});

module.exports = mongoose;