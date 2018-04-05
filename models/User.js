var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    uuid:{type:String,required:true,unique:true},
    email: { type: String,required:true,unique:true},
    password: {type:String}
},{ strict : false });

var User = mongoose.model('User', userSchema);

module.exports = User;
