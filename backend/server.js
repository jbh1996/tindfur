const express = require('express');
const app = express();
const port = 5600
const cors = require('cors');
require('dotenv').config()
require('./scripts/newsFeed');
require('./scripts/dailyEmail');

app.use(cors());
app.use(express.json()); 

const { createChatLog, retrieveChatLogsUsers, retrieveChatLogsShelters, findChatLogByUserAndPet} = require('./controllers/ChatLogController');
const { createProfile, retrieveProfile, retrieveProfilebyID, updateProfile, deleteProfile } = require('./controllers/PetController');
const {createMessage, retrieveMessages, createMessageinChat} = require('./controllers/MessageController');
const { dogBreeds, catBreeds } = require('./utils/breeds');
const { retrieveNewsFeed } = require('./controllers/NewsController');
const { createAccount, loginAccount, retrieveUsers, updateAccount, deleteAccount } = require('./controllers/UserController');
const { upload } = require('./middleware/upload'); 



// Create User Account
app.post('/register', createAccount);

// Retreive Users

app.get('/users', retrieveUsers);

// User Login
app.post('/login', loginAccount);


//Delete User Account 
app.delete('/user/:id', deleteAccount);

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

// Edit User Account
app.put('/user/:id', updateAccount);

// Delete Pet Profile
app.delete('/petprofiles/:id', deleteProfile);

// Create message
app.post('/createmessage', createMessage);

// Create message
app.post('/createmessageinchat', createMessageinChat);

// Retrieve Chat Logs user
app.get('/retrievechatlogsuser/:userID', retrieveChatLogsUsers);

app.get('/retrievechatlogsshelter/:userID', retrieveChatLogsShelters);


// Retrieve message
app.get('/retrievemessages/:chatLogID', retrieveMessages);

// Retrieve News Feed
app.get('/newsfeed', retrieveNewsFeed);


app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
