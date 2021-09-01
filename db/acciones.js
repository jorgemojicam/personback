const db = require('./config')

async function get(context) {
    let sqlquery = 'select * from acciones'
    try {
        if (context.id) {
            sqlquery += ` where id = ${context.id}`;
        }        
        const result = await db.pool.query(sqlquery);        
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.get = get;