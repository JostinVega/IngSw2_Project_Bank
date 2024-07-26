/*
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 4001;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}));

// Configura la ruta para servir archivos estáticos
app.use('/assets/comprobantes', express.static(path.join(__dirname, 'assets/comprobantes')));

// Verifica la ruta de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'assets/comprobantes');
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/upload-comprobante', upload.single('comprobante'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }
  res.send({
    message: 'File uploaded successfully',
    filename: req.file.filename
  });
});

app.listen(port, () => {
  console.log(`Servidor principal escuchando en http://localhost:${port}`);
});

*/


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 4001;

app.use(bodyParser.json({ limit: '50mb' })); // Aumentar el límite de tamaño para manejar grandes archivos
/*app.use(cors({
  origin: ['https://bancopolitecnico.com', 'http://localhost:4200'], // Permitir ambos orígenes
  optionsSuccessStatus: 200,
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
  credentials: true
}));

app.options('*', cors({
  origin: ['https://bancopolitecnico.com', 'http://localhost:4200'],
  credentials: true
}));*/

// Configurar CORS para permitir solicitudes desde un origen específico
app.use(cors({
  origin: 'https://bancopolitecnico.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204  // Para devolver un estado 204 en solicitudes preflight exitosas
}));

// Manejo explícito de solicitudes OPTIONS
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://bancopolitecnico.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(204);  // Responder con un estado 204 (No Content)
});


// Conectar a MongoDB
//mongoose.connect('mongodb://localhost:27017/banco', { useNewUrlParser: true, useUnifiedTopology: true });
const encodedPassword = encodeURIComponent('JAvm1402@');
mongoose.connect(`mongodb+srv://jostinvega:${encodedPassword}@cluster0.jet01gs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);


const ComprobanteSchema = new mongoose.Schema({
  numero_comprobante: String,
  pdfData: String,  // Almacenar en base64
  pngData: String   // Almacenar en base64
});

const Comprobante = mongoose.model('Comprobante', ComprobanteSchema);

app.post('/upload-comprobante', async (req, res) => {
  try {
    const { numero_comprobante, pdfData, pngData } = req.body;

    const nuevoComprobante = new Comprobante({
      numero_comprobante,
      pdfData,
      pngData
    });

    await nuevoComprobante.save();
    res.send({
      message: 'Comprobante guardado exitosamente en la base de datos',
      numero_comprobante: nuevoComprobante.numero_comprobante
    });
  } catch (error) {
    res.status(500).send({ message: 'Error al guardar el comprobante', error });
  }
});

// Nueva ruta para descargar comprobantes
app.get('/download-comprobante/:receiptNumber/:fileType', async (req, res) => {
  try {
    const { receiptNumber, fileType } = req.params;

    const comprobante = await Comprobante.findOne({ numero_comprobante: receiptNumber });
    if (!comprobante) {
      return res.status(404).send({ message: 'Comprobante no encontrado' });
    }

    let fileData;
    if (fileType === 'pdf') {
      fileData = comprobante.pdfData;
    } else if (fileType === 'png') {
      fileData = comprobante.pngData;
    } else {
      return res.status(400).send({ message: 'Tipo de archivo no soportado' });
    }

    const buffer = Buffer.from(fileData, 'base64');
    res.setHeader('Content-Type', fileType === 'pdf' ? 'application/pdf' : 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename=${receiptNumber}.${fileType}`);
    res.send(buffer);
  } catch (error) {
    res.status(500).send({ message: 'Error al descargar el comprobante', error });
  }
});

app.listen(port, () => {
  console.log(`Servidor principal escuchando en http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Banco Politécnico Comprobante');
});