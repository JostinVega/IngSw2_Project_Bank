const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  numero_identidad: { type: String, required: true },
  nombre_completo: { type: String, required: true },
  correo_electronico: { type: String, required: true },
  numero_telefono: { type: String, required: true },
  fecha_nacimiento: { type: String, required: true }
});

module.exports = mongoose.model('nuevo-usuario', userSchema);
