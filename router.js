const express = require('express');
const router = new express.Router();
const user = require('./controllers/user');
const registro = require('./controllers/registro');
const permisos= require('./controllers/permisosroles');
const cuentaacceso = require('./controllers/cuentaacceso');
const depto = require('./controllers/departamentos');
const mun = require('./controllers/municipios');
const rol = require('./controllers/roles');
const modulos = require('./controllers/modulos');
const auth = require('./middleware/auth');

router.get('/', function (req, res) {
res.send('Aca la aplicacion ya esta corriendo ')
})
router.get('/registros/:iduser?',  registro.get);

//registro
router.get('/registro/:iduser?', auth, registro.get);
router.get('/registro/getbyfilters/:filters?', auth, registro.getbyfilters);
router.post('/registro', auth, registro.post);
router.put('/registro', auth, registro.put);

//permisos perisos
router.get('/permisos/:id?', auth, permisos.get);
router.post('/permisos', auth, permisos.post);
router.put('/permisos', auth, permisos.put);

//roles
router.get('/roles', auth, rol.get);

//modulos
router.get('/modulos/getbyrol/:idrol?', auth, modulos.getbyrol);

//usuarios
router.get('/user/:id?', auth, user.get);
router.post('/user', auth, user.post);
router.put('/user', auth, user.put);
router.get('/user/getbycoordinador/:coordinador?', auth, user.get);

//departamentos
router.get('/departamentos/:id?', auth, depto.get);

//municipios
router.get('/municipios/:iddepartamento?', auth, mun.get);

//Cuenta acceso 
router.route('/cuentaacceso').post(cuentaacceso.post);
router.route('/cuentaacceso').put(cuentaacceso.put);
router.route('/cuentaacceso/auth').post(cuentaacceso.auth);

module.exports = router;