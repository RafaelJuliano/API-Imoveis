const Status = require('http-status');
const service = require('../services/security');


/*
JWT MIDDLEWARE
*/

/**
 * Realiza a validaçao do token enviado no cabeçalho da requisição.
 * @param {*} request - Header {Authorization: Bearer {token}}
 * @param {Json} response - {id: UserID, email: userEmail, token: token}
 * @param {*} next 
 * @returns 
 */
exports.validate = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decode = service.tokenValidate(token);       
        request.user = decode;      
        next();
    } catch (error) {
        return response.status(Status.UNAUTHORIZED).send({message:'token validation failed'});
    } 
}