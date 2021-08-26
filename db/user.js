const db = require('./config')

async function get(context) {
    let sqlquery = 'select * from user'
    try {
        const binds = {};
        if (context.id) {
            binds.id = context.id;
            sqlquery += ` where id = :id`;
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
        const result = await db.pool.query("insert into user (firts_name,last_name,email,document) values (?,?,?,?)", [data.firts_name, data.last_name, data.email, data.document]);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.create = create;

async function update(data) {

    try {
        const result = await db.pool.query("update user set firts_name = ?, last_name = ?, email = ?, document =? where id = ?", [data.firts_name, data.last_name, data.email, data.document, data.id]);
        return send(result);
    } catch (err) {
        throw err;
    }
}
module.exports.update = update;

async function deleted(data) {

    try {
        const result = await db.pool.query("delete from user where id = ?", [id]);
        return res.send(result);
    } catch (err) {
        throw err;
    }
}

module.exports.deleted = deleted;