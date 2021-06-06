const User = require('../models/users');
const security = require('./security');

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

findUser = async (email) => {
    const user = await User.findOne({ where: { email: email } });
    return user;
}
