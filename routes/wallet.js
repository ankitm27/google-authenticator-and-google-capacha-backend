const express = require('express');
let router = express.Router();

const wallet = require('./../controllers/wallet.js');
const walletValidator = require("./../validator/wallet.js");

router.post('/generate/etherwallet', walletValidator.etherWallet,wallet.etherWallet);


module.exports = router;