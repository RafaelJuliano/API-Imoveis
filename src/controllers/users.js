const Status = require('http-status');
const service = require('../services/users');

/*
USER CONTROLLER LAYER
É responsável por tratar os dados das requisições, envia-los à cadama de serviço e responder ao cliente conforme o resultado retornado.
*/


/**
 * Recolhe dados da requisição e solicita o cadastro de um novo usuário para a camada service
 * @param {Json} request - {name: String com nome do usuário, cpf: String com o CPF no formato 000.000.000-00, email: String com e-mail valido, pwd: String com senha.}
 * @param {Json} response - {id: createdUserId}
 * @param {*} next - Recolhe os erros.
 */
exports.registerNewUser = async (request, response, next) => {
    try {
        const newUser = {
            name: request.body.name,
            cpf: request.body.cpf,
            email: request.body.email,
            pwd: request.body.pwd
        }
        const createdUserId = await service.registerNewUser(newUser);
        response.status(Status.CREATED).send({ id: createdUserId });
    } catch (error) {
        next(error);
    }
};

/**
 * Solicita o login do usuário  para camada service e retorna um token de autenticação.
 * @param {Json} request - {email: String com e-mail valido,  pwd: String com senha}
 * @param {Json} response - {id: UserID, email: userEmail, token: token}
 * @param {*} next - Recolhe os erros.
 */
exports.login = async (request, response, next) => {
    const data = {
        email: request.body.email,
        pwd: request.body.pwd
    }
    try {
        const result = await service.login(data);
        if (result == 'UNAUTHORIZED') {
            response.status(Status.UNAUTHORIZED).send();
        } else {
            response.status(Status.OK).send(result)
        }
    } catch (error) {
        next(error);
    }
}
