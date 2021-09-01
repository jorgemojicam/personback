const express = require('express');
const router = new express.Router();
const acciones = require('./controllers/acciones');
const user = require('./controllers/user');
const registro = require('./controllers/registro');
const permisos= require('./controllers/permisosroles');
const cuentaacceso = require('./controllers/cuentaacceso');
const depto = require('./controllers/departamentos');
const mun = require('./controllers/municipios');
const auth = require('./middleware/auth');


//registro
router.get('/registro/:id?', auth, registro.get);
router.post('/registro', auth, registro.post);
router.put('/registro', auth, registro.put);

//permisos roles
router.get('/permisos/:id?', auth, permisos.get);
router.post('/permisos', auth, permisos.post);
router.put('/permisos', auth, permisos.put);

router.get('/user/:id?', auth, user.get);

router.get('/acciones/:id?', auth, acciones.get);

router.get('/departamentos/:id?', auth, depto.get);

router.get('/municipios/:iddepartamento?', auth, mun.get);

router.route('/cuentaacceso').post(cuentaacceso.post);
router.route('/cuentaacceso/auth').post(cuentaacceso.auth);

module.exports = router;