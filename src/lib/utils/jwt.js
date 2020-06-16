const jwt = require('jsonwebtoken');
const config = require('../../api.config');
const jwt_decode = require('jwt-decode');

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

const decode = (authToken) => {
    var payload = jwt_decode(authToken);
    return payload;
};

module.exports = {generate, verify, decode}