const Usuario = require('../models/user');
const Cuenta = require('../models/cuenta');
const { sendSecurityCode, sendTempBlock } = require('../send_notifications.js');

let securityCode = '';
let attempts = 0;

const controller = {
    getUsuario: async function (req, res) {
        try {
            const usuario_id = req.params.numero_identidad;
            if (!usuario_id) return res.status(404).send({ message: 'El usuario no existe' });

            const usuario = await Usuario.findOne({ numero_identidad: usuario_id });
            if (!usuario) return res.status(404).send({ message: 'El usuario no existe' });

            return res.status(200).send({
                usuario_id: usuario.numero_identidad,
                numero_telefono: usuario.numero_telefono,
                correo_electronico: usuario.correo_electronico
            });
        } catch (error) {
            return res.status(500).send({ message: 'Error al recuperar los datos' });
        }
    },

    sendSecurityCode: async function (req, res) {
        try {
            const { numero_identidad } = req.body;
            const user = await Usuario.findOne({ numero_identidad });

            if (!user) {
                return res.status(404).send({ status: 'error', message: 'Usuario no encontrado.' });
            }

            securityCode = await sendSecurityCode(user.correo_electronico, user.numero_telefono);
            attempts = 0;

            return res.status(200).send({ status: 'success', message: 'Código de seguridad enviado.' });
        } catch (error) {
            return res.status(500).send({ status: 'error', message: 'Error al enviar el código de seguridad.' });
        }
    },

    verifySecurityCode: async function (req, res) {
        try {
            const { numero_identidad, enteredCode } = req.body;
            const user = await Usuario.findOne({ numero_identidad });

            if (!user) {
                return res.status(404).send({ status: 'error', message: 'Usuario no encontrado.' });
            }

            if (securityCode === enteredCode) {
                securityCode = '';
                attempts = 0;
                return res.status(200).send({ status: 'success', message: 'Código de seguridad verificado correctamente.' });
            }

            attempts++;

            if (attempts >= 3) {
                await Cuenta.updateOne(
                    { numero_identidad },
                    { $set: { estado: 'blocked' } }
                );

                await sendTempBlock(user.correo_electronico, user.numero_telefono);
                return res.status(403).send({ status: 'error', message: 'Cuenta bloqueada temporalmente.' });
            }

            return res.status(403).send({ status: 'error', message: 'Código de seguridad incorrecto.' });
        } catch (error) {
            return res.status(500).send({ status: 'error', message: 'Error al verificar el código de seguridad.' });
        }
    }
};

module.exports = controller;