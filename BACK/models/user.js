const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  numeroIdentidad: { type: String, required: true },
  nombre_completo: { type: String, required: true },
  correo_electronico: { type: String, required: true },
  numero_telefono: { type: String, required: true },
  fecha_nacimiento: { type: String, required: true },
  estado: { type: String, default: 'Activo' },
  administrador: { type: Boolean, default: false }
});

module.exports = mongoose.model('nuevo-usuario', userSchema);
