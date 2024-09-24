const express = require('express');
const ministriesRouter = require('./routes/ministriesRouter');
const positionsRouter = require('./routes/positionsRouter');
const addressRouter = require('./routes/addressRouter');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/ministerios', ministriesRouter);
app.use('/api/cargos', positionsRouter);
app.use('/api/enderecos', addressRouter);

app.use(errorHandler);

module.exports = app;