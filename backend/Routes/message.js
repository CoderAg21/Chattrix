// This route handles incoming messages
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const messageModel = require('../models/messageSchema'); // Assuming you have a message model

router.post('/',auth, async (req, res) => {
  const { msg,currentRoom } = req.body;
  const userId = req.user.userId; //This user send the message
  if (!msg) {
    return res.status(400).json({ error: 'Message content is required' });
  }

  try {
    const newMessage = await messageModel.create({
      message: msg,
      sendBy: userId,
      roomId:currentRoom // The user who sends the message
    //   roomId: req.body.roomId, // Assuming you have a roomId in the request body
    //   sendTo: req.body.sendTo // The user to whom the message is sent
    });
    newMessage.save();
    res.status(201).json({message: 'Message sent successfully'});
   
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});     

module.exports = router;