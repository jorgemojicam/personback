require('dotenv')
const db = require('./config')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function get(context) {
    let sqlquery = 'select * from cuentaacceso'
    let arrayWhere = []
    try {
        const binds = {};
        if (context.id) {
            binds.id = context.id;
            arrayWhere.push(" id_cue = :id ");
        }
        if (context.iduser) {
            binds.iduser = context.iduser;
            arrayWhere.push(" iduser_cue = :iduser ");
        }
        if (context.username) {
            binds.username = context.username;
            arrayWhere.push(" username_cue = :username ");
        }
        if (arrayWhere.length > 0) {
            sqlquery += ` where ${arrayWhere.join(" and ")}`
        }
        const result = await db.pool.query(sqlquery);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.get = get;

async function create(data) {

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const passcryp = await bcrypt.hash(data.password, salt);

    try {
        const result = await db.pool.query("insert into cuentaacceso (username_cue,password_cue,iduser_cue,idroles_cue) values (?,?,?,?)", [data.username, passcryp, data.iduser,data.idrol]);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.create = create;

async function auth(context) {
    
    let sqlquery = `select username_cue,password_cue,idroles_cue,email_use,nombre_use,id_use,apellido_use from cuentaacceso cas 
                    INNER JOIN users us ON cas.iduser_cue = us.id_use`

    try {
        if (context.username) {
            sqlquery += ` where username_cue = "${context.username}" `;
        }
        const result = await db.pool.query(sqlquery);    
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.auth = auth;


