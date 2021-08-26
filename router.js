const express = require('express');
const router = new express.Router();
const user = require('./controllers/user');

router.route('/user/:id?').get(user.get).post(user.post);

module.exports = router;