const NewsItem = require('../models/news');

// Retrieve News Feed
const retrieveNewsFeed = async (req, res) => {
  try {

    // Find all news item
    const newsFeed = await NewsItem.find()
       // Sort by createdAt to show newest news item
      .sort({ createdAt: -1 })
      // Get pet data
      .populate('petId');

    res.json(newsFeed);

  } catch (err) {

    res.status(500).json({ error: 'Unable to retreive feed' });
  }
};

module.exports = { retrieveNewsFeed };