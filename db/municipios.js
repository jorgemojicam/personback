const db = require('./config')

async function get(context) {
    let sqlquery = 'select * from municipios'
    try {
        if (context.iddepartamento) {
            sqlquery += ` where iddepartamento = ${context.iddepartamento}`;
        }        
        const result = await db.pool.query(sqlquery);        
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.get = get;