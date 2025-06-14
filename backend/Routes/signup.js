// This code defines a signup route for a user management system.

const express = require('express');
const router = express.Router();
const userModel = require('../models/userSchema');
const bcrypt = require("bcrypt")
const config = require("../config/env")

router.post('/', async (req, res) => {
    const { name, email, password } = req.body
    

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hash = await bcrypt.hash(password,Number(config.SALT_ROUNDS))
        const newUser = await new userModel({
            name,
            email,
            password:hash
        });


        await newUser.save();
        res.status(201).json({ message: 'User created successfully',newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;