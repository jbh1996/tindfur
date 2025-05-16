const cron = require('node-cron');
const NewsItem = require('../models/news');
const PetProfile = require('../models/pets');

// Create Daily News Item
const createNewsItem = async () => {
  try {
    // Get timestamp 24 hrs ago 
    const oneDayPrior = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Get date and set beginning of day to midnight
    const beginningOfDay = new Date();
    beginningOfDay.setHours(0, 0, 0, 0);

    // Find pet profiles created or updated within the last 24 hrs
    const recentPetProfiles = await PetProfile.find({
      $or: [
        { createdAt: { $gte: oneDayPrior } },
        { updatedAt: { $gte: oneDayPrior } }
      ]
    });
    

    for (const pet of recentPetProfiles) {

      // Check if news item for new pet profile was already created today 
      const newsItemExists = await NewsItem.findOne({
        petId: pet._id,
        news: 'New Pet Profile',
        createdAt: { $gte: beginningOfDay }
      });

      // If no news item and pet profile was created within 24 hrs, create news item
      if (pet.createdAt >= oneDayPrior && !newsItemExists) {
        await NewsItem.create({
          petId: pet._id,
          name: pet.name,
          picture: pet.picture,
          news: 'New Pet Profile'
        });
      }


      // If pet profile was updated within 24 hrs and it's not a new profile, create news item
      if (
        pet.updatedAt >= oneDayPrior &&
        pet.updatedAt.getTime() !== pet.createdAt.getTime() &&
        !newsItemExists
      ) {

        // Check if the news item of the updated profile already exists 
        const newsUpdateExists = await NewsItem.findOne({
          petId: pet._id,
          news: 'Updated Profile',
          createdAt: { $gte: beginningOfDay }
        });

        // If no news item has been created for updated profile, create news item
        if (!newsUpdateExists) {
          await NewsItem.create({
            petId: pet._id,
            name: pet.name,
            picture: pet.picture,
            news: 'Updated Profile'
          });
        }
      }
    }
    console.log('News Item Created');

  } catch (err) {
    console.error('Unable to create new item', err);
  }
};


module.exports = { createNewsItem };

// Set job to run daily at 6 AM
cron.schedule('0 6 * * *', () => {
  console.log('Daily feed running');
  createNewsItem();
});
