const User = require('./../../models/User.js');
const responseMessage = require('./../responseFunction.js');

let users = {
    saveData: (email, password, cb) => {
        let outputPromise = Promise.resolve()
            .then(() => {
                if (!email || typeof email != "string" || !(email == email.trim())) {
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                if (!password || typeof password != "string" || !(password == password.trim())) {
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                return new Promise((resolve, reject) => {
                    const user = new User({
                        email: email,
                        password: password
                    });
                    user.save((err, result) => {
                        if (err) {
                            return reject(err);
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
    }
};

module.exports = users;