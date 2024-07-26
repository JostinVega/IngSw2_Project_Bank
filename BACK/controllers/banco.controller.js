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
//SE AGREGO


var controller = {
    saveUsuario: async function(req, res) {
        try {
            var params = req.body;
            console.log('Datos recibidos para registrar:', params); // Log para verificar datos

            var user = new Usuario({
                numeroIdentidad: params.step1.numeroIdentidad,
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
                saldo: params.step5.saldo,
                fecha_registro: new Date()
            });

            var userStored = await user.save();

            var credencialUsuario = new User({
                numeroIdentidad: params.step1.numeroIdentidad,
                nombre_completo: params.step1.nombre_completo,
                correo_electronico: params.step1.correo_electronico,
                numero_telefono: params.step1.numero_telefono,
                fecha_nacimiento: params.step1.fecha_nacimiento
            });

            await credencialUsuario.save();

            var createUser_ = new createUser({
                numeroIdentidad: params.step1.numeroIdentidad,
                username: params.step3.username,
                password: params.step3.password,
                confirmpassword: params.step3.confirmPassword
            });

            await createUser_.save();

            var question = new saveQuestion({
                numeroIdentidad: params.step1.numeroIdentidad,
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
                numeroIdentidad: params.step1.numeroIdentidad,
                accountType: params.step5.accountType,
                numeroCuenta: params.step5.numeroCuenta,
                cuentaNombre: params.step5.cuentaNombre,
                tipoCuenta: params.step5.tipoCuenta,
                saldo: params.step5.saldo
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
                    contrasena: usuario.contrasena,
                    estado: usuario.estado,
                    numero_telefono: usuario.numero_telefono,
                    correo_electronico: usuario.correo_electronico,
                    administrador: usuario.administrador
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
        
                    const cuentas = await saveAccount.find({ numeroIdentidad: usuario.numeroIdentidad });
                    if (!cuentas.length) {
                        return res.status(404).send('No accounts found for this username');
                    }
        
                    res.json({ cuentas });
                } catch (error) {
                    console.error('Error fetching accounts:', error);
                    res.status(500).send('Internal server error');
                }
            },
            
            /*
            agregarContacto: async function(req, res) {
                try {
                    var params = req.body;
                    console.log('Datos recibidos para agregar contacto:', params); // Log para verificar datos
        
                    var contacto = new Contacto({
                        numero_identidad: params.numero_identidad,
                        nombre: params.nombre,
                        numeroCuenta: params.numeroCuenta,
                        tipoCuenta: params.tipoCuenta,
                        isFavorite: params.isFavorite
                    });
        
                    var contactoGuardado = await contacto.save();
        
                    return res.status(201).send({ contacto: contactoGuardado, message: 'Contacto agregado con Ã©xito' });
                } catch (error) {
                    console.error('Error al agregar contacto:', error);
                    return res.status(500).send({ message: 'Error al agregar contacto', error });
                }
            },
            */

            agregarContacto: async function(req, res) {
                try {
                  var params = req.body;
                  console.log('Datos recibidos para agregar contacto:', params); // Log para verificar datos
              
                  var contacto = new Contacto({
                    numero_identidad: params.numeroIdentidad,
                    nombre: params.nombre,
                    numeroCuenta: params.numeroCuenta,
                    tipoCuenta: params.tipoCuenta,
                    isFavorite: params.isFavorite
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
// controllers/tu-controlador.js

/*
saveTransfer: async function(req, res) {
    try {
        var params = req.body;

        console.log('Cuerpo de la solicitud:', JSON.stringify(params, null, 2));

        // Verificar si cuenta_origen y cuenta_destino están presentes en params
        if (!params.cuenta_origen || !params.cuenta_destino) {
            return res.status(400).send({ message: 'Datos de cuenta de origen y destino son requeridos' });
        }

        var transferencia = new Transferencia({
            numero_comprobante_transferencia: params.numero_comprobante_transferencia,
            monto: params.monto,
            fecha: params.fecha,
            cuenta_origen: {
                nombre_completo: params.cuenta_origen.nombre_completo,
                numero_cuenta: params.cuenta_origen.numero_cuenta,
                tipoCuenta: params.cuenta_origen.tipoCuenta,
                tipoTransaccion: params.cuenta_origen.tipoTransaccion || 'Egreso',
                saldoAntes: params.cuenta_origen.saldoAntes,
                saldoDespues: params.cuenta_origen.saldoDespues
            },
            cuenta_destino: {
                nombre_completo: params.cuenta_destino.nombre_completo,
                numero_cuenta: params.cuenta_destino.numero_cuenta,
                tipoCuenta: params.cuenta_destino.tipoCuenta,
                tipoTransaccion: params.cuenta_destino.tipoTransaccion || 'Ingreso',
                saldoAntes: params.cuenta_destino.saldoAntes,
                saldoDespues: params.cuenta_destino.saldoDespues
            },
            comentario: params.comentario,
            numero_cuenta: params.numero_cuenta,
            id_comprobante_transferencia: params.id_comprobante_transferencia
        });

        var transferStored = await transferencia.save();

        return res.status(201).send({ transfer: transferStored, message: 'Transferencia guardada con éxito' });
    } catch (error) {
        console.error('Error al guardar la transferencia:', error);
        return res.status(500).send({ message: 'Error al guardar la transferencia', error });
    }
},
*/

/*
saveTransfer: async function(req, res) {
    try {
        var params = req.body;

        console.log('Cuerpo de la solicitud:', JSON.stringify(params, null, 2));

        // Verificar si cuenta_origen y cuenta_destino están presentes en params
        if (!params.cuenta_origen || !params.cuenta_destino) {
            console.log('Faltan datos de cuenta de origen o destino');
            return res.status(400).send({ message: 'Datos de cuenta de origen y destino son requeridos' });
        }

        var transferencia = new Transferencia({
            numero_comprobante_transferencia: params.numero_comprobante_transferencia,
            monto: params.monto,
            fecha: params.fecha,
            cuenta_origen: {
                nombre_completo: params.cuenta_origen.nombre_completo,
                numero_cuenta: params.cuenta_origen.numero_cuenta,
                tipoCuenta: params.cuenta_origen.tipoCuenta,
                tipoTransaccion: params.cuenta_origen.tipoTransaccion || 'Egreso',
                saldoAntes: params.cuenta_origen.saldoAntes,
                saldoDespues: params.cuenta_origen.saldoDespues
            },
            cuenta_destino: {
                nombre_completo: params.cuenta_destino.nombre_completo,
                numero_cuenta: params.cuenta_destino.numero_cuenta,
                tipoCuenta: params.cuenta_destino.tipoCuenta,
                tipoTransaccion: params.cuenta_destino.tipoTransaccion || 'Ingreso',
                saldoAntes: params.cuenta_destino.saldoAntes,
                saldoDespues: params.cuenta_destino.saldoDespues
            },
            comentario: params.comentario,
            numero_cuenta: params.numero_cuenta,
            id_comprobante_transferencia: params.id_comprobante_transferencia
        });

        console.log('Datos de la transferencia a guardar:', JSON.stringify(transferencia, null, 2));

        var transferStored = await transferencia.save();

        console.log('Transferencia guardada con éxito:', JSON.stringify(transferStored, null, 2));

        return res.status(201).send({ transfer: transferStored, message: 'Transferencia guardada con éxito' });
    } catch (error) {
        console.error('Error al guardar la transferencia:', error);
        return res.status(500).send({ message: 'Error al guardar la transferencia', error });
    }
},
*/

/*saveTransfer: async function(req, res) {
    try {
      var params = req.body;

      if (!params.cuenta_origen || !params.cuenta_destino) {
        return res.status(400).send({ message: 'Datos de cuenta de origen y destino son requeridos' });
      }

      var transferencia = new Transferencia({
        numero_comprobante_transferencia: params.numero_comprobante_transferencia,
        monto: params.monto,
        fecha: params.fecha,
        cuenta_origen: {
          nombre_completo: params.cuenta_origen.nombre_completo,
          numero_cuenta: params.cuenta_origen.numero_cuenta,
          tipoCuenta: params.cuenta_origen.tipoCuenta,
          tipoTransaccion: 'Egreso',
          saldoAntes: params.cuenta_origen.saldoAntes,
          saldoDespues: params.cuenta_origen.saldoDespues
        },
        cuenta_destino: {
          nombre_completo: params.cuenta_destino.nombre_completo,
          numero_cuenta: params.cuenta_destino.numero_cuenta,
          tipoCuenta: params.cuenta_destino.tipoCuenta,
          tipoTransaccion: 'Ingreso',
          saldoAntes: params.cuenta_destino.saldoAntes,
          saldoDespues: params.cuenta_destino.saldoDespues
        },
        comentario: params.comentario,
        numero_cuenta: params.numero_cuenta,
        id_comprobante_transferencia: params.id_comprobante_transferencia
      });

      var transferStored = await transferencia.save();

      // Guardar el comprobante como PDF
      const doc = new jsPDF();
      doc.text(`Comprobante de Transferencia\n\nNúmero: ${params.numero_comprobante_transferencia}\nFecha: ${params.fecha}`, 10, 10);
      const pdfPath = path.join(__dirname, `../assets/comprobantes/${params.numero_comprobante_transferencia}.pdf`);
      doc.save(pdfPath);

      // Guardar el comprobante como PNG
      const canvas = await html2canvas(doc.output('datauristring'));
      const pngPath = path.join(__dirname, `../assets/comprobantes/${params.numero_comprobante_transferencia}.png`);
      fs.writeFileSync(pngPath, canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, ''), 'base64');

      return res.status(201).send({ transfer: transferStored, message: 'Transferencia guardada con éxito' });
    } catch (error) {
      console.error('Error al guardar la transferencia:', error);
      return res.status(500).send({ message: 'Error al guardar la transferencia', error });
    }
  }*/


    saveTransfer: async function(req, res) {
        try {
            var params = req.body;
    
            console.log('Cuerpo de la solicitud:', JSON.stringify(params, null, 2));
    
            // Verificar si cuenta_origen y cuenta_destino están presentes en params
            if (!params.cuenta_origen || !params.cuenta_destino) {
                return res.status(400).send({ message: 'Datos de cuenta de origen y destino son requeridos' });
            }
    
            var transferencia = new Transferencia({
                numero_comprobante_transferencia: params.numero_comprobante_transferencia,
                monto: params.monto,
                fecha: params.fecha,
                cuenta_origen: {
                    nombre_completo: params.cuenta_origen.nombre_completo,
                    numero_cuenta: params.cuenta_origen.numero_cuenta,
                    tipoCuenta: params.cuenta_origen.tipoCuenta,
                    tipoTransaccion: params.cuenta_origen.tipoTransaccion || 'Egreso',
                    saldoAntes: params.cuenta_origen.saldoAntes,
                    saldoDespues: params.cuenta_origen.saldoDespues
                },
                cuenta_destino: {
                    nombre_completo: params.cuenta_destino.nombre_completo,
                    numero_cuenta: params.cuenta_destino.numero_cuenta,
                    tipoCuenta: params.cuenta_destino.tipoCuenta,
                    tipoTransaccion: params.cuenta_destino.tipoTransaccion || 'Ingreso',
                    saldoAntes: params.cuenta_destino.saldoAntes,
                    saldoDespues: params.cuenta_destino.saldoDespues
                },
                comentario: params.comentario,
                numero_cuenta: params.numero_cuenta,
                id_comprobante_transferencia: params.id_comprobante_transferencia
            });
    
            var transferStored = await transferencia.save();
    
            return res.status(201).send({ transfer: transferStored, message: 'Transferencia guardada con éxito' });
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

                        console.log('Saving account:', account);
            
                        var accountStored = await account.save();

                        console.log('Account saved:', accountStored);
                        return res.status(201).send({ cuenta: accountStored, message: 'Cuenta guardada con éxito' });
                    } catch (error) {
                        return res.status(500).send({ message: 'Error al guardar la cuenta', error });
                    }
                },
                getCredencialesUsuarioByNumeroIdentidad: async function(req, res) {
                    try {
                        var numeroIdentidad = req.params.numeroIdentidad;
            
                        const credencialesUsuario = await createUser.findOne({ numeroIdentidad: numeroIdentidad });
            
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
                        var numeroIdentidad = req.params.numeroIdentidad;
                
                        // Buscar usuario por numero_identidad y seleccionar solo los campos especificados
                        const usuario = await Usuario.findOne(
                            { numeroIdentidad: numeroIdentidad },
                            'numeroIdentidad question1 answer1 question2 answer2 question3 answer3 question4 answer4 question5 answer5'
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
                            const { numeroIdentidad } = req.params;
                    
                          if (!contrasena) {
                            return res.status(400).send({ message: 'Nueva contraseña no proporcionada' });
                          }
                    
                          
                    
                          // Buscar el usuario por numero_identidad y actualizar la contraseña
                          const user = await Usuario.findOneAndUpdate(
                            { numeroIdentidad: numeroIdentidad },
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
                          const { numeroIdentidad } = req.params;
                    
                          if (!contrasena) {
                            return res.status(400).send({ message: 'Nueva contraseña no proporcionada' });
                          }
                    
                    
                          // Buscar el usuario por numero_identidad y actualizar la contraseña
                          const user = await createUser.findOneAndUpdate(
                            { numeroIdentidad: numeroIdentidad },
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
                      },

                    savEAccount: async function(req, res) {
                        try {
                            var params = req.body;
                
                            var account = new Cuenta({
                                numero_identidad: params.numero_identidad,
                                accountType: params.accountType,
                                numeroCuenta: params.numeroCuenta,
                                cuentaNombre: params.cuentaNombre,
                                tipoCuenta: params.tipoCuenta,
                                saldo: params.saldo
                            });
                
                            var accountStored = await account.save();
                            return res.status(201).send({ cuenta: accountStored, message: 'Cuenta guardada con éxito' });
                        } catch (error) {
                            console.error('Error al guardar la cuenta:', error); // Añadir registro de error detallado
                            return res.status(500).send({ message: 'Error al guardar la cuenta', error });
                        }
                    },
                    getNombreCompleto: async function(req, res) {
                        try {
                            const user = req.params.usuario;
                    
                            const usuario = await Usuario.findOne({ usuario: user }, 'nombre_completo');
                    
                            if (usuario) {
                                return res.status(200).send({ nombre_completo: usuario.nombre_completo });
                            } else {
                                return res.status(404).send({ message: 'Usuario no encontrado' });
                            }
                        } catch (error) {
                            console.error('Error al obtener el nombre completo:', error);
                            return res.status(500).send({ message: 'Error al obtener el nombre completo', error });
                        }
                    },
                    getNumeroCuenta: async function(req, res) {
                        try {
                            const cuentaNombre = req.params.cuentaNombre;
                    
                            const cuenta = await Usuario.findOne({ cuentaNombre: cuentaNombre }, 'numeroCuenta');
                    
                            if (cuenta) {
                                return res.status(200).send({ numeroCuenta: cuenta.numeroCuenta });
                            } else {
                                return res.status(404).send({ message: 'Cuenta no encontrada' });
                            }
                        } catch (error) {
                            console.error('Error al obtener el numeroCuenta:', error);
                            return res.status(500).send({ message: 'Error al obtener el numeroCuenta', error });
                        }
                    },
                    // controllers/tu-controlador.js

getTransferenciaByCuentaOrigen: async function(req, res) {
    try {
        const numeroCuentaOrigen = req.params.numeroCuenta;

        const transferencias = await Transferencia.find({ 'cuenta_origen.numero_cuenta': numeroCuentaOrigen });

        if (transferencias.length > 0) {
            return res.status(200).send({ transferencias });
        } else {
            return res.status(404).send({ message: 'Transferencias no encontradas para la cuenta origen proporcionada' });
        }
    } catch (error) {
        console.error('Error al obtener las transferencias:', error);
        return res.status(500).send({ message: 'Error al obtener las transferencias', error });
    }
},
getTipoCuentaByNumeroCuenta: async function(req, res) {
    try {
        const numeroCuenta = req.params.numeroCuenta;

        const cuenta = await saveAccount.findOne({ numeroCuenta: numeroCuenta }, 'tipoCuenta');

        if (cuenta) {
            return res.status(200).send({ tipoCuenta: cuenta.tipoCuenta });
        } else {
            return res.status(404).send({ message: 'Cuenta no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener el tipo de cuenta:', error);
        return res.status(500).send({ message: 'Error al obtener el tipo de cuenta', error });
    }
},

updateIsFavoriteByNumeroCuenta: async function(req, res) {
    try {
        const numeroCuenta = req.params.numeroCuenta;
        const { isFavorite } = req.body;

        const contacto = await Contacto.findOneAndUpdate(
            { numeroCuenta: numeroCuenta },
            { isFavorite: isFavorite },
            { new: true }
        );

        if (contacto) {
            return res.status(200).send({ message: 'Estado de favorito actualizado con éxito', contacto });
        } else {
            return res.status(404).send({ message: 'Contacto no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el estado de favorito:', error);
        return res.status(500).send({ message: 'Error al actualizar el estado de favorito', error });
    }
},

deleteContactoByNumeroCuenta: async function(req, res) {
    try {
        const numeroCuenta = req.params.numeroCuenta;

        const contacto = await Contacto.findOneAndDelete({ numeroCuenta: numeroCuenta });

        if (contacto) {
            return res.status(200).send({ message: 'Contacto eliminado con éxito', contacto });
        } else {
            return res.status(404).send({ message: 'Contacto no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el contacto:', error);
        return res.status(500).send({ message: 'Error al eliminar el contacto', error });
    }
},

contactoExistePorNombre: async function(req, res) {
    try {
        const nombre = req.params.nombre;

        const contacto = await Contacto.findOne({ nombre: nombre });

        if (contacto) {
            return res.status(200).send({ exists: true, contacto });
        } else {
            return res.status(404).send({ exists: false, message: 'Contacto no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar el contacto:', error);
        return res.status(500).send({ message: 'Error al buscar el contacto', error });
    }
},

contactoExistePorNumeroCuenta: async function(req, res) {
    try {
        const numeroCuenta = req.params.numeroCuenta;

        const contacto = await Contacto.findOne({ numeroCuenta: numeroCuenta });

        if (contacto) {
            return res.status(200).send({ exists: true, contacto });
        } else {
            return res.status(404).send({ exists: false, message: 'Contacto no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar el contacto:', error);
        return res.status(500).send({ message: 'Error al buscar el contacto', error });
    }
},

// controllers/tu-controlador.js

getUsuarioByNumeroIdentidad: async function(req, res) {
    try {
        const numeroIdentidad = req.params.numeroIdentidad;

        const usuario = await Usuario.findOne({ numeroIdentidad: numeroIdentidad });

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

getUsuarioByUsuario: async function(req, res) {
    try {
        const usuarioNombre = req.params.usuario;

        const usuario = await Usuario.findOne({ usuario: usuarioNombre });

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

getTransferenciasPorNumeroCuenta: async function(req, res) {
    try {
        const numero_cuenta = req.params.numero_cuenta;

        const transferencias = await Transferencia.find({
            $or: [
                { 'cuenta_origen.numero_cuenta': numero_cuenta },
                { 'cuenta_destino.numero_cuenta': numero_cuenta }
            ]
        });

        if (transferencias.length > 0) {
            return res.status(200).send({ transferencias });
        } else {
            return res.status(404).send({ message: 'Transferencias no encontradas para la cuenta proporcionada' });
        }
    } catch (error) {
        console.error('Error al obtener las transferencias:', error);
        return res.status(500).send({ message: 'Error al obtener las transferencias', error });
    }
},

getNumeroCuentaByCuentaNombre: async function(req, res) {
    try {
        const cuentaNombre = req.params.cuentaNombre;

        const cuenta = await saveAccount.findOne({ cuentaNombre: cuentaNombre }, 'numeroCuenta');

        if (cuenta) {
            return res.status(200).send({ numeroCuenta: cuenta.numeroCuenta });
        } else {
            return res.status(404).send({ message: 'Cuenta no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener el numeroCuenta:', error);
        return res.status(500).send({ message: 'Error al obtener el numeroCuenta', error });
    }
},

// Función para obtener la información del usuario por numeroIdentidad
getUsuarioByNumeroIdentidadRegistro: async function(req, res) {
    try {
        const numeroIdentidad = req.params.numeroIdentidad;

        const usuario = await Usuario.findOne({ numeroIdentidad: numeroIdentidad });

        if (usuario) {
            return res.status(200).send({ consulta: true, usuario });
        } else {
            return res.status(404).send({ consulta: false, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        return res.status(500).send({ consulta: false, message: 'Error al obtener el usuario', error });
    }
},

// Función para obtener la información del usuario por correo_electronico
getUsuarioByCorreoElectronico: async function(req, res) {
    try {
        const correoElectronico = req.params.correoElectronico;

        const usuario = await Usuario.findOne({ correo_electronico: correoElectronico });

        if (usuario) {
            return res.status(200).send({ consulta: true, usuario });
        } else {
            return res.status(404).send({ consulta: false, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        return res.status(500).send({ consulta: false, message: 'Error al obtener el usuario', error });
    }
},

// Función para obtener la información del usuario por numero_telefono
getUsuarioByNumeroTelefono: async function(req, res) {
    try {
        const numeroTelefono = req.params.numeroTelefono;

        const usuario = await Usuario.findOne({ numero_telefono: numeroTelefono });

        if (usuario) {
            return res.status(200).send({ consulta: true, usuario });
        } else {
            return res.status(404).send({ consulta: false, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        return res.status(500).send({ consulta: false, message: 'Error al obtener el usuario', error });
    }
},

getUsuarioByNombreUsuario: async function(req, res) {
    try {
        const user = req.params.usuario;

        const usuario = await Usuario.findOne({ usuario: user });

        if (usuario) {
            return res.status(200).send({ consulta: true, usuario });
        } else {
            return res.status(404).send({ consulta: false, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        return res.status(500).send({ consulta: false, message: 'Error al obtener el usuario', error });
    }
},

updatePersonalInfo: async function (req, res) {
    try {
        const { correo_electronico, numero_telefono } = req.body;
        const numeroIdentidad = req.params.numeroIdentidad;

        if (!correo_electronico && !numero_telefono) {
            return res.status(400).send({ message: 'Dato vacío proporcionado' });
        }

        // Validar formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (correo_electronico && !emailRegex.test(correo_electronico)) {
            return res.status(400).send({ message: 'Correo electrónico inválido' });
        }

        // Validar número de teléfono en formato nacional o internacional
        const phoneRegexNacional = /^\d{10}$/;
        const phoneRegexInternacional = /^\+593\d{9}$/;
        if (numero_telefono && !(phoneRegexNacional.test(numero_telefono) || phoneRegexInternacional.test(numero_telefono))) {
            return res.status(400).send({ message: 'Número de teléfono inválido. Debe tener 10 dígitos o seguir el formato internacional +593' });
        }
        
        const updateFields = {};
        if (correo_electronico) updateFields.correo_electronico = correo_electronico;
        if (numero_telefono) updateFields.numero_telefono = numero_telefono;

        const user = await Usuario.findOneAndUpdate(
            { numeroIdentidad: numeroIdentidad },
            updateFields,
            { new: true }
        );

        if (user) {
            return res.status(200).send({ message: 'Datos actualizados exitosamente', user });
        } else {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar los datos:', error.message); // Registrar error detallado
        return res.status(500).send({ message: 'Error al actualizar los datos', error: error.message });
    }
},

getUsuarioByUsuarioRegistro: async function(req, res) {
    try {
        const usuarioNombre = req.params.usuario;

        const usuario = await Usuario.findOne({ usuario: usuarioNombre });

        if (usuario) {
            return res.status(200).send({ consulta: true, usuario });
        } else {
            return res.status(404).send({ consulta: false, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        return res.status(500).send({ consulta: false, message: 'Error al obtener el usuario', error });
    }
},

updateUsuario: async function(req, res) {
    try {
      const { username } = req.body;
      const { numeroIdentidad } = req.params;

      if (!username) {
        return res.status(400).send({ message: 'Nuevo nombre de usuario no proporcionada' });
      }


      // Buscar el usuario por numero_identidad y actualizar el nombre de usuario
      const user = await createUser.findOneAndUpdate(
        { numeroIdentidad: numeroIdentidad },
        { username: username},
        { new: true }
      );

      if (user) {
        return res.status(200).send({ message: 'Username actualizado exitosamente', user });
      } else {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al actualizar el nombre de usuario:', error.message); // Registrar error detallado
      return res.status(500).send({ message: 'Error al actualizar el nombre de usuario', error: error.message });
    }
  },

  eliminarUsuarioYDatosAsociados: async function(req, res) {
    try {
      const { numero_identidad } = req.params;
  
      // Eliminar el usuario de la colección registro-usuario
      const usuarioEliminado = await Usuario.findOneAndDelete({ numeroIdentidad: numero_identidad });
      if (!usuarioEliminado) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
  
      // Eliminar datos asociados en otras colecciones
      await createUser.deleteMany({ numeroIdentidad: numero_identidad });
      await saveAccount.deleteMany({ numeroIdentidad: numero_identidad });
      await saveQuestion.deleteMany({ numeroIdentidad: numero_identidad });
      await Contacto.deleteMany({ numero_identidad: numero_identidad });
      await Usuario.deleteMany({ numeroIdentidad: numero_identidad });
      await User.deleteMany({ numeroIdentidad: numero_identidad });
  
      // Agregar eliminación para otras colecciones relacionadas si es necesario
  
      return res.status(200).send({ message: 'Usuario y todos los datos asociados eliminados exitosamente' });
    } catch (error) {
      console.error('Error al eliminar usuario y datos asociados:', error.message);
      return res.status(500).send({ message: 'Error al eliminar usuario y datos asociados', error: error.message });
    }
  },

  obtenerTodosLosUsuarios: async function(req, res) {
    try {
      // Obtener todos los usuarios de la base de datos
      const usuarios = await Usuario.find();
      
      // Verificar si se encontraron usuarios
      if (usuarios.length > 0) {
        return res.status(200).send({ message: 'Usuarios encontrados', usuarios });
      } else {
        return res.status(404).send({ message: 'No se encontraron usuarios' });
      }
    } catch (error) {
      console.error('Error al obtener los usuarios:', error.message);
      return res.status(500).send({ message: 'Error al obtener los usuarios', error: error.message });
    }
  },

  obtenerTodasLasCuentas: async function(req, res) {
    try {
      // Obtener todas las cuentas de la base de datos
      const cuentas = await saveAccount.find();
      
      // Verificar si se encontraron cuentas
      if (cuentas.length > 0) {
        return res.status(200).send({ message: 'Cuentas encontradas', cuentas });
      } else {
        return res.status(404).send({ message: 'No se encontraron cuentas' });
      }
    } catch (error) {
      console.error('Error al obtener las cuentas:', error.message);
      return res.status(500).send({ message: 'Error al obtener las cuentas', error: error.message });
    }
  },

  actualizarAdminYEstado: async function(req, res) {
    try {
      const { numeroIdentidad } = req.params;
      const { administrador, estado } = req.body;
  
      // Validar que los valores se hayan proporcionado
      if (administrador === undefined || estado === undefined) {
        return res.status(400).send({ message: 'Valores de administrador o estado no proporcionados' });
      }
  
      // Buscar el usuario por numeroIdentidad y actualizar administrador y estado
      const usuarioActualizado = await Usuario.findOneAndUpdate(
        { numeroIdentidad: numeroIdentidad },
        { administrador: administrador, estado: estado },
        { new: true } // Retorna el documento actualizado
      );
  
      if (usuarioActualizado) {
        return res.status(200).send({ message: 'Usuario actualizado exitosamente', usuario: usuarioActualizado });
      } else {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error.message);
      return res.status(500).send({ message: 'Error al actualizar el usuario', error: error.message });
    }
  },

  getUsuarioConCuentasPorNumeroIdentidad: async function(req, res) {
    try {
        const numeroIdentidad = req.params.numeroIdentidad;

        // Buscar usuario por numeroIdentidad
        const usuario = await Usuario.findOne({ numeroIdentidad: numeroIdentidad });

        if (usuario) {
            // Buscar cuentas asociadas al numeroIdentidad
            const cuentas = await saveAccount.find({ numeroIdentidad: numeroIdentidad });
            
            // Incluir las cuentas en la información del usuario
            const userInfo = { ...usuario.toObject(), accounts: cuentas };

            return res.status(200).send({ consulta: true, usuario: userInfo });
        } else {
            return res.status(404).send({ consulta: false, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el usuario y sus cuentas:', error);
        return res.status(500).send({ consulta: false, message: 'Error al obtener el usuario y sus cuentas', error });
    }
},

/*obtenerInformacionUsuarioByNumeroIdentidadAdministrador: async function(req, res) {
    try {
        const numeroIdentidad = req.params.numeroIdentidad;

        if (!numeroIdentidad) {
            return res.status(400).send('numeroIdentidad parameter is required');
        }

        const usuario = await Usuario.findOne({ numeroIdentidad: numeroIdentidad });

        if (!usuario) {
            return res.status(404).send('No user found for this identity number');
        }

        return res.status(200).json(usuario);
    } catch (error) {
        console.error('Error fetching user information:', error);
        return res.status(500).send('Internal server error');
    }
}*/

obtenerInformacionCuentaPorNumeroCuenta: async function(req, res) {
    try {
        const numeroCuenta = req.params.numeroCuenta;

        if (!numeroCuenta) {
            return res.status(400).send('numeroCuenta parameter is required');
        }

        const cuenta = await saveAccount.findOne({ numeroCuenta: numeroCuenta });

        if (!cuenta) {
            return res.status(404).send('No account found for this account number');
        }

        return res.status(200).json(cuenta);
    } catch (error) {
        console.error('Error fetching account information:', error);
        return res.status(500).send('Internal server error');
    }
},

getAccountsByCedula: async function(req, res) {
    try {
        const cedula = req.params.cedula;

        // Verifica si el número de cédula corresponde a un usuario registrado
        const usuario = await Usuario.findOne({ numeroIdentidad: cedula });

        if (!usuario) {
            return res.status(404).json({ message: 'No se encontró ningún usuario registrado con ese número de cédula.' });
        }

        // Busca las cuentas asociadas al número de cédula
        const cuentas = await saveAccount.find({ numeroIdentidad: cedula });

        if (!cuentas || cuentas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron cuentas asociadas al número de cédula proporcionado.' });
        }

        res.json({ cuentas });
    } catch (error) {
        console.error('Error al obtener cuentas por cédula:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
},

getIdCuenta: async function(req, res) {
    try {
      const numeroCuenta = req.params.numeroCuenta;
      const cuenta = await saveAccount.findOne({ numeroCuenta: numeroCuenta });

      if (cuenta) {
        return res.status(200).send({ numeroIdentidad: cuenta.numeroIdentidad });
      } else {
        return res.status(404).send({ message: ' Numero de indentidad del usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el numeroIdentidad del usuario:', error);
      return res.status(500).send({ message: 'Error al obtener el numeroIdentidad del usuario', error });
    }
 },
 getNombreCompletoContacto: async function(req, res) {
    try {
      const numeroIdentidad = req.params.numeroIdentidad;
      const usuario = await Usuario.findOne({ numeroIdentidad: numeroIdentidad });

      if (usuario) {
        return res.status(200).send({ nombre_completo: usuario.nombre_completo });
      } else {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el nombre del usuario:', error);
      return res.status(500).send({ message: 'Error al obtener el nombre del usuario', error });
    }
 },

 updateUsuario: async function(req, res) {
    const numeroIdentidad = req.params.numeroIdentidad;
    const updateData = req.body;

    try {
        // Encuentra el usuario por su número de identidad y actualiza los datos
        const usuarioActualizado = await Usuario.findOneAndUpdate(
            { numeroIdentidad: numeroIdentidad },
            updateData,
            { new: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({
            message: 'Usuario actualizado con éxito',
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        return res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
}



  
  


};

module.exports = controller;

