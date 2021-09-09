const db = require('./config')

async function get(context) {
    let sqlquery = 'select * from modulos'
    try {
        if (context.id) {
            sqlquery += ` where id_mod = ${context.id}`;
        }        
        const result = await db.pool.query(sqlquery);        
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.get = get;