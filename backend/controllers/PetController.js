const Profile = require('../models/pets');

// Retrieve Pet Profile
const retrieveProfile = async (req, res) => {
  try {
    const { animalType, breed, disposition, date } = req.query;

    // Filter based on search
    const filter = {
      ...(animalType && { animalType }),
      ...(breed && { breed }),
      ...(disposition && { disposition: { $in: disposition.split(',') } }),
      ...(date && { date: { $gte: new Date(date) } }),
    };

    const profiles = await Profile.findPets(filter);

    res.status(200).json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error: Unable to retrieve profile' });
  }
};

// Edit Pet Profile


// Delete Pet Profile


module.exports = { retrieveProfile };