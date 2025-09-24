const express = require('express');
const cors = require('cors');
require('dotenv').config();

console.log('Carregando rotas...');

// Importar rotas
const authRoutes = require('./routes/auth');

console.log('Rotas carregadas com sucesso!');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
  res.json({ message: 'Backend do MoneyMap rodando 🚀' });
});

// Rotas da API
console.log('Registrando rotas /auth...');
app.use('/auth', authRoutes);
console.log('Rotas registradas!');

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});