const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*
SECURITY SERVICE LAYER
A camada de sergurança contém as funçõe responsáveis pela criptografia de senha e validação de token.
*/


/**
 * Responsável por gerar um token de autenticação toda vez que um usuário faz login no sistema.
 * @param {User} user - Obejto com id e email do usuário.
 * @returns - token de validação.
 */
exports.generateToken = (user) => {
    const tokenObject = {
        id: user.id,
        email: user.email
    }

    //Não existe necessidade de uma função de logout visto que o token expira em 15min.
    const tokenOptions = {
        expiresIn: "15m"
    }    
    const token = jwt.sign(tokenObject, process.env.JWT_KEY, tokenOptions);
    return token;
}


/**
 * Responsável pela validação do token recebido.
 * @param {String} token - Token de validação.
 * @returns - {UserID: ,UserEmail, token}
 */
exports.tokenValidate = (token) => {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    return decode;  
}


/**
 * Recebe a string com senha e retorna  a senha criptografada.
 * @param {String} pwd - Senha a ser criptografada.
 * @returns {String} - Hash
 */
exports.hashPassword = async (pwd) => {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(pwd, 10, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
    return hashedPassword
}


/**
 * Responsável por comparar as senhas no momento do login.
 * @param {String} dataPwd - Senha informada no login.
 * @param {String} dbPwd - Senha retornada no cadastro do usuário.
 * @returns {Boolean}
 */
exports.comparePassword = async (dataPwd, dbPwd) => {
    const isValid = await new Promise((resolve, reject) => {
        bcrypt.compare(dataPwd, dbPwd, function (err, result) {
            if (err) reject(err)
            resolve(result)
        });
    })
    return isValid
}