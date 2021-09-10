const db = require('./config')

async function get(context) {
    let sqlquery = 'select * from users '
    var arrayWhere = []
    try {        
        if (context.id) {
            arrayWhere.push(` id_use = ${context.id}`)
        }
        if (context.coordinador) {
            arrayWhere.push(` coordinador_use = ${context.coordinador}`)
        }
        if(arrayWhere.length > 0){
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
        console.log(">>>>>>>>>",data)
        const result = await db.pool.query("insert into users (nombre_use,apellido_use,email_use,cedula_use) values (?,?,?,?)", [data.nombre, data.apellido, data.email, data.cedula]);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.create = create;

async function update(data) {

    try {
        console.log(">>>>>>>>>",data)
        const result = await db.pool.query("update user set nombre_use = ?, apellido_use = ?, email_use = ?, cedula_use =? where id = ?", [data.firts_name, data.last_name, data.email, data.document, data.id]);
        return send(result);
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