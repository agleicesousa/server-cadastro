const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const addressRouter = require('./routes/addressRouter');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Rota de endereços
app.use('/enderecos', addressRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});

module.exports = app;