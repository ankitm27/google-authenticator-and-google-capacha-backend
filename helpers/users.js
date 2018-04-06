const moment = require('moment');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

const responseMessage = require('./responseMessage.js');
const usersDb = require('./dbHelper/users.js');

let generateToken = (uuid) => {
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
};

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
    return token === otp ? true : false

};

let users = {
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
                                ? usersDb.findAndUpdateData({uuid:uuid},{token:generateToken(uuid)})
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
    generateQRScanCode: (secret,cb) => {
        let outputPromise = Promise.resolve()
        .then(() => {
                if(!secret || typeof secret != "string" || !(secret == secret.trim() )){
                    console.log("check");
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                return new Promise((resolve,reject) => {
                    QRCode.toDataURL(secret.otpauth_url, function(err, dataUrl) {
                        console.log(dataUrl);
                        if(err){
                            return reject(err,null);
                        }else{
                            return resolve(null,{secret:secret,dataUrl:dataUrl});
                        }
                        //write('<img src="' + data_url + '">');
                    })
                })
            });
        return cb && typeof cb === "function"
        ? outputPromise.resolve((result) => {
            cb(null,result);
        }).catch((err) => {
            cb(err,null);
        }):outputPromise;
    }
};

module.exports = users;