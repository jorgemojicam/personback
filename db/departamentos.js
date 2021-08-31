const db = require('./config')

async function get(context) {
    let sqlquery = 'select * from departamentos'
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