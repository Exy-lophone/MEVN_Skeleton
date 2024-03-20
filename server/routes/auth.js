require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Retrives the secrect key for JWT signature
const secretKey = process.env.SECRET_KEY;

//Add new account
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username: username, password: hashedPassword});
        await user.save();
        const token = jwt.sign({userId: user._id}, secretKey, {expiresIn: '1h'});
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

//Verify user credentials and send back a JWT
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username: username});
        if(!user) return res.status(401).json({error: 'Wrong credentials'});
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(401).json({error: 'Wrong credentials'});
        const token = jwt.sign({userId: user._id}, secretKey, {expiresIn: '1h'});
        res.status(201).json({token: token});
    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

module.exports = router;