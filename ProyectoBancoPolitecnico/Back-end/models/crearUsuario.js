var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newUserSchema = Schema({
    username: String,
    password: String,
    confirmpassword: String,

});

module.exports=mongoose.model('newUser', newUserSchema);
