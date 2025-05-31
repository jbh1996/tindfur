const ChatLog = require('../models/chatlog');
const PetProfile = require('../models/pets');
const User = require('../models/users');



const createChatLog = async (userID, shelterID, petID) => {
    const newChatLog = new ChatLog({ userID, shelterID, petID });
    await newChatLog.save();
    return newChatLog;
  };


const retrieveChatLogsUsers = async (req, res) => {
    try {
      const { userID } = req.params;
  

      const filter = {
        ...(userID && { userID: userID })
      }

      const chatLogs = await ChatLog.find(filter)
      .populate('userID')     
      .populate('shelterID')  
      .populate('petID');    


      res.status(200).json(chatLogs);
}
catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error: Unable to retrieve chat logs' });
  }
}

const retrieveChatLogsShelters = async (req, res) => {
  try {
    const { userID } = req.params;

    const filter = {
      ...(userID && { shelterID: userID })
    }

    const chatLogs = await ChatLog.find(filter)
      .populate('userID')    
      .populate('shelterID')  
      .populate('petID');    

    res.status(200).json(chatLogs);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error: Unable to retrieve chat logs' });
  }
}

const retrieveChatLogById = async (req, res) => {
  try {
    const { chatLogID } = req.params;

    const chatLog = await ChatLog.findById(chatLogID)
      .populate('userID')
      .populate('shelterID')
      .populate('petID');

    if (!chatLog) {
      return res.status(404).json({ message: 'Chat log not found' });
    }

    res.status(200).json(chatLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving chat log by ID' });
  }
};

const findChatLogByUserAndPet = async (userID, petID) => {
    return await ChatLog.findOne({ userID, petID });
  };
  

module.exports = { createChatLog, retrieveChatLogsUsers, retrieveChatLogsShelters, findChatLogByUserAndPet,   retrieveChatLogById};