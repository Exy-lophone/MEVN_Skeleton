require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isUsernameValid, isPasswordValid } = require('../utils/inputValidation')
const authVerify = require('../middlewares/authVerify')
const status = require('../utils/httpResStatusCodes')

//Retrives the secrect key for JWT signature
const secretKey = process.env.SECRET_KEY;

//Add new account
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if(!username || !password) res.status(status.STATUS_BAD_REQUEST)
        if(!isUsernameValid(username)) res.status(status.STATUS_BAD_REQUEST).json({error: 'username is invalid'})
        if(!isPasswordValid(password)) res.status(status.STATUS_BAD_REQUEST).json({error: 'password is invalid'})
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword});
        await user.save();
        const token = jwt.sign({userId: user._id}, secretKey, {expiresIn: '1h'});
        res.status(status.STATUS_OK_CREATED).json({ token });
    } catch (err) {
        res.status(status.STATUS_INTERNALERR).json({ error: err.message});
    }
});

//Verify user credentials and send back a JWT
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username: username});
        if(!user) return res.status(status.STATUS_BAD_REQUEST).json({error: 'Wrong credentials'});
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(status.STATUS_BAD_REQUEST).json({error: 'Wrong credentials'});
        const token = jwt.sign({userId: user._id}, secretKey, {expiresIn: '1h'});
        res.status(status.STATUS_OK).json({token: token});
    } catch (err) {
        res.status(status.STATUS_INTERNALERR).json({error: err.message})
    }
});

//Check the validity of the JWT
router.get('/checkToken', authVerify, (req, res, next) => res.status(status.STATUS_OK).json({ authentication: true }))

module.exports = router;