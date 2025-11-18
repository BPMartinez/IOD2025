const app = require('./app');

const PORT = 3002; 

app.listen(PORT, () => {
  console.log(`Fake Store backend listening at http://localhost:${PORT}`);
});
