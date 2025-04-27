const express = require('express');
const app = express();
const port = 5600;
const cors = require('cors');
require('dotenv').config();

const {
    createProfile,
    retrieveProfile,
    updateProfile,
    deleteProfile,
} = require('./controllers/PetController');

app.use(cors());
app.use(express.json());

// Create
app.post('/petprofile', createProfile);

// Read
app.get('/petprofiles', retrieveProfile);

// Update
app.put('/petprofile/:id', updateProfile);

// Delete
app.delete('/petprofile/:id', deleteProfile);

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
