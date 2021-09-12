const db = require('./config')

async function get(context) {
    let sqlquery = 'select * from roles'
    
    try {
        let arrayWhere =[]
        if (context.id) {
            arrayWhere.push(` id_rol = ${context.id}`)
        }
        const result = await db.pool.query(sqlquery);        
        
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.get = get;