var express = require('express');
var router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// Update cambiarContraseña
router.put('/actualizarContrasena/:numero_identidad', usuarioController.updateContrasena);
router.get('/obtenerUsuario/:usuario', usuarioController.getUsuario);

module.exports = router;
