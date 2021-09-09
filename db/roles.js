const db = require('./config')

async function get(context) {
    let sqlquery = 'select * from roles'
    try {
        if (context.id) {
            sqlquery += ` where id_rol = ${context.id}`;
        }        
        const result = await db.pool.query(sqlquery);        
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.get = get;