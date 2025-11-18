const express = require('express');
const app = express();
const PORT = 3000;

const calculatorRoutes = require('./routes/calculatorRoutes');
const extraRoutes = require('./routes/extraRoutes');

app.use(express.static('public'));

app.use('/calc', calculatorRoutes);    
app.use('/extra', extraRoutes);       


app.get('/', (req, res) => {
  res.send('<h1>Calculator App</h1><p>Try /calc/add?num1=5&num2=3</p>');
});

app.listen(PORT, () => {
  console.log(`Calculator app listening at http://localhost:${PORT}`);
});
