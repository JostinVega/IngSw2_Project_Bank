/*var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var bancoroutes = require('./routes/banco.routes');
const { trusted } = require('mongoose');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: trusted }));
app.use(bodyParser.json());

// Configurar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// Configurar CORS
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
    credentials: true
  };

  app.use(cors({
    origin: 'http://localhost:4200'
  }));

// Ejemplo de configuración de una ruta POST para crear una cuenta
app.post('/nueva-cuenta', (req, res) => {
  const { numeroCuenta, cuentaNombre, tipoCuenta, usuario, numeroIdentidad, saldo } = req.body;

  // Imprimir en consola los valores recibidos
  console.log('Valores recibidos:');
  console.log('numeroCuenta:', numeroCuenta);
  console.log('cuentaNombre:', cuentaNombre);
  console.log('tipoCuenta:', tipoCuenta);
  console.log('usuario:', usuario);
  console.log('numeroIdentidad:', numeroIdentidad);
  console.log('saldo:', saldo);
  
  // Lógica para crear una cuenta en la base de datos (esto es un ejemplo)
  res.status(200).send({
    message: 'Cuenta creada exitosamente',
    cuenta: {
      cuentaNombre,
      numeroCuenta,
      numeroIdentidad,
      saldo,
      tipoCuenta
    }
  });
});


app.use(cors(corsOptions));

// Rutas de la API
app.use('/', bancoroutes);
// Ejemplo de configuración de una ruta POST para registrar un usuario

  

module.exports = app;*/


/*var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var bancoroutes = require('./routes/banco.routes');
const cors = require('cors');

// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware para CSP
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://vercel.live;");
  next();
});

// Configurar CORS
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
  credentials: true
};

app.use(cors(corsOptions));

// Ejemplo de configuración de una ruta POST para crear una cuenta
app.post('/nueva-cuenta', (req, res) => {
  const { numeroCuenta, cuentaNombre, tipoCuenta, usuario, numeroIdentidad, saldo } = req.body;

  // Imprimir en consola los valores recibidos
  console.log('Valores recibidos:');
  console.log('numeroCuenta:', numeroCuenta);
  console.log('cuentaNombre:', cuentaNombre);
  console.log('tipoCuenta:', tipoCuenta);
  console.log('usuario:', usuario);
  console.log('numeroIdentidad:', numeroIdentidad);
  console.log('saldo:', saldo);
  
  // Lógica para crear una cuenta en la base de datos (esto es un ejemplo)
  res.status(200).send({
    message: 'Cuenta creada exitosamente',
    cuenta: {
      cuentaNombre,
      numeroCuenta,
      numeroIdentidad,
      saldo,
      tipoCuenta
    }
  });
});

app.post('/send-security-code', (req, res) => {
  const { numero_identidad } = req.body;
  console.log(`Código de seguridad enviado a: ${numero_identidad}`);
  res.status(200).send({ message: 'Código de seguridad enviado' });
});

app.post('/verify-security-code', (req, res) => {
  const { numero_identidad, enteredCode } = req.body;
  console.log(`Verificando código para: ${numero_identidad}, código: ${enteredCode}`);
  res.status(200).send({ message: 'Código verificado' });
});



// Rutas de la API
app.use('/', bancoroutes);
// Rutas
//app.use('/usuario', require('./routes/usuario.routes'));

module.exports = app;*/

/*
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var bancoroutes = require('./routes/banco.routes');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
  credentials: true
};

app.use(cors(corsOptions));

app.post('/nueva-cuenta', (req, res) => {
  try {
    const { numeroCuenta, cuentaNombre, tipoCuenta, usuario, numeroIdentidad, saldo } = req.body;

    console.log('Valores recibidos:');
    console.log('numeroCuenta:', numeroCuenta);
    console.log('cuentaNombre:', cuentaNombre);
    console.log('tipoCuenta:', tipoCuenta);
    console.log('usuario:', usuario);
    console.log('numeroIdentidad:', numeroIdentidad);
    console.log('saldo:', saldo);

    res.status(200).send({
      message: 'Cuenta creada exitosamente',
      cuenta: {
        cuentaNombre,
        numeroCuenta,
        numeroIdentidad,
        saldo,
        tipoCuenta
      }
    });
  } catch (error) {
    console.error('Error en la ruta /nueva-cuenta:', error);
    res.status(500).send('Error en la creación de la cuenta');
  }
});

app.post('/send-security-code', (req, res) => {
  try {
    const { numero_identidad } = req.body;
    console.log(`Código de seguridad enviado a: ${numero_identidad}`);
    res.status(200).send({ message: 'Código de seguridad enviado' });
  } catch (error) {
    console.error('Error en la ruta /send-security-code:', error);
    res.status(500).send('Error al enviar el código de seguridad');
  }
});

app.post('/verify-security-code', (req, res) => {
  try {
    const { numero_identidad, enteredCode } = req.body;
    console.log(`Verificando código para: ${numero_identidad}, código: ${enteredCode}`);
    res.status(200).send({ message: 'Código verificado' });
  } catch (error) {
    console.error('Error en la ruta /verify-security-code:', error);
    res.status(500).send('Error al verificar el código de seguridad');
  }
});

app.use('/', bancoroutes);
app.use('/usuario', require('./routes/usuario.routes'));

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;


*/


/*var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var bancoroutes = require('./routes/banco.routes');
const cors = require('cors');

// Middleware para CSP
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://vercel.live;");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
  credentials: true
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Banco Politécnico');
});

app.post('/nueva-cuenta', (req, res) => {
  const { numeroCuenta, cuentaNombre, tipoCuenta, usuario, numeroIdentidad, saldo } = req.body;

  console.log('Valores recibidos:');
  console.log('numeroCuenta:', numeroCuenta);
  console.log('cuentaNombre:', cuentaNombre);
  console.log('tipoCuenta:', tipoCuenta);
  console.log('usuario:', usuario);
  console.log('numeroIdentidad:', numeroIdentidad);
  console.log('saldo:', saldo);

  res.status(200).send({
    message: 'Cuenta creada exitosamente',
    cuenta: {
      cuentaNombre,
      numeroCuenta,
      numeroIdentidad,
      saldo,
      tipoCuenta
    }
  });
});

app.post('/send-security-code', (req, res) => {
  const { numero_identidad } = req.body;
  console.log(`Código de seguridad enviado a: ${numero_identidad}`);
  res.status(200).send({ message: 'Código de seguridad enviado' });
});

app.post('/verify-security-code', (req, res) => {
  const { numero_identidad, enteredCode } = req.body;
  console.log(`Verificando código para: ${numero_identidad}, código: ${enteredCode}`);
  res.status(200).send({ message: 'Código verificado' });
});

app.use('/', bancoroutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
*/

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var bancoroutes = require('./routes/banco.routes');
const cors = require('cors');

const corsOptions = {
  origin: ['https://bancopolitecnico.com', 'http://localhost:4200'],
  optionsSuccessStatus: 200,
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
  credentials: true
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// Middleware para CSP
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://vercel.live;");
  next();
});



app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Banco Politécnico');
});

app.post('/nueva-cuenta', (req, res) => {
  const { numeroCuenta, cuentaNombre, tipoCuenta, usuario, numeroIdentidad, saldo } = req.body;

  console.log('Valores recibidos:');
  console.log('numeroCuenta:', numeroCuenta);
  console.log('cuentaNombre:', cuentaNombre);
  console.log('tipoCuenta:', tipoCuenta);
  console.log('usuario:', usuario);
  console.log('numeroIdentidad:', numeroIdentidad);
  console.log('saldo:', saldo);

  res.status(200).send({
    message: 'Cuenta creada exitosamente',
    cuenta: {
      cuentaNombre,
      numeroCuenta,
      numeroIdentidad,
      saldo,
      tipoCuenta
    }
  });
});

app.post('/send-security-code', (req, res) => {
  const { numero_identidad } = req.body;
  console.log(`Código de seguridad enviado a: ${numero_identidad}`);
  res.status(200).send({ message: 'Código de seguridad enviado' });
});

app.post('/verify-security-code', (req, res) => {
  const { numero_identidad, enteredCode } = req.body;
  console.log(`Verificando código para: ${numero_identidad}, código: ${enteredCode}`);
  res.status(200).send({ message: 'Código verificado' });
});

app.use('/', bancoroutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
