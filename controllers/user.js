const user = require('../db/user');

async function get(req, res, next) {
    try {
        const context = {};
        context.id = parseInt(req.params.id, 10);
        const rows = await user.get(context);

        if (req.params.id) {
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
        let data = {
            firts_name: req.body.firts_name,
            last_name: req.body.last_name,
            email: req.body.email,
            document: req.body.document
        }
        newuser = await user.create(data);
        res.status(201).json(newuser);
    } catch (err) {
        next(err);
    }
}
module.exports.post = post;

async function put(req, res, next) {
    try {        
        newuser = await user.create(req.body);
        res.status(201).json(newuser);
    } catch (err) {
        next(err);
    }
}
module.exports.put = put;