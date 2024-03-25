const jwt = require('jsonwebtoken');
const status = require('../utils/httpResStatusCodes')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if(!authHeader) return res.status(status.STATUS_BAD_REQUEST).json({error: "Request must contain authorization header"});
    const bearer = authHeader.split(' ');
    if(bearer.length !== 2) return res.status(status.STATUS_BAD_REQUEST).json({error: "Authorization header must contain bearer token"});
    const token = bearer[1];
    try { 
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        req.token = token;
        next();
    } catch (err) {
        res.status(status.STATUS_UNAUTHORIZED).json({error: "Access denied"});
    }
}

module.exports = verifyToken;