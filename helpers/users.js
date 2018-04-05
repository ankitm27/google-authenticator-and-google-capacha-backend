const moment = require('moment');
const jwt = require('jsonwebtoken');
const responseMessage = require('./responseFunction.js');

let users = {
    generateToken: (uuid) => {
        if (!uuid || typeof uuid != "string" || !(uuid == uuid.trim())) {
            return (responseMessage.ERROR.PROVIDE_VALID_DATA);
        }
        const payload = {
            iss: 'koinok.com',
            sub: uuid,
            iat: moment().unix(),
            exp: moment().add(7, 'days').unix()
        };
        return jwt.sign(payload, process.env.JWT_KEY);
    }
};

module.exports = users;