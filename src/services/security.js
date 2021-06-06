const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    const tokenObject = {
        id: user.id,
        email: user.email
    }
    const tokenOptions = {
        expiresIn: "15m"
    }
    const token = jwt.sign(tokenObject, process.env.JWT_KEY, tokenOptions);
    return token;
}

exports.tokenValidate = (token) => {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    return decode;  
}

exports.hashPassword = async (pwd) => {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(pwd, 10, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
    return hashedPassword
}

exports.comparePassword = async (dataPwd, dbPwd) => {
    const isValid = await new Promise((resolve, reject) => {
        bcrypt.compare(dataPwd, dbPwd, function (err, result) {
            if (err) reject(err)
            resolve(result)
        });
    })
    return isValid
}