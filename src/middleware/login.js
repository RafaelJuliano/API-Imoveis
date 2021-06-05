const jwt = require('jsonwebtoken');
const Status = require('http-status');

exports.validate = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        request.user = decode;
        next();
    } catch (error) {
        return response.status(Status.UNAUTHORIZED).send({message:'token validation failed'});
    }
    

}