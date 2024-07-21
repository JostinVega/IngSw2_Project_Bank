var express = require('express');
var router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

async function obtenerUsuario(req, res, next) {
    const usuario = await Usuario.findOne({ numero_identidad: req.params.numero_identidad });
    if (!usuario) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    req.usuario = usuario;
    next();
}

// Update cambiarContraseña
router.put('/actualizarContrasena/:numero_identidad',  obtenerUsuario, usuarioController.updateContrasena);
router.get('/obtenerUsuario/:usuario', usuarioController.getUsuario);
router.post('/verifySecurityCode', obtenerUsuario, usuarioController.verifySecurityCode);


module.exports = router;
