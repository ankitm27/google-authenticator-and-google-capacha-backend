const jwt = require('jsonwebtoken');
const moment = require('moment');

const universalFunction = require('./../helpers/universalFunction.js');
const responseMessage = require('./../helpers/responseMessage.js');
const usersDb = require('./../helpers/dbHelper/users.js');

module.exports = (req, res, next) => {
    if(!req.body.token || typeof req.body.token != "string" || !(req.body.token == req.body.token)){
        return universalFunction.sendError(responseMessage.ERROR.PROVIDE_VALID_DATA);
    }
    jwt.verify(req.body.token,process.env.JWT_KEY,function(err,result){
        if(err){
            return universalFunction.sendError(responseMessage.ERROR.TOKEN_NOT_VALID,res);
        }else if(result.exp - moment().unix() > 0) {
            usersDb.findOne({token:req.body.token},{_id:0,uuid:1})
            .then((result) => {
                    if(result && result.length == 1){
                        req.body.uuid = result[0].uuid;
                        return next();
                    }else{
                        return universalFunction.sendError(responseMessage.ERROR.USER_NOT_PRESENT,res);
                    }
                }).catch((err) => {
                    return universalFunction.sendError(responseMessage.ERROR.ERROR_IN_QUERY,res);
                });
        }else{
            universalFunction.sendError(responseMessage.ERROR.TOKEN_EXPIRE,res);
        }
    });
};

