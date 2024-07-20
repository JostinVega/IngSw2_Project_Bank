var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    numero_identidad: String,
    nombre_completo: String,
    correo_electronico: String,
    numero_telefono: String,
    fecha_nacimiento: String,
    usuario: String,
    contrasena: String,
    question1: String,
    answer1: String,
    question2: String,
    answer2: String,
    question3: String,
    answer3: String,
    question4: String,
    answer4: String,
    question5: String,
    answer5: String,
    numeroCuenta: String,
    cuentaNombre: String,
    tipoCuenta: String,
});

module.exports=mongoose.model('registro-usuario', UsuarioSchema);
