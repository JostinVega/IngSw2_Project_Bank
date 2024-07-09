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
    fecha_registro: String
});

module.exports=mongoose.model('usuario', UsuarioSchema);
