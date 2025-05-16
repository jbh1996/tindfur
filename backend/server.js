const express = require('express');
const app = express();
const port = 5600
const cors = require('cors');
require('dotenv').config()
require('./scripts/newsFeed');


app.use(cors());
app.use(express.json()); 

const { createAccount, loginAccount } = require('./controllers/UserController');
const { createProfile, retrieveProfile, retrieveProfilebyID, updateProfile, deleteProfile } = require('./controllers/PetController');
const {createMessage, retrieveMessages, createMessageinChat} = require('./controllers/MessageController');
const { dogBreeds, catBreeds } = require('./utils/breeds');
const { retrieveNewsFeed } = require('./controllers/NewsController');
const { upload } = require('./middleware/upload'); 



// Create User Account
app.post('/register', createAccount);

// User Login
app.post('/login', loginAccount);

//Get Animal Breed List
app.get('/breeds/:animalType', (req, res) => {
    const animalType = req.params.animalType;
  
    const breeds = {
      Cat: catBreeds,
      Dog: dogBreeds,
      other: ['Other']
    };
  
    if (breeds[animalType]) {
      res.json(breeds[animalType]);
    } else {
      res.status(404).json({ message: "Breed Not Found" });
    }
});


// Create Pet Profile
app.post('/petprofiles', upload.single('petpic'), createProfile);


// Retreive Pet Profile
app.get('/petprofiles', retrieveProfile); 

//Retrieve Pet Profile by ID
app.get('/petprofiles/:id', retrieveProfilebyID); 

// Edit Pet profile
app.put('/petprofiles/:id', upload.single('petpic'), updateProfile);

// Delete Pet Profile
app.delete('/petprofiles/:id', deleteProfile);

// Create message
app.post('/createmessage', createMessage);

// Create message
app.post('/createmessageinchat', createMessageinChat);

// Create message
app.get('/retrievemessages/:chatLogID', retrieveMessages);

// Retrieve News Feed
app.get('/newsfeed', retrieveNewsFeed);


app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
