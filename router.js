const express = require('express');
const router = new express.Router();
const user = require('./controllers/user');
const cuentaacceso = require('./controllers/cuentaacceso');

router.route('/user/:id?').get(user.get).post(user.post);
router.route('/cuentaacceso').post(cuentaacceso.post);
router.route('/cuentaacceso/auth').post(cuentaacceso.auth);

module.exports = router;