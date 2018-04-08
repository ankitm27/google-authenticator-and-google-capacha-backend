const ethers = require('ethers');
const crypto = require('crypto');

const responseMessage = require('./responseMessage.js');
const usersDb = require('./dbHelper/users.js');

let Wallet = ethers.Wallet;

/**
 * @author Ankit
 * @sync
 * @description encrypt the text
 * @param {string} text
 */

let encryptData = (text) => {
    let cipher = crypto.createCipher(process.env.ENCRYPTION_ALGORITHIM, process.env.ENCRYPTION_PASSWORD);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

let wallet = {
    /**
     * @author Ankit
     * @async
     * @description generate ether wallet if not present other wise return from db, returns promise if callback is not provided
     * @param {string} uuid
     */

    generateWallet: (uuid, cb) => {
        let outputPromise = Promise.resolve()
            .then(() => {
                if (!uuid || typeof uuid != "string" || !(uuid == uuid.trim())) {
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                return new Promise((resolve, reject) => {
                    const wallet = Wallet.createRandom();
                    usersDb.findAndUpdateData({uuid: uuid},
                        {privateKey: encryptData(wallet.privateKey), address: wallet.address})
                        .then((result) => {
                            return resolve(result.address);
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
    }
};

module.exports = wallet;
