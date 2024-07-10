const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const { sendSecurityCode, sendTempBlock } = require('./send_sms');
const app = express();

app.use(bodyParser.json());

const url = 'mongodb://localhost:27017';
const dbName = 'bankDB';

app.post('/send-security-code', async (req, res) => {
    const { userId, phoneNumber } = req.body;

    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);

    const securityCode = await sendSecurityCode(phoneNumber);

    await db.collection('users').updateOne(
        { userId: userId },
        { 
          $set: { securityCode: securityCode, attempts: 0 } // Guarda el código y reinicia los intentos
        }
    );

    client.close();
    res.json({ status: 'success', message: 'Código de seguridad enviado.' });
});

app.post('/verify-security-code', async (req, res) => {
    const { userId, enteredCode } = req.body;

    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);

    const user = await db.collection('users').findOne({ userId: userId });

    if (!user) {
        client.close();
        return res.status(404).json({ status: 'error', message: 'Usuario no encontrado.' });
    }

    if (user.securityCode === enteredCode) {
        await db.collection('users').updateOne(
            { userId: userId },
            { $unset: { securityCode: '', attempts: '' } } // Elimina el código y los intentos
        );
        client.close();
        return res.json({ status: 'success', message: 'Código de seguridad verificado correctamente.' });
    }

    let attempts = user.attempts || 0;
    attempts++;

    if (attempts >= 3) {
        await db.collection('users').updateOne(
            { userId: userId },
            { 
              $set: { status: 'blocked' }, // Bloquea la cuenta
              $unset: { securityCode: '', attempts: '' } // Elimina el código y los intentos
            }
        );
        await sendTempBlock(user.phoneNumber);
        client.close();
        return res.status(403).json({ status: 'error', message: 'Cuenta bloqueada temporalmente.' });
    }

    await db.collection('users').updateOne(
        { userId: userId },
        { $set: { attempts: attempts } } // Incrementa el conteo de intentos
    );

    client.close();
    res.status(403).json({ status: 'error', message: 'Código de seguridad incorrecto.' });
});

app.listen(3000, () => {
    console.log('Servidor ejecutándose en el puerto 3000');
});
