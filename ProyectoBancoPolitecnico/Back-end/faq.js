const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(bodyParser.json());

const url = 'mongodb://localhost:27017';
const dbName = 'bankDB';

app.post('/verify-security-answers', async (req, res) => {
  const { userId, securityAnswers } = req.body;

  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(dbName);
  const user = await db.collection('users').findOne({ userId: userId });

  if (!user) {
    return res.status(404).json({ status: 'error', message: 'Usuario no encontrado.' });
  }

  const correctAnswers = user.securityAnswers;
  let isValid = true;

  for (let answer of securityAnswers) {
    const correctAnswer = correctAnswers.find(a => a.questionId === answer.questionId);
    if (!correctAnswer || correctAnswer.answer !== answer.answer) {
      isValid = false;
      break;
    }
  }

  if (isValid) {
    res.json({ status: 'success', message: 'Las respuestas son correctas.' });
  } else {
    res.json({ status: 'error', message: 'Las respuestas no coinciden.' });
  }

  client.close();
});

app.listen(3000, () => {
  console.log('Servidor ejecutándose en el puerto 3000');
});
