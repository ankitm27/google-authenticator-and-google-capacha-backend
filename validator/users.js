const Joi = require('joi');

const universalFunction = require('./../helpers/universalFunction.js');
const responseMessage = require('./../helpers/responseFunction.js');


let users = {
    signUp : (req,res,next) => {
        const schema = Joi.object().keys({
            email:Joi.string().required(),
            password:Joi.string().required()
        });
        let validateRequest = Joi.validate({
            email:req.body.email,
            password:req.body.password
        },schema);

        if(validateRequest.error){
           return universalFunction.sendError(responseMessage.ERROR.PROVIDE_VALID_DATA,res);
        }

        next();
    }
};

module.exports = users;
