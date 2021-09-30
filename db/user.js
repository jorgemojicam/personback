const db = require('./config')

async function get(context) {
    let sqlquery = `select usr.*,cue.id_cue,cue.username_cue,cue.idroles_cue from users usr left JOIN  cuentaacceso cue
    on cue.iduser_cue = usr.id_use`
    var arrayWhere = []
    try {
        if (context.id) {
            arrayWhere.push(` id_use = ${context.id}`)
        }
        if (context.coordinador) {
            arrayWhere.push(` coordinador_use = ${context.coordinador}`)
        }
        if (arrayWhere.length > 0) {
            sqlquery += ` where ${arrayWhere.join(" and ")} `
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
        const result = await db.pool.query("insert into users (nombre_use,apellido_use,email_use,cedula_use,coordinador_use) values (?,?,?,?,?)", [data.nombre, data.apellido, data.email, data.cedula, data.coordinador]);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.create = create;

async function update(data) {
    try {
        const result = await db.pool.query("update users set nombre_use = ?, apellido_use = ?, email_use = ?, cedula_use =?,coordinador_use=? where id_use = ?", [data.nombre, data.apellido, data.email, data.cedula, data.coordinador, data.iduser]);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.update = update;

async function deleted(data) {

    try {
        const result = await db.pool.query("delete from user where id_use = ?", [id]);
        return res.send(result);
    } catch (err) {
        throw err;
    }
}

module.exports.deleted = deleted;