var Usuario = require('../models/usuario');
var User = require('../models/user');
var createUser = require('../models/crearUsuario')
var saveQuestion = require('../models/preguntas-seguridad')
var saveAccount = require('../models/tipo-cuenta')

var controller = {
    /*inicio:function(req, res) {
        return res.status(201).send({message:"<h1>Hola</h1>"});
        return res.send()
    },
    saveUsuario:async function(req, res) {
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
    },
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
    saveUser: async function(req, res) {
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
        account.numeroCuenta = params.numeroCuenta;
        account.cuentaNombre = params.cuentaNombre;
        account.tipoCuenta = params.tipoCuenta;

        var accountStored = await account.save();
        return res.status(201).send({cuenta: accountStored});
    }
}



module.exports = controller;