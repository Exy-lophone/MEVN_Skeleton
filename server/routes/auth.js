require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isUsernameValid, isPasswordValid } = require('../utils/inputValidation')
const authVerify = require('../middlewares/authVerify')

//Retrives the secrect key for JWT signature
const secretKey = process.env.SECRET_KEY;

//Add new account
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if(!isUsernameValid(username)) res.status(400).json({error: 'username is invalid'})
        if(!isPasswordValid(password)) res.status(400).json({error: 'password is invalid'})
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

router.get('/checkToken', authVerify, (req, res, next) => res.status(200).json({ authentication: true }))
module.exports = router;