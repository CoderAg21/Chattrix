const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userModel = require('../models/userSchema');

router.post('/',auth, async (req, res) => {
    try {
            const userId = req.user.userId; // Assuming req.user is set by the auth middleware
            // Fetch the user from the database
            const user = await userModel.findOne({ _id: userId })
            const contacts = user.personAndRoom
            console.log(contacts)
           
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }  
            // Return the contacts
          console.log(200)
            res.status(200).json(contacts);
        
    }

    catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = router