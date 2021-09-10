const registro = require('../db/registro');

async function get(req, res, next) {
    try {
        const rows = await registro.get(req.params);
        if (rows) {
            res.status(200).json(rows);
        } else {
            res.status(500).end();
        }
    } catch (err) {
        next(err);
    }
}
module.exports.get = get;

async function post(req, res, next) {
    try {
        newuser = await registro.create(req.body);
        res.status(201).json(newuser);
    } catch (err) {
        next(err);
    }
}
module.exports.post = post;

async function put(req, res, next) {
    try {
        newuser = await registro.update(req.body);
        res.status(201).json(newuser);
    } catch (err) {
        next(err);
    }
}
module.exports.put = put;