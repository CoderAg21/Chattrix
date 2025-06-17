const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth'); // Assuming you have an auth middleware
const messageModel = require('../models/messageSchema'); // Assuming you have a message model

router.post('/',auth, async (req, res) => {
    const toSend = []
    const {roomId} = req.body
    // console.log('roomId:', roomId);
  try {
    // Assuming you have a message model to fetch stored messages
    const storedMessages = await messageModel.find({roomId:roomId}).sort({ createdAt: 1 })
    storedMessages.forEach((msg) => {
      const {message, sendBy, createdAt} = msg;
        toSend.push({
            message,
            sendBy:(sendBy === req.user.userId) ? 'You' : 'Server', // Check if the message is sent by the current user
            createdAt:createdAt.toLocaleString(),
            
        });
      
    });
    res.status(200).json(toSend);
    
    // console.log(storedMessages)
  } catch (error) {
    console.error('Error fetching stored messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
);

module.exports = router;
// This route fetches stored messages for a specific room