const db = require('./config')


async function get(context) {
    let sqlquery = 'select * from registro '
    let arrayWhere = []
    try {
        const binds = {};
        if (context.id) {
            binds.id = context.id;
            arrayWhere.push(" id = :id ");
        }
        if (context.iduser) {
            arrayWhere.push(` idcuentaacceso = ${context.idcuentaacceso}`);
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

    try {
        const result = await db.pool.query("INSERT INTO registro (numerovalidas, numeroinvalidas, total, idmunicipio, fecha, idcuentaacceso, iduser) VALUES (?, ?, ?, ?, ?, ?, ?)", [data.numerovalidas, data.numeroinvalidas, data.total, data.idmunicipio, data.fecha, data.idcuentaacceso, data.iduser]);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.create = create;


async function update(data) {

    try {
        const result = await db.pool.query("UPDATE registro set numerovalidas = ?, numeroinvalidas = ? , total= ?, idmunicipio = ?, fecha= ?, idcuentaacceso = ?, iduser =? where id = ?", [data.numerovalidas, data.numeroinvalidas, data.total, data.idmunicipio, data.fecha, data.idcuentaacceso, data.iduser, data.id]);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.update = update;
