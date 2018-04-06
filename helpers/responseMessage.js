'use strict';
exports.ERROR = {
    ERROR_IN_QUERY : {
        statusCode:500,
        customMessage : 'Error in query',
        type : 'BAD_REQUEST'
    },
    USER_NOT_PRESENT : {
        statusCode:400,
        customMessage : 'User is not present',
        type : 'BAD_REQUEST'
    },
    ERROR_IN_SIGNUP:{
        statusCode:400,
        customMessage:"There is some error in signup",
        type:"ERROR_IN_SIGNUP"
    },
    PROVIDE_VALID_DATA:{
        statusCode:400,
        customMessage:"Please provide valid data",
        type:"ERROR_IN_DATA"
    },
    USER_ALREADY_PRESENT:{
        statusCode:400,
        customMessage:"please provide new email id",
        type:"ERROR_IN_DATA"
    },
    PASSWORD_NOT_MATCH:{
        statusCode:400,
        customMessage:"Please provide valid password",
        type:"PASSWORD_NOT_MATCH"
    },
    OTP_NOT_MATCH:{
        statusCode:400,
        customMessage:"Please provide valid otp",
        type:"PASSWORD_NOT_MATCH"
    },
    TOKEN_NOT_VALID:{
        statusCode:400,
        customMessage:"Please provide valid token",
        type:"PASSWORD_NOT_MATCH"
    },
    TOKEN_EXPIRE:{
        statusCode:400,
        customMessage:"Token is expire",
        type:"TOKEN_EXPIRE"
    }
};



exports.SUCCESS = {
    SUCCESSFULLY_GET_DATA : {
        statusCode: 200,
        customMessage: 'Successfully get data',
        type: 'SUCCESSFULLY_GET_DATA'
    },
    SUCCESSFULLY_SIGNUP : {
        statusCode: 201,
        customMessage: 'Successfully signup',
        type: 'SUCCESSFULLY_SIGNUP'
    },
    SUCCESSFULLY_AUTHENTICATE_DATA : {
        statusCode: 200,
        customMessage: 'Successfully authenticate data',
        type: 'SUCCESSFULLY_AUTHENTICATE'
    },
};