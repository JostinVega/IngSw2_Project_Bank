require('dotenv').config();
const twilio = require('twilio');

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendSms(toPhoneNumber, messageBody) {
  try {
    await client.messages.create({
      body: messageBody,
      to: toPhoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER
    });
    console.log('SMS enviado:', messageBody);
  } catch (error) {
    console.error('Error al enviar el SMS:', error);
  }
}

async function sendSecurityCode(toPhoneNumber, securityCode) {
  const messageBody = `Tu código de seguridad es ${securityCode}`;
  await sendSms(toPhoneNumber, messageBody);
}

async function sendLoginDetected(toPhoneNumber) {
  const messageBody = 'Se ha detectado un nuevo inicio de sesión en su cuenta de Banco Politecnico.';
  await sendSms(toPhoneNumber, messageBody);
}

async function sendRegisterConfirmation(toPhoneNumber) {
  const messageBody = 'Registro exitoso. Su cuenta de Banco Politecnico ha sido creada.';
  await sendSms(toPhoneNumber, messageBody);
}

async function sendPassChange(toPhoneNumber) {
  const messageBody = 'Su contraseña de Banco Politecnico se ha cambiado.';
  await sendSms(toPhoneNumber, messageBody);
}

async function sendTempBlock(toPhoneNumber) {
  const messageBody = 'Su cuenta de Banco Politecnico ha sido bloqueada temporalmente.';
  await sendSms(toPhoneNumber, messageBody);
}

async function sendTransferNotification(toPhoneNumber, recieverAccount) {
  const messageBody = `Se ha realizado una transferencia a la cuenta ${recieverAccount}`;
  await sendSms(toPhoneNumber, messageBody);
}

module.exports = {
  sendSecurityCode,
  sendLoginDetected,
  sendRegisterConfirmation,
  sendPassChange,
  sendTempBlock,
  sendTransferNotification
};
