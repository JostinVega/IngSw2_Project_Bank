const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Configura CORS
app.use(cors());

// Configura el análisis del cuerpo de la solicitud
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
  const { subject, description, userEmail } = req.body;

  console.log('Correo del usuario recibido en el backend:', userEmail);

  // Configura el transportador de nodemailer
let transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com', // Host SMTP de Zoho
  port: 465, // Puerto SMTP de Zoho para SSL
  secure: true, // true para puerto 465, false para otros puertos
  auth: {
    user: 'asistenciatecnica@bancopolitecnico.com', // Tu correo de Zoho
    pass: 'r3Luq8r8qvST' // Tu contraseña de aplicación de Zoho
  }
});

  // Configura el contenido del correo
  const emailBody = `Mensaje: ${description}\n\nCorreo del usuario: ${userEmail}`;
  console.log('Contenido del correo:', emailBody);

  let mailOptions = {
    from: 'asistenciatecnica@bancopolitecnico.com',
    to: 'asistenciatecnica@bancopolitecnico.com',
    subject: subject,
    text: emailBody // Incluye el contenido del correo
  };

  // Envía el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      return res.status(500).send({ message: 'Error al enviar el correo', error: error.message });
    }
    console.log('Correo enviado con éxito:', info);
    res.status(200).send({ message: 'Correo enviado con éxito', info });
  });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
