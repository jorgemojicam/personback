const cuentaacceso = require('../db/cuentaacceso');
const bcrypt = require("bcrypt");


async function get(req, res, next) {
    try {
        const context = {};
        context = req.params
        const rows = await cuentaacceso.get(context);

        if (req.params.username) {
            if (rows.length === 1) {
                res.status(200).json(rows[0]);
            } else {
                res.status(404).end();
            }
        } else {
            res.status(200).json(rows);
        }
    } catch (err) {
        next(err);
    }
}
module.exports.get = get;

async function post(req, res, next) {
    try {       
        newuser = await cuentaacceso.create(req.body);
        res.status(201).json(newuser);
    } catch (err) {
        next(err);
    }
}
module.exports.post = post;

async function auth(req, res) {
    try { 
        
        const user = await cuentaacceso.auth(req.body);        
        if (!user) return res.status(400).send("Invalid email or password");
      
        const validPassword = await bcrypt.compare(
            req.body.password,
            user[0].password
        );
        if (!validPassword)
            return res.status(400).send("Invalid email or password");

        const token = cuentaacceso.generateAuthToken();
        res.send(token);
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
}
module.exports.auth = auth;

