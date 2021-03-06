const db = require('./config')

async function get(context) {
    let sqlquery = `SELECT 
                    mo.nombre_mod,
                    mo.id_mod,
                    (SELECT id_prol FROM permisosroles WHERE idmodulo_prol = mo.id_mod AND idrol_prol = ${context.idrol}) id,
                    (SELECT ver_prol FROM permisosroles WHERE idmodulo_prol = mo.id_mod AND idrol_prol = ${context.idrol}) ver,
                    (SELECT editar_prol  FROM permisosroles WHERE idmodulo_prol = mo.id_mod AND idrol_prol = ${context.idrol}) editar,
                    (SELECT crear_prol FROM permisosroles WHERE idmodulo_prol = mo.id_mod AND idrol_prol = ${context.idrol}) crear,
                    (SELECT eliminar_prol FROM permisosroles WHERE idmodulo_prol = mo.id_mod AND idrol_prol = ${context.idrol}) eliminar
                    FROM modulos mo`
    try {

        const result = await db.pool.query(sqlquery);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.get = get;

async function getByRol(context) {

    let sqlquery = `SELECT
                    mo.id_mod,
                    mo.nombre_mod,
                    mo.ruta_mod,
                    mo.icono_mod,
                    (SELECT id_prol FROM permisosroles WHERE idmodulo_prol = mo.id_mod AND idrol_prol = ${context.idrol}) id,
                    (SELECT ver_prol FROM permisosroles WHERE idmodulo_prol = mo.id_mod AND idrol_prol = ${context.idrol}) ver,
                    (SELECT editar_prol  FROM permisosroles WHERE idmodulo_prol = mo.id_mod AND idrol_prol = ${context.idrol}) editar,
                    (SELECT crear_prol FROM permisosroles WHERE idmodulo_prol = mo.id_mod AND idrol_prol = ${context.idrol}) crear,
                    (SELECT eliminar_prol FROM permisosroles WHERE idmodulo_prol = mo.id_mod AND idrol_prol = ${context.idrol}) eliminar
                    FROM modulos mo`

    if (context.ver) {
        sqlquery += ` where (SELECT ver_prol FROM permisosroles WHERE idmodulo_prol = mo.id_mod AND idrol_prol = ${context.idrol}) = ${context.ver}`
    }
    console.log("llego aqui", sqlquery)

    try {
        const result = await db.pool.query(sqlquery);
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.getByRol = getByRol;