const { sendSecurityCode: sendSecurityCodeMail, sendLoginDetected: sendLoginDetectedMail, sendRegisterConfirmation: sendRegisterConfirmationMail, sendPassChange: sendPassChangeMail, sendTempBlock: sendTempBlockMail, sendTransferNotification: sendTransferNotificationMail } = require('./send_mail');
const { sendSecurityCode: sendSecurityCodeSms, sendLoginDetected: sendLoginDetectedSms, sendRegisterConfirmation: sendRegisterConfirmationSms, sendPassChange: sendPassChangeSms, sendTempBlock: sendTempBlockSms, sendTransferNotification: sendTransferNotificationSms } = require('./send_sms');

function generateSecurityCode() {
    let code = '';
    for (let i = 0; i < 5; i++) {
        code += Math.floor(Math.random() * 10).toString();
    }
    return code;
}

async function sendSecurityCode(toEmail, toPhoneNumber) {
    const securityCode = generateSecurityCode();
    await sendSecurityCodeMail(toEmail, securityCode);
    await sendSecurityCodeSms(toPhoneNumber, securityCode);
    return securityCode;
}

async function sendLoginDetected(toEmail, toPhoneNumber) {
    await sendLoginDetectedMail(toEmail);
    await sendLoginDetectedSms(toPhoneNumber);
}

async function sendRegisterConfirmation(toEmail, toPhoneNumber) {
    await sendRegisterConfirmationMail(toEmail);
    await sendRegisterConfirmationSms(toPhoneNumber);
}

async function sendPassChange(toEmail, toPhoneNumber) {
    await sendPassChangeMail(toEmail);
    await sendPassChangeSms(toPhoneNumber);
}

async function sendTempBlock(toEmail, toPhoneNumber) {
    await sendTempBlockMail(toEmail);
    await sendTempBlockSms(toPhoneNumber);
}

async function sendTransferNotification(toEmail, toPhoneNumber, recieverAccount) {
    await sendTransferNotificationMail(toEmail, recieverAccount);
    await sendTransferNotificationSms(toPhoneNumber, recieverAccount);
}

module.exports = {
    sendSecurityCode,
    sendLoginDetected,
    sendRegisterConfirmation,
    sendPassChange,
    sendTempBlock,
    sendTransferNotification
};
