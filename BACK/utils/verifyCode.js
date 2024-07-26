const verifySecurityCode = async (enteredCode, verificationCode) => {
    try {

        if (verificationCode === enteredCode) {
            verificationCode = '';
            return { verified: true, message: 'Código de seguridad verificado correctamente.' };
        }

        return { verified: false, message: 'Código de seguridad incorrecto.' };
    } catch (error) {
        console.error('Error al verificar el código de seguridad:', error);
        throw new Error('Error al verificar el código de seguridad.');
    }
};

module.exports = verifySecurityCode;