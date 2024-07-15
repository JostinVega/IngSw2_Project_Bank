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

//contactos: agregar nuevo contacto
router.post('/nuevo-contacto', bancoController.agregarContacto);
//Ver contactos apartir del número de identidad
router.get('/ver-contacto/:numero_identidad', bancoController.getContactos);
// Verificar si existe una cuenta a partir del número de identidad
router.get('/verificarCuenta/:numeroCuenta', bancoController.checkAccountExists);

//Actualizar cuenta a partir del número de cuenta
router.put('/cuenta/actualizar-saldo/:numeroCuenta', bancoController.updateAccount);
//Obtener cuenta a partir del número de cuenta
router.get('/cuenta/:numeroCuenta', bancoController.getAccountByNumeroCuenta),

//Guardar transferencia
router.post('/transferencias', bancoController.saveTransfer);

//Guardar Comprobante
router.post('/comprobantes', bancoController.saveComprobante);

//Agregar cuentas
router.post('/nueva-cuenta', bancoController.saveAccount);

// Obtener cuentas a partir del número de cédula
router.get('/credenciales-usuario/:numero_identidad', bancoController.getCredencialesUsuarioByNumeroIdentidad);

// Obtener preguntas y respuesta apartir de la cédula
router.get('/usuario/:numero_identidad', bancoController.getUsuarioByNumeroIdentidad);

// Obtener pregunta a partir de value
router.get('/label/:value', bancoController.getLabelByValue);

// Definición de la ruta para actualizar la contraseña sin encriptación
router.put('/update-password/:numero_identidad', bancoController.updatePasswordByNumeroIdentidad1);

// Definición de la ruta para actualizar la contraseña con encriptación
router.put('/actualizar-password/:numero_identidad', bancoController.updatePasswordByNumeroIdentidad2);


//CAMBIAR CONTRASEÑA (SIN CIFRAR)

router.put('/actualizar-contrasena/:numero_identidad', bancoController.easy);

router.put('/update-contrasena/:numero_identidad', bancoController.peasy);



module.exports = router;
