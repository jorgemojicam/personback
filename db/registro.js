const db = require('./config')


async function get(context) {
    let sqlquery = `SELECT re.*,
                        mun.nombre_mun,
                        CONCAT(us.nombre_use," ",us.apellido_use) full_name  FROM registro re
                        INNER JOIN municipios mun ON re.idmunicipio_reg = mun.id_mun
                        INNER JOIN cuentaacceso cas ON cas.id_cue = re.idcuentaacceso_reg
                        INNER JOIN users us	ON us.id_use = cas.iduser_cue`
    let arrayWhere = []
    try {
        const binds = {};
        if (context.id) {
            binds.id = context.id;
            arrayWhere.push(" id_reg = :id ");
        }
        if (context.iduser) {
            arrayWhere.push(` idcuentaacceso_reg = ${context.idcuentaacceso}`);
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
        const result = await db.pool.query("INSERT INTO registro (numerovalidas_reg, numeroinvalidas_reg, total_reg, idmunicipio_reg, fecha_reg, idcuentaacceso_reg, iduser_reg) VALUES (?, ?, ?, ?, ?, ?, ?)", [data.numerovalidas, data.numeroinvalidas, data.total, data.idmunicipio, data.fecha, data.idcuentaacceso, data.iduser]);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.create = create;


async function update(data) {

    try {
        const result = await db.pool.query("UPDATE registro set numerovalidas_reg = ?, numeroinvalidas_reg = ? , total_reg= ?, idmunicipio = ?, fecha_reg= ?, idcuentaacceso_reg = ?, iduser_reg =? where id_reg = ?", [data.numerovalidas, data.numeroinvalidas, data.total, data.idmunicipio, data.fecha, data.idcuentaacceso, data.iduser, data.id]);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.update = update;
