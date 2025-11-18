const express = require('express');
const productsRoutes = require('./routes/productsRoutes');

const app = express();

app.use(express.json());

app.use('/api/products', productsRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Fake Store Backend</h1><p>Use /api/products or /api/products/:id</p>');
});

module.exports = app;
