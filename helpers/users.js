const moment = require('moment');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const rp = require("request-promise");

const responseMessage = require('./responseMessage.js');
const usersDb = require('./dbHelper/users.js');


/**
 * @author Ankit
 * @sync
 * @description valid google authenticator otp is valid or not
 * @param {string} uuid
 * @param {otp} otp
 * @param {string} secret
 */

let validateSecret = (uuid, otp, secret) => {
    if (!uuid || typeof uuid != "string" || !(uuid == uuid.trim())) {
        return (responseMessage.ERROR.PROVIDE_VALID_DATA);
    }
    if (!otp || typeof otp != "string" || !(otp == otp.trim())) {
        return (responseMessage.ERROR.PROVIDE_VALID_DATA);
    }
    if (!secret || typeof secret != "string" || !(secret == secret.trim())) {
        return (responseMessage.ERROR.PROVIDE_VALID_DATA);
    }
    const token = speakeasy.totp({
        secret: secret,
        encoding: 'base32'
    });
    return token === otp ? true : false;
};

let users = {
    /**
     * @author Ankit
     * @async
     * @description authenticate email and password, returns promise if callback is not provided
     * @param {string} email
     * @param {string} password
     */

    authenticateData: (email, password, cb) => {
        let outputPromise = Promise.resolve()
            .then(() => {
                if (!email || typeof email != "string" || !(email == email.trim())) {
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                if (!password || typeof password != "string" || !(password == password.trim())) {
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                return new Promise((resolve, reject) => {
                    usersDb.findOne({email: email}, {_id: 0, password: 1, uuid: 1})
                        .then((result) => {
                            if (!result.length) {
                                return reject(responseMessage.ERROR.USER_NOT_PRESENT)
                            }
                            if (crypto.createHmac("sha256", process.env.HASH_KEY).update(password).digest("hex") === result[0].password) {
                                return resolve(result[0].uuid);
                            }
                            return reject(responseMessage.ERROR.PASSWORD_NOT_MATCH);
                        }).catch((err) => {
                            return reject(err);
                        })
                })
            });
        return cb && typeof cb === "function"
            ? outputPromise.then((result) => {
            cb(null, result);
        }).catch((err) => {
            cb(err, null);
        }) : outputPromise;
    },
    /**
     * @author Ankit
     * @async
     * @description authenticate secret, returns promise if callback is not provided
     * @param {string} uuid
     * @param {secret} secret
     */

    authenticateSecret: (uuid, secret, cb) => {
        let outputPromise = Promise.resolve()
            .then(() => {
                if (!uuid || typeof uuid != "string" || !(uuid == uuid.trim())) {
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                if (!secret || typeof secret != "string" || !(secret == secret.trim())) {
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                return new Promise((resolve, reject) => {
                    usersDb.findOne({uuid: uuid}, {_id: 0, secret: 1})
                        .then((result) => {
                            return validateSecret(uuid, secret, result[0].secret)
                        }).then((result) => {
                            return result
                                ? usersDb.findAndUpdateData({uuid: uuid}, {token: users.generateToken(uuid, process.env.USER_TOKEN_TIMESTAMP, process.env.USER_TOKEN_PARAMETER)})
                                : reject(responseMessage.ERROR.OTP_NOT_MATCH);
                        }).then((result) => {
                            return resolve(result.token);
                        }).catch((err) => {
                            return reject(responseMessage.ERROR.ERROR_IN_QUERY);
                        })
                })
            });
        return cb && typeof cb === "function"
            ? outputPromise.then((result) => {
            cb(null, result)
        }).catch((err) => {
            cb(err, null)
        }) : outputPromise;
    },
    /**
     * @author Ankit
     * @sync
     * @description generate token
     * @param {string} uuid
     * @param {string} timeStamp - number for which token should be generated(ex - 10)
     * @param {string} parameter - unit for which token should be generated (ex - minutes)
     */

    generateToken: (uuid, timeStamp, parameter) => {
        if (!uuid || typeof uuid != "string" || !(uuid == uuid.trim())) {
            return (responseMessage.ERROR.PROVIDE_VALID_DATA);
        }
        if (!timeStamp || typeof timeStamp != "string" || !(timeStamp == timeStamp.trim())) {
            return (responseMessage.ERROR.PROVIDE_VALID_DATA);
        }
        if (!parameter || typeof parameter != "string" || !(parameter == parameter.trim())) {
            return (responseMessage.ERROR.PROVIDE_VALID_DATA);
        }
        const payload = {
            iss: 'koinok.com',
            sub: uuid,
            iat: moment().unix(),
            exp: moment().add(timeStamp, parameter).unix()
        };
        return jwt.sign(payload, process.env.JWT_KEY);
    },
    /**
     * @author Ankit
     * @async
     * @description authenticate google captcha, returns promise if callback is not provided
     * @param {string} captcha
     */

    authenticateCaptcha: (captcha, cb) => {
        let outputPromise = Promise.resolve()
            .then(() => {
                if (!captcha || typeof captcha != "string" || !(captcha == captcha.trim())) {
                    return Promise.resolve(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                return new Promise((resolve, reject) => {
                    var options = {
                        method: 'POST',
                        uri: 'https://www.google.com/recaptcha/api/siteverify',
                        formData: {
                            'secret': process.env.GOOGLE_CAPTCHA,
                            'response': captcha

                        }
                    };
                    rp(options)
                        .then((result) => {
                            return JSON.parse(result).success
                            ? resolve(result)
                            : reject(responseMessage.ERROR.NOT_VALID_CAPTCHA);
                        })
                        .catch((err) => {
                            return reject(responseMessage.ERROR.ERROR_CONNECTING_GOOGLE_SERVER);
                        });
                })
            });
        return cb && typeof cb === "function"
            ? outputPromise.then((result) => {
            cb(null, null);
        }).catch((err) => {
            cb(err, null);
        }) : outputPromise;
    }


};

module.exports = users;