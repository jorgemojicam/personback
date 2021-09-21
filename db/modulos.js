const db = require('./config')

async function get(context) {
    let sqlquery = 'select * from modulos'
    try {
        if (context.id) {
            sqlquery += ` where id_mod = ${context.id}`;
        }        
        const result = await db.pool.query(sqlquery);        
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.get = get;

async function getByRol(context) {
    let sqlquery = `SELECT 
                    mo.nombre_mod,
                    mo.id_mod,
                    (SELECT id_prol FROM permisosroles WHERE idmodulo_prol = mo.id_mod AND idrol_prol = ${context.id}) id,
                    (SELECT ver_prol FROM permisosroles WHERE idmodulo_prol = mo.id_mod AND idrol_prol = ${context.id}) ver,
                    (SELECT editar_prol FROM permisosroles WHERE idmodulo_prol = mo.id_mod AND idrol_prol = ${context.id}) editar,
                    (SELECT crear_prol FROM permisosroles WHERE idmodulo_prol = mo.id_mod AND idrol_prol = ${context.id}) crear,
                    (SELECT ver_prol FROM permisosroles WHERE idmodulo_prol = mo.id_mod AND idrol_prol = ${context.id}) ver
                    FROM modulos mo`
    try {                
        const result = await db.pool.query(sqlquery);        
        return result;
    } catch (err) {
        throw err;
    }
}
module.exports.getByRol = getByRol;