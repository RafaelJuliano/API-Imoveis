const User = require('../models/users');
const Status = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.registerNewUser = async (request, response, next) => {
    const name = request.body.name;
    const cpf = request.body.cpf;
    const email = request.body.email;
    const pwd = request.body.pwd;

    bcrypt.hash(pwd, 10, (errBcrypt, hash) => {
        if (errBcrypt) {
            return next(errBcrypt);
        }
        User.create({
            name: name,
            cpf: cpf,
            email: email,
            pwd: hash
        }).then((result) => {
            const id = result.id;
            response.status(Status.CREATED).send({ id: id });
        }).catch((error) => next(error));
    });
}

exports.login = async (request, response, next) => {
    const email = request.body.email;
    const pwd = request.body.pwd;
    User.findOne({ where: { email: email } }).then((user) => {
        if (user) {
            bcrypt.compare(pwd, user.pwd, (errBcrypt, result) => {
                if (errBcrypt) {
                    return next(errBcrypt);
                };
                if (result) {
                    const tokenObject = {
                        id: user.id,
                        email: user.email
                    }
                    const tokenOptions = {
                        expiresIn: "15m"
                    }
                    let token = jwt.sign(tokenObject, process.env.JWT_KEY, tokenOptions)
                    response.status(Status.OK).send({id: user.id, email: user.email,
                        token: token})
                } else {
                    response.status(Status.UNAUTHORIZED).send();
                }

            });
        } else {
            response.status(Status.UNAUTHORIZED).send()
        }
    }).catch((error) => next(error))

};
