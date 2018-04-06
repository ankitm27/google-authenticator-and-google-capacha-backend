var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    uuid:{type:String,required:true,unique:true},
    email: { type: String,required:true,unique:true},
    password: {type:String},
    privateKey:{type:String},
    address:{type:String},
    secret:{type:String,required:true},
    token:{type:String}
},{ strict : false });

var User = mongoose.model('User', userSchema);

module.exports = User;
