const { google } = require('googleapis');
const nodemailer = require('nodemailer');

// Configura OAuth2 para Gmail
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, 'https://developers.google.com/oauthplayground');
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendNotification(req, res) {
    try {
        const { email, subject, message } = req.body;

        if (!email || !subject || !message) {
            return res.status(400).json({ error: 'El correo electrónico, el asunto y el mensaje son requeridos' });
        }

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

        const emailMsg = {
            from: 'Banco Politécnico <asistenciatecnica@bancopolitecnico.com>', // Reemplaza con tu correo
            to: email,
            subject: subject,
            text: message,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="color: #4CAF50; text-align: center;">${subject}</h2>
                    <p>${message}</p>
                    <p style="margin-top: 20px;">Saludos,</p>
                    <p><strong>Banco Politécnico</strong></p>
                    <hr>
                    <p style="font-size: 12px; color: #999; text-align: center;">Si no realizaste esta acción, por favor ignora este correo.</p>
                </div>
            `
        };

        const result = await transport.sendMail(emailMsg);
        console.log('Correo de confirmación enviado:', result);
        return res.status(200).json({ message: 'Confirmación enviada con éxito', result });
    } catch (error) {
        console.error('Error al enviar correo:', error);
        return res.status(500).json({ error: 'Error al enviar correo' });
    }
}

module.exports = {
    sendNotification
};
