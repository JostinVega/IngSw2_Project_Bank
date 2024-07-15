const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

var controller = {
    updateContrasena: async function (req, res) {
        try {
            var numeroIdentidad = req.params.numero_identidad;
            var { contrasena_actual, nueva_contrasena } = req.body;

            // Verificar si la nueva contraseña está presente
            if (!nueva_contrasena) {
                return res.status(400).send({ message: 'La nueva contraseña es requerida' });
            }

            // Validar que el parámetro numero_identidad está presente
            if (!numeroIdentidad) {
                return res.status(400).send({ message: 'El número de identidad es requerido' });
            }

            console.log(`Número de Identidad: ${numeroIdentidad}`);
            console.log(`Nueva Contraseña: ${nueva_contrasena}`);

            // Buscar el usuario por número de identidad
            const usuario = await Usuario.findOne({ numero_identidad: numeroIdentidad });

            // Verificar si el usuario existe
            if (!usuario) {
                return res.status(404).send({ message: 'Usuario no encontrado' });
            }

            // Verificar la contraseña actual
            const validPassword = await bcrypt.compare(contrasena_actual, usuario.contrasena);
            if (!validPassword) {
                return res.status(401).send({ message: 'Contraseña actual incorrecta' });
            }

            // Encriptar la nueva contraseña
            const hashedPassword = await bcrypt.hash(nueva_contrasena, 10);
            console.log(`Hashed Password: ${hashedPassword}`);

            // Actualizar el usuario con la nueva contraseña encriptada
            usuario.contrasena = hashedPassword;
            await usuario.save();

            console.log(`Usuario Actualizado: ${JSON.stringify(usuario)}`);
            return res.status(200).send({ usuario: usuario });
        } catch (error) {
            console.error('Error en el try/catch:', error);
            return res.status(500).send({ message: 'Error al actualizar la contraseña', error: error.message });
        }
    },

    // Método para obtener un usuario por su ID
    getUsuario: async function(req, res) {
        // Extrae numero_identidad de los parámetros de la solicitud
        const user = req.params.usuario;
        console.log(user);
        try {
            // Busca el documento basado en numero_identidad
            const usuario = await Usuario.findOne({ usuario: user });

            // Verifica si se encontró el documento
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Retorna la información del usuario encontrado
            return res.status(200).send({
                usuario: usuario.usuario,
                contrasena: usuario.contrasena
            });
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            return res.status(500).json({ message: 'Error al obtener el usuario' });
        }
    }
}

module.exports = controller;
