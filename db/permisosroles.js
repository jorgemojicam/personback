const db = require('./config')

async function get(context) {
    let sqlquery = 'select * from permisosroles '
    let arrayWhere = []
    try {
        if (context.id) {
            arrayWhere.push(` id = ${context.id}`);
        }
        if (context.idrol) {
            arrayWhere.push(` idrol = ${context.idrol}`);
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
        const result = await db.pool.query("INSERT INTO permisosroles (idaccion, idrol, idmodulo) VALUES (?, ?, ?)", [data.idaccion, data.idrol, data.idmodulo]);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.create = create;

async function update(data) {

    try {
        const result = await db.pool.query("UPDATE permisosroles SET idmodulo=?,idrol =?, idaccion =? WHERE  id=?", [data.idmodulo, data.idrol, data.idaccion, data.id]);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.update = update;

//UPDATE ;