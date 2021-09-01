const rol = require('../db/roles');

async function get(req, res, next) {
    try {
        const context = {};
        context = req.params
        const rows = await rol.get(context);

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