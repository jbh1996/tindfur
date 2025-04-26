const express = require('express');
const app = express();
const port = 5600
const cors = require('cors');
require('dotenv').config()


app.use(cors());
app.use(express.json()); 

const { createAccount, loginAccount } = require('./controllers/UserController');
const { retrieveProfile } = require('./controllers/PetController');
//const { upload } = require('./middleware/upload'); 

// Create User Account
app.post('/register', createAccount);

// User Login
app.post('/login', loginAccount);

// Upload User Pic


// Create Pet Profile


// Retreive Pet Profile
app.get('/petprofiles', retrieveProfile); 


// Edit Pet profile


// Delete Pet Profile



app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
