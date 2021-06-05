const express = require('express');
const controller = require('../controllers/properties');
const login = require('../middleware/login');

const router = express.Router()

router.get('/imoveis/:id', login.validate, controller.getProperty)

router.get('/imoveis', login.validate, controller.getProperties)

router.post('/imoveis', login.validate, controller.registerNewProperty)

router.put('/imoveis/:id', login.validate, controller.updateProperty)

router.delete('/imoveis/:id', login.validate, controller.deleteProperty)

module.exports = router