// server.js
const express = require('express');

const app = express();
const PORT = 3000;

// Rota de teste
app.get('/', (req, res) => {
  res.send('Olá, o servidor Express está funcionando!');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

