const express = require('express');
const controller = require('../controllers/properties');
const login = require('../middleware/login');

const router = express.Router()

/*
PROPERTIES ROUTER LAYER
EndPoints das requisições referentes aos imóveis.
Antes da chamada dos respectivos controllers, todas as rotas são validadas pelo JWT.
*/

router.get('/imoveis/:id', login.validate, controller.getProperty)

router.get('/imoveis', login.validate, controller.getProperties)

router.post('/imoveis', login.validate, controller.registerNewProperty)

router.put('/imoveis/:id', login.validate, controller.updateProperty)

router.delete('/imoveis/:id', login.validate, controller.deleteProperty)

module.exports = router