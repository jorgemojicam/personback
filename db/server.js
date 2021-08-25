const db = require('./config')
 
// GET
async function get(){
    try {
        const result = await db.pool.query("select * from user");
        return res.send(result);
    } catch (err) {
        throw err;
    }
}
module.exports.get = get;
 
// POST
async function create(data) {
 
    try {
        const result = await db.pool.query("insert into tasks (description) values (?)", data);
        return res.send(result);
    } catch (err) {
        throw err;
    }
}
module.exports.create = create;
 
async function update(data) {

    try {
        const result = await db.pool.query("update tasks set description = ?, completed = ? where id = ?", [data.description, data.completed, data.id]);
        return res.send(result);
    } catch (err) {
        throw err;
    } 
}
module.exports.update = update;
 
async function deleted(data) {
   
    try {
        const result = await db.pool.query("delete from tasks where id = ?", [id]);
        return res.send(result);
    } catch (err) {
        throw err;
    } 
}
 
module.exports.deleted = deleted;