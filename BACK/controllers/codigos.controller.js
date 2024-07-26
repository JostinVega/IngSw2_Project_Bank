const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
/*
// Configura OAuth2 para Gmail
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
*/

// Configura OAuth2 para Gmail
const CLIENT_ID = 
const CLIENT_SECRET = 
const REFRESH_TOKEN = 


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, 'https://developers.google.com/oauthplayground');
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const securityCodeSchema = new mongoose.Schema({
    email: String,
    code: String,
    expiration: Date
});

const SecurityCode = mongoose.model('SecurityCode', securityCodeSchema);

async function sendSecurityCode(email, code) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'jostinvegam02@gmail.com', // Reemplaza con tu correo
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });

        const mailOptions = {
            from: 'Banco Politécnico <asistenciatecnica@bancopolitecnico.com>', // Reemplaza con tu correo
            to: email,
            subject: 'Código de Seguridad - Banco Politécnico',
            text: `Tu código de seguridad es: ${code}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="color: #4CAF50 ; text-align: center;">Código de Seguridad</h2>
                    <p>Tu código de seguridad es:</p>
                    <div style="font-size: 24px; font-weight: bold; color: #000; margin: 10px 0; text-align: center;">${code}</div>
                    <p>Por favor, ingresa este código en la aplicación para continuar.</p>
                    <p style="margin-top: 20px;">Saludos,</p>
                    <p><strong>Banco Politécnico</strong></p>
                    <hr>
                    <p style="font-size: 12px; color: #999; text-align: center;">Si no solicitaste este código, por favor ignora este correo.</p>
                </div>
            `
        };

        const result = await transport.sendMail(mailOptions);
        console.log('Correo enviado:', result);
        return result;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
}

async function saveSecurityCode(email, code) {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 10); // El código expira en 10 minutos

    const securityCode = new SecurityCode({ email, code, expiration });
    await securityCode.save();
}

async function verifySecurityCode(email, code) {
    const securityCode = await SecurityCode.findOne({ email, code });

    if (securityCode && securityCode.expiration > new Date()) {
        return true; // El código es válido y no ha expirado
    } else {
        return false; // El código no es válido o ha expirado
    }
}

const codigosController = {
    enviarCodigo: async function(req, res) {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'El correo electrónico es requerido' });
        }
        const code = Math.floor(10000 + Math.random() * 90000).toString(); // Genera un número de 5 dígitos
        await saveSecurityCode(email, code);
        await sendSecurityCode(email, code);
        res.json({ message: 'Código enviado' });
    },
    
    verificarCodigo: async function(req, res) {
        const { email, code } = req.body;
        const isValid = await verifySecurityCode(email, code);
        if (isValid) {
            res.json({ message: 'Código verificado' });
        } else {
            res.status(400).json({ error: 'Código inválido o expirado' });
        }
    }
};

module.exports = codigosController;
