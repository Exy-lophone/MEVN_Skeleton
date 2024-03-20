const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if(!authHeader) return res.status(401).json({error: "Acces denied"});
    const bearer = authHeader.split(' ');
    const token = bearer[1];
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({error: "Access denied"});
    }
}

module.exports = verifyToken;