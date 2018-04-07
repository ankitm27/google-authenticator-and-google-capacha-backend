const Joi = require('joi');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const universalFunction = require('./../helpers/universalFunction.js');
const responseMessage = require('./../helpers/responseMessage.js');


let users = {
    signUp: (req, res, next) => {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        let validateRequest = Joi.validate({
            email: req.body.email,
            password: req.body.password
        }, schema);

        if (validateRequest.error) {
            return universalFunction.sendError(responseMessage.ERROR.PROVIDE_VALID_DATA, res);
        }

        next();
    },


    authenticateEmailPassword: (req, res, next) => {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        let validateRequest = Joi.validate({
            email: req.body.email,
            password: req.body.password
        }, schema);

        if (validateRequest.error) {
            return universalFunction.sendError(responseMessage.ERROR.PROVIDE_VALID_DATA, res);
        }

        next();
    },

    login: (req, res, next) => {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
            secret: Joi.string().required()
        });
        let validateRequest = Joi.validate({
            email: req.body.email,
            password: req.body.password,
            secret: req.body.secret
        }, schema);

        if (validateRequest.error) {
            return universalFunction.sendError(responseMessage.ERROR.PROVIDE_VALID_DATA, res);
        }

        next();
    },
    validatesToKen: (req, res, next) => {
        console.log("check");
        if (!req.headers["token"] || typeof req.headers["token"] != "string" || !(req.headers["token"] == req.headers["token"])) {
            return universalFunction.sendError(responseMessage.ERROR.PROVIDE_VALID_DATA, res);
        }
        jwt.verify(req.headers["token"], process.env.JWT_KEY, function (err, result) {
            if (err) {
                return universalFunction.sendError(responseMessage.ERROR.TOKEN_NOT_VALID, res);
            } else if (result.exp - moment().unix() > 0) {
                next();
            } else {
                console.log("check1111");
                universalFunction.sendError(responseMessage.ERROR.TOKEN_EXPIRE, res);
            }
        });
    }
};

module.exports = users;
