const db = require('./config')

async function get(context) {
    let sqlquery = 'select * from municipios'
    let arrayWhere = []
    try {
        if (context.iddepartamento) {
            arrayWhere.push(` iddepartamento = ${context.iddepartamento}`)            
        }        
        if(arrayWhere.length > 0){
            sqlquery += ` where ${arrayWhere.join(" and ")}`;
        }
        const result = await db.pool.query(sqlquery);        
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.get = get;