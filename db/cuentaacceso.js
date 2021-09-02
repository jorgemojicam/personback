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
            arrayWhere.push(" id = :id ");
        }
        if (context.iduser) {
            binds.iduser = context.iduser;
            arrayWhere.push(" iduser = :iduser ");
        }
        if (context.username) {
            binds.username = context.username;
            arrayWhere.push(" username = :username ");
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
        const result = await db.pool.query("insert into cuentaacceso (username,password,iduser) values (?,?,?)", [data.username, passcryp, data.iduser]);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.create = create;

async function auth(context) {
    let sqlquery = `select username,password,idroles,email,firts_name,last_name from cuentaacceso cas 
                    INNER JOIN users us ON cas.iduser = us.id`

    try {
        if (context.username) {
            sqlquery += ` where username = "${context.username}" `;
        }
        const result = await db.pool.query(sqlquery);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.auth = auth;

async function generateAuthToken() {

    const token = jwt.sign({ _id: this._id }, "Stack", {
        expiresIn: "10h"
    }, "*/.+fMd|-*g0j*|-*hgJfg*|-*g1g*|-*fhChm*|-*4*/.*");

    return token;
};
module.exports.generateAuthToken = generateAuthToken;


