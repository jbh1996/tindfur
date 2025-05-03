const Profile = require('../models/pets');
const User  = require('../models/Users');
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


// Retrieve Pet Profile
const retrieveProfile = async (req, res) => {
  try {
    const { animalType, breed, disposition, createdAt, createdBy } = req.query;

    //Search for user name
    let userId = null;
    if (createdBy) {
      //Trim to remove extra spaces
      const searchName = createdBy.trim();
      console.log('Searching for user:', searchName);
      
      //Search for user name (case-insenstive)
      const user = await User.findOne({
        name: new RegExp(`^${searchName}$`, 'i')
      });
      
      //If user found, store in userId
      userId = user?._id;
    }


    const filter = {
      ...(animalType && { animalType }),
      ...(breed && { breed }),
      ...(disposition && { disposition: { $in: disposition.split(',') } }),
      ...(createdAt && { createdAt: { $gte: new Date(createdAt) } }),
      ...(userId && { createdBy: userId }),
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




module.exports = { retrieveProfile, retrieveProfilebyID };