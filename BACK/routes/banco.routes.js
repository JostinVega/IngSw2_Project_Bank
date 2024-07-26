var express = require('express');
var router = express.Router();
var bancoController = require('../controllers/banco.controller');
const authController = require('../controllers/auth.controller');
var Usuario = require('../models/usuario');
var Cuenta = require('../models/tipo-cuenta');
const codigosController = require('../controllers/codigos.controller');
var notificacionesController = require('../controllers/notificaciones.controller');

// Definición de rutas
router.post('/nuevo-usuario', bancoController.saveUsuario);
router.get('/usuarios', bancoController.getUsuarios);
router.get('/obtenerInfoUsuario/:usuario', bancoController.obtenerCedula);

// Eliminada la duplicación de obtenerUsuario con GET
router.get('/obtenerUsuario/:usuario', bancoController.obtenerUsuario);

router.get('/obtenerInformacionUsuario/:usuario', bancoController.getUsuarioByUsuario);

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
//router.post('/nueva-cuentaa', bancoController.savEAccount);

// Obtener cuentas a partir del número de cédula
router.get('/credenciales-usuario/:numeroIdentidad', bancoController.getCredencialesUsuarioByNumeroIdentidad);

// Obtener preguntas y respuesta apartir de la cédula
router.get('/usuario/:numeroIdentidad', bancoController.getUsuarioByNumeroIdentidad);

// Obtener pregunta a partir de value
router.get('/label/:value', bancoController.getLabelByValue);

// Definición de la ruta para actualizar la contraseña sin encriptación
router.put('/update-password/:numero_identidad', bancoController.updatePasswordByNumeroIdentidad1);

// Definición de la ruta para actualizar la contraseña con encriptación
router.put('/actualizar-password/:numero_identidad', bancoController.updatePasswordByNumeroIdentidad2);

router.get('/nombre-completo/:usuario', bancoController.getNombreCompleto);

router.get('/getNumeroCuenta/:cuentaNombre', bancoController.getNumeroCuenta);

router.get('/getTransferenciaByCuentaOrigen/:numeroCuenta', bancoController.getTransferenciaByCuentaOrigen);

router.get('/getTipoCuentaByNumeroCuenta/:numeroCuenta', bancoController.getTipoCuentaByNumeroCuenta);

router.put('/updateIsFavoriteByNumeroCuenta/:numeroCuenta', bancoController.updateIsFavoriteByNumeroCuenta);

router.delete('/deleteContactoByNumeroCuenta/:numeroCuenta', bancoController.deleteContactoByNumeroCuenta);

router.get('/contactoExistePorNombre/:nombre', bancoController.contactoExistePorNombre);

router.get('/contactoExistePorNumeroCuenta/:numeroCuenta', bancoController.contactoExistePorNumeroCuenta);

//obtener información del usario usando el número de cédula
router.get('/getUsuarioByNumeroIdentidad/:numeroIdentidad', bancoController.getUsuarioByNumeroIdentidad);

router.get('/transferencias/:numero_cuenta', bancoController.getTransferenciasPorNumeroCuenta);

router.get('/getNumeroCuentabyCuentaNombre/:cuentaNombre', bancoController.getNumeroCuentaByCuentaNombre);

router.get('/getUsuarioByNumeroIdentidadRegistro/:numeroIdentidad', bancoController.getUsuarioByNumeroIdentidadRegistro);
router.get('/getUsuarioByCorreoElectronico/:correoElectronico', bancoController.getUsuarioByCorreoElectronico);
router.get('/getUsuarioByNumeroTelefono/:numeroTelefono', bancoController.getUsuarioByNumeroTelefono);
router.get('/getUsuarioByNombreUsuario/:usuario', bancoController.getUsuarioByNombreUsuario);
router.get('/getUsuarioByUsuarioRegistro/:usuario', bancoController.getUsuarioByUsuarioRegistro);

router.put('/actualizar-informacion/:numeroIdentidad', bancoController.updatePersonalInfo);

router.put('/update-usuario/:numeroIdentidad', bancoController.updateUsuario);

router.delete('/eliminar-usuario/:numero_identidad', bancoController.eliminarUsuarioYDatosAsociados);

router.get('/admin/usuarios', bancoController.obtenerTodosLosUsuarios);

router.get('/admin/cuentas', bancoController.obtenerTodasLasCuentas);

router.put('/actualizar-admin-estado/:numeroIdentidad', bancoController.actualizarAdminYEstado);

router.get('/usuario-con-cuentas/:numeroIdentidad', bancoController.getUsuarioConCuentasPorNumeroIdentidad);

router.get('/obtenerCuentaByNumeroIdentidad/:numeroCuenta', bancoController.obtenerInformacionCuentaPorNumeroCuenta);

//router.get('/obtenerUsuarioByNumeroIdentidadAdministrador/:numeroIdentidad', bancoController.obtenerInformacionUsuarioByNumeroIdentidadAdministrador);

// Ruta para obtener cuentas por número de cédula
router.get('/byCedula/:cedula', bancoController.getAccountsByCedula);

router.get('/idCuenta/:numeroCuenta', bancoController.getIdCuenta);
router.get('/nombreCompleto/:numeroIdentidad', bancoController.getNombreCompletoContacto);

router.put('/actualizar-usuario/:numeroIdentidad', bancoController.updateUsuario);

// Rutas para enviar y verificar códigos
router.post('/send-code', codigosController.enviarCodigo);
router.post('/verify-code', codigosController.verificarCodigo);

// Definición de la ruta para enviar notificaciones
router.post('/send-confirmation', notificacionesController.sendNotification);

//CAMBIAR CONTRASEÑA (SIN CIFRAR)

router.put('/actualizar-contrasena/:numeroIdentidad', bancoController.easy);

router.put('/update-contrasena/:numeroIdentidad', bancoController.peasy);

router.post('/nuevaCuenta', async (req, res) => {
    try {
      const { numeroCuenta, cuentaNombre, tipoCuenta, numeroIdentidad, saldo } = req.body;
  
      if (!numeroIdentidad  || !numeroCuenta || !cuentaNombre || !tipoCuenta || !saldo) {
        return res.status(400).json({ message: 'Invalid data' });
      }
  
      const newCuenta = new Cuenta({
        numeroIdentidad,
        numeroCuenta,
        cuentaNombre,
        tipoCuenta,
        saldo
      });
  
      await newCuenta.save();
  
      res.status(201).json({
        message: 'Cuenta creada exitosamente',
        cuenta: newCuenta
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Nuevo endpoint para obtener información del usuario por número de identidad
  router.get('/userinfo/:numeroIdentidad', async (req, res) => {
    try {
      const { numeroIdentidad } = req.params;
      const user = await Usuario.findOne({ numeroIdentidad });

      if (user) {
        res.json(user);
      } else {
        res.status(404).send('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      res.status(500).send('Error interno del servidor');
    }
  });


  // Ruta para bloquear al usuario
  router.put('/bloquear-usuario', async (req, res) => {
    const { usuario } = req.body;
    try {
      const user = await Usuario.findOne({ usuario });
      if (user) {
        user.estado = 'Bloqueado';
        await user.save();
        res.status(200).send({ message: 'Usuario bloqueado correctamente.' });
      } else {
        res.status(404).send({ message: 'Usuario no encontrado.' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error al bloquear el usuario.', error });
    }
  });

  // Ruta para bloquear al usuario por número de identidad
  router.put('/bloquear-usuario-por-identidad', async (req, res) => {
    const { numeroIdentidad } = req.body;
    try {
      const user = await Usuario.findOne({ numeroIdentidad });
      if (user) {
        user.estado = 'Bloqueado';
        await user.save();
        res.status(200).send({ message: 'Usuario bloqueado correctamente.' });
      } else {
        res.status(404).send({ message: 'Usuario no encontrado.' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error al bloquear el usuario.', error });
    }
  });

  // Ruta para verificar reCAPTCHA
  router.post('/verify-recaptcha', async (req, res) => {
    const { response } = req.body;
    const secretKey = '6LctuxkqAAAAALPAC1fvuJc8drJpOau5kx66zn2p';

    try {
      const verificationResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
        params: {
          secret: secretKey,
          response: response,
        },
      });

      res.json(verificationResponse.data);
    } catch (error) {
      res.status(500).json({ error: 'Error verifying reCAPTCHA' });
    }
  });

module.exports = router;
