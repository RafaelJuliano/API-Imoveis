const express = require('express');
const controller = require('../controllers/users');

const router = express.Router();


/*
PROPERTIES ROUTER LAYER
EndPoints das requisições referentes ao usuário.
*/

router.post('/usuarios/login', controller.login);

router.post('/usuarios/cadastro', controller.registerNewUser);

module.exports = router