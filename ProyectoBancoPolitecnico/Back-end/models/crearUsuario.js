var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newUserSchema = Schema({
    numero_identidad: String,
    username: String,
    password: String,
    confirmpassword: String,

});

module.exports=mongoose.model('credenciales-usuario', newUserSchema);
