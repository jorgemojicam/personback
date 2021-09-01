const accion = require('../db/acciones');

async function get(req, res, next) {
    try {     
        const rows = await accion.get(req.params);
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