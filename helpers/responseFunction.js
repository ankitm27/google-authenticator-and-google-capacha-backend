'use strict';
exports.ERROR = {
    ERROR_IN_QUERY : {
        statusCode:500,
        customMessage : 'Error in query',
        type : 'BAD_REQUEST'
    },
    DATA_NOT_PRESENT : {
        statusCode:400,
        customMessage : 'Data is not present',
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
    }
};



exports.SUCCESS = {
    SUCCESSFULLY_GET_DATA : {
        statusCode: 200,
        customMessage: 'Successfully get data',
        type: 'SUCCESSFULLY_GET_DATA'
    },
    SUCCESSFULLY_SIGNUP : {
        statusCode: 200,
        customMessage: 'Successfully signup',
        type: 'SUCCESSFULLY_SIGNUP'
    },
};