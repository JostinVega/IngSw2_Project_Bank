/*var Usuario = require('../models/usuario');
var User = require('../models/user');
var createUser = require('../models/crearUsuario')
var saveQuestion = require('../models/preguntas-seguridad')
var saveAccount = require('../models/tipo-cuenta')

var controller = {*/
    /*inicio:function(req, res) {
        return res.status(201).send({message:"<h1>Hola</h1>"});
        return res.send()
    },*/
    /*saveUsuario:async function(req, res) {
        var user = new Usuario();
        var params = req.body;
        user.numero_identidad = params.numero_identidad;
        user.nombre_completo = params.nombre_completo;
        user.correo_electronico = params.correo_electronico;
        user.numero_telefono = params.numero_telefono;
        user.fecha_nacimiento = params.fecha_nacimiento;
        user.usuario = params.usuario;
        user.contrasena = params.contrasena;
        user.fecha_registro = params.fecha_registro;

        var usuarioStored = await user.save();

        return res.status(201).send({user:usuarioStored});
    },*//*
    getUsuarios:async function(req, res) {
        const usuarios = await Usuario.find({}).sort();
        return res.status(200).send({usuarios});
    },
    updateUsuario: async function(req, res) {
        var userId = req.params.id;
        var update = req.body;
        var usuarioUpdate = await Usuario.findByIdAndUpdate(userId, update, {new: true});
        return res.status(200).send({usuario:usuarioUpdate});
    },
    deleteUsuario: async function(req, res) {
        var userId = req.params.id;
        var usuarioRemove = await Usuario.findByIdAndDelete(userId);
        return res.status(200).send({usuario:usuarioRemove});
    },*/
    /*saveUser:async function(req, res) {
        
        var params = req.body;
        var _user = new user_();
        _user.numero_identidad = params.numero_identidad;
        _user.nombre_completo = params.nombre_completo;
        _user.correo_electronico = params.correo_electronico;
        _user.numero_telefono = params.numero_telefono;
        _user.fecha_nacimiento = params.fecha_nacimiento;


        var userStored = await _user.save();

        return res.status(201).send({user:userStored});
    },*/
    /*saveUser: async function(req, res) {
        try {
            var params = req.body;
            var newUser = new User({
                numero_identidad: params.numero_identidad,
                nombre_completo: params.nombre_completo,
                correo_electronico: params.correo_electronico,
                numero_telefono: params.numero_telefono,
                fecha_nacimiento: params.fecha_nacimiento
            });

            var userStored = await newUser.save();
            return res.status(201).send({ user: userStored });
        } catch (error) {
            return res.status(500).send({ message: 'Error al guardar el usuario', error });
        }
    },
    saveCredentials: async function(req, res) {
        var createUser_ = new createUser();
        var params = req.body;
        createUser_.username = params.username;
        createUser_.password = params.password;
        createUser_.confirmpassword = params.confirmpassword;

        var createUserStored = await createUser_.save();

        return res.status(201).send({User:createUserStored});
    },
    saveQuestions: async function(req, res) {
        var question = new saveQuestion();
        var params = req.body;
        question.question1 = params.question1;
        question.answer1 = params.answer1;
        question.question2 = params.question2;
        question.answer2 = params.answer2;
        question.question3 = params.question3;
        question.answer3 = params.answer3;
        question.question4 = params.question4;
        question.answer4 = params.answer4;
        question.question5 = params.question5;
        question.answer5 = params.answer5;

        var questionStored = await question.save();

        return res.status(201).send({preguntas:questionStored});
    },
    saveAccount: async function(req, res){
        var account = new saveAccount();
        var params = req.body;
        account.accountTypy = params.accountType;
        account.numeroCuenta = params.numeroCuenta;
        account.cuentaNombre = params.cuentaNombre;
        account.tipoCuenta = params.tipoCuenta;
    
        var accountStored = await account.save();
        return res.status(201).send({ cuenta: accountStored });
    }
    obtenerCedula: async function(req, res){
        
    }
    getUsuarios:async function(req, res) {
        const usuarios = await Usuario.find({}).sort();
        return res.status(200).send({usuarios});
    }
    
}



module.exports = controller;*/

var Usuario = require('../models/usuario');
var User = require('../models/user');
var createUser = require('../models/crearUsuario');
var saveQuestion = require('../models/preguntas-seguridad');
var saveAccount = require('../models/tipo-cuenta');
const usuario = require('../models/usuario');
var Contacto = require('../models/contacto');

var controller = {
    saveUsuario: async function(req, res) {
        try {
            var params = req.body;
            console.log('Datos recibidos para registrar:', params); // Log para verificar datos

            var user = new Usuario({
                numero_identidad: params.step1.numero_identidad,
                nombre_completo: params.step1.nombre_completo,
                correo_electronico: params.step1.correo_electronico,
                numero_telefono: params.step1.numero_telefono,
                fecha_nacimiento: params.step1.fecha_nacimiento,
                usuario: params.step3.username,
                contrasena: params.step3.password,
                question1: params.step4.question1,
                answer1: params.step4.answer1,
                question2: params.step4.question2,
                answer2: params.step4.answer2,
                question3: params.step4.question3,
                answer3: params.step4.answer3,
                question4: params.step4.question4,
                answer4: params.step4.answer4,
                question5: params.step4.question5,
                answer5: params.step4.answer5,
                accountType: params.step5.accountType,
                numeroCuenta: params.step5.numeroCuenta,
                cuentaNombre: params.step5.cuentaNombre,
                tipoCuenta: params.step5.tipoCuenta,
                fecha_registro: new Date()
            });

            var userStored = await user.save();

            var credencialUsuario = new User({
                numero_identidad: params.step1.numero_identidad,
                nombre_completo: params.step1.nombre_completo,
                correo_electronico: params.step1.correo_electronico,
                numero_telefono: params.step1.numero_telefono,
                fecha_nacimiento: params.step1.fecha_nacimiento
            });

            await credencialUsuario.save();

            var createUser_ = new createUser({
                numero_identidad: params.step1.numero_identidad,
                username: params.step3.username,
                password: params.step3.password,
                confirmpassword: params.step3.confirmPassword
            });

            await createUser_.save();

            var question = new saveQuestion({
                numero_identidad: params.step1.numero_identidad,
                question1: params.step4.question1,
                answer1: params.step4.answer1,
                question2: params.step4.question2,
                answer2: params.step4.answer2,
                question3: params.step4.question3,
                answer3: params.step4.answer3,
                question4: params.step4.question4,
                answer4: params.step4.answer4,
                question5: params.step4.question5,
                answer5: params.step4.answer5
            });

            await question.save();

            var account = new saveAccount({
                numero_identidad: params.step1.numero_identidad,
                accountType: params.step5.accountType,
                numeroCuenta: params.step5.numeroCuenta,
                cuentaNombre: params.step5.cuentaNombre,
                tipoCuenta: params.step5.tipoCuenta
            });

            await account.save();

            return res.status(201).send({ user: userStored, message: 'Usuario registrado con éxito' });
        } catch (error) {
            return res.status(500).send({ message: 'Error al registrar el usuario', error });
        }
    },
    getUsuarios:async function(req, res) {
        const usuarios = await Usuario.find({}).sort();
        return res.status(200).send({usuarios});
    },
    obtenerCedula: async function(req, res) {
        // Extrae numero_identidad de los parámetros de la solicitud
        const numero_identidad = req.params.numero_identidad;
        const user = req.params.usuario;

        try {
            // Busca el documento basado en numero_identidad
            const usuario = await Usuario.findOne({ usuario: user });

            // Verifica si se encontró el documento
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Retorna la información del usuario encontrado
            return res.status(200).json(usuario.numero_identidad);
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            return res.status(500).json({ message: 'Error al obtener el usuario' });
        }
    },
    /*obtenerUsuario: async function(req, res) {
        // Extrae numero_identidad de los parámetros de la solicitud
        const user = req.params.usuario;

        try {
            // Busca el documento basado en numero_identidad
            const usuario = await Usuario.findOne({ usuario: user });

            // Verifica si se encontró el documento
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Retorna la información del usuario encontrado
            return res.status(200).json(usuario.usuario, usuario.contrasena);
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            return res.status(500).json({ message: 'Error al obtener el usuario' });
        }
    }*/
        obtenerUsuario: async function(req, res) {
            // Extrae numero_identidad de los parámetros de la solicitud
            const user = req.params.usuario;
    
            try {
                // Busca el documento basado en numero_identidad
                const usuario = await Usuario.findOne({ usuario: user });
    
                // Verifica si se encontró el documento
                if (!usuario) {
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                }
    
                // Retorna la información del usuario encontrado
                return res.status(200).json({
                    usuario: usuario.usuario,
                    contrasena: usuario.contrasena
                });
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
                return res.status(500).json({ message: 'Error al obtener el usuario' });
            }
        },
        /*obtenerCuentas: async function(req, res) {
            try {
              const numeroIdentidad = req.params.numero_identidad; // Obtener el parámetro de ruta
              if (!numeroIdentidad) {
                return res.status(400).send('Numero de identidad parameter is required');
              }
              
              const cuentas = await saveAccount.find({ numero_identidad: numeroIdentidad });
              if (!cuentas.length) {
                return res.status(404).send('No accounts found for this numero de identidad');
              }
              
              res.json({ cuentas });
            } catch (error) {
              console.error('Error fetching accounts:', error);
              res.status(500).send('Internal server error');
            }
          }*/
            obtenerCuentas: async function(req, res) {
                try {
                    const username = req.params.username;
                    if (!username) {
                        return res.status(400).send('Username parameter is required');
                    }
        
                    const usuario = await Usuario.findOne({ usuario: username });
                    if (!usuario) {
                        return res.status(404).send('Usuario no encontrado');
                    }
        
                    const cuentas = await saveAccount.find({ numero_identidad: usuario.numero_identidad });
                    if (!cuentas.length) {
                        return res.status(404).send('No accounts found for this username');
                    }
        
                    res.json({ cuentas });
                } catch (error) {
                    console.error('Error fetching accounts:', error);
                    res.status(500).send('Internal server error');
                }
            },
            agregarContacto: async function(req, res) {
                try {
                    var params = req.body;
                    console.log('Datos recibidos para agregar contacto:', params); // Log para verificar datos
        
                    var contacto = new Contacto({
                        numero_identidad: params.numero_identidad,
                        nombre: params.nombre,
                        numeroCuenta: params.numeroCuenta
                    });
        
                    var contactoGuardado = await contacto.save();
        
                    return res.status(201).send({ contacto: contactoGuardado, message: 'Contacto agregado con éxito' });
                } catch (error) {
                    console.error('Error al agregar contacto:', error);
                    return res.status(500).send({ message: 'Error al agregar contacto', error });
                }
            },
            checkAccountExists: async function(req, res) {
                try {
                    var numeroCuenta = req.params.numeroCuenta;
        
                    const cuenta = await saveAccount.findOne({ numeroCuenta: numeroCuenta });
        
                    if (cuenta) {
                        return res.status(200).send({ exists: true, cuenta });
                    } else {
                        return res.status(404).send({ exists: false, message: 'Cuenta no encontrada' });
                    }
                } catch (error) {
                    console.error('Error al verificar la cuenta:', error);
                    return res.status(500).send({ message: 'Error al verificar la cuenta', error });
                }
            },
            getContactos: async function(req, res) {
                try {
                    var numero_identidad = req.params.numero_identidad;
        
                    const contactos = await Contacto.find({ numero_identidad: numero_identidad });
        
                    if (contactos.length) {
                        return res.status(200).send({ contactos });
                    } else {
                        return res.status(404).send({ message: 'No se encontraron contactos para este número de identidad' });
                    }
                } catch (error) {
                    console.error('Error al obtener los contactos:', error);
                    return res.status(500).send({ message: 'Error al obtener los contactos', error });
                }
            }
};

module.exports = controller;

/*var Usuario = require('../models/usuario');
var createUser = require('../models/crearUsuario');
var saveQuestion = require('../models/preguntas-seguridad');
var saveAccount = require('../models/tipo-cuenta');

var controller = {
    saveUsuario: async function(req, res) {
        try {
            var params = req.body;
            console.log('Datos recibidos para registrar:', params); // Log para verificar datos

            var user = new Usuario({
                numero_identidad: params.numero_identidad,
                nombre_completo: params.nombre_completo,
                correo_electronico: params.correo_electronico,
                numero_telefono: params.numero_telefono,
                fecha_nacimiento: params.fecha_nacimiento,
                usuario: params.usuario,
                contrasena: params.contrasena,
                question1: params.question1,
                answer1: params.answer1,
                question2: params.question2,
                answer2: params.answer2,
                question3: params.question3,
                answer3: params.answer3,
                question4: params.question4,
                answer4: params.answer4,
                question5: params.question5,
                answer5: params.answer5,
                numeroCuenta: params.numeroCuenta,
                cuentaNombre: params.cuentaNombre,
                tipoCuenta: params.tipoCuenta,
                fecha_registro: new Date()
            });

            var userStored = await user.save();

            var createUser_ = new createUser({
                username: params.usuario, // Asegúrate de usar el campo correcto para el nombre de usuario
                password: params.contrasena, // Asegúrate de usar el campo correcto para la contraseña
                confirmpassword: params.confirmpassword
            });

            await createUser_.save();

            var question = new saveQuestion({
                username: params.usuario,
                question1: params.question1,
                answer1: params.answer1,
                question2: params.question2,
                answer2: params.answer2,
                question3: params.question3,
                answer3: params.answer3,
                question4: params.question4,
                answer4: params.answer4,
                question5: params.question5,
                answer5: params.answer5
            });

            await question.save();

            var account = new saveAccount({
                username: params.usuario,
                accountType: params.accountType,
                numeroCuenta: params.numeroCuenta,
                cuentaNombre: params.cuentaNombre,
                tipoCuenta: params.tipoCuenta
            });

            await account.save();

            return res.status(201).send({ user: userStored, message: 'Usuario registrado con éxito' });
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            return res.status(500).send({ message: 'Error al registrar el usuario', error });
        }
    }
};

module.exports = controller;*/
