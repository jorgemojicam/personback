const express = require('express');
const router = new express.Router();
const user = require('./controllers/user');
const cuentaacceso = require('./controllers/cuentaacceso');
const depto = require('./controllers/departamentos');
const mun = require('./controllers/municipios');
const auth = require('./middleware/auth');


//router.route('/user/:id?',user.get).post(user.post);
router.get('/user/:id?', auth, user.get);
router.get('/departamentos/:id?', auth, depto.get);
router.get('/municipios/:iddepartamento?', auth, mun.get);
router.route('/cuentaacceso').post(cuentaacceso.post);
router.route('/cuentaacceso/auth').post(cuentaacceso.auth);

module.exports = router;