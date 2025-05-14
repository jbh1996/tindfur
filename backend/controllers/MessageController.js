const Chatlog = require('../models/chatlog');
const Message = require('../models/message');
const mongoose = require('mongoose');


const { createChatLog, findChatLogByUserAndPet } = require('../controllers/ChatLogController');


const createMessage = async (req, res) => {
    try {
      const { content, userType, userID, shelterID, petID } = req.body;
  
      if (!userID || !petID || !shelterID) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      let chatLog = await findChatLogByUserAndPet(userID, petID);
      if (!chatLog) {
        chatLog = await createChatLog(userID, shelterID, petID);
      }
  
      const newMessage = new Message({ content, userType, chatLogID: chatLog._id });
      await newMessage.save();
  
      res.status(201).json({ message: 'Message Created Successfully' });
    } catch (err) {
      console.error('Error in createMessage:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const createMessageinChat = async (req, res) => {
    try {
      const { content, chatLogID, userType } = req.body;
  
    const objectIdChatLogID = new mongoose.Types.ObjectId(chatLogID);

    // Create new message
    const newMessage = new Message({ content, userType, chatLogID: objectIdChatLogID });
    await newMessage.save();
      res.status(201).json({ message: 'Message Created Successfully' });
    } catch (err) {
      console.error('Error in createMessage:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const retrieveMessages = async (req, res) => {
    try {
      const { chatLogID } = req.params;

      const messages = await Message.find({
        chatLogID: new mongoose.Types.ObjectId(chatLogID)
      }).sort({ createdAt: 1 });

      res.status(200).json(messages);
}
catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error: Unable to retrieve messages' });
  }
}

module.exports = { createMessage, retrieveMessages, createMessageinChat };