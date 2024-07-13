var express = require('express');
var router = express.Router();
var bancoController = require('../controllers/banco.controller');
const authController = require('../controllers/auth.controller');
var Usuario = require('../models/usuario');

// Definición de rutas
router.post('/nuevo-usuario', bancoController.saveUsuario);
router.get('/usuarios', bancoController.getUsuarios);
router.get('/obtenerInfoUsuario/:usuario', bancoController.obtenerCedula);

// Eliminada la duplicación de obtenerUsuario con GET
router.get('/obtenerUsuario/:usuario', bancoController.obtenerUsuario);
//router.get('/obtenerCuentas/:usuario', bancoController.obtenerCuentas);
router.get('/usuarios/:username', bancoController.obtenerCuentas);

// Ruta GET para obtener las cuentas de un usuario por nombre de usuario

router.post('/login', authController.login);

//contactos: agregar nuevo contacto, ver contactos, verificar si existe cuenta
router.post('/nuevo-contacto', bancoController.agregarContacto);
router.get('/ver-contacto/:numero_identidad', bancoController.getContactos);
router.get('/verificarCuenta/:numeroCuenta', bancoController.checkAccountExists);

module.exports = router;
