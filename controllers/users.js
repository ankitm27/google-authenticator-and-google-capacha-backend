const uuid = require('uuid/v4');
const crypto = require('crypto');
const speakeasy = require('speakeasy');

const universalFunction = require('./../helpers/universalFunction.js');
const responseMessage = require('./../helpers/responseMessage.js');
const usersDb = require('./../helpers/dbHelper/users.js');
const userHelper = require('./../helpers/users.js');

let users = {
    signUp: (req, res) => {
        let secret;
        usersDb.countData(req.body.email)
            .then((result) => {
                const hashPassword = crypto.createHmac("sha256", process.env.HASH_KEY).update(req.body.password).digest("hex");
                secret = speakeasy.generateSecret({length: 20});
                return usersDb.saveData(uuid(), req.body.email, hashPassword, secret.base32);
            }).then((result) => {
                return universalFunction.sendSuccess(responseMessage.SUCCESS.SUCCESSFULLY_SIGNUP, {
                    secret: secret.base32,
                    QRScanUrl: secret.otpauth_url
                }, res);
            }).catch((err) => {
                return universalFunction.sendError(err, res);
            })
    },

    authenticateEmailPassword: (req, res) => {
        userHelper.authenticateData(req.body.email, req.body.password)
            .then((result) => {
                universalFunction.sendSuccess(responseMessage.SUCCESS.SUCCESSFULLY_AUTHENTICATE_DATA,
                    {token:userHelper.generateToken(result,process.env.AUTHENTICATE_TOKEN_TIMESTAMP,process.env.AUTHENTICATE_TOKEN_PARAMETER)}, res);
            }).catch((err) => {
                universalFunction.sendError(err, res);
            })
    },

    login: (req, res) => {
        userHelper.authenticateData(req.body.email, req.body.password)
            .then((result) => {
                return userHelper.authenticateSecret(result, req.body.secret);
            }).then((result) => {
                return universalFunction.sendSuccess(responseMessage.SUCCESS.SUCCESSFULLY_AUTHENTICATE_DATA, {
                    token: result
                },res);
            }).catch((err) => {
                return universalFunction.sendError(err, res);
            })

    }
};


module.exports = users;

