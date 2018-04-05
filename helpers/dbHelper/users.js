const User = require('./../../models/User.js');
const responseMessage = require('./../responseFunction.js');

let users = {
    saveData: (uuid,email, password, cb) => {
        let outputPromise = Promise.resolve()
            .then(() => {
                if (!uuid || typeof uuid != "string" || !(uuid == uuid.trim())) {
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                if (!email || typeof email != "string" || !(email == email.trim())) {
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                if (!password || typeof password != "string" || !(password == password.trim())) {
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                return new Promise((resolve, reject) => {
                    const user = new User({
                        uuid:uuid,
                        email: email,
                        password: password
                    });
                    user.save((err, result) => {
                        if (err) {
                            return reject(responseMessage.ERROR.ERROR_IN_QUERY);
                        } else {
                            return resolve(result);
                        }
                    })
                })
            });
        return cb && typeof cb === "function"
            ? outputPromise.resolve((result) => {
            return cb(null, result);
        }).catch((err) => {
            return cb(err, null);
        }) : outputPromise;
    },
    countData: (email,cb) => {
        let outputPromise = Promise.resolve()
            .then(() => {
                if (!email || typeof email != "string" || !(email == email.trim())) {
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                return new Promise((resolve, reject) => {
                    User.count({
                        email:email
                    }, (err, result) => {
                        if (err) {
                            return reject(err);
                        } else if (result > 0){
                            return reject(responseMessage.ERROR.USER_ALREADY_PRESENT);
                        } else{
                            return resolve(result);
                        }
                    })
                })
            });
        return cb && typeof cb === "function"
            ? outputPromise.resolve((result) => {
            return cb(null, result);
        }).catch((err) => {
            return cb(err, null);
        }) : outputPromise;
    },
    findOne: (data,project,cb) => {
        let outputPromise = Promise.resolve()
            .then(() => {
                if (!data || typeof data != "object") {
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                return new Promise((resolve, reject) => {
                    User.find(data,project,(err, result) => {
                        if (err) {
                            return reject(responseMessage.ERROR.ERROR_IN_QUERY);
                        } else {
                            return resolve(result);
                        }
                    })
                })
            });
        return cb && typeof cb === "function"
            ? outputPromise.resolve((result) => {
            return cb(null, result);
        }).catch((err) => {
            return cb(err, null);
        }) : outputPromise;
    },



};

module.exports = users;