require('dotenv').config()
const cuentaacceso = require('../db/cuentaacceso');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tkn = process.env.JWT_TOKEN_SECRET

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

async function put(req, res, next) {
    try {
        newuser = await cuentaacceso.update(req.body);
        res.status(201).json(newuser);
    } catch (err) {
        next(err);
    }
}
module.exports.put = put;

async function auth(req, res) {
    try {
        const user = await cuentaacceso.auth(req.body);
        if (!user) return res.status(400).send("Usuario o contraseña incorrecto");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user[0].password_cue
        );
        delete user[0].password_cue
        if (!validPassword)
            return res.status(401).send("Invalid email or password");
            console.log("token -->>>>>>>>",tkn)
        const token = jwt.sign({ username: user.username_cue }, tkn, { expiresIn: '24h' });

        res.send({
            accesToken: token,
            dataUser: user[0]
        });
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
}
module.exports.auth = auth;


async function checkJWT(req, res, next) {
    try {
        const { authorization } = req.headers;
        const decoded = jwt.verify(authorization.split(' ')[1], tkn);
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

