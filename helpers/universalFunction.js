/**
 * @author Ankit
 * @sync
 * @description send error response for request
 * @param {object} err - error message object
 * @param {object} res - response object
 */

exports.sendError = function (err,res) {
    const errorMessage = err.customMessage;
    if (typeof err == 'object' && err.hasOwnProperty('statusCode') && err.hasOwnProperty('customMessage')) {
        return res.status(err.statusCode).send({statusCode: err.statusCode, message: errorMessage,isSuccess:err.isSuccess, type: err.type || ERROR.eng.DEFAULT.type });
    }
    else {
        return res.status(400).send({statusCode: 400 , message: errorMessage, isSuccess:err.isSuccess,type: err.type || ERROR.eng.DEFAULT.type });
    }
};

/**
 * @author Ankit
 * @sync
 * @description send success response for request
 * @param {object} successMsg - success message object
 * @param {object} data - data object
 * @param {object} res - response object
 */

exports.sendSuccess = function (successMsg, data, res) {
    const message = successMsg.customMessage;
    if (typeof successMsg == 'object' && successMsg.hasOwnProperty('statusCode') && successMsg.hasOwnProperty('customMessage')) {
        return res.status(successMsg.statusCode).send({statusCode:successMsg.statusCode, message: message,isSuccess:successMsg.isSuccess, data: data || {}});
    }else {
        return res.status(200).send({statusCode:200, message: message, isSuccess:successMsg.isSuccess,data: data || {}});

    }
};