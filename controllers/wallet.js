const ethers = require('ethers');
const crypto = require('crypto2');

const universalFunction = require('./../helpers/universalFunction.js');
const responseMessage = require('./../helpers/responseMessage.js');
const usersDb = require('./../helpers/dbHelper/users.js');
const walletHelper = require('./../helpers/wallet.js');

let Wallet = ethers.Wallet;

let wallet = {
    etherWallet: (req, res) => {
        usersDb.findOne(
            {
                uuid: req.body.uuid
            }, {
                _id: 0,
                uuid: 1,
                privateKey: 1,
                address: 1
            }).then((result) => {
                if (result[0].privateKey && result[0].address) {
                    return Promise.resolve(result[0].address);
                }
                return walletHelper.generateWallet(req.body.uuid)
            }).then((result) => {
                return universalFunction.sendSuccess(responseMessage.SUCCESS.SUCCESSFULLY_GET_DATA, {
                    address: result
                }, res);
            }).catch((err) => {
                return universalFunction.sendError(err, res);
            });
    },
    isWalletExist:(req,res) => {
        usersDb.findOne({
            uuid:req.body.uuid
        },{
            _id:0,
            uuid:1,
            privateKey:1,
            address:1
        }).then((result) => {
            let response = {isWalletGenerated : false};
            if(result.length == 1 && result[0].privateKey && result[0].address){
                response = {
                    isWalletGenerated : true,
                    address:result[0].address
                };
            }
            if(result.length == 0){
                return Promise.reject(responseMessage.ERROR.USER_NOT_PRESENT);
            }
            return universalFunction.sendSuccess(responseMessage.SUCCESS.SUCCESSFULLY_GET_DATA,response,res);
        }).catch((err) => {
            return universalFunction.sendError(err,res);
        })
    }
};

module.exports = wallet;