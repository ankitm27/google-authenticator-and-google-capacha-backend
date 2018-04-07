const express = require('express');
let router = express.Router();

const users = require('./../controllers/users.js');
const userValidator = require('./../validator/users.js');
const tokenValidator = require('./../validator/tokenValidator.js');
const userHelper = require('./../helpers/users.js');

router.post('/signup', userValidator.signUp,users.signUp);
router.post('/authenticateemailpassword',userValidator.authenticateEmailPassword,users.authenticateEmailPassword);
router.post('/login',userValidator.login,userValidator.validatesToKen,users.login);


module.exports = router;
