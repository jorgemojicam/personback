const db = require('./config')

async function get(context) {
    let sqlquery = 'select * from departamentos '
    let arrayWhere = []
    try {
        if (context.id) {
            arrayWhere.push(` id = ${context.id} `)
        }
        if (arrayWhere.length > 0) {
            sqlquery += ` where ${arrayWhere.join(" and ")}`;
        }
        const result = await db.pool.query(sqlquery);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.get = get;