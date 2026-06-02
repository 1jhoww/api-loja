const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/clientes', require('./routes/clientes'));
app.use('/produtos', require('./routes/produtos'));

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    status: 'API funcionando!',
    rotas: {
      clientes: '/clientes',
      produtos: '/produtos'
    }
  });
});

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
