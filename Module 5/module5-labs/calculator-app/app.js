const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const calculatorRoutes = require('./routes/calculatorRoutes');
const extraRoutes = require('./routes/extraRoutes');

const app = express();

app.use(express.static('public'));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Calculator API',
      version: '1.0.0',
      description:
        'Simple calculator API built in Module 5. Includes operations for add, subtract, multiply, divide and random number.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  // Files to scan for Swagger comments
  apis: ['./routes/*.js'], // <— important
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount routes
app.use('/calc', calculatorRoutes);
app.use('/extra', extraRoutes);

// Root – serve calculator UI
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
