const Profile = require('../models/pets');
const User  = require('../models/Users');
const jwt = require('jsonwebtoken');
const { dogBreeds, catBreeds } = require('../utils/breeds');


// Get Breed List
const getBreedList = (animalType) => {
  
  if (animalType === 'dog') {
    return dogBreeds;
  
  } else if (animalType === 'cat') {
    return catBreeds;
  
  } else {
    return [];
  }
};


// Create Pet Profile
const createProfile = async (req, res) => {
  try {

    // Get token 
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; 

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY);



    // Check if the user is a shelter
    if (decoded.role !== 'shelter') {
      return res.status(403).json({ message: 'Unathorized to create profiles' });
    }

    // Create a new profile
    const profile = new Profile({
      name: req.body.name,
      animalType: req.body.animalType,
      breed: req.body.breed,
      age: req.body.age,
      gender: req.body.gender,
      disposition: req.body.disposition,
      personality: req.body.personality,
      availability: req.body.availability,
      picture: req.file ? req.file.location : null,  
      description: req.body.description,
      news: req.body.news,
      createdBy: decoded.id 
    });

    console.log(profile)

    // Save profile 
    await profile.save();
    res.status(201).json({ message: 'New Profile Created', profile });

  } catch (error) {
    console.error('Unable to create profile:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};



// Retrieve Pet Profile
const retrieveProfile = async (req, res) => {
  try {
    const { animalType, breed, disposition, createdAt, createdBy } = req.query;

    const filter = {
      ...(animalType && { animalType }),
      ...(breed && { breed }),
      ...(disposition && { disposition: { $in: disposition.split(',') } }),
      ...(createdAt && { createdAt: { $gte: new Date(createdAt) } }),
      ...(createdBy && { createdBy }),
    };


    const profiles = await Profile.findPets(filter);

    // Get list of breed options
    const breedList = getBreedList(animalType);

    res.status(200).json({ profiles, breedList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error: Unable to retrieve profile' });
  }
};



const retrieveProfilebyID = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await Profile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error: Unable to retrieve profile by ID' });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    // Get ID from params
    const { id } = req.params; 

    // If photo was uploaded, use file path or else null
    let picture = req.file ? req.file.path : null; 

    // Get the updated data
    const updateInfo = { ...req.body, picture: picture || undefined };

    // Call the static method-updateProfile to update the profile
    const updatedProfile = await Profile.updateProfile(id, updateInfo);

    res.status(200).json({ message: 'Profile Has Been Updated', profile: updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Unable to update profile' });
  }
};


// Delete Profile
const deleteProfile = async (req, res) => {
  try {

    // Get ID from params
    const { id } = req.params; 

    // Call static method-removeProfile to delete profile
    await Profile.removeProfile(id);

    res.status(200).json({ message: 'Profile Has Been Deleted' });
  } catch (error) {
    console.error('Unable to delete profile:', error);
    res.status(500).json({ message: error.message || 'Something went wrong' });
  }
};


module.exports = { createProfile, retrieveProfile, retrieveProfilebyID, updateProfile, deleteProfile };