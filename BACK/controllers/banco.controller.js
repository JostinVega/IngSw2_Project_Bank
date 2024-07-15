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
const bcrypt = require('bcrypt');
var Usuario = require('../models/usuario');
var User = require('../models/user');
var createUser = require('../models/crearUsuario');
var saveQuestion = require('../models/preguntas-seguridad');
var saveAccount = require('../models/tipo-cuenta');
const usuario = require('../models/usuario');
var Contacto = require('../models/contacto');
var Transferencia = require('../models/tranferencias');
var ComprobanteTransferencia = require('../models/componenteTranferencia');
var SecurityQuestion = require('../models/preguntas');

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

            return res.status(201).send({ user: userStored, message: 'Usuario registrado con Ã©xito' });
        } catch (error) {
            return res.status(500).send({ message: 'Error al registrar el usuario', error });
        }
    },
    getUsuarios:async function(req, res) {
        const usuarios = await Usuario.find({}).sort();
        return res.status(200).send({usuarios});
    },
    obtenerCedula: async function(req, res) {
        // Extrae numero_identidad de los parÃ¡metros de la solicitud
        const numero_identidad = req.params.numero_identidad;
        const user = req.params.usuario;

        try {
            // Busca el documento basado en numero_identidad
            const usuario = await Usuario.findOne({ usuario: user });

            // Verifica si se encontrÃ³ el documento
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Retorna la informaciÃ³n del usuario encontrado
            return res.status(200).json(usuario.numero_identidad);
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            return res.status(500).json({ message: 'Error al obtener el usuario' });
        }
    },
        obtenerUsuario: async function(req, res) {
            // Extrae numero_identidad de los parÃ¡metros de la solicitud
            const user = req.params.usuario;
    
            try {
                // Busca el documento basado en numero_identidad
                const usuario = await Usuario.findOne({ usuario: user });
    
                // Verifica si se encontrÃ³ el documento
                if (!usuario) {
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                }
    
                // Retorna la informaciÃ³n del usuario encontrado
                return res.status(200).json({
                    usuario: usuario.usuario,
                    contrasena: usuario.contrasena
                });
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
                return res.status(500).json({ message: 'Error al obtener el usuario' });
            }
        },
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
        
                    return res.status(201).send({ contacto: contactoGuardado, message: 'Contacto agregado con Ã©xito' });
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
                        return res.status(404).send({ message: 'No se encontraron contactos para este nÃºmero de identidad' });
                    }
                } catch (error) {
                    console.error('Error al obtener los contactos:', error);
                    return res.status(500).send({ message: 'Error al obtener los contactos', error });
                }
            },
    
            updateAccount: async function(req, res) {
                try {
                    var numeroCuenta = req.params.numeroCuenta;
                    var updateData = req.body;
        
                    const cuenta = await saveAccount.findOneAndUpdate(
                        { numeroCuenta: numeroCuenta },
                        updateData,
                        { new: true }
                    );
        
                    if (cuenta) {
                        return res.status(200).send({ message: 'Cuenta actualizada con Ã©xito', cuenta });
                    } else {
                        return res.status(404).send({ message: 'Cuenta no encontrada' });
                    }
                } catch (error) {
                    console.error('Error al actualizar la cuenta:', error);
                    return res.status(500).send({ message: 'Error al actualizar la cuenta', error });
                }
            },
            getAccountByNumeroCuenta: async function(req, res) {
                try {
                    var numeroCuenta = req.params.numeroCuenta;
        
                    const cuenta = await saveAccount.findOne({ numeroCuenta: numeroCuenta });
        
                    if (cuenta) {
                        return res.status(200).send({ cuenta });
                    } else {
                        return res.status(404).send({ message: 'Cuenta no encontrada' });
                    }
                } catch (error) {
                    console.error('Error al obtener la cuenta:', error);
                    return res.status(500).send({ message: 'Error al obtener la cuenta', error });
                }
            },
                saveTransfer: async function(req, res) {
                    try {
                        var params = req.body;
                
                        console.log('Cuerpo de la solicitud:', JSON.stringify(params, null, 2));
                
                        // Verificar si cuenta_origen y cuenta_destino estÃ¡n presentes en params
                        if (!params.cuenta_origen || !params.cuenta_destino) {
                            return res.status(400).send({ message: 'Datos de cuenta de origen y destino son requeridos' });
                        }
                
                        var transferencia = new Transferencia({
                            numero_comprobante_transferencia: params.numero_comprobante_transferencia,
                            monto: params.monto,
                            fecha: params.fecha,
                            cuenta_origen: {
                                nombre_completo: params.cuenta_origen.nombre_completo,
                                numero_cuenta: params.cuenta_origen.numero_cuenta
                            },
                            cuenta_destino: {
                                nombre_completo: params.cuenta_destino.nombre_completo,
                                numero_cuenta: params.cuenta_destino.numero_cuenta
                            },
                            comentario: params.comentario,
                            numero_cuenta: params.numero_cuenta,
                            id_comprobante_transferencia: params.id_comprobante_transferencia
                        });
                
                        var transferStored = await transferencia.save();
                
                        return res.status(201).send({ transfer: transferStored, message: 'Transferencia guardada con Ã©xito' });
                    } catch (error) {
                        console.error('Error al guardar la transferencia:', error);
                        return res.status(500).send({ message: 'Error al guardar la transferencia', error });
                    }
                },
                saveComprobante: async function(req, res) {
                    try {
                        const params = req.body;
                
                        // Crear un nuevo comprobante de transferencia
                        const nuevoComprobante = new ComprobanteTransferencia({
                            id_comprobante_transferencia: params.id_comprobante_transferencia,
                            fecha_emision: params.fecha_emision,
                            archivo_comprobante_transferencia: params.archivo_comprobante_transferencia,
                            numero_comprobante_transferencia: params.numero_comprobante_transferencia
                        });
                
                        // Guardar el comprobante en la base de datos
                        const comprobanteStored = await nuevoComprobante.save();
                
                        return res.status(201).send({ comprobante: comprobanteStored, message: 'Comprobante guardado con Ã©xito' });
                    } catch (error) {
                        console.error('Error al guardar el comprobante:', error);
                        return res.status(500).send({ message: 'Error al guardar el comprobante', error });
                    }
                },
                saveAccount: async function(req, res) {
                    try {
                        var params = req.body;
            
                        var account = new saveAccount({
                            numeroIdentidad: params.numero_identidad,
                            accountType: params.accountType,
                            numeroCuenta: params.numeroCuenta,
                            cuentaNombre: params.cuentaNombre,
                            tipoCuenta: params.tipoCuenta,
                            saldo: params.saldo
                        });
            
                        var accountStored = await account.save();
                        return res.status(201).send({ cuenta: accountStored, message: 'Cuenta guardada con éxito' });
                    } catch (error) {
                        return res.status(500).send({ message: 'Error al guardar la cuenta', error });
                    }
                },
                getCredencialesUsuarioByNumeroIdentidad: async function(req, res) {
                    try {
                        var numero_identidad = req.params.numero_identidad;
            
                        const credencialesUsuario = await createUser.findOne({ numero_identidad: numero_identidad });
            
                        if (credencialesUsuario) {
                            return res.status(200).send({ credencialesUsuario });
                        } else {
                            return res.status(404).send({ message: 'Credenciales de usuario no encontradas' });
                        }
                    } catch (error) {
                        console.error('Error al obtener las credenciales de usuario:', error);
                        return res.status(500).send({ message: 'Error al obtener las credenciales de usuario', error });
                    }
                },
                getUsuarioByNumeroIdentidad: async function(req, res) {
                    try {
                        var numero_identidad = req.params.numero_identidad;
                
                        // Buscar usuario por numero_identidad y seleccionar solo los campos especificados
                        const usuario = await Usuario.findOne(
                            { numero_identidad: numero_identidad },
                            'numero_identidad question1 answer1 question2 answer2 question3 answer3 question4 answer4 question5 answer5'
                        );
                
                        if (usuario) {
                            return res.status(200).send({ usuario });
                        } else {
                            return res.status(404).send({ message: 'Usuario no encontrado' });
                        }
                    } catch (error) {
                        console.error('Error al obtener el usuario:', error);
                        return res.status(500).send({ message: 'Error al obtener el usuario', error });
                    }
                },
                getLabelByValue: async function(req, res) {
                    try {
                        var value = req.params.value;
                
                        // Buscar la pregunta de seguridad por el valor y seleccionar solo el campo `label`
                        const question = await SecurityQuestion.findOne(
                            { value: value },
                            'label'
                        );
                
                        if (question) {
                            return res.status(200).send({ label: question.label });
                        } else {
                            return res.status(404).send({ message: 'Pregunta de seguridad no encontrada' });
                        }
                    } catch (error) {
                        console.error('Error al obtener el label:', error);
                        return res.status(500).send({ message: 'Error al obtener el label', error });
                    }
                },
                
                /*updatePasswordByNumeroIdentidad1: async function(req, res) {
                    try {
                      const { newPassword } = req.body;
                      const { numero_identidad } = req.params;
                  
                      // Encriptar la nueva contraseña
                      const hashedPassword = await bcrypt.hash(newPassword, 10);
                  
                      // Buscar el usuario por numero_identidad y actualizar la contraseña
                      const user = await createUser.findOneAndUpdate(
                        { numero_identidad: numero_identidad },
                        { password: hashedPassword, confirmpassword: hashedPassword },
                        { new: true }
                      );
                  
                      if (user) {
                        return res.status(200).send({ message: 'Contraseña actualizada exitosamente', user });
                      } else {
                        return res.status(404).send({ message: 'Usuario no encontrado' });
                      }
                    } catch (error) {
                      console.error('Error al actualizar la contraseña:', error);
                      return res.status(500).send({ message: 'Error al actualizar la contraseña', error });
                    }
                  },
                updatePasswordByNumeroIdentidad2: async function(req, res) {
                    try {
                        var { numero_identidad, newPassword } = req.body;
                
                        // Encriptar la nueva contraseña
                        const hashedPassword = await bcrypt.hash(newPassword, 10);
                
                        // Buscar el usuario por numero_identidad y actualizar la contraseña
                        const user = await Usuario.findOneAndUpdate(
                            { numero_identidad: numero_identidad },
                            { contrasena: hashedPassword },
                            { new: true }
                        );
                
                        if (user) {
                            return res.status(200).send({ message: 'Contraseña actualizada exitosamente', user });
                        } else {
                            return res.status(404).send({ message: 'Usuario no encontrado' });
                        }
                    } catch (error) {
                        console.error('Error al actualizar la contraseña:', error);
                        return res.status(500).send({ message: 'Error al actualizar la contraseña', error });
                    }
                }*/

                    updatePasswordByNumeroIdentidad1: async function(req, res) {
                        try {
                          const { contrasena } = req.body;
                          const { numero_identidad } = req.params;
                    
                          if (!contrasena) {
                            return res.status(400).send({ message: 'Nueva contraseña no proporcionada' });
                          }
                    
                          // Encriptar la nueva contraseña
                          const hashedPassword = await bcrypt.hash(contrasena, 10);
                    
                          // Buscar el usuario por numero_identidad y actualizar la contraseña
                          const user = await createUser.findOneAndUpdate(
                            { numero_identidad: numero_identidad },
                            { password: hashedPassword, confirmpassword: hashedPassword },
                            { new: true }
                          );
                    
                          if (user) {
                            return res.status(200).send({ message: 'Contraseña actualizada exitosamente', user });
                          } else {
                            return res.status(404).send({ message: 'Usuario no encontrado' });
                          }
                        } catch (error) {
                          console.error('Error al actualizar la contraseña:', error.message); // Registrar error detallado
                          return res.status(500).send({ message: 'Error al actualizar la contraseña', error: error.message });
                        }
                      },
                    
                      // Método usando 'req.body'
                      updatePasswordByNumeroIdentidad2: async function(req, res) {
                        try {
                            const { contrasena } = req.body;
                            const { numero_identidad } = req.params;
                    
                          if (!contrasena) {
                            return res.status(400).send({ message: 'Nueva contraseña no proporcionada' });
                          }
                    
                          // Encriptar la nueva contraseña
                          const hashedPassword = await bcrypt.hash(contrasena, 10);
                    
                          // Buscar el usuario por numero_identidad y actualizar la contraseña
                          const user = await Usuario.findOneAndUpdate(
                            { numero_identidad: numero_identidad },
                            { contrasena: hashedPassword },
                            { new: true }
                          );
                    
                          if (user) {
                            return res.status(200).send({ message: 'Contraseña actualizada exitosamente', user });
                          } else {
                            return res.status(404).send({ message: 'Usuario no encontrado' });
                          }
                        } catch (error) {
                          console.error('Error al actualizar la contraseña:', error.message); // Registrar error detallado
                          return res.status(500).send({ message: 'Error al actualizar la contraseña', error: error.message });
                        }
                      },






                    easy: async function(req, res) {
                        try {
                            const { contrasena } = req.body;
                            const { numero_identidad } = req.params;
                    
                          if (!contrasena) {
                            return res.status(400).send({ message: 'Nueva contraseña no proporcionada' });
                          }
                    
                          
                    
                          // Buscar el usuario por numero_identidad y actualizar la contraseña
                          const user = await Usuario.findOneAndUpdate(
                            { numero_identidad: numero_identidad },
                            { contrasena: contrasena },
                            { new: true }
                          );
                    
                          if (user) {
                            return res.status(200).send({ message: 'Contraseña actualizada exitosamente', user });
                          } else {
                            return res.status(404).send({ message: 'Usuario no encontrado' });
                          }
                        } catch (error) {
                          console.error('Error al actualizar la contraseña:', error.message); // Registrar error detallado
                          return res.status(500).send({ message: 'Error al actualizar la contraseña', error: error.message });
                        }
                      },


                      peasy: async function(req, res) {
                        try {
                          const { contrasena } = req.body;
                          const { numero_identidad } = req.params;
                    
                          if (!contrasena) {
                            return res.status(400).send({ message: 'Nueva contraseña no proporcionada' });
                          }
                    
                    
                          // Buscar el usuario por numero_identidad y actualizar la contraseña
                          const user = await createUser.findOneAndUpdate(
                            { numero_identidad: numero_identidad },
                            { password: contrasena, confirmpassword: contrasena },
                            { new: true }
                          );
                    
                          if (user) {
                            return res.status(200).send({ message: 'Contraseña actualizada exitosamente', user });
                          } else {
                            return res.status(404).send({ message: 'Usuario no encontrado' });
                          }
                        } catch (error) {
                          console.error('Error al actualizar la contraseña:', error.message); // Registrar error detallado
                          return res.status(500).send({ message: 'Error al actualizar la contraseña', error: error.message });
                        }
                      }
    

};

module.exports = controller;

