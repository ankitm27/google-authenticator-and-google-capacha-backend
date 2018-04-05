const uuid = require('uuid/v4');
const crypto = require('crypto');

const universalFunction = require('./../helpers/universalFunction.js');
const responseMessage = require('./../helpers/responseMessage.js');
const usersDb = require('./../helpers/dbHelper/users.js');
const userHelper = require('./../helpers/users.js');

let users = {
    signUp: (req, res) => {
        usersDb.countData(req.body.email)
            .then((result) => {
                const hashPassword = crypto.createHmac("sha256", process.env.HASH_KEY).update(req.body.password).digest("hex");
                return usersDb.saveData(uuid(), req.body.email, hashPassword);
            }).then((result) => {
                universalFunction.sendSuccess(responseMessage.SUCCESS.SUCCESSFULLY_SIGNUP, {}, res);
            }).catch((err) => {
                universalFunction.sendError(err, res);
            })
    },

    login: (req, res) => {
        usersDb.findOne({email:req.body.email},{_id:0,password:1,uuid:1})
        .then((result) => {
                if(!result.length){
                    return universalFunction.sendError(responseMessage.ERROR.USER_NOT_PRESENT)
                }
                if(crypto.createHmac("sha256", process.env.HASH_KEY).update(req.body.password).digest("hex") === result[0].password){
                    return universalFunction.sendSuccess(responseMessage.SUCCESS.SUCCESSFULLY_GET_DATA,{token:userHelper.generateToken(result[0].uuid)},res);
                }
                return universalFunction.sendError(responseMessage.ERROR.PASSWORD_NOT_MATCH,res);
            }).catch((err) => {
                return universalFunction.sendError(err,res);
            })
    }
};

module.exports = users;

