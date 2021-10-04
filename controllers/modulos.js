const rol = require('../db/modulos');

async function get(req, res, next) {
    try { 
        const rows = await rol.get(req.params);
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

async function getbyrol(req, res, next) {
    try { 
    
        const rows = await rol.getByRol(req.query);
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
module.exports.getbyrol = getbyrol;