require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { generateSecurityCode } = require('./generateCode');

sgMail.setApiKey(process.env.SENDGRID_API_KEY_V2);

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
  const htmlBody = `<p>Tu código de seguridad es <b>${securityCode}</b></p>`;
  await sendMail(toEmail, subject, textBody, htmlBody);
}

async function sendLoginDetected(toEmail) {
  const subject = 'Nuevo inicio de sesión detectado';
  const textBody = 'Se ha detectado un nuevo inicio de sesión en su cuenta de Banco Politecnico.';
  const htmlBody = '<p>Se ha detectado un nuevo inicio de sesión en su cuenta de Banco Politecnico.</p>';
  await sendMail(toEmail, subject, textBody, htmlBody);
}

async function sendRegisterConfirmation(toEmail) {
  const subject = 'Registro Exitoso';
  const textBody = 'Registro exitoso. Su cuenta de Banco Politecnico ha sido creada.';
  const htmlBody = '<p>Registro exitoso. Su cuenta de Banco Politecnico ha sido creada.</p>';
  await sendMail(toEmail, subject, textBody, htmlBody);
}

async function sendPassChange(toEmail) {
  const subject = 'Cambio de Contraseña';
  const textBody = 'Su contraseña de Banco Politecnico se ha cambiado.';
  const htmlBody = '<p>Su contraseña de Banco Politecnico se ha cambiado.</p>';
  await sendMail(toEmail, subject, textBody, htmlBody);
}

async function sendTempBlock(toEmail) {
  const subject = 'Cuenta Bloqueada Temporalmente';
  const textBody = 'Su cuenta de Banco Politecnico ha sido bloqueada temporalmente.';
  const htmlBody = '<p>Su cuenta de Banco Politecnico ha sido bloqueada temporalmente.</p>';
  await sendMail(toEmail, subject, textBody, htmlBody);
}

async function sendTransferNotification(toEmail, recieverAccount) {
  const subject = 'Notificación de Transferencia';
  const textBody = `Se ha realizado una transferencia a la cuenta ${recieverAccount}`;
  const htmlBody = `<p>Se ha realizado una transferencia a la cuenta ${recieverAccount}</p>`;
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
