const express = require('express');
const app = express();
const port = 5600
const cors = require('cors');
require('dotenv').config()


app.use(cors());
app.use(express.json()); 

const { createAccount, loginAccount, updateAccount } = require('./controllers/UserController');
const { createProfile, retrieveProfile, retrieveProfilebyID, updateProfile, deleteProfile } = require('./controllers/PetController');
const { dogBreeds, catBreeds } = require('./utils/breeds');
const { upload } = require('./middleware/upload'); 



// Create User Account
app.post('/register', createAccount);

// User Login
app.post('/login', loginAccount);

// Update User Account
app.put('/users/:id', updateAccount);

//Get Animal Breed List
app.get('/breeds/:animalType', (req, res) => {
    const animalType = req.params.animalType;
  
    const breeds = {
      cat: catBreeds,
      dog: dogBreeds,
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






app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
