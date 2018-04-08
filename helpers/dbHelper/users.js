const User = require('./../../models/User.js');
const responseMessage = require('./../responseMessage.js');

let users = {
    /**
     * @author Ankit
     * @async
     * @description save new object into db, returns promise if callback is not provided
     * @param {string} uuid
     * @param {string} email
     * @param {string} password
     * @param {string} secret
     */
    saveData: (uuid, email, password,secret, cb) => {
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
                if (!secret || typeof secret != "string" || !(secret == secret.trim())) {
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                return new Promise((resolve, reject) => {
                    const user = new User({
                        uuid: uuid,
                        email: email,
                        password: password,
                        secret:secret
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
    /**
     * @author Ankit
     * @async
     * @description count number of objects from db, returns promise if callback is not provided
     * @param {string} email
     */
    countData: (email, cb) => {
        let outputPromise = Promise.resolve()
            .then(() => {
                if (!email || typeof email != "string" || !(email == email.trim())) {
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                return new Promise((resolve, reject) => {
                    User.count({
                        email: email
                    }, (err, result) => {
                        if (err) {
                            return reject(err);
                        } else if (result > 0) {
                            return reject(responseMessage.ERROR.USER_ALREADY_PRESENT);
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
    /**
     * @author Ankit
     * @async
     * @description find one object from database,returns promise if callback is not provided
     * @param {object} data - query parameter
     * @param {project} project - projection field
     */
    findOne: (data, project, cb) => {
        let outputPromise = Promise.resolve()
            .then(() => {
                if (!data || typeof data != "object") {
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                if (!project || typeof project != "object") {
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                return new Promise((resolve, reject) => {
                    User.find(data, project, (err, result) => {
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
    /**
     * @author Ankit
     * @async
     * @description find object and update the value, returns promise if callback is not provided
     * @param {query} query - query parameter
     * @param {data} data - data which should be updated
     */
    findAndUpdateData: (query, data, cb) => {
        let outputPromise = Promise.resolve()
            .then(() => {
                if (!query || typeof query != "object") {
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                if (!data || typeof data != "object") {
                    return Promise.reject(responseMessage.ERROR.PROVIDE_VALID_DATA);
                }
                return new Promise((resolve, reject) => {
                    User.findOneAndUpdate(query, data, {new: 1}, (err, result) => {
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
    }


};

module.exports = users;