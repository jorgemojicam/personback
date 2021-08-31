const cuentaacceso = require('../db/cuentaacceso');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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

        const token = await cuentaacceso.generateAuthToken();
        res.send(token);
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
}
module.exports.auth = auth;


async function checkJWT(req, res, next) {
    try {
        const { authorization } = req.headers;
        const decoded = jwt.verify(authorization.split(' ')[1], "*/.+\fMd|-*g0j*|-*hgJfg*|-*g1g*|-*fhChm*|-*4*/.\*");
        const [usuario] = cuentaacceso.get(decoded);
        if (!usuario) {
            throw Error();
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
};

module.exports.checkJWT = checkJWT;

