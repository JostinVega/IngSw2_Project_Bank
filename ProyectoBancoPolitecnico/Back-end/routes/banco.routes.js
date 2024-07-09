var express = require('express');
var router = express.Router();
var bancoController = require('../controllers/banco.controller');

/*router.get('/inicio', bancoController.inicio);
router.post('/nuevo-usuario', bancoController.saveUsuario);
router.get('/usuarios', bancoController.getUsuarios);
router.put('/usuario/:id', bancoController.updateUsuario);
router.delete('/usuario/:id', bancoController. deleteUsuario);*/

router.post('/nuevo-user', bancoController.saveUser);
router.post('/crear-usuario', bancoController.saveCredentials);
router.post('/preguntas-seguridad', bancoController.saveQuestions);
router.post('/tipo-cuenta', bancoController.saveAccount);

module.exports = router;