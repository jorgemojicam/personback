const user = require('../db/municipios');

async function get(req, res, next) {
    try {
        const context = {};
        context.iddepartamento = parseInt(req.params.iddepartamento, 10);  
        const rows = await user.get(context);
       
        if (req.params.iddepartamento) {
            if (rows.length > 0) {
                res.status(200).json(rows);
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