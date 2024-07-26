var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    numeroIdentidad: String,
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
    saldo: { type: String, default: '100.00' },
    estado: { type: String, default: 'Activo' },
    administrador: { type: Boolean, default: false }
});

module.exports=mongoose.model('registro-usuario', UsuarioSchema);
