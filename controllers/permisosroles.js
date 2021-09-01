const permisos = require('../db/permisosroles');

async function get(req, res, next) {
    try {
        const context = {};
        context = req.params
        const rows = await permisos.get(context);

        if (rows) {
            if (rows.length > 0) {
                res.status(200).json(rows);
            } else {
                res.status(404).end();
            }
        }
    } catch (err) {
        next(err);
    }
}
module.exports.get = get;

async function post(req, res, next) {
    try {
        let bdred = await permisos.create(req.body);
        res.status(201).json(bdred);
    } catch (err) {
        next(err);
    }
}
module.exports.post = post;

async function put(req, res, next) {
    try {
        let bdred = await permisos.update(req.body);
        res.status(201).json(bdred);
    } catch (err) {
        next(err);
    }
}
module.exports.put = put;