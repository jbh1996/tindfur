const ChatLog = require('../models/chatlog');

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

      const chatLogs = await ChatLog.find(filter);

      res.status(200).json(chatLogs);
}
catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error: Unable to retrieve chat logs' });
  }
}

const retrieveChatLogsShelters = async (req, res) => {
    try {
      const { shelterID } = req.params;
  

      const filter = {
        ...(shelterID && { shelterID: shelterID })
      }

      const chatLogs = await ChatLog.find(filter);

      res.status(200).json(chatLogs);
}
catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error: Unable to retrieve chat logs' });
  }
}

const findChatLogByUserAndPet = async (userID, petID) => {
    return await ChatLog.findOne({ userID, petID });
  };
  

module.exports = { createChatLog, retrieveChatLogsUsers, retrieveChatLogsShelters, findChatLogByUserAndPet };