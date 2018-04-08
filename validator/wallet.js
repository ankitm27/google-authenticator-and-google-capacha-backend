const Joi = require('joi');

const universalFunction = require('./../helpers/universalFunction.js');
const responseMessage = require('./../helpers/responseMessage.js');

let wallet = {
    /**
     * @author Ankit
     * @sync
     * @description validate request for generating ether wallet
     * @param {object} req
     * @param {object} res
     */

    etherWallet : (req,res,next) => {
        const schema = Joi.object().keys({
            uuid:Joi.string().required()
        });
        let validateRequest = Joi.validate({
            uuid:req.body.uuid
        },schema);

        if(validateRequest.error){
            return universalFunction.sendError(responseMessage.ERROR.PROVIDE_VALID_DATA,res);
        }

        next();
    },

    /**
     * @author Ankit
     * @sync
     * @description validate request for checking ether wallet is generated or not
     * @param {object} req
     * @param {object} res
     */

    isWalletExist : (req,res,next) => {
        const schema = Joi.object().keys({
            uuid:Joi.string().required()
        });
        let validateRequest = Joi.validate({
            uuid:req.body.uuid
        },schema);

        if(validateRequest.error){
            return universalFunction.sendError(responseMessage.ERROR.PROVIDE_VALID_DATA,res);
        }

        next();
    }
};

module.exports = wallet;