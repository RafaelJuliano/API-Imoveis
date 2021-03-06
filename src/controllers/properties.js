const Status = require('http-status');
const service = require('../services/properties');

/*
PROPERTY CONTROLLER LAYER
É responsável por tratar os dados das requisições, envia-los à cadama de serviço e responder ao cliente conforme o resultado retornado.
*/

/** @module CONTROLLER PROPERTY */

/**
 * Solicita um imóvel específico conforme o id passado com parâmetro na URL.
 * @param {*} request - Id do imóvel a ser requisitado via url.
 * @param {Object} response - Imóvel encontrado.
 * @param {*} next - Recolhe os erros.
 */
exports.getProperty = async (request, response, next) => {
    const id = request.params.id;

    try {
        const propertyFound = await service.getProperty(id);
        if (propertyFound) {
            response.send(propertyFound);
        } else {
            response.status(Status.NOT_FOUND).send();
        };
    } catch (error) {
        next(error);
    }
};

/**
 * Solicita todos os imóveis cadastrados. Os resultados são paginados para melhor performace.
 * @param {*} request - limit: Limite de intens por página com valor máximo de 15. (Padrão 20), page: Intervalo de resultados a ser requisitado. (Padrão 0)
 * @param {Object[]} response - Intervalo de resultados a ser requisitado. (Padrão 0)
 * @param {*} next - Recolhe os erros.
 */
exports.getProperties = async (request, response, next) => {
    const limit = parseInt(request.query.limit || 0);
    const page = parseInt(request.query.page || 0);

    //limit e page dever ser inteiros.
    if (!Number.isInteger(limit) || !Number.isInteger(page)) {
        response.status(Status.BAD_REQUEST).send();
    };

    try {
        const {count, properties: propertiesFound} = await service.getProperties(limit, page);
        if (propertiesFound && propertiesFound.length) {
            response.send({count, propertiesFound});
        } else {
            response.status(Status.NOT_FOUND).send();
        };
    } catch (error) {
        next(error);
    }
};


/**
 * Solicita a inclusão de um novo imóvel no banco de dados.
 * @param {*} request - {cep: Deve receber no formáto 00000-000,  number: Recebe inteiro com limite de 6 digitos, complement: (Opcional), price: Recebe um decimal com limite de 10 digitos, rooms: Recebe um inteiro com limit de 2 digitos, available: booleano (Opcional)}
 * @param {Property} response - Imóvel cadastrado.
 * @param {*} next - Recolhe os erros.
 */
exports.registerNewProperty = async (request, response, next) => {
    try {
        const property = {
            cep: request.body.cep,
            number: request.body.number,
            complement: request.body.complement,
            price: request.body.price,
            rooms: request.body.rooms
        };

        const newProperty = await service.registerNewProperty(property);
        response.status(Status.CREATED).send(newProperty);
    } catch (error) {
        next(error);
    }
}

/**
 * Solicita a alteração de uma ou mais colunas de um imóvel.
 * @param {*} request - {cep: Deve receber no formáto 00000-000,  number: Recebe inteiro com limite de 6 digitos, complement: , price: Recebe um decimal com limite de 10 digitos, rooms: Recebe um inteiro com limit de 2 digitos, available: booleano)}
 * @param {*} response - Status OK
 * @param {*} next - Recolhe os erros.
 */
exports.updateProperty = async (request, response, next) => {
    try {
        const property = {
            id: request.params.id,
            cep: request.body.cep,
            number: request.body.number,
            complement: request.body.complement,
            price: request.body.price,
            rooms: request.body.rooms
        };

        const result = await service.updateProperty(property);
        if (result == 'updated') {
            response.status(Status.OK).send()
        } else if (result == 'not found') {
            response.status(Status.NOT_FOUND).send()
        }
    } catch (error) {
        next(error)
    }
}


/**
 * Solicita a exclusão de um imóvel.
 * @param {*} request - Id do imóvel a ser requisitado via url.
 * @param {*} response - Status OK
 * @param {*} next - Recolhe os erros.
 */
exports.deleteProperty = async (request, response, next) => {
    const id = request.params.id

    try {
        const result = await service.deleteProperty(id);
        if (result == 'deleted') {
            response.status(Status.OK).send()
        } else if (result == 'not found') {
            response.status(Status.NOT_FOUND).send()
        }
    } catch (error) {
        next(error)
    }
}