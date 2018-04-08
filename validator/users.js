const Joi = require('joi');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const universalFunction = require('./../helpers/universalFunction.js');
const responseMessage = require('./../helpers/responseMessage.js');


let users = {
    /**
     * @author Ankit
     * @sync
     * @description validated parameter for signup request
     * @param {object} req
     * @param {object} res
     */

    signUp: (req, res, next) => {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
            gRecaptchaResponse:Joi.string().required(),
        });
        let validateRequest = Joi.validate({
            email: req.body.email,
            password: req.body.password,
            gRecaptchaResponse:req.body.gRecaptchaResponse,
        }, schema);

        if (validateRequest.error) {
            return universalFunction.sendError(responseMessage.ERROR.PROVIDE_VALID_DATA, res);
        }

        next();
    },

    /**
     * @author Ankit
     * @sync
     * @description validate request for authenticate
     * @param {object} req
     * @param {object} res
     */

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

    /**
     * @author Ankit
     * @sync
     * @description authenticate request for login
     * @param {object} req
     * @param {object} res
     */

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

    /**
     * @author Ankit
     * @sync
     * @description validate token
     * @param {object} req
     * @param {object} res
     */

    validatesToKen: (req, res, next) => {
        if (!req.headers["token"] || typeof req.headers["token"] != "string" || !(req.headers["token"] == req.headers["token"])) {
            return universalFunction.sendError(responseMessage.ERROR.PROVIDE_VALID_DATA, res);
        }
        jwt.verify(req.headers["token"], process.env.JWT_KEY, function (err, result) {
            if (err) {
                return universalFunction.sendError(responseMessage.ERROR.TOKEN_NOT_VALID, res);
            } else if (result.exp - moment().unix() > 0) {
                next();
            } else {
                universalFunction.sendError(responseMessage.ERROR.TOKEN_EXPIRE, res);
            }
        });
    }
};

module.exports = users;
