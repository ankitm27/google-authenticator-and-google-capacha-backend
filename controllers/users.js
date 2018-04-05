const universalFunction = require('./../helpers/universalFunction.js');
const responseMessage = require('./../helpers/responseFunction.js');
const usersDb = require('./../helpers/dbHelper/users.js');
let users = {
    signUp: (req, res) => {
        return new Promise((resolve, reject) => {
            usersDb.saveData(req.body.email, req.body.password)
                .then((result) => {
                    //console.log("result", result);
                    universalFunction.sendSuccess(responseMessage.SUCCESS.SUCCESSFULLY_SIGNUP,{},res);
                }).catch((err) => {
                    //console.log("err", err);
                    universalFunction.sendError(responseMessage.ERROR.ERROR_IN_QUERY,res);
                })
        });

    }
};

module.exports = users;

