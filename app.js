// app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const userController = require('./controller/userController');
const transferController = require('./controller/transferController');
require('dotenv').config();

const app = express();

app.use(express.json());

// Swagger (documentação REST)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas REST
app.use('/users', userController);
app.use('/transfers', transferController);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'API rodando com sucesso' });
});

module.exports = app;
