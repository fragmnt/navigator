const jwt = require('jsonwebtoken');
const config = require('../../api.config');

const generate = async (payload) => {
    var token = await jwt.sign({ id: payload }, config.secret, {
        expiresIn: 604800, // expires in 7 days
        algorithm: 'HS256'
    });
    return token;
};

const verify = async (authToken) => {
    var checkedToken = await jwt.verify(authToken, config.secret, (err, decoded) => {
        if (err) throw err;
        return decoded;
      });
    return checkedToken;
};

module.exports = {generate, verify}