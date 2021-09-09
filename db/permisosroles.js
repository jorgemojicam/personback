const db = require('./config')

async function get(context) {
    let sqlquery = 'select * from permisosroles '
    let arrayWhere = []
    try {
        if (context.id) {
            arrayWhere.push(` id_prol = ${context.id}`);
        }
        if (context.idrol) {
            arrayWhere.push(` idrol_prol = ${context.idrol}`);
        }
        if (arrayWhere.length > 0) {
            sqlquery += ` where ${arrayWhere.join(" and ")}`
        }
        const result = await db.pool.query(sqlquery);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.get = get;

async function create(data) {

    try {
        const result = await db.pool.query("INSERT INTO permisosroles (idaccion_prol, idrol_prol, idmodulo_prol) VALUES (?, ?, ?)", [data.idaccion, data.idrol, data.idmodulo]);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.create = create;

async function update(data) {

    try {
        const result = await db.pool.query("UPDATE permisosroles SET idmodulo_prol=?,idrol_prol =?, idaccion_prol =? WHERE  id_prol=?", [data.idmodulo, data.idrol, data.idaccion, data.id]);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.update = update;

//UPDATE ;