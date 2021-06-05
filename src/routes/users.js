const express = require('express');
const controller = require('../controllers/users');

const router = express.Router();

router.post('/usuarios/login', controller.login);

router.post('/usuarios/cadastro', controller.registerNewUser);

module.exports = router