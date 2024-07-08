require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

/**
 * Envía un mensaje SMS a un número telefónico específico.
 * @param {string} messageBody - El cuerpo del mensaje que se va a enviar.
 * @param {string} phoneNumber - El número telefónico al que se enviará el mensaje.
 */
async function sendNotification(messageBody, phoneNumber) {
    try {
        // Asegurarse de que el mensaje no exceda los 160 caracteres
        if (messageBody.length > 160-38) {
            throw new Error('El cuerpo del mensaje excede el límite de 160 caracteres.');
        }

        const message = await client.messages.create({
            body: messageBody,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber
        });
        console.log('Mensaje enviado:', message.body);
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
}

/**
 * Envía un código de seguridad por SMS a un número telefónico específico.
 * @param {string} securityCode - El código de seguridad que se va a enviar.
 * @param {string} phoneNumber - El número telefónico al que se enviará el código de seguridad.
 */
async function sendSecurityCode(securityCode, phoneNumber) {
    const messageBody = `Tu codigo de seguridad es ${securityCode}`;
    await sendNotification(messageBody, phoneNumber);
}

/**
 * Envía un código de seguridad por SMS a un número telefónico específico.
 * @param {string} securityCode - El código de seguridad que se va a enviar.
 * @param {string} phoneNumber - El número telefónico al que se enviará el código de seguridad.
 */
async function sendSecurityCode(securityCode, phoneNumber) {
    const messageBody = `Tu codigo de seguridad es ${securityCode}.`;
    await sendNotification(messageBody, phoneNumber);
}

/**
 * Envía una notificación de que el usuario se ha registrado exitosamente en la plataforma
 * @param {string} phoneNumber - El número telefónico al que se enviará la notficación.
 */
async function sendRegisterConfirmation(phoneNumber) {
    const messageBody = `Registro exitoso. Su cuenta de Banco Politecnico ha sido creda.`;
    await sendNotification(messageBody, phoneNumber);
}

/**
 * Envía una notificación de que el usuario se ha cambiado de contraseña
 * @param {string} phoneNumber - El número telefónico al que se enviará la notficación.
 */
async function sendPassChange(phoneNumber) {
    const messageBody = `Su contrasena de Banco Politecnico se ha cambiado.`;
    await sendNotification(messageBody, phoneNumber);
}

/**
 * Envía una notificación de que el usuario se ha cambiado de contraseña
 * @param {string} phoneNumber - El número telefónico al que se enviará la notficación.
 */
async function sendTempBlock(phoneNumber) {
    const messageBody = `Su cuenta de Banco Politecnico ha sido bloqueada temporalmente.`;
    await sendNotification(messageBody, phoneNumber);
}


module.exports = {
    sendSecurityCode,
    sendPassChange,
    sendRegisterConfirmation,
    sendTempBlock
};

