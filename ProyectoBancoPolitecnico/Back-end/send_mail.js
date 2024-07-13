require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY_V2);

function createHtmlBody(content) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                margin: 0;
                padding: 0;
            }
            .header {
                background-color: #2E86C1;
                color: white;
                text-align: center;
                padding: 20px;
            }
            .content {
                background-color: white;
                margin: 20px;
                padding: 20px;
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                color: #888888;
                font-size: 12px;
                margin: 20px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Banco Politécnico</h1>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <p>Banco Politécnico. Todos los derechos reservados.</p>
            <p>Este es un mensaje automático, por favor no responda a este correo.</p>
        </div>
    </body>
    </html>
  `;
}

async function sendMail(toEmail, subject, textBody, htmlBody) {
  const msg = {
    to: toEmail,
    from: 'info@bancopolitecnico.com',
    subject: subject,
    text: textBody,
    html: htmlBody,
  };
  try {
    await sgMail.send(msg);
    console.log('Correo enviado:', subject);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

async function sendSecurityCode(toEmail, securityCode) {
  const subject = 'Código de Seguridad';
  const textBody = `Tu código de seguridad es ${securityCode}`;
  const htmlBody = createHtmlBody(`<p>Tu código de seguridad es:</p> <p align="center" style="font-size: 50px;"> <b>${securityCode}</b></p>`);
  await sendMail(toEmail, subject, textBody, htmlBody);
}

async function sendLoginDetected(toEmail) {
  const subject = 'Nuevo inicio de sesión detectado';
  const textBody = 'Se ha detectado un nuevo inicio de sesión en su cuenta de Banco Politecnico. Si ha sido usted, ignore este mensaje. Si no ha sido usted, procure cambiar la contraseña lo más pronto posible.';
  const htmlBody = createHtmlBody('<p>Se ha detectado un nuevo inicio de sesión en su cuenta de Banco Politecnico.</p> <p> Si ha sido usted, ignore este mensaje. Si no ha sido usted, procure cambiar la contraseña lo más pronto posible. </p>');
  await sendMail(toEmail, subject, textBody, htmlBody);
}

async function sendRegisterConfirmation(toEmail) {
  const subject = 'Registro Exitoso';
  const textBody = 'Registro exitoso. Su cuenta de Banco Politecnico ha sido creada. ¡Bienvenido a la familia del Banco Politécnico!';
  const htmlBody = createHtmlBody('<p>Registro exitoso. Su cuenta de Banco Politecnico ha sido creada.</p> <p>¡Bienvenido a la familia del Banco Politécnico!</p>');
  await sendMail(toEmail, subject, textBody, htmlBody);
}

async function sendPassChange(toEmail) {
  const subject = 'Cambio de Contraseña';
  const textBody = 'Su contraseña de Banco Politecnico se ha cambiado correctamente.';
  const htmlBody = createHtmlBody('<p>Su contraseña de Banco Politecnico se ha cambiado correctamente.</p>');
  await sendMail(toEmail, subject, textBody, htmlBody);
}

async function sendTempBlock(toEmail) {
  const subject = 'Cuenta Bloqueada Temporalmente';
  const textBody = 'Su cuenta de Banco Politecnico ha sido bloqueada temporalmente.';
  const htmlBody = createHtmlBody('<p>Su cuenta de Banco Politecnico ha sido bloqueada temporalmente.</p>');
  await sendMail(toEmail, subject, textBody, htmlBody);
}

async function sendTransferNotification(toEmail, recieverAccount) {
  const subject = 'Notificación de Transferencia';
  const textBody = `Se ha realizado una transferencia a la cuenta ${recieverAccount}`;
  const htmlBody = createHtmlBody(`<p>Se ha realizado una transferencia a la cuenta ${recieverAccount}</p>`);
  await sendMail(toEmail, subject, textBody, htmlBody);
}

module.exports = {
  sendSecurityCode,
  sendLoginDetected,
  sendRegisterConfirmation,
  sendPassChange,
  sendTempBlock,
  sendTransferNotification
};
