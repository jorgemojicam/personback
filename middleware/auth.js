require('dotenv')
const jwt = require("jsonwebtoken");
const tkn = process.env.JWT_TOKEN_SECRET
module.exports = (req, res, next) => {
    try {
        const token = req.headers;
        const decoded = verifyJWT(token.authorization.split(' ')[1]);
        if (!token) 
            return res.status(403).send("Access denied.");

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send("Invalid token " + error);
    }
};

const verifyJWT = token => jwt.verify(token, tkn);