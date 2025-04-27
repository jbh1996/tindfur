// controllers/PetController.js

const Profile = require('../models/pets');

// Create a new Pet Profile
const createProfile = async (req, res) => {
  try {
    const { animalType, breed, disposition, imageUrl } = req.body;
    if (!animalType || !breed || !disposition) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newProfile = new Profile({ animalType, breed, disposition, imageUrl });
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error: Unable to create pet profile' });
  }
};

// Retrieve Pet Profiles (with optional filters)
const retrieveProfile = async (req, res) => {
  try {
    const { animalType, breed, disposition } = req.query;
    const filter = {
      ...(animalType && { animalType }),
      ...(breed && { breed }),
      ...(disposition && { disposition }),
    };
    const profiles = await Profile.find(filter).exec();
    res.status(200).json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error: Unable to retrieve profiles' });
  }
};

// Update an existing Pet Profile
const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { animalType, breed, disposition, imageUrl, availability, description } = req.body;
    // At least one field to update?
    if (!animalType && !breed && !disposition && !imageUrl && !availability && !description) {
      return res.status(400).json({ message: 'No fields provided to update' });
    }
    const updated = await Profile.findByIdAndUpdate(
      id,
      { animalType, breed, disposition, imageUrl, availability, description },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error: Unable to update pet profile' });
  }
};

// Delete a Pet Profile
const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Profile.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error: Unable to delete pet profile' });
  }
};

module.exports = {
  createProfile,
  retrieveProfile,
  updateProfile,
  deleteProfile,
};
