const User = require('../models/users');
const security = require('./security');

/*
USER SERVICE LAYER
Responsável por executar a regra de negócio e invocar o objeto Sequelize para operações no banco de dados.
*/

/**
 * Realiza criptografia da senha com BCrypt e então realiza o cadastro no banco de dados.
 * @param {User} newUser - Objeto com dados do usuário.
 * @returns - User ID
 */
exports.registerNewUser = async (newUser) => {
    const hash = await security.hashPassword(newUser.pwd);
    console.log(hash);

    const result = await User.create({
        name: newUser.name,
        cpf: newUser.cpf,
        email: newUser.email,
        pwd: hash
    });
    return result.id;
}


/**
 * Verifica a existencia do cadastro e então valida a senha.
 * @param {Json} data - {email: {String}, pwd: {String}}
 * @returns - {id: user.id, email: user.email, token: token}
 */
exports.login = async (data) => {
    const user = await findUser(data.email);
    if (user) {
        const isPwdValid = await security.comparePassword(data.pwd, user.pwd);
        if (isPwdValid) {
            const token = security.generateToken(user);
            return {
                id: user.id, email: user.email,
                token: token
            };
        } else {
            return 'UNAUTHORIZED';
        }
    } else {
        return 'UNAUTHORIZED';
    }
}


/**
 * Realiza busca de usuário por email.
 * @param {String} - Email do usuário.
 * @returns - {User}.
 */
findUser = async (email) => {
    const user = await User.findOne({ where: { email: email } });
    return user;
}
