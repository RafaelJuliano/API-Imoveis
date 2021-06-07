const Status = require('http-status');
const service = require('../services/users');

/*
USER CONTROLLER LAYER
É responsável por tratar os dados das requisições, envia-los à cadama de serviço e responder ao cliente conforme o resultado retornado.
*/

/*
Solicita o cadastro de um novo usuário
@paran name = String com nome do usuário.
@paran cpd = String com o CPF no formato 000.000.000-00.
@paran email = String com e-mail valido.
@paran pwd = String com senha.
@return = ID do usuário criado.
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


/*
Solicita o login do usuário e retorna um token de autenticação.
@paran email = String com e-mail valido.
@paran pwd = String com senha.
@return = Id, email e token.
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
