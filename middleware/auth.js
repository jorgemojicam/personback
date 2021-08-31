const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {    
        const  token  = req.headers;        
        const decoded = verifyJWT(token.authorization.split(' ')[1]);
            
        if (!token) return res.status(403).send("Access denied.");        
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};

const verifyJWT = token => jwt.verify(token, "*/.+fMd|-*g0j*|-*hgJfg*|-*g1g*|-*fhChm*|-*4*/.*");